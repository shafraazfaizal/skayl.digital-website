import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import CTA from "@/components/sections/shared/CTA";
import { posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog — SKAYL" };
  return { title: `${post.title} — SKAYL`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article className="pt-16 pb-20 md:pt-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal className="mb-8 flex items-center gap-3 text-sm text-muted">
              <Badge>{post.tag}</Badge>
              <span>{post.date}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display text-4xl leading-[1.02] md:text-5xl">
                {post.title}
              </h1>
            </Reveal>
            <div className="mt-10 flex flex-col gap-6">
              {post.body.map((para, i) => (
                <Reveal key={i} delay={0.05 + i * 0.03}>
                  <p className="text-lg leading-relaxed text-muted">{para}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12">
              <Link
                href="/blog"
                className="text-sm text-orange underline-offset-4 hover:underline"
              >
                ← Back to all posts
              </Link>
            </Reveal>
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
