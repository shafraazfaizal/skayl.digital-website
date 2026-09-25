"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { reels } from "@/content/works";

// Intentional (non-uniform) vertical offsets so the row reads as a shelf,
// not a flat grid.
const OFFSETS = [16, 56, 0, 48, 20, 52];

export default function ReelsShowcase() {
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Unmuting one reel automatically mutes any other.
  const toggle = (id: string) =>
    setUnmutedId((cur) => (cur === id ? null : id));

  return (
    <section className="pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-cream md:px-12 md:py-20">
          {/* ambient glow + grain */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, rgba(230,74,25,0.18), rgba(15,5,5,0))",
            }}
          />
          <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

          <Reveal className="relative z-10 mb-14 flex flex-col items-center gap-3 text-center">
            <span className="text-sm italic text-orange">(Reels)</span>
            <h2 className="display text-4xl md:text-6xl">Content in motion.</h2>
            <p className="max-w-md text-cream/60">
              A shelf of reels we’ve shot and cut — social content built to stop
              the scroll.
            </p>
          </Reveal>

          <div
            className={
              desktop
                ? "relative z-10 flex items-start justify-center gap-4 pt-6 md:gap-6"
                : "relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            {reels.map((r, i) => (
              <div
                key={r.id}
                className={desktop ? "" : "shrink-0 snap-center"}
              >
                <PhoneFrame
                  reel={r}
                  muted={unmutedId !== r.id}
                  onToggleMute={() => toggle(r.id)}
                  offset={desktop ? OFFSETS[i % OFFSETS.length] : 0}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
