"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { DarkPanel } from "@/components/case-study/Layout";
import { BrowserFrame } from "@/components/case-study/Frames";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 08 — Donations: the darker chapter. Categories scroll naturally; the one
// crossing the centre of the screen comes into focus (no slideshow).
export default function DonationSection({ assets }: { assets: JmaAssets }) {
  const root = useRef<HTMLDivElement>(null);
  const { donation } = jma;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-cat]", root.current);
        gsap.set(rows, { opacity: 0.22 });
        rows.forEach((row) => {
          const num = row.querySelector("[data-cat-num]");
          ScrollTrigger.create({
            trigger: row,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
              gsap.to(row, { opacity: self.isActive ? 1 : 0.22, duration: 0.5, ease: "power2.out" });
              gsap.to(row, { x: self.isActive ? 12 : 0, duration: 0.6, ease: "power3.out" });
              if (num) gsap.to(num, { color: self.isActive ? "#E64A19" : "rgba(245,240,225,0.35)", duration: 0.4 });
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <DarkPanel glow="#0D5C6B">
      <div ref={root}>
        <Container className="pt-20 md:pt-28">
          <span className="block text-center text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
            {donation.eyebrow}
          </span>
          <h2
            data-cs="lines"
            className="giant-heading giant-heading--light mt-2 text-center text-[clamp(7rem,30vw,24rem)] !leading-[0.85]"
          >
            {donation.headline}
          </h2>
          <p
            data-cs="fade"
            className="mx-auto mt-2 max-w-xl text-center text-xl leading-snug text-cream/70 md:text-2xl"
          >
            {donation.body}
          </p>
        </Container>

        <Container className="py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
            {/* the real interface, held in view while categories pass */}
            <div className="md:sticky md:top-24 md:self-start">
              <div data-cs="clip">
                <BrowserFrame url={`${jma.websiteLabel}/donate`} tone="dark">
                  <div className="relative aspect-[4/5]">
                    <MediaSlot
                      src={assets.donate}
                      alt="The JMA UK donation page"
                      label="Donation flow"
                      file={jmaAssets.donate}
                      position="50% 0%"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="absolute inset-0"
                    />
                  </div>
                </BrowserFrame>
              </div>
            </div>

            <ol className="flex flex-col">
              {donation.categories.map((c, i) => (
                <li
                  key={c.name}
                  data-cat
                  className="flex flex-col gap-2 border-b border-cream/10 py-8 first:pt-0 md:py-12"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="flex items-baseline gap-5">
                      <span data-cat-num className="font-display text-sm tabular-nums text-orange">
                        0{i + 1}
                      </span>
                      <span className="display text-5xl leading-none md:text-7xl">{c.name}</span>
                    </span>
                    <span lang="ar" dir="rtl" className="text-2xl text-cream/40 md:text-3xl">
                      {c.arabic}
                    </span>
                  </div>
                  <span className="pl-10 text-cream/55">{c.detail}</span>
                </li>
              ))}
            </ol>
          </div>

          <div data-cs="stagger" className="mt-20 grid gap-px overflow-hidden rounded-[24px] bg-cream/10 md:mt-28 md:grid-cols-2">
            {donation.rails.map((r) => (
              <div key={r.label} className="flex flex-col gap-2 bg-ink px-7 py-8 md:px-10 md:py-10">
                <span className="text-[11px] uppercase tracking-[0.28em] text-orange">{r.label}</span>
                <span className="font-display text-2xl text-cream md:text-3xl">{r.detail}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </DarkPanel>
  );
}
