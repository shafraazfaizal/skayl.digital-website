import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { avColours } from "@/content/autovive-case-study";

/**
 * AutoVive's chapter frame: the site's inset rounded panel in a deep
 * navy-black (between the brand's navy and its deck black), lit by a faint
 * cyan glow in one corner.
 */
export default function AvPanel({
  children,
  className = "",
  glow = "85% 0%",
  id,
}: {
  children: ReactNode;
  className?: string;
  glow?: string | false;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 md:px-12", className)}>
      <div className="relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]" style={{ backgroundColor: avColours.deep }}>
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(55% 45% at ${glow}, ${avColours.cyan}22, rgba(6,21,38,0) 70%)` }}
          />
        )}
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
