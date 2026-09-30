// About page content. Presentation lives in src/components/sections/about/.
// Facts only: no invented clients, results, awards or numbers.

export const aboutHero = {
  eyebrow: "We are SKAYL",
  title: ["A creative", "house built", "on principle."],
  lines: ["Independent creative studio.", "Brand / Web / Content.", "UK & Sri Lanka — working globally."],
  est: "Est. 2025",
  // The hero wall: real work at its own proportions, in two columns that
  // drift in opposite directions. w/h are the files' pixel sizes.
  wall: [
    [
      { src: "/work/jma-uk/hero.png", w: 1122, h: 1402, title: "JMA UK", type: "Website" },
      { src: "/work/shajara-tea/case/post-launch.jpg", w: 1080, h: 1350, title: "Shajara Tea", type: "Launch post" },
      { src: "/work/autovive/posts/4.png", w: 3375, h: 3375, title: "AutoVive", type: "Social" },
      { src: "/work/shajara-tea/case/pack-stack.jpg", w: 2000, h: 2667, title: "Shajara Tea", type: "Packaging" },
      { src: "/work/autovive/pitch-deck/1.png", w: 1920, h: 1080, title: "AutoVive", type: "Pitch deck" },
      { src: "/work/shajara-tea/posts/1.jpg", w: 1080, h: 1350, title: "Shajara Tea", type: "Social" },
    ],
    [
      { src: "/work/shajara-tea/case/film-ad.mp4", poster: "/work/shajara-tea/case/film-ad.jpg", w: 1080, h: 1920, title: "Shajara Tea", type: "Reel" },
      { src: "/work/framed-splendor/hero.png", w: 1122, h: 1402, title: "Framed Splendor", type: "E-commerce" },
      { src: "/work/autovive/posts/6.png", w: 3375, h: 3375, title: "AutoVive", type: "Social" },
      { src: "/work/shajara-tea/case/photo-pouch.jpg", w: 1600, h: 2133, title: "Shajara Tea", type: "Photography" },
      { src: "/work/shajara-tea/posts/3.jpg", w: 1080, h: 1350, title: "Shajara Tea", type: "Social" },
      { src: "/work/autovive/posts/2.png", w: 3375, h: 3375, title: "AutoVive", type: "Social" },
    ],
  ] as { src: string; poster?: string; w: number; h: number; title: string; type: string }[][],
};

export const impact = {
  eyebrow: "What we believe",
  lead: ["We don’t make", "noise."],
  punch: ["We make", "impact."],
  body: "We’re not here to follow trends. We build brands, websites and content that do a job — and keep doing it long after launch.",
  // The pinned index: each item swaps in its own line as you scroll.
  index: [
    { name: "Impact", line: "Work judged by what it does, not by how loud it is." },
    { name: "Brands", line: "Identities built as systems — from the logo to the last touchpoint." },
    { name: "Experiences", line: "Websites designed around how people actually use them." },
    { name: "Products", line: "Platforms your team can run without calling a developer." },
    { name: "People", line: "You work directly with the two people doing the work." },
  ],
};

export const principles = [
  {
    name: "Excellence",
    body: "Creativity, technical skill and strategic thinking in every piece of work. Good enough is never good enough.",
  },
  {
    name: "Integrity",
    body: "Honest communication and full transparency. We tell clients what they need to hear — not just what they want to hear.",
  },
  {
    name: "Creativity with Purpose",
    body: "Every design, interaction and piece of content should serve a purpose. Beauty that works.",
  },
  {
    name: "Innovation",
    body: "Modern technology and continuous learning. We build for where your business is going — not just where it is today.",
  },
  {
    name: "Client Partnership",
    body: "Not just a finished project — a contribution to the long-term growth of the businesses we work with.",
  },
];

export const creativePrinciple = {
  eyebrow: "Our creative principle",
  title: ["Create", "with", "intent."],
  lead: "No music. In any form of content.",
  paragraphs: [
    "Our work is guided by Islamic values, and one of them is simple: we don’t use music. Not in reels, not in brand films, not in social cuts — for any client, on any project.",
    "For Muslim businesses, startups and creators, that’s one less thing to worry about. You no longer have to choose between an agency that shares your values and one that can grow your brand.",
    "Many people assume the right track is what makes content travel. We don’t. Reach comes from a strong idea, an opening that earns attention, and a story worth finishing — so that’s where we put the craft.",
  ],
  craft: [
    "Storytelling",
    "Cinematic visuals",
    "Professional voiceover",
    "Natural & ambient sound",
    "Sound design",
    "Pacing & editing",
    "Platform-native formats",
  ],
  promise: "Our promise is simple: we won’t, and we don’t. And we’ll put everything into getting your brand the reach it deserves.",
  note: "We work with businesses from every background. The principle doesn’t change who we work with — it defines how we create.",
};

export const story = {
  eyebrow: "Our story",
  title: "Started in 2025. Built between two homes.",
  paragraphs: [
    "SKAYL began in 2025 with two founders and one frustration: good businesses held back by work that looked fine but didn’t move them forward. One of us builds, the other creates — so brand, web and content come from one team, held to one standard.",
    "We’re based in the UK with roots in Sri Lanka. Working across both lets us serve clients in two markets, keep projects moving across time zones, and bring the same care to each.",
  ],
  name: {
    label: "The name",
    word: "SKAYL",
    say: "/skeɪl/ — said like “scale”",
    meaning: "Named for what every client wants from the work: room to grow.",
  },
};

export const approach = {
  eyebrow: "Our approach",
  title: ["From idea", "to impact."],
  body: "A focused, collaborative process — the same five steps on every project.",
};

export const founders = [
  {
    name: "Shafraaz Faizal",
    first: "Shafraaz",
    role: "Co-Founder — Development & Design",
    portrait: "/about/shafraaz.jpg", // appears automatically once added
    bio: "Full-stack developer and digital designer focused on fast, functional web experiences. Works with startups, charities and businesses — from SaaS platforms to e-commerce stores. Based in the UK.",
    timeline: [
      { title: "Co-Founder — SKAYL", years: "2025–Now" },
      { title: "Technology Developer — Barclays", years: "2026–Now" },
      { title: "BSc AI & Robotics — University of Hull", years: "2021–2025" },
    ],
  },
  {
    name: "Shiham Nasry",
    first: "Shiham",
    role: "Co-Founder — Creative & Production",
    portrait: "/about/shiham.jpg", // appears automatically once added
    bio: "Visual creative specialising in graphic design, videography and photography. Crafts brand identities, social content and reels built to the same standard as the brand they represent.",
    timeline: [
      { title: "Co-Founder & Creative Director — SKAYL", years: "2025–Now" },
      { title: "Brand Designer — Shajara Tea", years: "2025" },
      { title: "Graphic Designer — AutoVive", years: "2025" },
    ],
  },
];

export const foundersIntro = {
  eyebrow: "The people",
  title: ["Behind", "the work."],
  body: "Two founders, one standard. Different skills, same vision — and you work with us directly, from the first call to launch.",
};

// "What we make" — mirrors the services in src/content/services.ts, each with
// a real project image.
export const capabilities = {
  eyebrow: "What we make",
  title: "Brands, websites and content — made to work together.",
  items: [
    { title: "Branding & Design", note: "Identity systems, logos, packaging", image: "/work/shajara-tea/case/pack-lid.jpg", credit: "Shajara Tea" },
    { title: "Web Development", note: "Websites, platforms, e-commerce", image: "/work/jma-uk/hero.png", credit: "JMA UK" },
    { title: "Content & Media", note: "Photography, film, social — music-free", image: "/work/shajara-tea/case/photo-pouch.jpg", credit: "Shajara Tea" },
    { title: "Event Management", note: "Direction, coverage, post-event content", image: "/images/services/event-management.png", credit: "" },
  ],
};

export const selectedWork = {
  eyebrow: "Selected work",
  title: ["A few things", "we’ve built."],
  // slug → the strongest real image for each project
  images: {
    "jma-uk": "/work/jma-uk/hero.png",
    "shajara-tea": "/work/shajara-tea/case/pack-stack.jpg",
    "framed-splendor": "/work/framed-splendor/hero.png",
    autovive: "/work/autovive/pitch-deck/1.png",
  } as Record<string, string>,
};

export const manifesto = {
  title: ["Good work", "should feel", "inevitable."],
  body: ["Not because it follows a formula.", "Because every decision has a reason."],
};

export const aboutCta = {
  eyebrow: "Let’s talk",
  title: ["Let’s make", "something."],
  body: ["Have a project in mind?", "We’d love to hear from you."],
  email: "hello@skayl.digital",
};

// The daily toolset — shown as a quiet strip, not a feature.
export type Tool = { name: string; category: string };

export const toolsStack: Tool[] = [
  { name: "Next.js", category: "Development" },
  { name: "Figma", category: "Design" },
  { name: "Framer", category: "Web & Prototyping" },
  { name: "Supabase", category: "Backend" },
  { name: "Resend", category: "Email" },
  { name: "CapCut Pro", category: "Video" },
  { name: "Notion", category: "Productivity" },
];
