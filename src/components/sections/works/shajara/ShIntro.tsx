import Container from "@/components/ui/Container";
import { sh } from "@/content/shajara-case-study";

// 02 — Project intelligence + the framing statement (same architecture as the
// other case studies).
export default function ShIntro() {
  return (
    <section className="pb-20 pt-20 md:pb-32 md:pt-28">
      <Container>
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Project intelligence)
          </span>
          <dl data-cs="stagger" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {sh.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-muted">{m.label}</dt>
                <dd className="flex flex-col gap-1 text-[15px] leading-snug text-ink">
                  {m.value.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-[1.35fr_0.65fr] md:items-end md:gap-16">
          <h2 data-cs="lines" className="display text-balance text-[2.6rem] leading-[1] sm:text-5xl md:text-6xl lg:text-7xl">
            {sh.intro.statement}
          </h2>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-muted">
            {sh.intro.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
