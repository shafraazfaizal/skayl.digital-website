import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { ServiceChapter as Chapter } from "@/content/services";

// 03 — One chapter per discipline. Desktop: the copy holds (sticky) while the
// real work scrolls past beside it, alternating sides chapter to chapter.
// Phones: copy first, then the work — each list line lights as it passes.
export default function ServiceChapter({ chapter, flip, visual }: { chapter: Chapter; flip?: boolean; visual: ReactNode }) {
  const c = chapter;
  return (
    <section id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <span data-cs="draw" aria-hidden className="block h-px bg-line" />
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:grid md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* copy */}
          {/* phones: title → work → details; desktop: one sticky column */}
          <div className={cn("contents md:col-span-5 md:block", flip && "md:order-2")}>
            <div className="contents md:sticky md:top-28 md:flex md:flex-col md:gap-8">
              <div className="order-1 flex flex-col gap-5 md:order-none">
                <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                  <span className="tabular-nums text-orange">{c.no}</span>
                  <span aria-hidden className="h-px w-8 bg-line" />
                  Service
                </span>
                <h2 id={`${c.id}-title`} data-cs="lines" className="display text-[2.9rem] leading-[0.92] sm:text-6xl md:text-[3.4rem] lg:text-7xl">
                  {c.title}
                </h2>
                <p data-cs="fade" className="text-xl leading-snug text-ink md:text-2xl">
                  {c.line}
                </p>
              </div>
              <div className="order-3 flex flex-col gap-8 md:order-none">
              <p data-cs="fade" className="max-w-md text-[16px] leading-relaxed text-muted md:text-[17px]">
                {c.body}
              </p>

              <div className="flex flex-col gap-3">
                <span data-cs="fade" className="text-[11px] uppercase tracking-[0.24em] text-muted">What’s included</span>
                <ul data-cs="stagger" className="grid border-t border-line sm:grid-cols-2 sm:gap-x-6">
                  {c.includes.map((x) => (
                    <li key={x} data-cs-focus className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25 transition-colors duration-500 [.cs-mobile-fx_.cs-focus_&]:bg-orange"
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <dl data-cs="stagger" className="grid grid-cols-2 gap-6 text-[15px]">
                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-muted">Typical timeline</dt>
                  <dd>{c.timeline}</dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-muted">Best for</dt>
                  <dd>{c.bestFor}</dd>
                </div>
              </dl>

              <div className="flex flex-col gap-3">
                <span data-cs="fade" className="text-[11px] uppercase tracking-[0.24em] text-muted">See it in our work</span>
                <ul data-cs="stagger" className="flex flex-col">
                  {c.projects.map((p) => (
                    <li key={p.title}>
                      <Link href={p.href} className="group flex items-baseline justify-between gap-4 border-b border-line py-3">
                        <span className="flex items-baseline gap-3">
                          <span className="display text-xl transition-colors duration-300 group-hover:text-orange">{p.title}</span>
                          <span className="text-[13px] text-muted">{p.note}</span>
                        </span>
                        <span aria-hidden className="text-ink/40 transition-[color,transform] duration-500 ease-skayl-out group-hover:translate-x-1 group-hover:text-orange">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {c.note && (
                <div data-cs="fade" className="flex flex-col gap-3 border-l-2 border-orange py-1 pl-5">
                  <p className="display text-2xl leading-tight">{c.note.title}</p>
                  <p className="text-[15px] leading-relaxed text-muted">{c.note.body}</p>
                  <Link href={c.note.href} className="group inline-flex w-fit items-center gap-2 text-sm text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-orange">
                    {c.note.cta}
                    <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              )}
              </div>
            </div>
          </div>

          {/* the work */}
          <div className={cn("order-2 md:col-span-7", flip ? "md:order-1" : "md:order-none")}>{visual}</div>
        </div>
      </Container>
    </section>
  );
}
