import type { MetadataRoute } from "next";
import { works } from "@/content/works";
import { posts } from "@/content/posts";

const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.skayl.digital").replace(/\/$/, "");

// Every public page, so search engines can find all of them.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/works`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const work = works.map((w) => ({ url: `${base}/works/${w.slug}`, changeFrequency: "yearly" as const, priority: 0.8 }));
  const notes = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 }));
  return [...pages, ...work, ...notes].map((e) => ({ ...e, lastModified: now }));
}
