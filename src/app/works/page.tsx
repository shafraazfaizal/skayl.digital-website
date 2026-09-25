import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import Work from "@/components/sections/works/Work";
import CTA from "@/components/sections/shared/CTA";

export const metadata: Metadata = {
  title: "Works — SKAYL",
  description: "Selected work from SKAYL across web, brand, and content.",
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Built with intention. Delivered with precision."
        subtitle="Every project on this page was designed, developed, and delivered entirely in-house — no outsourcing, no exceptions."
      />
      <Work heading={false} />
      <CTA />
    </>
  );
}
