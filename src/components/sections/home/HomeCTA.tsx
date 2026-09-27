import Link from "next/link";
import Container from "@/components/ui/Container";
import { homeCta } from "@/content/home";

// 10 — The close, on cream with a warm light low on the right, so the dark
// footer arrives as its own moment.
export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-36">
      <div
        aria-hidden
        data-cs-parallax="10"
        className="pointer-events-none absolute -right-[10%] bottom-[-30%] h-[80%] w-[55%] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(230,74,25,0.7), rgba(255,138,101,0.25) 60%, rgba(245,240,225,0))" }}
      />
      <Container className="relative">
        <span data-cs="draw" aria-hidden className="mb-14 block h-px bg-line md:mb-20" />
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-7">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {homeCta.eyebrow}
            </span>
            <h2 className="display text-[15vw] leading-[0.86] md:text-[6.5rem] lg:text-[8.5rem]">
              <span data-cs="lines" className="block">
                {homeCta.title[0]}
              </span>
              <span data-cs="lines" data-cs-delay="0.1" className="block">
                {homeCta.title[1].replace(/\?$/, "")}
                <span className="text-orange">?</span>
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-8 md:pb-3">
            <p data-cs="fade" className="text-lg leading-relaxed text-muted">
              {homeCta.body}
            </p>
            <div data-cs="stagger" className="flex flex-col gap-5">
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-ink py-2 pl-7 pr-2 text-sm font-medium text-cream transition-colors duration-300 hover:bg-orange"
              >
                Start a project
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 ease-skayl-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <a
                href={`mailto:${homeCta.email}`}
                className="group inline-flex w-fit items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
              >
                <span className="underline decoration-ink/25 underline-offset-4 group-hover:decoration-ink">{homeCta.email}</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
