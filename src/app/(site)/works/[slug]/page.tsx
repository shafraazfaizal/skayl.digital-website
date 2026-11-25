import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CaseStudy from "@/components/sections/works/CaseStudy";
import CTA from "@/components/sections/shared/CTA";
import { works } from "@/content/works";
import { caseStudies } from "@/content/case-studies";
import JmaCaseStudy from "@/components/sections/works/jma/JmaCaseStudy";
import ShajaraCaseStudy from "@/components/sections/works/shajara/ShajaraCaseStudy";
import FramedCaseStudy from "@/components/sections/works/framed/FramedCaseStudy";
import AutoViveCaseStudy from "@/components/sections/works/autovive/AutoViveCaseStudy";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return { title: "Work — SKAYL" };
  return {
    title: `${work.title} — Case Study | SKAYL`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  // Flagship editorial case study
  if (slug === "jma-uk") {
    const next = works[(works.indexOf(work) + 1) % works.length];
    return <JmaCaseStudy work={work} next={next} />;
  }

  if (slug === "framed-splendor") {
    const next = works.find((w) => w.slug === "autovive") ?? works[0];
    return <FramedCaseStudy work={work} next={next} />;
  }

  if (slug === "autovive") {
    const next = works[(works.indexOf(work) + 1) % works.length];
    return <AutoViveCaseStudy work={work} next={next} />;
  }

  if (slug === "shajara-tea") {
    const next = works.find((w) => w.slug === "framed-splendor") ?? works[0];
    return <ShajaraCaseStudy work={work} next={next} />;
  }

  const study = caseStudies[slug];
  if (study) {
    return <CaseStudy data={study} cover={work.cover} />;
  }

  // Lighter detail layout for projects without a full case study
  return (
    <>
      <section className="pt-24 pb-16">
        <Container>
          <Reveal>
            <div className="mb-8 flex items-center justify-between text-sm text-muted">
              <span className="tabular-nums">{work.page}</span>
              <span>{work.year}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display text-6xl leading-[0.95] md:text-7xl">
              {work.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg text-muted">
              {work.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-ink">
              {work.heroVideo ? (
                <video
                  src={work.heroVideo}
                  poster={work.heroPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={work.cover}
                  alt={work.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted">Role</span>
              <span className="font-medium">{work.role}</span>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <span className="text-sm text-muted">Services</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {work.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-3 py-1 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
