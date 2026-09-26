import localFont from "next/font/local";

// JMA's own brand typefaces — loaded only on the JMA case study, and only to
// render the type specimens in the Brand Identity section.
export const jakarta = localFont({
  src: [
    { path: "../../../../assets/fonts/jma/plus-jakarta-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../../../../assets/fonts/jma/plus-jakarta-sans-latin-800-normal.woff2", weight: "800" },
  ],
  display: "swap",
});

export const notoSerifDisplay = localFont({
  src: "../../../../assets/fonts/jma/noto-serif-display-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  display: "swap",
});
