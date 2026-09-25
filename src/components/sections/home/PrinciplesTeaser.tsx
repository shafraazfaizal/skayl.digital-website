import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { principlesTeaser } from "@/content/home";

export default function PrinciplesTeaser() {
  return (
    <section className="py-24 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="What Guides Us"
          title="Every project runs on the same principles."
        />

        <div className="mx-auto mt-14 max-w-5xl">
          {/* Principles — refined index row */}
          <Reveal className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {principlesTeaser.map((p, i) => (
              <span
                key={p}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/[0.02] px-4 py-2.5 text-sm text-ink transition-colors duration-300 hover:border-ink/25 md:px-5"
              >
                <span className="font-display text-xs text-orange">
                  0{i + 1}
                </span>
                {p}
              </span>
            ))}
          </Reveal>

          {/* Featured creative principle — the one that sets SKAYL apart */}
          <Reveal delay={0.08} className="mt-8">
            <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-cream md:p-14">
              {/* ambient brand glow + grain */}
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-[110px]"
                style={{ backgroundColor: "#E64A19" }}
              />
              <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

              <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div className="flex max-w-2xl flex-col gap-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-orange">
                    Our Creative Principle
                  </span>
                  <h3 className="display text-3xl leading-[1.02] md:text-5xl">
                    No music. In any form of content.
                  </h3>
                  <p className="max-w-xl leading-relaxed text-cream/60">
                    Every reel, brand film, and social cut we produce is
                    music-free by principle — carried instead by storytelling,
                    cinematic visuals, professional voiceover, and authentic
                    sound. It stays consistent across every project, for every
                    client.
                  </p>
                </div>

                <Link
                  href="/about#principles"
                  className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  Read how we work
                  <span className="transition-transform duration-300 ease-skayl-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
