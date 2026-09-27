import Link from "next/link";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import Container from "@/components/ui/Container";
import type { LegalDoc } from "@/content/legal";

/**
 * Legal documents, set like the rest of the site: an editorial header with
 * "the short version", a sticky contents list on desktop, and numbered,
 * readable sections. Renders from content/legal.ts.
 */
export default function LegalPage({ doc, other }: { doc: LegalDoc; other: { label: string; href: string } }) {
  return (
    <CaseStudyMotion>
      <section className="pb-12 pt-10 md:pb-20 md:pt-20">
        <Container>
          <span data-cs="fade" data-cs-load className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
            Legal
            <span aria-hidden className="h-px w-10 bg-orange" />
          </span>
          <h1 data-cs="lines" data-cs-load data-cs-delay="0.08" className="display mt-7 text-[13vw] leading-[0.92] sm:text-7xl md:text-8xl">
            {doc.title}
            <span className="text-orange">.</span>
          </h1>
          <p data-cs="fade" data-cs-load data-cs-delay="0.3" className="mt-6 text-[11px] uppercase tracking-[0.24em] text-muted">
            Last updated {doc.updated}
          </p>

          <div data-cs="fade" data-cs-load data-cs-delay="0.4" className="mt-12 grid gap-6 rounded-[24px] bg-ink p-7 text-cream md:mt-16 md:grid-cols-[200px_1fr] md:rounded-[32px] md:p-10">
            <span className="text-[11px] uppercase tracking-[0.26em] text-cream/55">The short version</span>
            <ul className="flex flex-col gap-3">
              {doc.summary.map((s) => (
                <li key={s} className="flex gap-4 text-[17px] leading-relaxed text-cream/85 md:text-lg">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-[240px_1fr] md:gap-16 md:pt-16 lg:grid-cols-[280px_1fr]">
            {/* contents */}
            <nav aria-label="Contents" className="hidden md:block">
              <div className="sticky top-28 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.26em] text-muted">Contents</span>
                <ol className="flex flex-col">
                  {doc.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="group flex gap-3 border-b border-line py-2.5 text-[14px] text-ink/70 transition-colors hover:text-ink">
                        <span className="w-6 tabular-nums text-muted transition-colors group-hover:text-orange">{String(i + 1).padStart(2, "0")}</span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <Link href={other.href} className="mt-4 text-[13px] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink">
                  {other.label} →
                </Link>
              </div>
            </nav>

            {/* the document */}
            <div className="flex max-w-[680px] flex-col gap-14 md:gap-16">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                  <div data-cs="fade" className="flex items-baseline gap-4">
                    <span className="text-[12px] tabular-nums text-orange">{String(i + 1).padStart(2, "0")}</span>
                    <h2 id={`${s.id}-h`} className="display text-[1.8rem] leading-[1.1] md:text-[2.1rem]">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-5 flex flex-col gap-4 md:pl-9">
                    {s.blocks.map((b, k) =>
                      b.type === "list" ? (
                        <ul key={k} className="flex flex-col border-t border-line">
                          {b.items.map((it) => (
                            <li key={it} className="flex gap-4 border-b border-line py-3 text-[16px] leading-relaxed text-ink/80 md:text-[17px]">
                              <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p key={k} className="text-[16px] leading-[1.75] text-ink/80 md:text-[17px]">
                          {b.text}
                        </p>
                      )
                    )}
                  </div>
                </section>
              ))}

              <div className="flex flex-col gap-3 border-t border-line pt-8 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Questions?{" "}
                  <a href="mailto:hello@skayl.digital" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-orange">
                    hello@skayl.digital
                  </a>
                </span>
                <Link href={other.href} className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-orange md:hidden">
                  {other.label} →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </CaseStudyMotion>
  );
}
