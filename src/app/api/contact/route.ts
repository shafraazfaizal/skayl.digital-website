import { NextResponse } from "next/server";
import { contact } from "@/content/contact";
import { sanitizeContact, validateContact } from "@/lib/contact-validation";
import { confirmationEmail, notificationEmail } from "@/lib/email/contact-emails";

// Contact endpoint.
// 1. Spam checks: a hidden honeypot field, a minimum fill time and a small
//    per-IP rate limit (best-effort — resets when the server instance does).
// 2. Server-side validation (the same rules the form uses).
// 3. Sends the enquiry to the studio via Resend, then a branded confirmation
//    to the sender. A failed confirmation never fails the enquiry.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (s: string) => s.replace(/[\r\n\t\u0000-\u001f]+/g, " ").trim();

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots: pretend it worked, send nothing.
  const startedAt = Number(raw.startedAt);
  if ((typeof raw.website === "string" && raw.website.trim()) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  const input = sanitizeContact(raw);
  input.name = oneLine(input.name);
  input.email = oneLine(input.email);
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://skayl.digital").replace(/\/$/, "");

  if (!apiKey) {
    // No key configured — succeed in dev so the UX is testable.
    console.log("[contact] (no RESEND_API_KEY)", input);
    return NextResponse.json({ ok: true });
  }

  const note = notificationEmail(input, siteUrl);
  try {
    await sendEmail(apiKey, {
      from: "SKAYL Website <website@skayl.digital>",
      to: [to],
      reply_to: input.email,
      subject: oneLine(note.subject),
      html: note.html,
      text: note.text,
    });
  } catch (err) {
    console.error("[contact] enquiry email failed", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 502 });
  }

  const confirm = confirmationEmail(input, siteUrl);
  try {
    await sendEmail(apiKey, {
      from: `SKAYL <${contact.email}>`,
      to: [input.email],
      reply_to: contact.email,
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
    });
  } catch (err) {
    console.error("[contact] confirmation email failed", err);
  }

  return NextResponse.json({ ok: true });
}
