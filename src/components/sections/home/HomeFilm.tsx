"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

// The SKAYL launch film. Plays muted when it scrolls into view and pauses when
// it leaves, like a silent editorial loop. 16:9 on desktop, 9:16 on phones —
// only the visible one is ever loaded (preload="none" + play on view).
// Sound design only — the film contains no music.
const FILMS = {
  wide: { src: "/video/skayl-film-16x9.mp4", poster: "/video/skayl-film-16x9.jpg" },
  tall: { src: "/video/skayl-film-9x16.mp4", poster: "/video/skayl-film-9x16.jpg" },
};

export default function HomeFilm() {
  const wideRef = useRef<HTMLVideoElement>(null);
  const tallRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const active = () => {
    const wide = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    return wide ? wideRef.current : tallRef.current;
  };

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = active();
        if (!v) return;
        if (entry.isIntersecting && !rm) {
          v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else if (!entry.isIntersecting) {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = active();
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const togglePlay = () => {
    const v = active();
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  const videoProps = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    className: "h-full w-full object-cover",
  };

  return (
    <section className="py-16 md:py-24" aria-label="The SKAYL launch film">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
            The studio in 34 seconds
            <span aria-hidden className="h-px w-10 bg-orange" />
          </span>
        </div>

        <div ref={boxRef} data-cs="clip" className="relative overflow-hidden rounded-[24px] bg-ink md:rounded-[32px]">
          <div className="relative aspect-[9/16] md:hidden">
            <video ref={tallRef} poster={FILMS.tall.poster} {...videoProps}>
              <source src={FILMS.tall.src} type="video/mp4" />
            </video>
          </div>
          <div className="relative hidden aspect-video md:block">
            <video ref={wideRef} poster={FILMS.wide.poster} {...videoProps}>
              <source src={FILMS.wide.src} type="video/mp4" />
            </video>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-6 md:right-6">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause the film" : "Play the film"}
              className="rounded-full bg-cream/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream backdrop-blur-md transition-colors hover:bg-cream/20"
            >
              {playing ? "Pause" : reduced ? "Play film" : "Play"}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className="rounded-full bg-cream/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-cream backdrop-blur-md transition-colors hover:bg-cream/20"
            >
              {muted ? "Sound on" : "Sound off"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
