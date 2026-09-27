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
};

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
    glow: "#1E4E7A",
    tint: "#0B1F3A",
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
    glow: "#3A6B2A",
    tint: "#070F07",
  },
];
