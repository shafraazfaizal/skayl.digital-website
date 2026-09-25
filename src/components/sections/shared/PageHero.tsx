import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-16 pb-14 md:pt-24 md:pb-20">
      <Container>
        <div className="flex max-w-3xl flex-col gap-5">
          <Reveal>
            <span className="text-sm text-muted">({eyebrow})</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display-h1 text-5xl sm:text-6xl md:text-7xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg text-muted">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
