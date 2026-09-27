import type { Metadata } from "next";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import AboutHero from "@/components/sections/about/AboutHero";
import ImpactStatement from "@/components/sections/about/ImpactStatement";
import PrinciplesSection from "@/components/sections/about/PrinciplesSection";
import CreativePrinciple from "@/components/sections/about/CreativePrinciple";
import ProcessSection from "@/components/sections/about/ProcessSection";
import FoundersSection from "@/components/sections/about/FoundersSection";
import CapabilitiesSection from "@/components/sections/about/CapabilitiesSection";
import SelectedWork from "@/components/sections/about/SelectedWork";
import ClosingSection from "@/components/sections/about/ClosingSection";
import "@/components/sections/about/about.css";

export const metadata: Metadata = {
  title: "About — SKAYL",
  description:
    "SKAYL is an independent creative studio in the UK and Sri Lanka — brands, websites and content, guided by clear principles and Islamic values, and made without music.",
};

// Rhythm: cream → dark → cream → dark … so every chapter changes the light,
// ending on cream so the dark footer arrives as its own moment.
// Motion comes from the shared data-attribute system (CaseStudyMotion) plus
// two pinned chapters (Impact, Approach).
export default function AboutPage() {
  return (
    <CaseStudyMotion>
      <div className="flex flex-col gap-5 md:gap-6">
        <AboutHero />
        <ImpactStatement />
        <PrinciplesSection />
        <CreativePrinciple />
        <ProcessSection />
        <FoundersSection />
        <CapabilitiesSection />
        <SelectedWork />
        <ClosingSection />
      </div>
    </CaseStudyMotion>
  );
}
