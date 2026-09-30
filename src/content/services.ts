// Services offered and the marquee ticker words.

export const tickerWords = [
  "Brand Design",
  "Web Development",
  "Photography",
  "Videography",
  "Content Creation",
  "Logo Design",
  "E-commerce",
  "SaaS Platforms",
  "Social Media Design",
];

export type Service = {
  title: string;
  tags: string[];
  description: string;
  price: string;
  timeline: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Web Development",
    tags: ["Business Websites", "SaaS Platforms", "E-commerce", "Web Applications"],
    description:
      "From landing pages to full SaaS platforms — engineered for performance and built to grow. Every build is custom, mobile-first, and SEO-ready from the ground up. No templates, no shortcuts.",
    price: "Contact for pricing",
    timeline: "2–8 weeks depending on scope",
    image: "/images/services/web-development.png",
  },
  {
    title: "Branding & Design",
    tags: ["Brand Identity", "Logo & Wordmark", "Social Media Design", "Marketing Assets"],
    description:
      "Visual identity systems that hold together across every touchpoint — from logo to UI. We don't design logos in isolation. We build the full system your brand needs to stay consistent as it grows.",
    price: "Contact for pricing",
    timeline: "2–4 weeks depending on scope",
    image: "/images/services/branding-design.png",
  },
  {
    title: "Content & Media",
    tags: ["Product Photography", "Videography", "Video Editing", "Social Content"],
    description:
      "Photography, video, and content built to the same standard as the brand it represents. Our content is storytelling-led and visually purposeful — produced without music, using cinematic visuals, professional voiceovers, authentic ambient sound, and thoughtful editing.",
    price: "Contact for pricing",
    timeline: "By project",
    image: "/images/services/content-media.png",
  },
  {
    title: "Event Management",
    tags: ["Planning & Direction", "Photography & Video Coverage", "Post-Event Content"],
    description:
      "A premium add-on for clients who want full creative direction on the day — planning, on-the-day coverage with photography and video, and post-event content delivered and ready to publish.",
    price: "Premium Add-On",
    timeline: "By request",
    image: "/images/services/event-management.png",
  },
];

// ── Services page ─────────────────────────────────────────────────────────
// Facts only: real projects, real deliverables, no prices (every project is
// quoted to its scope), no invented results.

export const servicesHero = {
  eyebrow: "Services",
  title: ["Every discipline.", "One team."],
  body: "Brand, web and content — led by one team, with one point of contact. You work directly with us, so everything we make speaks the same language.",
  // The hero's rotating stage: one real piece of work per discipline.
  stage: [
    { id: "web-development", discipline: "Web Development", project: "JMA UK", src: "/work/jma-uk/hero.png", w: 1122, h: 1402, position: "50% 40%" },
    { id: "branding-design", discipline: "Branding & Design", project: "Shajara Tea", src: "/work/shajara-tea/case/pack-lid.jpg", w: 2000, h: 2667, position: "50% 45%" },
    { id: "content-media", discipline: "Content & Media", project: "Shajara Tea", src: "/work/shajara-tea/case/photo-pour.jpg", w: 1356, h: 1808, position: "50% 40%" },
    { id: "web-development", discipline: "E-commerce", project: "Framed Splendor", src: "/work/framed-splendor/case/interior-round.jpg", w: 2000, h: 1426, position: "45% 50%" },
  ],
};

export const servicesIntro = {
  statement: "One team, from the first idea to launch day — and after it.",
  facts: [
    { label: "Direct", value: "One team and one point of contact, from brief to launch." },
    { label: "Quote-only", value: "Every project is priced to its scope, after a short call." },
    { label: "UK & Sri Lanka", value: "Working across both markets, and beyond." },
  ],
};

export type ServiceChapter = {
  id: string;
  no: string;
  title: string;
  line: string;
  body: string;
  includes: string[];
  timeline: string;
  bestFor: string;
  projects: { title: string; href: string; note: string }[];
  note?: { title: string; body: string; href: string; cta: string };
};

export const serviceChapters: ServiceChapter[] = [
  {
    id: "web-development",
    no: "01",
    title: "Web Development",
    line: "Websites and platforms your team can actually run.",
    body: "From focused business sites to full platforms with donations, dashboards and e-commerce. Every build is custom, mobile-first and SEO-ready — no templates — and handed over so you can manage it without calling a developer.",
    includes: ["Business websites", "E-commerce stores", "Web apps & SaaS platforms", "Admin dashboards & CMS", "Donations & payments", "Hosting, domains & email set-up"],
    timeline: "2–8 weeks, depending on scope",
    bestFor: "Businesses, charities and startups that need more than a brochure.",
    projects: [
      { title: "JMA UK", href: "/works/jma-uk", note: "Website, donations & admin" },
      { title: "Framed Splendor", href: "/works/framed-splendor", note: "E-commerce store" },
    ],
  },
  {
    id: "branding-design",
    no: "02",
    title: "Branding & Design",
    line: "Identities built as systems, not just logos.",
    body: "We start with what the brand needs to say, then build everything it needs to say it consistently — the mark, the type, the colours, the packaging and the templates your team will use every day.",
    includes: ["Brand strategy & positioning", "Logo & wordmark", "Visual identity & guidelines", "Packaging & print", "Social media templates", "Pitch decks & marketing assets"],
    timeline: "2–4 weeks, depending on scope",
    bestFor: "New brands, and brands that have outgrown how they look.",
    projects: [
      { title: "Shajara Tea", href: "/works/shajara-tea", note: "Identity & packaging" },
      { title: "AutoVive", href: "/works/autovive", note: "Identity & pitch deck" },
      { title: "Framed Splendor", href: "/works/framed-splendor", note: "Identity" },
    ],
  },
  {
    id: "content-media",
    no: "03",
    title: "Content & Media",
    line: "Photography, film and social — made to the brand’s standard.",
    body: "Product photography, brand films, reels and social content, planned around what the brand needs to say. Story-led and visually purposeful — carried by cinematic visuals, voiceover, natural sound and careful editing.",
    includes: ["Product photography", "Brand films & reels", "Video editing", "Social content & campaigns", "Content planning"],
    timeline: "Planned per project or as an ongoing retainer",
    bestFor: "Brands that want content that looks like it belongs to them.",
    projects: [{ title: "Shajara Tea", href: "/works/shajara-tea", note: "Photography, reels & social" }],
    note: {
      title: "No music. In any form of content.",
      body: "It’s one of our values: we don’t use music — not in reels, films or social cuts, for any client. You never have to worry about it; the work is built to stand without it.",
      href: "/about",
      cta: "Why we work this way",
    },
  },
];

export const eventAddOn = {
  eyebrow: "Premium add-on",
  title: "Event Management",
  body: "For clients who want the same team on the day: planning and direction, photography and video coverage, and post-event content delivered ready to publish.",
  includes: ["Planning & direction", "Photography & video coverage", "Post-event content"],
  note: "Available alongside a brand, web or content project.",
};

export const commitments = {
  eyebrow: "What you can count on",
  title: ["No surprises.", "No disappearing.", "No half-finished work."],
  items: [
    { title: "A clear quote before anything starts", body: "Scope, timeline and cost agreed upfront. No hidden extras, no invoice you didn’t see coming." },
    { title: "Honest from the first call", body: "If we’re not the right fit, we’ll tell you before you pay a deposit — not after." },
    { title: "You deal directly with us", body: "No account managers, no middlemen. You talk directly to the two of us leading your project." },
    { title: "We finish what we start", body: "Every project is seen through to launch, handed over properly, and supported after it." },
    { title: "Revisions until it’s right", body: "We don’t cap revisions artificially. Most projects land in two or three rounds." },
    { title: "You’ll never chase us", body: "Every enquiry gets a reply within 24 hours, and you’ll know where your project stands at every stage." },
  ],
};

export const servicesFaqs = [
  {
    q: "Why don’t you list prices?",
    a: "Because no two projects are the same. A price list would either overcharge you or leave things out. After a short, no-obligation call we send a clear quote for exactly what you need — scope, timeline and cost, upfront.",
  },
  {
    q: "Who will I actually be working with?",
    a: "Us — directly. You talk to the two founders leading your project, from the first call to launch. One line of communication, and we’re accountable for everything that’s delivered.",
  },
  {
    q: "Can I hire you for just one service?",
    a: "Yes. Many projects start with one thing — a website, a brand or a set of content. Because it’s the same team, it’s easy to add more later without starting from scratch.",
  },
  {
    q: "How long does a project take?",
    a: "A focused landing page or brand identity is typically 2–3 weeks. A full website with branding and content is 4–8 weeks. Larger builds are scoped individually. You’ll get a realistic timeline before we start — not a number designed to win the brief.",
  },
  {
    q: "How many revisions are included?",
    a: "We don't cap revisions artificially. We work with you until the output is right. In practice, most projects land in 2–3 rounds.",
  },
  {
    q: "What happens after launch?",
    a: "We hand everything over properly so your team can run it, and we stay available for support, updates and new content as you grow. No radio silence.",
  },
  {
    q: "Are there any refunds?",
    a: "We don't offer refunds on completed work, but we offer honesty upfront. If we don't think we're the right fit, we'll tell you before we start — not after. That's what the discovery call is for.",
  },
  {
    q: "Do you work with clients outside the UK?",
    a: "Yes. We're based in the UK with an active presence in Sri Lanka, and we work with clients across both markets and beyond. Budgets can be quoted in GBP or LKR.",
  },
];
