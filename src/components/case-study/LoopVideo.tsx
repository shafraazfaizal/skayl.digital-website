"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Muted, looping, inline video that only loads and plays while it's near the
 * screen (saves battery and bandwidth). People who prefer reduced motion see
 * the poster until they press play. Optional controls: pause (WCAG 2.2.2) and
 * sound on/off for films whose soundtrack is part of the work.
 */
export default function LoopVideo({
  src,
  poster,
  label,
  className = "",
  pauseControl = false,
  soundControl = false,
  controlsClassName = "",
  tone = "dark",
}: {
  src: string;
  poster?: string | null;
  label: string;
  className?: string;
  pauseControl?: boolean;
  soundControl?: boolean;
  controlsClassName?: string;
  tone?: "dark" | "light";
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setPaused(true);

    // Only attach the source once the video is close to the viewport.
    const loader = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          loader.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    loader.observe(v);

    const player = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !v.dataset.userPaused && !reduced) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    player.observe(v);
    if (reduced) v.dataset.userPaused = "1";
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      delete v.dataset.userPaused;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.dataset.userPaused = "1";
      v.pause();
      setPaused(true);
    }
  };

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      delete v.dataset.userPaused;
      v.play().catch(() => {});
      setPaused(false);
    }
  };

  const btn = cn(
    "flex h-10 items-center justify-center gap-2 rounded-full backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2",
    tone === "dark"
      ? "bg-black/45 text-cream hover:bg-black/70 focus-visible:ring-cream/70"
      : "bg-cream/80 text-ink hover:bg-cream focus-visible:ring-ink/50"
  );

  return (
    <>
      <video
        ref={video}
        src={near ? src : undefined}
        poster={poster ?? undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className={className}
      />
      {(pauseControl || soundControl) && (
        <div className={cn("flex gap-2", controlsClassName)}>
          {soundControl && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? `Turn sound on for ${label}` : `Turn sound off for ${label}`}
              className={cn(btn, "px-4 text-[11px] uppercase tracking-[0.2em]")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
                {muted ? (
                  <path d="M17 9l4 6M21 9l-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
              {muted ? "Sound on" : "Sound off"}
            </button>
          )}
          {pauseControl && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={paused ? `Play ${label}` : `Pause ${label}`}
              className={cn(btn, "w-10")}
            >
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5">
                  <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4.5" width="4" height="15" rx="1" />
                  <rect x="14" y="4.5" width="4" height="15" rx="1" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
}
