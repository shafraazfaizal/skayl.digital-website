"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { processIntro, processSteps } from "@/content/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 05 — Process. Desktop: the chapter pins and an orange node travels the
// line; each step brightens as it's reached and its description takes the
// stage. Phones: a vertical timeline that fills as you scroll.
export default function HomeProcess() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const n = processSteps.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        setPinned(true);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=240%",
            invalidateOnRefresh: true,
            pin: "[data-pin]",
            scrub: 0.7,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
          },
        });
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        tl.fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0).fromTo(
          "[data-node]",
          { x: 0 },
          { x: () => track?.offsetWidth ?? 0, duration: 1 },
          0
        );
        return () => setPinned(false);
      });
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-vline]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-vsteps]", start: "top 62%", end: "bottom 45%", scrub: 0.6 } }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <div data-pin className="flex flex-col justify-center py-24 md:h-[100svh] md:py-0">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-end md:gap-16">
            <div className="flex flex-col gap-6">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
                {processIntro.eyebrow}
              </span>
              <h2 className="display text-[2.7rem] leading-[0.95] md:text-6xl lg:text-7xl">
                <span data-cs="lines" className="block">
                  {processIntro.title[0]}
                </span>
                <span data-cs="lines" data-cs-delay="0.1" className="block text-orange">
                  {processIntro.title[1]}
                </span>
              </h2>
            </div>
            <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-cream/60">
              {processIntro.body}
            </p>
          </div>

          {/* desktop: the travelling line */}
          <div className="relative mt-16 hidden md:block lg:mt-24">
            <div data-track className="relative h-px bg-cream/15">
              <span data-line className="absolute inset-0 origin-left bg-orange" style={{ transform: pinned ? undefined : "scaleX(1)" }} />
              <span
                data-node
                aria-hidden
                className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-orange"
                style={{ left: pinned ? undefined : "calc(100% - 0.5rem)", boxShadow: "0 0 0 6px rgba(230,74,25,0.18), 0 0 40px 8px rgba(230,74,25,0.55)" }}
              />
            </div>
            <ol className="mt-12 grid grid-cols-5 gap-6">
              {processSteps.map((s, i) => {
                const on = !pinned || i <= active;
                const current = !pinned || i === active;
                return (
                  <li key={s.no} className="flex flex-col gap-3">
                    <span className={cn("font-display text-sm tabular-nums transition-colors duration-500", on ? "text-orange" : "text-cream/30")}>{s.no}</span>
                    <h3
                      className={cn(
                        "display origin-left text-4xl leading-none transition-[transform,opacity] duration-700 ease-skayl-out lg:text-5xl xl:text-6xl",
                        current ? "opacity-100" : on ? "scale-95 opacity-45" : "scale-95 opacity-25"
                      )}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={cn(
                        "max-w-[17rem] text-[15px] leading-relaxed text-cream/65 transition-opacity duration-700",
                        current ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* phones: vertical timeline */}
          <div data-vsteps className="relative mt-14 pl-8 md:hidden">
            <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-cream/15" />
            <span data-vline aria-hidden className="absolute bottom-2 left-0 top-2 w-px origin-top bg-orange" />
            <ol className="flex flex-col gap-10">
              {processSteps.map((s) => (
                <li key={s.no} data-cs-focus className="relative flex flex-col gap-2">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-[0.55em] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-orange bg-ink transition-[background-color,transform] duration-500 [.cs-mobile-fx_.cs-focus_&]:scale-150 [.cs-mobile-fx_.cs-focus_&]:bg-orange"
                  />
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm tabular-nums text-orange">{s.no}</span>
                    <h3 className="display text-4xl leading-none transition-opacity duration-500 [.cs-mobile-fx_&]:opacity-35 [.cs-mobile-fx_.cs-focus_&]:!opacity-100">{s.name}</h3>
                  </div>
                  <p className="pl-9 text-[15px] leading-relaxed text-cream/60 transition-opacity duration-500 [.cs-mobile-fx_&]:opacity-40 [.cs-mobile-fx_.cs-focus_&]:!opacity-100">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </div>
  );
}
