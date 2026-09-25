import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Cal Sans — the display face used across Framer (single 400 weight).
// Self-hosted so Next.js can read the file and generate a size-matched
// fallback (Google-hosted Cal Sans has no fallback metrics).
const calSans = localFont({
  src: "./fonts/cal-sans-latin-400.woff2",
  variable: "--font-cal-sans",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKAYL — We build what your brand deserves.",
  description:
    "SKAYL is a UK & Sri Lanka creative studio building websites, brands, and content for charities, startups, and growing businesses — entirely in-house, every time.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
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