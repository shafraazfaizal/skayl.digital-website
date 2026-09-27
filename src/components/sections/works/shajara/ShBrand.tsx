import Image from "next/image";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";
import Wordmark from "./Wordmark";

// 05 — Brand identity. The mark gets the stage twice: as the object it became
// (the lid, photographed) and as the flat wordmark on cream.
export default function ShBrand({ assets }: { assets: ShAssets }) {
  const { brand } = sh;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{brand.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {brand.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-muted">
            {brand.body}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          <div data-cs="clip" className="relative aspect-square overflow-hidden rounded-[22px] md:col-span-7 md:aspect-auto md:min-h-[640px]">
            <div data-cs-zoom className="absolute inset-0">
              <MediaSlot
                src={assets.detailMark}
                alt="The Shajara wordmark in gold on a green canister lid"
                label="The lid"
                kind="photo"
                sizes="(max-width: 768px) 100vw, 58vw"
                position="45% 45%"
                className="h-full w-full"
              />
            </div>
          </div>

          <div
            className="relative flex min-h-[420px] flex-col items-center justify-center gap-8 overflow-hidden rounded-[22px] px-8 py-16 md:col-span-5"
            style={{ backgroundColor: shColours.cream }}
          >
            <div data-cs="fade" className="flex w-full flex-col items-center gap-6">
              <Wordmark logo={assets.logo} wordmark={assets.wordmark} className="w-[70%]" />
              {assets.typeCaps && (
                <Image src={assets.typeCaps} alt="Authentic Ceylon Black Tea" width={260} height={28} className="h-auto w-[62%] max-w-[260px]" />
              )}
            </div>
            <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.25em] text-ink/45">Wordmark</span>
            <span className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.25em] text-ink/45">On cream</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
