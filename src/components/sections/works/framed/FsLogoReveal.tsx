"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fs, fsColours } from "@/content/framed-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 04 — The logo reveal. Darkness → a warm light → the FS mark → the name →
// the tagline. Pinned and scrubbed, slow. Reduced motion: shown resolved.
export default function FsLogoReveal({ mark, wordmark }: { mark: string | null; wordmark: string | null }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 0.8 },
        });
        tl.fromTo("[data-light]", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1 }, 0)
          .fromTo("[data-beam]", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.8 }, 0.2)
          .fromTo("[data-mark]", { opacity: 0, scale: 0.86, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0.5)
          .fromTo("[data-word]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 1.2)
          .fromTo("[data-tag]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.55)
          .to({}, { duration: 0.4 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* the light */}
      <div
        data-light
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${fsColours.gold}40, ${fsColours.gold}12 45%, rgba(7,21,42,0) 100%)` }}
      />
      <div
        data-beam
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px origin-center -translate-x-1/2"
        style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0), ${fsColours.gold}99 50%, rgba(0,0,0,0))` }}
      />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-cream/45">{fs.reveal.eyebrow}</span>
        {mark && (
          <div data-mark className="w-[34vw] max-w-[220px] md:w-[16vw]">
            <Image src={mark} alt="The Framed Splendor monogram" width={925} height={822} unoptimized className="h-auto w-full" />
          </div>
        )}
        {wordmark && (
          <div data-word className="w-[78vw] max-w-[520px] md:w-[36vw]">
            <Image src={wordmark} alt="Framed Splendor" width={900} height={200} unoptimized className="h-auto w-full" />
          </div>
        )}
        <p data-tag className="display text-2xl md:text-4xl">
          {fs.reveal.tagline.split(" ").map((w, i, a) => (
            <span key={w} style={i === a.length - 1 ? { color: fsColours.gold } : undefined}>
              {w}
              {i < a.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
