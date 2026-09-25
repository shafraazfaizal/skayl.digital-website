"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/content/navigation";
import Wordmark from "@/components/ui/Wordmark";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 w-full">
      {/* Centred availability tab at the very top of the page — notched
          banner shape with concave shoulders, matching the reference. */}
      <div className="flex justify-center">
        <div className="relative">
          <svg
            width="300"
            height="48"
            viewBox="0 0 300 48"
            fill="none"
            className="block h-auto max-w-[94vw]"
            aria-hidden
          >
            <path
              d="M0.00,0.00 L300.00,0.00 L272.73,2.44 L267.61,4.89 L264.20,7.33 L261.65,9.78 L259.09,12.22 L258.24,14.67 L256.53,17.11 L255.68,19.56 L253.98,22.00 L253.12,24.44 L252.27,26.89 L250.57,29.33 L248.86,31.78 L247.16,34.22 L244.60,36.67 L241.19,39.11 L236.08,41.56 L223.30,44.00 L76.70,44.00 L63.92,41.56 L58.81,39.11 L55.40,36.67 L52.84,34.22 L51.14,31.78 L49.43,29.33 L47.73,26.89 L46.88,24.44 L46.02,22.00 L44.32,19.56 L43.47,17.11 L41.76,14.67 L40.91,12.22 L38.35,9.78 L35.80,7.33 L32.39,4.89 L27.27,2.44 Z"
              fill="#343434"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-cream/90">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
              Available for New Projects
            </span>
          </div>
        </div>
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
