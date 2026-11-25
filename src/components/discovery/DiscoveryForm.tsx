"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  estimateMinutes,
  firstName,
  formatAnswer,
  isVisible,
  validateAll,
  validateSection,
  type AnswerValue,
  type Answers,
  type FieldErrors,
  type ResolvedSection,
} from "@/lib/discovery/form";
import { cn } from "@/lib/utils";
import { AppComparison, AppPath, DesignFormats, ScopeScale } from "./Diagrams";
import { ERROR_TEXT, Field } from "./Fields";
import LinkMessage from "./LinkMessage";
import { ArrowLeft, Card, Check, CircleButton, Eyebrow, Headline, InkPanel, PillButton } from "./ui";
import Wordmark from "./Wordmark";
import { PHONE_LK, PHONE_UK, SKAYL_EMAIL } from "@/lib/discovery/site";

const NAV_LABEL: Record<string, string> = { details: "Details", website: "Website", design: "Design", app: "App", choice: "Choice" };

type Props = {
  token: string;
  reference: string;
  clientName: string;
  greeting: string;
  introMessage: string;
  form: ResolvedSection[];
  initialAnswers: Answers;
  clientEmail: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";
type Closed = "submitted" | "expired" | "revoked" | "invalid" | null;

const WELCOME = -1;

export default function DiscoveryForm({ token, reference, greeting, introMessage, form, initialAnswers, clientEmail }: Props) {
  const reduceMotion = useReducedMotion();
  const sectionCount = form.length;
  const REVIEW = sectionCount;
  const THANKS = sectionCount + 1;

  const [stage, setStage] = useState(WELCOME);
  const [answers, setAnswers] = useState<Answers>(() => {
    const a = { ...initialAnswers };
    if (!a.details_email && clientEmail) a.details_email = clientEmail;
    return a;
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [returnToReview, setReturnToReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [closed, setClosed] = useState<Closed>(null);
  const [thanks, setThanks] = useState<{ email: string; emailSent: boolean }>({ email: "", emailSent: true });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const answersRef = useRef(answers);
  const dirty = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigated = useRef(false);

  /* ── Autosave ───────────────────────────────────────────────────────────── */

  const flush = useCallback(
    async (keepalive = false) => {
      if (timer.current) clearTimeout(timer.current);
      if (!dirty.current) return;
      dirty.current = false;
      setSaveState("saving");
      try {
        const res = await fetch("/api/discovery/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, answers: answersRef.current }),
          keepalive,
        });
        if (res.status === 410) {
          const json = await res.json().catch(() => ({}));
          setClosed((json.state as Closed) ?? "expired");
          return;
        }
        if (res.status === 404) return setClosed("invalid");
        if (!res.ok) throw new Error(String(res.status));
        setSaveState("saved");
      } catch {
        dirty.current = true;
        setSaveState("error");
        timer.current = setTimeout(() => void flush(), 5000);
      }
    },
    [token]
  );

  const queueSave = useCallback(() => {
    dirty.current = true;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void flush(), 1000);
  }, [flush]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") void flush(true);
    };
    const onPageHide = () => void flush(true);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [flush]);

  const update = (id: string, value: AnswerValue) => {
    const next = { ...answersRef.current, [id]: value };
    answersRef.current = next;
    setAnswers(next);
    if (errors[id]) setErrors((e) => {
      const { [id]: _, ...rest } = e;
      return rest;
    });
    queueSave();
  };

  /* ── Navigation ─────────────────────────────────────────────────────────── */

  const goTo = (to: number) => {
    navigated.current = true;
    setErrors({});
    setSubmitError("");
    setStage(to);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (navigated.current) headingRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  const next = () => {
    if (stage === WELCOME) return goTo(0);
    if (stage >= 0 && stage < sectionCount) {
      const errs = validateSection(form[stage], answersRef.current);
      if (Object.keys(errs).length) {
        setErrors(errs);
        focusFirstError(errs);
        return;
      }
      void flush();
      if (returnToReview) {
        setReturnToReview(false);
        return goTo(REVIEW);
      }
      return goTo(stage + 1);
    }
  };

  const back = () => {
    if (returnToReview && stage < sectionCount) {
      setReturnToReview(false);
      return goTo(REVIEW);
    }
    goTo(Math.max(WELCOME, stage - 1));
  };

  const edit = (index: number) => {
    setReturnToReview(true);
    goTo(index);
  };

  /* ── Submit ─────────────────────────────────────────────────────────────── */

  const submit = async () => {
    if (submitting) return;
    const { errors: errs, firstSection } = validateAll(form, answersRef.current);
    if (Object.keys(errs).length) {
      const index = form.findIndex((s) => s.id === firstSection);
      setReturnToReview(true);
      goTo(index < 0 ? 0 : index);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    if (timer.current) clearTimeout(timer.current);
    dirty.current = false;
    try {
      const res = await fetch("/api/discovery/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answers: answersRef.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        const email = (json.email as string) || (typeof answersRef.current.details_email === "string" ? answersRef.current.details_email : "");
        setThanks({ email, emailSent: json.already ? true : json.emailSent !== false });
        goTo(THANKS);
        return;
      }
      if (res.status === 422 && json.errors) {
        const index = form.findIndex((s) => s.id === json.section);
        setReturnToReview(true);
        goTo(index < 0 ? 0 : index);
        setErrors(json.errors);
        focusFirstError(json.errors);
        return;
      }
      if (res.status === 410) return setClosed((json.state as Closed) ?? "expired");
      if (res.status === 404) return setClosed("invalid");
      setSubmitError(json.error || "Something went wrong. Please try again.");
    } catch {
      setSubmitError("We couldn’t reach the server. Check your connection and try again. Your answers are saved.");
    } finally {
      setSubmitting(false);
    }
  };

  if (closed) return <LinkMessage kind={closed === "invalid" ? "invalid" : closed} />;

  /* ── Render ─────────────────────────────────────────────────────────────── */

  const motionProps = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      };

  const totalSteps = sectionCount + 1; // sections + review
  const stepNumber = Math.min(stage + 1, totalSteps);
  const inSteps = stage >= 0 && stage <= REVIEW;
  const hasProgress = Object.keys(initialAnswers).length > 0;
  const navItems = [...form.map((s) => NAV_LABEL[s.id] ?? s.title), "Review"];

  let content: ReactNode;
  if (stage === WELCOME) {
    content = (
      <Welcome reference={reference} greeting={greeting} introMessage={introMessage} minutes={estimateMinutes(form)} headingRef={headingRef} />
    );
  } else if (stage >= 0 && stage < sectionCount) {
    const section = form[stage];
    let n = 0;
    content = (
      <form
        id="step-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <SectionStep section={section} headingRef={headingRef} answers={answers}>
          {section.questions
            .filter((q) => isVisible(q, answers))
            .map((q) => (
              <Field key={q.id} q={q} number={++n} value={answers[q.id]} error={errors[q.id]} onChange={(v) => update(q.id, v)} />
            ))}
        </SectionStep>
      </form>
    );
  } else if (stage === REVIEW) {
    content = <Review form={form} answers={answers} onEdit={edit} headingRef={headingRef} />;
  } else {
    content = (
      <Thanks
        reference={reference}
        name={firstName(typeof answers.details_name === "string" ? answers.details_name : "")}
        {...thanks}
        headingRef={headingRef}
      />
    );
  }

  const nextLabel =
    stage === WELCOME ? (hasProgress ? "Continue" : "Let’s begin") : returnToReview ? "Back to review" : stage === sectionCount - 1 ? "Review answers" : "Next";

  return (
    <div className="flex min-h-[100svh] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-6 px-5 md:px-10">
          <Wordmark width={70} />

          {inSteps && (
            <ol className="hidden items-center gap-1 lg:flex" aria-label="Steps">
              {navItems.map((label, i) => {
                const done = i < stage;
                const active = i === stage;
                return (
                  <li key={label} className="flex items-center gap-1">
                    <span
                      aria-current={active ? "step" : undefined}
                      className={cn(
                        "flex h-8 items-center gap-2 rounded-full px-3 text-[12.5px] transition-colors duration-300",
                        active ? "bg-ink text-cream" : done ? "text-ink" : "text-ink/35"
                      )}
                    >
                      {done ? <Check className="h-3 w-3" /> : <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>}
                      {label}
                    </span>
                    {i < navItems.length - 1 && <span aria-hidden className={cn("h-px w-4", done ? "bg-ink/40" : "bg-ink/15")} />}
                  </li>
                );
              })}
            </ol>
          )}

          <div className="flex items-center gap-4 text-[12.5px]">
            {inSteps && (
              <span aria-live="polite" className="hidden items-center gap-2 text-muted sm:flex">
                {saveState === "saving" && "Saving…"}
                {saveState === "saved" && (
                  <>
                    <Check className="h-3 w-3 text-ink" /> Saved
                  </>
                )}
                {saveState === "error" && <span className={ERROR_TEXT}>Not saved yet, retrying</span>}
              </span>
            )}
            {inSteps && (
              <span className="tabular-nums text-ink lg:hidden">
                {String(stepNumber).padStart(2, "0")}
                <span className="text-ink/35"> / {String(totalSteps).padStart(2, "0")}</span>
              </span>
            )}
          </div>
        </div>
        {inSteps && (
          <div className="h-[2px] w-full bg-ink/[0.06]" role="progressbar" aria-label="Progress" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={stepNumber}>
            <div className="h-full bg-ink transition-[width] duration-700 ease-skayl-out motion-reduce:transition-none" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
          </div>
        )}
      </header>

      <main className={cn("mx-auto w-full max-w-[1240px] flex-1 px-4 pt-5 sm:px-5 md:px-10 md:pt-10", stage === THANKS ? "pb-16" : "pb-40")}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={stage} {...motionProps}>
            {content}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom bar */}
      {stage !== THANKS && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[1240px] items-center gap-3 px-4 py-3 sm:px-5 md:px-10">
            <p className="hidden flex-1 text-[13px] text-muted md:block">
              {submitError ? (
                <span role="alert" className={ERROR_TEXT}>
                  {submitError}
                </span>
              ) : stage === REVIEW ? (
                "Once you submit, we’ll email you a PDF copy of your answers."
              ) : (
                "Your answers save as you go. You can come back to this link any time."
              )}
            </p>
            {stage !== WELCOME && (
              <CircleButton label={returnToReview && stage < sectionCount ? "Back to review" : "Back"} onClick={back} disabled={submitting}>
                <ArrowLeft />
              </CircleButton>
            )}
            {stage === REVIEW ? (
              <PillButton type="button" onClick={submit} disabled={submitting} aria-busy={submitting} arrow={!submitting} className="flex-1 md:min-w-[240px] md:flex-none">
                {submitting ? "Submitting…" : "Submit answers"}
              </PillButton>
            ) : (
              <PillButton
                type={stage === WELCOME ? "button" : "submit"}
                form={stage === WELCOME ? undefined : "step-form"}
                onClick={stage === WELCOME ? next : undefined}
                arrow
                className="flex-1 md:min-w-[240px] md:flex-none"
              >
                {nextLabel}
              </PillButton>
            )}
          </div>
          {submitError && (
            <p role="alert" className={cn("px-5 pb-3 text-[13.5px] md:hidden", ERROR_TEXT)}>
              {submitError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Pieces ───────────────────────────────────────────────────────────────── */

function Paragraphs({ text, className }: { text: string; className?: string }) {
  const parts = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {parts.map((p, i) => (
        <p key={i} dir="auto" className="whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}

type HeadingRef = React.RefObject<HTMLHeadingElement | null>;

function Welcome({ reference, greeting, introMessage, minutes, headingRef }: { reference: string; greeting: string; introMessage: string; minutes: number; headingRef: HeadingRef }) {
  const hasNote = !!(greeting || introMessage);
  const steps = ["Read", "Answer", "Review", "Submit", "Your quote"];
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <InkPanel className="px-6 pb-8 pt-10 sm:px-10 md:px-14 md:pb-14 md:pt-16">
        <Eyebrow tone="dark">Discovery · {reference}</Eyebrow>
        <Headline headingRef={headingRef} className="mt-7 max-w-[12ch] text-[2.9rem] text-cream sm:text-[4rem] md:mt-9 md:text-[5.6rem] lg:text-[6.6rem]">
          Before we quote, let’s get it right
        </Headline>
        <div className="mt-10 flex flex-wrap gap-2 md:mt-14">
          {[`About ${minutes} minutes`, "Saves as you go", "Private to you"].map((chip) => (
            <span key={chip} className="flex h-9 items-center rounded-full border border-cream/20 px-4 text-[13px] text-cream/80">
              {chip}
            </span>
          ))}
        </div>
      </InkPanel>

      <div className="grid gap-4 md:grid-cols-12 md:gap-5">
        {hasNote && (
          <Card className="px-6 py-8 sm:px-8 md:col-span-7 md:px-10 md:py-10">
            <Eyebrow>A note from us</Eyebrow>
            {greeting && (
              <p dir="ltr" className="display mt-6 text-[1.7rem] leading-[1.15] md:text-[2.1rem]" style={{ fontFamily: "var(--font-display), var(--font-arabic), sans-serif" }}>
                {greeting}
              </p>
            )}
            {introMessage && <Paragraphs text={introMessage} className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-muted" />}
          </Card>
        )}
        <Card className={cn("px-6 py-8 sm:px-8 md:px-10 md:py-10", hasNote ? "md:col-span-5" : "md:col-span-12")}>
          <Eyebrow>How this works</Eyebrow>
          <ol className={cn("mt-6", !hasNote && "md:grid md:grid-cols-5 md:gap-4")}>
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={s} className={cn("flex items-center gap-4 border-t border-line py-3.5", !hasNote && "md:flex-col md:items-start md:gap-6 md:py-5")}>
                  <span className="w-7 text-[12px] tabular-nums text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("text-[17px]", last ? "font-medium text-ink" : "text-ink/80")}>{s}</span>
                  {last && <span className="ml-auto h-2 w-2 rounded-full bg-ink" aria-hidden />}
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </div>
  );
}

function SectionStep({ section, headingRef, answers, children }: { section: ResolvedSection; headingRef: HeadingRef; answers: Answers; children: ReactNode }) {
  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-20">
      <div className="md:col-span-5 md:self-start md:sticky md:top-[110px]">
        <Eyebrow>{section.title}</Eyebrow>
        <Headline headingRef={headingRef} className="mt-5 text-[2.7rem] sm:text-[3.4rem] md:text-[3.6rem] lg:text-[4.4rem]">
          {section.heading}
        </Headline>
        <Paragraphs text={section.intro} className="mt-6 text-[17px] leading-relaxed text-muted" />

        {section.visual === "scope" && (
          <div className="mt-8">
            <ScopeScale selected={typeof answers.website_scope === "string" ? answers.website_scope : undefined} />
          </div>
        )}
        {section.visual === "formats" && (
          <div className="mt-8">
            <DesignFormats />
          </div>
        )}
        {section.visual === "app" && (
          <div className="mt-8 flex flex-col gap-3">
            <AppPath />
            <AppComparison />
          </div>
        )}
      </div>

      <div className="md:col-span-7">
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div key={i} className="py-8 md:py-10">
                  {child}
                </div>
              ))
            : children}
        </div>
      </div>
    </div>
  );
}

function Review({ form, answers, onEdit, headingRef }: { form: ResolvedSection[]; answers: Answers; onEdit: (index: number) => void; headingRef: HeadingRef }) {
  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-20">
      <div className="md:col-span-4 md:self-start md:sticky md:top-[110px]">
        <Eyebrow>Final step</Eyebrow>
        <Headline headingRef={headingRef} className="mt-5 text-[2.7rem] sm:text-[3.4rem] md:text-[3.4rem] lg:text-[4.2rem]">
          Check your answers
        </Headline>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">Have a quick look through. You can edit any section before you submit.</p>
        <p className="mt-8 border-t border-line pt-6 text-[13.5px] leading-relaxed text-muted">
          We use your answers only to prepare your quote and to contact you about this project. You can ask us to delete them at any time:{" "}
          <a href={`mailto:${SKAYL_EMAIL}`} className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
            {SKAYL_EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col gap-4 md:col-span-8">
        {form.map((section, i) => (
          <Card key={section.id} className="px-5 py-6 sm:px-7 md:px-9 md:py-8">
            <section aria-labelledby={`review-${section.id}`}>
              <div className="flex items-center justify-between gap-4">
                <h2 id={`review-${section.id}`} className="display flex items-baseline gap-3 text-[22px] leading-tight md:text-[26px]">
                  <span className="font-sans text-[12px] tabular-nums text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="inline-flex h-10 shrink-0 items-center rounded-full border border-ink/15 px-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Edit<span className="sr-only"> {section.title}</span>
                </button>
              </div>
              <dl className="mt-5">
                {section.questions
                  .filter((q) => isVisible(q, answers))
                  .map((q) => {
                    const value = formatAnswer(answers[q.id]);
                    return (
                      <div key={q.id} className="grid gap-1 border-t border-line py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
                        <dt className="text-[14px] leading-snug text-muted">{q.label}</dt>
                        <dd dir="auto" className={cn("whitespace-pre-line text-[16px] leading-relaxed", value ? "text-ink" : "text-ink/35")}>
                          {value ?? "Not answered"}
                        </dd>
                      </div>
                    );
                  })}
              </dl>
            </section>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Thanks({ reference, name, email, emailSent, headingRef }: { reference: string; name: string; email: string; emailSent: boolean; headingRef: HeadingRef }) {
  const steps = ["We review your answers", "We reply within 24 hours", "A free 30-minute call", "A clear, itemised quote"];
  return (
    <div role="status" className="flex flex-col gap-4 md:gap-5">
      <InkPanel className="px-6 pb-10 pt-10 sm:px-10 md:px-14 md:pb-16 md:pt-16">
        <Eyebrow tone="dark">Submitted · {reference}</Eyebrow>
        <Headline headingRef={headingRef} className="mt-7 max-w-[14ch] text-[2.9rem] text-cream sm:text-[4rem] md:mt-9 md:text-[5.6rem] lg:text-[6.4rem]">
          {`Thank you${name ? `, ${name}` : ""}`}
        </Headline>
        <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-cream/70 md:text-[19px]">
          {email ? (
            emailSent ? (
              <>
                Your answers are with us, and a PDF copy is on its way to <span className="text-cream">{email}</span>.
              </>
            ) : (
              <>
                Your answers are safely with us. We’ll email a PDF copy to <span className="text-cream">{email}</span> shortly.
              </>
            )
          ) : (
            "Your answers are safely with us."
          )}
        </p>
      </InkPanel>

      <Card className="px-6 py-8 sm:px-8 md:px-10 md:py-10">
        <Eyebrow>What happens next</Eyebrow>
        <ol className="mt-6 grid gap-0 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="flex items-baseline gap-4 border-t border-line py-4 sm:flex-col sm:gap-6 sm:py-6">
              <span className="display text-[2rem] leading-none text-ink/20 md:text-[2.6rem]">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[17px] leading-snug text-ink">{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-col gap-1 px-2 pt-4 text-[15px] text-muted md:flex-row md:items-center md:gap-8">
        <span>Questions in the meantime?</span>
        <a href={`mailto:${SKAYL_EMAIL}`} className="flex min-h-11 items-center text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          {SKAYL_EMAIL}
        </a>
        <a href={`tel:${PHONE_UK.replace(/\s/g, "")}`} className="flex min-h-11 items-center text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          UK {PHONE_UK}
        </a>
        <a href={`tel:${PHONE_LK.replace(/\s/g, "")}`} className="flex min-h-11 items-center text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          Sri Lanka {PHONE_LK}
        </a>
      </div>
    </div>
  );
}
