import Link from "next/link";
import Container from "@/components/ui/Container";
import { eventAddOn } from "@/content/services";

// 04 — Event Management, presented honestly as what it is: an add-on to a
// brand, web or content project. Type only — no borrowed imagery.
export default function EventAddOn() {
  const e = eventAddOn;
  return (
    <section id="event-management" aria-labelledby="event-management-title" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line px-6 py-10 md:rounded-[36px] md:px-14 md:py-16">
          <div
            aria-hidden
            data-cs-parallax="8"
            className="pointer-events-none absolute -right-[12%] -top-[40%] h-[140%] w-[45%] rounded-full opacity-40 blur-[100px]"
            style={{ background: "radial-gradient(closest-side, rgba(230,74,25,0.45), rgba(245,240,225,0))" }}
          />
          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16">
            <div className="flex flex-col gap-5">
              <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                <span className="text-orange">+</span>
                {e.eyebrow}
              </span>
              <h2 id="event-management-title" data-cs="lines" className="display text-[2.6rem] leading-[0.95] sm:text-5xl md:text-6xl">
                {e.title}
              </h2>
              <p data-cs="fade" className="max-w-lg text-[16px] leading-relaxed text-muted md:text-[17px]">
                {e.body}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <ul data-cs="stagger" className="border-t border-line">
                {e.includes.map((x) => (
                  <li key={x} data-cs-focus className="flex items-center gap-3 border-b border-line py-3 text-[15px]">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/25 transition-colors duration-500 [.cs-mobile-fx_.cs-focus_&]:bg-orange" />
                    {x}
                  </li>
                ))}
              </ul>
              <div data-cs="fade" className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-[13px] text-muted">{e.note}</span>
                <Link href="/contact" className="group inline-flex items-center gap-2 text-sm text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-orange">
                  Ask about events
                  <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
