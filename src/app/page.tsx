import Hero from "@/components/sections/home/Hero";
import Ticker from "@/components/ui/Ticker";
import Work from "@/components/sections/works/Work";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import Process from "@/components/sections/home/Process";
import WhyUs from "@/components/sections/home/WhyUs";
import Testimonials from "@/components/sections/home/Testimonials";
import PrinciplesTeaser from "@/components/sections/home/PrinciplesTeaser";
import PricingSection from "@/components/sections/home/PricingSection";
import FAQ from "@/components/sections/home/FAQ";
import CTA from "@/components/sections/shared/CTA";
import { tickerWords } from "@/content/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker words={tickerWords} speed={75} className="border-y border-line py-8" />
      <Work />
      <WhatWeDo />
      <Process />
      <WhyUs />
      <Testimonials />
      <PrinciplesTeaser />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
