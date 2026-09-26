import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, type JmaAssets } from "@/content/jma-case-study";
import { jakarta, notoSerifDisplay } from "./fonts";

const fontFor = {
  jakarta: `${jakarta.className} font-extrabold tracking-[-0.03em]`,
  serif: `${notoSerifDisplay.className} italic text-[#C9A84C]`,
  inter: "font-sans",
} as const;

// 05 — Brand identity, presented at editorial scale: logo, palette, type,
// visual language. JMA's own colours and fonts appear here as content only.
export default function BrandIdentitySection({ assets }: { assets: JmaAssets }) {
  const { brand } = jma;
  return (
    <section className="pb-24 pt-12 md:pb-40 md:pt-16">
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

        {/* logo + palette */}
        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12">
          <div
            data-cs="clip"
            className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:col-span-7 md:aspect-auto md:min-h-[560px] md:rounded-[28px]"
            style={{ background: "linear-gradient(160deg, #0D5C6B 0%, #073D47 100%)" }}
          >
            <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
            <MediaSlot
              src={assets.logo}
              alt="JMA UK logo"
              label="JMA logo"
              kind="photo"
              showLabel={false}
              file="/work/jma-uk/logo.svg"
              fit="contain"
              sizes="(max-width: 768px) 90vw, 50vw"
              className="absolute inset-[18%]"
              tone="dark"
            />
            <span className="absolute bottom-5 left-6 text-[11px] uppercase tracking-[0.25em] text-cream/55">
              Logo
            </span>
          </div>

          <div data-cs="stagger" className="flex flex-col gap-2 md:col-span-5">
            {brand.colours.map((c, i) => {
              const light = c.hex === "#F5F0E1" || c.hex === "#C9A84C";
              return (
                <div
                  key={c.hex}
                  className={`flex flex-1 items-end justify-between rounded-[18px] px-6 py-5 ${light ? "text-ink" : "text-cream"
                    } ${c.hex === "#F5F0E1" ? "ring-1 ring-inset ring-ink/10" : ""}`}
                  style={{ backgroundColor: c.hex, minHeight: i === 0 ? 150 : 88 }}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[11px] uppercase tracking-[0.22em] opacity-60">
                      {c.role}
                    </span>
                    <span className="font-display text-xl">{c.name}</span>
                  </span>
                  <span className="text-sm tabular-nums opacity-70">{c.hex}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* typography */}
        <div className="mt-4 overflow-hidden rounded-[24px] border border-line md:rounded-[28px]">
          {brand.type.map((t, i) => (
            <div
              key={t.family}
              className={`grid gap-4 px-6 py-8 md:grid-cols-[220px_1fr] md:items-baseline md:gap-10 md:px-10 md:py-12 ${i > 0 ? "border-t border-line" : ""
                }`}
            >
              <div data-cs="fade" className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted">{t.role}</span>
                <span className="text-[15px] text-ink">{t.family}</span>
              </div>
              <p
                data-cs="fade"
                className={`${fontFor[t.font as keyof typeof fontFor]} ${t.font === "inter"
                    ? "max-w-2xl text-xl leading-relaxed text-ink/80 md:text-2xl"
                    : "text-[2.4rem] leading-[1.02] md:text-6xl lg:text-7xl"
                  }`}
              >
                {t.sample}
              </p>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink/[0.02] px-6 py-4 text-[13px] text-muted md:px-10">
            <span>Wordmark set in Helvetica Bold</span>
            <span style={{ fontFamily: "Helvetica, Arial, sans-serif" }} className="font-bold uppercase tracking-wide text-ink">
              Jaffna Muslim Association UK
            </span>
          </div>
        </div>

        {/* visual language — only rendered when real photography exists */}
        {assets.photo1 && (
          <div className="mt-4 grid gap-4 md:grid-cols-12">
            <figure
              data-cs="clip"
              className={`relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink md:rounded-[28px] ${assets.photo2 ? "md:col-span-7" : "md:col-span-12 md:aspect-[16/7]"
                }`}
            >
              <MediaSlot
                src={assets.photo1}
                alt="Jaffna Muslim Association UK"
                label="Photography"
                kind="photo"
                sizes="(max-width: 768px) 100vw, 60vw"
                className="h-full w-full"
              />
            </figure>
            {assets.photo2 && (
              <div className="flex flex-col gap-4 md:col-span-5">
                {[assets.photo2, assets.photo3].filter(Boolean).map((src, i) => (
                  <figure
                    key={src}
                    data-cs="clip"
                    data-cs-delay={String(0.1 + i * 0.1)}
                    className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-ink md:aspect-auto md:min-h-[200px] md:flex-1 md:rounded-[28px]"
                  >
                    <MediaSlot
                      src={src as string}
                      alt="Jaffna Muslim Association UK"
                      label="Photography"
                      kind="photo"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="h-full w-full"
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}