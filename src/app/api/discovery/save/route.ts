import { NextResponse } from "next/server";
import { resolveForm, sanitizeAnswers } from "@/lib/discovery/form";
import { findLinkByToken, findResponse, linkState, OPEN_STATUSES } from "@/lib/discovery/links";
import { rateLimit } from "@/lib/discovery/rate-limit";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

// Autosave: merges the client's latest answers into their draft.
export async function POST(req: Request) {
  if (!(await rateLimit("discovery-save", 240, 600))) {
    return NextResponse.json({ ok: false, error: "Too many saves. Please wait a moment." }, { status: 429, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => null)) as { token?: unknown; answers?: unknown } | null;
  const token = typeof body?.token === "string" ? body.token : "";
  const link = token ? await findLinkByToken(token) : null;
  if (!link) return NextResponse.json({ ok: false, error: "This link isn’t valid." }, { status: 404, headers: NO_STORE });

  const state = linkState(link);
  if (state !== "open") return NextResponse.json({ ok: false, state }, { status: 410, headers: NO_STORE });

  const form = resolveForm(link.sections, link.overrides);
  const incoming = sanitizeAnswers(form, body?.answers);
  const existing = await findResponse(link.id);
  const answers = { ...(existing?.answers ?? {}), ...incoming };
  const now = new Date().toISOString();
  const db = supabaseAdmin();

  const { error } = await db.from("discovery_responses").upsert(
    {
      link_id: link.id,
      answers,
      respondent_email: typeof answers.details_email === "string" ? answers.details_email.trim() || null : null,
      updated_at: now,
    },
    { onConflict: "link_id" }
  );
  if (error) {
    console.error("[discovery] save failed", error);
    return NextResponse.json({ ok: false, error: "We couldn’t save just now." }, { status: 500, headers: NO_STORE });
  }

  await db
    .from("discovery_links")
    .update({ status: "in_progress", last_activity_at: now, opened_at: link.opened_at ?? now })
    .eq("id", link.id)
    .in("status", OPEN_STATUSES);

  return NextResponse.json({ ok: true, savedAt: now }, { headers: NO_STORE });
}
