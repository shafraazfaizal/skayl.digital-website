import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, type ShAssets } from "@/content/shajara-case-study";

// Desktop placement: three staggered rows with varied widths and offsets.
const PLACE = [
  "md:col-start-1 md:col-span-4 md:row-start-1",
  "md:col-start-5 md:col-span-3 md:row-start-1 md:mt-28",
  "md:col-start-8 md:col-span-5 md:row-start-1 md:mt-10",
  "md:col-start-2 md:col-span-3 md:row-start-2 md:mt-8",
  "md:col-start-5 md:col-span-4 md:row-start-2 md:mt-4",
  "md:col-start-9 md:col-span-3 md:row-start-2 md:mt-24",
  "md:col-start-1 md:col-span-5 md:row-start-3",
  "md:col-start-7 md:col-span-4 md:row-start-3 md:mt-16",
];

// 12 — Social media: a curated wall on desktop, a swipeable row on mobile.
export default function ShSocial({ assets }: { assets: ShAssets }) {
  const { social } = sh;
  const posts = social.posts.filter((p) => assets[p.key]);
  if (!posts.length) return null;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{social.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-4xl leading-[1] md:text-6xl">
              {social.headline}
            </h2>
          </div>
          <div data-cs="fade" className="flex flex-col gap-4">
            <p className="text-[17px] leading-relaxed text-muted">{social.body}</p>
            {sh.instagramUrl && (
              <a
                href={sh.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {sh.instagramHandle} ↗
              </a>
            )}
          </div>
        </div>
      </Container>

      <Container className="mt-12 md:mt-20">
        <ul
          aria-label="Shajara Tea social posts"
          data-cs="stagger"
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-12 md:items-start md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((p, i) => (
            <li key={p.key} className={`w-[72vw] shrink-0 snap-center sm:w-[46vw] md:w-auto ${PLACE[i] ?? "md:col-span-4"}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] ring-1 ring-ink/5">
                <MediaSlot src={assets[p.key]} alt={p.alt} label="Post" kind="photo" tone="light" sizes="(max-width: 768px) 72vw, 30vw" className="h-full w-full" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
