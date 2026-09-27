import Link from "next/link";
import Container from "@/components/ui/Container";
import { standard } from "@/content/home";
import { principles } from "@/content/about";

// 08 — A quiet moment: the standard every project runs on, and the one
// principle that sets SKAYL apart.
export default function HomeStandard() {
  return (
    <section className="pb-24 pt-8 md:pb-36 md:pt-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {standard.eyebrow}
            </span>
            <h2 className="display text-[12vw] leading-[0.9] md:text-7xl lg:text-[6rem]">
              {standard.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <ul data-cs="stagger" className="flex flex-wrap gap-2 md:justify-end md:pb-3">
            {principles.map((p, i) => (
              <li key={p.name} className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-sm text-ink">
                <span className="font-display text-xs text-orange">{String(i + 1).padStart(2, "0")}</span>
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/about#creative-principle"
          data-cs="fade"
          className="group relative mt-16 flex flex-col gap-6 overflow-hidden rounded-[24px] bg-ink p-7 text-cream md:mt-24 md:flex-row md:items-end md:justify-between md:rounded-[32px] md:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-40 blur-[100px] transition-opacity duration-700 group-hover:opacity-60"
            style={{ backgroundColor: "#E64A19" }}
          />
          <div className="relative flex max-w-2xl flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-orange">Our creative principle</span>
            <p className="display text-3xl leading-[1.02] md:text-5xl">No music. In any form of content.</p>
            <p className="max-w-xl text-[15px] leading-relaxed text-cream/60">
              Every reel, film and social cut we make is carried by storytelling, cinematic visuals, voiceover and natural sound. For Muslim brands and creators, that’s one less thing to worry about.
            </p>
          </div>
          <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm transition-colors duration-300 group-hover:bg-cream group-hover:text-ink">
            Why we work this way →
          </span>
        </Link>
      </Container>
    </section>
  );
}
