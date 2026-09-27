import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { fs, type FsAssets } from "@/content/framed-case-study";

// 07 — Product details: four close-ups, each tied to a feature the brand
// itself states. Staggered columns; on phones each lights up as it passes.
export default function FsDetails({ assets }: { assets: FsAssets }) {
  const { details } = fs;
  return (
    <section className="pb-24 md:pb-36">
      <Container>
        <div className="flex flex-col gap-6 border-t border-line pt-14 md:flex-row md:items-end md:justify-between md:pt-20">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {details.eyebrow}
              <span aria-hidden className="h-px w-10 bg-orange" />
            </span>
            <h2 className="display text-[2.6rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              {details.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={`block ${i ? "text-ink/30" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-5">
          {details.items.map((d, i) => (
            <figure
              key={d.key}
              data-cs-focus
              className={`group flex flex-col gap-4 ${i % 2 ? "mt-12 md:mt-20" : ""} ${i === 2 ? "md:mt-8" : ""}`}
            >
              <div data-cs="clip" data-cs-delay={String(i * 0.08)} className="relative aspect-[4/5] overflow-hidden rounded-[16px] md:rounded-[22px]">
                <div data-cs-inner className="absolute inset-0">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-skayl-out group-hover:scale-[1.04]">
                  <MediaSlot src={assets[d.key]} alt={`${d.title} — ${d.caption}`} label={d.title} kind="photo" position={d.key === "detailWarm" ? "50% 78%" : "50% 50%"} sizes="(max-width: 768px) 50vw, 25vw" className="h-full w-full" />
                  </div>
                </div>
              </div>
              <figcaption className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-[15px]">
                  <span className="text-[11px] tabular-nums text-muted transition-colors duration-500 group-hover:text-orange [.cs-mobile-fx_.cs-focus_&]:text-orange">
                    0{i + 1}
                  </span>
                  {d.title}
                </span>
                <span className="text-sm leading-relaxed text-muted">{d.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
