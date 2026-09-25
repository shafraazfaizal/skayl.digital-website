import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog — SKAYL",
  description: "Notes on design, development, and building brands that mean it.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the studio."
        subtitle="Thinking on design, development, and building brands that mean it."
      />
      <section className="pb-28">
        <Container>
          <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-line p-6 transition-colors hover:bg-ink/[0.03]"
                >
                  <div className="flex items-center justify-between text-xs text-muted">
                    <Badge>{p.tag}</Badge>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="display text-2xl">{p.title}</h3>
                  <p className="text-sm text-muted">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
