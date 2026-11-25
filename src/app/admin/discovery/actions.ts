"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/discovery/admin-auth";
import { createAndStorePdf } from "@/lib/discovery/deliver";
import { isSelectableSection, overridesSchema, type Answers } from "@/lib/discovery/form";
import { findLinkById, findResponse } from "@/lib/discovery/links";
import { pdfFileName } from "@/lib/discovery/pdf/DiscoveryPdf";
import { DEFAULT_EXPIRY_DAYS, PDF_BUCKET, linkUrl } from "@/lib/discovery/site";
import { requestOrigin } from "@/lib/discovery/reveal";
import { encryptToken, hashToken, newToken } from "@/lib/discovery/token";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const createSchema = z.object({
  clientName: z.string().trim().min(1, "Add the client’s name.").max(120),
  organisation: z.string().trim().max(160).optional().default(""),
  clientEmail: z
    .string()
    .trim()
    .max(254)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "That email doesn’t look right.")
    .optional()
    .default(""),
  greeting: z.string().trim().max(300).optional().default(""),
  introMessage: z.string().trim().max(4000).optional().default(""),
  sections: z.array(z.string()).refine((s) => s.filter(isSelectableSection).length > 0, "Choose at least one section."),
  overrides: overridesSchema,
  expiresAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an expiry date."),
});

export type CreateLinkInput = z.input<typeof createSchema>;

function endOfDay(date: string): Date {
  // The link works until 23:59 (UTC) on the chosen day.
  return new Date(`${date}T23:59:00Z`);
}

export async function createLink(input: CreateLinkInput): Promise<Result<{ id: string; url: string; ref: string }>> {
  await requireAdmin();
  const parsed = createSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const v = parsed.data;

  const expires = endOfDay(v.expiresAt);
  if (expires.getTime() <= Date.now()) return { ok: false, error: "The expiry date needs to be in the future." };

  const db = supabaseAdmin();
  const { data: ref, error: refError } = await db.rpc("next_discovery_ref");
  if (refError || typeof ref !== "string") return { ok: false, error: "Couldn’t create a reference number. Did the SQL migration run?" };

  const token = newToken();
  const { data, error } = await db
    .from("discovery_links")
    .insert({
      token_hash: hashToken(token),
      token_encrypted: encryptToken(token),
      ref,
      client_name: v.clientName,
      organisation: v.organisation || null,
      client_email: v.clientEmail || null,
      greeting: v.greeting || null,
      intro_message: v.introMessage || null,
      sections: v.sections.filter(isSelectableSection),
      overrides: v.overrides,
      expires_at: expires.toISOString(),
    })
    .select("id")
    .single();
  if (error || !data) return { ok: false, error: "Couldn’t save the link. Please try again." };

  revalidatePath("/admin/discovery");
  return { ok: true, id: data.id as string, url: linkUrl(token, await requestOrigin()), ref };
}

export async function reopenLink(id: string, days: number): Promise<Result<{ expiresAt: string }>> {
  await requireAdmin();
  const n = Number.isFinite(days) ? Math.min(Math.max(Math.round(days), 1), 365) : DEFAULT_EXPIRY_DAYS;
  const expiresAt = new Date(Date.now() + n * 86_400_000).toISOString();
  const { error } = await supabaseAdmin()
    .from("discovery_links")
    .update({ status: "in_progress", submitted_at: null, expires_at: expiresAt })
    .eq("id", id);
  if (error) return { ok: false, error: "Couldn’t reopen the link." };
  revalidatePath("/admin/discovery");
  revalidatePath(`/admin/discovery/${id}`);
  return { ok: true, expiresAt };
}

export async function revokeLink(id: string): Promise<Result> {
  await requireAdmin();
  const { error } = await supabaseAdmin().from("discovery_links").update({ status: "revoked" }).eq("id", id);
  if (error) return { ok: false, error: "Couldn’t revoke the link." };
  revalidatePath("/admin/discovery");
  revalidatePath(`/admin/discovery/${id}`);
  return { ok: true };
}

/** Issue a fresh link for the same client. The old link stops working. */
export async function rotateLink(id: string): Promise<Result<{ url: string }>> {
  await requireAdmin();
  const token = newToken();
  const { error } = await supabaseAdmin()
    .from("discovery_links")
    .update({ token_hash: hashToken(token), token_encrypted: encryptToken(token) })
    .eq("id", id);
  if (error) return { ok: false, error: "Couldn’t create a new link." };
  revalidatePath("/admin/discovery");
  revalidatePath(`/admin/discovery/${id}`);
  return { ok: true, url: linkUrl(token, await requestOrigin()) };
}

/** A short-lived download link for the submission PDF. Builds the PDF first if it's missing. */
export async function getPdfUrl(id: string): Promise<Result<{ url: string }>> {
  await requireAdmin();
  const link = await findLinkById(id);
  if (!link) return { ok: false, error: "Link not found." };
  const response = await findResponse(id);
  if (!response) return { ok: false, error: "There are no answers yet." };

  let path = response.pdf_path;
  if (!path) {
    try {
      path = (await createAndStorePdf(link, (response.answers ?? {}) as Answers)).path;
    } catch (err) {
      console.error("[admin] PDF build failed", err);
      return { ok: false, error: "Couldn’t build the PDF." };
    }
  }
  const { data, error } = await supabaseAdmin()
    .storage.from(PDF_BUCKET)
    .createSignedUrl(path, 120, { download: pdfFileName(link.ref, link.client_name) });
  if (error || !data) return { ok: false, error: "Couldn’t get the PDF." };
  return { ok: true, url: data.signedUrl };
}

/** Delete a link for good: the link, the client's answers and the stored PDF. */
export async function deleteLink(id: string): Promise<Result> {
  await requireAdmin();
  const db = supabaseAdmin();
  const link = await findLinkById(id);
  if (!link) return { ok: false, error: "Link not found." };

  // Remove the PDFs first (everything stored under this link's folder).
  const { data: files } = await db.storage.from(PDF_BUCKET).list(id);
  if (files?.length) {
    const { error: storageError } = await db.storage.from(PDF_BUCKET).remove(files.map((f) => `${id}/${f.name}`));
    if (storageError) console.error("[admin] couldn't delete PDFs", storageError);
  }

  // Answers are removed automatically with the link (on delete cascade).
  const { error } = await db.from("discovery_links").delete().eq("id", id);
  if (error) return { ok: false, error: "Couldn’t delete the link." };
  revalidatePath("/admin/discovery");
  return { ok: true };
}

export async function signOut() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/");
}
