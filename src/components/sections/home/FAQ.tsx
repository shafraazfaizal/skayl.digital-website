"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { faqs } from "@/content/home";

function Caret({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
      <path
        d={open ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Item({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-2xl border border-line bg-ink/[0.03]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-ink">{q}</span>
        <Caret open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const left = faqs.slice(0, 4);
  const right = faqs.slice(4);
  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              FAQs
            </span>
            <h2 data-cs="lines" className="display text-5xl leading-[0.95] md:text-7xl">
              Your questions, answered.
            </h2>
          </div>
          <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
            How we work, what it costs, and what happens if something isn’t right.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            {left.map((f, i) => (
              <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {right.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
