import Container from "@/components/ui/Container";
import Wordmark from "@/components/ui/Wordmark";
import { creativePrinciple as cp } from "@/content/about";

// 04 — The creative principle, as a manifesto. The giant mark sits behind the
// type and moves more slowly than it, for depth.
export default function CreativePrinciple() {
  return (
    <section id="creative-principle" className="scroll-mt-24 px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
        {/* depth: the mark, very faint, and a thin streak of light */}
        <div aria-hidden data-cs-parallax="10" className="pointer-events-none absolute -bottom-[4%] -left-[6%] w-[120%] text-cream opacity-[0.04] md:w-[92%]">
          <Wordmark className="h-auto w-full" />
        </div>
        <div aria-hidden data-cs-drift="8" className="pointer-events-none absolute left-[8%] top-[14%] h-[40%] w-[70%]">
          <div
            className="h-full w-full -rotate-12"
            style={{ background: "radial-gradient(50% 12% at 50% 50%, rgba(230,74,25,0.45), rgba(230,74,25,0.08) 55%, rgba(15,5,5,0) 100%)" }}
          />
        </div>
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <Container className="relative py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div className="flex flex-col gap-8">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-orange md:text-xs">
                {cp.eyebrow}
              </span>
              <h2 className="display text-[18vw] leading-[0.84] md:text-[7.5rem] lg:text-[9.5rem]">
                {cp.title.map((w, i) => (
                  <span key={w} data-cs="lines" data-cs-delay={String(i * 0.1)} className={`block ${i === cp.title.length - 1 ? "text-orange" : ""}`}>
                    {w}
                  </span>
                ))}
              </h2>
            </div>

            <div className="flex flex-col justify-end gap-6 md:pb-4">
              <p data-cs="lines" className="display text-3xl leading-[1.05] md:text-[2.6rem]">
                {cp.lead}
              </p>
              <div data-cs="stagger" className="flex flex-col gap-5 text-[16px] leading-relaxed text-cream/65 md:text-[17px]">
                {cp.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-cream/15 pt-10 md:mt-24 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div className="flex flex-col gap-5">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.25em] text-cream/45">
                Where the craft goes instead
              </span>
              <ul data-cs="stagger" className="flex flex-wrap gap-2">
                {cp.craft.map((c) => (
                  <li key={c} className="rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/80">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <p data-cs="fade" className="font-display text-xl leading-snug md:text-2xl">
                {cp.promise}
              </p>
              <p data-cs="fade" className="text-sm leading-relaxed text-cream/50">
                {cp.note}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
