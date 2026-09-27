// Contact page — copy, options and direct contact details.
// Shared by the page, the form, the API route and the emails.

export const contact = {
  eyebrow: "Contact",
  title: ["Let’s build", "something", "that lasts."],
  body: "Tell us what you’re building, where you want to take it, and what you need from us. We’ll come back with a clear next step — no obligation, no sales pressure.",
  email: "hello@skayl.digital",
  availability: "Currently taking on select projects",
  replyTime: "We reply within 24 hours.",
  // Paste the Calendly link here — the "Book a call" option appears automatically.
  calendlyUrl: "",
  phones: [
    { region: "UK", label: "UK enquiries", display: "+44 7760 636396", tel: "+447760636396" },
    { region: "LK", label: "Sri Lanka enquiries", display: "+94 71 877 3300", tel: "+94718773300" },
  ],
  location: "UK & Sri Lanka",
};

export const serviceOptions = ["Website", "Branding", "Content", "Events", "Other"] as const;
export const timelineOptions = ["ASAP", "1–3 months", "3+ months", "Just exploring"] as const;

export const budgetOptions = {
  GBP: ["£2–5K", "£5–10K", "£10K+", "Not sure"],
  LKR: ["LKR 250K–750K", "LKR 750K–1.5M", "LKR 1.5M+", "Not sure"],
} as const;

export type Currency = keyof typeof budgetOptions;
