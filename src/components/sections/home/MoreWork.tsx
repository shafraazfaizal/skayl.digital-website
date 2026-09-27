"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import type { Work } from "@/content/works";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Item = { slug: string; line: string; image: string; position: string; tone: string; work: Work };

// The rest of the selected work. On every screen size the section pins and
// the projects slide sideways as you scroll; phones get cards shaped for a
// narrow screen (image on top, words below). Reduced motion: a plain stack.
export default function MoreWork({ items }: { items: Item[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        const counter = root.current?.querySelector<HTMLElement>("[data-count]");
        if (!track) return;
        // the horizontal layout comes from CSS (motion-safe:), so it exists
        // before anything is measured
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counter)
                counter.textContent = String(Math.min(items.length, Math.floor(self.progress * items.length) + 1) + 1).padStart(2, "0");
            },
          },
        });
        // triggers further down the page were measured before this pin existed
        const id = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(id);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  if (!items.length) return null;

  return (
    <div ref={root} className="relative overflow-hidden motion-safe:h-[100svh]">
      <div className="flex flex-col gap-7 py-16 motion-safe:h-full motion-safe:justify-center md:gap-10 motion-safe:md:py-10">
        <Container className="flex items-end justify-between gap-6">
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">More work</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted tabular-nums">
            <span data-count>02</span> / {String(items.length + 1).padStart(2, "0")}
          </span>
        </Container>

        <div
          data-track
          className="flex flex-col gap-4 px-3 md:gap-6 md:px-5 motion-safe:w-max motion-safe:flex-row motion-safe:px-5 motion-safe:md:px-[max(1.25rem,calc((100vw-1280px)/2+3rem))]"
        >
          {items.map((m, i) => (
            <Link
              key={m.slug}
              href={`/works/${m.slug}`}
              className={cn(
                "group relative flex shrink-0 flex-col overflow-hidden rounded-[24px] text-cream md:block md:rounded-[32px]",
                "w-full md:h-[72svh] motion-safe:h-[68svh] motion-safe:w-[84vw] motion-safe:md:h-[72svh] motion-safe:md:w-[min(72vw,1100px)]"
              )}
              style={{ backgroundColor: m.tone }}
            >
              {/* image: top half on phones, full-bleed on larger screens */}
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:aspect-auto">
                <div className="absolute inset-0 transition-transform duration-[1600ms] ease-skayl-out group-hover:scale-[1.03]">
                  <Image
                    src={m.image}
                    alt={`${m.work.title} — ${m.work.subtitle ?? m.work.services[0]}`}
                    fill
                    sizes="(max-width: 768px) 84vw, 72vw"
                    className="object-cover"
                    style={{ objectPosition: m.position }}
                  />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/15 to-transparent md:block" />
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-6 p-6 md:absolute md:inset-x-0 md:bottom-0 md:flex-row md:items-end md:p-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/65 md:text-[11px]">
                    {String(i + 2).padStart(2, "0")} · {m.work.category ?? m.work.services.slice(0, 2).join(" / ")} · {m.work.year}
                  </span>
                  <h3 className="display text-[2.6rem] leading-none md:text-7xl">{m.work.title}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-cream/75">{m.line}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream/80 transition-colors group-hover:text-cream">
                  View case study
                  <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-all duration-500 ease-skayl-out group-hover:border-orange group-hover:bg-orange">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}

          {/* the end of the line: every project */}
          <Link
            href="/works"
            className={cn(
              "group flex shrink-0 flex-col justify-between rounded-[24px] border border-line p-6 md:rounded-[32px] md:p-10",
              "h-[36svh] w-full motion-safe:h-[68svh] motion-safe:w-[62vw] motion-safe:md:h-[72svh] motion-safe:md:w-[min(30vw,420px)]"
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted">All projects</span>
            <span className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <span className="display text-5xl leading-[0.95] md:text-6xl">
                View all
                <br />
                work
              </span>
              <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-cream transition-colors duration-500 group-hover:bg-orange">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
