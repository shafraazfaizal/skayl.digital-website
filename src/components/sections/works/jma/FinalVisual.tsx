import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

// 15 — Closing cinematic visual with the way out to the live site.
export default function FinalVisual({ assets }: { assets: JmaAssets }) {
  const { hero } = jma;
  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/8]">
          <div data-cs-zoom className="absolute inset-0">
            {assets.closing ? (
              <MediaSlot
                src={assets.closing}
                alt="Jaffna Muslim Association UK"
                label="Closing visual"
                sizes="100vw"
                className="absolute inset-0"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(70% 90% at 70% 30%, #0D5C6B 0%, #073D47 45%, #0F0505 100%)",
                  }}
                />
                <MediaSlot
                  src={assets.mockup}
                  alt="The JMA UK homepage"
                  label="Closing visual"
                  file={jmaAssets.closing}
                  position="50% 42%"
                  sizes="60vw"
                  className="absolute inset-y-0 right-0 w-full opacity-60 mix-blend-lighten md:w-[62%]"
                  imgClassName="[mask-image:radial-gradient(90%_80%_at_55%_45%,black_45%,transparent_100%)]"
                />
              </>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-7 md:flex-row md:items-end md:justify-between md:p-14">
            <div className="flex flex-col gap-3">
              <span data-cs="lines" className="display text-6xl leading-[0.9] md:text-8xl">
                {hero.title}
              </span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-cream/60 md:text-xs">
                {hero.disciplines.join(" / ")}
              </span>
            </div>
            <a
              href={jma.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 ease-skayl-out hover:scale-[1.03]"
            >
              Visit website <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
