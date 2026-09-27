// AutoVive case study — all copy and data for /works/autovive.
// Presentation lives in src/components/sections/works/autovive/.
//
// Facts come from the brief, the project data and AutoVive's own brand files
// (logo, uniforms, social posts, pitch deck). The social posts use stock-style
// photography, so they're shown as the content design they are — not as
// AutoVive's own photography. No results, metrics or quotes are invented.

const C = "/work/autovive/case";

export const avAssets = {
  logoDark: `${C}/logo-dark.png`, // the original wordmark, for light grounds
  logoLight: `${C}/logo-light.png`, // white + cyan, for dark grounds
  jersey: `${C}/jersey.jpg`,
  polo: `${C}/polo.jpg`,
  scene: "/images/work-cards/autovive.png", // brand mockup: car, polo and collateral
  post1: `${C}/post-1.jpg`,
  post2: `${C}/post-2.jpg`,
  post3: `${C}/post-3.jpg`,
  post4: `${C}/post-4.jpg`,
  post5: `${C}/post-5.jpg`,
  post6: `${C}/post-6.jpg`,
  post7: `${C}/post-7.jpg`,
  post9: `${C}/post-9.jpg`,
  deck1: `${C}/deck-1.jpg`,
  deck2: `${C}/deck-2.jpg`,
  deck3: `${C}/deck-3.jpg`,
  deck7: `${C}/deck-7.jpg`,
} as const;

export type AvAssetKey = keyof typeof avAssets;
export type AvAssets = Record<AvAssetKey, string | null>;

// Sampled from the logo file and the brand's posts.
export const avColours = {
  cyan: "#29B5E1",
  navy: "#003A70",
  ink: "#110E0F",
  deep: "#061526", // page panels: between the brand's navy and the deck's black
};

export const av = {
  hero: {
    title: "AutoVive",
    statement: ["A premium identity for", "a next-generation", "mobile car wash."],
    disciplines: ["Branding", "Strategy", "Creative Direction"],
    years: "2023 — 2024",
    tagline: "Tap. Shine. Drive.",
  },

  intro: {
    meta: [
      { label: "Client", value: ["AutoVive"] },
      { label: "Industry", value: ["Automotive / Mobile car care"] },
      { label: "Role", value: ["Brand Designer & Creative Director"] },
      { label: "Year", value: ["2023–2024"] },
      { label: "Services", value: ["Logo & visual identity", "Brand guidelines", "Uniforms & workwear", "Social media", "Investor pitch deck"] },
    ],
    statement: "Sri Lanka’s first fully digital mobile car wash — branded like the premium service it is.",
    body: "AutoVive needed to communicate premium service, convenience and trust, while feeling modern enough for a digitally native audience — and credible enough for customers and investors alike.",
  },

  challenge: {
    eyebrow: "The challenge",
    headline: ["Modern mobility", "needs a modern", "brand."],
    body: [
      "AutoVive wasn’t just another car wash. It was a fully digital, on-demand service — built for convenience, quality and trust.",
      "The challenge was to create an identity that felt premium and professional, while staying approachable and easy to use in a digital environment.",
    ],
    // The brand's promises, as set out in AutoVive's own pitch deck.
    promisesTitle: "Four promises the brand had to carry",
    promises: ["100% mobile — we come to you", "Fully digital booking & payments", "An eco-friendly waterless wash option", "Consistent, professional quality — every time"],
  },

  transformation: {
    eyebrow: "The transformation",
    headline: "From insight to a brand that moves people.",
    stages: ["Research", "Strategy", "Brand identity", "Uniforms", "Content", "Social", "Pitch deck"],
    climax: "A 360° brand, built from zero",
  },

  identity: {
    eyebrow: "01 / Brand identity",
    title: ["Clean.", "Bold.", "Confident."],
    body: "A clean wordmark beneath a single sweep of cyan and a spark of shine. The system is built around precision, clarity and movement, reflecting the brand’s focus on quality and convenience.",
    colours: [
      { name: "AutoVive Cyan", hex: avColours.cyan, note: "The swoosh & spark" },
      { name: "Deep Navy", hex: avColours.navy, note: "Posts & polo" },
      { name: "Ink", hex: avColours.ink, note: "Wordmark" },
      { name: "White", hex: "#FFFFFF", note: "Space & type" },
    ],
    // Real lines from the brand's posts and uniforms.
    voice: ["Tap. Shine. Drive.", "Skip the hassle.", "Because dull isn’t your vibe.", "Time. Peace of mind. Effortless wins.", "Even the finest need a little attention."],
  },

  uniforms: {
    eyebrow: "02 / Uniforms & brand application",
    title: ["Every detail", "builds trust."],
    body: "The team is the brand on every job. A navy polo with the wordmark on the chest and “Tap. Shine. Drive.” across the back, and a cyan jersey that turns the tagline into a splash — so every technician arrives looking like part of a premium service.",
    items: [
      { key: "polo" as const, title: "Team polo", caption: "Navy, cyan-tipped collar — wordmark front, tagline back." },
      { key: "jersey" as const, title: "Brand jersey", caption: "“Tap. Shine. Drive.” as a splash of water." },
    ],
  },

  content: {
    eyebrow: "03 / Content creation",
    title: ["Real moments.", "Real value."],
    body: "A content language that brought the brand to life — showing the service, the process and the premium experience across social media, from launch teasers to offers.",
  },

  deck: {
    eyebrow: "04 / Investor pitch deck",
    title: ["The same brand,", "told to investors."],
    body: "Translating the brand into a clear, credible story for investors — the problem, the solution and why AutoVive wins, in the same visual language as everything else.",
    slides: [
      { key: "deck1" as const, label: "Cover" },
      { key: "deck2" as const, label: "Problem" },
      { key: "deck3" as const, label: "Solution" },
      { key: "deck7" as const, label: "Competitive advantage" },
    ],
  },

  impact: {
    eyebrow: "Delivered",
    stats: [
      { value: "01", label: "Identity system" },
      { value: "04", label: "Brand colours" },
      { value: "02", label: "Uniform designs" },
      { value: "11", label: "Pitch deck slides" },
    ],
    delivered: [
      "Logo",
      "Visual identity",
      "Brand guidelines",
      "Colour system",
      "Typography system",
      "Spacing & usage guidelines",
      "Uniform design",
      "Workwear",
      "Social media templates",
      "Content direction",
      "Investor pitch deck",
    ],
    statement: "A brand that moves with you — a complete identity for a modern, on-demand car wash, built for today’s mobility.",
  },

  finale: {
    statement: ["A utility,", "reimagined as a premium brand."],
  },
};
