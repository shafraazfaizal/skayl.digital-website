"use client";

import { useEffect, useRef, useState } from "react";

// Infinite marquee ticker. Content is duplicated so the -50% translate loops
// seamlessly. Pauses on hover. When `href` is set, each item becomes a link
// (used for the mailto email ticker).
//
// By default the loop runs on the shared CSS duration (see tailwind.config).
// Pass `speed` (pixels per second) to run at a constant visual speed instead —
// the duration is derived from the measured track width, so tickers with very
// different text sizes still scroll at the same px/sec.
export default function Ticker({
  words,
  size = "lg",
  href,
  className = "",
  speed,
}: {
  words: string[];
  size?: "lg" | "sm";
  href?: string;
  className?: string;
  speed?: number;
}) {
  const sequence = [...words, ...words];
  const isLg = size === "lg";
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!speed) return;
    const el = trackRef.current;
    if (!el) return;
    // The track renders 2× `sequence`; the keyframe translates -50%, i.e. one
    // `sequence` width per loop. duration = distance / speed.
    const measure = () => {
      const cyclePx = el.scrollWidth / 2;
      if (cyclePx > 0) setDuration(cyclePx / speed);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (typeof document !== "undefined" && "fonts" in document) {
      (document as Document).fonts.ready.then(measure).catch(() => {});
    }
    return () => ro.disconnect();
  }, [speed, words.length]);

  const itemClass = isLg
    ? "flex items-center whitespace-nowrap font-display text-6xl leading-none tracking-tightest text-orange/90 sm:text-7xl md:text-8xl"
    : "flex items-center whitespace-nowrap font-display text-base tracking-tight text-cream/85 md:text-lg transition-colors duration-200 hover:text-orange";

  const sepClass = isLg
    ? "mx-8 text-orange-soft/70 md:mx-12"
    : "mx-5 text-cream/25 md:mx-7";

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {sequence.concat(sequence).map((w, i) =>
          href ? (
            <a
              key={i}
              href={href}
              className={itemClass}
              aria-label={`Email ${w}`}
            >
              {w}
              <span className={sepClass} aria-hidden>
                ×
              </span>
            </a>
          ) : (
            <span key={i} className={itemClass}>
              {w}
              <span className={sepClass}>×</span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
