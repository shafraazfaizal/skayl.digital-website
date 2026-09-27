import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { fs, type FsAssets } from "@/content/framed-case-study";

// 05 — Product world. Big interiors, an asymmetric pair, then the products
// exactly as the store presents them.
export default function FsWorld({ assets }: { assets: FsAssets }) {
  const { world } = fs;
  const products = [assets.product1, assets.product2, assets.product3, assets.product4];
  return (
    <section className="pb-24 pt-24 md:pb-36 md:pt-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {world.eyebrow}
              <span aria-hidden className="h-px w-10 bg-orange" />
            </span>
            <h2 className="display text-[3rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl">
              {world.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                  {l}
                </span>
              ))}
              <span data-cs="lines" data-cs-delay="0.2" className="block text-ink/30">
                {world.accent}
              </span>
            </h2>
          </div>
          <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
            {world.body}
          </p>
        </div>
      </Container>

      {/* the three light temperatures, full width */}
      <div className="mt-14 px-5 md:mt-20 md:px-12">
        <div data-cs="clip" className="relative aspect-[4/3] overflow-hidden rounded-[28px] sm:aspect-[16/9] md:aspect-[2000/1241] md:rounded-[36px]">
          <div data-cs-inner className="absolute inset-0">
            <div data-cs-zoom className="absolute inset-0">
              <MediaSlot
                src={assets.interiorTones}
                alt="Three round mirrors side by side, lit warm, natural and cool"
                label="Colour temperatures"
                kind="photo"
                sizes="100vw"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-4 md:mt-6">
        <div className="grid grid-cols-12 gap-3 md:gap-6">
          <figure className="col-span-7 flex flex-col gap-3 md:col-span-5 md:pt-24">
            <div data-cs="clip" className="relative aspect-square overflow-hidden rounded-[18px] md:rounded-[24px]">
              <div data-cs-inner className="absolute inset-0">
                <MediaSlot src={assets.collection} alt="A rectangular Framed Splendor mirror in a marble bathroom" label="Collection" kind="photo" sizes="(max-width: 768px) 58vw, 40vw" className="h-full w-full" />
              </div>
            </div>
            <figcaption data-cs="fade" className="text-[11px] uppercase tracking-[0.22em] text-muted">
              The collection
            </figcaption>
          </figure>
          <div data-cs="clip" data-cs-delay="0.1" className="relative col-span-5 overflow-hidden rounded-[18px] md:col-span-7 md:aspect-[1600/1522] md:rounded-[24px]">
            <div data-cs-inner className="absolute inset-0">
              <div data-cs-parallax="5" className="absolute -inset-y-[6%] inset-x-0">
                <MediaSlot src={assets.interiorAntifog} alt="A backlit rectangular mirror beside a window in a travertine bathroom" label="Interior" kind="photo" position="30% 50%" sizes="(max-width: 768px) 42vw, 58vw" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* the products, as the store shows them */}
        <div className="mt-16 flex flex-col gap-6 md:mt-28">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
            <span data-cs="fade" className="display text-2xl md:text-3xl">
              Eight designs.
            </span>
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Arch · Round · Rectangular · Square
            </span>
          </div>
          <div data-cs="stagger" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {products.map((p, i) => (
              <div key={i} className={`relative aspect-[630/744] overflow-hidden rounded-[16px] md:rounded-[20px] ${i % 2 ? "md:translate-y-10" : ""}`}>
                <MediaSlot src={p} alt="A Framed Splendor mirror on the store's navy product tile" label="Product" kind="photo" sizes="(max-width: 768px) 50vw, 25vw" className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
