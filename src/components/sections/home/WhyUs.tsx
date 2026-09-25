"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { whyUs } from "@/content/home";

export default function WhyUs() {
  const ref = useReveal<HTMLDivElement>({
    childrenSelector: "[data-why]",
    stagger: 0.09,
  });

  return (
    <section className="py-24 md:py-28">
      <Container>
        <SectionHeading eyebrow="Why SKAYL" title="Not your vendor. Your team." />

        {/* Editorial index — numbered rows with hover reveal */}
        <div ref={ref} className="mt-14 border-t border-line md:mt-20">
          {whyUs.map((w, i) => (
            <div
              key={w.title}
              data-why
              className="group relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 border-b border-line py-7 md:grid-cols-[5rem_1.05fr_1.35fr_auto] md:items-center md:gap-x-10 md:py-9"
            >
              {/* hover wash */}
              <div className="pointer-events-none absolute inset-0 -mx-4 rounded-2xl bg-ink/[0.025] opacity-0 transition-opacity duration-500 ease-skayl-out group-hover:opacity-100 md:-mx-6" />

              {/* index */}
              <span className="relative font-display text-2xl tabular-nums text-ink/25 transition-colors duration-500 ease-skayl-out group-hover:text-orange md:text-4xl">
                0{i + 1}
              </span>

              {/* title */}
              <h3 className="relative col-span-1 display text-2xl leading-[1.05] transition-transform duration-500 ease-skayl-out md:text-[2rem] md:group-hover:translate-x-1.5">
                {w.title}
              </h3>

              {/* body */}
              <p className="relative col-span-2 max-w-xl text-muted md:col-span-1 md:text-[15px] md:leading-relaxed md:opacity-70 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                {w.body}
              </p>

              {/* hover arrow
              <span className="relative hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink opacity-0 transition-all duration-500 ease-skayl-out group-hover:border-orange/40 group-hover:opacity-100 md:flex md:-translate-x-2 md:group-hover:translate-x-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M7 17L17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span> */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
