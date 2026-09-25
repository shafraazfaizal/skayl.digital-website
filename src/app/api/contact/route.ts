import { NextResponse } from "next/server";

// Contact endpoint. Validates the payload and (optionally) forwards it via
// Resend if RESEND_API_KEY is set. Falls back to a logged success in dev so
// the form works out of the box without secrets.
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "hello@skayl.digital";

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SKAYL Website <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `New enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json(
          { ok: false, error: "Email service error.", detail },
          { status: 502 }
        );
      }
    } else {
      // No key configured — succeed in dev so the UX is testable.
      console.log("[contact] (no RESEND_API_KEY)", { name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
