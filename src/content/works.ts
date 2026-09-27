// Portfolio projects shown on the Works listing and cards.

export type Work = {
  slug: string;
  title: string;
  page: string;
  year: string;
  role: string;
  services: string[];
  description: string;
  cover: string;
  glow: string; // brand glow colour behind the card mockup
  tint: string; // card base tint (deep, near-black brand shade)
  cardBg?: string; // full-bleed cinematic background image for the listing card
  category?: string; // editorial category label on the cinematic card
  subtitle?: string; // supporting subtitle under the title on the cinematic card
  cardLede?: string[]; // editorial description paragraphs for the cinematic card
  heroVideo?: string; // optional video hero for the case study page
  heroPoster?: string; // poster/first-frame for the hero video
  // Works page (exhibition) — optional so older cards keep working.
  industry?: string; // e.g. "Charity / Non-profit"
  disciplines?: string; // editorial category line, e.g. "Branding / Digital / Development"
  lede?: string; // one-sentence summary on the Works page
  filters?: WorkFilter[]; // which Works-page filters include this project
  deliverables?: string[]; // short list shown on the Works page
};

export const workFilters = ["Branding", "Digital", "Content", "Strategy"] as const;
export type WorkFilter = (typeof workFilters)[number];

export const works: Work[] = [
  {
    slug: "jma-uk",
    title: "JMA UK",
    page: "01 / 04",
    year: "2025–2026",
    role: "Lead Developer & Designer",
    services: [
      "Website Design",
      "Donation Platform",
      "Content Management",
      "Brand Identity",
    ],
    description:
      "Not every project is about profit. We built the JMA website at no cost — because some causes are worth more than any invoice.",
    cover: "/work/jma-uk/hero.png",
    cardBg: "/images/work-cards/jma-uk.png",
    category: "Charity / Non-Profit",
    subtitle: "A digital home for community impact",
    cardLede: [
      "Not every project is about profit.",
      "We built JMA’s digital home at no cost — because some causes are worth more than any invoice.",
    ],
    glow: "#0D5C6B",
    tint: "#0D2B1A",
    industry: "Charity / Non-profit",
    disciplines: "Branding / Digital / Development",
    lede: "A complete digital transformation for a UK charity — from no website or online donations to a full digital ecosystem.",
    filters: ["Branding", "Digital"],
    deliverables: ["Custom Next.js website", "Donation platform", "Admin dashboard & CMS", "Events, gallery & campaigns"],
  },
  {
    slug: "framed-splendor",
    title: "Framed Splendor",
    page: "02 / 04",
    year: "2024–2025",
    role: "Lead Developer & Designer",
    services: [
      "E-commerce Development",
      "Brand Identity",
      "Logo Design",
      "Social Media Design",
    ],
    description:
      "A premium LED mirror brand built from zero — website, brand identity, logo, and social content, all delivered by one team.",
    cover: "/work/framed-splendor/hero.png",
    cardBg: "/images/work-cards/framed-splendor.png",
    glow: "#1E4E7A",
    tint: "#0B1F3A",
    industry: "Premium LED Mirrors",
    disciplines: "Branding / E-commerce / Digital",
    lede: "A premium LED mirror brand built from zero — its identity, and the store that sells it.",
    filters: ["Branding", "Digital", "Content"],
    deliverables: ["Brand identity & logo", "E-commerce website", "Social media design"],
  },
  {
    slug: "autovive",
    title: "AutoVive",
    page: "03 / 04",
    year: "2023–2024",
    role: "Brand Designer & Creative Director",
    services: [
      "Logo Design",
      "Brand Identity",
      "Social Media Design",
      "Pitch Deck",
      "Uniform Design",
    ],
    description:
      "A 360° brand ecosystem for Sri Lanka's first fully digital mobile car wash — built to raise capital and win customers.",
    cover: "/work/autovive/posts/1.png",
    cardBg: "/images/work-cards/autovive.png",
    category: "Automotive / Startup",
    subtitle: "A 360° brand, built from zero",
    cardLede: [
      "A utility, reimagined as a premium brand.",
      "Sri Lanka’s first fully digital mobile car wash — with a 360° identity built to raise capital and win customers.",
    ],
    glow: "#0A5C8C",
    tint: "#06111A",
    industry: "Automotive / Mobility",
    disciplines: "Branding / Strategy / Creative Direction",
    lede: "A premium identity for Sri Lanka’s first fully digital mobile car wash.",
    filters: ["Branding", "Strategy", "Content"],
    deliverables: ["Logo & visual identity", "Brand guidelines", "Uniform design", "Social templates", "Investor pitch deck"],
  },
  {
    slug: "shajara-tea",
    title: "Shajara Tea",
    page: "04 / 04",
    year: "2023–2024",
    role: "Brand Designer & Creative Director",
    services: [
      "Logo Design",
      "Brand Identity",
      "Packaging Design",
      "Product Photography",
      "Social Media Posts",
      "Reels",
    ],
    description:
      "Complete branding kit for a premium Ceylon tea brand targeting the Middle East — from packaging to reels, all in one visual language.",
    cover: "/work/shajara-tea/posts/1.jpg",
    cardBg: "/images/work-cards/shajara-tea.png",
    glow: "#3A6B2A",
    tint: "#070F07",
    industry: "Premium Ceylon Tea",
    disciplines: "Brand Identity / Packaging / Content",
    lede: "A complete brand identity for a premium Sri Lankan tea brand entering the Middle Eastern market.",
    filters: ["Branding", "Content"],
    deliverables: ["Logomark & wordmark", "Packaging", "Photography art direction", "Social content & reels"],
  },
];
