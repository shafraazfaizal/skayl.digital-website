import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import NextProject from "@/components/case-study/NextProject";
import ScrollStages from "@/components/case-study/ScrollStages";
import { publicAsset } from "@/lib/public-asset";
import { fs, fsAssets, fsColours, type FsAssetKey, type FsAssets } from "@/content/framed-case-study";
import type { Work } from "@/content/works";

import FsPanel from "./FsPanel";
import FsHero from "./FsHero";
import FsIntro from "./FsIntro";
import FsChallenge from "./FsChallenge";
import FsIdentity from "./FsIdentity";
import FsLogoReveal from "./FsLogoReveal";
import FsWorld from "./FsWorld";
import FsEcommerce from "./FsEcommerce";
import FsDetails from "./FsDetails";
import FsSocial from "./FsSocial";
import FsImpact from "./FsImpact";
import FsFinalStatement from "./FsFinalStatement";
import FsFinal from "./FsFinal";

// Server Component: resolves which Framed Splendor assets exist in /public at
// build time, then composes the case study.
// Shared case-study spine (same as JMA UK and Shajara): hero → project
// intelligence → challenge → transformation → project chapters → impact →
// final statement → final visual → next project. Only the chapters differ.
export default function FramedCaseStudy({ work, next }: { work: Work; next: Work }) {
  const assets = Object.fromEntries(
    (Object.keys(fsAssets) as FsAssetKey[]).map((k) => [k, publicAsset(fsAssets[k])])
  ) as FsAssets;

  const nextImage = next.cardBg ? publicAsset(next.cardBg) ?? publicAsset(next.cover) : publicAsset(next.cover);

  return (
    <CaseStudyMotion>
      <article className="flex flex-col">
        <FsHero assets={assets} index={work.page} />
        <FsIntro />
        <FsPanel glow="85% 0%">
          <FsChallenge />
          <ScrollStages
            eyebrow={fs.transformation.eyebrow}
            headline={fs.transformation.headline}
            stages={fs.transformation.stages}
            climax={fs.transformation.climax}
            accent={fsColours.gold}
            tone="dark"
          />
          <FsIdentity assets={assets} />
          <FsLogoReveal mark={assets.markLight} wordmark={assets.wordmarkLight} />
        </FsPanel>
        <FsWorld assets={assets} />
        <FsEcommerce assets={assets} />
        <FsDetails assets={assets} />
        <FsPanel tone="ink" glow="15% 0%">
          <FsSocial assets={assets} />
        </FsPanel>
        <FsImpact />
        <FsFinalStatement assets={assets} />
        <FsFinal assets={assets} />
        <NextProject work={next} image={nextImage} />
      </article>
    </CaseStudyMotion>
  );
}
