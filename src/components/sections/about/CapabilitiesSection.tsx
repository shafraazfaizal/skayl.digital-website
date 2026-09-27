"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { capabilities } from "@/content/about";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// 07 — What we make. Large rows; on hover (fine pointers only) a small
// preview of real work follows the cursor with a gentle lag. On touch
// screens each row simply shows its image.
export default function CapabilitiesSection() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        if (!preview.current) return;
        move.current = {
          x: gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3.out" }),
          y: gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3.out" }),
        };
        return () => {
          move.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const onMove = (e: React.MouseEvent) => {
    const box = root.current?.getBoundingClientRect();
    if (!box || !move.current) return;
    // follow the cursor, but only part of the way — restrained, not glued
    move.current.x(e.clientX - box.left - 150);
    move.current.y(e.clientY - box.top - 190);
  };

  return (
    <section ref={root} className="relative py-24 md:py-36" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {capabilities.eyebrow}
            </span>
            <h2 data-cs="lines" className="display max-w-3xl text-4xl leading-[1] md:text-6xl">
              {capabilities.title}
            </h2>
          </div>
          <Link
            data-cs="fade"
            href="/services"
            className="group inline-flex w-fit items-center gap-3 text-sm text-ink md:justify-self-end"
          >
            <span className="underline decoration-ink/25 underline-offset-4 transition-colors group-hover:decoration-ink">All services</span>
            <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <ul className="mt-14 border-t border-line md:mt-20">
          {capabilities.items.map((c, i) => (
            <li key={c.title} data-cs-focus className="border-b border-line">
              <Link
                href="/services"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 sm:gap-x-5 gap-y-4 py-7 focus-visible:outline-none md:gap-x-10 md:py-9"
              >
                <span className={cn("font-display text-sm tabular-nums transition-colors duration-500", hover === i ? "text-orange" : "text-ink/35", "[.cs-mobile-fx_.cs-focus_&]:text-orange")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "display text-[2rem] leading-none min-[400px]:text-[2.4rem] transition-[transform,opacity] duration-700 ease-skayl-out sm:text-6xl md:text-7xl lg:text-8xl",
                    hover !== null && hover !== i ? "opacity-30" : "opacity-100",
                    hover === i && "translate-x-2",
                    "[.cs-mobile-fx_&]:opacity-35 [.cs-mobile-fx_.cs-focus_&]:!opacity-100 [.cs-mobile-fx_.cs-focus_&]:translate-x-1"
                  )}
                >
                  {c.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ease-skayl-out md:h-14 md:w-14",
                    hover === i ? "border-orange bg-orange text-cream" : "border-ink/20 text-ink",
                    "[.cs-mobile-fx_.cs-focus_&]:border-orange [.cs-mobile-fx_.cs-focus_&]:bg-orange [.cs-mobile-fx_.cs-focus_&]:text-cream"
                  )}
                >
                  →
                </span>
                <span className="col-start-2 text-[13px] text-muted md:text-sm">{c.note}</span>
                {/* touch: the image sits in the row */}
                <span data-cs="clip" className="relative col-span-3 block aspect-[16/9] overflow-hidden rounded-[16px] md:aspect-[21/9] [@media(hover:hover)_and_(pointer:fine)]:hidden">
                  <span data-cs-inner className="absolute inset-0 block">
                    <Image src={c.image} alt="" fill sizes="100vw" className="object-cover" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* the floating preview (fine pointers) */}
      <div ref={preview} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[380px] w-[300px] [@media(hover:hover)_and_(pointer:fine)]:md:block">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-[18px] shadow-[0_40px_80px_-30px_rgba(15,5,5,0.5)] transition-[opacity,transform] duration-500 ease-skayl-out",
            hover !== null ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
        {capabilities.items.map((c, i) => (
          <div key={c.title} className={cn("absolute inset-0 transition-opacity duration-500", hover === i ? "opacity-100" : "opacity-0")}>
            <Image src={c.image} alt="" fill sizes="300px" className="object-cover" />
            {c.credit && (
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur">
                {c.credit}
              </span>
            )}
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
