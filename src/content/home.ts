// Homepage content: process, why-us, the new homepage sections and FAQs.

export const processSteps = [
  { no: "01", name: "Discover", body: "We learn your business, your audience, and what success actually looks like — before touching any tools." },
  { no: "02", name: "Design", body: "Creative direction locked in first. Every concept presented with clear reasoning so every decision has a purpose behind it." },
  { no: "03", name: "Build", body: "Development, content, and brand run in parallel — not sequentially. Faster output, tighter consistency, no waiting on handoffs." },
  { no: "04", name: "Launch", body: "Shipped with care. Performance, accessibility, and SEO handled — with a smooth handover your team can actually run." },
  { no: "05", name: "Grow", body: "We stay embedded after launch. Ongoing support, content, and iteration as you scale — no radio silence, no surprises." },
];

export const whyUs = [
  { title: "Direct collaboration. Every time.", body: "You work directly with us — the people leading your project — not an account manager passing messages along. One line of communication, from the first call to launch." },
  { title: "One point of contact. One accountable team.", body: "You talk directly to the people doing the work. No account-manager layers, no lost context, no finger-pointing." },
  { title: "Built for your brand — not from a template.", body: "Every project is made to measure. We take time to understand your business before we open Figma or write a line of code." },
  { title: "Honest before we start — and after.", body: "If we're not the right fit, we'll tell you before we start — not after you've paid a deposit. Every project begins with a discovery call precisely for this reason." },
  { title: "UK quality. Global reach.", body: "Based in the UK with an active presence in Sri Lanka. We work with clients across both markets and beyond — time zones have never been an obstacle." },
];

// ── Homepage (new) ─────────────────────────────────────────────────────────
// Facts only. No invented clients, quotes, results or numbers.

export const homeHero = {
  eyebrow: "SKAYL — Creative studio",
  muted: ["We don’t work", "for you."],
  strong: ["We work", "with you."],
  lines: ["One embedded team for brand, web and content.", "Strategy / Design / Development / Content.", "UK & Sri Lanka — working globally."],
  // The hero wall: one column of real work drifting upwards. Files that don't
  // exist are skipped, and each shows at its true proportions — so the JMA
  // screenshots from the case study appear here automatically.
  wall: [
    { src: "/work/jma-uk/page-zakat.png", title: "JMA UK", type: "Zakat page" },
    { src: "/work/jma-uk/hero.png", title: "JMA UK", type: "Website" },
    { src: "/work/shajara-tea/case/label-flat.jpg", title: "Shajara Tea", type: "Packaging" },
    { src: "/work/jma-uk/admin.png", title: "JMA UK", type: "Admin dashboard" },
    { src: "/work/autovive/pitch-deck/1.png", title: "AutoVive", type: "Pitch deck" },
    { src: "/work/jma-uk/donate.png", title: "JMA UK", type: "Donations" },
    { src: "/work/framed-splendor/hero.png", title: "Framed Splendor", type: "E-commerce" },
    { src: "/work/jma-uk/page-campaigns.png", title: "JMA UK", type: "Campaigns" },
    { src: "/work/autovive/pitch-deck/4.png", title: "AutoVive", type: "Pitch deck" },
    { src: "/work/jma-uk/content-gallery.png", title: "JMA UK", type: "Gallery" },
    { src: "/work/shajara-tea/case/pack-stack.jpg", title: "Shajara Tea", type: "Packaging" },
    { src: "/work/jma-uk/content-events.png", title: "JMA UK", type: "Events" },
  ],
};

export const marquee = {
  eyebrow: "What we do",
  rows: [
    ["Strategy", "Design", "Development", "Content"],
    ["Brand", "Web", "Film", "Photography", "Events"],
  ],
};

export const selectedWork = {
  eyebrow: "Selected work",
  title: ["What", "we’ve", "built."],
  body: "Brands, platforms and content — each one built from scratch, around what the client actually needed.",
  flagship: {
    slug: "jma-uk",
    label: "Flagship",
    lede: "A charity with over two decades of work and no digital home. We built its entire platform — website, giving, publishing and infrastructure — at no cost to JMA.",
    facts: [
      { value: "15+", label: "Pages" },
      { value: "12", label: "Admin modules" },
      { value: "05", label: "Giving categories" },
      { value: "£0", label: "Cost to JMA" },
    ],
    // real screens from the case study; each appears only if the file exists
    screens: {
      laptop: "/work/jma-uk/hero.png",
      admin: "/work/jma-uk/admin.png",
      donate: "/work/jma-uk/donate.png",
      phone: "/work/jma-uk/mobile-1.png",
    },
  },
  more: [
    {
      slug: "shajara-tea",
      line: "A Sri Lankan tea brand with an Arabic soul, designed for the Middle East.",
      image: "/images/work-cards/shajara-tea.png",
      position: "50% 55%",
      tone: "#12281D",
    },
    {
      slug: "framed-splendor",
      line: "A premium LED mirror brand — website, identity and social, built from zero.",
      image: "/work/framed-splendor/hero.png",
      position: "50% 50%",
      tone: "#0B1F3A",
    },
    {
      slug: "autovive",
      line: "A 360° brand for Sri Lanka’s first fully digital mobile car wash.",
      image: "/images/work-cards/autovive.png",
      position: "70% 55%",
      tone: "#06111A",
    },
  ],
};

export const disciplines = {
  eyebrow: "Our approach",
  title: ["Every discipline.", "One team."],
  body: "Different skills, one creative direction. You deal directly with us, so every output shares the same DNA.",
  // one real project image per service (same order as src/content/services.ts)
  images: [
    { src: "/work/jma-uk/hero.png", credit: "JMA UK", position: "30% 50%" },
    { src: "/work/shajara-tea/case/pack-lid.jpg", credit: "Shajara Tea", position: "50% 50%" },
    { src: "/work/shajara-tea/case/photo-pouch.jpg", credit: "Shajara Tea", position: "50% 55%" },
    { src: "/images/services/event-management.png", credit: "", position: "50% 50%" },
  ],
};

export const processIntro = {
  eyebrow: "Our process",
  title: ["You’ll always know", "where your project stands."],
  body: "Clear milestones, honest updates and one point of contact — from the first call to launch, and after.",
};

export const philosophy = {
  eyebrow: "The SKAYL philosophy",
  title: ["Not your", "vendor."],
  punch: "Your team.",
};

export const proof = {
  eyebrow: "Proof",
  title: "The work speaks first.",
  // Shown when public/work/jma-uk/testimonial.mp4 exists.
  video: {
    src: "/work/jma-uk/testimonial.mp4",
    poster: "/work/jma-uk/testimonial-poster.jpg",
    captions: "/work/jma-uk/testimonial.vtt",
    credit: "Secretary",
    organisation: "Jaffna Muslim Association UK",
  },
  feature: {
    statement: "Built at no cost to JMA.",
    note: "Because some causes are worth more than any invoice.",
    image: "/work/jma-uk/hero.png",
    href: "/works/jma-uk",
  },
  facts: [
    { value: "04", label: "Brands built" },
    { value: "01", label: "Point of contact" },
    { value: "02", label: "Countries — UK & Sri Lanka" },
  ],
};

export const standard = {
  eyebrow: "The SKAYL standard",
  title: ["Every project", "runs on the", "same principles."],
};

export const homeCta = {
  eyebrow: "Let’s talk",
  title: ["Have something", "in mind?"],
  body: "An idea, a brand that needs direction, or a platform that needs building — tell us what you need and you’ll get a clear, honest quote. No obligation, no pitch deck.",
  email: "hello@skayl.digital",
};

export const faqs = [
  {
    q: "Why choose SKAYL instead of a full-time designer?",
    a: "A full-time designer gives you one skill set. SKAYL gives you a complete team — development, design, branding, photography, and video — without the overhead of multiple salaries, contracts, or coordination. You get more capability, more flexibility, and one point of contact.",
  },
  {
    q: "How long does a project take?",
    a: "A focused landing page or brand identity is typically 2–3 weeks. A full website with branding and content is 4–8 weeks. Larger builds are scoped individually. We always give you a realistic timeline before starting — not a number designed to win the brief.",
  },
  {
    q: "How many revisions are included?",
    a: "We don't cap revisions artificially. We work with you until the output is right. In practice, our process is thorough enough that most projects land in 2–3 rounds — but we're not counting.",
  },
  {
    q: "Why isn't your work delivered in 24–48 hours like some others?",
    a: "Because good work takes time. Anyone promising 24-hour turnarounds is using a template. We take time to understand your business first — which is exactly why the end result holds together.",
  },
  {
    q: "What if I don't like the design?",
    a: "Then we go again. We present concepts with clear reasoning, take feedback seriously, and iterate until it's right.",
  },
  {
    q: "Are there any refunds?",
    a: "We don't offer refunds on completed work, but we offer honesty upfront. If we don't think we're the right fit, we'll tell you before we start — not after. That's what the discovery call is for.",
  },
  {
    q: "What's the SKAYL process like?",
    a: "Discover → Design → Build → Launch → Grow. We understand your business first, lock in the creative direction, build everything in parallel, ship with care, and stay embedded afterwards. No handoffs, no radio silence, no surprises.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're based in the UK with an active presence in Sri Lanka, and we work with clients across both markets and beyond. Time zones have never been an obstacle — and they never will be.",
  },
];
