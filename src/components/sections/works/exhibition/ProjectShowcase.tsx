import Image from "next/image";
import Link from "next/link";
import MediaSlot from "@/components/case-study/MediaSlot";
import { BrowserFrame } from "@/components/case-study/Frames";
import { cn } from "@/lib/utils";

export type ShowcaseVisual =
  | { kind: "image"; src: string | null; alt: string; position?: string; bg?: string }
  | { kind: "browser"; src: string; alt: string; url: string; bg: string }
  | { kind: "mockup"; src: string | null; alt: string; bg: string };

export type ShowcaseDetail = { src: string; alt: string; w: number; h: number; caption: string } | null;

export type ShowcaseItem = {
  slug: string;
  no: string;
  title: string;
  href: string;
  year: string;
  industry: string;
  disciplines: string;
  lede: string;
  deliverables: string[];
  filters: string[];
  layout: "split" | "full";
  visual: ShowcaseVisual;
  detail: ShowcaseDetail;
  preview: string | null; // small image for the index hover preview
};

function Visual({ v, full }: { v: ShowcaseVisual; full: boolean }) {
  const sizes = full ? "100vw" : "(max-width: 768px) 100vw, 60vw";
  if (v.kind === "browser") {
    return (
      <div className="absolute inset-0 flex items-end justify-center px-[7%] pt-[8%]" style={{ background: v.bg }}>
        <div className="w-full max-w-[980px] transition-transform duration-[1400ms] ease-skayl-out group-hover:-translate-y-2">
          <BrowserFrame url={v.url} tone="dark" className="rounded-b-none md:rounded-b-none">
            <div data-cs-scrollimg className="relative aspect-[16/10]">
              <MediaSlot src={v.src} alt={v.alt} label="Website" position="50% 0%" sizes={sizes} className="absolute inset-0" />
            </div>
          </BrowserFrame>
        </div>
      </div>
    );
  }
  if (v.kind === "mockup") {
    return (
      <div className="absolute inset-0" style={{ background: v.bg }}>
        {v.src && (
          <Image
            src={v.src}
            alt={v.alt}
            fill
            sizes={sizes}
            className="object-contain object-center p-[4%] transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.035]"
          />
        )}
      </div>
    );
  }
  return (
    <div className="absolute inset-0" style={{ background: v.bg }}>
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-skayl-out group-hover:scale-[1.045]">
        <MediaSlot src={v.src} alt={v.alt} label="Project" kind="photo" position={v.position} sizes={sizes} className="h-full w-full" />
      </div>
    </div>
  );
}

function Head({ it }: { it: ShowcaseItem }) {
  return (
    <div className="flex flex-col gap-5">
      <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted">
        <span className="tabular-nums text-orange">{it.no}</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        {it.disciplines}
      </span>
      <h2 id={`${it.slug}-title`} data-cs="lines" className="display text-[2.9rem] leading-[0.95] sm:text-6xl lg:text-7xl">
        <Link href={it.href} className="inline-block transition-transform duration-700 ease-skayl-out group-hover:translate-x-2 focus-visible:outline-none">
          {it.title}
        </Link>
      </h2>
    </div>
  );
}

function Body({ it }: { it: ShowcaseItem }) {
  return (
    <div className="flex flex-col gap-5">
      <p data-cs="fade" className="flex flex-wrap gap-x-3 text-[13px] text-muted">
        <span>{it.industry}</span>
        <span aria-hidden className="text-ink/25">/</span>
        <span className="tabular-nums">{it.year}</span>
      </p>
      <p data-cs="fade" data-cs-delay="0.08" className="max-w-md text-[16px] leading-relaxed text-ink/80 md:text-[17px]">
        {it.lede}
      </p>
      <ul data-cs="fade" data-cs-delay="0.12" className="flex max-w-md flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted">
        {it.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-orange/70" />
            {d}
          </li>
        ))}
      </ul>
      <Link
        href={it.href}
        tabIndex={-1}
        aria-hidden
        data-cs="fade"
        data-cs-delay="0.2"
        className="mt-2 inline-flex w-fit items-center gap-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink"
      >
        <span className="relative pb-1">
          View case study
          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-[0.35] bg-ink transition-[transform,background-color] duration-500 ease-skayl-out group-hover:scale-x-100 group-hover:bg-orange" />
        </span>
        <span className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1.5 group-hover:text-orange">→</span>
      </Link>
    </div>
  );
}

/** A second, smaller piece of the same project that floats over the main image at a different scroll speed. */
function Detail({ d, className }: { d: NonNullable<ShowcaseDetail>; className?: string }) {
  return (
    <figure data-cs-parallax="-14" className={cn("pointer-events-none absolute z-[2] hidden sm:block", className)}>
      <div
        data-wk-detail
        className="overflow-hidden rounded-[14px] shadow-[0_40px_80px_-30px_rgba(15,5,5,0.55)] ring-1 ring-ink/10 md:rounded-[18px]"
        style={{ aspectRatio: `${d.w} / ${d.h}` }}
      >
        <Image src={d.src} alt={d.alt} width={d.w} height={d.h} sizes="(max-width: 1024px) 22vw, 280px" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted">{d.caption}</figcaption>
    </figure>
  );
}

// One room of the exhibition. The image opens like a window as it scrolls
// in (see WorksExhibition); a second piece floats over it at its own pace.
// Split spreads alternate sides; the "full" spread runs edge to edge.
export default function ProjectShowcase({ item, imageRight }: { item: ShowcaseItem; imageRight?: boolean }) {
  const full = item.layout === "full";
  const media = (
    <div className="relative">
      <div
        data-wk-window
        data-wk-media
        className={cn(
          "relative overflow-hidden rounded-[24px] md:rounded-[32px]",
          full ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3] md:aspect-[16/12] lg:aspect-[16/11]"
        )}
      >
        <div data-wk-inner className="absolute inset-0">
          <Visual v={item.visual} full={full} />
        </div>
        <Link href={item.href} tabIndex={-1} aria-hidden className="absolute inset-0 z-10" />
        <span className="pointer-events-none absolute left-5 top-4 z-[11] text-[11px] uppercase tracking-[0.24em] text-cream/85 mix-blend-difference md:left-7 md:top-6">
          {item.no}
        </span>
        {/* "View" follows the pointer over the image (desktop, see WorksExhibition) */}
        <span
          data-wk-chip
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-cream text-[11px] font-medium uppercase tracking-[0.22em] text-ink opacity-0 md:flex"
        >
          View
        </span>
      </div>
      {item.detail && (
        <Detail
          d={item.detail}
          className={cn(
            full ? "-bottom-14 right-[6%] w-[16%]" : imageRight ? "-bottom-12 -left-6 w-[30%] lg:-left-10" : "-bottom-12 -right-6 w-[30%] lg:-right-10"
          )}
        />
      )}
    </div>
  );

  return (
    <article
      id={item.slug}
      aria-labelledby={`${item.slug}-title`}
      data-wk-project={item.no}
      data-wk-title={item.title}
      className="group relative scroll-mt-24 px-5 md:px-12 [&:has(a:focus-visible)]:outline [&:has(a:focus-visible)]:outline-2 [&:has(a:focus-visible)]:outline-offset-8 [&:has(a:focus-visible)]:outline-ink"
    >
      {full ? (
        <div className="flex flex-col gap-10 md:gap-20">
          {media}
          <div className="grid gap-5 md:grid-cols-12 md:gap-10 lg:gap-16">
            <div className="md:col-span-6">
              <Head it={item} />
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-9">
              <Body it={item} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
          <div className={cn("md:col-span-7", imageRight && "md:order-2")}>{media}</div>
          <div className={cn("flex flex-col gap-5 md:col-span-5", imageRight ? "md:order-1" : "md:pl-4 lg:pl-8")}>
            <Head it={item} />
            <Body it={item} />
          </div>
        </div>
      )}
    </article>
  );
}
