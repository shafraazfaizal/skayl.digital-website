import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";

const LIGHT = new Set([shColours.cream, shColours.gold]);

// 07 — Colour, typography and visual language, as a guidelines spread.
export default function ShSystem({ assets }: { assets: ShAssets }) {
  const { system } = sh;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="flex flex-col gap-6">
          <Eyebrow>{system.eyebrow}</Eyebrow>
          <h2 data-cs="lines" className="display max-w-3xl text-4xl leading-[1] md:text-6xl">
            {system.headline}
          </h2>
        </div>

        {/* colour */}
        <div className="mt-14 grid gap-6 border-t border-line pt-8 md:mt-20 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Colour)
          </span>
          <ul data-cs="stagger" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:items-end">
            {system.colours.map((c, i) => (
              <li
                key={c.hex}
                className={`flex flex-col justify-between rounded-[18px] p-5 ${i === 0 ? "col-span-2 sm:col-span-1" : ""} ${
                  ["md:h-[420px]", "md:h-[340px]", "md:h-[380px]", "md:h-[300px]", "md:h-[260px]"][i]
                } h-[200px] ${LIGHT.has(c.hex) ? "text-ink" : "text-cream"} ${c.hex === shColours.cream ? "ring-1 ring-inset ring-ink/10" : ""}`}
                style={{ backgroundColor: c.hex }}
              >
                <span className="font-display text-lg leading-tight">{c.name}</span>
                <span className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.2em] opacity-75">
                  <span className="tabular-nums">{c.hex}</span>
                  <span className="normal-case tracking-normal">{c.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* typography */}
        <div className="mt-16 grid gap-6 border-t border-line pt-8 md:mt-24 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Typography)
          </span>
          <div className="flex flex-col gap-8">
            {system.typefaces.length > 0 && (
              <ul data-cs="stagger" className="flex flex-wrap gap-x-12 gap-y-4">
                {system.typefaces.map((t) => (
                  <li key={t.role} className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-muted">{t.role}</span>
                    <span className="font-display text-2xl">{t.family}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <figure data-cs="fade" className="flex flex-col gap-3">
                <div className="relative aspect-[390/287] overflow-hidden rounded-[18px]" style={{ backgroundColor: shColours.green }}>
                  <MediaSlot src={assets.typeHeadline} alt="Rooted in Sri Lanka, brewed for you! — hang tag headline" label="Headline" fit="contain" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
                </div>
                <figcaption className="text-[11px] uppercase tracking-[0.22em] text-muted">{system.typeInUse[0].caption}</figcaption>
              </figure>
              <figure data-cs="fade" data-cs-delay="0.1" className="flex flex-col gap-3">
                <div
                  className="relative flex aspect-[390/287] flex-col items-center justify-center gap-8 overflow-hidden rounded-[18px] px-8 ring-1 ring-inset ring-ink/10"
                  style={{ backgroundColor: shColours.cream }}
                >
                  <div className="relative h-8 w-full max-w-[520px] md:h-12">
                    <MediaSlot src={assets.typeCaps} alt="Authentic Ceylon Black Tea" label="Descriptor" fit="contain" sizes="520px" className="h-full w-full" />
                  </div>
                </div>
                <figcaption className="text-[11px] uppercase tracking-[0.22em] text-muted">{system.typeInUse[1].caption}</figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* visual language */}
        <div className="mt-16 grid gap-6 border-t border-line pt-8 md:mt-24 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Visual language)
          </span>
          <div className="grid gap-4 md:grid-cols-12">
            <figure className="flex flex-col gap-3 md:col-span-12">
              <div data-cs="clip" className="relative h-28 overflow-hidden rounded-[18px] md:h-40">
                <div data-cs-drift="4" className="absolute inset-y-0 -inset-x-[8%]">
                  <MediaSlot src={assets.patternLeaf} alt="The hand-drawn tea-leaf pattern from the canister wrap" label="Pattern" kind="photo" sizes="100vw" className="h-full w-full" />
                </div>
              </div>
              <figcaption className="text-[11px] uppercase tracking-[0.22em] text-muted">{system.language[0].caption}</figcaption>
            </figure>
            <figure className="flex flex-col gap-3 md:col-span-5">
              <div data-cs="fade" className="relative aspect-[390/228] overflow-hidden rounded-[18px]" style={{ backgroundColor: shColours.cream }}>
                <MediaSlot src={assets.illustrationPour} alt="Line illustration of hands pouring tea from a teapot" label="Illustration" fit="contain" sizes="(max-width: 768px) 100vw, 35vw" className="h-full w-full" />
              </div>
              <figcaption className="text-[11px] uppercase tracking-[0.22em] text-muted">{system.language[1].caption}</figcaption>
            </figure>
            <figure className="flex flex-col gap-3 md:col-span-7">
              <div data-cs="clip" className="relative aspect-[16/9] overflow-hidden rounded-[18px] md:aspect-auto md:h-full md:min-h-[260px]">
                <MediaSlot src={assets.landscape} alt="Highland forest and tea terraces from the canister wrap" label="Landscape" kind="photo" position="45% 50%" sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full" />
              </div>
              <figcaption className="text-[11px] uppercase tracking-[0.22em] text-muted">{system.language[2].caption}</figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
