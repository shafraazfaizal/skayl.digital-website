import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";
import ShPanel from "./ShPanel";
import Wordmark from "./Wordmark";
import IslandRing from "./IslandRing";

// 06 — The logomark story: the name, what it means, and the island in the mark.
export default function ShLogoStory({ assets }: { assets: ShAssets }) {
  const { logoStory } = sh;
  return (
    <ShPanel glow="20% 20%">
      <Container className="grid gap-16 py-24 md:grid-cols-2 md:items-center md:gap-20 md:py-36">
        <div className="flex flex-col gap-8">
          <Eyebrow light>{logoStory.eyebrow}</Eyebrow>
          <p
            data-cs="fade"
            lang="ar"
            dir="rtl"
            className="text-right text-[5.5rem] leading-none md:text-left md:text-[8.5rem]"
            style={{ color: shColours.gold }}
          >
            {logoStory.arabic}
          </p>
          <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
            {logoStory.meaning}
          </h2>
          <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-cream/65">
            {logoStory.body}
          </p>
          <ol data-cs="stagger" className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-cream/75 md:text-xs">
            {logoStory.chain.map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden style={{ color: shColours.gold }}>
                    →
                  </span>
                )}
                {c}
              </li>
            ))}
          </ol>
        </div>

        <figure className="flex flex-col gap-6">
          <div
            data-cs="fade"
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px]"
            style={{ backgroundColor: shColours.green }}
          >
            <div className="relative w-[64%] max-w-[360px]">
              <Wordmark logo={assets.logo} wordmark={assets.wordmark} className="max-w-none" />
              {/* the dot above the j: the island of Sri Lanka */}
              <IslandRing color={shColours.gold} x="54.5%" y="13%" size="30%" />
            </div>
          </div>
          <figcaption data-cs="fade" className="max-w-md text-[15px] leading-relaxed text-cream/60">
            {logoStory.detail}
          </figcaption>
        </figure>
      </Container>
    </ShPanel>
  );
}
