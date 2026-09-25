import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import Services from "@/components/sections/services/Services";
import Ticker from "@/components/ui/Ticker";
import CTA from "@/components/sections/shared/CTA";
import { tickerWords } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — SKAYL",
  description:
    "Web development, branding & design, content & media, and event management from SKAYL.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every discipline. One team."
        subtitle="We don’t subcontract. Every service is built by us — so every output shares the same creative language."
      />
      <Services />
      <Ticker words={tickerWords} className="border-y border-line py-8" />
      <CTA />
    </>
  );
}
