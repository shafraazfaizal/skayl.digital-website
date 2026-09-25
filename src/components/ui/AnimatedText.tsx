"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { splitChars } from "@/lib/utils";

// Letter-by-letter reveal — a faithful port of the Framer `textEffect`:
// tokenization "character", each glyph animates opacity 0→1, y 10px→0,
// blur 10px→0, easing cubic-bezier(0.44,0,0.56,1), 0.4s, staggered.
// Triggered by a raw IntersectionObserver so it fires for both
// in-view-at-mount and on-scroll.
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

export default function AnimatedText({
  text,
  className = "",
  as = "h2",
  play = "inview",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  play?: "inview" | "mount";
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as];
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(play === "mount");

  useEffect(() => {
    if (play === "mount" || reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play, reduce]);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Split into words so a word never breaks across a line; each word's
  // characters still reveal individually.
  const words = text.split(" ");

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          aria-hidden
        >
          {splitChars(word).map((c, ci) => (
            <motion.span key={ci} variants={charVariant} className="char">
              {c}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span variants={charVariant} className="char">
              {" "}
            </motion.span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}
