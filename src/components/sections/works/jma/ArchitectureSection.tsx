"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { jma } from "@/content/jma-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 07 — Information architecture, taken from the live site's navigation:
// one home, three journeys. Connectors draw in, then each journey's pages.
export default function ArchitectureSection() {
  const root = useRef<HTMLElement>(null);
  const { architecture } = jma;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const paths = q<SVGPathElement>("[data-connector]");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-tree]", start: "top 75%", toggleActions: "play none none none" },
        });
        tl.from("[data-root]", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
          .to(paths, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, "-=0.2")
          .from("[data-branch]", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }, "-=0.5")
          .from("[data-item]", { opacity: 0, x: -10, duration: 0.5, ease: "power2.out", stagger: 0.03 }, "-=0.6");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="pb-24 pt-8 md:pb-36 md:pt-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {architecture.eyebrow}
            </span>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {architecture.headline}
            </h2>
          </div>
          <p data-cs="fade" className="text-[17px] leading-relaxed text-muted">
            {architecture.body}
          </p>
        </div>

        <div data-tree className="mt-16 md:mt-24">
          <div className="flex justify-center">
            <span
              data-root
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream"
            >
              {architecture.root}
              <span className="ml-3 text-cream/40">{jma.websiteLabel}</span>
            </span>
          </div>

          {/* connectors (desktop) */}
          <svg
            viewBox="0 0 1200 90"
            preserveAspectRatio="none"
            className="hidden h-[90px] w-full md:block"
            fill="none"
            aria-hidden
          >
            {[
              "M600 0 V45 H200 V90",
              "M600 0 V90",
              "M600 0 V45 H1000 V90",
            ].map((d) => (
              <path
                key={d}
                data-connector
                d={d}
                stroke="#E64A19"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <div className="mt-10 grid gap-5 md:mt-0 md:grid-cols-3">
            {architecture.branches.map((b) => (
              <div
                key={b.name}
                data-branch
                className="flex flex-col rounded-[24px] border border-line p-6 md:p-8"
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-orange">{b.intent}</span>
                <h3 className="display mt-2 text-3xl md:text-4xl">{b.name}</h3>
                <ul className="mt-6 border-t border-line">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      data-item
                      className="flex items-center justify-between border-b border-line py-3 text-[15px] last:border-b-0"
                    >
                      {it}
                      <span className="text-ink/25" aria-hidden>
                        →
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
