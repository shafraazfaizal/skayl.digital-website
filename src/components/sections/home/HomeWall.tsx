import Image from "next/image";
import { imageSize, publicAsset } from "@/lib/public-asset";
import { homeHero } from "@/content/home";

/**
 * The hero's live wall: one column of real work at its true proportions,
 * drifting upwards on a seamless loop (CSS only). Files that aren't in
 * /public are skipped; very tall full-page captures are left out.
 * Pauses on hover; still for reduced motion.
 */
export default function HomeWall() {
  const items = homeHero.wall
    .map((it) => {
      const src = publicAsset(it.src);
      const size = src ? imageSize(src) : null;
      return src && size && size.h / size.w <= 1.6 ? { ...it, src, ...size } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // roughly constant speed however many pieces there are
  const duration = `${Math.max(40, items.length * 7)}s`;

  return (
    <div className="home-wall absolute inset-0 overflow-hidden">
      <div className="home-wall-track flex flex-col" style={{ ["--wall-dur" as string]: duration }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-4 pb-4" aria-hidden={copy === 1 || undefined}>
            {items.map((it, i) => (
              <figure
                key={`${copy}-${it.src}`}
                className="relative overflow-hidden rounded-[18px] bg-ink ring-1 ring-ink/10 shadow-[0_30px_60px_-35px_rgba(15,5,5,0.45)]"
              >
                <Image
                  src={it.src}
                  alt={copy === 0 ? `${it.title} — ${it.type}` : ""}
                  width={it.w}
                  height={it.h}
                  loading={copy === 0 && i < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="block h-auto w-full"
                />
                <figcaption className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink/65 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cream/90 backdrop-blur">
                  <span className="font-medium normal-case tracking-normal">{it.title}</span>
                  <span className="text-cream/45">·</span>
                  {it.type}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
