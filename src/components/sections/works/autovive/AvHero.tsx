import MediaSlot from "@/components/case-study/MediaSlot";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

// 01 — Hero. The case-study architecture every project shares: an inset dark
// panel, title and statement on the left, the signature visual on the right.
// Here: deep navy, a cyan glow, and the brand's own "SHINE" post standing
// like a poster.
export default function AvHero({ assets, index }: { assets: AvAssets; index: string }) {
  const { hero } = av;
  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]" style={{ backgroundColor: avColours.deep }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(45% 60% at 74% 48%, ${avColours.cyan}33, rgba(6,21,38,0) 70%), radial-gradient(60% 60% at 8% 100%, ${avColours.navy}cc, rgba(6,21,38,0) 70%)`,
          }}
        />
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <div className="relative grid min-h-[calc(100svh-8.5rem)] md:min-h-[660px] md:grid-cols-[1.1fr_0.9fr] lg:h-[calc(100svh-8.5rem)] lg:max-h-[990px]">
          {/* copy */}
          <div className="relative z-10 flex flex-col justify-between gap-12 p-7 md:p-12 lg:p-16">
            <div data-cs="stagger" data-cs-load className="flex items-start justify-between gap-6 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
              <span>Case study</span>
              <span className="tabular-nums">{index}</span>
            </div>

            <div className="flex flex-col gap-7 md:gap-9">
              <h1 data-cs="lines" data-cs-load data-cs-delay="0.15" className="display whitespace-nowrap text-[17vw] leading-[0.88] sm:text-[14vw] md:text-[5rem] lg:text-[6.6rem] xl:text-[8rem] 2xl:text-[9rem]">
                {hero.title}
                <span style={{ color: avColours.cyan }}>.</span>
              </h1>
              <p data-cs="lines" data-cs-load data-cs-delay="0.4" className="max-w-lg text-2xl leading-snug text-cream/75 md:text-3xl">
                {hero.statement.join(" ")}
              </p>
            </div>

            <div
              data-cs="stagger"
              data-cs-load
              data-cs-delay="0.6"
              className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t py-6 text-[11px] uppercase tracking-[0.24em] text-cream/60 md:text-xs md:tracking-[0.22em]"
              style={{ borderColor: `${avColours.cyan}40` }}
            >
              <span className="flex flex-wrap gap-x-3">
                {hero.disciplines.map((d, i) => (
                  <span key={d} className="flex gap-3">
                    {i > 0 && <span style={{ color: avColours.cyan }}>/</span>}
                    {d}
                  </span>
                ))}
              </span>
              <span className="tabular-nums">{hero.years}</span>
              <span className="hidden items-center gap-2 min-[1600px]:flex" aria-hidden>
                Scroll to explore
                <span className="relative block h-8 w-px overflow-hidden bg-cream/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 animate-[cs-scroll_2.2s_ease-in-out_infinite] bg-cream" />
                </span>
              </span>
            </div>
          </div>

          {/* the brand's own poster */}
          <div className="relative flex items-end justify-center px-7 pb-7 md:items-center md:px-0 md:pb-0 md:pr-12 lg:pr-16">
            <div
              data-cs="clip"
              data-cs-load
              data-cs-delay="0.2"
              className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-[22px] ring-1 ring-white/10 md:w-[92%]"
              style={{ backgroundColor: avColours.navy }}
            >
              <div data-cs-inner className="absolute inset-0">
                <div data-cs-parallax="3" className="absolute -inset-y-[4%] inset-x-0">
                  <MediaSlot
                    src={assets.post4}
                    alt="AutoVive launch post: SHINE — because dull isn’t your vibe"
                    label="Hero"
                    kind="photo"
                    priority
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="h-full w-full"
                  />
                </div>
              </div>
              <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[16px] border" style={{ borderColor: `${avColours.cyan}40` }} />
            </div>
            <span className="absolute bottom-7 right-7 hidden text-[10px] uppercase tracking-[0.3em] text-cream/50 md:right-12 md:block lg:right-16">
              {hero.tagline}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
