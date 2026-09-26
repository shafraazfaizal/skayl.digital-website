import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { BrowserFrame } from "@/components/case-study/Frames";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

// 06 — The website as the hero product. The homepage is shown huge; with a
// full-page screenshot it scrolls through itself as you scroll past.
export default function WebsiteShowcase({ assets }: { assets: JmaAssets }) {
  const { website } = jma;
  const full = assets.homeFull;

  return (
    <section className="pb-24 md:pb-40">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{website.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {website.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-muted">
            {website.body}
          </p>
        </div>
      </Container>

      {/* the homepage, presented as large as the layout allows */}
      <div className="mt-16 px-5 md:mt-24 md:px-12">
        <div
          className="relative overflow-hidden rounded-[28px] px-4 pt-10 md:rounded-[36px] md:px-16 md:pt-20"
          style={{ background: "radial-gradient(90% 70% at 50% 35%, #0D5C6B 0%, #073D47 38%, #0F0505 85%)" }}
        >
          <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
          <div data-cs="clip" className="relative mx-auto max-w-[1180px]">
            {full ? (
              <BrowserFrame url={jma.websiteLabel} tone="dark" className="rounded-b-none md:rounded-b-none">
                <div data-cs-scrollimg className="relative aspect-[16/10]">
                  <MediaSlot
                    src={full}
                    alt="The JMA UK homepage"
                    label="Homepage"
                    sizes="(max-width: 768px) 100vw, 1180px"
                    position="50% 0%"
                    className="absolute inset-0"
                  />
                </div>
              </BrowserFrame>
            ) : (
              <div className="relative aspect-[4/5] md:aspect-[16/12]">
                <MediaSlot
                  src={assets.mockup}
                  alt="The JMA UK homepage shown on a laptop"
                  label="Homepage"
                  file={jmaAssets.homeFull}
                  sizes="(max-width: 768px) 100vw, 1180px"
                  position="50% 40%"
                  className="absolute inset-0"
                  imgClassName="scale-[1.06] [mask-image:radial-gradient(75%_70%_at_50%_42%,black_55%,transparent_100%)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* supporting pages */}
      <Container>
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[0.55fr_1.45fr] md:gap-16">
          <div data-cs="fade" className="flex flex-col gap-2 md:pt-4">
            <span className="display text-7xl leading-none md:text-8xl">{website.pagesStat.value}</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
              {website.pagesStat.label}
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
            {website.pages.map((p, i) => (
              <figure
                key={p.key}
                data-cs="fade"
                data-cs-delay={String(i * 0.08)}
                className={`flex flex-col gap-4 ${i === 1 ? "sm:mt-16" : i === 2 ? "sm:mt-8" : ""}`}
              >
                <BrowserFrame url={jma.websiteLabel}>
                  <div className="relative aspect-[16/11]">
                    <MediaSlot
                      src={assets[p.key]}
                      alt={`JMA UK — ${p.title}`}
                      label={p.title}
                      file={jmaAssets[p.key]}
                      tone="light"
                      showLabel={false}
                      position="50% 0%"
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="absolute inset-0"
                    />
                  </div>
                </BrowserFrame>
                <figcaption className="flex flex-col gap-1">
                  <span className="font-display text-xl">{p.title}</span>
                  <span className="text-sm text-muted">{p.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
