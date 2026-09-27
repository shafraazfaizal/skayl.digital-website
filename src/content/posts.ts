// Studio Notes — the SKAYL blog.
// Each article is structured content (blocks), so the article page can set
// headings, pull quotes and Qur'an / hadith references properly.
// Facts only: every claim about a project comes from its case study or the
// project data. No invented results, numbers or client quotes.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | {
      // A Qur'an verse or hadith: Arabic, translation and a precise source.
      type: "source";
      kind: "Qur’an" | "Hadith" | "Tafsir";
      arabic?: string;
      translation: string;
      reference: string;
    };

export type PostCategory = "Case notes" | "Process" | "Branding" | "Creative principle" | "Studio";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  year: string;
  featured?: boolean;
  image?: { src: string; alt: string; position?: string };
  related?: { label: string; href: string };
  blocks: Block[];
};

export const topics = ["Design", "Development", "Brand", "Culture"];

export const posts: Post[] = [
  {
    slug: "building-a-donation-platform-that-respects-its-donors",
    title: "Building a donation platform that respects its donors",
    excerpt:
      "What we learned building Islamic giving flows for a UK charity — and why transparency matters more than conversion tricks.",
    category: "Case notes",
    year: "2026",
    featured: true,
    image: { src: "/work/jma-uk/hero.png", alt: "The JMA UK website on a laptop", position: "50% 40%" },
    related: { label: "Read the JMA UK case study", href: "/works/jma-uk" },
    blocks: [
      {
        type: "p",
        text: "Before this project, JMA UK had no website and no way to give online. The community had been giving generously for years — through people, not platforms. Our job wasn’t to invent a new habit. It was to give an existing one a home.",
      },
      { type: "h2", text: "Give the way the community already gives" },
      {
        type: "p",
        text: "Islamic giving isn’t one thing. Zakat, Sadaqah, Lillah, Qurbani and Fitrana each have their own meaning, timing and rules — and a donor needs to know exactly where their money is going. So each category is named and explained in plain language, rather than folded into a single ‘Donate’ button.",
      },
      {
        type: "p",
        text: "The payment flow followed the same thinking: a guided bank transfer with a receipt upload, and Gift Aid for eligible UK donors — so a gift can go further at no cost to the person giving.",
      },
      { type: "quote", text: "Charity isn’t a checkout. The design has to earn trust before it asks for anything." },
      { type: "h2", text: "Transparency is the feature" },
      {
        type: "p",
        text: "Every active campaign has its own public page with its progress, so donors can see what they’re part of. Behind it, the committee runs the whole site themselves — campaigns, events, the gallery and announcements — from one admin dashboard, without needing a developer.",
      },
      {
        type: "p",
        text: "We built JMA’s digital home at no cost. Some causes are worth more than any invoice — and building for a community that trusts you is its own kind of brief.",
      },
    ],
  },
  {
    slug: "why-we-produce-content-without-music",
    title: "Why we produce content without music",
    excerpt:
      "It’s a principle, not a style choice. Here’s where it comes from — the Qur’an and the Sunnah — and why it makes the work better, not smaller.",
    category: "Creative principle",
    year: "2026",
    related: { label: "See our content work", href: "/services#content-media" },
    blocks: [
      {
        type: "p",
        text: "When most people make a reel, the first thing they reach for is a track. Music sets the mood, fills the silence and quietly does a lot of the emotional work. At SKAYL we don’t use it — not in reels, brand films or social cuts, for any client, on any project.",
      },
      {
        type: "p",
        text: "People sometimes assume that’s a limitation we tolerate. It isn’t. It’s a conviction, and we want to be open about where it comes from.",
      },
      { type: "h2", text: "Where the principle comes from" },
      {
        type: "p",
        text: "In Surah Luqman, Allah describes people who take up ‘idle talk’ to lead others away from His path:",
      },
      {
        type: "source",
        kind: "Qur’an",
        arabic: "وَمِنَ النَّاسِ مَن يَشْتَرِي لَهْوَ الْحَدِيثِ لِيُضِلَّ عَن سَبِيلِ اللَّهِ بِغَيْرِ عِلْمٍ وَيَتَّخِذَهَا هُزُوًا ۚ أُولَٰئِكَ لَهُمْ عَذَابٌ مُّهِينٌ",
        translation:
          "And of the people is he who buys the amusement of speech to mislead [others] from the way of Allah without knowledge and who takes it in ridicule. Those will have a humiliating punishment.",
        reference: "Surah Luqman, 31:6",
      },
      {
        type: "p",
        text: "The Companion ʿAbdullah ibn Masʿud, one of the most learned of the Companions in the Qur’an, was asked what ‘the amusement of speech’ in this verse refers to:",
      },
      {
        type: "source",
        kind: "Tafsir",
        translation: "“It is singing — by Allah, besides whom there is no god.” He said it three times.",
        reference: "Reported by Ibn Jarir al-Tabari in his Tafsir of 31:6",
      },
      {
        type: "p",
        text: "And the Prophet ﷺ foretold a time when musical instruments would be treated as permissible alongside things that are clearly forbidden:",
      },
      {
        type: "source",
        kind: "Hadith",
        arabic: "لَيَكُونَنَّ مِنْ أُمَّتِي أَقْوَامٌ يَسْتَحِلُّونَ الْحِرَ وَالْحَرِيرَ وَالْخَمْرَ وَالْمَعَازِفَ",
        translation:
          "“From among my followers there will be some people who will consider illegal sexual intercourse, the wearing of silk, the drinking of alcoholic drinks and the use of musical instruments as lawful.”",
        reference: "Sahih al-Bukhari 5590 — narrated by Abu ʿAmir or Abu Malik al-Ashʿari",
      },
      {
        type: "p",
        text: "Musical instruments being impermissible is the position of the four major schools of Islamic law, with the well-known allowance of the daff on occasions such as weddings and Eid. We’re a creative studio, not scholars — anyone who wants to go deeper should learn from qualified people of knowledge. But this is why the principle isn’t negotiable for us, and why we hold it for every client, Muslim or not.",
      },
      { type: "h2", text: "What we use instead" },
      {
        type: "list",
        items: [
          "Voice — voiceover and scripts written to carry the story",
          "Natural sound — the pour of tea, the rain, the room, the street",
          "Vocal-only nasheeds, where a piece needs that feeling",
          "Pacing, silence and edit rhythm — the cut does the work a beat would",
          "Cinematic visuals that hold attention on their own",
        ],
      },
      { type: "quote", text: "When you can’t lean on a trending track, every frame has to earn its place." },
      { type: "h2", text: "Why it makes the work better" },
      {
        type: "p",
        text: "Without a track to hide behind, content has to be genuinely good: a clear idea, a strong first second, deliberate pacing, real sound. It also doesn’t date the way a song people are tired of by next month does.",
      },
      {
        type: "p",
        text: "And for Muslim businesses, founders and creators, it removes a worry entirely. You never have to ask whether the content made for your brand sits right with your values. That’s the promise: we won’t, and we don’t.",
      },
    ],
  },
  {
    slug: "what-happens-after-you-send-us-a-message",
    title: "What happens after you send us a message",
    excerpt:
      "No sales funnel, no pitch deck, no disappearing act. Here’s exactly what working with SKAYL looks like, from the first reply to launch day.",
    category: "Process",
    year: "2026",
    related: { label: "Start a project", href: "/contact" },
    blocks: [
      {
        type: "p",
        text: "Reaching out to a studio can feel like a risk — you don’t know who’ll read it, what it’ll cost, or whether you’ll get a straight answer. So here’s the whole process, plainly.",
      },
      { type: "h2", text: "1. A real reply within 24 hours" },
      {
        type: "p",
        text: "Not an autoresponder pretending to be a person. One of us reads your message properly and replies within 24 hours — with a straight answer, and questions if we have them.",
      },
      { type: "h2", text: "2. A short call — and honesty on both sides" },
      {
        type: "p",
        text: "We learn your business, your audience and what success actually looks like. If we’re not the right fit, we’ll say so before you pay anything — not after.",
      },
      { type: "h2", text: "3. A clear quote" },
      {
        type: "p",
        text: "Every project is priced to its scope, so you get a quote for exactly what you need: what’s included, the timeline and the cost, upfront. No hidden extras.",
      },
      { type: "h2", text: "4. Design with reasons" },
      {
        type: "p",
        text: "Creative direction is locked in first. Every concept comes with the reasoning behind it, so decisions are made on purpose — and we keep going until it’s right.",
      },
      { type: "h2", text: "5. Build, launch and handover" },
      {
        type: "p",
        text: "Development, content and brand run in parallel, by the same team. We launch with care and hand everything over properly, so your team can run it without calling a developer.",
      },
      { type: "h2", text: "6. We don’t disappear" },
      {
        type: "p",
        text: "After launch we stay available for support, updates and new content as you grow. You’ll never have to chase us.",
      },
      { type: "quote", text: "No surprises. No disappearing. No half-finished work." },
    ],
  },
  {
    slug: "one-brand-two-cultures",
    title: "One brand, two cultures: designing Shajara Tea",
    excerpt:
      "How we built a Ceylon tea brand for the Middle East without making it look like either a souvenir or a costume.",
    category: "Case notes",
    year: "2026",
    image: { src: "/work/shajara-tea/case/label-flat.jpg", alt: "The Shajara Tea canister wrap: an arch opening onto the Ceylon highlands", position: "50% 50%" },
    related: { label: "Read the Shajara Tea case study", href: "/works/shajara-tea" },
    blocks: [
      {
        type: "p",
        text: "Shajara is Ceylon black tea made for the Middle East. The easy answer would have been to make it ‘look Arabic’. The brief was harder than that: find one visual language where three things could sit together naturally — Ceylon, the Middle East and modern luxury.",
      },
      { type: "h2", text: "Start with the name" },
      {
        type: "p",
        text: "Shajara (شجرة) means ‘tree’. A tree grows from a root, the way Shajara grows from Sri Lanka. The name already held the idea: something natural, something that lasts, something with a place it comes from.",
      },
      { type: "h2", text: "Let the letters carry both worlds" },
      {
        type: "p",
        text: "The wordmark is written in Latin letters, drawn with the rhythm of Arabic script — readable to everyone, familiar to the audience it was made for. Set in gold on Shajara green and warm cream, it feels considered rather than decorated.",
      },
      { type: "quote", text: "The brief was never to make the brand look Arabic. It was to make it belong." },
      { type: "h2", text: "Put the origin on the pack" },
      {
        type: "p",
        text: "The label opens like an arch onto the Ceylon highlands, printed around every canister. The architecture speaks to the Middle East; the view through it leaves no doubt about where the tea is grown.",
      },
    ],
  },
  {
    slug: "why-we-dont-promise-24-hour-turnarounds",
    title: "Why we don’t promise 24-hour turnarounds",
    excerpt: "Fast is easy to sell and hard to defend. Here’s how we think about speed versus substance.",
    category: "Process",
    year: "2026",
    blocks: [
      {
        type: "p",
        text: "Agencies promising 24-hour turnarounds are usually reaching for a template. That’s fine for some things — but it’s not how you build something made for a specific brand.",
      },
      {
        type: "p",
        text: "We take the time to understand your business first. That upfront work — the discovery call, the brief, the questions most studios skip — is exactly why the end result holds together. The design has a reason, the copy has a voice, and the build is something your team can actually run.",
      },
      { type: "quote", text: "We’d rather lose a project to someone faster than deliver something that doesn’t hold." },
      {
        type: "p",
        text: "Speed still matters. A focused landing page or brand identity is typically 2–3 weeks with us. But we quote a realistic timeline, not a number designed to win the brief.",
      },
    ],
  },
  {
    slug: "a-brand-system-is-a-promise-not-a-logo",
    title: "A brand system is a promise, not a logo",
    excerpt: "Consistency across every touchpoint is what turns a new business into a credible one.",
    category: "Branding",
    year: "2025",
    image: { src: "/work/autovive/case/jersey.jpg", alt: "The AutoVive brand jersey: “Tap. Shine. Drive.” as a splash of water", position: "50% 50%" },
    related: { label: "See how it works for AutoVive", href: "/works/autovive" },
    blocks: [
      {
        type: "p",
        text: "A logo is the smallest part of a brand. The system — type, colour, spacing, tone of voice — is what people actually feel across a website, an email, a social post, a uniform and a printed label.",
      },
      { type: "quote", text: "When every touchpoint agrees, a new organisation reads as an established one." },
      {
        type: "p",
        text: "Consistency is credibility. When the touchpoints don’t agree, even a beautiful logo can’t save you. That’s why we deliver systems, not just marks: colour, typography, spacing and usage guidelines — so the brand still holds together long after launch, whoever is using it.",
      },
      {
        type: "p",
        text: "For AutoVive, that meant one identity carried from the wordmark to the team’s uniforms, the launch posts and the investor pitch deck — so every piece told the same story.",
      },
    ],
  },
  {
    slug: "in-house-from-first-call-to-launch",
    title: "In-house, from the first call to launch",
    excerpt: "Why we don’t outsource — and what it means for you to talk to the people actually doing the work.",
    category: "Studio",
    year: "2026",
    related: { label: "What we do", href: "/services" },
    blocks: [
      {
        type: "p",
        text: "SKAYL is two founders: one who builds, one who creates. Brand, web and content come from the same small team, held to the same standard. Nothing is subcontracted.",
      },
      { type: "h2", text: "Why it matters to you" },
      {
        type: "list",
        items: [
          "You talk directly to the people doing the work — no account managers, no lost context",
          "The brand, the website and the content are made by people who understand all three",
          "When something needs changing, the person who made it changes it",
          "Nobody can hand your project to someone you’ve never met",
        ],
      },
      { type: "quote", text: "When we say in-house, we mean it." },
      {
        type: "p",
        text: "It’s also why we’re selective about what we take on. A small team that does everything itself can only do its best work on so many projects at once — so we’d rather do fewer, properly.",
      },
    ],
  },
];

/** Rough reading time in minutes (≈220 words a minute). */
export function readingTime(p: Post) {
  const words = p.blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "source" ? b.translation : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
