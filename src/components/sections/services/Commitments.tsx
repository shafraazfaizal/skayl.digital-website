import Container from "@/components/ui/Container";
import { commitments } from "@/content/services";

// 05 — What you can count on. The reassurance a first-time client needs:
// clear pricing, honesty, accountability, and a team that finishes the job.
export default function Commitments() {
  const c = commitments;
  return (
    <div className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="flex flex-col gap-6 md:sticky md:top-28 md:self-start">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
              {c.eyebrow}
              <span aria-hidden className="h-px w-10 bg-orange" />
            </span>
            <h2 className="display text-[2.7rem] leading-[0.98] md:text-6xl lg:text-7xl">
              {c.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={i === c.title.length - 1 ? "block text-orange" : "block"}>
                  {l}
                </span>
              ))}
            </h2>
          </div>

          <ol className="border-t border-cream/10">
            {c.items.map((it, i) => (
              <li
                key={it.title}
                data-cs="fade"
                data-cs-focus
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-cream/10 py-6 md:grid-cols-[3rem_1fr] md:py-7"
              >
                <span className="pt-1 text-[11px] tabular-nums text-cream/40 transition-colors duration-500 group-hover:text-orange [.cs-mobile-fx_.cs-focus_&]:text-orange">
                  0{i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="display text-2xl leading-tight md:text-[1.7rem]">{it.title}</h3>
                  <p className="max-w-lg text-[15px] leading-relaxed text-cream/60">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
}
