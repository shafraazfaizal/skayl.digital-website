import type { Metadata } from "next";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesIntro from "@/components/sections/services/ServicesIntro";
import ServiceChapter from "@/components/sections/services/ServiceChapter";
import { BrandVisual, ContentVisual, WebVisual, type ServiceAssets } from "@/components/sections/services/ServiceVisuals";
import EventAddOn from "@/components/sections/services/EventAddOn";
import Commitments from "@/components/sections/services/Commitments";
import HomeProcess from "@/components/sections/home/HomeProcess";
import FAQ from "@/components/sections/home/FAQ";
import HomeCTA from "@/components/sections/home/HomeCTA";
import { publicAsset } from "@/lib/public-asset";
import { serviceChapters, servicesFaqs, servicesHero } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — SKAYL",
  description:
    "Web development, branding & design, and content & media — led by one team, quoted to your scope. Event management available as an add-on.",
};

// Story: what we do → the promise → each discipline, shown through real work
// → the add-on → what you can count on + how we work (one dark chapter) →
// questions → let's talk. Same motion system and rhythm as the other pages.
export default function ServicesPage() {
  const stage = servicesHero.stage
    .map((s) => ({ ...s, src: publicAsset(s.src) }))
    .filter((s): s is typeof s & { src: string } => !!s.src);

  const a: ServiceAssets = {
    jmaMockup: publicAsset("/work/jma-uk/hero.png"),
    fsHomeFull: publicAsset("/work/framed-splendor/case/web-home-full.jpg"),
    fsInterior: publicAsset("/work/framed-splendor/case/interior-antifog.jpg"),
    shajaraLid: publicAsset("/work/shajara-tea/case/pack-lid.jpg"),
    shajaraStack: publicAsset("/work/shajara-tea/case/pack-stack.jpg"),
    autoviveDeck: publicAsset("/work/autovive/pitch-deck/1.png"),
    autovivePost: publicAsset("/work/autovive/posts/4.png"),
    fsMark: publicAsset("/work/framed-splendor/case/mark-light.svg"),
    shajaraReel: publicAsset("/work/shajara-tea/case/film-ad.mp4"),
    shajaraReelPoster: publicAsset("/work/shajara-tea/case/film-ad-still.jpg") ?? publicAsset("/work/shajara-tea/case/film-ad.jpg"),
    shajaraPour: publicAsset("/work/shajara-tea/case/photo-pour.jpg"),
    shajaraPost: publicAsset("/work/shajara-tea/posts/1.jpg"),
  };
  const visuals = {
    "web-development": <WebVisual a={a} />,
    "branding-design": <BrandVisual a={a} />,
    "content-media": <ContentVisual a={a} />,
  } as Record<string, React.ReactNode>;

  return (
    <CaseStudyMotion>
      <div className="flex flex-col gap-5 md:gap-6">
        <ServicesHero stage={stage} />
        <ServicesIntro />
        <div className="flex flex-col">
          {serviceChapters.map((c, i) => (
            <ServiceChapter key={c.id} chapter={c} flip={i % 2 === 1} visual={visuals[c.id]} />
          ))}
          <EventAddOn />
        </div>
        <section className="px-5 md:px-12">
          <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
            <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
            <Commitments />
            <div className="relative mx-5 h-px bg-cream/10 md:mx-12" />
            <HomeProcess />
          </div>
        </section>
        <FAQ items={servicesFaqs} title="Before you reach out." body="Pricing, timelines, and what happens if something isn’t right — answered plainly." />
        <HomeCTA />
      </div>
    </CaseStudyMotion>
  );
}
