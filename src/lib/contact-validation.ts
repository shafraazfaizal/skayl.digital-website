// Shared contact-form validation — the same rules run in the browser (for
// instant feedback) and on the server (the source of truth).
import { budgetOptions, serviceOptions, timelineOptions, type Currency } from "@/content/contact";

export type ContactInput = {
  name: string;
  email: string;
  services: string[];
  timeline: string;
  currency: Currency;
  budget: string;
  message: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "services" | "message", string>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (!name) e.name = "Please tell us your name.";
  else if (name.length > 120) e.name = "That name is a little long.";

  if (!email) e.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email) || email.length > 254) e.email = "That email doesn’t look quite right.";

  if (!v.services.length) e.services = "Pick at least one — ‘Other’ is fine.";

  if (!message) e.message = "Tell us a little about the project.";
  else if (message.length < MESSAGE_MIN) e.message = `A little more detail, please — at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX) e.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return e;
}

/** Coerces an untrusted payload into a clean ContactInput (unknown options dropped). */
export function sanitizeContact(raw: Record<string, unknown>): ContactInput {
  const str = (x: unknown, max = 5000) => (typeof x === "string" ? x.slice(0, max) : "");
  const currency: Currency = raw.currency === "LKR" ? "LKR" : "GBP";
  const services = Array.isArray(raw.services)
    ? raw.services.filter((s): s is string => typeof s === "string" && (serviceOptions as readonly string[]).includes(s))
    : [];
  const timeline = (timelineOptions as readonly string[]).includes(str(raw.timeline)) ? str(raw.timeline) : "";
  const budget = (budgetOptions[currency] as readonly string[]).includes(str(raw.budget)) ? str(raw.budget) : "";
  return {
    name: str(raw.name, 200).trim(),
    email: str(raw.email, 300).trim(),
    services: Array.from(new Set(services)),
    timeline,
    currency,
    budget,
    message: str(raw.message, MESSAGE_MAX + 100).trim(),
  };
}
