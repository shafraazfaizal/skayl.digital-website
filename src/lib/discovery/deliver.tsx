import "server-only";
import { render } from "@react-email/components";
import { ClientCopyEmail, NewSubmissionEmail } from "@/emails/DiscoveryEmails";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { firstName, formatAnswer, resolveForm, type Answers } from "./form";
import type { DiscoveryLink } from "./links";
import { pdfFileName, renderDiscoveryPdf } from "./pdf/DiscoveryPdf";
import { QUESTIONS, SUMMARY_QUESTIONS } from "./questions";
import { FROM_EMAIL, NOTIFY_EMAIL, PDF_BUCKET, SITE_URL, SKAYL_EMAIL } from "./site";

/** Build the PDF for a link and store it in the private bucket. Returns the bytes and the storage path. */
export async function createAndStorePdf(link: DiscoveryLink, answers: Answers): Promise<{ pdf: Buffer; path: string; filename: string }> {
  const pdf = await renderDiscoveryPdf({
    reference: link.ref,
    clientName: link.client_name,
    organisation: link.organisation,
    sections: link.sections,
    overrides: link.overrides,
    answers,
    submittedAt: link.submitted_at,
  });
  const filename = pdfFileName(link.ref, link.client_name);
  const path = `${link.id}/${filename}`;
  const { error } = await supabaseAdmin()
    .storage.from(PDF_BUCKET)
    .upload(path, pdf, { contentType: "application/pdf", upsert: true });
  if (error) throw error;
  await supabaseAdmin().from("discovery_responses").update({ pdf_path: path }).eq("link_id", link.id);
  return { pdf, path, filename };
}

type Email = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachment: { filename: string; content: Buffer };
  idempotencyKey: string;
};

async function sendEmail(email: Email): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Resend ignores repeats with the same key, so a retry never sends twice.
      "Idempotency-Key": email.idempotencyKey,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [email.to],
      reply_to: SKAYL_EMAIL,
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments: [{ filename: email.attachment.filename, content: email.attachment.content.toString("base64") }],
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * After a submission is saved: build the PDF, then email the client and SKAYL.
 * Never throws. Each step is recorded so the admin can see what went out.
 */
export async function deliverSubmission(link: DiscoveryLink, answers: Answers): Promise<{ clientEmailSent: boolean }> {
  const db = supabaseAdmin();
  const problems: string[] = [];
  const stamp = link.submitted_at ?? new Date().toISOString();

  let pdfFile: { pdf: Buffer; filename: string } | null = null;
  try {
    pdfFile = await createAndStorePdf(link, answers);
  } catch (err) {
    console.error("[discovery] PDF failed", err);
    problems.push(`PDF: ${err instanceof Error ? err.message : String(err)}`);
  }

  const respondentEmail = str(answers.details_email);
  const respondentName = str(answers.details_name);
  let clientEmailSent = false;

  if (pdfFile && respondentEmail) {
    try {
      const props = { name: firstName(respondentName), reference: link.ref, siteUrl: SITE_URL };
      await sendEmail({
        to: respondentEmail,
        subject: `Your SKAYL discovery answers (${link.ref})`,
        html: await render(<ClientCopyEmail {...props} />),
        text: await render(<ClientCopyEmail {...props} />, { plainText: true }),
        attachment: { filename: pdfFile.filename, content: pdfFile.pdf },
        idempotencyKey: `discovery-client-${link.id}-${stamp}`,
      });
      clientEmailSent = true;
      await db.from("discovery_responses").update({ client_email_sent_at: new Date().toISOString() }).eq("link_id", link.id);
    } catch (err) {
      console.error("[discovery] client email failed", err);
      problems.push(`Client email: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (pdfFile) {
    try {
      const form = resolveForm(link.sections, link.overrides);
      const all = form.flatMap((s) => s.questions);
      const summary = SUMMARY_QUESTIONS.map((id) => {
        const q = all.find((x) => x.id === id) ?? QUESTIONS.find((x) => x.id === id);
        const value = formatAnswer(answers[id]);
        return q && value ? { label: q.short ?? q.label, value } : null;
      }).filter((r): r is { label: string; value: string } => !!r);

      const props = {
        clientName: link.client_name,
        organisation: link.organisation,
        reference: link.ref,
        respondent: {
          name: respondentName,
          email: respondentEmail,
          phone: str(answers.details_phone),
          contactBy: str(answers.details_contact),
        },
        summary,
        adminUrl: `${SITE_URL}/admin/discovery/${link.id}`,
        siteUrl: SITE_URL,
      };
      await sendEmail({
        to: NOTIFY_EMAIL,
        subject: `New discovery submission: ${link.client_name} (${link.ref})`,
        html: await render(<NewSubmissionEmail {...props} />),
        text: await render(<NewSubmissionEmail {...props} />, { plainText: true }),
        attachment: { filename: pdfFile.filename, content: pdfFile.pdf },
        idempotencyKey: `discovery-admin-${link.id}-${stamp}`,
      });
      await db.from("discovery_responses").update({ admin_email_sent_at: new Date().toISOString() }).eq("link_id", link.id);
    } catch (err) {
      console.error("[discovery] SKAYL email failed", err);
      problems.push(`SKAYL email: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  await db
    .from("discovery_responses")
    .update({ email_error: problems.length ? problems.join(" | ").slice(0, 1000) : null })
    .eq("link_id", link.id);

  return { clientEmailSent };
}
