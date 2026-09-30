import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { homeHero } from "@/content/home";
import HomeWall from "./HomeWall";

// 01 — Hero: SKAYL's position on the left; on the right, a single column of
// real work drifting past (see HomeWall).
export default function HomeHero() {
  return (
    <section className="pb-6 pt-8 md:pb-8 md:pt-6">
      <Container>
        <div className="grid gap-8 md:min-h-[calc(100svh-9rem)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-8 lg:gap-12">
          <div className="flex flex-col justify-center gap-10 pt-6 md:gap-8 md:py-2">
            <div className="flex flex-col gap-6 md:gap-7">
              <span data-cs="fade" data-cs-load className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                {homeHero.eyebrow}
              </span>
              <h1 className="display text-[13.4vw] leading-[0.88] sm:text-[11vw] md:text-[min(3.6rem,9.5svh)] lg:text-[min(4.5rem,10svh)] xl:text-[min(5.8rem,10svh)] 2xl:text-[min(7rem,10.5svh)]">
                {homeHero.muted.map((l, i) => (
                  <span key={l} data-cs="lines" data-cs-load data-cs-delay={String(0.1 + i * 0.08)} className="block whitespace-nowrap text-ink/45">
                    {l}
                  </span>
                ))}
                {homeHero.strong.map((l, i) => (
                  <span key={l} data-cs="lines" data-cs-load data-cs-delay={String(0.3 + i * 0.08)} className="block whitespace-nowrap">
                    {i === homeHero.strong.length - 1 ? (
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

            <div className="flex flex-col gap-7">
              <ul data-cs="stagger" data-cs-load data-cs-delay="0.6" className="flex flex-col gap-1 text-[15px] leading-relaxed text-muted md:text-base">
                {homeHero.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div data-cs="stagger" data-cs-load data-cs-delay="0.75" className="flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="primary">
                  Start a project →
                </Button>
                <Button href="/works" variant="outline">
                  View our work
                </Button>
              </div>
            </div>
          </div>

          {/* the wall: real work drifting past */}
          <div data-cs="fade" data-cs-load data-cs-delay="0.35" className="relative h-[70svh] md:h-auto">
            <HomeWall />
          </div>
        </div>
      </Container>
    </section>
  );
}
