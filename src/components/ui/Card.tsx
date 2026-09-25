import { cn } from "@/lib/utils";

export default function Card({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border",
        dark ? "border-white/10 bg-white/[0.03]" : "border-line",
        className
      )}
    >
      {children}
    </div>
  );
}
