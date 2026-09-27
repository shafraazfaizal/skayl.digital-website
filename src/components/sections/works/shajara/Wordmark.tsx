import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Shajara wordmark. Uses the vector logo when public/work/shajara-tea/logo.svg
 * exists; otherwise the gold wordmark cut from the hang-tag artwork (268×119),
 * which is kept to modest sizes so it stays crisp.
 */
export default function Wordmark({
  logo,
  wordmark,
  className = "",
  priority = false,
}: {
  logo: string | null;
  wordmark: string | null;
  className?: string;
  priority?: boolean;
}) {
  const src = logo ?? wordmark;
  if (!src) return null;
  return (
    <Image
      src={src}
      alt="Shajara"
      width={268}
      height={119}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      sizes="(max-width: 768px) 60vw, 360px"
      className={cn("h-auto w-full select-none", !logo && "max-w-[360px]", className)}
    />
  );
}
