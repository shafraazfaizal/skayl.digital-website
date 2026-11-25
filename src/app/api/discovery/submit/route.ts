import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/discovery/deliver";
import { finalizeAnswers, resolveForm, sanitizeAnswers, validateAll } from "@/lib/discovery/form";
import { findLinkByToken, findResponse, linkState, OPEN_STATUSES, type DiscoveryLink } from "@/lib/discovery/links";
import { rateLimit } from "@/lib/discovery/rate-limit";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(req: Request) {
  if (!(await rateLimit("discovery-submit", 20, 3600))) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => null)) as { token?: unknown; answers?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token : "";
  const link = token ? await findLinkByToken(token) : null;
  if (!link) return NextResponse.json({ ok: false, error: "This link isn’t valid." }, { status: 404, headers: NO_STORE });

  const state = linkState(link);
  if (state === "submitted") return NextResponse.json({ ok: true, already: true }, { headers: NO_STORE });
  if (state !== "open") return NextResponse.json({ ok: false, state }, { status: 410, headers: NO_STORE });

  // Validate everything on the server, against this link's own form.
  const form = resolveForm(link.sections, link.overrides);
  const existing = await findResponse(link.id);
  const merged = { ...(existing?.answers ?? {}), ...sanitizeAnswers(form, body?.answers) };
  const { errors, firstSection } = validateAll(form, merged);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, section: firstSection }, { status: 422, headers: NO_STORE });
  }
  const answers = finalizeAnswers(form, merged);
  const now = new Date().toISOString();
  const db = supabaseAdmin();

  const { error: saveError } = await db.from("discovery_responses").upsert(
    {
      link_id: link.id,
      answers,
      respondent_email: typeof answers.details_email === "string" ? answers.details_email : null,
      updated_at: now,
    },
    { onConflict: "link_id" }
  );
  if (saveError) {
    console.error("[discovery] submit save failed", saveError);
    return NextResponse.json({ ok: false, error: "We couldn’t save your answers. Please try again." }, { status: 500, headers: NO_STORE });
  }

  // Claim the submission. Only one request can move the link to "submitted",
  // so a double click (or two tabs) never sends the emails twice.
  const { data: claimed, error: claimError } = await db
    .from("discovery_links")
    .update({ status: "submitted", submitted_at: now, last_activity_at: now })
    .eq("id", link.id)
    .in("status", OPEN_STATUSES)
    .gt("expires_at", now)
    .select("id");
  if (claimError) {
    console.error("[discovery] submit claim failed", claimError);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500, headers: NO_STORE });
  }
  if (!claimed?.length) {
    const fresh = await findLinkByToken(token);
    if (fresh && linkState(fresh) === "submitted") return NextResponse.json({ ok: true, already: true }, { headers: NO_STORE });
    return NextResponse.json({ ok: false, state: fresh ? linkState(fresh) : "expired" }, { status: 410, headers: NO_STORE });
  }

  const submitted: DiscoveryLink = { ...link, status: "submitted", submitted_at: now, last_activity_at: now };
  const { clientEmailSent } = await deliverSubmission(submitted, answers);

  return NextResponse.json(
    { ok: true, email: typeof answers.details_email === "string" ? answers.details_email : "", emailSent: clientEmailSent },
    { headers: NO_STORE }
  );
}
