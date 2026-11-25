import localFont from "next/font/local";

// Noto Naskh Arabic, self-hosted, so greetings like
// "السلام عليكم ورحمة الله وبركاته" render beautifully on every phone.
// Only used on the Discovery and admin pages.
export const arabicFont = localFont({
  src: [
    { path: "./fonts/noto-naskh-arabic-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-naskh-arabic-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

/** Body text with the Arabic fallback, for any page that shows client-written text. */
export const BODY_WITH_ARABIC = "var(--font-body), var(--font-arabic), system-ui, sans-serif";
