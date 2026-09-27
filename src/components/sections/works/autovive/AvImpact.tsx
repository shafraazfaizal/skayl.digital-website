import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { av, avColours } from "@/content/autovive-case-study";

// 08 — What was delivered. Counts of real deliverables only;
// no invented metrics.
export default function AvImpact() {
  const { impact } = av;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <Eyebrow>{impact.eyebrow}</Eyebrow>
        <dl data-cs="stagger" className="mt-10 grid grid-cols-2 border-t border-line md:mt-14 md:grid-cols-4">
          {impact.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 border-b border-line py-8 md:border-b-0 md:py-10 ${i % 2 === 1 ? "pl-5 md:pl-0" : ""} ${i > 0 ? "md:border-l md:pl-8" : ""}`}
            >
              <dd className="display order-1 text-5xl leading-none md:text-7xl">{s.value}</dd>
              <dt className="order-2 text-[11px] uppercase tracking-[0.25em] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Delivered)
          </span>
          <ul data-cs="stagger" className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {impact.delivered.map((d) => (
              <li key={d} className="flex items-center gap-4 border-b border-line py-4 text-[15px]">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: avColours.cyan }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <p data-cs="lines" className="display mt-20 max-w-4xl text-balance text-3xl leading-[1.08] md:mt-32 md:text-5xl">
          {impact.statement}
        </p>
      </Container>
    </section>
  );
}
