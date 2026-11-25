// Small brand diagrams for the Discovery form, built in HTML/SVG (no images).
// Ink and cream do the work; orange is kept for the one moment per screen.

import { cn } from "@/lib/utils";

/* ── A row of steps (vertical on phones) ──────────────────────────────────── */

export function StepFlow({ steps, highlightLast = true, label }: { steps: string[]; highlightLast?: boolean; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-0 sm:grid-flow-col sm:auto-cols-fr">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const strong = highlightLast && last;
        return (
          <li key={step} className="relative flex items-center gap-4 py-2.5 sm:flex-col sm:items-start sm:gap-3 sm:py-0">
            {/* connector */}
            {!last && (
              <span
                aria-hidden
                className="absolute left-[15px] top-[42px] h-[calc(100%-28px)] w-px bg-ink/15 sm:left-[40px] sm:top-[15px] sm:h-px sm:w-[calc(100%-36px)]"
              />
            )}
            <span
              className={cn(
                "relative z-[1] flex h-[30px] min-w-[30px] items-center justify-center rounded-full border text-[11px] tabular-nums",
                strong ? "border-ink bg-ink text-cream" : "border-ink/20 bg-cream text-ink/70"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("text-[15px] leading-snug sm:pr-4 sm:text-[14px]", strong ? "font-medium text-ink" : "text-ink/75")}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Website: Refine → Improve → Redesign ─────────────────────────────────── */

const SCOPE = [
  { name: "Refine", note: "Photos, fixes and small updates", match: "Refine the existing website" },
  { name: "Improve", note: "Rework specific pages and sections", match: "Improve specific pages and sections" },
  { name: "Redesign", note: "A brand-new website and look", match: "Complete redesign or rebrand" },
];

export function ScopeScale({ selected }: { selected?: string }) {
  return (
    <figure className="rounded-[24px] border border-line bg-[#FBF8F0] px-5 py-6 md:px-8">
      <figcaption className="sr-only">From small changes to a complete redesign</figcaption>
      <div className="relative">
        <div aria-hidden className="absolute left-[6px] right-[6px] top-[6px] h-px bg-ink/15" />
        <div aria-hidden className="absolute right-[2px] top-[2px] h-0 w-0 border-y-[4.5px] border-l-[7px] border-y-transparent border-l-ink/25" />
        <ol className="relative grid grid-cols-3 gap-3">
          {SCOPE.map((s, i) => {
            const on = selected === s.match;
            return (
              <li key={s.name} className={cn("flex flex-col", i === 1 && "items-center text-center", i === 2 && "items-end text-right")}>
                <span
                  aria-hidden
                  className={cn("h-[13px] w-[13px] rotate-45 border transition-colors duration-300", on ? "border-ink bg-ink" : "border-ink/30 bg-[#FBF8F0]")}
                />
                <span className={cn("display mt-4 text-[19px] leading-none md:text-[22px]", on ? "text-ink" : "text-ink/80")}>{s.name}</span>
                <span className="mt-2 max-w-[150px] text-[12.5px] leading-snug text-muted">{s.note}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

/* ── Design: 1 design → three formats ─────────────────────────────────────── */

export function DesignFormats() {
  const formats = [
    { name: "Feed post", ratio: "4:5", w: 40, h: 50 },
    { name: "Story", ratio: "9:16", w: 32, h: 57 },
    { name: "Print", ratio: "A4–A3", w: 40, h: 57 },
  ];
  return (
    <figure className="rounded-[24px] border border-line bg-[#FBF8F0] px-5 py-6 md:px-8">
      <figcaption className="sr-only">One design, adapted for feed posts, stories and print</figcaption>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <span className="flex h-[66px] w-[66px] items-center justify-center rounded-[14px] bg-ink text-center text-[12px] leading-tight text-cream">
            1<br />design
          </span>
        </div>
        <svg aria-hidden viewBox="0 0 40 12" className="h-3 w-8 shrink-0 text-ink/30 md:w-12">
          <path d="M0 6h36M31 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <ul className="flex flex-1 items-end justify-between gap-3">
          {formats.map((f) => (
            <li key={f.name} className="flex flex-col items-center gap-2 text-center">
              <span aria-hidden className="rounded-[5px] border border-ink/35 bg-cream" style={{ width: f.w, height: f.h }} />
              <span className="text-[12.5px] leading-tight text-ink">
                {f.name}
                <span className="block text-muted">{f.ratio}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/* ── App: PWA path + comparison ───────────────────────────────────────────── */

export function AppPath() {
  const steps: { label: string; marker: "num" | "decision" | "end"; n?: string }[] = [
    { label: "Build the PWA", marker: "num", n: "01" },
    { label: "Launch & test", marker: "num", n: "02" },
    { label: "Learn & refine", marker: "num", n: "03" },
    { label: "Working well?", marker: "decision" },
    { label: "iOS & Android apps", marker: "end" },
  ];
  return (
    <figure className="rounded-[24px] border border-line bg-[#FBF8F0] px-5 py-6 md:px-8">
      <figcaption className="sr-only">Start with a PWA, launch and learn, then build iOS and Android apps if it works well. One codebase throughout.</figcaption>
      <ol className="grid sm:grid-flow-col sm:auto-cols-fr">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s.label} className="relative flex items-center gap-4 py-2.5 sm:flex-col sm:items-start sm:gap-3 sm:py-0">
              {!last && (
                <span
                  aria-hidden
                  className="absolute left-[15px] top-[42px] h-[calc(100%-28px)] w-px bg-ink/15 sm:left-[40px] sm:top-[15px] sm:h-px sm:w-[calc(100%-36px)]"
                />
              )}
              <span className="relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center">
                {s.marker === "num" && (
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-ink/20 bg-[#FBF8F0] text-[11px] tabular-nums text-ink/70">
                    {s.n}
                  </span>
                )}
                {s.marker === "decision" && <span className="h-[17px] w-[17px] rotate-45 border border-ink/40 bg-[#FBF8F0]" />}
                {s.marker === "end" && (
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink text-cream">
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M2 6h7M6.5 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </span>
              <span className={cn("text-[15px] leading-snug sm:pr-3 sm:text-[14px]", s.marker === "decision" ? "text-muted" : last ? "font-medium text-ink" : "text-ink/80")}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex items-center gap-3 border-t border-dashed border-ink/20 pt-3 text-[12.5px] text-muted">
        <span aria-hidden className="h-px w-5 bg-ink/40" />
        One codebase throughout
      </div>
    </figure>
  );
}

export function AppComparison() {
  const rows: [string, string, string][] = [
    ["Upfront cost", "Lower", "Considerably higher"],
    ["Time to launch", "Faster", "Longer"],
    ["Updates", "Instant, for everyone", "Each update goes through store review"],
    ["How people get it", "A link, then “Add to Home Screen”", "App Store and Google Play"],
    ["Best for", "Launching, testing and learning", "When the platform is proven"],
  ];
  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-[#FBF8F0]">
      <table className="w-full border-collapse text-left text-[13px] leading-snug md:text-[14px]">
        <caption className="sr-only">PWA first compared with native apps from day one</caption>
        <thead>
          <tr className="bg-[#FBF8F0]">
            <th scope="col" className="w-[30%] px-3 py-3 font-normal text-muted md:px-5">
              <span className="sr-only">Compare</span>
            </th>
            <th scope="col" className="px-3 py-3 font-medium text-ink md:px-5">PWA first</th>
            <th scope="col" className="px-3 py-3 font-medium text-ink md:px-5">Native from day one</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, a, b]) => (
            <tr key={k} className="border-t border-line align-top">
              <th scope="row" className="px-3 py-3 font-normal text-muted md:px-5">{k}</th>
              <td className="px-3 py-3 text-ink md:px-5">{a}</td>
              <td className="px-3 py-3 text-ink/70 md:px-5">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
