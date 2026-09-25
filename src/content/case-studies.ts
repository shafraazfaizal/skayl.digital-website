export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  deliveredBy: string;
  year: string;
  headline: string;
  colours: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  stats: { value: string; label: string }[];
  challenge: { title: string; body: string };
  problems?: string[];
  builtHeading: string;
  built: { no: string; title: string; body: string }[];
  quote: { text: string; author: string };
  outcomesHeading: string;
  outcomes: string[];
  stack: { area: string; detail: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "jma-uk": {
    slug: "jma-uk",
    client: "Jaffna Muslim Association UK",
    sector: "Charity / Non-Profit",
    deliveredBy: "SKAYL",
    year: "2025 – 2026",
    headline:
      "Digital transformation for a UK charity serving the Jaffna Muslim community.",
    colours: {
      primary: "#0D5C6B",
      secondary: "#073D47",
      accent: "#C9A84C",
      background: "#0D2B1A",
    },
    stats: [
      { value: "£2.4M+", label: "Raised for Jaffna" },
      { value: "200+", label: "Projects Documented" },
      { value: "7", label: "Admin Modules Built" },
      { value: "20+", label: "Years of History Told" },
    ],
    challenge: {
      title:
        "A community with two decades of impact — and no digital presence to show for it.",
      body: "The Jaffna Muslim Association has operated in the UK since 2002, raising over £2.4 million for communities in northern Sri Lanka. Despite this track record, JMA had no website capable of telling that story, accepting online donations, or letting their team publish updates without a developer. Their digital presence was holding back their fundraising potential and making it harder to connect with a younger UK diaspora audience.",
    },
    problems: [
      "No online donation capability — donors had to make bank transfers manually.",
      "No content management — any update required a developer.",
      "No campaign transparency — donors couldn't track where their money was going.",
      "No community archive — 22 years of projects and history existed only in documents and institutional memory.",
      "Brand inconsistency — no defined visual identity across social, email, and print.",
    ],
    builtHeading: "Six systems, one platform.",
    built: [
      {
        no: "01",
        title: "Website Design & Development",
        body: "A fully custom Next.js 15 website — not a template. Built from the ground up with animated navigation, 15+ pages, mobile-first design, and WCAG-compliant accessibility.",
      },
      {
        no: "02",
        title: "Donation Platform",
        body: "Stripe-powered giving with Islamic donation categories (Zakat, Sadaqah, Lillah, Qurbani, Fitrana), preset amounts with contextual impact equivalents, Gift Aid support, and a branded confirmation experience.",
      },
      {
        no: "03",
        title: "Content Management System",
        body: "A purpose-built admin dashboard with 7 content modules — Campaigns, News & Newsletter, Blog, Events, Impact Stories, Gallery, and Announcements — so the JMA team can update everything themselves without touching code.",
      },
      {
        no: "04",
        title: "Gallery with Video Support",
        body: "Photo albums with multi-image upload and in-browser lightbox navigation, plus YouTube video integration with auto-fetched thumbnails — zero storage cost for video content.",
      },
      {
        no: "05",
        title: "Database & Infrastructure",
        body: "Supabase for database, authentication, and file storage. Vercel for hosting with branch-based deployment. Full DNS configuration and SSL auto-provisioned.",
      },
      {
        no: "06",
        title: "Heritage & Copywriting",
        body: "Full editorial history page covering seven eras of Jaffna Muslim heritage — from 7th century Arab trade origins to JMA's work today. All content researched, written, and delivered to JMA's secretary for community review before publication.",
      },
    ],
    quote: {
      text: "It's professional — it actually works for our community. Our team can publish campaigns and news without any technical knowledge, and it reflects our Islamic values. Alhamdulillah, we're very pleased with what has been delivered.",
      author: "Secretary, Jaffna Muslim Association UK",
    },
    outcomesHeading: "What changed for JMA.",
    outcomes: [
      "Online donations enabled — JMA can now accept donations 24/7 from anywhere in the world.",
      "Full editorial independence — the JMA team can publish campaigns, news, events, and gallery content without any developer involvement.",
      "Campaign transparency — every active campaign has its own public page with progress tracking and a direct donate button.",
      "Community archive live — 22 years of impact stories and project history are publicly documented for the first time.",
      "Professional brand presence — consistent visual identity across every touchpoint, positioning JMA as a credible modern charity.",
      "Infrastructure for growth — built to scale, new campaigns and content types can be added without rebuilding from scratch.",
    ],
    stack: [
      { area: "Frontend", detail: "Next.js 15 · TypeScript · Tailwind CSS · Framer Motion" },
      { area: "Backend", detail: "Supabase (PostgreSQL + Auth + Storage) · Next.js Server Actions" },
      { area: "Payments", detail: "Stripe (PaymentIntent API · Sandbox + Live ready)" },
      { area: "Email", detail: "Resend (transactional email infrastructure)" },
      { area: "Hosting", detail: "Vercel (branch-based deployment · auto SSL)" },
      { area: "Design", detail: "Custom design system · Plus Jakarta Sans · Inter · Noto Serif Display" },
    ],
  },

  autovive: {
    slug: "autovive",
    client: "AutoVive",
    sector: "Automotive · Car Wash Startup · Sri Lanka",
    deliveredBy: "SKAYL",
    year: "2023 – 2024",
    headline:
      "A world-class brand for Sri Lanka's first fully digital mobile car wash.",
    colours: {
      primary: "#0A2B5C",
      secondary: "#071B3A",
      accent: "#00B4D8",
      background: "#050D1A",
    },
    stats: [
      { value: "360°", label: "Brand Ecosystem Delivered" },
      { value: "6+", label: "Social Media Templates" },
      { value: "1", label: "Pitch Deck Built to Raise Capital" },
      { value: "100%", label: "Designed In-House" },
    ],
    challenge: {
      title: "Making a utility business feel like a premium brand.",
      body: "AutoVive launched with a bold idea — Sri Lanka's first fully digital, mobile car wash platform. No car wash. No friction. Just tap, shine, drive. The challenge was making a utility-based business feel like a premium brand — one credible enough to attract customers and raise expansion capital.",
    },
    builtHeading: "Everything the brand needed — in one system.",
    built: [
      {
        no: "01",
        title: "Logo & Visual Identity",
        body: "Primary wordmark, icon variants, and a complete colour system built around deep navy and electric cyan — professional, modern, and immediately recognisable in the Sri Lankan market.",
      },
      {
        no: "02",
        title: "Brand System",
        body: "Brand guidelines covering colour, typography, spacing, and usage rules across every touchpoint — so AutoVive could grow without the brand falling apart.",
      },
      {
        no: "03",
        title: "Uniform Design",
        body: "Branded polo shirts and workwear for the AutoVive team — so every technician is a walking brand ambassador on every job.",
      },
      {
        no: "04",
        title: "Social Media Design",
        body: "A full suite of social media templates and post designs across multiple formats — built around the brand system for consistent, on-brand content from day one.",
      },
      {
        no: "05",
        title: "Pitch Deck",
        body: "A full investor pitch deck covering Why Now, Problem, Solution, Business Model, Market Size, Traction & Roadmap — designed to raise expansion capital and communicate the AutoVive vision clearly to investors.",
      },
    ],
    quote: {
      text: "The brand they built made AutoVive look like it had been operating for years. Every asset — from the uniforms to the pitch deck — told the same story. That consistency is what made investors take us seriously.",
      author: "Founder, AutoVive",
    },
    outcomesHeading: "What AutoVive walked away with.",
    outcomes: [
      "Complete brand identity delivered — logo, colour system, and visual language fully documented and ready to scale.",
      "Investor-ready pitch deck built — covering every stage of the business model and growth roadmap.",
      "Uniform design delivered — branded workwear for the full AutoVive team.",
      "Social media system live — content templates ready for immediate deployment.",
      "360° brand ecosystem — every customer touchpoint speaking the same language.",
    ],
    stack: [
      { area: "Design", detail: "Adobe Illustrator · Figma" },
      { area: "Deck", detail: "PowerPoint · Figma" },
      { area: "Output", detail: "Brand Guidelines PDF · Print-Ready Files" },
    ],
  },

  "shajara-tea": {
    slug: "shajara-tea",
    client: "Shajara Tea",
    sector: "F&B · Premium Ceylon Tea · Middle East Market",
    deliveredBy: "SKAYL",
    year: "2023 – 2024",
    headline:
      "A complete brand identity for a premium Ceylon tea brand rooted in Arabic elegance.",
    colours: {
      primary: "#2D5A27",
      secondary: "#16300F",
      accent: "#B8860B",
      background: "#0E1F0A",
    },
    stats: [
      { value: "100%", label: "Brand Kit Delivered In-House" },
      { value: "3", label: "Product Photography Shoots Directed" },
      { value: "8+", label: "Social Media Posts Designed" },
      { value: "1", label: "Complete Packaging System Built" },
    ],
    challenge: {
      title: "One cohesive identity — from logo to packaging to reels.",
      body: "Shajara Tea launched with a clear positioning — authentic Sri Lankan tea, crafted for a Middle Eastern audience that values heritage, quality, and cultural resonance. The challenge was building a complete visual identity that honoured that positioning — from the logo to the packaging, from the product photography to the social content — all in one cohesive language.",
    },
    builtHeading: "One brand language, every touchpoint.",
    built: [
      {
        no: "01",
        title: "Logo & Visual Identity",
        body: "An elegant Arabic-inspired logomark and wordmark built around the Shajara brand name (meaning \"tree\" in Arabic) — rooted in premium tea heritage and designed to stand out on shelf and screen alike.",
      },
      {
        no: "02",
        title: "Packaging Design",
        body: "Complete printable packaging system — product labels, tea boxes, and branded inserts — designed to communicate premium quality and Sri Lankan provenance to a Middle Eastern audience.",
      },
      {
        no: "03",
        title: "Product Photography Direction",
        body: "Art direction and styling briefs for product photography sessions — positioning Shajara against luxury tea brands with editorial-level image standards.",
      },
      {
        no: "04",
        title: "Social Media Content",
        body: "A full suite of social media posts across multiple formats and content types — brand announcements, product showcases, engagement content, and launch campaign assets.",
      },
      {
        no: "05",
        title: "Reels Production",
        body: "Engaging short-form video content for Instagram and TikTok — storytelling-led, cinematic visuals, purposeful pacing, and professional sound design. No music. Authentic ambient sound and voiceover direction throughout.",
      },
    ],
    quote: {
      text: "Every element they delivered felt like it was made for exactly the customer we were trying to reach. The packaging, the posts, the reels — it all speaks Arabic luxury and Sri Lankan authenticity at the same time. That's not easy to achieve.",
      author: "Founder, Shajara Tea",
    },
    outcomesHeading: "What Shajara walked away with.",
    outcomes: [
      "Complete brand identity — logo, colour system, and visual language delivered and documented.",
      "Full packaging system — print-ready files for labels, boxes, and inserts.",
      "Product photography direction — editorial brief and art direction delivered.",
      "Social media system live — content templates and post designs ready for immediate deployment.",
      "Reels produced — short-form video content with strong organic reach on launch.",
      "100% in-house — every element built by the same creative team.",
    ],
    stack: [
      { area: "Design", detail: "Adobe Illustrator · Photoshop · Figma" },
      { area: "Video", detail: "CapCut Pro · Cinematic ambient sound direction" },
      { area: "Output", detail: "Print-Ready Files · Brand Guidelines PDF" },
    ],
  },
};
