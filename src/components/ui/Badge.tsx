import { cn } from "@/lib/utils";

export default function Badge({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs",
        light
          ? "border-white/15 text-white/70"
          : "border-line text-ink/70",
        className
      )}
    >
      {children}
    </span>
  );
}
