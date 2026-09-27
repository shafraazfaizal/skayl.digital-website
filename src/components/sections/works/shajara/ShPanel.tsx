import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { shColours } from "@/content/shajara-case-study";

/**
 * Shajara's chapter frame: the site's inset rounded panel, in the brand's
 * deep green instead of near-black, with a soft gold light in one corner.
 */
export default function ShPanel({
  children,
  className = "",
  innerClassName = "",
  glow = "78% 6%",
  id,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: string | false;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 md:px-12", className)}>
      <div
        className={cn("relative overflow-hidden rounded-[28px] text-cream md:rounded-[36px]", innerClassName)}
        style={{ backgroundColor: shColours.deep }}
      >
        {glow && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(55% 50% at ${glow}, ${shColours.gold}26, rgba(18,40,29,0) 70%)` }}
          />
        )}
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}

/** Thin gold rule used as a quiet section divider. */
export function GoldRule({ className = "" }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-16", className)} style={{ backgroundColor: shColours.gold }} />;
}
