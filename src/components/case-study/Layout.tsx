import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase chapter label, matching the work cards' metadata style. */
export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      data-cs="fade"
      className={cn(
        "block text-[11px] uppercase tracking-[0.28em] md:text-xs",
        light ? "text-cream/55" : "text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Inset rounded dark chapter — the same framing the site uses for the CTA
 * block, reels shelf and footer. Optional glow colour (the project's brand
 * glow, as used on the work cards).
 */
export function DarkPanel({
  children,
  glow,
  className = "",
  innerClassName = "",
  id,
}: {
  children: ReactNode;
  glow?: string;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 md:px-12", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]",
          innerClassName
        )}
      >
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(60% 55% at 78% 8%, ${glow}55, rgba(15,5,5,0) 70%)`,
            }}
          />
        )}
        <div
          aria-hidden
          className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
