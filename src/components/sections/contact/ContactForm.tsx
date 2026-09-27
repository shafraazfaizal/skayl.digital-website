"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { budgetOptions, contact, serviceOptions, timelineOptions, type Currency } from "@/content/contact";
import { MESSAGE_MIN, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact-validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: ContactInput = { name: "", email: "", services: [], timeline: "", currency: "GBP", budget: "", message: "" };
const ERROR_TEXT = "text-[#B3380F]"; // darker accent: AA contrast on cream

/* ——— small building blocks ——— */

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: ReactNode; optional?: boolean }) {
  const cls = "text-[11px] uppercase tracking-[0.24em] text-muted transition-colors duration-300 group-focus-within:text-ink";
  const inner = (
    <>
      {children}
      {optional && <span className="ml-2 normal-case tracking-normal text-ink/35">(optional)</span>}
    </>
  );
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {inner}
    </label>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  return (
    <p id={id} className={cn("min-h-[1.25rem] text-[13px] leading-5", ERROR_TEXT)}>
      {children}
    </p>
  );
}

function Pill({
  type,
  name,
  value,
  checked,
  onChange,
  describedBy,
  invalid,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  describedBy?: string;
  invalid?: boolean;
}) {
  return (
    <label className="relative cursor-pointer select-none">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] leading-none transition-[background-color,border-color,color] duration-300 ease-skayl-out",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
          checked ? "border-orange bg-orange/[0.12] text-ink" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink",
          invalid && !checked && "border-[#B3380F]/50"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full bg-orange transition-[transform,opacity] duration-300 ease-skayl-out",
            checked ? "scale-100 opacity-100" : "-ml-3.5 scale-0 opacity-0"
          )}
        />
        {value}
      </span>
    </label>
  );
}

/* ——— the form ——— */

export default function ContactForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [v, setV] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Start the clock for the spam check, and default to LKR for visitors in Sri Lanka.
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Colombo") setV((p) => ({ ...p, currency: "LKR" }));
    } catch {}
  }, []);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof ContactInput>(k: K, val: ContactInput[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (attempted || touched[k as string]) setErrors(validateContact(next));
  };

  const blur = (k: string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const all = validateContact(v);
    setErrors((e) => ({ ...e, [k]: all[k as keyof ContactErrors] }));
  };

  const toggleService = (s: string) =>
    set("services", v.services.includes(s) ? v.services.filter((x) => x !== s) : [...v.services, s]);

  const setCurrency = (c: Currency) => setV((p) => ({ ...p, currency: c, budget: "" }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    setServerError("");
    const errs = validateContact(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      const first = (["name", "email", "services", "message"] as const).find((k) => errs[k]);
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`);
      el?.focus();
      return;
    }

    setStatus("sending");
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, website: honeypot, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(res.status === 429 && json.error ? json.error : "Something went wrong. Please try again.");
      }
      setSentTo(v.email.trim());
      setStatus("sent");
      setV((p) => ({ ...EMPTY, currency: p.currency }));
      setTouched({});
      setAttempted(false);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const reset = () => {
    setStatus("idle");
    startedAt.current = Date.now();
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus());
  };

  const inputCls = (invalid?: string) =>
    cn(
      "w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-[17px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/30",
      "focus:ring-0 focus-visible:border-ink",
      invalid ? "border-[#B3380F]" : "border-ink/20 hover:border-ink/40 focus:border-ink"
    );

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex min-h-[520px] flex-col justify-between gap-12 border-t border-ink pt-8 outline-none"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col gap-6">
          <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange" />
            Thank you
          </span>
          <p className="display text-5xl leading-[0.95] md:text-6xl">
            Message sent <span className="text-orange">→</span>
            <br />
            <span className="text-ink/35">We’ll be in touch.</span>
          </p>
          <p className="max-w-md text-[17px] leading-relaxed text-muted">
            A confirmation is on its way to <span className="text-ink">{sentTo}</span>. {contact.replyTime}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="w-fit border-b border-ink/25 pb-1 text-sm transition-colors hover:border-orange hover:text-orange"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={sending} className="flex flex-col" aria-describedby={id("reply")}>
      <div data-ct="fields" className="flex flex-col gap-7">
        {/* name + email */}
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div data-field="name" className="group flex flex-col gap-1">
            <Label htmlFor={id("name")}>Your name</Label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              placeholder="Jane Doe"
              value={v.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-invalid={!!errors.name || undefined}
              aria-describedby={id("name-err")}
              aria-required
              className={inputCls(errors.name)}
            />
            <FieldError id={id("name-err")}>{errors.name}</FieldError>
          </div>
          <div data-field="email" className="group flex flex-col gap-1">
            <Label htmlFor={id("email")}>Email</Label>
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={v.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={!!errors.email || undefined}
              aria-describedby={id("email-err")}
              aria-required
              className={inputCls(errors.email)}
            />
            <FieldError id={id("email-err")}>{errors.email}</FieldError>
          </div>
        </div>

        {/* what do you need */}
        <fieldset data-field="services" className="group flex flex-col gap-3" aria-describedby={id("services-err")}>
          <legend className="mb-3 p-0">
            <Label>What do you need?</Label>
          </legend>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((s) => (
              <Pill
                key={s}
                type="checkbox"
                name="services"
                value={s}
                checked={v.services.includes(s)}
                onChange={() => toggleService(s)}
                describedBy={id("services-err")}
                invalid={!!errors.services}
              />
            ))}
          </div>
          <FieldError id={id("services-err")}>{errors.services}</FieldError>
        </fieldset>

        {/* the project */}
        <div data-field="message" className="group flex flex-col gap-1">
          <Label htmlFor={id("message")}>Tell us about the project</Label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            placeholder="What are you building, where are you at with it, and when do you need it?"
            value={v.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!errors.message || undefined}
            aria-describedby={`${id("message-err")} ${id("message-hint")}`}
            aria-required
            className={cn(inputCls(errors.message), "min-h-[150px] resize-none leading-relaxed")}
          />
          <div className="flex items-start justify-between gap-4">
            <FieldError id={id("message-err")}>{errors.message}</FieldError>
            <span id={id("message-hint")} className="shrink-0 pt-0.5 text-[11px] tabular-nums text-ink/35">
              {v.message.trim().length < MESSAGE_MIN ? `${v.message.trim().length} / ${MESSAGE_MIN} min` : "✓"}
            </span>
          </div>
        </div>

        {/* optional qualification */}
        <div className="flex flex-col gap-7 border-t border-line pt-7">
          <fieldset className="group flex flex-col gap-3">
            <legend className="mb-3 p-0">
              <Label optional>Timeline</Label>
            </legend>
            <div className="flex flex-wrap gap-2">
              {timelineOptions.map((t) => (
                <Pill key={t} type="radio" name="timeline" value={t} checked={v.timeline === t} onChange={() => set("timeline", t)} />
              ))}
            </div>
          </fieldset>
          <fieldset className="group flex flex-col gap-3">
            <legend className="sr-only">Budget (optional)</legend>
            <div className="mb-3 flex items-center justify-between gap-4">
              <Label optional>Budget</Label>
              <div role="radiogroup" aria-label="Currency" className="flex gap-4 text-[11px] uppercase tracking-[0.2em]">
                {(["GBP", "LKR"] as Currency[]).map((c) => (
                  <label key={c} className="relative cursor-pointer">
                    <input type="radio" name="currency" value={c} checked={v.currency === c} onChange={() => setCurrency(c)} className="peer sr-only" />
                    <span
                      className={cn(
                        "border-b pb-0.5 transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                        v.currency === c ? "border-orange text-ink" : "border-transparent text-ink/40 hover:text-ink/70"
                      )}
                    >
                      {c}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {budgetOptions[v.currency].map((b) => (
                <Pill key={b} type="radio" name="budget" value={b} checked={v.budget === b} onChange={() => set("budget", b)} />
              ))}
            </div>
          </fieldset>
        </div>

        {/* honeypot — hidden from people and assistive tech */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave this empty
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
      </div>

      <div data-ct="submit" className="mt-10 flex flex-col gap-4">
        <div aria-live="assertive" role="alert" className={cn("text-[14px]", ERROR_TEXT, !serverError && "sr-only")}>
          {status === "error" ? serverError : ""}
        </div>
        <button
          type="submit"
          disabled={sending}
          className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-ink text-[12px] font-medium uppercase tracking-[0.24em] text-cream transition-[transform,background-color] duration-500 ease-skayl-out hover:bg-[#241616] active:scale-[0.99] disabled:cursor-wait focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {sending ? (
            <span className="flex items-center gap-3">
              Sending
              <span aria-hidden className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1 w-1 animate-pulse rounded-full bg-cream" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </span>
            </span>
          ) : (
            <span className="relative block h-5 overflow-hidden">
              <span className="flex flex-col transition-transform duration-500 ease-skayl-out group-hover:-translate-y-1/2 motion-reduce:transition-none">
                <span className="flex h-5 items-center justify-center gap-2">
                  Send it <span aria-hidden>→</span>
                </span>
                <span aria-hidden className="flex h-5 items-center justify-center gap-2">
                  Let’s talk <span className="text-orange">→</span>
                </span>
              </span>
            </span>
          )}
        </button>
        <p id={id("reply")} className="flex items-center justify-center gap-2 text-[12px] text-muted">
          {contact.replyTime} A confirmation lands in your inbox straight away.
        </p>
        <span className="sr-only" aria-live="polite">
          {sending ? "Sending your message…" : ""}
        </span>
      </div>
    </form>
  );
}
