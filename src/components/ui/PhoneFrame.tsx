"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Reel } from "@/content/works";

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        fill="currentColor"
      />
      {muted ? (
        <path
          d="M17 9l4 6M21 9l-4 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

export default function PhoneFrame({
  reel,
  muted,
  onToggleMute,
  offset = 0,
}: {
  reel: Reel;
  muted: boolean;
  onToggleMute: () => void;
  offset?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  // Keep the actual element muted state in sync with the coordinated prop.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Only play while scrolled into view (saves battery / bandwidth).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      style={{ y: offset }}
      whileHover={reduce ? undefined : { scale: 1.04, y: offset - 8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative shrink-0"
    >
      {/* soft drop shadow */}
      <div
        className={`pointer-events-none absolute inset-x-4 bottom-2 top-8 rounded-[2.2rem] blur-2xl transition-opacity duration-300 ${
          hovered ? "opacity-70" : "opacity-45"
        }`}
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* phone body */}
      <div className="relative rounded-[2.3rem] bg-[#080606] p-[6px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="relative aspect-[9/19.5] w-[150px] overflow-hidden rounded-[1.9rem] bg-black sm:w-[168px]">
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          {/* dynamic island */}
          <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[52px] -translate-x-1/2 rounded-full bg-black/90" />

          {/* mute toggle — appears on hover/focus */}
          <button
            onClick={onToggleMute}
            aria-label={muted ? "Unmute reel" : "Mute reel"}
            aria-pressed={!muted}
            className={`absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-cream backdrop-blur transition-all duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
              hovered || !muted
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } ${!muted ? "bg-orange text-cream" : ""}`}
          >
            <SpeakerIcon muted={muted} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
