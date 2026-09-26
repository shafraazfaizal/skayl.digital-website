import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { jma } from "@/content/jma-case-study";

// 13 — Impact. Real numbers rendered in the HTML (no count-up from zero).
export default function ImpactSection() {
  const { impact } = jma;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <Eyebrow>{impact.eyebrow}</Eyebrow>
        <dl data-cs="stagger" className="mt-10 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {impact.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 border-b border-line py-10 md:border-b-0 md:py-14 ${
                i % 2 === 1 ? "border-l pl-6" : ""
              } ${i > 0 ? "md:border-l md:pl-8" : ""}`}
            >
              <dd className="display text-7xl leading-none md:text-8xl">{s.value}</dd>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-12 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
            {impact.statement}
          </p>
          <p data-cs="fade" className="max-w-xs text-[15px] text-muted md:text-right">
            {impact.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
