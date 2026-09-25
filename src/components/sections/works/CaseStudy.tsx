import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import type { CaseStudy as CaseStudyType } from "@/content/case-studies";

export default function CaseStudy({
  data,
  cover,
}: {
  data: CaseStudyType;
  cover: string;
}) {
  const { colours } = data;
  return (
    <article
      style={
        {
          "--primary": colours.primary,
          "--secondary": colours.secondary,
          "--accent": colours.accent,
          "--bg": colours.background,
        } as React.CSSProperties
      }
      className="bg-[var(--secondary)] text-white"
    >
      {/* Hero */}
      <section className="pt-40 pb-20">
        <Container>
          <Reveal>
            <div className="mb-10 flex flex-wrap gap-x-12 gap-y-4 text-sm text-white/60">
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Client</span>
                <span className="text-white">{data.client}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Sector</span>
                <span className="text-white">{data.sector}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Delivered by</span>
                <span className="text-white">{data.deliveredBy}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Year</span>
                <span className="text-white">{data.year}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display-h1 max-w-4xl text-4xl sm:text-5xl md:text-6xl">
              {data.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src={cover}
                alt={data.client}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10 py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {data.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-4xl tracking-tightest text-[var(--accent)] md:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-sm text-white/60">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Challenge */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="flex flex-col gap-4">
                <span className="text-sm text-[var(--accent)]">
                  The Challenge
                </span>
                <h2 className="display-h2 text-3xl md:text-4xl">
                  {data.challenge.title}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-white/70">
                {data.challenge.body}
              </p>
            </Reveal>
          </div>

          {/* Problems */}
          {data.problems && data.problems.length > 0 && (
            <div className="mt-16 border-t border-white/10">
              {data.problems.map((p, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-4 border-b border-white/10 py-5">
                    <span className="mt-0.5 text-lg text-[var(--accent)]">×</span>
                    <span className="text-white/80">{p}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* What SKAYL built */}
      <section className="bg-[var(--bg)] py-24">
        <Container>
          <Reveal>
            <div className="mb-14 flex flex-col gap-4">
              <span className="text-sm text-[var(--accent)]">What SKAYL Built</span>
              <h2 className="display-h2 text-3xl md:text-5xl">
                {data.builtHeading}
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {data.built.map((b, i) => (
              <Reveal key={b.no} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <span className="font-display text-2xl tracking-tightest text-[var(--accent)]">
                    {b.no}
                  </span>
                  <h3 className="font-display text-2xl tracking-tightest">
                    {b.title}
                  </h3>
                  <p className="text-white/60">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Quote */}
      <section className="py-24">
        <Container>
          <Reveal>
            <blockquote className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
              <p className="font-display text-2xl leading-snug tracking-tightest md:text-4xl">
                “{data.quote.text}”
              </p>
              <cite className="not-italic text-sm text-[var(--accent)]">
                — {data.quote.author}
              </cite>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="bg-[var(--bg)] py-24">
        <Container>
          <Reveal>
            <div className="mb-14 flex flex-col gap-4">
              <span className="text-sm text-[var(--accent)]">The Outcomes</span>
              <h2 className="display-h2 text-3xl md:text-5xl">
                {data.outcomesHeading}
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {data.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <span className="mt-0.5 text-lg text-[var(--accent)]">✓</span>
                  <span className="text-white/80">{o}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech stack */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="mb-12 flex flex-col gap-4">
              <span className="text-sm text-[var(--accent)]">Technology Stack</span>
              <h2 className="display-h2 text-3xl md:text-5xl">Built to last.</h2>
            </div>
          </Reveal>
          <div className="border-t border-white/10">
            {data.stack.map((s, i) => (
              <Reveal key={s.area} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-2 border-b border-white/10 py-5 md:grid-cols-[200px_1fr] md:gap-6">
                  <span className="text-sm font-medium text-[var(--accent)]">
                    {s.area}
                  </span>
                  <span className="text-white/80">{s.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-[32px] border border-white/10 bg-[var(--primary)] px-8 py-16 md:px-16 md:py-20">
              <h2 className="display-h2 text-3xl md:text-5xl">
                Interested in working with SKAYL?
              </h2>
              <p className="max-w-md text-white/70">
                We build digital products for charities, startups, and growing
                businesses across the UK and Sri Lanka.
              </p>
              <Link
                href="mailto:hello@skayl.digital"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--secondary)] transition-transform hover:scale-[1.03]"
              >
                Start a Project →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
