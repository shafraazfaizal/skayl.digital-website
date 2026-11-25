import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import MediaSlot from "@/components/case-study/MediaSlot";
import Container from "@/components/ui/Container";
import BlogIndex, { type IndexPost } from "@/components/sections/blog/BlogIndex";
import { publicAsset } from "@/lib/public-asset";
import { posts, readingTime, topics } from "@/content/posts";

export const metadata: Metadata = {
  title: "Studio Notes — SKAYL",
  description: "Thinking on design, development, and building brands that mean it — notes from the SKAYL studio.",
};

// Studio Notes: the statement → one featured story → the index → a quiet
// dark close. Renders entirely from content/posts.ts; the featured article is
// whichever post is marked `featured`.
export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const featuredImg = featured.image ? publicAsset(featured.image.src) : null;

  const index: IndexPost[] = rest.map((p, i) => {
    const src = p.image ? publicAsset(p.image.src) : null;
    return {
      slug: p.slug,
      no: String(i + 1).padStart(2, "0"),
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      year: p.year,
      minutes: readingTime(p),
      image: src && p.image ? { src, alt: p.image.alt, position: p.image.position } : null,
    };
  });
  const strip = publicAsset("/work/shajara-tea/case/landscape.jpg");

  return (
    <CaseStudyMotion>
      {/* ——— statement ——— */}
      <section className="pb-14 pt-10 md:pb-20 md:pt-20">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-7">
              <span data-cs="fade" data-cs-load className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                Studio notes
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>
              <h1 className="display text-[15vw] leading-[0.9] sm:text-[11vw] md:text-[6rem] lg:text-[7.5rem]">
                <span data-cs="lines" data-cs-load data-cs-delay="0.08" className="block">
                  Notes from
                </span>
                <span data-cs="lines" data-cs-load data-cs-delay="0.16" className="block">
                  the studio<span className="text-orange">.</span>
                </span>
              </h1>
              <p data-cs="fade" data-cs-load data-cs-delay="0.4" className="max-w-md text-lg leading-relaxed text-muted md:text-xl">
                Thinking on design, development, and building brands that mean it.
              </p>
              <ul data-cs="stagger" data-cs-load data-cs-delay="0.55" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.26em] text-ink/70">
                {topics.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-orange">·</span>}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <p data-cs="fade" data-cs-load data-cs-delay="0.6" className="text-[11px] uppercase tracking-[0.24em] text-muted md:pb-2 md:text-right">
              <span className="display text-3xl normal-case tracking-normal text-ink">{String(posts.length).padStart(2, "0")}</span>
              <br />
              notes · 2025–2026
            </p>
          </div>
        </Container>
      </section>

      {/* ——— featured ——— */}
      <section className="pb-24 md:pb-32">
        <Container>
          <span data-cs="draw" aria-hidden className="block h-px bg-line" />
          <article className="group relative mt-10 grid gap-8 md:mt-14 md:grid-cols-[0.82fr_1fr] md:items-center md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 md:order-1">
              <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                Featured
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>
              <h2 data-cs="lines" className="display text-balance text-[2.5rem] leading-[1] sm:text-5xl lg:text-6xl">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="transition-colors duration-500 group-hover:text-ink/80 focus-visible:underline focus-visible:outline-none"
                >
                  {featured.title}
                  <span className="text-orange">.</span>
                </Link>
              </h2>
              <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <p data-cs="fade" className="flex flex-wrap items-center gap-x-3 text-[11px] uppercase tracking-[0.24em] text-muted">
                <span className="text-ink">{featured.category}</span>
                <span aria-hidden className="text-orange">·</span>
                <span className="tabular-nums">{featured.year}</span>
                <span aria-hidden className="text-orange">·</span>
                <span>{readingTime(featured)} min read</span>
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                tabIndex={-1}
                aria-hidden
                data-cs="fade"
                className="mt-2 inline-flex w-fit items-center gap-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-ink"
              >
                <span className="relative pb-1">
                  Read article
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-[0.4] bg-ink transition-[transform,background-color] duration-500 ease-skayl-out group-hover:scale-x-100 group-hover:bg-orange" />
                </span>
                <span className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-2 group-hover:text-orange">→</span>
              </Link>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              tabIndex={-1}
              aria-hidden
              data-cs="clip"
              className="relative -order-1 block aspect-[4/3] overflow-hidden rounded-[24px] bg-ink md:order-2 md:aspect-[16/12] md:rounded-[32px]">
              <div data-cs-inner className="absolute inset-0">
                <div className="absolute inset-0 transition-transform duration-[1400ms] ease-skayl-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]">
                  <MediaSlot
                    src={featuredImg}
                    alt={featured.image?.alt ?? featured.title}
                    label="Featured"
                    kind="photo"
                    position={featured.image?.position}
                    priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Link>
          </article>
        </Container>
      </section>

      {/* ——— the index ——— */}
      <BlogIndex posts={index} />

      {/* ——— a quiet close ——— */}
      <section className="px-5 pb-16 md:px-12 md:pb-24">
        <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream md:rounded-[36px]">
          {strip && (
            <div aria-hidden data-cs-drift="3" className="absolute inset-y-0 -left-[5%] -right-[5%] opacity-30 mix-blend-luminosity">
              <MediaSlot src={strip} alt="" label="" kind="photo" sizes="100vw" position="50% 60%" className="h-full w-full" />
            </div>
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
          <div className="relative flex flex-col gap-8 px-7 py-14 md:flex-row md:items-end md:justify-between md:px-14 md:py-20">
            <div className="flex flex-col gap-5">
              <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
                Studio perspective
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>
              <p className="display text-[2.2rem] leading-[1.02] md:text-5xl lg:text-6xl">
                <span data-cs="lines" className="block">
                  We don’t publish to fill a feed.
                </span>
                <span data-cs="lines" data-cs-delay="0.1" className="block text-cream/45">
                  Only what’s worth thinking about.
                </span>
              </p>
            </div>
            <div data-cs="stagger" className="flex shrink-0 flex-col gap-3 md:items-end">
              <Link href="/contact" className="group inline-flex w-fit items-center gap-4 rounded-full bg-cream py-2 pl-6 pr-2 text-sm font-medium text-ink transition-colors duration-300 hover:bg-orange hover:text-cream">
                Start a project
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 ease-skayl-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link href="/works" className="group inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-cream/65 transition-colors hover:text-cream">
                See the work behind the notes
                <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CaseStudyMotion>
  );
}
