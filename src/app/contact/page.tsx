import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — SKAYL",
  description: "Start a project with SKAYL.",
};

export default function ContactPage() {
  return (
    <section className="pt-16 pb-28 md:pt-24">
      <Container>
        <div className="grid gap-14 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="text-sm text-muted">(Contact)</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display text-5xl leading-[0.95] md:text-6xl">
                Let’s build something that lasts.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-lg text-muted">
                Tell us about your project and we’ll come back with a straight
                answer and a clear next step — no obligation, no sales pressure.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href="mailto:hello@skayl.digital"
                className="text-lg font-medium text-orange underline-offset-4 hover:underline"
              >
                hello@skayl.digital
              </a>
            </Reveal>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
