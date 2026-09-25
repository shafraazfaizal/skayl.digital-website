// Homepage content: process, why-us, stats, testimonials, principles teaser, pricing and FAQs.

export const processSteps = [
  { no: "01", name: "Discover", body: "We learn your business, your audience, and what success actually looks like — before touching any tools." },
  { no: "02", name: "Design", body: "Creative direction locked in first. Every concept presented with clear reasoning so every decision has a purpose behind it." },
  { no: "03", name: "Build", body: "Development, content, and brand run in parallel — not sequentially. Faster output, tighter consistency, no waiting on handoffs." },
  { no: "04", name: "Launch", body: "Shipped with care. Performance, accessibility, and SEO handled — with a smooth handover your team can actually run." },
  { no: "05", name: "Grow", body: "We stay embedded after launch. Ongoing support, content, and iteration as you scale — no radio silence, no surprises." },
];

export const whyUs = [
  { title: "Fully in-house. Every time.", body: "Design, dev, and content built by us — not managed by us and built by someone else. When we say in-house, we mean it." },
  { title: "One point of contact. One accountable team.", body: "You talk directly to the people doing the work. No account-manager layers, no lost context, no finger-pointing." },
  { title: "Built for your brand — not from a template.", body: "Every project is made to measure. We take time to understand your business before we open Figma or write a line of code." },
  { title: "Honest before we start — and after.", body: "If we're not the right fit, we'll tell you before we start — not after you've paid a deposit. Every project begins with a discovery call precisely for this reason." },
  { title: "UK quality. Global reach.", body: "Based in the UK with an active presence in Sri Lanka. We work with clients across both markets and beyond — time zones have never been an obstacle." },
];

// Animated stat counters for the testimonials section.
export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Brands Served" },
  { value: 100, suffix: "%", label: "In-House Delivery" },
  { value: 2.4, prefix: "£", suffix: "M+", label: "Raised Through Platforms We Built", decimals: 1 },
];

export const testimonials = [
  {
    quote:
      "It's professional — it actually works for our community. Our team can publish campaigns and news without any technical knowledge, and it reflects our Islamic values. Alhamdulillah, we're very pleased with what has been delivered.",
    author: "Secretary",
    role: "Jaffna Muslim Association UK",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  },
  {
    quote:
      "SKAYL understood the brand before we could even explain it. The identity they delivered feels timeless — every touchpoint finally speaks the same language.",
    author: "Founder",
    role: "Framed Splendor",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  },
  {
    quote:
      "The reels hit different. Our engagement doubled and sign-ups followed — content that actually moves people, not just looks good.",
    author: "Owner",
    role: "Zero Excuses Gym",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  },
];

export const principlesTeaser = [
  "Excellence",
  "Integrity",
  "Creativity with Purpose",
  "Innovation",
  "Client Partnership",
];

export const pricing = {
  eyebrow: "Pricing",
  title: "Priced around your project.",
  body: "Every business is different. We don't publish fixed packages because we don't do off-the-shelf work. Tell us what you need and we'll give you a clear, honest quote — no obligation, no pitch deck.",
  cta: { label: "Get a Quote →", href: "/contact" },
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
    a: "Then we go again. We present concepts with clear reasoning, take feedback seriously, and iterate until it's right. We've never delivered a project a client wasn't happy with.",
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
