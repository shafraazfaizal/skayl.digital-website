import type { DisplayStatus } from "@/lib/discovery/links";
import { cn } from "@/lib/utils";

const STYLE: Record<DisplayStatus, { pill: string; dot: string }> = {
  "Not opened": { pill: "border-ink/15 text-ink/60", dot: "bg-ink/25" },
  Opened: { pill: "border-ink/20 text-ink/80", dot: "bg-ink/50" },
  "In progress": { pill: "border-ink/35 text-ink", dot: "bg-ink" },
  Submitted: { pill: "border-ink bg-ink text-cream", dot: "bg-cream" },
  Expired: { pill: "border-ink/10 bg-ink/[0.04] text-ink/45", dot: "bg-ink/20" },
  Revoked: { pill: "border-[#B3380F]/30 text-[#B3380F]", dot: "bg-[#B3380F]" },
};

export default function StatusBadge({ status }: { status: DisplayStatus }) {
  const s = STYLE[status];
  return (
    <span className={cn("inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-[12.5px]", s.pill)}>
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {status}
    </span>
  );
}
