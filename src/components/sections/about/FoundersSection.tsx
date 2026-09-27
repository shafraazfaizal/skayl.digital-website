import Image from "next/image";
import Container from "@/components/ui/Container";
import Wordmark from "@/components/ui/Wordmark";
import { publicAsset } from "@/lib/public-asset";
import { founders, foundersIntro, story } from "@/content/about";

// 06 — The people: how SKAYL started, what the name means, and the two
// founders. Portraits appear automatically when added to public/about/;
// until then each founder is presented typographically — never with stock.
export default function FoundersSection() {
  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(50% 40% at 85% 0%, rgba(230,74,25,0.18), rgba(15,5,5,0) 70%)" }}
        />
        <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

        <Container className="relative py-24 md:py-36">
          {/* story */}
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <div className="flex flex-col gap-6">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
                {story.eyebrow}
              </span>
              <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
                {story.title}
              </h2>
            </div>
            <div data-cs="stagger" className="flex flex-col gap-6 text-[17px] leading-relaxed text-cream/65 md:pt-10">
              {story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* the name */}
          <div className="mt-16 grid items-center gap-8 border-y border-cream/15 py-10 md:mt-24 md:grid-cols-[auto_1fr_auto] md:gap-14 md:py-12">
            <div data-cs="fade" className="w-44 md:w-56">
              <Wordmark className="h-auto w-full text-cream" />
            </div>
            <p data-cs="fade" data-cs-delay="0.1" className="font-display text-xl leading-snug md:text-2xl">
              {story.name.meaning}
            </p>
            <span data-cs="fade" data-cs-delay="0.2" className="text-sm tracking-wide text-cream/45">
              {story.name.say}
            </span>
          </div>

          {/* founders */}
          <div className="mt-24 grid gap-8 md:mt-32 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
            <div className="flex flex-col gap-6">
              <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
                {foundersIntro.eyebrow}
              </span>
              <h2 data-cs="lines" className="display text-6xl leading-[0.9] md:text-8xl">
                {foundersIntro.title.join(" ")}
              </h2>
            </div>
            <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-cream/65">
              {foundersIntro.body}
            </p>
          </div>

          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-6">
            {founders.map((f, i) => {
              const portrait = publicAsset(f.portrait);
              return (
                <article key={f.name} className="group flex flex-col gap-8">
                  <div
                    data-cs="clip"
                    data-cs-delay={String(i * 0.15)}
                    className={`relative overflow-hidden rounded-[22px] bg-[#1A0D08] ring-1 ring-inset ring-cream/10 ${portrait ? "aspect-[4/5]" : "aspect-[5/4] md:aspect-[4/3]"}`}
                  >
                    <div data-cs-inner className="absolute inset-0">
                      {portrait ? (
                        <div data-cs-parallax="5" className="absolute -inset-y-[6%] inset-x-0 transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.03]">
                          <Image src={portrait} alt={`Portrait of ${f.name}`} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                        </div>
                      ) : (
                        <>
                          <div
                            aria-hidden
                            className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-100 md:opacity-80"
                            style={{
                              background:
                                i === 0
                                  ? "radial-gradient(70% 55% at 20% 15%, rgba(230,74,25,0.28), rgba(26,13,8,0) 70%)"
                                  : "radial-gradient(70% 55% at 80% 15%, rgba(230,74,25,0.28), rgba(26,13,8,0) 70%)",
                            }}
                          />
                          <span
                            aria-hidden
                            className="display absolute left-[-0.05em] top-[12%] whitespace-nowrap text-[30vw] leading-none text-cream/[0.1] transition-transform duration-[1400ms] ease-skayl-out group-hover:translate-x-2 md:text-[11vw] xl:text-[9.5rem]"
                          >
                            {f.first}
                          </span>
                        </>
                      )}
                      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                      <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
                    </div>

                    <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:left-8 md:top-8">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 md:inset-x-8 md:bottom-8">
                      <h3 data-cs="fade" className="display text-4xl leading-none md:text-5xl">
                        {f.name}
                      </h3>
                      <span data-cs="fade" data-cs-delay="0.1" className="text-[11px] uppercase tracking-[0.25em] text-orange">
                        {f.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 md:px-2">
                    <p data-cs="fade" className="max-w-md text-[16px] leading-relaxed text-cream/65">
                      {f.bio}
                    </p>
                    <ul data-cs="stagger" className="flex flex-col">
                      {f.timeline.map((t) => (
                        <li key={t.title} className="flex items-baseline justify-between gap-6 border-t border-cream/10 py-3 text-sm">
                          <span className="text-cream/85">{t.title}</span>
                          <span className="shrink-0 tabular-nums text-cream/45">{t.years}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
