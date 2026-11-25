import type { Metadata, Viewport } from "next";
import { arabicFont, BODY_WITH_ARABIC } from "@/lib/discovery/arabic-font";

// Private client pages: never indexed, never cached, no referrer leaks.
export const metadata: Metadata = {
  title: "Discovery · SKAYL",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "no-referrer",
};

export const viewport: Viewport = { themeColor: "#F5F0E1" };

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${arabicFont.variable} min-h-[100svh] bg-cream text-ink`} style={{ fontFamily: BODY_WITH_ARABIC }}>
      {children}
    </div>
  );
}
