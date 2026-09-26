// JMA UK flagship case study — all copy and data for /works/jma-uk.
// Presentation lives in src/components/sections/works/jma/.
//
// ASSETS: drop files into public/work/jma-uk/ using the names below and they
// appear automatically on the next build. Missing files render as a neutral
// panel (labelled with the expected file name while running `npm run dev`).

export const jmaAssets = {
  // Real laptop mockup of the live homepage (already in the project).
  mockup: "/work/jma-uk/hero.png",
  // Brand
  logo: "/work/jma-uk/logo.svg", // JMA logo on a transparent background (.svg preferred)
  photo1: "/work/jma-uk/photo-1.jpg", // community / project photography
  photo2: "/work/jma-uk/photo-2.jpg",
  photo3: "/work/jma-uk/photo-3.jpg", // optional
  // Website
  homeFull: "/work/jma-uk/home-full.png", // FULL-PAGE desktop screenshot of the homepage (tall)
  pageAbout: "/work/jma-uk/page-about.png", // desktop screenshot, 16:10 crop of top of page
  pageZakat: "/work/jma-uk/page-zakat.png",
  pageCampaigns: "/work/jma-uk/page-campaigns.png",
  // Donations
  donate: "/work/jma-uk/donate.png", // donate page / giving-category selector
  // Admin
  admin: "/work/jma-uk/admin.png", // admin dashboard screenshot (16:10)
  // Content engine
  contentGallery: "/work/jma-uk/content-gallery.png",
  contentNews: "/work/jma-uk/content-news.png",
  contentEvents: "/work/jma-uk/content-events.png",
  contentBlog: "/work/jma-uk/content-blog.png",
  contentImpact: "/work/jma-uk/content-impact.png",
  contentAnnouncements: "/work/jma-uk/content-announcements.png",
  // Mobile (portrait phone screenshots, ~9:19.5)
  mobile1: "/work/jma-uk/mobile-1.png",
  mobile2: "/work/jma-uk/mobile-2.png",
  mobile3: "/work/jma-uk/mobile-3.png",
  // Video testimonial (the section stays hidden on the live site until the video exists)
  testimonialVideo: "/work/jma-uk/testimonial.mp4", // landscape 16:9, compressed MP4 (H.264)
  testimonialPoster: "/work/jma-uk/testimonial-poster.jpg", // still frame shown before play
  testimonialCaptions: "/work/jma-uk/testimonial.vtt", // captions (optional, strongly recommended)
  // Closing full-width visual (landscape photography)
  closing: "/work/jma-uk/closing.jpg", // optional — falls back to a teal mockup composition
} as const;

export type JmaAssetKey = keyof typeof jmaAssets;
/** Resolved asset map: the public path if the file exists, otherwise null. */
export type JmaAssets = Record<JmaAssetKey, string | null>;

export const jma = {
  websiteUrl: "https://jaffnamuslimuk.org",
  websiteLabel: "jaffnamuslimuk.org",

  hero: {
    title: "JMA UK",
    client: "Jaffna Muslim Association UK",
    statement: "Building a digital foundation for a community.",
    disciplines: ["Brand", "Digital", "Development"],
    years: "2025 — 2026",
  },

  meta: [
    { label: "Client", value: ["Jaffna Muslim Association UK"] },
    { label: "Industry", value: ["Charity / Non-profit"] },
    { label: "Role", value: ["Lead Developer & Designer"] },
    { label: "Year", value: ["2025–2026"] },
    {
      label: "Services",
      value: [
        "Brand Identity",
        "UX/UI",
        "Web Development",
        "CMS",
        "Donation Platform",
        "Digital Infrastructure",
      ],
    },
  ],

  intro: {
    statement: "A charity with a long history — but no digital foundation to match it.",
    body: [
      "Since 2002, the Jaffna Muslim Association UK has raised funds for communities in northern Sri Lanka. The work was real and long-standing. Its digital presence was not.",
      "We designed and built the organisation’s complete digital platform — identity, website, giving, publishing and infrastructure — at no cost to JMA.",
    ],
  },

  before: {
    eyebrow: "Before",
    headline: "For years, JMA’s work lived largely offline.",
    body: "The association had been serving communities for over two decades, but everything that could be seen online depended on someone else. There was no home for its history, no way to give online, and no way for the team to publish without a developer.",
    gaps: [
      "No dedicated website",
      "No online donation platform",
      "No independent publishing system",
      "Every update depended on a developer",
      "No central digital ecosystem",
    ],
    statement: [
      "The challenge wasn’t simply to build a website.",
      "It was to build the infrastructure around the organisation.",
    ],
  },

  transformation: {
    eyebrow: "The transformation",
    headline: "From nothing online to a system that runs itself.",
    stages: [
      "No website",
      "Brand",
      "Digital experience",
      "Donations",
      "CMS",
      "Content",
      "Digital ecosystem",
    ],
  },

  brand: {
    eyebrow: "01 / Brand Identity",
    headline: "Giving the organisation a digital identity worthy of its work.",
    body: "A respectful, confident identity that carries JMA’s heritage into every screen — deep teal for trust, gold for dignity, and a warm off-white that lets the work breathe.",
    colours: [
      { name: "JMA Teal", hex: "#0D5C6B", role: "Primary" },
      { name: "Deep Teal", hex: "#073D47", role: "Depth" },
      { name: "Gold", hex: "#C9A84C", role: "Accent" },
      { name: "Off-white", hex: "#F5F0E1", role: "Ground" },
      { name: "Near-black", hex: "#0F0505", role: "Ink" },
    ],
    type: [
      { role: "Headlines", family: "Plus Jakarta Sans", sample: "Serving the Jaffna Muslim community", font: "jakarta" },
      { role: "Accent", family: "Noto Serif Display", sample: "across two nations", font: "serif" },
      { role: "Body", family: "Inter", sample: "For over 20 years, JMA has connected the UK diaspora with families on the ground in Jaffna.", font: "inter" },
    ],
  },

  website: {
    eyebrow: "02 / Digital Experience",
    headline: "A website built around people, not pages.",
    body: "Designed mobile-first, the site gives every visitor a clear route through JMA’s story, its campaigns and the difference it makes — with giving never more than a tap away.",
    pagesStat: { value: "15+", label: "Pages" },
    pages: [
      { key: "pageAbout", title: "About JMA", caption: "Who JMA is, its committee and governance" },
      { key: "pageZakat", title: "Zakat", caption: "A dedicated route for the community’s obligatory giving" },
      { key: "pageCampaigns", title: "Campaigns", caption: "Every active appeal with its own public page" },
    ] as { key: JmaAssetKey; title: string; caption: string }[],
  },

  architecture: {
    eyebrow: "Information architecture",
    headline: "The architecture turns a complex organisation into a simple journey.",
    body: "Every visitor arrives for one of three reasons — to understand JMA, to give, or to take part. The site is organised around exactly those three journeys.",
    root: "Home",
    // Taken from the live site's navigation and footer.
    branches: [
      {
        name: "Organisation",
        intent: "Understand",
        items: ["About JMA", "Our History", "Meet the Committee", "Governance", "Annual Reports", "Contact Us"],
      },
      {
        name: "Give",
        intent: "Give",
        items: ["Donate Now", "Active Campaigns", "Pay Zakat", "Qurbani", "Gift Aid"],
      },
      {
        name: "Community",
        intent: "Take part",
        items: ["Membership", "Events", "News & Updates", "Blog", "Gallery", "Impact Stories", "Newsletter"],
      },
    ],
  },

  donation: {
    eyebrow: "Donations",
    headline: "GIVE.",
    body: "A donation experience designed around how the community actually gives.",
    categories: [
      { name: "Zakat", arabic: "زكاة", detail: "The obligatory annual alms" },
      { name: "Sadaqah", arabic: "صدقة", detail: "Voluntary charity, given at any time" },
      { name: "Lillah", arabic: "لله", detail: "General giving, for the sake of Allah" },
      { name: "Qurbani", arabic: "أضحية", detail: "The sacrifice of Eid al-Adha" },
      { name: "Fitrana", arabic: "زكاة الفطر", detail: "Zakat al-Fitr, given before Eid al-Fitr" },
    ],
    // What is live on jaffnamuslimuk.org today. If card payments go live,
    // add { label: "Stripe", detail: "Secure card payments" } here.
    rails: [
      { label: "Bank transfer", detail: "Guided transfer with receipt upload" },
      { label: "Gift Aid", detail: "Adds 25% to eligible UK gifts, at no cost to the donor" },
    ],
  },

  admin: {
    eyebrow: "03 / The system behind the site",
    headline: "The website shouldn’t need us to stay alive.",
    body: "A purpose-built admin dashboard lets the JMA team publish campaigns, news, events and stories themselves — no developer in the loop, no waiting, no cost per update.",
    count: "12",
    countLabel: "Admin modules",
    modules: [
      "Announcements",
      "Campaigns",
      "News & Newsletter",
      "Blog",
      "Events",
      "Impact Page",
      "Gallery",
      "Project Requests",
      "Subscribers",
      "Report Requests",
      "Student Showcase",
      "Monthly Quiz",
    ],
    operations: "Project requests arrive with their own reference numbers, and newsletter subscribers export straight to CSV.",
  },

  content: {
    eyebrow: "Content engine",
    headline: "A living website needs a system for staying alive.",
    body: "Every module feeds the public site. What the team publishes in the dashboard appears on the public site straight away.",
    tiles: [
      { key: "contentGallery", title: "Gallery", caption: "Photo and YouTube albums, with featured albums on the homepage" },
      { key: "contentNews", title: "News", caption: "Updates and newsletters from the committee" },
      { key: "contentEvents", title: "Events", caption: "Gatherings and dates for the community" },
      { key: "contentBlog", title: "Blog", caption: "Longer stories and reflections" },
      { key: "contentImpact", title: "Impact Stories", caption: "The difference each project makes" },
      { key: "contentAnnouncements", title: "Announcements", caption: "A live ticker across the homepage" },
    ] as { key: JmaAssetKey; title: string; caption: string }[],
  },

  technology: {
    eyebrow: "04 / Under the hood",
    headline: "Built on a stack that’s easy to keep running.",
    stack: [
      { name: "Next.js", role: "Frontend" },
      { name: "Supabase", role: "Database" },
      { name: "Vercel", role: "Hosting" },
      { name: "Resend", role: "Communications" },
    ],
    note: "DNS, SSL and email authentication configured end to end.",
  },

  mobile: {
    eyebrow: "Mobile",
    headline: ["Designed mobile-first.", "Built to work everywhere."],
    body: "Every page, every campaign and every donation flow was designed for the small screen first — then scaled up, not squeezed down.",
  },

  impact: {
    eyebrow: "The result",
    stats: [
      { value: "15+", label: "Pages" },
      { value: "12", label: "Admin modules" },
      { value: "5", label: "Giving categories" },
      { value: "01", label: "Digital ecosystem" },
    ],
    statement: "Built at no cost to JMA.",
    note: "Because some causes are worth more than any invoice.",
  },

  testimonial: {
    eyebrow: "In their words",
    // Paste a line he actually says in the video. Leave empty to show no pull-quote.
    quote: "",
    credit: "Secretary",
    organisation: "Jaffna Muslim Association UK",
  },

  finale: {
    statement: [
      "From a charity without a digital home",
      "to a platform built to serve for years to come.",
    ],
  },
};