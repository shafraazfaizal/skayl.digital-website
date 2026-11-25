// Shared building blocks for the Discovery and admin pages, in the SKAYL
// brand language: cream pages, ink panels with the deep-brown corner glow,
// Bricolage headlines with the orange full stop, Hanken for everything else.

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Ink panel ────────────────────────────────────────────────────────────── */

export function InkPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(70% 80% at 100% 0%, rgba(92,29,11,0.75), rgba(92,29,11,0) 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 60% at 0% 100%, rgba(92,29,11,0.28), rgba(92,29,11,0) 70%)" }}
      />
      {children}
    </div>
  );
}

/* ── Type ─────────────────────────────────────────────────────────────────── */

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em]",
        tone === "dark" ? "text-cream/60" : "text-muted",
        className
      )}
    >
      <span aria-hidden className={cn("h-px w-6", tone === "dark" ? "bg-cream/40" : "bg-ink/35")} />
      {children}
    </p>
  );
}

/** Big Bricolage headline that always ends with the orange full stop. */
export function Headline({
  children,
  as: Tag = "h1",
  className,
  headingRef,
}: {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  headingRef?: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <Tag ref={headingRef} tabIndex={headingRef ? -1 : undefined} className={cn("display leading-[0.94] outline-none [text-wrap:balance]", className)}>
      {children}
      <span className="text-orange">.</span>
    </Tag>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────────── */

const pillBase =
  "group relative inline-flex min-h-[52px] select-none items-center justify-center overflow-hidden rounded-full px-7 text-[12.5px] font-medium uppercase tracking-[0.22em] transition-[transform,background-color,border-color,color,opacity] duration-500 ease-skayl-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

const pillStyles = {
  ink: "bg-ink text-cream hover:bg-[#241616] focus-visible:outline-ink",
  cream: "bg-cream text-ink hover:bg-white focus-visible:outline-cream",
  ghost: "border border-ink/20 text-ink hover:border-ink focus-visible:outline-ink",
  ghostDark: "border border-cream/25 text-cream hover:border-cream focus-visible:outline-cream",
};

/** The two-line roll from the contact form: the label slides up on hover. */
function Roll({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <span className="relative block h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-skayl-out group-hover:-translate-y-1/2 motion-reduce:transition-none">
        <span className="flex h-5 items-center justify-center gap-2.5 whitespace-nowrap">
          {children}
          {arrow && <span aria-hidden>→</span>}
        </span>
        <span aria-hidden className="flex h-5 items-center justify-center gap-2.5 whitespace-nowrap">
          {children}
          {arrow && <span className="text-orange">→</span>}
        </span>
      </span>
    </span>
  );
}

type PillProps = { variant?: keyof typeof pillStyles; arrow?: boolean; children: ReactNode; className?: string };

export function PillButton({ variant = "ink", arrow = false, children, className, ...rest }: PillProps & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button {...rest} className={cn(pillBase, pillStyles[variant], className)}>
      <Roll arrow={arrow}>{children}</Roll>
    </button>
  );
}

export function PillLink({ variant = "ink", arrow = false, children, className, href }: PillProps & { href: string }) {
  return (
    <Link href={href} className={cn(pillBase, pillStyles[variant], className)}>
      <Roll arrow={arrow}>{children}</Roll>
    </Link>
  );
}

/** Round icon button (e.g. Back). */
export function CircleButton({ label, children, className, ...rest }: { label: string; children: ReactNode; className?: string } & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button
      {...rest}
      aria-label={label}
      className={cn(
        "inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className
      )}
    >
      {children}
    </button>
  );
}

export function ArrowLeft() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
      <path d="M13 8H3.5M7.5 3.5 3 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className={cn("h-3 w-3", className)}>
      <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Soft card ────────────────────────────────────────────────────────────── */

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[24px] border border-line bg-[#FBF8F0] md:rounded-[28px]", className)}>{children}</div>;
}
