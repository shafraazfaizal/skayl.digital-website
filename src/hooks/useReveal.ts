"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Scroll reveal that mirrors the Framer `appearEffect` (opacity 0→1, y 40→0).
 * The trigger uses an IntersectionObserver (viewport-based, so it fires
 * reliably regardless of which element owns the scroll), while the animation
 * itself is a GSAP tween for premium easing and stagger.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  y = 40,
  duration = 0.9,
  stagger = 0.08,
  childrenSelector,
}: {
  y?: number;
  duration?: number;
  stagger?: number;
  childrenSelector?: string;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = childrenSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(childrenSelector))
      : [el];

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: "power3.out",
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [y, duration, stagger, childrenSelector]);

  return ref;
}
