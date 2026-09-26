import Container from "@/components/ui/Container";
import { jma } from "@/content/jma-case-study";

// 02b — The central statement that frames the whole project.
export default function CaseStudyIntro() {
  return (
    <section className="pb-24 pt-20 md:pb-36 md:pt-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.35fr_0.65fr] md:items-end md:gap-16">
          <h2
            data-cs="lines"
            className="display text-[2.6rem] leading-[1] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {jma.intro.statement}
          </h2>
          <div data-cs="stagger" className="flex flex-col gap-5 text-[17px] leading-relaxed text-muted">
            {jma.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
