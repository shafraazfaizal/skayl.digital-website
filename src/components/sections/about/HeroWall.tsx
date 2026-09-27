import Image from "next/image";
import { aboutHero } from "@/content/about";

type Item = (typeof aboutHero.wall)[number][number];

function Card({ item, eager }: { item: Item; eager: boolean }) {
  const isVideo = item.src.endsWith(".mp4");
  return (
    <figure className="about-wall-card group/card relative overflow-hidden rounded-[14px] bg-[#1A0D08] ring-1 ring-inset ring-cream/10 md:rounded-[16px]">
      {isVideo ? (
        <video
          src={item.src}
          poster={item.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label={`${item.title} — ${item.type}`}
          className="block h-auto w-full"
          style={{ aspectRatio: `${item.w} / ${item.h}` }}
        />
      ) : (
        <Image
          src={item.src}
          alt={`${item.title} — ${item.type}`}
          width={item.w}
          height={item.h}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 768px) 45vw, 20vw"
          className="block h-auto w-full"
        />
      )}
      <figcaption className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-ink/65 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-cream/90 backdrop-blur md:text-[10px]">
        <span className="font-medium normal-case tracking-normal">{item.title}</span>
        <span className="text-cream/45">·</span>
        {item.type}
      </figcaption>
    </figure>
  );
}

/**
 * The hero's live wall: two columns of real work at their own proportions,
 * drifting in opposite directions on a seamless loop (CSS only). Pauses on
 * hover; still for reduced motion.
 */
export default function HeroWall() {
  return (
    <div className="about-wall absolute inset-0 grid grid-cols-2 gap-2.5 px-2.5 md:gap-3 md:px-3">
      {aboutHero.wall.map((col, c) => (
        <div key={c} className="relative overflow-hidden">
          <div className={`about-wall-track flex flex-col ${c === 0 ? "about-wall-down" : "about-wall-up"}`}>
            {/* the list twice, so the loop has no seam */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex flex-col gap-2.5 pb-2.5 md:gap-3 md:pb-3" aria-hidden={copy === 1 || undefined}>
                {col.map((item, i) => (
                  <Card key={`${copy}-${i}`} item={item} eager={copy === 0 && i < 2} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
