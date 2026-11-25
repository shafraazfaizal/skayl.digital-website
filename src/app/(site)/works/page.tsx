import type { Metadata } from "next";
import CaseStudyMotion from "@/components/case-study/CaseStudyMotion";
import WorksExhibition from "@/components/sections/works/exhibition/WorksExhibition";
import type { ShowcaseDetail, ShowcaseItem, ShowcaseVisual } from "@/components/sections/works/exhibition/ProjectShowcase";
import HomeCTA from "@/components/sections/home/HomeCTA";
import { firstPublicAsset, imageSize, publicAsset } from "@/lib/public-asset";
import { works, type Work } from "@/content/works";

export const metadata: Metadata = {
  title: "Works — SKAYL",
  description: "Selected work from SKAYL — brand, web and content, built around what each client actually needed.",
};

// Each project's hero visual on the Works page. Real assets only; anything
// missing from /public falls back to the next real option.
function visualFor(w: Work): ShowcaseVisual {
  const card = w.cardBg ? publicAsset(w.cardBg) : null;
  switch (w.slug) {
    case "jma-uk": {
      // The live site itself: the full-page screenshot scrolls in a browser,
      // or the real laptop mockup if that screenshot isn't in the project.
      const full = firstPublicAsset("/work/jma-uk/home-full.png", "/work/jma-uk/home-full.jpg");
      const bg = "radial-gradient(90% 80% at 50% 30%, #0D5C6B 0%, #073D47 45%, #0F0505 100%)";
      return full
        ? { kind: "browser", src: full, alt: "The JMA UK homepage", url: "jaffnamuslimuk.org", bg }
        : { kind: "mockup", src: publicAsset(w.cover), alt: "The JMA UK website on a laptop", bg };
    }
    case "framed-splendor":
      return { kind: "image", src: card ?? publicAsset(w.cover), alt: "The Framed Splendor store and brand collateral", position: "58% 50%", bg: "#0B1F3A" };
    case "autovive":
      return { kind: "image", src: card ?? publicAsset(w.cover), alt: "AutoVive brand identity with uniform and stationery", position: "60% 55%", bg: "#06111A" };
    case "shajara-tea":
      return {
        kind: "image",
        src: card ?? publicAsset("/images/work-cards/shajara-tea.png") ?? publicAsset("/work/shajara-tea/case/pack-lid.jpg"),
        alt: "Shajara Tea canisters and brand collateral",
        position: "62% 50%",
        bg: "#070F07",
      };
    default:
      return { kind: "image", src: card ?? publicAsset(w.cover), alt: w.title, bg: w.tint };
  }
}

// A second, smaller real piece that floats over each project's main image.
const details: Record<string, { paths: string[]; alt: string; caption: string }> = {
  "jma-uk": { paths: ["/work/jma-uk/donate.png", "/work/jma-uk/page-zakat.png", "/work/jma-uk/admin.png"], alt: "JMA UK donations", caption: "Donations" },
  "framed-splendor": { paths: ["/work/framed-splendor/case/post-1.jpg"], alt: "Framed Splendor campaign post", caption: "Campaign post" },
  autovive: { paths: ["/work/autovive/posts/4.png"], alt: "AutoVive social post", caption: "Social" },
  "shajara-tea": { paths: ["/work/shajara-tea/case/photo-pour.jpg"], alt: "Shajara Tea product photography", caption: "Photography" },
};

function detailFor(slug: string): ShowcaseDetail {
  const d = details[slug];
  if (!d) return null;
  const src = firstPublicAsset(...d.paths);
  const size = imageSize(src);
  return src && size ? { src, alt: d.alt, caption: d.caption, w: size.w, h: size.h } : null;
}

export default function WorksPage() {
  const items: ShowcaseItem[] = works.map((w, i) => ({
    slug: w.slug,
    no: String(i + 1).padStart(2, "0"),
    title: w.title,
    href: `/works/${w.slug}`,
    year: w.year,
    industry: w.industry ?? w.category ?? "",
    disciplines: w.disciplines ?? w.services.slice(0, 3).join(" / "),
    lede: w.lede ?? w.description,
    deliverables: w.deliverables ?? w.services,
    filters: w.filters ?? [],
    // one cinematic, edge-to-edge spread breaks the rhythm mid-way
    layout: w.slug === "autovive" ? "full" : "split",
    visual: visualFor(w),
    detail: detailFor(w.slug),
    preview: w.slug !== "jma-uk" && w.cardBg ? publicAsset(w.cardBg) ?? publicAsset(w.cover) : publicAsset(w.cover),
  }));

  return (
    <CaseStudyMotion>
      <div className="flex flex-col">
        <WorksExhibition items={items} disciplines={4} />
        <HomeCTA />
      </div>
    </CaseStudyMotion>
  );
}
