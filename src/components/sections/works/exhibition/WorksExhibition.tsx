"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { workFilters, type WorkFilter } from "@/content/works";
import ProjectShowcase, { type ShowcaseItem } from "./ProjectShowcase";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Filter = "All" | WorkFilter;

// The Works page — an exhibition, not a list.
//   · Intro: the statement, quiet metadata, the filter and an index of the
//     work (hover a row on desktop to preview it; click to jump to it).
//   · Each spread: the image opens like a window as it scrolls in, with a
//     second piece floating over it at its own pace, and "View" following the
//     pointer across the image.
//   · A small counter keeps your place while you're in the exhibition.
// Data-driven: add a project to content/works.ts (+ its visual in
// app/works/page.tsx) and it appears everywhere here.
export default function WorksExhibition({ items, disciplines }: { items: ShowcaseItem[]; disciplines: number }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [current, setCurrent] = useState<ShowcaseItem | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const first = useRef(true);

  const shown = items.filter((it) => filter === "All" || it.filters.includes(filter));
  const available = (["All", ...workFilters] as Filter[]).filter((f) => f === "All" || items.some((it) => it.filters.includes(f)));
  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The window: each image opens from an inset frame to full size as it
        // scrolls in, while the picture inside settles from a slight zoom.
        q<HTMLElement>("[data-wk-window]").forEach((el) => {
          const inner = el.querySelector("[data-wk-inner]");
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.8 },
          });
          tl.fromTo(el, { clipPath: "inset(9% 7% 9% 7% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0);
          if (inner) tl.fromTo(inner, { scale: 1.18 }, { scale: 1 }, 0);
        });

        // Floating details arrive a beat later.
        q<HTMLElement>("[data-wk-detail]").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            rotate: -2,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          });
        });
      });

      // "View" follows the pointer across each image (mouse only).
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const offs: (() => void)[] = [];
        q<HTMLElement>("[data-wk-media]").forEach((el) => {
          const chip = el.querySelector<HTMLElement>("[data-wk-chip]");
          if (!chip) return;
          const x = gsap.quickTo(chip, "x", { duration: 0.5, ease: "power3.out" });
          const y = gsap.quickTo(chip, "y", { duration: 0.5, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            x(e.clientX - r.left);
            y(e.clientY - r.top);
          };
          const onEnter = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            gsap.set(chip, { x: e.clientX - r.left, y: e.clientY - r.top });
            gsap.to(chip, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.6)" });
          };
          const onLeave = () => gsap.to(chip, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          offs.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });

        // Index preview: a small image that trails the pointer.
        if (preview.current) {
          gsap.set(preview.current, { xPercent: -50, yPercent: -115 });
          move.current = {
            x: gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3.out" }),
            y: gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3.out" }),
          };
        }
        return () => {
          offs.forEach((f) => f());
          move.current = null;
        };
      });

      // Keep your place: which project is in the middle of the screen.
      q<HTMLElement>("[data-wk-project]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setCurrent(items.find((it) => it.no === el.dataset.wkProject) ?? null);
          },
        });
      });
      ScrollTrigger.create({
        trigger: list.current,
        start: "top 60%",
        end: "bottom 40%",
        onLeave: () => setCurrent(null),
        onLeaveBack: () => setCurrent(null),
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const visibleArticles = () =>
    list.current ? Array.from(list.current.querySelectorAll<HTMLElement>("article")).filter((a) => a.offsetParent) : [];

  const choose = (f: Filter) => {
    if (f === filter) return;
    const visible = visibleArticles();
    if (reduced() || !visible.length) {
      setFilter(f);
      return;
    }
    gsap.to(visible, { opacity: 0, y: 30, duration: 0.35, stagger: 0.05, ease: "power2.in", onComplete: () => setFilter(f) });
  };

  // After the filter changes: re-measure the scroll triggers, then bring the
  // new set in, one after another.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ScrollTrigger.refresh();
    const visible = visibleArticles();
    if (reduced()) {
      gsap.set(visible, { clearProps: "opacity,transform" });
      return;
    }
    gsap.fromTo(visible, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out", clearProps: "transform" });
  }, [filter]);

  const onIndexMove = (e: React.MouseEvent) => {
    move.current?.x(e.clientX);
    move.current?.y(e.clientY);
  };
  const showPreview = (src: string | null) => {
    if (!move.current || !preview.current) return;
    if (src) setPreviewSrc(src);
    gsap.to(preview.current, { opacity: src ? 1 : 0, scale: src ? 1 : 0.85, duration: 0.4, ease: "power3.out" });
  };

  const stats = [
    { value: String(items.length).padStart(2, "0"), label: "Projects" },
    { value: String(disciplines).padStart(2, "0"), label: "Disciplines" },
    { value: "02", label: "Countries" },
  ];

  return (
    <div ref={root}>
      {/* ——— intro ——— */}
      <section className="pb-16 pt-10 md:pb-28 md:pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-0">
            <div className="flex flex-col gap-8 lg:pr-14">
              <span data-cs="fade" data-cs-load className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                (Selected work)
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>
              <h1 className="display text-[11.4vw] leading-[0.92] sm:text-[8vw] md:text-[4.2rem] lg:text-[min(4.5vw,5.4rem)]">
                <span data-cs="lines" data-cs-load data-cs-delay="0.08" className="block md:whitespace-nowrap">
                  Built with intention.
                </span>
                <span data-cs="lines" data-cs-load data-cs-delay="0.16" className="block text-ink/30 md:whitespace-nowrap">
                  Delivered with precision<span className="text-orange">.</span>
                </span>
              </h1>
              <p data-cs="fade" data-cs-load data-cs-delay="0.4" className="max-w-lg text-[17px] leading-relaxed text-muted md:text-lg">
                Every project is led by us from the first call to launch — one team, one point of contact, no shortcuts.
              </p>
              <dl data-cs="stagger" data-cs-load data-cs-delay="0.55" className="mt-2 grid max-w-md grid-cols-3 border-t border-line">
                {stats.map((s, i) => (
                  <div key={s.label} className={cn("flex flex-col gap-1.5 pt-4", i > 0 && "border-l border-line pl-4 md:pl-6")}>
                    <dd className="display text-2xl tabular-nums md:text-3xl">{s.value}</dd>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-muted md:text-[11px]">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* filter + index */}
            <div className="flex flex-col justify-end gap-8 lg:border-l lg:border-line lg:pl-12">
              <div data-cs="fade" data-cs-load data-cs-delay="0.65" className="flex flex-col gap-4">
                <span id="works-filter-label" className="text-[11px] uppercase tracking-[0.28em] text-muted">
                  View
                </span>
                <div role="group" aria-labelledby="works-filter-label" className="flex flex-wrap gap-x-6 gap-y-2">
                  {available.map((f) => {
                    const on = f === filter;
                    return (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(f)}
                        className={cn(
                          "relative py-2 text-[12px] uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                          on ? "text-ink" : "text-ink/45 hover:text-ink"
                        )}
                      >
                        {f}
                        <span
                          aria-hidden
                          className={cn("absolute inset-x-0 bottom-0.5 h-px origin-left bg-orange transition-transform duration-500 ease-skayl-out", on ? "scale-x-100" : "scale-x-0")}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="sr-only" aria-live="polite">
                  {`Showing ${shown.length} ${shown.length === 1 ? "project" : "projects"}${filter === "All" ? "" : ` in ${filter}`}.`}
                </p>
              </div>

              <nav aria-label="Project index" onMouseMove={onIndexMove} onMouseLeave={() => showPreview(null)}>
                <ol data-cs="stagger" data-cs-load data-cs-delay="0.75" className="border-t border-line">
                  {shown.map((it) => (
                    <li key={it.slug} className="border-b border-line">
                      <a href={`#${it.slug}`} onMouseEnter={() => showPreview(it.preview)} className="group/row flex items-baseline gap-4 py-3.5">
                        <span className="w-6 text-[11px] tabular-nums text-muted transition-colors duration-300 group-hover/row:text-orange">{it.no}</span>
                        <span className="display flex-1 whitespace-nowrap text-xl transition-transform duration-500 ease-skayl-out group-hover/row:translate-x-1.5 md:text-2xl">{it.title}</span>
                        <span className="hidden text-[12px] text-muted sm:inline lg:hidden">{it.industry}</span>
                        <span className="w-[5.5rem] text-right text-[12px] tabular-nums text-muted">{it.year}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </Container>
      </section>

      {/* ——— the exhibition ——— */}
      <div ref={list} className="flex flex-col gap-28 pb-16 md:gap-44 md:pb-24">
        {items.map((it) => {
          const pos = shown.indexOf(it);
          return (
            <div key={it.slug} className={cn(pos < 0 && "hidden")}>
              {/* sides alternate by what's on screen, so a filtered view keeps its rhythm */}
              <ProjectShowcase item={it} imageRight={pos % 2 === 1} />
            </div>
          );
        })}
      </div>

      {/* index preview (desktop pointer only) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/3] w-[280px] overflow-hidden rounded-[18px] bg-ink opacity-0 shadow-[0_40px_80px_-30px_rgba(15,5,5,0.6)] md:block"
      >
        {previewSrc && <Image src={previewSrc} alt="" fill sizes="280px" className="object-cover" />}
      </div>

      {/* where you are in the exhibition */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed bottom-8 left-8 z-40 hidden items-center md:flex gap-3 rounded-full bg-ink/90 px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] text-cream backdrop-blur transition-[opacity,transform] duration-500 ease-skayl-out",
          current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <span className="tabular-nums text-orange">{current?.no ?? "01"}</span>
        <span className="text-cream/40">/</span>
        <span className="tabular-nums text-cream/60">{String(items.length).padStart(2, "0")}</span>
        <span className="h-3 w-px bg-cream/20" />
        <span className="normal-case tracking-normal">{current?.title}</span>
      </div>
    </div>
  );
}
