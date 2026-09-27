import Container from "@/components/ui/Container";
import { principles } from "@/content/about";

// 03 — Principles: five columns divided by hairlines that draw themselves.
export default function PrinciplesSection() {
  return (
    <section id="principles" className="scroll-mt-24 py-24 md:py-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              Our principles
            </span>
            <h2 data-cs="lines" className="display text-5xl leading-[0.95] md:text-7xl lg:text-[5.5rem]">
              What we won’t compromise on.
            </h2>
          </div>
          <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
            Not values on a wall. The rules we make decisions by — and the ones you can hold us to.
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          <span data-cs="draw" aria-hidden className="absolute inset-x-0 top-0 block h-px bg-line" />
          <ol className="grid md:grid-cols-5">
            {principles.map((p, i) => (
              <li key={p.name} data-cs-focus className="group relative flex gap-6 border-b border-line py-8 md:flex-col md:gap-5 md:border-b-0 md:px-6 md:pb-4 md:pt-10 md:first:pl-0">
                {i > 0 && (
                  <span data-cs="draw" data-cs-axis="y" data-cs-delay={String(i * 0.08)} aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block" />
                )}
                <span
                  data-cs="fade"
                  data-cs-delay={String(i * 0.06)}
                  className="font-display text-sm tabular-nums text-ink/35 transition-colors duration-500 group-hover:text-orange [.cs-mobile-fx_.cs-focus_&]:text-orange md:text-base"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div data-cs="fade" data-cs-delay={String(0.1 + i * 0.06)} className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl leading-tight transition-transform duration-500 ease-skayl-out group-hover:translate-x-1 [.cs-mobile-fx_.cs-focus_&]:translate-x-1 md:min-h-[2.5em] md:text-[1.6rem]">
                    {p.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-ink [.cs-mobile-fx_.cs-focus_&]:text-ink">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
