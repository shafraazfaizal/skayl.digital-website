"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 07 — The investor pitch deck. Desktop: the section holds while four
// selected slides travel past, like being walked through the deck. Phones,
// tablets and reduced motion: a swipeable row that snaps slide to slide.
// (Only the story slides are shown — no financials.)
export default function AvDeck({ assets }: { assets: AvAssets }) {
  const { deck } = av;
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true, // explicit: GSAP disables it when the parent is flex
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // The block wrapper matters: the case-study <article> is a flex column, and
  // GSAP won't add pin spacing to a pinned child of a flex parent.
  return (
    <div>
    <section ref={root} className="relative overflow-hidden py-24 md:py-32 lg:flex lg:h-[100svh] lg:min-h-[640px] lg:flex-col lg:justify-center lg:py-0">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {deck.eyebrow}
              <span aria-hidden className="h-px w-10" style={{ backgroundColor: avColours.cyan }} />
            </span>
            <h2 className="display text-[2.7rem] leading-[0.95] sm:text-6xl md:text-6xl lg:text-7xl">
              {deck.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={i ? "block text-ink/30" : "block"}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-muted">
            {deck.body}
          </p>
        </div>
      </Container>

      <div className="mt-12 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:mt-14 lg:motion-safe:overflow-visible [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:motion-safe:snap-none">
        <div ref={track} className="flex w-max gap-4 px-5 md:gap-6 md:px-12">
          {deck.slides.map((s, i) => (
            <figure key={s.key} className="flex w-[84vw] shrink-0 snap-center flex-col gap-3 sm:w-[70vw] lg:w-[58vw] lg:max-w-[1040px]">
              <div data-cs="clip" data-cs-delay={String(Math.min(i, 2) * 0.1)} className="relative aspect-video overflow-hidden rounded-[16px] bg-[#0A0A0A] shadow-[0_40px_80px_-40px_rgba(15,5,5,0.6)] md:rounded-[22px]">
                <div data-cs-inner className="absolute inset-0">
                  {assets[s.key] && (
                    <Image src={assets[s.key]!} alt={`AutoVive investor pitch deck — ${s.label} slide`} fill sizes="(max-width: 640px) 84vw, (max-width: 1024px) 70vw, 58vw" className="object-cover" />
                  )}
                </div>
              </div>
              <figcaption className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
                <span className="tabular-nums" style={{ color: "#1590BC" }}>
                  0{i + 1}
                </span>
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
