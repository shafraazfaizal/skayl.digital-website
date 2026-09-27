import Container from "@/components/ui/Container";
import Wordmark from "@/components/ui/Wordmark";
import { philosophy, whyUs } from "@/content/home";

// 06 — Why we work this way. Big masked statement, five accurate promises
// (the site's existing "why us" wording), and a slow warm light behind.
export default function Philosophy() {
  return (
    <div className="relative">
      {/* the full mark, kept inside the panel so it never crops */}
      <div aria-hidden data-cs-parallax="4" className="pointer-events-none absolute bottom-[6%] right-[5%] w-[70%] text-cream opacity-[0.04] md:bottom-[8%] md:right-[4%] md:w-[42%]">
        <Wordmark className="h-auto w-full" />
      </div>
      <div
        aria-hidden
        data-cs-drift="6"
        className="pointer-events-none absolute left-[-10%] top-[20%] h-[60%] w-[70%]"
        style={{ background: "radial-gradient(closest-side, rgba(230,74,25,0.22), rgba(92,29,11,0.1) 50%, rgba(15,5,5,0))" }}
      />

      <Container className="relative grid gap-14 py-24 md:grid-cols-[1fr_1fr] md:gap-16 md:py-36">
        <div className="flex flex-col gap-8">
          <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
            {philosophy.eyebrow}
          </span>
          <h2 className="display text-[17vw] leading-[0.86] md:text-[6.2rem] lg:text-[8rem]">
            {philosophy.title.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                {l}
              </span>
            ))}
            <span data-cs="lines" data-cs-delay="0.2" className="block text-orange">
              {philosophy.punch}
            </span>
          </h2>
        </div>

        <ol className="flex flex-col justify-end border-t border-cream/15 md:border-t-0">
          {whyUs.map((w, i) => (
            <li
              key={w.title}
              data-cs-focus
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-cream/10 py-6 md:py-5"
            >
              <span className="font-display text-sm tabular-nums text-cream/35 transition-colors duration-500 group-hover:text-orange [.cs-mobile-fx_.cs-focus_&]:text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 data-cs="fade" className="font-display text-xl leading-snug md:text-2xl">
                {w.title}
              </h3>
              <p className="col-start-2 text-[14px] leading-relaxed text-cream/50 transition-colors duration-500 group-hover:text-cream/75 [.cs-mobile-fx_.cs-focus_&]:text-cream/75">
                {w.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
