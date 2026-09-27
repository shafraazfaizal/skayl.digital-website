import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { publicAsset } from "@/lib/public-asset";
import { selectedWork } from "@/content/home";
import { works } from "@/content/works";
import MoreWork from "./MoreWork";

// 03 — Selected work. JMA UK leads as the flagship: a composition of the
// platform's real screens. The other projects follow as a sideways-scrolling
// sequence (MoreWork).
export default function HomeWork() {
  const f = selectedWork.flagship;
  const jma = works.find((w) => w.slug === f.slug)!;
  const s = {
    laptop: publicAsset(f.screens.laptop),
    admin: publicAsset(f.screens.admin),
    donate: publicAsset(f.screens.donate),
    phone: publicAsset(f.screens.phone),
  };

  const more = selectedWork.more
    .map((m) => ({ ...m, work: works.find((w) => w.slug === m.slug)!, image: publicAsset(m.image) }))
    .filter((m) => m.work && m.image) as {
    slug: string;
    line: string;
    image: string;
    position: string;
    tone: string;
    work: (typeof works)[number];
  }[];

  return (
    <section id="work" className="scroll-mt-20 pt-24 md:pt-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {selectedWork.eyebrow}
            </span>
            <h2 className="display text-[19vw] leading-[0.84] md:text-[8.5rem] lg:text-[10.5rem]">
              {selectedWork.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                  {i === selectedWork.title.length - 1 ? (
                    <>
                      {l.replace(/\.$/, "")}
                      <span className="text-orange">.</span>
                    </>
                  ) : (
                    l
                  )}
                </span>
              ))}
            </h2>
          </div>
          <div data-cs="fade" className="flex flex-col gap-8 md:pb-4">
            <p className="max-w-sm text-[17px] leading-relaxed text-muted">{selectedWork.body}</p>
            <div className="flex items-center justify-between border-t border-line pt-5 text-[11px] uppercase tracking-[0.25em] text-muted">
              <span className="tabular-nums">{String(more.length + 1).padStart(2, "0")} projects</span>
              <Link href="/works" className="text-ink transition-colors hover:text-orange">
                View all work →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Flagship — JMA UK */}
      <div className="mt-16 px-3 md:mt-24 md:px-5">
        <Link
          href={`/works/${f.slug}`}
          className="group relative grid overflow-hidden rounded-[24px] bg-ink text-cream md:grid-cols-[0.78fr_1.22fr] md:rounded-[32px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(55% 70% at 78% 40%, rgba(13,92,107,0.45), rgba(15,5,5,0) 70%)" }}
          />
          <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

          {/* copy */}
          <div className="relative z-10 flex flex-col justify-between gap-12 p-7 md:p-12 lg:p-16">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/60">
              <span className="rounded-full bg-orange px-3 py-1 text-cream">{f.label}</span>
              <span>
                {jma.category} · {jma.year}
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <h3 data-cs="lines" className="display text-[18vw] leading-[0.86] md:text-[6.5rem] lg:text-[8rem]">
                {jma.title}
              </h3>
              <p data-cs="fade" className="max-w-md text-[16px] leading-relaxed text-cream/70 md:text-[17px]">
                {f.lede}
              </p>
            </div>
            <dl data-cs="stagger" className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/15 pt-7 sm:grid-cols-4">
              {f.facts.map((x) => (
                <div key={x.label} className="flex flex-col gap-1.5">
                  <dd className="display text-3xl leading-none md:text-4xl">{x.value}</dd>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-cream/50 md:text-[11px]">{x.label}</dt>
                </div>
              ))}
            </dl>
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-cream/80 transition-colors group-hover:text-cream md:text-xs">
              View the case study
              <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-all duration-500 ease-skayl-out group-hover:border-orange group-hover:bg-orange">
                →
              </span>
            </span>
          </div>

          {/* composition of the real screens */}
          <div className="relative min-h-[460px] md:min-h-[760px]">
            {s.laptop && (
              <div data-cs="clip" className="absolute inset-0">
                <div data-cs-inner className="absolute inset-0">
                  <div data-cs-parallax="3" className="absolute -inset-y-[4%] inset-x-0 transition-transform duration-[1600ms] ease-skayl-out group-hover:scale-[1.02]">
                    <Image src={s.laptop} alt="The JMA UK website on a laptop" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" style={{ objectPosition: "30% 50%" }} />
                  </div>
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/60 md:bg-gradient-to-r md:from-ink md:via-transparent md:to-transparent" />
              </div>
            )}
            {s.admin && (
              <div data-cs-parallax="8" className="absolute bottom-[8%] left-[6%] z-10 w-[58%] md:bottom-[10%] md:left-[4%] md:w-[52%]">
                <div data-cs="fade" data-cs-delay="0.2" className="relative aspect-[16/10] overflow-hidden rounded-[12px] ring-1 ring-cream/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                  <Image src={s.admin} alt="The JMA admin dashboard" fill sizes="30vw" className="object-cover object-top" />
                </div>
                <span className="mt-2 block text-[10px] uppercase tracking-[0.22em] text-cream/55">Admin dashboard</span>
              </div>
            )}
            {s.donate && (
              <div data-cs-parallax="12" className="absolute right-[5%] top-[7%] z-10 hidden w-[40%] md:block">
                <div data-cs="fade" data-cs-delay="0.3" className="relative aspect-[16/10] overflow-hidden rounded-[12px] ring-1 ring-cream/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                  <Image src={s.donate} alt="The JMA donation flow" fill sizes="25vw" className="object-cover object-top" />
                </div>
                <span className="mt-2 block text-[10px] uppercase tracking-[0.22em] text-cream/55">Donations</span>
              </div>
            )}
            {s.phone && (
              <div data-cs-parallax="14" className="absolute bottom-[6%] right-[6%] z-20 w-[26%] md:w-[18%]">
                <div data-cs="fade" data-cs-delay="0.4" className="relative aspect-[9/19.5] overflow-hidden rounded-[22px] border-[5px] border-[#1a1a1a] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                  <Image src={s.phone} alt="JMA UK on mobile" fill sizes="15vw" className="object-cover object-top" />
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>

      <MoreWork items={more} />
    </section>
  );
}
