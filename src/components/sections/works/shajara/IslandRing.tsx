"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A thin gold circle that draws itself around a point of the wordmark when it
 * scrolls into view. Positioned by the parent (percentages of the wordmark box).
 */
export default function IslandRing({ color, x, y, size }: { color: string; x: string; y: string; size: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
      style={{ left: x, top: y, width: size, height: size }}
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={on ? 0 : 1}
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 0.3s", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}
