import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { av, avColours, type AvAssets, type AvAssetKey } from "@/content/autovive-case-study";

const wall: { key: AvAssetKey; alt: string; cls: string; delay: number }[] = [
  { key: "post6", alt: "Post: It’s time to Shine — so your ride can flex too", cls: "col-span-2 md:col-span-6 md:row-span-2", delay: 0 },
  { key: "post2", alt: "Post: Skip the hassle — tap, sip, and let AutoVive handle the rest", cls: "md:col-span-3", delay: 0.08 },
  { key: "post1", alt: "Post: Time. Peace of mind. Effortless wins.", cls: "md:col-span-3", delay: 0.16 },
  { key: "post5", alt: "Post: Even the finest need a little attention", cls: "md:col-span-3", delay: 0.1 },
  { key: "post9", alt: "Post: We shine your car — auto detailing offer", cls: "md:col-span-3", delay: 0.18 },
  { key: "post7", alt: "Post: AutoVive your car", cls: "md:col-span-4", delay: 0.06 },
  { key: "post3", alt: "Post: Dust settles. But should it settle here?", cls: "md:col-span-4 md:mt-12", delay: 0.12 },
  { key: "post4", alt: "Post: SHINE — because dull isn’t your vibe", cls: "col-span-2 md:col-span-4", delay: 0.18 },
];

// 06 — Content: an editorial wall of the real posts at different sizes and
// heights, on the brand's own dark ground.
export default function AvContent({ assets }: { assets: AvAssets }) {
  const { content } = av;
  return (
    <Container className="py-24 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
        <div className="flex flex-col gap-6">
          <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
            {content.eyebrow}
            <span aria-hidden className="h-px w-10" style={{ backgroundColor: avColours.cyan }} />
          </span>
          <h2 className="display text-[3rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl">
            {content.title.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block" style={i ? { color: avColours.cyan } : undefined}>
                {l}
              </span>
            ))}
          </h2>
        </div>
        <p data-cs="fade" className="max-w-sm text-[16px] leading-relaxed text-cream/60">
          {content.body}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-5">
        {wall.map((w) => (
          <div key={w.key} data-cs="clip" data-cs-delay={String(w.delay)} className={`group relative aspect-square overflow-hidden rounded-[16px] md:rounded-[22px] ${w.cls}`}>
            <div data-cs-inner className="absolute inset-0 transition-transform duration-[1200ms] ease-skayl-out group-hover:scale-[1.04]">
              <MediaSlot src={assets[w.key]} alt={w.alt} label="Post" kind="photo" sizes="(max-width: 768px) 50vw, 33vw" className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
