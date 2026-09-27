"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { disciplines } from "@/content/home";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 04 — Every discipline, one team. Large rows; on desktop a preview of real
// work pops up and follows the cursor with a gentle lag. On phones the same
// pop-up happens as each row crosses the middle of the screen (or on tap).
export default function Disciplines() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const [hover, setHover] = useState<number | null>(null);

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
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.selector(root)("[data-disc-row]") as HTMLElement[];
        rows.forEach((row, i) =>
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 42%",
            onToggle: (self) => setHover((h) => (self.isActive ? i : h === i ? null : h)),
          })
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const onMove = (e: React.MouseEvent) => {
    const box = root.current?.getBoundingClientRect();
    if (!box || !move.current) return;
    move.current.x(e.clientX - box.left + 40);
    move.current.y(e.clientY - box.top - 210);
  };

  return (
    <section ref={root} className="relative py-24 md:py-36" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {disciplines.eyebrow}
            </span>
            <h2 className="display text-5xl leading-[0.92] md:text-7xl lg:text-[6rem]">
              <span data-cs="lines" className="block">
                {disciplines.title[0]}
              </span>
              <span data-cs="lines" data-cs-delay="0.1" className="block text-orange">
                {disciplines.title[1]}
              </span>
            </h2>
          </div>
          <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
            {disciplines.body}
          </p>
        </div>

        <ol className="mt-14 border-t border-line md:mt-20">
          {services.map((s, i) => {
            const img = disciplines.images[i];
            return (
              <li key={s.title} data-cs-focus className="border-b border-line">
                {/* desktop row */}
                <Link
                  href="/services"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="group hidden grid-cols-[3rem_minmax(0,1fr)_minmax(0,15rem)_auto] items-center gap-8 py-9 focus-visible:outline-none md:grid"
                >
                  <span className={cn("font-display text-sm tabular-nums transition-colors duration-500", hover === i ? "text-orange" : "text-ink/35")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "display whitespace-nowrap text-5xl leading-none transition-[transform,opacity] duration-700 ease-skayl-out lg:text-6xl xl:text-7xl",
                      hover !== null && hover !== i ? "opacity-25" : "opacity-100",
                      hover === i && "translate-x-3"
                    )}
                  >
                    {s.title}
                  </span>
                  <span className={cn("hidden text-[13px] leading-relaxed text-muted transition-opacity duration-500 lg:block", hover !== null && hover !== i ? "opacity-40" : "opacity-100")}>
                    {s.tags.join(" · ")}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 ease-skayl-out",
                      hover === i ? "border-orange bg-orange text-cream" : "border-ink/20 text-ink"
                    )}
                  >
                    →
                  </span>
                </Link>

                {/* phones: the same pop-up, driven by scroll (or a tap) */}
                <Link
                  href="/services"
                  data-disc-row
                  onTouchStart={() => setHover(i)}
                  className="relative grid grid-cols-[2rem_1fr] items-center gap-x-3 gap-y-2 py-7 md:hidden"
                >
                  <span className={cn("font-display text-sm tabular-nums transition-colors duration-500", hover === i ? "text-orange" : "text-ink/35")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "display relative z-0 max-w-[60%] text-[2.1rem] leading-[0.95] transition-[transform,opacity] duration-700 ease-skayl-out",
                      hover !== null && hover !== i ? "opacity-30" : "opacity-100",
                      hover === i && "translate-x-1"
                    )}
                  >
                    {s.title}
                  </span>
                  <span className={cn("col-start-2 max-w-[62%] text-[12px] leading-relaxed text-muted transition-opacity duration-500", hover !== null && hover !== i ? "opacity-40" : "opacity-100")}>
                    {s.tags.slice(0, 3).join(" · ")}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute right-0 top-1/2 z-10 aspect-[4/5] w-[34%] -translate-y-1/2 overflow-hidden rounded-[16px] bg-ink shadow-[0_30px_60px_-25px_rgba(15,5,5,0.6)] transition-[opacity,transform] duration-500 ease-skayl-out",
                      hover === i ? "rotate-3 scale-100 opacity-100" : "-rotate-2 scale-75 opacity-0"
                    )}
                  >
                    <Image src={img.src} alt="" fill sizes="34vw" className="object-cover" style={{ objectPosition: img.position }} />
                    {img.credit && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-ink/60 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-cream backdrop-blur">
                        {img.credit}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Container>

      {/* the pop-up preview (fine pointers only) */}
      <div ref={preview} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[420px] w-[330px] [@media(hover:hover)_and_(pointer:fine)]:md:block">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-[20px] bg-ink shadow-[0_40px_80px_-30px_rgba(15,5,5,0.55)] transition-[opacity,transform] duration-500 ease-skayl-out",
            hover !== null ? "rotate-0 scale-100 opacity-100" : "-rotate-2 scale-90 opacity-0"
          )}
        >
          {disciplines.images.map((img, i) => (
            <div key={img.src} className={cn("absolute inset-0 transition-opacity duration-500", hover === i ? "opacity-100" : "opacity-0")}>
              <Image src={img.src} alt="" fill sizes="330px" className="object-cover" style={{ objectPosition: img.position }} />
              {img.credit && (
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur">
                  {img.credit}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
