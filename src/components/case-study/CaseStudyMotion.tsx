"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./case-study.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const EASE = "expo.out";

/**
 * Declarative scroll motion for case-study pages. Sections stay Server
 * Components and opt in with data attributes:
 *
 *   data-cs="lines"        masked line-by-line headline reveal
 *   data-cs="fade"         fade + rise (y 40 → 0)
 *   data-cs="stagger"      fade + rise each direct child in sequence
 *   data-cs="clip"         clip-path image reveal (+ scale on [data-cs-inner])
 *   data-cs-load           play immediately instead of on scroll (hero)
 *   data-cs-delay="0.2"    extra delay in seconds
 *   data-cs-parallax="8"   scrubbed vertical drift, ±N yPercent
 *   data-cs-zoom           slow scrubbed scale 1.15 → 1 while in view
 *   data-cs-scrollimg      scrubs an <img> object-position top → bottom
 *   data-cs-autoscroll     loops a tall screenshot inside a phone while in view
 *
 * Content is fully visible in the server HTML; hidden states are only
 * applied by JS, and never when the user prefers reduced motion.
 */
export default function CaseStudyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        const trigger = (el: Element) =>
          el.hasAttribute("data-cs-load")
            ? undefined
            : { trigger: el, start: "top 88%", once: true };
        const delay = (el: Element) =>
          parseFloat(el.getAttribute("data-cs-delay") || "0") +
          (el.hasAttribute("data-cs-load") ? 0.15 : 0);

        // Masked line reveals — re-split automatically on resize/font load.
        q<HTMLElement>('[data-cs="lines"]').forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "cs-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.15,
                ease: EASE,
                stagger: 0.09,
                delay: delay(el),
                scrollTrigger: trigger(el),
              }),
          });
        });

        q<HTMLElement>('[data-cs="fade"]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: delay(el),
            scrollTrigger: trigger(el),
          });
        });

        q<HTMLElement>('[data-cs="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: delay(el),
            scrollTrigger: trigger(el),
          });
        });

        q<HTMLElement>('[data-cs="clip"]').forEach((el) => {
          const inner = el.querySelector("[data-cs-inner]");
          const tl = gsap.timeline({ delay: delay(el), scrollTrigger: trigger(el) });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }
          );
          if (inner)
            tl.fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: EASE }, 0);
        });

        q<HTMLElement>("[data-cs-parallax]").forEach((el) => {
          const amt = parseFloat(el.getAttribute("data-cs-parallax") || "8");
          gsap.fromTo(
            el,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        q<HTMLElement>("[data-cs-zoom]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        q<HTMLElement>("[data-cs-autoscroll]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            toggleClass: { targets: el, className: "cs-playing" },
          });
        });

        q<HTMLElement>("[data-cs-scrollimg]").forEach((el) => {
          const img = el.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { objectPosition: "50% 0%" },
            {
              objectPosition: "50% 100%",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 25%", scrub: 0.6 },
            }
          );
        });
      });

      // Web fonts change line lengths — re-measure once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
