import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Brand typefaces. next/font downloads these at build time and serves them
// from our own domain, so nothing loads from Google when someone visits.
// It also generates size-matched fallbacks, so text doesn't jump on load.

// Headlines: Bricolage Grotesque (variable, with the optical-size axis so
// big headlines automatically use the tighter display cut).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});

// Body and interface: Hanken Grotesk (variable, all weights).
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.skayl.digital").replace(/\/$/, "");
const siteDescription =
  "SKAYL is a UK & Sri Lanka creative studio building websites, brands, and content for charities, startups, and growing businesses — built around what you actually need.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SKAYL — We build what your brand deserves.",
  description: siteDescription,
  // The share image comes from src/app/opengraph-image.png (and twitter-image.png).
  openGraph: {
    type: "website",
    siteName: "SKAYL",
    locale: "en_GB",
    url: "/",
    title: "SKAYL — Your team. Not your agency.",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "SKAYL — Your team. Not your agency.",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
