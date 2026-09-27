import MediaSlot from "@/components/case-study/MediaSlot";
import { fs, fsColours, type FsAssets } from "@/content/framed-case-study";

// 11 — Final visual: the website's own hero photograph, full width, scaling
// slowly as it passes. Same architecture as the other case studies.
export default function FsFinal({ assets }: { assets: FsAssets }) {
  const { hero } = fs;
  return (
    <section className="px-5 md:px-12">
      <div className="relative h-[80svh] min-h-[520px] overflow-hidden rounded-[28px] text-cream md:h-[92svh] md:rounded-[36px]" style={{ backgroundColor: fsColours.deep }}>
        <div data-cs-zoom className="absolute inset-0">
          <MediaSlot
            src={assets.heroPhoto}
            alt="A backlit Framed Splendor mirror glowing against dark stone"
            label="Closing visual"
            kind="photo"
            sizes="100vw"
            position="62% 50%"
            className="absolute inset-0"
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07152A] via-[#07152A]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 md:flex-row md:items-end md:justify-between md:p-14">
          <div className="flex flex-col gap-4">
            <h2 data-cs="lines" className="display text-5xl leading-none md:text-8xl">
              {hero.title.join(" ")}
            </h2>
            <p data-cs="fade" className="flex flex-wrap gap-x-3 text-[11px] uppercase tracking-[0.28em] text-cream/70 md:text-xs">
              {hero.disciplines.map((d, i) => (
                <span key={d} className="flex gap-3">
                  {i > 0 && <span style={{ color: fsColours.gold }}>/</span>}
                  {d}
                </span>
              ))}
            </p>
          </div>
          <a
            data-cs="fade"
            href={fs.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-cream/30 px-5 py-3 text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-cream hover:bg-cream hover:text-ink md:text-xs"
          >
            Visit website <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
