import Link from "next/link";
import Container from "@/components/ui/Container";
import { aboutCta, manifesto, toolsStack } from "@/content/about";

// 09 — The close, in one cream chapter so the page hands over cleanly to the
// dark footer: a quiet manifesto, then one primary action, then the stack.
export default function ClosingSection() {
  return (
    <section className="pb-20 pt-32 md:pb-28 md:pt-48">
      <Container>
        {/* manifesto: a breathing moment */}
        <div className="flex flex-col items-center text-center">
          <h2 className="display text-[14vw] leading-[0.86] md:text-[7.5rem] lg:text-[9.5rem]">
            {manifesto.title.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.1)} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p data-cs="fade" data-cs-delay="0.2" className="mt-10 flex flex-col text-lg leading-relaxed text-muted md:mt-12 md:text-xl">
            {manifesto.body.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </div>

        {/* call to action */}
        <div className="relative mt-32 grid gap-12 pt-14 md:mt-48 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16 md:pt-16">
          <span data-cs="draw" aria-hidden className="absolute inset-x-0 top-0 block h-px bg-line" />
          <div className="flex flex-col gap-7">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {aboutCta.eyebrow}
            </span>
            <h2 className="display text-[16vw] leading-[0.86] md:text-[6.5rem] lg:text-[8.5rem]">
              <span data-cs="lines" className="block">
                {aboutCta.title[0]}
              </span>
              <span data-cs="lines" data-cs-delay="0.1" className="block text-orange">
                {aboutCta.title[1]}
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:pb-3">
            <p data-cs="fade" className="flex flex-col text-lg leading-relaxed text-muted">
              {aboutCta.body.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <div data-cs="stagger" className="flex flex-col gap-5">
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-ink py-2 pl-7 pr-2 text-sm font-medium text-cream transition-colors duration-300 hover:bg-orange"
              >
                Let’s talk
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 ease-skayl-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <a
                href={`mailto:${aboutCta.email}`}
                className="group inline-flex w-fit items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
              >
                <span className="underline decoration-ink/25 underline-offset-4 group-hover:decoration-ink">{aboutCta.email}</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* the stack, as a footnote */}
        <div data-cs="fade" className="mt-24 flex flex-col gap-3 text-sm md:mt-32 md:flex-row md:items-baseline md:gap-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted">Our daily stack</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-ink/60">
            {toolsStack.map((t) => (
              <li key={t.name} title={t.category}>
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
