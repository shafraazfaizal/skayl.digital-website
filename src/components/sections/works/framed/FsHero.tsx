import MediaSlot from "@/components/case-study/MediaSlot";
import { fs, fsColours, type FsAssets } from "@/content/framed-case-study";

// 01 — Hero. Same architecture as every case study: an inset dark panel,
// title and statement on the left, the project's signature visual on the
// right. Here: midnight navy, a gold glow, and a mirror lit in its room.
export default function FsHero({ assets, index }: { assets: FsAssets; index: string }) {
  const { hero } = fs;
  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]" style={{ backgroundColor: fsColours.deep }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(45% 60% at 74% 48%, ${fsColours.gold}2e, rgba(7,21,42,0) 70%), radial-gradient(60% 60% at 8% 100%, #16335C99, rgba(7,21,42,0) 70%)`,
          }}
        />
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <div className="relative grid min-h-[calc(100svh-8.5rem)] md:min-h-[660px] md:grid-cols-[1.1fr_0.9fr] lg:h-[calc(100svh-8.5rem)] lg:max-h-[990px]">
          {/* copy */}
          <div className="relative z-10 flex flex-col justify-between gap-12 p-7 md:p-12 lg:p-16">
            <div
              data-cs="stagger"
              data-cs-load
              className="flex items-start justify-between gap-6 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs"
            >
              <span>Case study</span>
              <span className="tabular-nums">{index}</span>
            </div>

            <div className="flex flex-col gap-7 md:gap-9">
              <h1 className="display text-[17vw] leading-[0.88] sm:text-[14vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem]">
                {hero.title.map((l, i) => (
                  <span key={l} data-cs="lines" data-cs-load data-cs-delay={String(0.15 + i * 0.08)} className="block whitespace-nowrap">
                    {l}
                  </span>
                ))}
              </h1>
              <p data-cs="lines" data-cs-load data-cs-delay="0.4" className="max-w-md text-2xl leading-snug text-cream/70 md:text-3xl">
                {hero.statement.replace(/\.$/, "")}
                <span style={{ color: fsColours.gold }}>.</span>
              </p>
            </div>

            <div
              data-cs="stagger"
              data-cs-load
              data-cs-delay="0.6"
              className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t py-6 text-[11px] uppercase tracking-[0.24em] text-cream/60 md:text-xs md:tracking-[0.22em]"
              style={{ borderColor: `${fsColours.gold}40` }}
            >
              <span className="flex flex-wrap gap-x-3">
                {hero.disciplines.map((d, i) => (
                  <span key={d} className="flex gap-3">
                    {i > 0 && <span style={{ color: fsColours.gold }}>/</span>}
                    {d}
                  </span>
                ))}
              </span>
              <span className="tabular-nums">{hero.years}</span>
              <span className="hidden items-center gap-2 min-[1600px]:flex" aria-hidden>
                Scroll
                <span className="relative block h-8 w-px overflow-hidden bg-cream/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 animate-[cs-scroll_2.2s_ease-in-out_infinite] bg-cream" />
                </span>
              </span>
            </div>
          </div>

          {/* the mirror, lit in its room */}
          <div className="relative flex items-end justify-center px-7 pb-7 md:items-center md:px-0 md:pb-0 md:pr-12 lg:pr-16">
            <div
              data-cs="clip"
              data-cs-load
              data-cs-delay="0.2"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-black ring-1 ring-white/10 md:aspect-auto md:h-[84%]"
            >
              <div data-cs-inner className="absolute inset-0">
                <div data-cs-parallax="4" className="absolute -inset-y-[6%] inset-x-0">
                  <MediaSlot
                    src={assets.interiorRound}
                    alt="A round Framed Splendor LED mirror glowing above a stone basin in a travertine bathroom"
                    label="Hero"
                    kind="photo"
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    position="42% 45%"
                    className="h-full w-full"
                  />
                </div>
              </div>
              <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[16px] border" style={{ borderColor: `${fsColours.gold}33` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
