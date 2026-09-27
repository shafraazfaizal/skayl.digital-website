"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const EASE = "expo.out";

/**
 * Contact page entrance — one short timeline:
 * eyebrow → headline lines (masked) → copy → email → availability → details →
 * form revealed through a clip → fields stagger → submit last.
 * Content is fully visible without JS; nothing animates with reduced motion.
 */
export default function ContactMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const fields = q<HTMLElement>("[data-ct='fields'] > *");

        const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });
        tl.from(q("[data-ct='eyebrow']"), { opacity: 0, y: 12, duration: 0.6 }, 0)
          .from(q("[data-ct='line']"), { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0.08)
          .from(q("[data-ct='fade']"), { opacity: 0, y: 24, duration: 0.9, stagger: 0.07 }, 0.4)
          .fromTo(q("[data-ct='divider']"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top center", duration: 1.2, ease: "expo.inOut" }, 0.2)
          .fromTo(
            q("[data-ct='form']"),
            { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: 24 },
            { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, duration: 1.1, ease: "expo.inOut", clearProps: "clipPath,transform" },
            0.35
          )
          .from(fields, { opacity: 0, y: 18, duration: 0.7, stagger: 0.06 }, 0.6)
          .from(q("[data-ct='submit']"), { opacity: 0, y: 18, duration: 0.7 }, ">-0.35");

      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
