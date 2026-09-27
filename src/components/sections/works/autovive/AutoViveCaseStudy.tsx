import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import NextProject from "@/components/case-study/NextProject";
import ScrollStages from "@/components/case-study/ScrollStages";
import { publicAsset } from "@/lib/public-asset";
import { av, avAssets, avColours, type AvAssetKey, type AvAssets } from "@/content/autovive-case-study";
import type { Work } from "@/content/works";

import AvPanel from "./AvPanel";
import AvHero from "./AvHero";
import AvIntro from "./AvIntro";
import AvChallenge from "./AvChallenge";
import AvIdentity from "./AvIdentity";
import AvUniforms from "./AvUniforms";
import AvContent from "./AvContent";
import AvDeck from "./AvDeck";
import AvImpact from "./AvImpact";
import AvFinalStatement from "./AvFinalStatement";
import AvFinal from "./AvFinal";

// Server Component: resolves which AutoVive assets exist in /public at build
// time, then composes the case study on the shared spine (same as JMA UK,
// Shajara and Framed Splendor): hero → project intelligence → challenge →
// transformation → project chapters → delivered → final statement → final
// visual → next project. Only the chapters in the middle are AutoVive's own:
// identity → uniforms → content → pitch deck.
export default function AutoViveCaseStudy({ work, next }: { work: Work; next: Work }) {
  const assets = Object.fromEntries(
    (Object.keys(avAssets) as AvAssetKey[]).map((k) => [k, publicAsset(avAssets[k])])
  ) as AvAssets;

  const nextImage = next.cardBg ? publicAsset(next.cardBg) ?? publicAsset(next.cover) : publicAsset(next.cover);

  return (
    <CaseStudyMotion>
      <article className="flex flex-col">
        <AvHero assets={assets} index={work.page} />
        <AvIntro />
        <AvPanel glow="12% 0%">
          <AvChallenge assets={assets} />
          <ScrollStages
            eyebrow={av.transformation.eyebrow}
            headline={av.transformation.headline}
            stages={av.transformation.stages}
            climax={av.transformation.climax}
            accent={avColours.cyan}
            tone="dark"
          />
        </AvPanel>
        <AvIdentity assets={assets} />
        <AvUniforms assets={assets} />
        <AvPanel glow="85% 0%">
          <AvContent assets={assets} />
        </AvPanel>
        <AvDeck assets={assets} />
        <AvImpact />
        <AvFinalStatement assets={assets} />
        <AvFinal assets={assets} />
        <NextProject work={next} image={nextImage} />
      </article>
    </CaseStudyMotion>
  );
}
