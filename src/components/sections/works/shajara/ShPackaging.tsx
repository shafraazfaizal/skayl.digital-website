import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, type ShAssets } from "@/content/shajara-case-study";
import ShPanel from "./ShPanel";

// 08 — Packaging. The product photography at full scale, moving slightly
// slower than the page, then the flat canister wrap drifting across.
export default function ShPackaging({ assets }: { assets: ShAssets }) {
  const { packaging } = sh;
  return (
    <ShPanel glow="85% 12%">
      <Container className="pb-10 pt-24 md:pb-16 md:pt-36">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow light>{packaging.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-5xl leading-[0.98] md:text-7xl lg:text-8xl">
              {packaging.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-cream/65">
            {packaging.body}
          </p>
        </div>
      </Container>

      {/* hero product frame: nearly the full viewport */}
      <div className="px-3 md:px-5">
        <div data-cs="clip" className="relative h-[82svh] overflow-hidden rounded-[22px] md:h-[92svh] md:rounded-[28px]">
          <div data-cs-parallax="7" className="absolute -inset-y-[9%] inset-x-0">
            <MediaSlot
              src={assets.packStack}
              alt="Shajara canisters: the green lid with the gold wordmark, the leaf pattern and gold bands"
              label="Canisters"
              kind="photo"
              sizes="100vw"
              position="50% 52%"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* pair: different speeds for depth */}
      <Container className="grid gap-4 py-4 md:grid-cols-12 md:gap-5 md:py-5">
        <div data-cs="clip" className="relative aspect-[3/4] overflow-hidden rounded-[22px] md:col-span-5 md:mt-24">
          <div data-cs-parallax="4" className="absolute -inset-y-[6%] inset-x-0">
            <MediaSlot src={assets.packLid} alt="A Shajara canister lid beside the arched front label" label="Lid" kind="photo" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
          </div>
        </div>
        <div data-cs="clip" data-cs-delay="0.1" className="relative aspect-[3/4] overflow-hidden rounded-[22px] md:col-span-7">
          <div data-cs-parallax="9" className="absolute -inset-y-[10%] inset-x-0">
            <MediaSlot src={assets.packJourney} alt="Shajara canisters with the tea journey printed on the label" label="Journey" kind="photo" sizes="(max-width: 768px) 100vw, 55vw" className="h-full w-full" />
          </div>
        </div>
      </Container>

      {/* the flat wrap */}
      <figure className="overflow-hidden pb-24 pt-16 md:pb-36 md:pt-24">
        <div data-cs-drift="5" className="mx-auto w-[150%] max-w-none md:w-[112%] md:-ml-[6%]">
          <div className="relative aspect-[1250/770] overflow-hidden rounded-[14px] md:rounded-[20px]">
            <MediaSlot src={assets.labelFlat} alt="The flat Shajara canister wrap artwork" label="Canister wrap" kind="photo" sizes="150vw" className="h-full w-full" />
          </div>
        </div>
        <Container>
          <figcaption data-cs="fade" className="mt-6 text-[11px] uppercase tracking-[0.22em] text-cream/55">
            {packaging.wrapCaption}
          </figcaption>
        </Container>
      </figure>
    </ShPanel>
  );
}
