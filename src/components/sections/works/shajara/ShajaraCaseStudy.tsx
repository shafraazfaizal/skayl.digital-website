import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import NextProject from "@/components/case-study/NextProject";
import ScrollStages from "@/components/case-study/ScrollStages";
import { firstPublicAsset, publicAsset } from "@/lib/public-asset";
import { sh, shAssets, shColours, type ShAssetKey, type ShAssets } from "@/content/shajara-case-study";
import type { Work } from "@/content/works";

import ShPanel from "./ShPanel";
import ShHero from "./ShHero";
import ShIntro from "./ShIntro";
import ShChallenge from "./ShChallenge";
import ShBrand from "./ShBrand";
import ShLogoStory from "./ShLogoStory";
import ShSystem from "./ShSystem";
import ShPackaging from "./ShPackaging";
import ShDetails from "./ShDetails";
import ShContent from "./ShContent";
import ShFilm from "./ShFilm";
import ShSocial from "./ShSocial";
import ShWorld from "./ShWorld";
import ShImpact from "./ShImpact";
import ShFinalStatement from "./ShFinalStatement";
import ShFinalVisual from "./ShFinalVisual";

// Server Component: resolves which Shajara assets exist in /public at build
// time, then composes the case study. Order: Ceylon → culture → identity →
// packaging → craft → photography → content → brand world.
export default function ShajaraCaseStudy({ work, next }: { work: Work; next: Work }) {
  const assets = Object.fromEntries(
    (Object.keys(shAssets) as ShAssetKey[]).map((k) => [
      k,
      k === "logo"
        ? firstPublicAsset("/work/shajara-tea/logo.svg", "/work/shajara-tea/logo.png")
        : publicAsset(shAssets[k]),
    ])
  ) as ShAssets;

  const nextImage = next.cardBg ? publicAsset(next.cardBg) ?? publicAsset(next.cover) : publicAsset(next.cover);

  return (
    <CaseStudyMotion>
      <article className="flex flex-col">
        <ShHero assets={assets} index={work.page} />
        <ShIntro />
        <ShPanel glow="10% 90%">
          <ShChallenge assets={assets} />
          <ScrollStages
            eyebrow={sh.transformation.eyebrow}
            headline={sh.transformation.headline}
            stages={sh.transformation.stages}
            climax={sh.transformation.climax}
            accent={shColours.gold}
            tone="dark"
          />
        </ShPanel>
        <ShBrand assets={assets} />
        <ShLogoStory assets={assets} />
        <ShSystem assets={assets} />
        <ShPackaging assets={assets} />
        <ShDetails assets={assets} />
        <ShContent assets={assets} />
        <ShFilm assets={assets} />
        <ShSocial assets={assets} />
        <ShWorld assets={assets} />
        <ShImpact />
        <ShFinalStatement assets={assets} />
        <ShFinalVisual assets={assets} />
        <NextProject work={next} image={nextImage} />
      </article>
    </CaseStudyMotion>
  );
}
