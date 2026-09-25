import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { principles, creativePrinciple } from "@/content/about";

export default function CorePrinciples() {
  return (
    <section id="principles" className="scroll-mt-28 py-24 md:py-28">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col gap-16">
          <div className="flex flex-col gap-4">
            <Reveal>
              <span className="text-sm font-medium text-muted">
                Core Principles
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-h2 text-4xl sm:text-5xl md:text-6xl">
                What we won’t compromise on.
              </h2>
            </Reveal>
          </div>

          {/* Stacked principles with hairline dividers */}
          <div className="border-t border-line">
            {principles.map((p) => (
              <Reveal key={p.name}>
                <div className="flex flex-col gap-3 border-b border-line py-12">
                  <h3 className="font-display text-3xl tracking-tightest md:text-4xl">
                    {p.name}
                  </h3>
                  <p className="max-w-lg text-lg italic leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Creative principle — set apart */}
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-line pt-16">
              <span className="text-sm font-medium italic text-orange">
                {creativePrinciple.eyebrow}
              </span>
              <h3 className="font-display text-3xl tracking-tightest md:text-4xl">
                {creativePrinciple.title}
              </h3>
              <div className="flex max-w-xl flex-col gap-5">
                {creativePrinciple.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-xl italic leading-relaxed text-ink"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
