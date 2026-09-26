"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { jma } from "@/content/jma-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 04 — The transformation. On desktop the section pins and scroll draws the
// line through each stage; the final stage resolves into the climax. On
// mobile it becomes a vertical line scrubbed by normal scrolling.
export default function TransformationSection() {
  const root = useRef<HTMLElement>(null);
  const { transformation } = jma;
  const stages = transformation.stages;
  const last = stages.length - 1;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const build = (desktop: boolean) => {
        const nodes = q<HTMLElement>("[data-stage]");
        const dots = q<HTMLElement>("[data-dot]");
        const labels = q<HTMLElement>("[data-label]");
        const strike = q<HTMLElement>("[data-strike]");
        const climax = q<HTMLElement>("[data-climax]");
        const finalRing = q<HTMLElement>("[data-final-ring]");

        gsap.set(labels, { opacity: 0.28 });
        gsap.set(dots, { backgroundColor: "rgba(15,5,5,0)", borderColor: "rgba(15,5,5,0.22)" });
        gsap.set(strike, { scaleX: 0 });
        gsap.set(climax, { yPercent: 100 });
        gsap.set(finalRing, { scale: 0.6, opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? {
              trigger: root.current,
              start: "top top",
              end: "+=180%",
              pin: "[data-pin]",
              scrub: 0.8,
            }
            : { trigger: "[data-track]", start: "top 70%", end: "bottom 55%", scrub: 0.8 },
        });

        tl.fromTo(
          "[data-progress]",
          desktop ? { scaleX: 0 } : { scaleY: 0 },
          { ...(desktop ? { scaleX: 1 } : { scaleY: 1 }), duration: last },
          0
        );

        nodes.forEach((_, i) => {
          const at = i === 0 ? 0 : i - 0.15;
          tl.to(labels[i], { opacity: 1, duration: 0.3 }, at);
          tl.to(
            dots[i],
            { backgroundColor: "#E64A19", borderColor: "#E64A19", duration: 0.2 },
            at
          );
          // "No website" is struck out once the next stage arrives
          if (i === 1) tl.to(strike, { scaleX: 1, duration: 0.4 }, at);
          if (i === 0) tl.to(labels[0], { opacity: 0.4, duration: 0.3 }, 1);
        });

        tl.to(finalRing, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, last - 0.1);
        tl.to(climax, { yPercent: 0, duration: 0.7, ease: "power3.out" }, last);
      };

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => build(!!ctx.conditions?.desktop)
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative">
      <div data-pin className="flex flex-col py-24 md:h-[100svh] md:pb-10 md:pt-16">
        <Container className="flex flex-1 flex-col">
          <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                {transformation.eyebrow}
              </span>
              <h2 className="display max-w-2xl text-4xl leading-[1] md:text-6xl">
                {transformation.headline}
              </h2>
            </div>
            <span className="text-sm text-muted md:text-right">
              {stages.length} stages · 1 system
            </span>
          </div>

          {/* track */}
          <div data-track className="relative">
            {/* base + progress line: horizontal on desktop, vertical on mobile */}
            <div className="absolute bottom-3 left-[11px] top-3 w-px bg-ink/10 md:bottom-auto md:left-3 md:right-3 md:top-[11px] md:h-px md:w-auto" />
            <div
              data-progress
              className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-orange to-orange-soft md:bottom-auto md:left-3 md:right-3 md:top-[11px] md:h-px md:w-auto md:origin-left md:bg-gradient-to-r"
            />

            <ol className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-0">
              {stages.map((s, i) => {
                const final = i === last;
                return (
                  <li
                    key={s}
                    data-stage
                    className={`flex items-start gap-5 md:flex-col md:gap-5 ${final ? "md:items-end" : i === 0 ? "md:items-start" : "md:items-center"
                      }`}
                  >
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      {final && (
                        <span
                          data-final-ring
                          className="absolute -inset-3 rounded-full border border-orange/50"
                        />
                      )}
                      <span
                        data-dot
                        className="h-[23px] w-[23px] rounded-full border-2 border-orange bg-orange"
                      />
                    </span>
                    <span
                      data-label
                      className={`flex flex-col gap-1 ${final ? "md:items-end md:text-right" : i === 0 ? "" : "md:items-center md:text-center"
                        }`}
                    >
                      <span className="font-display text-xs tabular-nums text-orange">
                        0{i + 1}
                      </span>
                      <span className="relative text-lg leading-tight md:max-w-[8rem] md:text-[15px] lg:text-lg">
                        {s}
                        {i === 0 && (
                          <span
                            data-strike
                            aria-hidden
                            className="absolute left-0 right-0 top-1/2 block h-px origin-left bg-ink/70"
                          />
                        )}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* climax */}
          <div className="mt-16 overflow-hidden md:mt-auto">
            <p
              data-climax
              className="display whitespace-nowrap pb-[0.2em] pr-[0.08em] text-[12.5vw] leading-[1] text-ink md:text-right md:text-[min(8.5vw,9.5rem)]"
            >
              Digital ecosystem<span className="text-orange">.</span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}