"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reusable scroll-driven transformation sequence for case studies.
 * Desktop: the section pins and scroll draws a line through each stage until
 * the climax resolves. Mobile: a vertical line scrubbed by normal scrolling.
 * With reduced motion, everything is simply shown in its final state.
 */
export default function ScrollStages({
  eyebrow,
  headline,
  stages,
  climax,
  accent = "#E64A19",
  tone = "light",
}: {
  eyebrow: string;
  headline: string;
  stages: string[];
  climax: string;
  accent?: string;
  tone?: "light" | "dark";
}) {
  const root = useRef<HTMLElement>(null);
  const dark = tone === "dark";
  const idle = dark ? "rgba(245,240,225,0.2)" : "rgba(15,5,5,0.22)";

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      const build = (desktop: boolean) => {
        const labels = q<HTMLElement>("[data-label]");
        const dots = q<HTMLElement>("[data-dot]");
        gsap.set(labels, { opacity: 0.28 });
        gsap.set(dots, { backgroundColor: "rgba(0,0,0,0)", borderColor: idle });
        gsap.set("[data-climax-line]", { yPercent: 105 });

        const n = stages.length;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? { trigger: root.current, start: "top top", end: "+=170%", pin: "[data-pin]", scrub: 0.8 }
            : { trigger: "[data-track]", start: "top 70%", end: "bottom 55%", scrub: 0.8 },
        });
        tl.fromTo(
          "[data-progress]",
          desktop ? { scaleX: 0 } : { scaleY: 0 },
          { ...(desktop ? { scaleX: 1 } : { scaleY: 1 }), duration: n },
          0
        );
        labels.forEach((l, i) => {
          const at = i === 0 ? 0 : i - 0.1;
          tl.to(l, { opacity: 1, duration: 0.3 }, at);
          tl.to(dots[i], { backgroundColor: accent, borderColor: accent, duration: 0.2 }, at);
        });
        tl.to("[data-climax-line]", { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }, n - 0.2);
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

  const words = climax.split(" ");
  const half = Math.ceil(words.length / 2);
  const climaxLines = words.length > 2 ? [words.slice(0, half).join(" "), words.slice(half).join(" ")] : [climax];

  return (
    <section ref={root} className="relative">
      <div data-pin className="flex flex-col py-24 md:h-[100svh] md:pb-12 md:pt-20">
        <Container className="flex flex-1 flex-col">
          <div className="mb-14 flex flex-col gap-5 md:mb-16">
            <span className={cn("text-[11px] uppercase tracking-[0.28em] md:text-xs", dark ? "text-cream/55" : "text-muted")}>
              {eyebrow}
            </span>
            <h2 className="display max-w-2xl text-4xl leading-[1] md:text-6xl">{headline}</h2>
          </div>

          <div data-track className="relative">
            <div
              className={cn(
                "absolute bottom-3 left-[11px] top-3 w-px md:bottom-auto md:left-3 md:right-3 md:top-[11px] md:h-px md:w-auto",
                dark ? "bg-cream/10" : "bg-ink/10"
              )}
            />
            <div
              data-progress
              className="absolute bottom-3 left-[11px] top-3 w-px origin-top md:bottom-auto md:left-3 md:right-3 md:top-[11px] md:h-px md:w-auto md:origin-left"
              style={{ backgroundColor: accent }}
            />
            <ol className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-0">
              {stages.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-start gap-5 md:flex-col",
                    i === 0 ? "md:items-start" : i === stages.length - 1 ? "md:items-end" : "md:items-center"
                  )}
                >
                  <span
                    data-dot
                    className="h-[23px] w-[23px] shrink-0 rounded-full border-2"
                    style={{ backgroundColor: accent, borderColor: accent }}
                  />
                  <span
                    data-label
                    className={cn(
                      "flex flex-col gap-1",
                      i === 0 ? "" : i === stages.length - 1 ? "md:items-end md:text-right" : "md:items-center md:text-center"
                    )}
                  >
                    <span className="font-display text-xs tabular-nums" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg uppercase leading-tight tracking-[0.08em] md:text-[13px] lg:text-sm">{s}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-16 pb-[0.2em] pr-[0.08em] md:mt-auto md:text-right">
            {climaxLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.12em]">
                <span
                  data-climax-line
                  className={cn(
                    "display block text-[13vw] leading-[0.95] md:text-[min(8vw,9rem)]",
                    i === climaxLines.length - 1 ? "" : dark ? "text-cream/35" : "text-ink/35"
                  )}
                >
                  {line}
                  {i === climaxLines.length - 1 && <span style={{ color: accent }}>.</span>}
                </span>
              </span>
            ))}
          </p>
        </Container>
      </div>
    </section>
  );
}
