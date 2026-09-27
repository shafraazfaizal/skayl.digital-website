import Image from "next/image";
import type { CSSProperties } from "react";
import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { BrowserFrame, PhoneMock } from "@/components/case-study/Frames";
import { imageSize } from "@/lib/public-asset";
import { fs, fsColours, type FsAssets } from "@/content/framed-case-study";

const SCREEN = 19.5 / 9; // PhoneMock screen ratio (h / w)

/** A full-page mobile capture that loops top → bottom inside a phone while in view. */
function PhoneScroll({ src, alt, offset = 0 }: { src: string | null; alt: string; offset?: number }) {
  const size = imageSize(src);
  if (!src || !size) return <MediaSlot src={src} alt={alt} label="Mobile" kind="ui" position="50% 0%" className="absolute inset-0" />;
  const ratio = size.h / size.w;
  const travel = (1 - SCREEN / ratio) * 100;
  const duration = Math.min(34, Math.max(14, (ratio - SCREEN) * 3.2 + 8));
  return (
    <div
      data-cs-autoscroll
      className="absolute inset-x-0 top-0"
      style={{ "--cs-scroll": `-${travel.toFixed(2)}%`, "--cs-dur": `${duration.toFixed(1)}s`, "--cs-delay": `${-offset * 3}s` } as CSSProperties}
    >
      <Image src={src} alt={alt} width={size.w} height={size.h} sizes="(max-width: 768px) 40vw, 300px" className="block h-auto w-full" />
    </div>
  );
}

// 06 — The e-commerce experience: the heart of the project. The live
// homepage scrolls inside a browser, the phone runs beside it, then the key
// screens and the site's own four-step order flow.
export default function FsEcommerce({ assets }: { assets: FsAssets }) {
  const { ecommerce } = fs;
  return (
    <section className="pb-24 md:pb-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {ecommerce.eyebrow}
              <span aria-hidden className="h-px w-10 bg-orange" />
            </span>
            <h2 className="display text-[3rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl">
              {ecommerce.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={`block ${i === ecommerce.title.length - 1 ? "text-ink/30" : ""}`}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p data-cs="fade" className="max-w-sm text-[17px] leading-relaxed text-muted">
              {ecommerce.body}
            </p>
            <a
              data-cs="fade"
              href={fs.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 border-b border-ink/25 pb-1 text-sm transition-colors hover:border-orange hover:text-orange"
            >
              {fs.websiteLabel}
              <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </Container>

      {/* the storefront stage */}
      <div className="mt-14 px-5 md:mt-20 md:px-12">
        <div
          className="relative overflow-hidden rounded-[28px] px-4 pb-14 pt-10 md:rounded-[36px] md:px-14 md:pb-24 md:pt-20"
          style={{ background: `radial-gradient(80% 70% at 50% 20%, #16335C 0%, ${fsColours.navy} 45%, ${fsColours.deep} 100%)` }}
        >
          <div aria-hidden className="skayl-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
          <div className="relative mx-auto max-w-[1180px]">
            <div data-cs="clip">
              <BrowserFrame url={fs.websiteLabel} tone="dark">
                <div data-cs-scrollimg className="relative aspect-[16/10]">
                  <MediaSlot
                    src={assets.webHomeFull ?? assets.webHome}
                    alt="The Framed Splendor homepage, scrolled top to bottom"
                    label="Homepage"
                    sizes="(max-width: 768px) 100vw, 1180px"
                    position="50% 0%"
                    className="absolute inset-0"
                  />
                </div>
              </BrowserFrame>
            </div>
            <div data-cs="fade" data-cs-delay="0.3" className="absolute -bottom-10 right-2 w-[30%] max-w-[250px] sm:right-4 md:-bottom-16 md:-right-6 md:w-[22%]">
              <div data-cs-parallax="-6">
                <PhoneMock>
                  <PhoneScroll src={assets.mobileHome} alt="The Framed Splendor homepage on mobile" />
                </PhoneMock>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* key screens */}
      <Container className="mt-16 md:mt-28">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-20">
          {ecommerce.screens.map((s, i) => {
            const wide = i === 0 || i === 3;
            return (
              <figure
                key={s.key}
                className={`flex flex-col gap-4 ${wide ? "md:col-span-7" : "md:col-span-5"} ${i === 1 ? "md:mt-24" : ""} ${i === 2 ? "md:-mt-12" : ""}`}
              >
                <div data-cs="clip" data-cs-delay={String((i % 2) * 0.1)}>
                  <BrowserFrame url={fs.websiteLabel}>
                    <div className={`relative ${s.key === "webProduct" ? "aspect-[1600/1300]" : "aspect-[16/10]"}`}>
                      <MediaSlot
                        src={assets[s.key]}
                        alt={`Framed Splendor website — ${s.title}`}
                        label={s.title}
                        position="50% 0%"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        className="absolute inset-0"
                      />
                    </div>
                  </BrowserFrame>
                </div>
                <figcaption data-cs="fade" className="flex items-baseline gap-4 border-t border-line pt-4">
                  <span className="text-[11px] tabular-nums text-orange">0{i + 1}</span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[15px]">{s.title}</span>
                    <span className="text-sm text-muted">{s.caption}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>

      {/* the store on mobile */}
      <div className="mt-20 px-5 md:mt-32 md:px-12">
        <div className="relative overflow-hidden rounded-[28px] bg-[#EAE3D2] px-4 py-14 md:rounded-[36px] md:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-10 md:gap-14">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              The store on mobile
            </span>
            <div className="grid w-full grid-cols-3 items-start gap-3 sm:gap-6 md:gap-12">
              {[
                { src: assets.mobileShop, alt: "The Framed Splendor collection on mobile" },
                { src: assets.mobileHome, alt: "The Framed Splendor homepage on mobile" },
                { src: assets.mobileProduct, alt: "A Framed Splendor product page on mobile" },
              ].map((p, i) => (
                <div key={i} data-cs="fade" data-cs-delay={String(i * 0.1)} className={i === 1 ? "" : "mt-10 md:mt-20"}>
                  <PhoneMock>
                    <PhoneScroll src={p.src} alt={p.alt} offset={i + 1} />
                  </PhoneMock>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* how it works — the site's own flow */}
      <Container className="mt-20 md:mt-32">
        <div className="grid gap-10 md:grid-cols-[0.8fr_2fr] md:gap-16">
          <div className="flex flex-col gap-4">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              How it works
            </span>
            <h3 data-cs="lines" className="display text-3xl leading-tight md:text-4xl">
              Order now. Pay once it&rsquo;s confirmed.
            </h3>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[20px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ecommerce.steps.map((s, i) => (
              <li key={s.name} data-cs="fade" data-cs-delay={String(i * 0.08)} data-cs-focus className="group flex flex-col gap-10 bg-cream p-6 md:p-7">
                <span className="display text-4xl text-ink/20 transition-colors duration-500 group-hover:text-orange [.cs-mobile-fx_.cs-focus_&]:text-orange">
                  0{i + 1}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[15px]">{s.name}</span>
                  <span className="text-sm leading-relaxed text-muted">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
