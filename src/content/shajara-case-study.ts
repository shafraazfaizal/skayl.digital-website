// Shajara Tea case study — all copy and data for /works/shajara-tea.
// Presentation lives in src/components/sections/works/shajara/.
//
// Every image here is the real work: packaging photography, the print files,
// the posts and the product film. Web-ready versions live in
// public/work/shajara-tea/case/ (the originals in posts/, print/ and reels/
// are left untouched). Optional slots appear automatically once the file exists.

const C = "/work/shajara-tea/case";

export const shAssets = {
  // Film
  film: `${C}/film-ad.mp4`, // product film (from reels/ad.mp4)
  filmPoster: `${C}/film-ad.jpg`,
  promo: "/work/shajara-tea/reels/promo.mp4", // optional second film
  promoPoster: `${C}/promo.jpg`, // optional
  // Identity
  logo: "/work/shajara-tea/logo.svg", // optional vector wordmark (replaces wordmark.png)
  wordmark: `${C}/wordmark.png`, // gold wordmark cut from the hang tag artwork
  // Packaging photography
  packLid: `${C}/pack-lid.jpg`,
  packJourney: `${C}/pack-journey.jpg`,
  packHighlands: `${C}/pack-highlands.png`,
  packStack: `${C}/pack-stack.jpg`,
  // Packaging details (crops of the photography)
  detailMark: `${C}/detail-mark.jpg`,
  detailSince: `${C}/detail-since.jpg`,
  detailPattern: `${C}/detail-pattern.jpg`,
  detailStory: `${C}/detail-story.jpg`,
  detailLabel: `${C}/detail-label.jpg`,
  // Print files
  labelFlat: `${C}/label-flat.jpg`, // canister wrap artwork (printed contact details blurred)
  patternLeaf: `${C}/pattern-leaf.jpg`,
  landscape: `${C}/landscape.jpg`, // the highland band from the wrap
  tagFront: `${C}/tag-front.png`,
  tagBack: `${C}/tag-back.png`,
  typeHeadline: `${C}/type-headline.png`,
  typeCaps: `${C}/type-caps.png`,
  illustrationPour: `${C}/illustration-pour.png`,
  // Product photography
  photoPouch: `${C}/photo-pouch.jpg`,
  photoPour: `${C}/photo-pour.jpg`,
  // Social
  post1: "/work/shajara-tea/posts/1.jpg",
  post2: "/work/shajara-tea/posts/2.jpg",
  post3: "/work/shajara-tea/posts/3.jpg",
  post4: "/work/shajara-tea/posts/4.jpg",
  postLaunch: `${C}/post-launch.jpg`,
  postOrder: `${C}/post-order.jpg`,
  postDelivery: `${C}/post-delivery.jpg`,
  postLabel: `${C}/post-label.jpg`,
} as const;

export type ShAssetKey = keyof typeof shAssets;
export type ShAssets = Record<ShAssetKey, string | null>;

// Colours sampled from the print files.
export const shColours = {
  green: "#254F3A",
  deep: "#12281D", // darker shade of the brand green, for page panels
  leaf: "#517732",
  gold: "#C5AF46",
  cream: "#F4EFD1",
  clay: "#8C756A",
};

export const sh = {
  instagramUrl: "https://www.instagram.com/shajara.ceylon/",
  instagramHandle: "@shajara.ceylon",

  hero: {
    title: "Shajara Tea",
    statement: "Bringing the richness of Sri Lankan tea to a new market.",
    disciplines: ["Brand", "Packaging", "Content"],
    years: "2023 — 2024",
  },

  meta: [
    { label: "Client", value: ["Shajara Tea"] },
    { label: "Industry", value: ["F&B / Premium Ceylon Tea"] },
    { label: "Role", value: ["Brand Designer & Creative Director"] },
    { label: "Year", value: ["2023–2024"] },
    { label: "Services", value: ["Brand Identity", "Packaging", "Art Direction", "Social Media", "Content Creation"] },
  ],

  intro: {
    statement: "A Sri Lankan tea brand with an Arabic soul — designed for a new generation.",
    body: "Shajara is Ceylon black tea made for the Middle East. The identity had to feel Arabic and elegant, while leaving no doubt about where the tea is grown.",
  },

  challenge: {
    eyebrow: "The challenge",
    headline: "Rooted in heritage. Built for a new market.",
    body: [
      "Shajara needed to carry its Sri Lankan origin while feeling relevant, elegant and premium to a Middle Eastern audience.",
      "The brief was never to make the brand simply look Arabic. It was to find one visual language where three things could sit together naturally.",
    ],
    equation: ["Ceylon", "Middle East", "Modern luxury"],
    caption: "The Ceylon highlands, printed around every canister.",
  },

  transformation: {
    eyebrow: "The transformation",
    headline: "From a single leaf to a whole world.",
    stages: ["Research", "Strategy", "Brand identity", "Packaging", "Content", "Social"],
    climax: "A complete brand experience",
  },

  brand: {
    eyebrow: "01 / Brand identity",
    headline: "An identity inspired by nature, culture and craftsmanship.",
    body: "A calligraphic wordmark: Latin letters drawn with the rhythm of Arabic script, set in gold on Shajara green and warm cream.",
  },

  logoStory: {
    eyebrow: "The name",
    arabic: "شجرة",
    meaning: "Shajara means “tree”.",
    body: "A tree grows from a root, the way Shajara grows from Sri Lanka. The name holds the whole idea: something natural, something that lasts, something with a place it comes from.",
    chain: ["Tree", "Growth", "Nature", "Tea", "Heritage"],
    // The mark's dot is drawn as the island of Sri Lanka.
    detail: "Look above the j. The dot is the island of Sri Lanka — the origin, written into the name.",
  },

  system: {
    eyebrow: "Colour & typography",
    headline: "A system drawn from the leaf, the land and the cup.",
    colours: [
      { name: "Shajara Green", hex: shColours.green, role: "Lids, tags, headlines" },
      { name: "Leaf", hex: shColours.leaf, role: "The tea-leaf pattern" },
      { name: "Gold", hex: shColours.gold, role: "Wordmark and bands" },
      { name: "Cream", hex: shColours.cream, role: "The ground" },
      { name: "Clay", hex: shColours.clay, role: "The arch frame" },
    ],
    // Add the typeface names used on the packaging to show them here, e.g.
    // { role: "Headlines", family: "Name" }. Left empty rather than guessed.
    typefaces: [] as { role: string; family: string }[],
    typeInUse: [
      { key: "typeHeadline", caption: "Headline — the hang tag" },
      { key: "typeCaps", caption: "Descriptor — spaced capitals" },
    ] as { key: ShAssetKey; caption: string }[],
    language: [
      { key: "patternLeaf", caption: "A hand-drawn tea-leaf pattern" },
      { key: "illustrationPour", caption: "Line illustration — the pour" },
      { key: "landscape", caption: "Highland forest and tea terraces" },
    ] as { key: ShAssetKey; caption: string }[],
  },

  packaging: {
    eyebrow: "02 / Packaging design",
    headline: "Every detail, a reflection of quality.",
    body: "Paper canisters wrapped in a hand-drawn leaf pattern, banded in gold and capped in deep green. The label opens like an arch onto the Ceylon highlands, with Shajara’s own tea story on the back.",
    wrapCaption: "The full canister wrap — ingredients, the arch, and “Our Tea Story”.",
  },

  details: {
    eyebrow: "Packaging details",
    headline: "Made to be held.",
    items: [
      { key: "detailLabel", title: "The label", caption: "The arch, the sun and the highlands." },
      { key: "detailSince", title: "The rim", caption: "Authentic Ceylon Tea — since 2024." },
      { key: "detailPattern", title: "The wrap", caption: "Leaf pattern and gold bands." },
      { key: "detailStory", title: "The story", caption: "The tea journey, printed on the label." },
    ] as { key: ShAssetKey; title: string; caption: string }[],
    tags: "Hang tags — front and back.",
  },

  content: {
    eyebrow: "03 / Content creation",
    headline: "Visuals that tell a bigger story.",
    body: "The photography places the product inside the ritual it belongs to: the teapot, the cup, the table, the pour. Every frame carries the same green, gold and cream.",
  },

  film: {
    eyebrow: "The film",
    headline: "Quiet. Slow. Tactile.",
    body: "A product film lit like a still life. The lid, the rim, the story on the label, then the canister standing in the light.",
    label: "Shajara Tea product film",
    promoLabel: "Shajara Tea promotional film",
  },

  social: {
    eyebrow: "Social media",
    headline: "A cohesive presence across the feed.",
    body: "Launch announcements, product posts and lighter moments for tea lovers — all speaking the same visual language.",
    posts: [
      { key: "postLaunch", alt: "Launch post: The wait is over — launching our first taste of Shajara" },
      { key: "post1", alt: "Illustrated post: I work to buy tea, I buy tea so that I can work" },
      { key: "post3", alt: "Illustrated post: inner peace unlocked" },
      { key: "postOrder", alt: "Post: Get your tea today" },
      { key: "post2", alt: "Illustrated post: just know, you are loved" },
      { key: "postDelivery", alt: "Post: From Sri Lanka to your door" },
      { key: "post4", alt: "Illustrated post: how I solve problems" },
      { key: "postLabel", alt: "Post: the Shajara label beside a cup of tea" },
    ] as { key: ShAssetKey; alt: string }[],
  },

  world: {
    eyebrow: "The brand world",
    headline: "From identity to experience.",
    body: "Not a logo with packaging attached. One world — from the lid to the label, the tag, the table and the feed.",
  },

  impact: {
    eyebrow: "Delivered",
    stats: [
      { value: "01", label: "Brand identity" },
      { value: "01", label: "Packaging system" },
      { value: "Social", label: "Content" },
      { value: "Reels", label: "& film" },
    ],
    delivered: [
      "Arabic-inspired logomark",
      "Wordmark",
      "Packaging system",
      "Tea labels",
      "Tea boxes",
      "Inserts",
      "Product photography art direction",
      "Social media posts",
      "Reels",
      "Voiceover-based content",
      "Ambient sound content",
    ],
    statement: "From the identity to the shelf, every touchpoint was designed to belong to the same world.",
  },

  finale: {
    statement: ["From a forgotten gem", "to a name that travels."],
  },
};
