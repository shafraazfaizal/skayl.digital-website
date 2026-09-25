"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

// Motion-graphics number counter — eases from 0 to the target when it scrolls
// into view (once), like an After Effects count-up. Supports prefix/suffix and
// decimal formatting.
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    prefix + (0).toFixed(decimals) + suffix
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v: number) => prefix + v.toFixed(decimals) + suffix;

    if (reduce) {
      setDisplay(format(value));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const controls = animate(0, value, {
              duration,
              ease: [0.16, 1, 0.3, 1],
              onUpdate: (v) => setDisplay(format(v)),
            });
            obs.disconnect();
            return () => controls.stop();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix, decimals, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
