// Framed Splendor case study — all copy and data for /works/framed-splendor.
// Presentation lives in src/components/sections/works/framed/.
//
// Every fact here comes from the live site, the brand's own posts or the
// project data. Images are the real brand assets and website screenshots
// (web-ready copies in public/work/framed-splendor/case/).

const C = "/work/framed-splendor/case";

export const fsAssets = {
  markLight: `${C}/mark-light.svg`, // white + gold, for dark grounds
  markDark: `${C}/mark-dark.svg`, // navy + gold, for light grounds
  wordmarkLight: `${C}/wordmark-light.svg`,
  wordmarkDark: `${C}/wordmark-dark.svg`,
  avatar: `${C}/social-avatar.jpg`,
  // interiors (from the brand's campaign imagery)
  interiorRound: `${C}/interior-round.jpg`,
  interiorAntifog: `${C}/interior-antifog.jpg`,
  interiorTones: `${C}/interior-tones.jpg`,
  collection: `${C}/collection-mirrors.jpg`,
  heroPhoto: `${C}/web-hero-photo.jpg`, // the website's own hero photograph
  // details
  detailGlow: `${C}/detail-glow.jpg`,
  detailAntifog: `${C}/detail-antifog.jpg`,
  detailWarm: `${C}/detail-warm.jpg`,
  detailSensor: `${C}/detail-sensor.jpg`,
  // products (from the site's featured grid)
  product1: `${C}/product-1.jpg`,
  product2: `${C}/product-2.jpg`,
  product3: `${C}/product-3.jpg`,
  product4: `${C}/product-4.jpg`,
  // website
  webHome: `${C}/web-home.jpg`,
  webHomeFull: `${C}/web-home-full.jpg`,
  webShop: `${C}/web-shop.jpg`,
  webProduct: `${C}/web-product.jpg`,
  webFittings: `${C}/web-fittings.jpg`,
  webBasket: `${C}/web-basket.jpg`,
  mobileHome: `${C}/mobile-home.jpg`,
  mobileProduct: `${C}/mobile-product.jpg`,
  mobileShop: `${C}/mobile-shop.jpg`,
  // social
  post1: `${C}/post-1.jpg`,
  post2: `${C}/post-2.jpg`,
  post3: `${C}/post-3.jpg`,
  reel: `${C}/catalog.mp4`,
  reelPoster: `${C}/catalog.jpg`,
} as const;

export type FsAssetKey = keyof typeof fsAssets;
export type FsAssets = Record<FsAssetKey, string | null>;

// From the logo files.
export const fsColours = {
  navy: "#0B1F3A",
  deep: "#07152A",
  gold: "#C9962A",
  cream: "#F3EFE8",
};

export const fs = {
  websiteUrl: "https://www.framedsplendor.co.uk",
  websiteLabel: "framedsplendor.co.uk",

  hero: {
    title: ["Framed", "Splendor"],
    statement: "Light, reframed.",
    disciplines: ["E-commerce", "Brand identity", "Digital"],
    years: "2026",
    role: "Lead Developer & Designer",
  },

  intro: {
    eyebrow: "The project",
    statement: "A premium mirror brand, built from the ground up.",
    body: "Framed Splendor is a UK brand of premium LED bathroom mirrors and glass fittings, built from zero. It needed an identity and an online store that present each mirror as a design object — not just another listing.",
    meta: [
      { label: "Client", value: ["Framed Splendor"] },
      { label: "Industry", value: ["E-commerce / Home & Bathroom"] },
      { label: "Role", value: ["Lead Developer & Designer"] },
      { label: "Year", value: ["2026"] },
      { label: "Services", value: ["E-commerce Website", "Brand Identity", "Logo Design", "Social Media Design"] },
    ],
  },

  challenge: {
    eyebrow: "The challenge",
    headline: "A new UK business. Nothing to build on.",
    body: "Framed Splendor started from a blank page — no name on the market, no identity and no store. Premium mirrors sell on how they look in a room, so the brand had to feel luxurious from the first visit, and the store had to sell each mirror as a design object, not a listing.",
    gaps: ["No brand identity", "No online store", "No product presentation", "No social presence"],
  },

  transformation: {
    eyebrow: "The transformation",
    headline: "From a blank page to a brand.",
    stages: ["Logo", "Brand identity", "E-commerce store", "Product pages", "Social content"],
    climax: "A complete brand, ready to sell",
  },

  identity: {
    eyebrow: "Brand identity",
    title: ["A brand", "built around", "light."],
    body: "An FS monogram set in a hexagonal frame and split by a single line of gold. Navy, gold and cream — carried from the logo to the store, the posts and every product page.",
    colours: [
      { name: "Navy", hex: fsColours.navy },
      { name: "Gold", hex: fsColours.gold },
      { name: "Cream", hex: fsColours.cream },
      { name: "White", hex: "#FFFFFF" },
    ],
  },

  reveal: {
    eyebrow: "The mark",
    tagline: "Light. Space. Splendor.",
    descriptor: "Premium LED mirrors & glass fittings",
  },

  world: {
    eyebrow: "Product world",
    title: ["More than", "a mirror."],
    accent: "A design object.",
    body: "Eight designs — round, arched, square and rectangular — each shown in the kind of room it belongs in.",
  },

  ecommerce: {
    eyebrow: "E-commerce experience",
    title: ["From", "reflection", "to digital."],
    body: "The identity carried straight into the store: a navy-and-cream storefront, a collection you can filter by shape, product views with light-temperature options, and a checkout built around how the business actually sells.",
    // the site's own "How it works"
    steps: [
      { name: "Browse & wishlist", body: "Explore the mirrors and glass fittings, and save favourites." },
      { name: "Place an order request", body: "Add to basket and submit — no payment upfront." },
      { name: "Confirm & quote", body: "The team confirms availability and sends a final quote." },
      { name: "Payment & delivery", body: "Once approved, secure payment and tracked UK delivery." },
    ],
    screens: [
      { key: "webShop", title: "The collection", caption: "Filter by shape — all, arch, round, rectangular, square." },
      { key: "webProduct", title: "Product view", caption: "Light temperature, what’s included, add to basket." },
      { key: "webFittings", title: "Glass fittings", caption: "The second range: hinges, clamps and handles." },
      { key: "webBasket", title: "Order request", caption: "A three-step checkout — no payment required now." },
    ] as { key: FsAssetKey; title: string; caption: string }[],
  },

  details: {
    eyebrow: "Product detail",
    title: ["Every detail", "has a purpose."],
    // features stated on the site and in the brand's posts
    items: [
      { key: "detailGlow", title: "Backlit glow", caption: "A soft halo of light behind the glass." },
      { key: "detailWarm", title: "Three modes", caption: "Warm, natural and cool — one touch." },
      { key: "detailAntifog", title: "Anti-fog", caption: "A built-in heating element. No more wiping down." },
      { key: "detailSensor", title: "Touch control", caption: "Dimmable, with built-in touch sensors." },
    ] as { key: FsAssetKey; title: string; caption: string }[],
  },

  social: {
    eyebrow: "Social media",
    title: ["The brand", "doesn’t stop", "online."],
    body: "Campaign posts and a catalog reel that carry the same light, the same navy and the same gold as the store.",
    handle: "@framed.splendor",
  },

  impact: {
    eyebrow: "Delivered",
    // as stated on the live site
    stats: [
      { value: "08", label: "Mirror designs" },
      { value: "03", label: "Colour temperatures" },
      { value: "24h", label: "Response to every order request" },
      { value: "£0", label: "Upfront payment" },
    ],
    delivered: [
      "FS monogram",
      "Wordmark",
      "Colour palette",
      "E-commerce website",
      "Product pages",
      "Order-request checkout",
      "Glass fittings range",
      "Social media posts",
      "Catalog reel",
    ],
    statement: "A new UK brand, launched with a complete identity and a store built around how it actually sells.",
  },

  finale: {
    statement: ["More than a mirror.", "A statement."],
  },
};
