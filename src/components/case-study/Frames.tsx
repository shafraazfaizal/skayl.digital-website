import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Minimal browser chrome around a screenshot — no device mockups. */
export function BrowserFrame({
  url,
  children,
  tone = "light",
  className = "",
}: {
  url: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] md:rounded-[22px]",
        dark
          ? "bg-[#161010] ring-1 ring-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
          : "bg-white ring-1 ring-ink/10 shadow-[0_40px_90px_-45px_rgba(15,5,5,0.45)]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 md:px-5",
          dark ? "border-b border-white/10" : "border-b border-ink/[0.07]"
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("h-2.5 w-2.5 rounded-full", dark ? "bg-white/15" : "bg-ink/15")}
            />
          ))}
        </div>
        <span
          className={cn(
            "mx-auto truncate rounded-full px-4 py-1 text-[11px] tabular-nums",
            dark ? "bg-white/[0.06] text-cream/50" : "bg-ink/[0.04] text-ink/45"
          )}
        >
          {url}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

/** Phone silhouette for portrait screenshots. */
export function PhoneMock({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[2.1rem] bg-[#080606] p-[5px] shadow-[0_50px_80px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10 md:rounded-[2.6rem] md:p-[7px]",
        className
      )}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] bg-black md:rounded-[2.15rem]">
        {children}
        <div className="absolute left-1/2 top-2 z-10 h-[16px] w-[30%] -translate-x-1/2 rounded-full bg-black/90 md:h-[20px]" />
      </div>
    </div>
  );
}
