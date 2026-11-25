import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in · SKAYL",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] bg-cream text-ink">{children}</div>;
}
