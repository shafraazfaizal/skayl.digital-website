import Container from "@/components/ui/Container";
import { DarkPanel, Eyebrow } from "@/components/case-study/Layout";
import { jma } from "@/content/jma-case-study";

// 03 — The before. Pure typography: no imagery exists of "nothing online",
// so the absence is the point.
export default function BeforeSection() {
  const { before } = jma;
  return (
    <DarkPanel>
      <Container className="py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-end md:gap-20">
          <div className="flex flex-col gap-6">
            <Eyebrow light>{before.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {before.headline}
            </h2>
            <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-cream/60">
              {before.body}
            </p>
          </div>
          <div>
            <ul data-cs="stagger" className="border-t border-cream/10">
              {before.gaps.map((g) => (
                <li
                  key={g}
                  className="flex items-baseline gap-4 border-b border-cream/10 py-4 text-cream/80"
                >
                  <span className="text-orange" aria-hidden>
                    ×
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* the typographic moment */}
        <p className="mt-20 max-w-5xl md:mt-28">
          <span
            data-cs="lines"
            className="display block text-balance text-[2.4rem] leading-[1.02] text-cream/35 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {before.statement[0]}
          </span>
          <span
            data-cs="lines"
            data-cs-delay="0.15"
            className="display mt-2 block text-balance text-[2.4rem] leading-[1.02] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {before.statement[1]}
          </span>
        </p>
      </Container>
    </DarkPanel>
  );
}
