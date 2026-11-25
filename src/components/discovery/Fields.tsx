"use client";

import type { AnswerValue, ResolvedQuestion } from "@/lib/discovery/form";
import { cn } from "@/lib/utils";
import { Check } from "./ui";

export const ERROR_TEXT = "text-[#B3380F]"; // darker accent: AA contrast on cream

type FieldProps = {
  q: ResolvedQuestion;
  number: number;
  value: AnswerValue | undefined;
  error?: string;
  onChange: (value: AnswerValue) => void;
};

/* ── Shared label ─────────────────────────────────────────────────────────── */

function QuestionLabel({ q, number, htmlFor, as = "label" }: { q: ResolvedQuestion; number: number; htmlFor?: string; as?: "label" | "legend" }) {
  const Tag = as;
  return (
    <Tag {...(as === "label" ? { htmlFor } : {})} className="flex w-full items-baseline gap-3 p-0">
      <span className="w-6 shrink-0 text-[12px] tabular-nums text-ink/35">{String(number).padStart(2, "0")}</span>
      <span className="flex-1 text-[18px] font-medium leading-snug text-ink md:text-[19px]">
        {q.label}
        {!q.required && <span className="ml-2 whitespace-nowrap text-[13px] font-normal text-ink/35">Optional</span>}
      </span>
    </Tag>
  );
}

function Help({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="pl-9 text-[14.5px] leading-snug text-muted">
      {children}
    </p>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  return (
    <p id={id} role={children ? "alert" : undefined} className={cn("min-h-[1.25rem] pl-9 text-[13.5px] leading-5", ERROR_TEXT)}>
      {children}
    </p>
  );
}

/* ── Text inputs: the underline style from the site's contact form ────────── */

function TextInput({ q, number, value, error, onChange }: FieldProps) {
  const id = `f-${q.id}`;
  const v = typeof value === "string" ? value : "";
  const described = [q.help ? `${id}-help` : "", `${id}-err`].filter(Boolean).join(" ");
  const common = {
    id,
    name: q.id,
    value: v,
    placeholder: q.placeholder,
    autoComplete: q.autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-required": q.required || undefined,
    "aria-describedby": described,
    dir: "auto" as const,
  };
  const line = cn(
    "w-full border-0 border-b bg-transparent px-0 text-[18px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 focus:ring-0 md:text-[20px]",
    error ? "border-[#B3380F]" : "border-ink/20 hover:border-ink/45 focus:border-ink"
  );
  return (
    <div className="group flex flex-col gap-3" data-field={q.id}>
      <QuestionLabel q={q} number={number} htmlFor={id} />
      <Help id={`${id}-help`}>{q.help}</Help>
      <div className="pl-9">
        {q.type === "textarea" ? (
          <textarea
            {...common}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            className={cn(line, "min-h-[132px] resize-y pb-3 pt-2 leading-relaxed")}
          />
        ) : (
          <input
            {...common}
            type={q.type === "url" ? "text" : q.type}
            inputMode={q.type === "url" ? "url" : q.type === "email" ? "email" : q.type === "tel" ? "tel" : undefined}
            autoCapitalize={q.type === "email" || q.type === "url" ? "none" : undefined}
            autoCorrect={q.type === "email" || q.type === "url" ? "off" : undefined}
            spellCheck={q.type === "email" || q.type === "url" ? false : undefined}
            onChange={(e) => onChange(e.target.value)}
            className={cn(line, "h-12 pb-2 pt-1")}
          />
        )}
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </div>
  );
}

/* ── Choices ──────────────────────────────────────────────────────────────── */

function Indicator({ type, checked, onInk }: { type: "radio" | "checkbox"; checked: boolean; onInk?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-[22px] w-[22px] shrink-0 items-center justify-center border transition-colors duration-300",
        type === "radio" ? "rounded-full" : "rounded-[7px]",
        checked ? (onInk ? "border-cream bg-cream text-ink" : "border-ink bg-ink text-cream") : "border-ink/25 bg-transparent"
      )}
    >
      {checked && (type === "radio" ? <span className="h-2 w-2 rounded-full bg-ink" /> : <Check />)}
    </span>
  );
}

/** Long options: full-width rows. The chosen one turns ink. */
function OptionRow({
  type,
  name,
  option,
  checked,
  onToggle,
  recommended,
  invalid,
  describedBy,
}: {
  type: "radio" | "checkbox";
  name: string;
  option: string;
  checked: boolean;
  onToggle: () => void;
  recommended?: boolean;
  invalid?: boolean;
  describedBy: string;
}) {
  return (
    <label className="relative block cursor-pointer select-none">
      <input type={type} name={name} value={option} checked={checked} onChange={onToggle} aria-describedby={describedBy} aria-invalid={invalid || undefined} className="peer sr-only" />
      <span
        className={cn(
          "flex min-h-[60px] items-center gap-4 rounded-[18px] border px-5 py-4 text-[16.5px] leading-snug transition-[background-color,border-color,color] duration-300 ease-skayl-out",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
          checked ? "border-ink bg-ink text-cream" : "border-ink/10 bg-[#FBF8F0] text-ink hover:border-ink/40",
          invalid && !checked && "border-[#B3380F]/45"
        )}
      >
        <Indicator type={type} checked={checked} onInk />
        <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1.5">
          {option}
          {recommended && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-[3px] text-[10px] font-medium uppercase tracking-[0.16em]",
                checked ? "border-cream/35 text-cream/85" : "border-ink/20 text-ink/70"
              )}
            >
              Recommended
            </span>
          )}
        </span>
      </span>
    </label>
  );
}

/** Short options: pills that wrap, like the contact form. */
function OptionPill({
  type,
  name,
  option,
  checked,
  onToggle,
  invalid,
  describedBy,
}: {
  type: "radio" | "checkbox";
  name: string;
  option: string;
  checked: boolean;
  onToggle: () => void;
  invalid?: boolean;
  describedBy: string;
}) {
  return (
    <label className="relative cursor-pointer select-none">
      <input type={type} name={name} value={option} checked={checked} onChange={onToggle} aria-describedby={describedBy} aria-invalid={invalid || undefined} className="peer sr-only" />
      <span
        className={cn(
          "flex min-h-[48px] items-center gap-2.5 rounded-full border px-5 text-[15px] leading-none transition-[background-color,border-color,color] duration-300 ease-skayl-out",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
          checked ? "border-ink bg-ink text-cream" : "border-ink/15 bg-[#FBF8F0] text-ink/80 hover:border-ink/45 hover:text-ink",
          invalid && !checked && "border-[#B3380F]/45"
        )}
      >
        {type === "checkbox" && (
          <span
            aria-hidden
            className={cn("-ml-1 flex h-4 w-4 items-center justify-center transition-[width,opacity] duration-300", checked ? "opacity-100" : "w-0 opacity-0")}
          >
            <Check />
          </span>
        )}
        {option}
      </span>
    </label>
  );
}

function ChoiceGroup({ q, number, value, error, onChange }: FieldProps) {
  const id = `f-${q.id}`;
  const isCheckbox = q.type === "checkbox";
  const selected = Array.isArray(value) ? value : [];
  const current = typeof value === "string" ? value : "";
  const described = [q.help ? `${id}-help` : "", `${id}-err`].filter(Boolean).join(" ");
  const usePills = !q.recommended && q.options.every((o) => o.length <= 24);

  const toggle = (option: string) => {
    if (!isCheckbox) return onChange(option);
    if (selected.includes(option)) return onChange(selected.filter((o) => o !== option));
    const exclusive = q.exclusive ?? [];
    if (exclusive.includes(option)) return onChange([option]);
    return onChange([...selected.filter((o) => !exclusive.includes(o)), option]);
  };

  return (
    <fieldset className="flex min-w-0 flex-col gap-3" data-field={q.id} aria-describedby={described} aria-required={q.required || undefined}>
      <QuestionLabel q={q} number={number} as="legend" />
      <Help id={`${id}-help`}>{q.help}</Help>
      <div className={cn("pl-9 pt-1", usePills ? "flex flex-wrap gap-2" : "grid gap-2")}>
        {q.options.map((option) => {
          const checked = isCheckbox ? selected.includes(option) : current === option;
          const shared = { type: (isCheckbox ? "checkbox" : "radio") as "checkbox" | "radio", name: q.id, option, checked, onToggle: () => toggle(option), invalid: !!error, describedBy: described };
          return usePills ? <OptionPill key={option} {...shared} /> : <OptionRow key={option} {...shared} recommended={q.recommended === option} />;
        })}
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </fieldset>
  );
}

export function Field(props: FieldProps) {
  return props.q.type === "radio" || props.q.type === "checkbox" ? <ChoiceGroup {...props} /> : <TextInput {...props} />;
}
