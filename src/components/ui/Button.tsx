import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:scale-[1.03]",
  accent: "bg-orange text-cream hover:scale-[1.03]",
  outline: "border border-line text-ink hover:bg-ink/5",
  light: "bg-cream text-ink hover:scale-[1.03]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 ease-skayl-out",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
