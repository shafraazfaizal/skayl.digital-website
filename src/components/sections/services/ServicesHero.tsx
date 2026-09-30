"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { eventAddOn, serviceChapters, servicesHero } from "@/content/services";

type StageItem = (typeof servicesHero.stage)[number] & { src: string };

const INTERVAL = 3600;

// 01 — Hero. Same architecture as the About hero: the headline carries the
// page, and beside it a dark stage cycles through real work, one piece per
// discipline. Hovering (or focusing) a discipline in the index shows its work.
export default function ServicesHero({ stage }: { stage: StageItem[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || stage.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % stage.length), INTERVAL);
    return () => window.clearInterval(t);
  }, [hold, stage.length]);

  const index = [
    ...serviceChapters.map((c) => ({ id: c.id, no: c.no, title: c.title, addOn: false })),
    { id: "event-management", no: "+", title: eventAddOn.title, addOn: true },
  ];
  const current = stage[active];

  const show = (id: string) => {
    const i = stage.findIndex((s) => s.id === id);
    if (i >= 0) setActive(i);
    setHold(true);
  };

  return (
    <section className="pb-6 pt-8 md:pb-10 md:pt-10">
      <Container>
        <div className="grid gap-8 md:min-h-[calc(100svh-9rem)] md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-12">
          {/* copy */}
          <div className="flex flex-col justify-between gap-12 pt-6 md:py-6">
            <div className="flex flex-col gap-7 md:gap-9">
              <span data-cs="fade" data-cs-load className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                ({servicesHero.eyebrow})
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>
              <h1 className="display text-[12.6vw] leading-[0.88] sm:text-[10.5vw] md:text-[3.9rem] lg:text-[5.3rem] xl:text-[6.1rem] 2xl:text-[6.8rem]">
                {servicesHero.title.map((l, i) => (
                  <span key={l} data-cs="lines" data-cs-load data-cs-delay={String(0.1 + i * 0.08)} className={cn("block whitespace-nowrap", i === 1 && "text-ink/45")}>
                    {l.replace(/\.$/, "")}
                    <span className="text-orange">.</span>
                  </span>
                ))}
              </h1>
              <p data-cs="fade" data-cs-load data-cs-delay="0.45" className="max-w-md text-[17px] leading-relaxed text-muted md:text-lg">
                {servicesHero.body}
              </p>
            </div>

            {/* the index */}
            <nav aria-label="Services" onMouseLeave={() => setHold(false)}>
              <ul data-cs="stagger" data-cs-load data-cs-delay="0.6" className="border-t border-line">
                {index.map((s) => {
                  const on = current?.id === s.id;
                  return (
                    <li key={s.id} className="border-b border-line">
                      <a
                        href={`#${s.id}`}
                        onMouseEnter={() => show(s.id)}
                        onFocus={() => show(s.id)}
                        onBlur={() => setHold(false)}
                        className="group flex items-center gap-5 py-3.5 md:py-4"
                      >
                        <span className={cn("w-6 text-[11px] tabular-nums transition-colors duration-500", on ? "text-orange" : "text-muted")}>{s.no}</span>
                        <span className={cn("flex-1 text-[17px] transition-[color,transform] duration-500 ease-skayl-out group-hover:translate-x-1 md:text-lg", on || s.addOn ? "text-ink" : "text-ink/60")}>
                          {s.title}
                          {s.addOn && <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-muted">Add-on</span>}
                        </span>
                        <span aria-hidden className="text-ink/40 transition-[color,transform] duration-500 ease-skayl-out group-hover:translate-y-0.5 group-hover:text-orange">
                          ↓
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* the stage */}
          <div data-cs="clip" data-cs-load data-cs-delay="0.2" className="relative min-h-[64svh] overflow-hidden rounded-[28px] bg-ink md:min-h-0 md:rounded-[36px]">
            <div data-cs-inner className="absolute inset-0">
              {stage.map((s, i) => (
                <div
                  key={s.src}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-skayl-out motion-reduce:transition-none",
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  )}
                >
                  <Image
                    src={s.src}
                    alt={`${s.project} — ${s.discipline}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover"
                    style={{ objectPosition: s.position }}
                  />
                </div>
              ))}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-6 text-cream md:inset-x-8 md:bottom-8">
              <div className="flex flex-col gap-1" aria-live="polite">
                <span className="text-[10px] uppercase tracking-[0.28em] text-cream/60 md:text-[11px]">{current?.discipline}</span>
                <span className="display text-2xl md:text-3xl">{current?.project}</span>
              </div>
              <div className="flex gap-1.5 pb-2" aria-hidden>
                {stage.map((_, i) => (
                  <span key={i} className={cn("h-px w-6 transition-colors duration-500", i === active ? "bg-orange" : "bg-cream/30")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
