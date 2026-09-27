import Container from "@/components/ui/Container";
import HeroWall from "./HeroWall";
import { aboutHero } from "@/content/about";

// 01 — Hero. The headline carries the page; beside it, a live wall of real
// SKAYL work drifting past (see HeroWall).
export default function AboutHero() {
  return (
    <section className="pb-6 pt-8 md:pb-10 md:pt-10">
      <Container>
        <div className="grid gap-8 md:min-h-[calc(100svh-9rem)] md:grid-cols-[1.2fr_0.8fr] md:gap-8 lg:gap-12">
          {/* copy */}
          <div className="flex flex-col justify-between gap-12 pt-6 md:py-6">
            <div className="flex flex-col gap-7 md:gap-9">
              <span data-cs="fade" data-cs-load className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                {aboutHero.eyebrow}
              </span>
              <h1
                data-cs="lines"
                data-cs-load
                data-cs-delay="0.1"
                className="display text-[12.6vw] leading-[0.88] sm:text-[11.5vw] md:text-[4.7rem] lg:text-[6.4rem] xl:text-[7.9rem] 2xl:text-[8.6rem]"
              >
                {aboutHero.title.map((l, i) => (
                  <span key={l} className="block whitespace-nowrap">
                    {i === aboutHero.title.length - 1 ? (
                      <>
                        {l.replace(/\.$/, "")}
                        <span className="text-orange">.</span>
                      </>
                    ) : (
                      l
                    )}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col gap-10">
              <ul data-cs="stagger" data-cs-load data-cs-delay="0.55" className="flex flex-col gap-1 text-[15px] leading-relaxed text-muted md:text-base">
                {aboutHero.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <a
                href="#belief"
                data-cs="fade"
                data-cs-load
                data-cs-delay="0.8"
                className="group inline-flex w-fit items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-ink/70 transition-colors hover:text-ink md:text-xs"
              >
                <span className="relative flex h-10 w-6 justify-center rounded-full border border-ink/25">
                  <span className="mt-2 block h-2 w-px animate-[cs-scroll_2.2s_ease-in-out_infinite] bg-ink" />
                </span>
                Scroll to explore
              </a>
            </div>
          </div>

          {/* visual */}
          <div
            data-cs="clip"
            data-cs-load
            data-cs-delay="0.2"
            className="relative min-h-[62svh] overflow-hidden rounded-[28px] bg-ink md:min-h-0 md:rounded-[36px]"
                      >
            <div data-cs-inner className="absolute inset-0">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(70% 45% at 50% 105%, rgba(230,74,25,0.35), rgba(15,5,5,0) 70%)" }}
              />
              <HeroWall />
            </div>

            <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-cream/55 md:inset-x-8 md:bottom-8 md:text-[11px]">
              <span>{aboutHero.est}</span>
              <span className="text-right">
                UK
                <span className="mx-2 text-orange">/</span>
                Sri Lanka
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
