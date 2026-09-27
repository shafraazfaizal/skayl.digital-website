import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { publicAsset } from "@/lib/public-asset";
import { proof } from "@/content/home";

// 07 — Proof. Only genuine proof: the JMA Secretary's video appears here
// automatically once public/work/jma-uk/testimonial.mp4 exists. Until then,
// the section shows verified facts about the work — never an invented quote.
export default function HomeProof() {
  const video = publicAsset(proof.video.src);
  const poster = publicAsset(proof.video.poster);
  const captions = publicAsset(proof.video.captions);

  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6">
          <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
            {video ? "In their words" : proof.eyebrow}
          </span>
          <h2 data-cs="lines" className="display text-5xl leading-[0.95] md:text-7xl">
            {proof.title}
          </h2>
        </div>

        {video ? (
          <figure className="mt-14 md:mt-20">
            <div data-cs="clip" className="relative aspect-video overflow-hidden rounded-[24px] bg-ink md:rounded-[32px]">
              <video controls preload="none" poster={poster ?? undefined} className="h-full w-full object-cover">
                <source src={video} type="video/mp4" />
                {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
              </video>
            </div>
            <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 text-[11px] uppercase tracking-[0.25em] text-muted">
              <span className="text-ink">{proof.video.credit}</span>
              {proof.video.organisation}
            </figcaption>
          </figure>
        ) : (
          <Link
            href={proof.feature.href}
            className="group mt-14 grid overflow-hidden rounded-[24px] bg-ink text-cream md:mt-20 md:grid-cols-[1.1fr_0.9fr] md:rounded-[32px]"
          >
            <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
              <span className="text-[11px] uppercase tracking-[0.25em] text-cream/55">JMA UK · Charity / Non-profit</span>
              <div className="flex flex-col gap-4">
                <p data-cs="lines" className="display text-5xl leading-[0.95] md:text-7xl">
                  {proof.feature.statement}
                </p>
                <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-cream/65">
                  {proof.feature.note}
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream/75 transition-colors group-hover:text-cream">
                Read the case study
                <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1">→</span>
              </span>
            </div>
            <div data-cs="clip" className="relative min-h-[360px]">
              <div data-cs-inner className="absolute inset-0 transition-transform duration-[1600ms] ease-skayl-out group-hover:scale-[1.03]">
                <Image src={proof.feature.image} alt="The JMA UK website" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" style={{ objectPosition: "35% 50%" }} />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
          </Link>
        )}

        <dl data-cs="stagger" className="mt-5 grid grid-cols-1 border-t border-line sm:grid-cols-3 md:mt-6">
          {proof.facts.map((f, i) => (
            <div key={f.label} className={`flex items-baseline justify-between gap-6 border-b border-line py-6 sm:flex-col sm:justify-start sm:gap-2 sm:border-b-0 ${i > 0 ? "sm:border-l sm:pl-8" : ""}`}>
              <dd className="display order-2 text-4xl leading-none sm:order-1 md:text-6xl">{f.value}</dd>
              <dt className="order-1 text-[11px] uppercase tracking-[0.25em] text-muted sm:order-2">{f.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
