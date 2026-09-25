import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { founders } from "@/content/about";

export default function Founders() {
  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-4">
          <Reveal>
            <span className="text-sm text-muted">(Team)</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-h2 text-5xl sm:text-6xl md:text-7xl">
              Meet the Founders
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {founders.map((f, i) => (
            <Reveal key={f.role} delay={i * 0.05}>
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-3xl tracking-tightest md:text-4xl">
                  {f.role}
                </h3>
                <p className="max-w-md text-lg leading-relaxed text-muted">
                  {f.bio}
                </p>
                <div className="mt-2 border-t border-line">
                  {f.timeline.map((t) => (
                    <div
                      key={t.title}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <span className="text-sm text-ink">{t.title}</span>
                      <span className="shrink-0 text-sm tabular-nums text-muted">
                        {t.years}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
