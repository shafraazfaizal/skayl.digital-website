import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, type JmaAssets } from "@/content/jma-case-study";

// 01 — Cinematic hero. Framed as an inset dark panel (the site's cinematic
// card language), with the real homepage mockup and JMA's teal as the glow.
export default function CaseStudyHero({ assets, index }: { assets: JmaAssets; index: string }) {
  const { hero } = jma;
  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 65% at 76% 42%, rgba(13,92,107,0.55), rgba(15,5,5,0) 72%)",
          }}
        />
        <div
          aria-hidden
          className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        />

        <div className="relative grid min-h-[calc(100svh-8.5rem)] md:min-h-[640px] md:grid-cols-[1.08fr_0.92fr] lg:h-[calc(100svh-8.5rem)] lg:max-h-[980px]">
          {/* copy */}
          <div className="relative z-10 flex flex-col justify-between gap-10 p-7 pb-0 md:p-12 lg:p-16">
            <div
              data-cs="stagger"
              data-cs-load
              className="flex items-start justify-between gap-6 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs"
            >
              <span>Case study</span>
              <span className="tabular-nums">{index}</span>
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-3">
                <span
                  data-cs="fade"
                  data-cs-load
                  data-cs-delay="0.1"
                  className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs"
                >
                  {hero.client}
                </span>
                <h1
                  data-cs="lines"
                  data-cs-load
                  data-cs-delay="0.15"
                  className="display text-[22vw] leading-[0.86] sm:text-[18vw] md:text-[9rem] lg:text-[11rem] xl:text-[12.5rem]"
                >
                  {hero.title}
                </h1>
              </div>
              <p
                data-cs="lines"
                data-cs-load
                data-cs-delay="0.35"
                className="max-w-md text-2xl leading-snug text-cream/70 md:text-3xl"
              >
                {hero.statement}
              </p>
            </div>

            <div
              data-cs="stagger"
              data-cs-load
              data-cs-delay="0.55"
              className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t border-cream/15 py-6 text-[11px] uppercase tracking-[0.28em] text-cream/60 md:text-xs"
            >
              <span className="flex flex-wrap gap-x-3">
                {hero.disciplines.map((d, i) => (
                  <span key={d} className="flex gap-3">
                    {i > 0 && <span className="text-cream/25">/</span>}
                    {d}
                  </span>
                ))}
              </span>
              <span className="tabular-nums">{hero.years}</span>
              <span className="hidden items-center gap-2 md:flex" aria-hidden>
                Scroll
                <span className="relative block h-8 w-px overflow-hidden bg-cream/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 animate-[cs-scroll_2.2s_ease-in-out_infinite] bg-cream" />
                </span>
              </span>
            </div>
          </div>

          {/* real homepage mockup */}
          <div className="relative min-h-[420px] md:min-h-0">
            <div
              data-cs="clip"
              data-cs-load
              data-cs-delay="0.1"
              className="absolute inset-0 md:inset-y-0 md:-left-8 md:right-0"
            >
              <div data-cs-parallax="5" className="absolute -inset-y-[6%] inset-x-0">
                <MediaSlot
                  src={assets.mockup}
                  alt="The JMA UK homepage shown on a laptop"
                  label="Homepage mockup"
                  file="/work/jma-uk/hero.png"
                  sizes="(max-width: 768px) 100vw, 46vw"
                  priority
                  position="50% 45%"
                  className="h-full w-full"
                  imgClassName="scale-[1.08] [mask-image:radial-gradient(120%_85%_at_60%_45%,black_55%,transparent_100%)]"
                />
              </div>
              {/* blend the render's own backdrop into the panel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent md:bg-gradient-to-r md:from-ink md:from-[6%] md:via-transparent md:via-[38%] md:to-ink/40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
