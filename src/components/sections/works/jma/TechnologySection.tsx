"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { jma } from "@/content/jma-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Node positions in a 520 × 440 diagram.
const N = {
  visitors: { x: 260, y: 40, label: "Visitors", sub: "Web & mobile" },
  admin: { x: 460, y: 40, label: "JMA team", sub: "Admin" },
  next: { x: 260, y: 210, label: "Next.js", sub: "Frontend" },
  supabase: { x: 90, y: 380, label: "Supabase", sub: "Database" },
  resend: { x: 430, y: 380, label: "Resend", sub: "Communications" },
};

const LINKS = [
  "M260 62 V178",
  "M460 62 C460 130 330 150 292 192",
  "M236 236 C190 290 120 320 96 356",
  "M284 236 C330 290 400 320 424 356",
];

// 11 — Under the hood. Deliberately minimal: four names, one diagram.
export default function TechnologySection() {
  const root = useRef<HTMLElement>(null);
  const { technology } = jma;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const paths = q<SVGPathElement>("[data-link]");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-diagram]", start: "top 72%", toggleActions: "play none none none" } })
          .from("[data-node]", { opacity: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.08, ease: "power3.out" })
          .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: "power2.inOut" }, "-=0.3")
          .from("[data-host]", { opacity: 0, duration: 0.8 }, "-=0.6");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="py-24 md:py-40">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                {technology.eyebrow}
              </span>
              <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-5xl">
                {technology.headline}
              </h2>
            </div>
            <ul data-cs="stagger" className="border-t border-line">
              {technology.stack.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between border-b border-line py-4">
                  <span className="display text-4xl uppercase md:text-5xl">{s.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-muted">{s.role}</span>
                </li>
              ))}
            </ul>
            <p data-cs="fade" className="text-[15px] text-muted">
              {technology.note}
            </p>
          </div>

          <div data-diagram className="relative mx-auto hidden w-full max-w-[520px] sm:block">
            <svg viewBox="0 0 520 440" className="h-auto w-full overflow-visible" fill="none" role="img" aria-label="Architecture: visitors and the JMA team use the Next.js frontend, hosted on Vercel, backed by Supabase and Resend.">
              {/* Vercel hosting boundary */}
              <g data-host>
                <rect x="150" y="150" width="220" height="120" rx="26" stroke="rgba(15,5,5,0.25)" strokeDasharray="4 6" />
                <text x="168" y="172" fontSize="11" letterSpacing="2.5" fill="#5C5C5C">VERCEL · HOSTING</text>
              </g>
              {LINKS.map((d) => (
                <path key={d} data-link d={d} stroke="#E64A19" strokeWidth="1.5" strokeLinecap="round" />
              ))}
              {Object.values(N).map((n) => {
                const core = n.label === "Next.js";
                return (
                  <g key={n.label} data-node>
                    <rect
                      x={n.x - (core ? 70 : 62)}
                      y={n.y - (core ? 26 : 22)}
                      width={core ? 140 : 124}
                      height={core ? 52 : 44}
                      rx={core ? 26 : 22}
                      fill={core ? "#0F0505" : "#F5F0E1"}
                      stroke={core ? "#0F0505" : "rgba(15,5,5,0.18)"}
                    />
                    <text x={n.x} y={n.y - 1} textAnchor="middle" fontSize={core ? 16 : 14} fill={core ? "#F5F0E1" : "#0F0505"} className="font-display">
                      {n.label}
                    </text>
                    <text x={n.x} y={n.y + 14} textAnchor="middle" fontSize="9.5" letterSpacing="1.6" fill={core ? "rgba(245,240,225,0.6)" : "#5C5C5C"}>
                      {n.sub.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
