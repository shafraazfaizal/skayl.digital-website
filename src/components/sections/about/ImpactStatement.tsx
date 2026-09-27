"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { impact } from "@/content/about";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 02 — The belief. On desktop the chapter pins: "impact." settles in scale,
// the light behind it warms, and the index steps through five lines.
// Mobile and reduced motion get the same content, simply laid out.
export default function ImpactStatement() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = impact.index.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=180%",
            pin: "[data-pin]",
            scrub: 0.6,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
          },
        });
        tl.fromTo("[data-punch]", { scale: 0.94 }, { scale: 1, transformOrigin: "left bottom", duration: 1 }, 0)
          .fromTo("[data-glow]", { opacity: 0.15 }, { opacity: 0.7, duration: 1 }, 0)
          .fromTo("[data-lead]", { opacity: 1 }, { opacity: 0.35, duration: 0.6 }, 0.2);
      });
      // Phones/tablets: no pin, but the same idea scrubbed by normal scroll.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 35%", scrub: 0.6 } })
          .fromTo("[data-punch]", { scale: 0.86 }, { scale: 1, transformOrigin: "left bottom" }, 0)
          .fromTo("[data-glow]", { opacity: 0.1 }, { opacity: 0.75 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="belief" className="px-5 md:px-12">
      <div data-pin className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:flex md:h-[calc(100svh-2.5rem)] md:items-center md:rounded-[36px]">
        <div
          data-glow
          aria-hidden
          className="pointer-events-none absolute -bottom-1/3 left-[-10%] h-[90%] w-[70%] opacity-40"
          style={{ background: "radial-gradient(closest-side, rgba(230,74,25,0.45), rgba(92,29,11,0.2) 55%, rgba(15,5,5,0))" }}
        />
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

        <Container className="relative grid w-full gap-14 py-20 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-x-10 md:gap-y-8 lg:grid-cols-[1.35fr_0.9fr_0.55fr] md:py-0">
          <div className="flex flex-col gap-8">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
              {impact.eyebrow}
            </span>
            <h2 className="display flex flex-col gap-6 leading-[0.86] md:gap-8">
              <span data-lead data-cs="lines" className="block text-[13vw] md:text-[4.2rem] lg:text-[5.2rem] xl:text-[6.5rem]">
                {impact.lead.join(" ")}
              </span>
              <span data-punch className="block will-change-transform">
                <span data-cs="lines" data-cs-delay="0.15" className="block text-[13vw] md:text-[4.2rem] lg:text-[5.2rem] xl:text-[6.5rem]">
                  {impact.punch[0]}
                </span>
                <span data-cs="lines" data-cs-delay="0.25" className="block text-[22vw] text-orange md:text-[7rem] lg:text-[8.5rem] xl:text-[11rem]">
                  {impact.punch[1]}
                </span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:pb-4">
            <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-cream/65">
              {impact.body}
            </p>
            {/* the line for the active index item (desktop) */}
            <div className="relative hidden h-20 border-t border-cream/15 pt-5 md:block" aria-live="polite">
              {impact.index.map((it, i) => (
                <p
                  key={it.name}
                  className={cn(
                    "absolute inset-x-0 top-5 max-w-sm font-display text-xl leading-snug transition-all duration-700 ease-skayl-out",
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  )}
                  aria-hidden={i !== active}
                >
                  {it.line}
                </p>
              ))}
            </div>
            <span className="hidden text-[11px] tabular-nums tracking-[0.2em] text-cream/45 md:block">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          {/* the index */}
          <ol className="flex flex-col md:col-start-2 md:border-l md:border-cream/15 md:pb-4 md:pl-6 lg:col-start-auto">
            {impact.index.map((it, i) => (
              <li
                key={it.name}
                data-cs-focus
                className={cn(
                  "relative flex flex-col gap-1 transition-opacity duration-500 [.cs-mobile-fx_&]:opacity-40 [.cs-mobile-fx_&.cs-focus]:opacity-100 border-t border-cream/10 py-4 transition-colors duration-500 md:flex-row md:gap-4 md:border-0 md:py-2.5",
                  i === active ? "md:text-orange" : "md:text-cream/40"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-6 top-1/2 hidden h-px -translate-y-1/2 bg-orange transition-all duration-500 ease-skayl-out md:block",
                    i === active ? "w-4" : "w-0"
                  )}
                />
                <span className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.25em] md:text-[13px]">
                  <span className="tabular-nums text-orange md:text-inherit">{String(i + 1).padStart(2, "0")}</span>
                  {it.name}
                </span>
                {/* mobile: every line is visible */}
                <span className="pl-9 text-[15px] leading-snug text-cream/60 md:hidden">{it.line}</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
