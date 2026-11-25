import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Answers } from "./form";
import { hashToken, looksLikeToken } from "./token";

export type StoredStatus = "not_opened" | "opened" | "in_progress" | "submitted" | "revoked";
export type DisplayStatus = "Not opened" | "Opened" | "In progress" | "Submitted" | "Expired" | "Revoked";

export type DiscoveryLink = {
  id: string;
  ref: string;
  client_name: string;
  organisation: string | null;
  client_email: string | null;
  greeting: string | null;
  intro_message: string | null;
  sections: string[];
  overrides: unknown;
  status: StoredStatus;
  expires_at: string;
  opened_at: string | null;
  last_activity_at: string | null;
  submitted_at: string | null;
  created_at: string;
};

export type DiscoveryResponse = {
  link_id: string;
  answers: Answers;
  respondent_email: string | null;
  pdf_path: string | null;
  client_email_sent_at: string | null;
  admin_email_sent_at: string | null;
  email_error: string | null;
  updated_at: string;
};

/** Every column except token_hash, which never leaves the database layer. */
export const LINK_COLUMNS =
  "id, ref, client_name, organisation, client_email, greeting, intro_message, sections, overrides, status, expires_at, opened_at, last_activity_at, submitted_at, created_at";

/** Statuses from which a client may still save and submit. */
export const OPEN_STATUSES: StoredStatus[] = ["not_opened", "opened", "in_progress"];

export function isExpired(link: Pick<DiscoveryLink, "status" | "expires_at">, now = Date.now()): boolean {
  return link.status !== "submitted" && link.status !== "revoked" && new Date(link.expires_at).getTime() <= now;
}

/** What the client's link can do right now. */
export function linkState(link: DiscoveryLink): "open" | "submitted" | "revoked" | "expired" {
  if (link.status === "submitted") return "submitted";
  if (link.status === "revoked") return "revoked";
  if (isExpired(link)) return "expired";
  return "open";
}

export function displayStatus(link: Pick<DiscoveryLink, "status" | "expires_at">): DisplayStatus {
  if (isExpired(link)) return "Expired";
  return (
    { not_opened: "Not opened", opened: "Opened", in_progress: "In progress", submitted: "Submitted", revoked: "Revoked" } as const
  )[link.status];
}

export async function findLinkByToken(token: string): Promise<DiscoveryLink | null> {
  if (!looksLikeToken(token)) return null;
  const { data, error } = await supabaseAdmin()
    .from("discovery_links")
    .select(LINK_COLUMNS)
    .eq("token_hash", hashToken(token))
    .maybeSingle();
  if (error) throw error;
  return (data as DiscoveryLink | null) ?? null;
}

export async function findLinkById(id: string): Promise<DiscoveryLink | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data, error } = await supabaseAdmin().from("discovery_links").select(LINK_COLUMNS).eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as DiscoveryLink | null) ?? null;
}

export async function findResponse(linkId: string): Promise<DiscoveryResponse | null> {
  const { data, error } = await supabaseAdmin().from("discovery_responses").select("*").eq("link_id", linkId).maybeSingle();
  if (error) throw error;
  return (data as DiscoveryResponse | null) ?? null;
}

/** Record the first time the client opens their link. */
export async function markOpened(link: DiscoveryLink): Promise<void> {
  const now = new Date().toISOString();
  const db = supabaseAdmin();
  if (!link.opened_at) {
    await db.from("discovery_links").update({ opened_at: now }).eq("id", link.id).is("opened_at", null);
  }
  if (link.status === "not_opened") {
    await db.from("discovery_links").update({ status: "opened" }).eq("id", link.id).eq("status", "not_opened");
  }
}
