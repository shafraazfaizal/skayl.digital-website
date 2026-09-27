import LoopVideo from "@/components/case-study/LoopVideo";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";

// 01 — Cinematic hero. The real product film stands like a campaign poster
// beside the title, in Shajara's deep green with a warm light behind it.
export default function ShHero({ assets, index }: { assets: ShAssets; index: string }) {
  const { hero } = sh;
  return (
    <section className="px-5 md:px-12">
      <div
        className="relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]"
        style={{ backgroundColor: "#0B1711" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(45% 60% at 74% 48%, ${shColours.gold}30, rgba(11,23,17,0) 70%), radial-gradient(60% 60% at 10% 100%, ${shColours.green}66, rgba(11,23,17,0) 70%)`,
          }}
        />
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <div className="relative grid min-h-[calc(100svh-8.5rem)] md:min-h-[680px] md:grid-cols-[1.15fr_0.85fr] lg:h-[calc(100svh-8.5rem)] lg:max-h-[1000px]">
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
              <h1
                data-cs="lines"
                data-cs-load
                data-cs-delay="0.15"
                className="display text-[19vw] leading-[0.88] sm:text-[15vw] md:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem]"
              >
                {hero.title}
              </h1>
              <p
                data-cs="lines"
                data-cs-load
                data-cs-delay="0.4"
                className="max-w-md text-2xl leading-snug text-cream/70 md:text-3xl"
              >
                {hero.statement}
              </p>
            </div>

            <div
              data-cs="stagger"
              data-cs-load
              data-cs-delay="0.6"
              className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t py-6 text-[11px] uppercase tracking-[0.28em] text-cream/60 md:text-xs"
              style={{ borderColor: `${shColours.gold}40` }}
            >
              <span className="flex flex-wrap gap-x-3">
                {hero.disciplines.map((d, i) => (
                  <span key={d} className="flex gap-3">
                    {i > 0 && <span style={{ color: shColours.gold }}>/</span>}
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

          {/* the film, standing like a poster */}
          <div className="relative flex items-end justify-center px-7 pb-7 md:items-center md:px-0 md:pb-0 md:pr-12 lg:pr-16">
            <div
              data-cs="clip"
              data-cs-load
              data-cs-delay="0.2"
              className="relative aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-[22px] bg-black ring-1 ring-white/10 md:h-[82%] md:w-auto md:max-w-none"
            >
              <div data-cs-inner className="absolute inset-0">
                {assets.film ? (
                  <LoopVideo
                    src={assets.film}
                    poster={assets.filmPoster}
                    label="Shajara Tea product film"
                    className="h-full w-full object-cover"
                    pauseControl
                    controlsClassName="absolute bottom-4 right-4 z-10"
                  />
                ) : (
                  <MediaSlot src={assets.packLid} alt="Shajara Tea canisters" label="Hero" priority className="h-full w-full" kind="photo" />
                )}
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-[16px] border"
                style={{ borderColor: `${shColours.gold}33` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
