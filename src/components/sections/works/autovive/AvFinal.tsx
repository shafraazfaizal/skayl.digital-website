import MediaSlot from "@/components/case-study/MediaSlot";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

// 10 — Final visual: the brand out in the world — uniform, collateral and
// car in one cinematic frame (a brand mockup), settling as it passes.
export default function AvFinal({ assets }: { assets: AvAssets }) {
  const { hero } = av;
  return (
    <section className="px-5 md:px-12">
      <div className="relative h-[80svh] min-h-[520px] overflow-hidden rounded-[28px] bg-[#0A0A0A] text-cream md:h-[92svh] md:rounded-[36px]">
        <div data-cs-zoom className="absolute inset-0">
          <MediaSlot
            src={assets.scene}
            alt="Brand mockup: the AutoVive polo, stationery and collateral beside a car"
            label="Closing visual"
            kind="photo"
            sizes="100vw"
            position="62% 55%"
            className="absolute inset-0"
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 md:flex-row md:items-end md:justify-between md:p-14">
          <div className="flex flex-col gap-4">
            <h2 data-cs="lines" className="display text-5xl leading-none md:text-8xl">
              {hero.title}
              <span style={{ color: avColours.cyan }}>.</span>
            </h2>
            <p data-cs="fade" className="flex flex-wrap gap-x-3 text-[11px] uppercase tracking-[0.28em] text-cream/70 md:text-xs">
              {hero.disciplines.map((d, i) => (
                <span key={d} className="flex gap-3">
                  {i > 0 && <span style={{ color: avColours.cyan }}>/</span>}
                  {d}
                </span>
              ))}
            </p>
          </div>
          <span data-cs="fade" className="flex flex-col items-start gap-1 text-[11px] uppercase tracking-[0.3em] text-cream/60 md:items-end md:text-xs">
            {hero.tagline}
            <span className="normal-case tracking-normal text-cream/40">Brand mockup</span>
          </span>
        </div>
      </div>
    </section>
  );
}
