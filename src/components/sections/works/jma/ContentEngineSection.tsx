import Container from "@/components/ui/Container";
import { DarkPanel, Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

// Deliberate editorial grid (not masonry): three rows of fixed rhythm.
const LAYOUT = [
  "md:col-span-7 md:row-span-1 md:h-[440px]",
  "md:col-span-5 md:h-[440px]",
  "md:col-span-4 md:h-[320px]",
  "md:col-span-4 md:h-[320px]",
  "md:col-span-4 md:h-[320px]",
  "md:col-span-12 md:h-[340px] md:aspect-auto sm:aspect-[16/7]",
];

// 10 — Content engine: what the modules feed on the public site.
export default function ContentEngineSection({ assets }: { assets: JmaAssets }) {
  const { content } = jma;
  return (
    <DarkPanel>
      <Container className="py-20 md:py-32">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow light>{content.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {content.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-cream/60">
            {content.body}
          </p>
        </div>

        <div className="mt-16 grid gap-3 md:mt-24 md:grid-cols-12 md:gap-4">
          {content.tiles.map((t, i) => (
            <figure
              key={t.key}
              data-cs="clip"
              data-cs-delay={String((i % 3) * 0.08)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-[22px] md:aspect-auto ${LAYOUT[i]}`}
            >
              <MediaSlot
                src={assets[t.key]}
                alt={`JMA UK — ${t.title}`}
                label={t.title}
                file={jmaAssets[t.key]}
                position="50% 0%"
                sizes="(max-width: 768px) 100vw, 55vw"
                className="absolute inset-0"
                showLabel={false}
                imgClassName="transition-transform duration-[1200ms] ease-skayl-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-7">
                <span className="font-display text-2xl text-cream md:text-3xl">{t.title}</span>
                <span className="text-sm text-cream/60">{t.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </DarkPanel>
  );
}
