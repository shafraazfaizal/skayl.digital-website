import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";
import ShPanel from "./ShPanel";
import Wordmark from "./Wordmark";

// 13 — The brand world: logo, packaging, photography, tea, landscape,
// pattern and type, composed as one board.
export default function ShWorld({ assets }: { assets: ShAssets }) {
  const { world } = sh;
  const tile = "relative overflow-hidden rounded-[18px]";
  return (
    <ShPanel glow="50% 0%">
      <Container className="py-24 md:py-36">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow light>{world.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-5xl leading-[0.98] md:text-7xl">
              {world.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-cream/65">
            {world.body}
          </p>
        </div>

        <div
          data-cs="stagger"
          className="mt-14 grid grid-flow-dense grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:grid-rows-[repeat(7,minmax(0,104px))] md:gap-4"
        >
          <div className={`${tile} col-span-2 aspect-[4/5] md:col-span-5 md:row-span-5 md:aspect-auto`}>
            <MediaSlot src={assets.packLid} alt="Shajara canister lid and label" label="Packaging" kind="photo" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
          </div>
          <div className={`${tile} col-span-2 flex aspect-[16/7] items-center justify-center md:col-span-4 md:row-span-2 md:aspect-auto`} style={{ backgroundColor: shColours.cream }}>
            <div className="w-[52%]">
              <Wordmark logo={assets.logo} wordmark={assets.wordmark} />
            </div>
          </div>
          <div className={`${tile} flex aspect-[9/16] items-center justify-center md:col-span-3 md:row-span-4 md:aspect-auto`} style={{ backgroundColor: "#E9E3C6" }}>
            <MediaSlot src={assets.tagFront} alt="Shajara hang tag" label="Tag" fit="contain" sizes="(max-width: 768px) 50vw, 22vw" className="absolute inset-4" />
          </div>
          <div className={`${tile} col-span-2 aspect-[16/5] md:col-span-4 md:row-span-1 md:aspect-auto`}>
            <MediaSlot src={assets.patternLeaf} alt="Tea-leaf pattern" label="Pattern" kind="photo" sizes="(max-width: 768px) 50vw, 30vw" className="h-full w-full" />
          </div>
          <div className={`${tile} aspect-[9/16] md:col-span-4 md:row-span-4 md:aspect-auto`}>
            <MediaSlot src={assets.photoPour} alt="Tea being poured beside a Shajara pouch" label="Tea" kind="photo" sizes="(max-width: 768px) 50vw, 30vw" className="h-full w-full" />
          </div>
          <div className={`${tile} hidden md:col-span-3 md:row-span-3 md:block`}>
            <MediaSlot src={assets.post3} alt="Shajara illustrated social post" label="Social" kind="photo" position="50% 35%" sizes="(max-width: 768px) 50vw, 22vw" className="h-full w-full" />
          </div>
          <div className={`${tile} col-span-2 aspect-[16/7] md:col-span-5 md:row-span-2 md:aspect-auto`}>
            <MediaSlot src={assets.labelFlat} alt="The highland landscape from the canister wrap" label="Landscape" kind="photo" position="50% 95%" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
          </div>
        </div>
      </Container>
    </ShPanel>
  );
}
