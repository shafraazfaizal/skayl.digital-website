"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav } from "@/content/navigation";
import Wordmark from "@/components/ui/Wordmark";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative z-40 w-full">
      {/* Availability tab: hangs from the top edge of the screen like a
          notch — smooth concave shoulders, soft rounded base. It drops in on
          load, and on hover the line rolls over to an invitation. */}
      <div className="flex justify-center">
        <motion.div
          initial={reduceMotion ? false : { y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <svg width="320" height="42" viewBox="0 0 320 42" fill="none" className="block h-auto w-[300px] max-w-[92vw] md:w-[320px]" aria-hidden>
            <defs>
              <linearGradient id="skayl-tab" x1="0" y1="0" x2="0" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#0F0505" />
                <stop offset="1" stopColor="#241817" />
              </linearGradient>
            </defs>
            <path
              d="M0 0H320C305 0 297 5 295 17V22C295 33 288 41 276 41H44C32 41 25 33 25 22V17C23 5 15 0 0 0Z"
              fill="url(#skayl-tab)"
            />
            {/* a hairline of light along the base */}
            <path d="M44 40.5H276" stroke="#F5F0E1" strokeOpacity="0.08" />
          </svg>

          <Link
            href="/contact"
            className="group absolute inset-x-[34px] inset-y-0 flex items-center justify-center rounded-b-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <span className="relative block h-[18px] overflow-hidden">
              <span className="flex flex-col transition-transform duration-500 ease-skayl-out group-hover:-translate-y-1/2 motion-reduce:transition-none">
                <span className="flex h-[18px] items-center gap-2.5 whitespace-nowrap text-[11.5px] font-medium tracking-[0.02em] text-cream/90">
                  <span aria-hidden className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#4ADE80] opacity-70 motion-safe:animate-ping [animation-duration:2.4s]" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  </span>
                  Available for new projects
                </span>
                <span aria-hidden className="flex h-[18px] items-center justify-center gap-2 whitespace-nowrap text-[11.5px] font-medium tracking-[0.02em] text-cream">
                  Let’s talk
                  <span className="text-orange">→</span>
                </span>
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Nav row */}
      <div>
        <div className="container-skayl">
          <div className="grid grid-cols-[1fr_auto] items-center py-4 md:grid-cols-[1fr_auto_1fr] md:py-5">
            <Link
              href="/"
              aria-label="SKAYL home"
              className="flex items-center justify-self-start"
            >
              <Wordmark className="h-8 w-auto text-ink" />
            </Link>

            <nav className="hidden items-center gap-9 md:flex">
              {nav.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-ink/75 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-3">
              <Link
                href={nav.cta.href}
                className="hidden rounded-full bg-gradient-to-b from-[#57534e] to-[#39352f] px-6 py-2.5 text-sm font-medium text-cream shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-skayl-out hover:scale-[1.03] md:inline-flex"
              >
                {nav.cta.label}
              </Link>
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""
                      }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-4 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""
                      }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="container-skayl md:hidden"
          >
            <div className="mt-2 flex flex-col gap-1 rounded-3xl border border-line bg-cream p-4">
              {nav.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-ink/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-ink px-4 py-3 text-center text-base font-medium text-cream"
              >
                {nav.cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
