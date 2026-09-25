"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";
import { stats, testimonials } from "@/content/home";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Auto-advance every 5s unless the user is hovering the card.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  const t = testimonials[index];

  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-10 md:mb-14">
          <SectionHeading eyebrow="From clients" title="What they actually said." />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT — animated stats card */}
          <div className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-[32px] bg-ink p-10 text-cream md:p-12">
            <div
              className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
              style={{ backgroundColor: "#E64A19" }}
            />
            {stats.map((s) => (
              <div key={s.label} className="relative flex flex-col gap-1">
                <CountUp
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                  className="font-display text-6xl leading-none tracking-tightest md:text-7xl"
                />
                <span className="text-sm text-cream/55">{s.label}</span>
              </div>
            ))}
          </div>

          {/* RIGHT — auto-rotating testimonial card */}
          <div
            className="relative min-h-[420px] overflow-hidden rounded-[32px] md:min-h-[520px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={t.image}
                  alt={t.role}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
              </motion.div>
            </AnimatePresence>

            {/* counter */}
            <div className="absolute left-8 top-8 z-10 text-sm text-cream/80">
              <span className="text-cream">
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              / {String(count).padStart(2, "0")}
            </div>

            {/* quote */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-5 text-cream"
                >
                  <p className="display text-2xl leading-snug md:text-[2rem]">
                    “{t.quote}”
                  </p>
                  <figcaption className="text-sm text-cream/70">
                    <span className="text-cream">{t.author}</span>, {t.role}
                  </figcaption>
                </motion.blockquote>
              </AnimatePresence>

              {/* controls */}
              <div className="flex items-center gap-3">
                <button
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                >
                  <Arrow dir="right" />
                </button>
                <div className="ml-2 flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === index ? "w-6 bg-orange" : "w-3 bg-cream/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
