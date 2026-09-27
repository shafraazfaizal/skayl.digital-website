import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, type ShAssets } from "@/content/shajara-case-study";

// 10 — Content creation, laid out like a magazine spread: one dominant image,
// a column of copy, and a second image breaking the grid.
export default function ShContent({ assets }: { assets: ShAssets }) {
  const { content } = sh;
  return (
    <section className="pb-24 md:pb-40">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-5">
          <div data-cs="clip" className="relative aspect-[3/4] overflow-hidden rounded-[22px] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[900px]">
            <div data-cs-parallax="5" className="absolute -inset-y-[6%] inset-x-0">
              <MediaSlot src={assets.photoPouch} alt="A Shajara cotton pouch beside a floral teapot and cups" label="Product photography" kind="photo" sizes="(max-width: 768px) 100vw, 58vw" position="50% 55%" className="h-full w-full" />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9 md:pb-10">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {content.headline}
            </h2>
            <p data-cs="fade" className="text-[17px] leading-relaxed text-muted">
              {content.body}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:gap-5">
            <div data-cs="clip" className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-[20px] md:mt-16">
              <MediaSlot src={assets.photoPour} alt="Tea poured from a floral teapot beside a Shajara pouch" label="The pour" kind="photo" sizes="(max-width: 768px) 50vw, 20vw" className="h-full w-full" />
            </div>
            <div data-cs="clip" data-cs-delay="0.1" className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-[20px]">
              <MediaSlot src={assets.detailStory} alt="Shajara’s tea journey, printed on the canister label" label="The story" kind="photo" sizes="(max-width: 768px) 50vw, 20vw" className="h-full w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
