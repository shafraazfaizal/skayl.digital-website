"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { createLink } from "@/app/admin/discovery/actions";
import { estimateMinutes, resolveForm, type Overrides } from "@/lib/discovery/form";
import {
  AUDIENCE_PRESETS,
  QUESTIONS,
  RECURRING_PRESETS,
  SECTIONS,
  SELECTABLE_SECTIONS,
  WEBSITE_AREA_PRESETS,
  type SelectableSectionId,
} from "@/lib/discovery/questions";
import { cn } from "@/lib/utils";
import { Card, Check, Eyebrow, Headline, InkPanel, PillButton } from "../ui";

export type NewLinkDefaults = {
  sections: SelectableSectionId[];
  greeting: string;
  introMessage: string;
  overrides: Overrides;
  duplicatedFrom?: string;
};

const input =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 text-[17px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 hover:border-ink/45 focus:border-ink focus:ring-0";
const box =
  "w-full rounded-[18px] border border-ink/15 bg-cream px-4 py-3 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 hover:border-ink/35 focus:border-ink";
const labelCls = "text-[11px] font-medium uppercase tracking-[0.22em] text-muted";

function inDays(n: number) {
  const d = new Date(Date.now() + n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const same = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

function defaultOf(id: string) {
  const q = QUESTIONS.find((x) => x.id === id)!;
  return { label: q.label, options: q.options ?? [] };
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/* ── Small parts ──────────────────────────────────────────────────────────── */

function Presets({ presets, onPick }: { presets: Record<string, { label: string }>; onPick: (key: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(presets).map(([key, p]) => (
        <button
          key={key}
          type="button"
          onClick={() => onPick(key)}
          className="inline-flex h-9 items-center rounded-full border border-ink/15 bg-cream px-4 text-[12.5px] text-ink transition-colors hover:border-ink"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

function Labelled({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
      {hint && <p className="text-[13px] leading-snug text-muted">{hint}</p>}
    </div>
  );
}

/* ── The form ─────────────────────────────────────────────────────────────── */

export default function NewLinkForm({ defaults }: { defaults: NewLinkDefaults }) {
  const [clientName, setClientName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [greeting, setGreeting] = useState(defaults.greeting);
  const [introMessage, setIntroMessage] = useState(defaults.introMessage);
  const [sections, setSections] = useState<SelectableSectionId[]>(defaults.sections);
  const [expiresAt, setExpiresAt] = useState(inDays(30));

  const o = defaults.overrides;
  const [intros, setIntros] = useState<Record<string, string>>(() =>
    Object.fromEntries(SELECTABLE_SECTIONS.map((id) => [id, o.intros?.[id] ?? SECTIONS[id].intro]))
  );
  const [areas, setAreas] = useState((o.questions?.website_areas?.options ?? defaultOf("website_areas").options).join("\n"));
  const [recurringLabel, setRecurringLabel] = useState(o.questions?.design_recurring?.label ?? defaultOf("design_recurring").label);
  const [recurringOptions, setRecurringOptions] = useState(
    (o.questions?.design_recurring?.options ?? defaultOf("design_recurring").options).join("\n")
  );
  const [audienceLabel, setAudienceLabel] = useState(o.questions?.app_audience?.label ?? defaultOf("app_audience").label);
  const [audienceOptions, setAudienceOptions] = useState((o.questions?.app_audience?.options ?? defaultOf("app_audience").options).join("\n"));

  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [created, setCreated] = useState<{ id: string; url: string; ref: string } | null>(null);
  const [copied, setCopied] = useState<"" | "link" | "whatsapp">("");

  const toggleSection = (id: SelectableSectionId) =>
    setSections((s) => (s.includes(id) ? s.filter((x) => x !== id) : SELECTABLE_SECTIONS.filter((x) => x === id || s.includes(x))));

  const overrides = useMemo<Overrides>(() => {
    const out: Overrides = { intros: {}, questions: {} };
    for (const id of sections) {
      const text = intros[id]?.trim();
      if (text && text !== SECTIONS[id].intro) out.intros![id] = text;
    }
    const q = out.questions!;
    if (sections.includes("website")) {
      const opts = lines(areas);
      if (opts.length && !same(opts, defaultOf("website_areas").options)) q.website_areas = { options: opts };
    }
    if (sections.includes("design")) {
      const d = defaultOf("design_recurring");
      const opts = lines(recurringOptions);
      const entry: { label?: string; options?: string[] } = {};
      if (recurringLabel.trim() && recurringLabel.trim() !== d.label) entry.label = recurringLabel.trim();
      if (opts.length && !same(opts, d.options)) entry.options = opts;
      if (entry.label || entry.options) q.design_recurring = entry;
    }
    if (sections.includes("app")) {
      const d = defaultOf("app_audience");
      const opts = lines(audienceOptions);
      const entry: { label?: string; options?: string[] } = {};
      if (audienceLabel.trim() && audienceLabel.trim() !== d.label) entry.label = audienceLabel.trim();
      if (opts.length && !same(opts, d.options)) entry.options = opts;
      if (entry.label || entry.options) q.app_audience = entry;
    }
    return out;
  }, [sections, intros, areas, recurringLabel, recurringOptions, audienceLabel, audienceOptions]);

  const minutes = estimateMinutes(resolveForm(sections, {}));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await createLink({ clientName, organisation, clientEmail, greeting, introMessage, sections, overrides, expiresAt });
      if (!res.ok) return setError(res.error);
      setCreated({ id: res.id, url: res.url, ref: res.ref });
      window.scrollTo({ top: 0 });
    });
  };

  const whatsapp = created
    ? `${greeting.trim() ? `${greeting.trim()}\n\n` : ""}Here’s your private SKAYL discovery form. It takes about ${minutes} minutes, saves as you go, and helps us prepare an accurate quote for you:\n\n${created.url}\n\nAny questions, just message us.`
    : "";

  const doCopy = async (what: "link" | "whatsapp") => {
    if (!created) return;
    if (await copy(what === "link" ? created.url : whatsapp)) {
      setCopied(what);
      setTimeout(() => setCopied(""), 2000);
    }
  };

  /* ── Created ── */
  if (created) {
    return (
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <InkPanel className="px-6 pb-10 pt-10 sm:px-10 md:px-12 md:pb-14 md:pt-14 lg:col-span-7">
          <Eyebrow tone="dark">Link created · {created.ref}</Eyebrow>
          <Headline className="mt-7 text-[3rem] text-cream md:text-[4.6rem]">Ready to send</Headline>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-cream/70">
            Copy it now. For security the full link is only shown once. If it ever gets lost, open the link’s page and create a new one.
          </p>
          <div className="mt-10 rounded-[20px] border border-cream/15 bg-cream/[0.06] p-2 pl-5">
            <div className="flex items-center gap-3">
              <input readOnly value={created.url} onFocus={(e) => e.currentTarget.select()} aria-label="Discovery link" className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-cream/85 outline-none" />
              <button
                type="button"
                onClick={() => doCopy("link")}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-cream px-5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white"
              >
                {copied === "link" ? (
                  <>
                    <Check /> Copied
                  </>
                ) : (
                  "Copy link"
                )}
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-[14px]">
            <Link href={`/admin/discovery/${created.id}`} className="text-cream underline decoration-cream/30 underline-offset-4 hover:decoration-cream">
              View this link
            </Link>
            <Link href="/admin/discovery" className="text-cream/70 underline decoration-cream/20 underline-offset-4 hover:text-cream">
              Back to all links
            </Link>
          </div>
        </InkPanel>
        <Card className="px-6 py-8 md:px-8 lg:col-span-5">
          <Eyebrow>WhatsApp message</Eyebrow>
          <pre dir="ltr" className="mt-5 whitespace-pre-wrap text-[15px] leading-relaxed text-ink/80" style={{ fontFamily: "inherit" }}>
            {whatsapp}
          </pre>
          <PillButton type="button" variant="ghost" onClick={() => doCopy("whatsapp")} className="mt-6 w-full">
            {copied === "whatsapp" ? "Copied" : "Copy message"}
          </PillButton>
        </Card>
      </div>
    );
  }

  /* ── Form ── */
  const sectionCount = sections.length;
  return (
    <form onSubmit={submit} noValidate>
      <Eyebrow>{defaults.duplicatedFrom ? `Duplicating ${defaults.duplicatedFrom}` : "Discovery"}</Eyebrow>
      <Headline className="mt-5 text-[3rem] md:text-[4.8rem]">New link</Headline>

      <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="flex flex-col gap-4 lg:col-span-7">
          {/* Client */}
          <Card className="px-6 py-7 md:px-9 md:py-9">
            <div className="flex items-baseline justify-between">
              <h2 className="display text-[1.5rem] leading-tight">Client</h2>
              <span className="text-[12px] tabular-nums text-ink/35">01</span>
            </div>
            <div className="mt-6 grid gap-7">
              <Labelled label="Client name" htmlFor="clientName">
                <input id="clientName" required value={clientName} onChange={(e) => setClientName(e.target.value)} className={cn(input, "h-12")} dir="auto" placeholder="e.g. Uncle Rizwan" />
              </Labelled>
              <div className="grid gap-7 sm:grid-cols-2">
                <Labelled label="Organisation" htmlFor="organisation">
                  <input id="organisation" value={organisation} onChange={(e) => setOrganisation(e.target.value)} className={cn(input, "h-12")} dir="auto" />
                </Labelled>
                <Labelled label="Client email (optional)" htmlFor="clientEmail" hint="Pre-fills their email in the form.">
                  <input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className={cn(input, "h-12")} />
                </Labelled>
              </div>
            </div>
          </Card>

          {/* Message */}
          <Card className="px-6 py-7 md:px-9 md:py-9">
            <div className="flex items-baseline justify-between">
              <h2 className="display text-[1.5rem] leading-tight">Personal note</h2>
              <span className="text-[12px] tabular-nums text-ink/35">02</span>
            </div>
            <div className="mt-6 grid gap-7">
              <Labelled label="Greeting" htmlFor="greeting" hint="For example: السلام عليكم ورحمة الله وبركاته Uncle,">
                <input id="greeting" value={greeting} onChange={(e) => setGreeting(e.target.value)} className={cn(input, "h-12")} dir="ltr" />
              </Labelled>
              <Labelled label="Message" htmlFor="introMessage" hint="Leave a blank line between paragraphs.">
                <textarea id="introMessage" rows={6} value={introMessage} onChange={(e) => setIntroMessage(e.target.value)} className={cn(box, "resize-y")} dir="auto" />
              </Labelled>
            </div>
          </Card>

          {/* Sections */}
          <Card className="px-6 py-7 md:px-9 md:py-9">
            <div className="flex items-baseline justify-between">
              <h2 className="display text-[1.5rem] leading-tight">Sections</h2>
              <span className="text-[12px] tabular-nums text-ink/35">03</span>
            </div>
            <p className="mt-2 text-[14px] text-muted">“Your details” and “Your choice” are always included.</p>
            <fieldset className="mt-6 flex flex-col gap-3">
              <legend className="sr-only">Sections</legend>
              {SELECTABLE_SECTIONS.map((id) => {
                const on = sections.includes(id);
                return (
                  <div key={id} className={cn("overflow-hidden rounded-[20px] border transition-colors duration-300", on ? "border-ink bg-cream" : "border-ink/15 bg-cream/50")}>
                    <label className="flex min-h-[64px] cursor-pointer items-center gap-4 px-5">
                      <input type="checkbox" checked={on} onChange={() => toggleSection(id)} className="peer sr-only" />
                      <span
                        aria-hidden
                        className={cn(
                          "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                          on ? "border-ink bg-ink text-cream" : "border-ink/25"
                        )}
                      >
                        {on && <Check />}
                      </span>
                      <span className="flex-1 text-[16.5px] text-ink">{SECTIONS[id].title}</span>
                      <span className="text-[12px] text-muted">~{SECTIONS[id].minutes} min</span>
                    </label>
                    {on && (
                      <details className="group border-t border-line px-5">
                        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[13.5px] text-muted hover:text-ink">
                          Customise this section
                          <span aria-hidden className="transition-transform duration-300 group-open:rotate-45">+</span>
                        </summary>
                        <div className="flex flex-col gap-6 pb-6 pt-1">
                          <Labelled label="Intro text" htmlFor={`intro-${id}`}>
                            <textarea id={`intro-${id}`} rows={4} value={intros[id]} onChange={(e) => setIntros((s) => ({ ...s, [id]: e.target.value }))} className={cn(box, "resize-y")} />
                          </Labelled>

                          {id === "website" && (
                            <Labelled label="Areas to improve (one per line)" htmlFor="areas">
                              <Presets presets={WEBSITE_AREA_PRESETS} onPick={(k) => setAreas(WEBSITE_AREA_PRESETS[k].options.join("\n"))} />
                              <textarea id="areas" rows={8} value={areas} onChange={(e) => setAreas(e.target.value)} className={cn(box, "resize-y")} />
                            </Labelled>
                          )}

                          {id === "design" && (
                            <>
                              <div className="flex flex-col gap-2">
                                <span className={labelCls}>Presets</span>
                                <Presets
                                  presets={RECURRING_PRESETS}
                                  onPick={(k) => {
                                    setRecurringLabel(RECURRING_PRESETS[k].question);
                                    setRecurringOptions(RECURRING_PRESETS[k].options.join("\n"));
                                  }}
                                />
                              </div>
                              <Labelled label="Recurring designs question" htmlFor="recurringLabel">
                                <input id="recurringLabel" value={recurringLabel} onChange={(e) => setRecurringLabel(e.target.value)} className={cn(input, "h-12 text-[15px]")} />
                              </Labelled>
                              <Labelled label="Answers (one per line)" htmlFor="recurringOptions">
                                <textarea id="recurringOptions" rows={4} value={recurringOptions} onChange={(e) => setRecurringOptions(e.target.value)} className={cn(box, "resize-y")} />
                              </Labelled>
                            </>
                          )}

                          {id === "app" && (
                            <>
                              <div className="flex flex-col gap-2">
                                <span className={labelCls}>Presets</span>
                                <Presets presets={AUDIENCE_PRESETS} onPick={(k) => setAudienceOptions(AUDIENCE_PRESETS[k].options.join("\n"))} />
                              </div>
                              <Labelled label="Who can use it: question" htmlFor="audienceLabel">
                                <input id="audienceLabel" value={audienceLabel} onChange={(e) => setAudienceLabel(e.target.value)} className={cn(input, "h-12 text-[15px]")} />
                              </Labelled>
                              <Labelled label="Answers (one per line)" htmlFor="audienceOptions">
                                <textarea id="audienceOptions" rows={4} value={audienceOptions} onChange={(e) => setAudienceOptions(e.target.value)} className={cn(box, "resize-y")} />
                              </Labelled>
                            </>
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </fieldset>
          </Card>

          {/* Expiry */}
          <Card className="px-6 py-7 md:px-9 md:py-9">
            <div className="flex items-baseline justify-between">
              <h2 className="display text-[1.5rem] leading-tight">Expiry</h2>
              <span className="text-[12px] tabular-nums text-ink/35">04</span>
            </div>
            <div className="mt-6 sm:max-w-[260px]">
              <Labelled label="Link works until" htmlFor="expiresAt">
                <input id="expiresAt" type="date" value={expiresAt} min={inDays(1)} onChange={(e) => setExpiresAt(e.target.value)} className={cn(input, "h-12")} />
              </Labelled>
            </div>
          </Card>
        </div>

        {/* Live preview */}
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-4 lg:sticky lg:top-[100px]">
            <InkPanel className="px-6 pb-8 pt-8 md:px-9 md:pb-10 md:pt-10">
              <Eyebrow tone="dark">What the client sees</Eyebrow>
              <p className="display mt-6 text-[2.1rem] leading-[0.95] text-cream md:text-[2.5rem]">
                Before we quote, let’s get it right<span className="text-orange">.</span>
              </p>
              {(greeting || introMessage) && (
                <div className="mt-6 border-l border-cream/15 pl-4">
                  {greeting && (
                    <p dir="ltr" className="text-[16px] text-cream">
                      {greeting}
                    </p>
                  )}
                  {introMessage && <p className="mt-2 line-clamp-4 whitespace-pre-line text-[14px] leading-relaxed text-cream/60">{introMessage}</p>}
                </div>
              )}
              <div className="mt-7 flex flex-wrap gap-2">
                {["Your details", ...sections.map((id) => SECTIONS[id].title), "Your choice"].map((t) => (
                  <span key={t} className="rounded-full border border-cream/20 px-3 py-1.5 text-[12px] text-cream/75">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-[13px] text-cream/55">
                About {minutes} minutes · {sectionCount} section{sectionCount === 1 ? "" : "s"} · works until{" "}
                {expiresAt ? new Date(`${expiresAt}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
              </p>
            </InkPanel>

            {error && (
              <p role="alert" className="px-2 text-[14px] text-[#B3380F]">
                {error}
              </p>
            )}
            <PillButton type="submit" disabled={pending} arrow={!pending} className="w-full">
              {pending ? "Creating…" : "Create link"}
            </PillButton>
            <Link href="/admin/discovery" className="mx-auto inline-flex min-h-11 items-center text-[13.5px] text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
