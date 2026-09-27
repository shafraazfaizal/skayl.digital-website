"use client";

import { Fragment, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { marquee } from "@/content/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPIES = 3;

// 02 — What we do: two rows drifting in opposite directions. Scrolling adds a
// little momentum that settles when you stop. Still for reduced motion.
export default function ServicesMarquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]", root.current);
        const wrap = gsap.utils.wrap(-100 / COPIES, 0);
        const pos = rows.map((_, i) => (i === 0 ? 0 : -100 / COPIES / 2));
        let boost = 0;
        let visible = false;

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (visible = self.isActive),
          onUpdate: (self) => {
            // scroll speed nudges the rows, capped so text stays readable
            boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 400);
          },
        });

        const tick = (_t: number, dt: number) => {
          if (!visible) return;
          boost *= 0.94; // settle
          rows.forEach((row, i) => {
            const dir = i === 0 ? -1 : 1;
            const speed = 0.0022 * dt * (1 + Math.abs(boost));
            pos[i] = wrap(pos[i] + dir * speed);
            gsap.set(row, { xPercent: pos[i] });
          });
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-5 md:px-12" aria-label={marquee.eyebrow}>
      <div className="relative overflow-hidden rounded-[28px] bg-ink py-10 text-cream md:rounded-[36px] md:py-14">
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="relative mb-8 flex items-center justify-between px-6 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:mb-10 md:px-12 md:text-xs">
          <span>{marquee.eyebrow}</span>
          <span className="tabular-nums">Brand · Web · Content</span>
        </div>

        {/* screen readers get the list once, plainly */}
        <p className="sr-only">{marquee.rows.flat().join(", ")}</p>

        <div aria-hidden className="relative flex flex-col gap-2 md:gap-4">
          {marquee.rows.map((words, r) => (
            <div key={r} className={cn("overflow-hidden", r === 1 && "border-t border-cream/10 pt-2 md:pt-4")}>
              <div data-row className="flex w-max will-change-transform">
                {Array.from({ length: COPIES }).map((_, c) => (
                  <div key={c} className="flex shrink-0 items-center">
                    {words.map((w) => (
                      <Fragment key={w}>
                        <span
                          className={cn(
                            "display whitespace-nowrap px-4 text-[13vw] leading-[1.02] md:px-8 md:text-[7.5vw] lg:text-[6.5rem]",
                            r === 0 ? "text-cream" : "text-orange"
                          )}
                        >
                          {w}
                        </span>
                        <span className={cn("text-[6vw] md:text-[3vw] lg:text-[2.6rem]", r === 0 ? "text-orange" : "text-cream/35")}>×</span>
                      </Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
