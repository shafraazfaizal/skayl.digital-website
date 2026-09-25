"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { services } from "@/content/services";

const AUTO_MS = 5000;

export default function WhatWeDo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0); // desktop panel (0..n-1)
  const [locked, setLocked] = useState(false); // stop auto-cycle after a click
  const [hovering, setHovering] = useState(false);
  const [openMobile, setOpenMobile] = useState<number | null>(0); // accordion

  // Auto-cycle every 5s until the user locks it (click) or is hovering.
  useEffect(() => {
    if (locked || hovering || reduce) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % services.length),
      AUTO_MS
    );
    return () => clearInterval(id);
  }, [locked, hovering, reduce]);

  const panelMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -24 },
      };

  const s = services[active];

  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-6 md:mb-8">
          <SectionHeading
            eyebrow="Services"
            title="Every discipline. One team."
            sub="We don’t subcontract. Every service is owned by us — meaning every output shares the same creative DNA."
          />
        </div>

        {/* ≥860px — sticky menu + display panel */}
        <div
          className="mt-10 hidden gap-10 min-[860px]:grid min-[860px]:grid-cols-[330px_1fr]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            role="tablist"
            aria-label="Services"
            className="self-start min-[860px]:sticky min-[860px]:top-28"
          >
            {services.map((svc, i) => {
              const on = i === active;
              return (
                <button
                  key={svc.title}
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={on}
                  aria-controls="service-panel"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  className={`flex w-full items-baseline gap-4 border-b border-line py-6 text-left transition-all duration-300 ease-skayl-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/60 ${
                    on ? "pl-3 opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <span
                    className={`font-display text-sm transition-colors ${
                      on ? "text-orange" : "text-muted"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="display text-[26px] leading-tight">
                    {svc.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            className="relative min-h-[540px] overflow-hidden rounded-[28px] bg-ink text-cream"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={panelMotion.initial}
                animate={panelMotion.animate}
                exit={panelMotion.exit}
                transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 860px) 100vw, 60vw"
                  className="object-cover opacity-80"
                  priority={active === 0}
                />
                {/* per-service radial glow + grain, in the brand palette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(80% 75% at 75% 20%, rgba(230,74,25,0.25), rgba(15,5,5,0))",
                  }}
                />
                {/* legibility scrim — heavier on the left where the copy sits */}
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
                <div className="skayl-grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-8 md:p-12">
                  <div className="flex flex-col gap-5">
                    <h3 className="display text-4xl md:text-5xl">{s.title}</h3>
                    <p className="max-w-md text-cream/70">{s.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <Badge key={t} light>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-12 border-t border-cream/15 pt-5 text-sm">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-cream/50">Starts at</span>
                      <span className="font-medium">{s.price}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-cream/50">Timeline</span>
                      <span className="font-medium">{s.timeline}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* <860px — accordion */}
        <div className="mt-8 flex flex-col min-[860px]:hidden">
          {services.map((svc, i) => {
            const on = openMobile === i;
            return (
              <div key={svc.title} className="border-b border-line">
                <button
                  id={`m-tab-${i}`}
                  aria-expanded={on}
                  aria-controls={`m-panel-${i}`}
                  onClick={() => {
                    setOpenMobile(on ? null : i);
                    setLocked(true);
                  }}
                  className="flex w-full items-baseline gap-4 py-6 text-left focus-visible:outline-none"
                >
                  <span
                    className={`font-display text-sm ${
                      on ? "text-orange" : "text-muted"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="display flex-1 text-2xl">{svc.title}</span>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      on ? "rotate-45 text-orange" : "text-muted"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`m-panel-${i}`}
                      role="region"
                      aria-labelledby={`m-tab-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
                          <Image
                            src={svc.image}
                            alt={svc.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="text-muted">{svc.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {svc.tags.map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                        <div className="mt-5 flex gap-10 text-sm">
                          <div className="flex flex-col">
                            <span className="text-muted">Starts at</span>
                            <span className="font-medium">{svc.price}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted">Timeline</span>
                            <span className="font-medium">{svc.timeline}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
