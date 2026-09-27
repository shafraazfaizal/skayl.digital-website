import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import MediaSlot from "@/components/case-study/MediaSlot";
import Container from "@/components/ui/Container";
import HomeCTA from "@/components/sections/home/HomeCTA";
import ReadingProgress from "@/components/sections/blog/ReadingProgress";
import { publicAsset } from "@/lib/public-asset";
import { posts, readingTime, type Block } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Studio Notes — SKAYL" };
  return { title: `${post.title} — SKAYL`, description: post.excerpt };
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 data-cs="lines" className="display mt-8 text-balance text-3xl leading-[1.05] md:mt-10 md:text-4xl">
          {b.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote data-cs="fade" className="my-6 border-l-2 border-orange py-1 pl-6 md:-ml-8 md:my-10 md:pl-8">
          <p className="display text-balance text-2xl leading-[1.15] md:text-[2rem]">{b.text}</p>
          {b.cite && <cite className="mt-3 block text-[12px] not-italic uppercase tracking-[0.22em] text-muted">{b.cite}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul data-cs="stagger" className="flex flex-col border-t border-line">
          {b.items.map((it) => (
            <li key={it} className="flex gap-4 border-b border-line py-3.5 text-[17px] leading-relaxed text-ink/85">
              <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "source":
      return (
        <figure data-cs="fade" className="my-4 overflow-hidden rounded-[22px] bg-ink px-6 py-8 text-cream md:-mx-10 md:my-8 md:rounded-[28px] md:px-10 md:py-10">
          <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-cream/55">
            {b.kind}
            <span aria-hidden className="h-px w-8 bg-orange" />
          </span>
          {b.arabic && (
            <p lang="ar" dir="rtl" className="mt-6 text-right font-serif text-[1.7rem] leading-[1.9] text-cream md:text-[2.1rem]">
              {b.arabic}
            </p>
          )}
          <blockquote className="mt-6 text-[17px] leading-relaxed text-cream/80 md:text-lg">{b.translation}</blockquote>
          <figcaption className="mt-5 border-t border-cream/10 pt-4 text-[12px] uppercase tracking-[0.2em] text-orange">{b.reference}</figcaption>
        </figure>
      );
    default:
      return (
        <p data-cs="fade" className="text-[18px] leading-[1.75] text-ink/80 md:text-[19px]">
          {b.text}
        </p>
      );
  }
}

// A single note: a clear header, a cover when there's a real one, a
// comfortable reading column, then where to go next.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const post = posts[i];
  const next = posts[(i + 1) % posts.length];
  const cover = post.image ? publicAsset(post.image.src) : null;

  return (
    <CaseStudyMotion>
      <ReadingProgress target="#note-body" />
      <article>
        {/* header */}
        <header className="pb-12 pt-8 md:pb-16 md:pt-16">
          <Container>
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              <Link
                href="/blog"
                data-cs="fade"
                data-cs-load
                className="group inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-ink"
              >
                <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:-translate-x-1">
                  ←
                </span>
                Studio notes
              </Link>
              <p data-cs="fade" data-cs-load data-cs-delay="0.05" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.24em] text-muted">
                <span className="text-ink">{post.category}</span>
                <span aria-hidden className="text-orange">·</span>
                <span className="tabular-nums">{post.year}</span>
                <span aria-hidden className="text-orange">·</span>
                <span>{readingTime(post)} min read</span>
              </p>
              <h1 data-cs="lines" data-cs-load data-cs-delay="0.1" className="display text-balance text-[2.7rem] leading-[1] sm:text-6xl md:text-7xl">
                {post.title}
              </h1>
              <p data-cs="fade" data-cs-load data-cs-delay="0.35" className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {post.excerpt}
              </p>
            </div>
          </Container>
        </header>

        {cover && post.image && (
          <div className="px-5 md:px-12">
            <div data-cs="clip" data-cs-load data-cs-delay="0.2" className="relative mx-auto aspect-[4/3] max-w-[1280px] overflow-hidden rounded-[24px] bg-ink sm:aspect-[16/9] md:rounded-[32px]">
              <div data-cs-inner className="absolute inset-0">
                <MediaSlot src={cover} alt={post.image.alt} label="Cover" kind="photo" position={post.image.position} priority sizes="100vw" className="h-full w-full" />
              </div>
            </div>
          </div>
        )}

        {/* body */}
        <Container>
          <div id="note-body" className="mx-auto flex max-w-[680px] flex-col gap-6 py-16 md:py-24">
            {post.blocks.map((b, k) => (
              <BlockView key={k} b={b} />
            ))}

            {post.related && (
              <Link
                href={post.related.href}
                data-cs="fade"
                className="group mt-10 flex items-center justify-between gap-6 rounded-[20px] border border-line px-6 py-5 transition-colors hover:border-ink/30"
              >
                <span className="text-[15px]">{post.related.label}</span>
                <span aria-hidden className="text-ink/50 transition-[color,transform] duration-500 ease-skayl-out group-hover:translate-x-1 group-hover:text-orange">
                  →
                </span>
              </Link>
            )}
          </div>
        </Container>
      </article>

      {/* next note */}
      <section className="pb-8">
        <Container>
          <Link href={`/blog/${next.slug}`} className="group block border-y border-line py-10 md:py-14">
            <span className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-muted">
              <span>Next note</span>
              <span>{next.category}</span>
            </span>
            <span className="mt-5 flex items-end justify-between gap-6">
              <span className="display text-balance text-3xl leading-[1.05] transition-transform duration-500 ease-skayl-out group-hover:translate-x-2 md:text-5xl">
                {next.title}
              </span>
              <span aria-hidden className="display text-3xl text-ink/30 transition-[color,transform] duration-500 ease-skayl-out group-hover:translate-x-1 group-hover:text-orange md:text-5xl">
                →
              </span>
            </span>
          </Link>
        </Container>
      </section>

      <HomeCTA />
    </CaseStudyMotion>
  );
}
