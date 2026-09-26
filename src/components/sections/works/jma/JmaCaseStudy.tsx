import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import NextProject from "@/components/case-study/NextProject";
import { firstPublicAsset, pngSize, publicAsset } from "@/lib/public-asset";
import { jmaAssets, type JmaAssetKey, type JmaAssets } from "@/content/jma-case-study";
import type { Work } from "@/content/works";

import CaseStudyHero from "./CaseStudyHero";
import ProjectMeta from "./ProjectMeta";
import CaseStudyIntro from "./CaseStudyIntro";
import BeforeSection from "./BeforeSection";
import TransformationSection from "./TransformationSection";
import BrandIdentitySection from "./BrandIdentitySection";
import WebsiteShowcase from "./WebsiteShowcase";
import ArchitectureSection from "./ArchitectureSection";
import DonationSection from "./DonationSection";
import AdminSystemSection from "./AdminSystemSection";
import ContentEngineSection from "./ContentEngineSection";
import TechnologySection from "./TechnologySection";
import MobileSection from "./MobileSection";
import ImpactSection from "./ImpactSection";
import TestimonialSection from "./TestimonialSection";
import FinalStatement from "./FinalStatement";
import FinalVisual from "./FinalVisual";

// Server Component: resolves which JMA assets exist in /public at build time,
// then composes the flagship case study.
export default function JmaCaseStudy({ work, next }: { work: Work; next: Work }) {
  const assets = Object.fromEntries(
    (Object.keys(jmaAssets) as JmaAssetKey[]).map((k) => [
      k,
      k === "logo"
        ? firstPublicAsset("/work/jma-uk/logo.svg", "/work/jma-uk/logo.png")
        : publicAsset(jmaAssets[k]),
    ])
  ) as JmaAssets;

  const nextImage = next.cardBg ? publicAsset(next.cardBg) ?? publicAsset(next.cover) : publicAsset(next.cover);

  return (
    <CaseStudyMotion>
      <article className="flex flex-col">
        <CaseStudyHero assets={assets} index={work.page} />
        <ProjectMeta />
        <CaseStudyIntro />
        <BeforeSection />
        <TransformationSection />
        <BrandIdentitySection assets={assets} />
        <WebsiteShowcase assets={assets} />
        <ArchitectureSection />
        <DonationSection assets={assets} />
        <AdminSystemSection assets={assets} />
        <ContentEngineSection assets={assets} />
        <TechnologySection />
        <MobileSection
          assets={assets}
          sizes={{
            mobile1: pngSize(assets.mobile1),
            mobile2: pngSize(assets.mobile2),
            mobile3: pngSize(assets.mobile3),
          }}
        />
        <ImpactSection />
        <TestimonialSection assets={assets} />
        <FinalStatement assets={assets} />
        <FinalVisual assets={assets} />
        <NextProject work={next} image={nextImage} />
      </article>
    </CaseStudyMotion>
  );
}