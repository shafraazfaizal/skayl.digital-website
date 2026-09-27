// Blog posts.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "why-we-dont-promise-24-hour-turnarounds",
    title: "Why we don’t promise 24-hour turnarounds",
    excerpt:
      "Fast is easy to sell and hard to defend. Here’s how we think about speed versus substance.",
    date: "2026",
    tag: "Process",
    body: [
      "Agencies promising 24-hour turnarounds are usually reaching for a template. That’s fine for some things — but it’s not how you build something made for a specific brand.",
      "We take the time to understand your business first. That upfront work — the discovery call, the brief, the questions most studios skip — is exactly why the end result holds together. The design has a reason, the copy has a voice, and the build is something your team can actually run.",
      "Speed still matters. A focused landing page or brand identity is typically 2–3 weeks with us. But we quote a realistic timeline, not a number designed to win the brief. We’d rather lose a project to someone faster than deliver something that doesn’t hold.",
    ],
  },
  {
    slug: "building-a-donation-platform-that-respects-its-donors",
    title: "Building a donation platform that respects its donors",
    excerpt:
      "What we learned building Islamic giving flows for a UK charity — and why transparency won.",
    date: "2026",
    tag: "Case Notes",
    body: [
      "When we built the JMA UK platform, the donation flow had to do more than take payments. It had to reflect the values of a community that has been giving generously for over 20 years — and make every pound traceable.",
      "We built Islamic giving categories — Zakat, Sadaqah, Lillah, Qurbani, Fitrana — with preset amounts tied to real impact equivalents, Gift Aid support, and a branded confirmation experience that feels worthy of the cause.",
      "The lesson: transparency is a feature. Every active campaign gets its own public page with progress tracking, so donors always know where their money is going. That’s not just good design — it’s the right way to build for trust.",
    ],
  },
  {
    slug: "a-brand-system-is-a-promise-not-a-logo",
    title: "A brand system is a promise, not a logo",
    excerpt:
      "Consistency across every touchpoint is what turns a new studio into a credible one.",
    date: "2025",
    tag: "Branding",
    body: [
      "A logo is the smallest part of a brand. The system — type, colour, spacing, tone of voice — is what people actually feel across a website, an email, a social post, and a printed label.",
      "Consistency is credibility. When every touchpoint agrees, a new organisation reads as an established one. When they don’t, even a beautiful logo can’t save you.",
      "That’s why we deliver systems, not just marks. Colour tokens, typography scales, spacing rules, usage guidelines — so the brand still holds together long after the launch, regardless of who’s using it.",
    ],
  },
  {
    slug: "why-we-produce-content-without-music",
    title: "Why we produce content without music — and why it makes us better",
    excerpt:
      "Our commitment to music-free content isn’t a limitation. It’s what forces us to be more intentional about everything else.",
    date: "2025",
    tag: "Creative Principle",
    body: [
      "When most people think about video content, music is the first thing they reach for. A track sets the mood, fills the silence, and — if we’re honest — does a lot of the emotional heavy lifting so the visuals don’t have to.",
      "At SKAYL, we don’t use music. This is a principle rooted in our Islamic values, and it applies to every project we take on.",
      "What it means in practice is that we have to work harder. Every reel, every brand video, every social clip has to earn its engagement through storytelling, pacing, cinematic visuals, purposeful editing, and authentic sound design. We can’t lean on a trending track to carry the emotion — so we build it into the content itself.",
      "The result is content that connects differently. It doesn’t date. It doesn’t compete with a song people are sick of by next month. It holds its own.",
      "Our clients have seen strong organic reach from content produced this way — not in spite of the no-music approach, but because of the intentionality it demands.",
      "These principles are not limitations. They are the reason the work is better.",
    ],
  },
];
