import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";
import { GoldRule } from "./ShPanel";

// 03 — The challenge. The highlands aren't stock photography: they're the
// illustration printed on the canister itself.
export default function ShChallenge({ assets }: { assets: ShAssets }) {
  const { challenge } = sh;
  return (
    <div className="grid gap-12 py-20 md:grid-cols-[1fr_0.9fr] md:gap-0 md:py-0">
      <Container className="flex flex-col justify-center gap-8 md:py-32 md:pr-16">
        <Eyebrow light>{challenge.eyebrow}</Eyebrow>
        <h2 data-cs="lines" className="display max-w-xl text-4xl leading-[1] md:text-6xl">
          {challenge.headline}
        </h2>
        <div data-cs="stagger" className="flex max-w-lg flex-col gap-5 text-[17px] leading-relaxed text-cream/65">
          {challenge.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div data-cs="stagger" className="mt-4 flex flex-col gap-2 md:mt-8">
          <GoldRule className="mb-4" />
          {challenge.equation.map((w, i) => (
            <span key={w} className="display flex items-baseline gap-4 text-3xl leading-tight md:text-5xl">
              {i > 0 && (
                <span className="text-2xl md:text-3xl" style={{ color: shColours.gold }}>
                  ×
                </span>
              )}
              {w}
            </span>
          ))}
        </div>
      </Container>

      <figure className="relative mx-5 md:mx-0">
        <div data-cs="clip" className="relative h-[70svh] overflow-hidden rounded-[22px] md:h-full md:min-h-[760px] md:rounded-none">
          <div data-cs-parallax="6" className="absolute -inset-y-[8%] inset-x-0">
            <MediaSlot
              src={assets.labelFlat}
              alt="The Shajara canister wrap: an arch opening onto a mountain, the sun and highland tea terraces"
              label="Highlands"
              kind="photo"
              sizes="(max-width: 768px) 100vw, 46vw"
              position="50% 50%"
              className="h-full w-full"
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12281D]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-[#12281D] md:via-transparent md:via-[30%]" />
        </div>
        <figcaption className="absolute bottom-5 right-5 max-w-[16rem] text-right text-[11px] uppercase leading-relaxed tracking-[0.22em] text-cream/75">
          {challenge.caption}
        </figcaption>
      </figure>
    </div>
  );
}
