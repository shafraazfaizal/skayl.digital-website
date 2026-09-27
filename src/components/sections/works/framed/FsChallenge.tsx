import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { fs, fsColours } from "@/content/framed-case-study";

// 03 — The challenge. Built from scratch, so there is no "before" to show:
// pure typography, and the empty frame is the point.
export default function FsChallenge() {
  const { challenge } = fs;
  return (
    <Container className="py-20 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:items-end md:gap-20">
        <div className="flex flex-col gap-6">
          <Eyebrow light>{challenge.eyebrow}</Eyebrow>
          <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
            {challenge.headline}
          </h2>
          <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-cream/60">
            {challenge.body}
          </p>
        </div>
        <ul data-cs="stagger" className="border-t border-cream/10">
          {challenge.gaps.map((g) => (
            <li key={g} className="flex items-baseline gap-4 border-b border-cream/10 py-4 text-cream/80">
              <span aria-hidden style={{ color: fsColours.gold }}>
                ×
              </span>
              {g}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
