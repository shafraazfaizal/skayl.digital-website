import { PHONE_LK, PHONE_UK, SKAYL_EMAIL } from "@/lib/discovery/site";
import { Card, Eyebrow, Headline, InkPanel } from "./ui";
import Wordmark from "./Wordmark";

type Kind = "invalid" | "expired" | "revoked" | "submitted" | "busy" | "error";

const COPY: Record<Kind, { eyebrow: string; heading: string; body: string }> = {
  invalid: {
    eyebrow: "Link not found",
    heading: "This link doesn’t look right",
    body: "It may have been copied incompletely. Check the link we sent you, or get in touch and we’ll send a fresh one.",
  },
  expired: {
    eyebrow: "Link expired",
    heading: "This link has expired",
    body: "For your privacy, discovery links only stay open for a limited time. Get in touch and we’ll happily send you a new one.",
  },
  revoked: {
    eyebrow: "Link closed",
    heading: "This link is no longer active",
    body: "If you still need to share your answers with us, get in touch and we’ll sort it out.",
  },
  submitted: {
    eyebrow: "Already submitted",
    heading: "We’ve got your answers",
    body: "This form has already been submitted, and a PDF copy went to the email you gave us. Want to change something? Let us know and we’ll reopen it for you.",
  },
  busy: {
    eyebrow: "One moment",
    heading: "Please try again shortly",
    body: "We’ve had a lot of requests from your connection. Wait a minute, then refresh the page.",
  },
  error: {
    eyebrow: "Something went wrong",
    heading: "We couldn’t load your form",
    body: "This is on our side, not yours. Please refresh in a moment, or get in touch and we’ll help.",
  },
};

/** The branded page shown for any link that can't be used. */
export default function LinkMessage({ kind }: { kind: Kind }) {
  const c = COPY[kind];
  const links = [
    { label: "Email", value: SKAYL_EMAIL, href: `mailto:${SKAYL_EMAIL}` },
    { label: "UK", value: PHONE_UK, href: `tel:${PHONE_UK.replace(/\s/g, "")}` },
    { label: "Sri Lanka", value: PHONE_LK, href: `tel:${PHONE_LK.replace(/\s/g, "")}` },
  ];
  return (
    <div className="flex min-h-[100svh] flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center px-5 md:px-10">
          <Wordmark width={70} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col gap-4 px-4 py-5 sm:px-5 md:gap-5 md:px-10 md:py-10">
        <InkPanel className="px-6 pb-10 pt-10 sm:px-10 md:px-14 md:pb-16 md:pt-16">
          <Eyebrow tone="dark">{c.eyebrow}</Eyebrow>
          <Headline className="mt-7 max-w-[14ch] text-[2.7rem] text-cream sm:text-[3.6rem] md:mt-9 md:text-[5rem]">{c.heading}</Headline>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-cream/70 md:text-[19px]">{c.body}</p>
        </InkPanel>
        <Card className="grid gap-0 px-6 py-4 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-8 md:px-10">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="group flex min-h-[60px] flex-col justify-center border-t border-line py-3 first:border-t-0 sm:border-t-0">
              <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">{l.label}</span>
              <span className="mt-1 text-[17px] text-ink underline decoration-ink/0 underline-offset-4 transition-colors group-hover:decoration-ink/40">{l.value}</span>
            </a>
          ))}
        </Card>
      </main>
    </div>
  );
}
