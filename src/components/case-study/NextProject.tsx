import Link from "next/link";
import MediaSlot from "./MediaSlot";
import type { Work } from "@/content/works";

/** Full-width clickable hand-off into the next case study. */
export default function NextProject({ work, image }: { work: Work; image: string | null }) {
  return (
    <section className="px-5 pb-6 pt-6 md:px-12">
      <div className="mb-5 flex items-center justify-between gap-6 px-1 text-[11px] uppercase tracking-[0.24em] text-muted md:mb-6 md:text-xs">
        <Link href="/works" className="group inline-flex items-center gap-2 py-2 transition-colors hover:text-ink">
          <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:-translate-x-1">
            ←
          </span>
          Back to all work
        </Link>
        <span className="hidden sm:inline">Up next</span>
      </div>
      <Link
        href={`/works/${work.slug}`}
        data-cursor
        className="group relative block overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-100 md:opacity-70"
          style={{
            background: `radial-gradient(55% 70% at 80% 50%, ${work.glow}66, rgba(15,5,5,0) 70%)`,
          }}
        />
        <div
          aria-hidden
          className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        />

        <div className="relative grid min-h-[560px] items-stretch md:min-h-[78svh] md:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between gap-12 p-7 md:p-14">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
              <span>Next project</span>
              <span className="tabular-nums">{work.page}</span>
            </div>

            <div className="flex flex-col gap-6">
              <h2
                data-cs="lines"
                className="display text-6xl leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              >
                {work.title}
              </h2>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.25em] text-cream/55 md:text-xs">
                {work.services.slice(0, 3).map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    {i > 0 && <span className="text-cream/25">/</span>}
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <span className="inline-flex items-center gap-3 text-sm text-cream/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all duration-500 ease-skayl-out group-hover:border-orange group-hover:bg-orange">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              View case study
            </span>
          </div>

          <div className="relative min-h-[380px] overflow-hidden md:min-h-0">
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.04]">
              <MediaSlot
                src={image}
                alt={`${work.title} project`}
                label={work.title}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="h-full w-full"
                imgClassName="[mask-image:linear-gradient(to_right,transparent,black_22%)]"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
