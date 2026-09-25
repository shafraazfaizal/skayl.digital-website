import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // SKAYL Brand Colour System
        ink: "#0F0505", // Near-Black — primary text / dark bg
        cream: "#F5F0E1", // Cream — warm light background
        orange: {
          DEFAULT: "#E64A19", // Primary Orange — CTAs, highlights
          soft: "#FF8A65", // Secondary Orange — accents, notes
        },
        brown: "#5C1D0B", // Deep Brown — dark gradient mid-stop
        muted: "#5C5C5C", // Dark gray — secondary text
        line: "rgba(15,5,5,0.12)", // hairline borders
      },
      fontFamily: {
        display: ["var(--font-cal-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        "skayl-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
