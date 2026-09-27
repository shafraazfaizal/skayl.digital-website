import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { publicAsset } from "@/lib/public-asset";
import { selectedWork } from "@/content/about";
import { works } from "@/content/works";

// Staggered 2-column layout: the second column sits lower, like a spread.
const OFFSET = ["", "md:mt-32", "md:-mt-16", "md:mt-16"];

// 08 — Selected work: every live project, each panel a link to its case study.
export default function SelectedWork() {
  const items = works
    .map((w) => ({ w, img: publicAsset(selectedWork.images[w.slug] ?? w.cover) ?? publicAsset(w.cover) }))
    .filter((x) => x.img);

  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <Container className="relative py-24 md:py-36">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
              {selectedWork.eyebrow}
            </span>
            <h2 data-cs="lines" className="display text-5xl leading-[0.92] md:text-8xl">
              {selectedWork.title.join(" ")}
            </h2>
          </div>

          <div className="mt-16 grid gap-x-6 gap-y-16 md:mt-24 md:grid-cols-2">
            {items.map(({ w, img }, i) => (
              <Link key={w.slug} href={`/works/${w.slug}`} className={`group flex flex-col gap-6 ${OFFSET[i] ?? ""}`}>
                <div data-cs="clip" className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#1A0D08]">
                  <div data-cs-inner className="absolute inset-0">
                    <div className="absolute inset-0 transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.04]">
                      <div data-cs-zoom className="absolute inset-0">
                      <Image src={img!} alt={`${w.title} — ${w.subtitle ?? w.services[0]}`} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-ink/55 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur md:left-6 md:top-6">
                    {w.year}
                  </span>
                </div>
                <div data-cs="fade" className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-cream/45">{w.category ?? w.services.slice(0, 2).join(" / ")}</span>
                    <h3 className="display text-3xl leading-none md:text-5xl">{w.title}</h3>
                    <p className="max-w-sm text-[15px] leading-relaxed text-cream/60">{w.subtitle ?? w.description.split(" —")[0]}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 md:mt-6 text-[11px] uppercase tracking-[0.22em] text-cream/70 transition-colors group-hover:text-orange">
                    View project
                    <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
