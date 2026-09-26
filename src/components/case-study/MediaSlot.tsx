import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * An image position in a case study. Renders the image when `src` resolves,
 * otherwise a quiet branded panel so layouts hold together. While running
 * `npm run dev`, the panel names the file to add.
 */
export default function MediaSlot({
  src,
  alt,
  label,
  file,
  sizes = "100vw",
  fit = "cover",
  position = "50% 50%",
  priority = false,
  tone = "dark",
  className = "",
  imgClassName = "",
  showLabel = true,
  kind = "ui",
}: {
  src: string | null;
  alt: string;
  label: string;
  file?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  position?: string;
  priority?: boolean;
  tone?: "dark" | "light";
  className?: string;
  imgClassName?: string;
  /** Hide the placeholder caption when the layout already titles the slot. */
  showLabel?: boolean;
  /** Placeholder style: an abstract interface ("ui") or a plain image field ("photo"). */
  kind?: "ui" | "photo";
}) {
  return (
    <div className={cn(/\b(absolute|fixed)\b/.test(className) ? "" : "relative", "overflow-hidden", className)}>
      <div data-cs-inner className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized={src.endsWith(".svg")}
            className={cn(fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
            style={{ objectPosition: position }}
          />
        ) : (
          <Placeholder label={label} file={file} tone={tone} showLabel={showLabel} kind={kind} />
        )}
      </div>
    </div>
  );
}

function Placeholder({
  label,
  file,
  tone,
  showLabel,
  kind,
}: {
  label: string;
  file?: string;
  tone: "dark" | "light";
  showLabel: boolean;
  kind: "ui" | "photo";
}) {
  const dev = process.env.NODE_ENV !== "production";
  const dark = tone === "dark";
  const bar = dark ? "bg-cream/[0.07]" : "bg-ink/[0.06]";
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("absolute inset-0", dark ? "bg-[#161010] text-cream/45" : "bg-white text-ink/40")}
      style={
        dark
          ? {
              backgroundImage:
                "radial-gradient(80% 70% at 75% 15%, rgba(13,92,107,0.35), rgba(15,5,5,0) 70%)",
            }
          : undefined
      }
    >
      {kind === "ui" && (
        // abstract interface: nav, hero block, copy lines, cards
        <div aria-hidden className="absolute inset-x-[7%] top-[8%] bottom-[8%] flex flex-col gap-[5%]">
          <div className="flex items-center justify-between">
            <span className={cn("h-[6px] w-[14%] rounded-full", bar)} />
            <span className="flex w-[40%] justify-end gap-[8%]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("h-[4px] flex-1 rounded-full", bar)} />
              ))}
            </span>
          </div>
          <div className={cn("flex-[3] rounded-[10px]", bar)} />
          <div className="flex flex-col gap-[6px]">
            <span className={cn("h-[6px] w-[62%] rounded-full", bar)} />
            <span className={cn("h-[6px] w-[44%] rounded-full", bar)} />
          </div>
          <div className="grid flex-[2] grid-cols-3 gap-[4%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("rounded-[8px]", bar)} />
            ))}
          </div>
        </div>
      )}
      <div className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      {(showLabel || (dev && file)) && (
        <div className="absolute left-5 top-5 flex flex-col gap-1 text-[10px] uppercase tracking-[0.25em] md:left-6 md:top-6">
          {showLabel && kind === "photo" && <span>{label}</span>}
          {dev && file && (
            <span className="rounded-full bg-orange px-2.5 py-1 normal-case tracking-normal text-cream">
              Add public{file}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
