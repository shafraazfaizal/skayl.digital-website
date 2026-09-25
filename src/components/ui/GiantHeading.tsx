"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { splitChars } from "@/lib/utils";

// Oversized section heading that fills the container width on a single line
// (fit-to-width, like Framer's H2-204), dissolves toward the bottom via a
// gradient mask, and reveals letter-by-letter on scroll into view.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.44, 0, 0.56, 1] },
  },
};

export default function GiantHeading({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // fit-to-width
    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const parentW = parent.clientWidth;
      if (!parentW) return;
      el.style.fontSize = "100px";
      const textW = el.scrollWidth;
      if (!textW) return;
      el.style.fontSize = `${(100 * parentW) / textW}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    if (typeof document !== "undefined" && "fonts" in document) {
      (document as Document).fonts.ready.then(fit).catch(() => {});
    }

    // reveal trigger
    if (reduce) {
      setShown(true);
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setShown(true);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
      );
      io.observe(el);
      return () => {
        ro.disconnect();
        io.disconnect();
      };
    }
    return () => ro.disconnect();
  }, [reduce]);

  return (
    <div className="w-full overflow-x-clip">
      <motion.h2
        ref={ref}
        aria-label={text}
        className={`giant-heading ${light ? "giant-heading--light" : ""} block whitespace-nowrap`}
        variants={container}
        initial="hidden"
        animate={reduce || shown ? "show" : "hidden"}
      >
        {splitChars(text).map((c, i) => (
          <motion.span key={i} variants={charVariant} className="char" aria-hidden>
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
}
