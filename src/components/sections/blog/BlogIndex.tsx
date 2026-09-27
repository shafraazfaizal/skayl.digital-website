"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type IndexPost = {
  slug: string;
  no: string;
  title: string;
  excerpt: string;
  category: string;
  year: string;
  minutes: number;
  image: { src: string; alt: string; position?: string } | null;
};

// "More from the studio": an editorial index, not a card grid. Numbers
// anchor each entry; on desktop, entries with a real project image preview it
// beside the pointer. A quiet category filter appears once there's enough to
// filter.
export default function BlogIndex({ posts }: { posts: IndexPost[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [previewImg, setPreviewImg] = useState<IndexPost["image"]>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const first = useRef(true);

  const shown = posts.filter((p) => filter === "All" || p.category === filter);
  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        if (!preview.current) return;
        gsap.set(preview.current, { xPercent: 30, yPercent: -112 });
        move.current = {
          x: gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3.out" }),
        };
        return () => {
          move.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const choose = (c: string) => {
    if (c === filter) return;
    const items = list.current ? Array.from(list.current.children) : [];
    if (reduced() || !items.length) return setFilter(c);
    gsap.to(items, { opacity: 0, y: 20, duration: 0.3, stagger: 0.04, ease: "power2.in", onComplete: () => setFilter(c) });
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ScrollTrigger.refresh();
    const items = list.current ? Array.from(list.current.children) : [];
    if (reduced()) return void gsap.set(items, { clearProps: "opacity,transform" });
    gsap.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "expo.out", clearProps: "transform" });
  }, [filter]);

  const show = (img: IndexPost["image"]) => {
    if (!move.current || !preview.current) return;
    if (img) setPreviewImg(img);
    gsap.to(preview.current, { opacity: img ? 1 : 0, scale: img ? 1 : 0.9, duration: 0.4, ease: "power3.out" });
  };

  return (
    <section ref={root} className="pb-20 md:pb-28" onMouseMove={(e) => (move.current?.x(e.clientX), move.current?.y(e.clientY))}>
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <h2 data-cs="fade" className="shrink-0 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
            More from the studio
          </h2>
          <span data-cs="draw" aria-hidden className="hidden h-px flex-1 bg-line md:block" />
          {categories.length > 3 && (
            <div data-cs="fade" role="group" aria-label="Filter notes by topic" className="flex flex-wrap gap-x-5 gap-y-1">
              {categories.map((c) => {
                const on = c === filter;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(c)}
                    className={cn(
                      "relative py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                      on ? "text-orange" : "text-ink/45 hover:text-ink"
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Showing ${shown.length} ${shown.length === 1 ? "note" : "notes"}${filter === "All" ? "" : ` in ${filter}`}.`}
        </p>

        <ol ref={list} data-cs="stagger" className="mt-12 grid gap-x-16 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-20">
          {shown.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                onMouseEnter={() => show(p.image)}
                onMouseLeave={() => show(null)}
                className="group grid grid-cols-[3.2rem_1fr] gap-x-4 focus-visible:outline-none md:grid-cols-[4.6rem_1fr] md:gap-x-6"
              >
                <span className="display pt-1 text-4xl leading-none tabular-nums text-ink/25 transition-colors duration-500 group-hover:text-orange group-focus-visible:text-orange md:text-5xl">
                  {p.no}
                </span>
                <span className="flex flex-col gap-4">
                  <span className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                    <span className="text-ink">{p.category}</span>
                    <span className="tabular-nums">{p.year}</span>
                  </span>
                  <span className="display text-balance text-[1.7rem] leading-[1.08] transition-transform duration-500 ease-skayl-out group-hover:translate-x-1.5 group-focus-visible:underline md:text-3xl">
                    {p.title}
                  </span>
                  <span className="max-w-md text-[15px] leading-relaxed text-muted">{p.excerpt}</span>
                  <span className="relative mt-3 flex items-center justify-between pb-4 text-[11px] uppercase tracking-[0.22em] text-ink">
                    <span className="flex items-center gap-3">
                      Read article
                      <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-2 group-hover:text-orange">
                        →
                      </span>
                    </span>
                    <span className="normal-case tracking-normal text-muted">{p.minutes} min read</span>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-700 ease-skayl-out group-hover:scale-x-100" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>

      {/* pointer preview (desktop, real images only) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/3] w-[260px] overflow-hidden rounded-[16px] bg-ink opacity-0 shadow-[0_40px_80px_-30px_rgba(15,5,5,0.55)] md:block"
      >
        {previewImg && <Image src={previewImg.src} alt="" fill sizes="260px" className="object-cover" style={{ objectPosition: previewImg.position }} />}
      </div>
    </section>
  );
}
