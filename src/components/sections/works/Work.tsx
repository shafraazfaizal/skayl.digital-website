"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { works, type Work as WorkType } from "@/content/works";

gsap.registerPlugin(ScrollTrigger);

// Cinematic full-bleed variant — background image, no mockup, editorial
// poster-style typography. Used for any card that provides a `cardBg`.
function WorkCardCinematic({ w }: { w: WorkType }) {
  const [count, total] = w.page.split(" / ");
  const lede = w.cardLede ?? [w.description];
  return (
    <Link
      href={`/works/${w.slug}`}
      className="group relative flex min-h-[520px] w-full flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 md:aspect-[1836/856]"
    >
      {/* full-bleed background */}
      <Image
        src={w.cardBg!}
        alt={w.title}
        fill
        sizes="(max-width: 768px) 100vw, 1184px"
        className="object-cover transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.05]"
        priority
      />

      {/* soft teal glow behind the laptop (right side) */}
      <div
        className="pointer-events-none absolute right-[-6%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
        style={{ backgroundColor: w.glow }}
      />
      {/* text-contrast + cinematic scrims */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      {/* cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(125%_130%_at_50%_42%,transparent_54%,rgba(15,5,5,0.62)_100%)]" />
      {/* film grain */}
      <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-7 text-cream md:p-12 lg:p-14">
        {/* top row — category + index */}
        <div className="flex items-start justify-between gap-6">
          <span className="text-[11px] uppercase tracking-[0.28em] text-cream/70 md:text-xs">
            {w.category ?? "Selected Work"}
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] tabular-nums text-cream/55 md:text-xs">
            <span className="text-cream/90">{count}</span>
            <span className="text-cream/35"> / {total}</span>
          </span>
        </div>

        {/* editorial headline block */}
        <div className="flex max-w-xl flex-col gap-6">
          {/* title + subtitle */}
          <div className="flex flex-col gap-2.5">
            <h3 className="display text-5xl leading-[0.92] md:text-7xl lg:text-[5rem]">
              {w.title}
            </h3>
            {w.subtitle && (
              <p className="text-lg font-normal text-cream/55 md:text-xl">
                {w.subtitle}
              </p>
            )}
          </div>

          {/* editorial description */}
          <div className="flex max-w-sm flex-col gap-1.5 text-[15px] leading-relaxed text-cream/75">
            {lede.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* hairline divider */}
          <div className="h-px w-full max-w-sm bg-cream/15" />

          {/* metadata — Role / Year / Disciplines */}
          <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-cream/45">
                Role
              </span>
              <span className="text-[13px] leading-snug text-cream/85">
                {w.role}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-cream/45">
                Year
              </span>
              <span className="text-[13px] leading-snug tabular-nums text-cream/85">
                {w.year}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-cream/45">
                Disciplines
              </span>
              <ul className="flex flex-col gap-1 text-[13px] leading-snug text-cream/85">
                {w.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* hover reveal — View case study */}
      <span className="absolute bottom-7 right-7 z-10 hidden items-center gap-2 whitespace-nowrap text-sm text-cream/85 opacity-0 transition-all duration-500 ease-skayl-out group-hover:opacity-100 md:bottom-12 md:right-12 md:flex md:translate-y-1.5 md:group-hover:translate-y-0 lg:bottom-14 lg:right-14">
        View case study
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function WorkCard({ w }: { w: WorkType }) {
  if (w.cardBg) return <WorkCardCinematic w={w} />;
  return (
    <Link
      href={`/works/${w.slug}`}
      className="group relative block overflow-hidden rounded-[32px] border border-white/10"
      style={{ backgroundColor: w.tint }}
    >
      {/* brand glow blobs */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-50 blur-[90px]"
        style={{ backgroundColor: w.glow }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full opacity-30 blur-[100px]"
        style={{ backgroundColor: w.glow }}
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_1.15fr_0.85fr] md:gap-6 md:p-12">
        {/* LEFT — description (top) + counter & title (bottom) */}
        <div className="flex flex-col justify-between gap-10 text-cream">
          <p className="max-w-xs text-[15px] leading-relaxed text-cream/70">
            {w.description}
          </p>
          <div className="flex flex-col gap-3">
            <span className="text-sm text-cream/50">
              <span className="text-cream/90">{w.page.split(" / ")[0]}</span> /{" "}
              {w.page.split(" / ")[1]}
            </span>
            <div className="h-px w-16 bg-cream/20" />
            <h3 className="display text-5xl leading-none md:text-6xl">
              {w.title}
            </h3>
          </div>
        </div>

        {/* CENTER — floating, tilted mockup on a soft light platform */}
        <div className="relative flex items-center justify-center py-4">
          <div
            className="absolute inset-x-6 bottom-6 top-10 rounded-3xl opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 60%, rgba(255,255,255,0.35), rgba(255,255,255,0))",
            }}
          />
          <div className="relative aspect-[4/5] w-full max-w-[340px] rotate-[-4deg] overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-skayl-out group-hover:rotate-0 group-hover:scale-[1.03]">
            <Image
              src={w.cover}
              alt={w.title}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT — year / role / services */}
        <div className="flex flex-col gap-8 text-cream">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-cream/45">Year</span>
            <span className="text-lg text-cream">{w.year}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-cream/45">Role</span>
            <span className="text-lg text-cream">{w.role}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-cream/45">Services</span>
            <ul className="flex flex-col gap-1">
              {w.services.map((s) => (
                <li key={s} className="text-[15px] text-cream/85">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Sticky-stacking works cards — a port of the Framer styleTransformEffect.
export default function Work({ heading = true }: { heading?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.55,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 80%",
            end: "top 45%",
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-24 md:pt-28">
      <Container>
        {heading && (
          <div className="mb-10 md:mb-14">
            <SectionHeading
              eyebrow="Selected Work"
              title="What we’ve built."
              sub="Click any project to explore the full case study."
            />
          </div>
        )}

        <div ref={wrapRef} className="flex flex-col gap-6">
          {works.map((w) => (
            <div key={w.slug} data-work-card className="sticky top-24 origin-top">
              <WorkCard w={w} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
