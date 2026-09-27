import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fsColours } from "@/content/framed-case-study";

/**
 * Framed Splendor's dark chapter frame: the site's inset rounded panel in the
 * brand's midnight navy (reads as black), lit by a faint gold glow.
 */
export default function FsPanel({
  children,
  className = "",
  glow = "50% 0%",
  tone = "navy",
}: {
  children: ReactNode;
  className?: string;
  glow?: string | false;
  tone?: "navy" | "ink";
}) {
  return (
    <section className={cn("px-5 md:px-12", className)}>
      <div
        className={cn("relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]", tone === "ink" && "bg-ink")}
        style={tone === "navy" ? { backgroundColor: fsColours.deep } : undefined}
      >
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(55% 45% at ${glow}, ${fsColours.gold}1f, rgba(7,21,42,0) 70%)` }}
          />
        )}
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
