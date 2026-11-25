// Turns the question bank into the exact form one client sees, and checks
// answers against it. Used by the browser (step validation), the API (save and
// submit), the admin, the PDF and the emails, so they always agree.

import { z } from "zod";
import {
  EXTRA_SERVICES,
  QUESTIONS,
  SECTIONS,
  SELECTABLE_SECTIONS,
  type Question,
  type Section,
  type SectionId,
  type SelectableSectionId,
  type ShowIf,
} from "./questions";

export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

/* ── Per-link overrides ───────────────────────────────────────────────────── */

const optionList = z.array(z.string().trim().min(1).max(120)).min(1).max(30);

export const overridesSchema = z.object({
  intros: z.record(z.string(), z.string().trim().max(2000)).optional(),
  questions: z
    .record(
      z.string(),
      z.object({
        label: z.string().trim().min(1).max(300).optional(),
        options: optionList.optional(),
      })
    )
    .optional(),
});
export type Overrides = z.infer<typeof overridesSchema>;

/** Read overrides from the database safely; anything malformed is ignored. */
export function parseOverrides(raw: unknown): Overrides {
  const parsed = overridesSchema.safeParse(raw ?? {});
  return parsed.success ? parsed.data : {};
}

export function isSelectableSection(id: string): id is SelectableSectionId {
  return (SELECTABLE_SECTIONS as readonly string[]).includes(id);
}

/* ── Resolve ──────────────────────────────────────────────────────────────── */

export type ResolvedQuestion = Question & { options: string[] };
export type ResolvedSection = Omit<Section, "intro"> & { intro: string; questions: ResolvedQuestion[] };

export function resolveForm(sections: string[], rawOverrides: unknown): ResolvedSection[] {
  const overrides = parseOverrides(rawOverrides);
  const chosen = sections.filter(isSelectableSection);
  const order: SectionId[] = ["details", ...chosen, "choice"];

  const services = [
    ...chosen.map((id) => SECTIONS[id].service).filter((s): s is string => !!s),
    ...EXTRA_SERVICES,
  ];

  return order.map((id) => {
    const base = SECTIONS[id];
    const questions = QUESTIONS.filter((q) => q.section === id).map((q): ResolvedQuestion => {
      const o = overrides.questions?.[q.id];
      let options = q.options ?? [];
      let label = q.label;
      if (q.id === "choice_services") options = services;
      if (o?.options && q.configurable?.options) options = o.options;
      if (o?.label && q.configurable?.label) label = o.label;
      return { ...q, label, options };
    });
    const intro = overrides.intros?.[id]?.trim() || base.intro;
    return { ...base, intro, questions };
  });
}

/* ── Visibility ───────────────────────────────────────────────────────────── */

export function hasAnswer(v: AnswerValue | undefined): boolean {
  if (Array.isArray(v)) return v.length > 0;
  return typeof v === "string" && v.trim().length > 0;
}

function matches(rule: ShowIf, answers: Answers): boolean {
  const v = answers[rule.question];
  if ("answered" in rule) return hasAnswer(v);
  if ("includes" in rule) return Array.isArray(v) ? v.includes(rule.includes) : v === rule.includes;
  if ("equals" in rule) return v === rule.equals;
  return v !== rule.notEquals;
}

export function isVisible(q: Question, answers: Answers): boolean {
  return !q.showIf || matches(q.showIf, answers);
}

/* ── Validation (Zod, generated from the config) ─────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXT = 5000;

function looksLikeUrl(v: string): boolean {
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return u.hostname.includes(".");
  } catch {
    return false;
  }
}

function schemaFor(q: ResolvedQuestion): z.ZodType {
  const requiredMsg = q.type === "checkbox" ? "Please choose at least one." : q.type === "radio" ? "Please choose an option." : "Please answer this question.";
  switch (q.type) {
    case "radio": {
      const s = z.string().refine((v) => v === "" || q.options.includes(v), "Please choose one of the options.");
      return q.required ? s.refine((v) => v !== "", requiredMsg) : s;
    }
    case "checkbox": {
      const s = z.array(z.string().refine((v) => q.options.includes(v), "Please choose from the options."));
      return q.required ? s.min(1, requiredMsg) : s;
    }
    case "email": {
      const s = z.string().trim().max(254).refine((v) => v === "" || EMAIL_RE.test(v), "Please enter a valid email address.");
      return q.required ? s.refine((v) => v !== "", "Please enter your email address.") : s;
    }
    case "url": {
      const s = z.string().trim().max(500).refine((v) => v === "" || looksLikeUrl(v), "Please enter a valid link, like yourwebsite.com.");
      return q.required ? s.refine((v) => v !== "", requiredMsg) : s;
    }
    case "tel": {
      const s = z.string().trim().max(40).refine((v) => v === "" || /^[+()\-\s\d]{6,}$/.test(v), "Please enter a valid phone number.");
      return q.required ? s.refine((v) => v !== "", requiredMsg) : s;
    }
    default: {
      const s = z.string().trim().max(MAX_TEXT, "That’s a little long. Please shorten it.");
      return q.required ? s.refine((v) => v !== "", requiredMsg) : s;
    }
  }
}

export type FieldErrors = Record<string, string>;

/** Validate one section's visible questions. Returns { questionId: message }. */
export function validateSection(section: ResolvedSection, answers: Answers): FieldErrors {
  const errors: FieldErrors = {};
  for (const q of section.questions) {
    if (!isVisible(q, answers)) continue;
    const raw = answers[q.id] ?? (q.type === "checkbox" ? [] : "");
    const result = schemaFor(q).safeParse(raw);
    if (!result.success) errors[q.id] = result.error.issues[0]?.message ?? "Please check this answer.";
  }
  return errors;
}

/** Validate the whole form. Returns the errors and the first section with a problem. */
export function validateAll(form: ResolvedSection[], answers: Answers): { errors: FieldErrors; firstSection?: SectionId } {
  let errors: FieldErrors = {};
  let firstSection: SectionId | undefined;
  for (const section of form) {
    const e = validateSection(section, answers);
    if (Object.keys(e).length && !firstSection) firstSection = section.id;
    errors = { ...errors, ...e };
  }
  return { errors, firstSection };
}

/* ── Sanitising (server side, before anything is stored) ─────────────────── */

/** Keep only known questions, trim text, and drop options that aren't on this link. */
export function sanitizeAnswers(form: ResolvedSection[], raw: unknown): Answers {
  const input = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const out: Answers = {};
  for (const section of form) {
    for (const q of section.questions) {
      if (!(q.id in input)) continue;
      const v = input[q.id];
      if (q.type === "checkbox") {
        if (!Array.isArray(v)) continue;
        const picked = [...new Set(v.filter((x): x is string => typeof x === "string" && q.options.includes(x)))];
        // keep the order of the options, not the order they were clicked
        out[q.id] = q.options.filter((o) => picked.includes(o));
      } else if (q.type === "radio") {
        if (typeof v === "string" && (v === "" || q.options.includes(v))) out[q.id] = v;
      } else if (typeof v === "string") {
        const limit = q.type === "tel" ? 40 : q.type === "email" ? 254 : q.type === "url" ? 500 : MAX_TEXT;
        out[q.id] = v.slice(0, limit);
      }
    }
  }
  return out;
}

/** Final clean-up for storing a submission: trim text and remove answers to hidden questions. */
export function finalizeAnswers(form: ResolvedSection[], answers: Answers): Answers {
  const out: Answers = {};
  for (const section of form) {
    for (const q of section.questions) {
      if (!isVisible(q, answers)) continue;
      const v = answers[q.id];
      if (v === undefined) continue;
      out[q.id] = Array.isArray(v) ? v : v.trim();
    }
  }
  return out;
}

/* ── Display helpers ──────────────────────────────────────────────────────── */

export function formatAnswer(v: AnswerValue | undefined): string | null {
  if (!hasAnswer(v)) return null;
  return Array.isArray(v) ? v.join(", ") : (v as string).trim();
}

export function estimateMinutes(form: ResolvedSection[]): number {
  const total = form.reduce((n, s) => n + s.minutes, 0);
  return Math.max(5, Math.round(total / 5) * 5);
}

export function firstName(name: string | undefined | null): string {
  return (name ?? "").trim().split(/\s+/)[0] ?? "";
}
