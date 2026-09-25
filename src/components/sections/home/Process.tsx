"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/home";

gsap.registerPlugin(ScrollTrigger);

// Winding-path layout in a 1200 × 460 viewBox. Each node sits exactly on the
// curve; the HTML labels are positioned from the same coordinates.
const VB_W = 1200;
const VB_H = 470;

type Node = {
  x: number;
  y: number;
  label: "above" | "below";
  align: "left" | "center" | "right";
};

// Nodes sit in the vertical centre band so labels have room both above and
// below without ever reaching the heading.
const NODES: Node[] = [
  { x: 115, y: 275, label: "below", align: "left" },
  { x: 385, y: 195, label: "above", align: "center" },
  { x: 610, y: 285, label: "below", align: "center" },
  { x: 835, y: 190, label: "above", align: "center" },
  { x: 1090, y: 255, label: "below", align: "right" },
];

// Smooth Catmull-Rom curve through every node.
const PATH =
  "M115,275 C160,261.7 302.5,193.3 385,195 C467.5,196.7 535,285.8 610,285 C685,284.2 755,195 835,190 C915,185 1047.5,244.2 1090,255";

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const path = pathRef.current;
    if (!el || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    const dots = gsap.utils.toArray<SVGGElement>("[data-dot]", el);
    const labels = gsap.utils.toArray<HTMLElement>("[data-label]", el);

    if (reduce) {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
      gsap.set(dots, { scale: 1 });
      gsap.set(labels, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    dots.forEach((d, i) =>
      gsap.set(d, { scale: 0, svgOrigin: `${NODES[i].x} ${NODES[i].y}` })
    );
    gsap.set(labels, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          end: "bottom 78%",
          scrub: 0.8,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      NODES.forEach((_, i) => {
        const t = (i / (NODES.length - 1)) * 0.82;
        tl.to(
          dots[i],
          { scale: 1, ease: "back.out(2)", duration: 0.08 },
          t
        );
        tl.to(
          labels[i],
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 },
          t
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="You’ll always know where your project stands."
        />

        {/* ── Desktop: winding path timeline ── */}
        <div ref={wrapRef} className="relative mt-14 hidden md:block lg:mt-10">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="proc-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E64A19" />
                  <stop offset="100%" stopColor="#FF8A65" />
                </linearGradient>
              </defs>

              {/* faint base track */}
              <path
                d={PATH}
                stroke="rgba(15,5,5,0.10)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* animated progress line */}
              <path
                ref={pathRef}
                d={PATH}
                stroke="url(#proc-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* milestone dots */}
              {NODES.map((n, i) => (
                <g key={i} data-dot>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="18"
                    fill="#E64A19"
                    opacity="0.14"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="9"
                    fill="#F5F0E1"
                    stroke="url(#proc-grad)"
                    strokeWidth="3"
                  />
                  <circle cx={n.x} cy={n.y} r="3" fill="#E64A19" />
                </g>
              ))}
            </svg>

            {/* labels — positioned from the same node coordinates */}
            {processSteps.map((s, i) => {
              const n = NODES[i];
              const xOff =
                n.align === "left"
                  ? "0%"
                  : n.align === "right"
                    ? "-100%"
                    : "-50%";
              const yOff =
                n.label === "below" ? "34px" : "calc(-100% - 34px)";
              const textAlign =
                n.align === "right" ? "text-right" : "text-left";
              return (
                <div
                  key={s.no}
                  className="absolute"
                  style={{
                    left: `${(n.x / VB_W) * 100}%`,
                    top: `${(n.y / VB_H) * 100}%`,
                    transform: `translate(${xOff}, ${yOff})`,
                  }}
                >
                  <div
                    data-label
                    className={`relative w-[190px] ${textAlign}`}
                  >
                    {/* watermark number */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -top-9 select-none font-display text-[64px] leading-none text-ink/[0.06] ${
                        n.align === "right" ? "right-0" : "left-0"
                      }`}
                    >
                      {s.no}
                    </span>

                    <div className="relative flex flex-col gap-1.5">
                      <h3 className="display text-xl">{s.name}</h3>
                      <p className="text-[12px] leading-[1.5] text-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: clean vertical timeline ── */}
        <div className="mt-12 md:hidden">
          <div className="relative ml-2 flex flex-col gap-9 border-l border-line pl-8">
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-orange to-orange-soft"
              style={{ opacity: 0.5 }}
            />
            {processSteps.map((s) => (
              <div key={s.no} className="relative">
                <span className="absolute -left-[41px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange bg-cream">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-orange">
                    {s.no}
                  </span>
                  <h3 className="display text-xl">{s.name}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
