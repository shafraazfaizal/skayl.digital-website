import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

// 05 — Uniforms & brand application: the team as the brand on every job.
// The two real uniform designs.
export default function AvUniforms({ assets }: { assets: AvAssets }) {
  const { uniforms } = av;
  return (
    <section className="pb-24 md:pb-36">
      <Container>
        <div className="grid gap-8 border-t border-line pt-14 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16 md:pt-20">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {uniforms.eyebrow}
              <span aria-hidden className="h-px w-10" style={{ backgroundColor: avColours.cyan }} />
            </span>
            <h2 className="display text-[3rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl">
              {uniforms.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={i ? "block text-ink/30" : "block"}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-muted">
            {uniforms.body}
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-12 md:gap-5">
          {uniforms.items.map((it, i) => (
            <figure key={it.key} data-cs-focus className={`group flex flex-col gap-4 ${i === 0 ? "md:col-span-5 md:mt-24" : "md:col-span-7"}`}>
              <div data-cs="clip" data-cs-delay={String(i * 0.1)} className="relative aspect-[3/2] overflow-hidden rounded-[22px] bg-[#EDEDED] md:rounded-[28px]">
                <div data-cs-inner className="absolute inset-0 transition-transform duration-[1200ms] ease-skayl-out group-hover:scale-[1.03]">
                  <MediaSlot src={assets[it.key]} alt={`AutoVive ${it.title.toLowerCase()} — ${it.caption}`} label={it.title} kind="photo" sizes="(max-width: 768px) 100vw, 55vw" className="h-full w-full" />
                </div>
              </div>
              <figcaption className="flex items-baseline gap-4 border-t border-line pt-4">
                <span className="text-[11px] tabular-nums transition-colors duration-500 [.cs-mobile-fx_.cs-focus_&]:text-[#1590BC]" style={{ color: "#1590BC" }}>
                  0{i + 1}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px]">{it.title}</span>
                  <span className="text-sm text-muted">{it.caption}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

    </section>
  );
}
