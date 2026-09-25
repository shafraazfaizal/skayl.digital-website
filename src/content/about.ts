// About page content: principles, creative principle, founders and tools.

export const principles = [
  {
    name: "Excellence",
    body: "We pursue excellence in every aspect of our work — combining creativity, technical skill, and strategic thinking to deliver outcomes that exceed expectations. Good enough is never good enough.",
  },
  {
    name: "Integrity",
    body: "We believe in honest communication, full transparency, and long-term relationships built on trust. We tell clients what they need to hear — not just what they want to hear.",
  },
  {
    name: "Creativity with Purpose",
    body: "Every design, interaction, and piece of content should serve a meaningful purpose. We create experiences that are visually compelling and strategically sound — beauty that works.",
  },
  {
    name: "Innovation",
    body: "We embrace modern technologies, forward-thinking design, and continuous learning. We build for where your business is going — not just where it is today.",
  },
  {
    name: "Client Partnership",
    body: "We view every client as a long-term partner. Our goal is not simply to complete projects — it is to contribute to the sustained growth and success of the businesses we work with.",
  },
];

export const creativePrinciple = {
  eyebrow: "What Makes Us Different",
  title: "Our Creative Principle",
  paragraphs: [
    "At SKAYL, our work is guided by Islamic values that shape how we approach creativity and content production. One of these principles is our commitment to producing content without the use of music. This decision reflects our values and remains consistent across every project we undertake.",
    "SKAYL proudly serves businesses, organisations, and individuals from all backgrounds, industries, and communities. Our commitment to this principle does not change who we work with — it defines how we create.",
    "Rather than relying on music, we focus on powerful storytelling, cinematic visuals, professional voiceovers, authentic ambient sound, carefully designed sound effects, thoughtful pacing, and purposeful editing to create engaging content that connects without compromise.",
    "These principles are not limitations — they are part of what makes SKAYL distinctive and authentic.",
  ],
};

export const founders = [
  {
    role: "Co-Founder — Dev & Design",
    bio: "Full-stack developer and digital designer focused on building fast, functional web experiences. He works with startups, charities, and businesses to build standout brands and seamless digital products — from SaaS platforms to e-commerce stores. Based in the UK.",
    timeline: [
      { title: "Co-Founder at SKAYL", years: "2025–Now" },
      {
        title: "BSc AI & Robotics — University of Hull",
        years: "2021–2025",
      },
      { title: "Technology Developer — Barclays", years: "2025–Now" },
    ],
  },
  {
    role: "Co-Founder — Creative & Production",
    bio: "Visual creative specialising in graphic design, videography, and photography. Crafts brand identities, social content, and reels that convert — built to the same standard as the brand they represent.",
    timeline: [
      { title: "Graphic Designer — AutoVive", years: "2023–2024" },
      { title: "Brand Designer — Shajara Tea", years: "2023–2024" },
      { title: "Social Media Content — ZeroExcuses Gym", years: "Now" },
      { title: "Creative Director — SKAYL", years: "2024–Now" },
    ],
  },
];

// The daily toolset — shown on the About page.
export type Tool = { name: string; category: string; description: string };

export const toolsStack: Tool[] = [
  { name: "Next.js", category: "Development", description: "The foundation of every website we build. Fast, scalable, and production-ready by default." },
  { name: "Figma", category: "Design", description: "Where every visual idea starts — brand systems, UI flows, and prototypes." },
  { name: "Framer", category: "Web & Prototyping", description: "High-fidelity prototypes and visually rich websites that go beyond templates." },
  { name: "Supabase", category: "Backend", description: "Database, auth, and storage. Open-source and built for speed." },
  { name: "CapCut Pro", category: "Video Editing", description: "Our primary editing suite for reels, brand videos, and social content — cinematic output without music." },
  { name: "Notion", category: "Productivity", description: "Every project brief, content plan, and delivery timeline lives here — transparent and organised." },
  { name: "Stripe", category: "Payments", description: "Integrated into every e-commerce and donation platform we build." },
  { name: "Resend", category: "Email", description: "Transactional email infrastructure for every web product we ship." },
];
