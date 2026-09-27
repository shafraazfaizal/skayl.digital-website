import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import HomeHero from "@/components/sections/home/HomeHero";
import ServicesMarquee from "@/components/sections/home/ServicesMarquee";
import HomeWork from "@/components/sections/home/HomeWork";
import Disciplines from "@/components/sections/home/Disciplines";
import HomeProcess from "@/components/sections/home/HomeProcess";
import Philosophy from "@/components/sections/home/Philosophy";
import HomeProof from "@/components/sections/home/HomeProof";
import HomeStandard from "@/components/sections/home/HomeStandard";
import FAQ from "@/components/sections/home/FAQ";
import HomeCTA from "@/components/sections/home/HomeCTA";
import "@/components/sections/home/home.css";

// Story: who we are → what we do → what we've built → how we think → how we
// work → why → proof → standard → questions → let's talk.
// Rhythm: cream → DARK → cream → cream → DARK (process + philosophy as one
// event) → cream … ending on cream so the footer lands on its own.
export default function Home() {
  return (
    <CaseStudyMotion>
      <div className="flex flex-col gap-5 md:gap-6">
        <HomeHero />
        <ServicesMarquee />
        <HomeWork />
        <Disciplines />
        <section className="px-5 md:px-12">
          <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
            <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
            <HomeProcess />
            <div className="relative mx-5 h-px bg-cream/10 md:mx-12" />
            <Philosophy />
          </div>
        </section>
        <HomeProof />
        <HomeStandard />
        <FAQ />
        <HomeCTA />
      </div>
    </CaseStudyMotion>
  );
}
