// Branded HTML emails for the contact form: the confirmation the sender
// receives, and the enquiry notification the studio receives.
// Table-based with inline styles so they render in Gmail, Outlook and Apple Mail.
import { contact } from "@/content/contact";
import type { ContactInput } from "@/lib/contact-validation";

const C = { ink: "#0F0505", cream: "#F5F0E1", paper: "#FBF8F0", orange: "#E64A19", muted: "#5C5C5C", line: "#E4DDCB" };
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

function shell({ siteUrl, preheader, body }: { siteUrl: string; preheader: string; body: string }) {
  const logo = `${siteUrl}/brand/email-wordmark.png`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>SKAYL</title><style>@media only screen and (max-width:600px){.card{padding:32px 22px !important}}</style></head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.cream};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.cream};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
  <tr><td style="padding:0 8px 28px 8px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td align="left"><a href="${siteUrl}" style="text-decoration:none;"><img src="${logo}" width="92" height="35" alt="SKAYL" style="display:block;border:0;width:92px;height:auto;"></a></td>
      <td align="right" style="font-family:${FONT};font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:${C.muted};">${esc(contact.location)}</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:${C.paper};border:1px solid ${C.line};border-radius:24px;padding:44px 40px;" class="card">
    ${body}
  </td></tr>
  <tr><td style="padding:24px 0 0 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ink};border-radius:24px;">
      <tr><td style="padding:28px 32px;font-family:${FONT};">
        <p style="margin:0 0 14px 0;font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#9C958A;">Get in touch</p>
        <p style="margin:0 0 6px 0;font-size:15px;line-height:22px;"><a href="mailto:${contact.email}" style="color:${C.cream};text-decoration:none;">${contact.email}</a></p>
        ${contact.phones
          .map(
            (p) =>
              `<p style="margin:0 0 4px 0;font-size:13px;line-height:20px;color:#B8B1A4;">${esc(p.label)} &nbsp;<a href="tel:${p.tel}" style="color:${C.cream};text-decoration:none;">${esc(p.display)}</a></p>`
          )
          .join("")}
        <p style="margin:20px 0 0 0;font-size:11px;line-height:16px;color:#7D776D;">&copy; ${new Date().getFullYear()} SKAYL &middot; <a href="${siteUrl}" style="color:#B8B1A4;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const eyebrow = (t: string) =>
  `<p style="margin:0 0 18px 0;font-family:${FONT};font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:${C.muted};">(${esc(t)}) &nbsp;<span style="display:inline-block;width:28px;height:1px;background:${C.orange};vertical-align:middle;"></span></p>`;

const heading = (html: string) =>
  `<h1 style="margin:0 0 18px 0;font-family:${FONT};font-size:34px;line-height:36px;font-weight:700;letter-spacing:-1.2px;color:${C.ink};">${html}</h1>`;

const para = (html: string) =>
  `<p style="margin:0 0 16px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${C.muted};">${html}</p>`;

function summaryRows(v: ContactInput, includeContact: boolean) {
  const rows: [string, string][] = [];
  if (includeContact) {
    rows.push(["Name", esc(v.name)]);
    rows.push(["Email", `<a href="mailto:${esc(v.email)}" style="color:${C.orange};text-decoration:none;">${esc(v.email)}</a>`]);
  }
  rows.push(["What you need", esc(v.services.join(", "))]);
  if (v.timeline) rows.push(["Timeline", esc(v.timeline)]);
  if (v.budget) rows.push(["Budget", esc(v.budget)]);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0 0;border-top:1px solid ${C.line};">
${rows
  .map(
    ([k, val]) => `<tr>
  <td valign="top" style="padding:12px 12px 12px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};width:130px;">${k}</td>
  <td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${FONT};font-size:14px;line-height:20px;color:${C.ink};">${val}</td>
</tr>`
  )
  .join("")}
</table>
<p style="margin:22px 0 8px 0;font-family:${FONT};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};">The project</p>
<div style="font-family:${FONT};font-size:14px;line-height:22px;color:${C.ink};background:${C.cream};border-radius:14px;padding:16px 18px;">${nl2br(v.message)}</div>`;
}

/** The confirmation the sender receives. */
export function confirmationEmail(v: ContactInput, siteUrl: string) {
  const first = v.name.split(/\s+/)[0] || v.name;
  const steps = [
    ["01", "We reply", "Within 24 hours, with a straight answer."],
    ["02", "A short call", "If it’s a fit, we talk it through properly."],
    ["03", "A clear next step", "Scope, timeline and cost — in writing."],
  ];
  const book = contact.calendlyUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0 0;"><tr><td style="background:${C.ink};border-radius:999px;"><a href="${contact.calendlyUrl}" style="display:inline-block;padding:13px 24px;font-family:${FONT};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.cream};text-decoration:none;">Book a call &rarr;</a></td></tr></table>`
    : "";
  const body = `
${eyebrow("Message received")}
${heading(`Thanks, ${esc(first)}.<br><span style="color:#A39C90;">We’ve got it from here.</span>`)}
${para("Your message has reached the studio. One of us will read it properly and reply within 24 hours.")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 30px 0;">
${steps
  .map(
    ([n, t, d]) => `<tr>
  <td valign="top" style="padding:12px 14px 12px 0;border-top:1px solid ${C.line};font-family:${FONT};font-size:12px;color:${C.orange};width:28px;">${n}</td>
  <td valign="top" style="padding:12px 0;border-top:1px solid ${C.line};font-family:${FONT};"><span style="font-size:14px;color:${C.ink};">${t}</span><br><span style="font-size:13px;line-height:20px;color:${C.muted};">${d}</span></td>
</tr>`
  )
  .join("")}
</table>
<p style="margin:0 0 4px 0;font-family:${FONT};font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:${C.muted};">What you sent us</p>
${summaryRows(v, false)}
${book}
<p style="margin:30px 0 0 0;font-family:${FONT};font-size:14px;line-height:22px;color:${C.ink};">Speak soon,<br><span style="color:${C.muted};">SKAYL</span></p>`;

  const text = [
    `Thanks, ${first}. We’ve got it from here.`,
    "",
    "Your message has reached the studio. One of us will read it properly and reply within 24 hours.",
    "",
    ...steps.map(([n, t, d]) => `${n}  ${t} — ${d}`),
    "",
    "What you sent us",
    `What you need: ${v.services.join(", ")}`,
    v.timeline ? `Timeline: ${v.timeline}` : "",
    v.budget ? `Budget: ${v.budget}` : "",
    "",
    v.message,
    "",
    contact.calendlyUrl ? `Book a call: ${contact.calendlyUrl}\n` : "",
    "Speak soon,",
    "SKAYL",
    "",
    contact.email,
    ...contact.phones.map((p) => `${p.label}: ${p.display}`),
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  return {
    subject: "We’ve got your message — SKAYL",
    html: shell({ siteUrl, preheader: "Thanks for getting in touch — we’ll reply within 24 hours.", body }),
    text,
  };
}

/** The enquiry notification the studio receives. */
export function notificationEmail(v: ContactInput, siteUrl: string) {
  const body = `
${eyebrow("New enquiry")}
${heading(`${esc(v.name)}<br><span style="color:#A39C90;">${esc(v.services.join(" · "))}</span>`)}
${para(`Reply directly to this email to answer ${esc(v.name.split(/\s+/)[0] || v.name)}.`)}
${summaryRows(v, true)}`;
  const text = [
    `New enquiry — ${v.name}`,
    `Email: ${v.email}`,
    `What they need: ${v.services.join(", ")}`,
    v.timeline ? `Timeline: ${v.timeline}` : "",
    v.budget ? `Budget: ${v.budget}` : "",
    "",
    v.message,
  ]
    .filter(Boolean)
    .join("\n");
  return {
    subject: `New enquiry — ${v.name} · ${v.services.join(", ")}`,
    html: shell({ siteUrl, preheader: `${v.name}: ${v.message.slice(0, 90)}`, body }),
    text,
  };
}
