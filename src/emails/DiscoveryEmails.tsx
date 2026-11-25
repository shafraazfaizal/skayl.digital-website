import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";

// Brand-styled emails for the Discovery feature (React Email).
// Email apps don't load web fonts reliably, so the brand fonts are listed first
// with safe system fallbacks. The wordmark is an image so it's never redrawn in a font.

const INK = "#0F0505";
const CREAM = "#F5F0E1";
const ORANGE = "#E64A19";
const GREY = "#5C5C5C";
const LINE = "#E2DBC9";
const BODY_FONT = "'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const DISPLAY_FONT = "'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const text: CSSProperties = { fontFamily: BODY_FONT, fontSize: "16px", lineHeight: "1.6", color: GREY, margin: "0 0 16px" };
const label: CSSProperties = { fontFamily: BODY_FONT, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: GREY, margin: "0 0 4px" };

function Shell({ preview, siteUrl, children }: { preview: string; siteUrl: string; children: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: CREAM, margin: 0, padding: "32px 0" }}>
        <Container style={{ maxWidth: "560px", padding: "0 24px" }}>
          <Img src={`${siteUrl}/brand/skayl-wordmark-email.png`} width="96" height="34" alt="SKAYL" style={{ display: "block", margin: "0 0 40px" }} />
          {children}
          <Hr style={{ borderColor: LINE, margin: "40px 0 20px" }} />
          <Text style={{ ...text, fontSize: "13px", margin: 0 }}>
            SKAYL · Creative studio across the UK &amp; Sri Lanka
            <br />
            <Link href="mailto:hello@skayl.digital" style={{ color: INK }}>
              hello@skayl.digital
            </Link>{" "}
            ·{" "}
            <Link href={siteUrl} style={{ color: INK }}>
              skayl.digital
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <Text style={{ fontFamily: DISPLAY_FONT, fontWeight: 600, fontSize: "34px", lineHeight: "1.05", letterSpacing: "-0.03em", color: INK, margin: "0 0 20px" }}>
      {children}
      <span style={{ color: ORANGE }}>.</span>
    </Text>
  );
}

/* ── To the client ────────────────────────────────────────────────────────── */

export type ClientCopyProps = { name: string; reference: string; siteUrl: string };

export function ClientCopyEmail({ name, reference, siteUrl }: ClientCopyProps) {
  const steps = [
    "We read through your answers.",
    "We reply within 24 hours.",
    "We have a free 30-minute call with you.",
    "You get a clear, itemised quote.",
  ];
  return (
    <Shell preview={`A copy of your discovery answers (${reference})`} siteUrl={siteUrl}>
      <Heading>Thank you{name ? `, ${name}` : ""}</Heading>
      <Text style={text}>
        Your answers have reached us, and a PDF copy is attached to this email for your records.
      </Text>
      <Text style={{ ...label, margin: "28px 0 10px" }}>What happens next</Text>
      {steps.map((s, i) => (
        <Text key={s} style={{ ...text, color: INK, margin: "0 0 8px" }}>
          <span style={{ color: GREY, fontSize: "13px", marginRight: "6px" }}>{`${String(i + 1).padStart(2, "0")} `}</span>
          {s}
        </Text>
      ))}
      <Text style={{ ...text, marginTop: "24px" }}>
        If anything changes in the meantime, just reply to this email.
      </Text>
      <Text style={{ ...text, fontSize: "13px" }}>Reference: {reference}</Text>
    </Shell>
  );
}

/* ── To SKAYL ─────────────────────────────────────────────────────────────── */

export type NewSubmissionProps = {
  clientName: string;
  organisation: string | null;
  reference: string;
  respondent: { name: string; email: string; phone: string; contactBy: string };
  summary: { label: string; value: string }[];
  adminUrl: string;
  siteUrl: string;
};

export function NewSubmissionEmail({ clientName, organisation, reference, respondent, summary, adminUrl, siteUrl }: NewSubmissionProps) {
  return (
    <Shell preview={`${clientName}${organisation ? ` (${organisation})` : ""} has submitted their discovery answers`} siteUrl={siteUrl}>
      <Text style={label}>New discovery submission · {reference}</Text>
      <Heading>{clientName}</Heading>
      {organisation ? <Text style={{ ...text, marginTop: "-8px" }}>{organisation}</Text> : null}

      <Section style={{ borderTop: `1px solid ${INK}`, paddingTop: "16px", marginTop: "8px" }}>
        {[
          { label: "Filled in by", value: respondent.name },
          { label: "Email", value: respondent.email },
          { label: "Phone / WhatsApp", value: respondent.phone },
          { label: "Best way to reach them", value: respondent.contactBy },
          ...summary,
        ]
          .filter((r) => r.value)
          .map((r) => (
            <Section key={r.label} style={{ paddingBottom: "12px" }}>
              <Text style={label}>{r.label}</Text>
              <Text style={{ ...text, color: INK, margin: 0 }}>{r.value}</Text>
            </Section>
          ))}
      </Section>

      <Button
        href={adminUrl}
        style={{ backgroundColor: INK, color: CREAM, fontFamily: BODY_FONT, fontSize: "13px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 28px", borderRadius: "999px", marginTop: "16px" }}
      >
        View the submission
      </Button>
      <Text style={{ ...text, fontSize: "13px", marginTop: "20px" }}>The full answers are in the attached PDF.</Text>
    </Shell>
  );
}
