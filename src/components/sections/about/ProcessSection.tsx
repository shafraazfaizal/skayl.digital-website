"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { approach } from "@/content/about";
import { processSteps } from "@/content/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 05 — Approach. Desktop: the left side holds while the five steps take turns
// in focus and a progress line fills. Mobile: a plain vertical timeline.
export default function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const n = processSteps.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        setPinned(true);
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=220%",
              pin: "[data-pin]",
              scrub: 0.6,
              onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
            },
          }
        );
        return () => setPinned(false);
      });
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 62%", end: "bottom 45%", scrub: 0.6 } }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative">
      <div data-pin className="flex items-center py-24 md:h-[100svh] md:py-0">
        <Container className="grid w-full gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                {approach.eyebrow}
              </span>
              <h2 data-cs="lines" className="display text-5xl leading-[0.92] md:text-7xl lg:text-[5.5rem]">
                {approach.title.join(" ")}
              </h2>
              <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
                {approach.body}
              </p>
            </div>
            <div className="hidden items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted md:flex" aria-hidden>
              <span className="tabular-nums text-ink">{String(active + 1).padStart(2, "0")}</span>
              <span className="relative block h-px w-24 overflow-hidden bg-line">
                <span className="absolute inset-y-0 left-0 bg-orange transition-[width] duration-700 ease-skayl-out" style={{ width: `${((active + 1) / n) * 100}%` }} />
              </span>
              <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
            </div>
          </div>

          <div data-steps className="relative pl-8 md:pl-12">
            {/* the track */}
            <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line" />
            <span data-progress aria-hidden className="absolute bottom-2 left-0 top-2 w-px origin-top bg-orange" />
            <ol className="flex flex-col gap-10 md:gap-5 lg:gap-6">
              {processSteps.map((s, i) => {
                const on = !pinned || i === active;
                return (
                  <li key={s.no} data-cs-focus className="relative flex flex-col gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-8 top-[0.55em] h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-[colors,transform] duration-500 md:-left-12 [.cs-mobile-fx_.cs-focus_&]:scale-150",
                        i <= active || !pinned ? "border-orange bg-orange" : "border-ink/25 bg-cream"
                      )}
                    />
                    <div className="flex items-baseline gap-4">
                      <span className={cn("font-display text-sm tabular-nums transition-colors duration-500", on ? "text-orange" : "text-ink/30")}>{s.no}</span>
                      <h3
                        className={cn(
                          "display origin-left text-4xl leading-none transition-[transform,opacity] duration-700 ease-skayl-out md:text-5xl lg:text-6xl [.cs-mobile-fx_&]:opacity-30 [.cs-mobile-fx_.cs-focus_&]:!opacity-100",
                          on ? "opacity-100" : "scale-[0.7] opacity-20"
                        )}
                      >
                        {s.name}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "max-w-md pl-9 text-[15px] leading-relaxed text-muted transition-opacity duration-700 ease-skayl-out [.cs-mobile-fx_&]:opacity-40 [.cs-mobile-fx_.cs-focus_&]:!opacity-100",
                        on ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
