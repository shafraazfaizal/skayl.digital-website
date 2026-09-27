import Image from "next/image";
import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import LoopVideo from "@/components/case-study/LoopVideo";
import { fs, fsColours, type FsAssets } from "@/content/framed-case-study";

// 08 — Social. An editorial wall, not a feed grid: one dominant post, the
// catalog reel, and the rest set around them at different heights.
export default function FsSocial({ assets }: { assets: FsAssets }) {
  const { social } = fs;
  return (
    <Container className="py-24 md:py-32">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
        <div className="flex flex-col gap-6">
          <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
            {social.eyebrow}
            <span aria-hidden className="h-px w-10" style={{ backgroundColor: fsColours.gold }} />
          </span>
          <h2 className="display text-[2.8rem] leading-[0.92] sm:text-6xl md:text-7xl">
            {social.title.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={`block ${i === social.title.length - 1 ? "text-cream/35" : ""}`}>
                {l}
              </span>
            ))}
          </h2>
        </div>
        <p data-cs="fade" className="max-w-sm text-[16px] leading-relaxed text-cream/60">
          {social.body}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-5">
        {/* dominant post, a smaller one tucked beneath */}
        <div className="col-span-2 flex flex-col gap-3 md:col-span-5 md:gap-5">
          <div data-cs="clip" className="relative aspect-[4/5] overflow-hidden rounded-[18px] md:rounded-[24px]">
            <div data-cs-inner className="absolute inset-0">
              <MediaSlot src={assets.post1} alt="Post: Where light meets luxury. Premium LED bathroom mirrors." label="Post" kind="photo" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
            </div>
          </div>
          <div data-cs="clip" className="relative ml-auto aspect-[4/5] w-[62%] overflow-hidden rounded-[18px] md:rounded-[24px]">
            <div data-cs-inner className="absolute inset-0">
              <MediaSlot src={assets.post3} alt="Post: One touch. Three modes. Warm, natural and cool." label="Post" kind="photo" sizes="(max-width: 768px) 62vw, 25vw" className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* catalog reel */}
        <div className="flex flex-col gap-6 md:col-span-3 md:pt-32">
          <div data-cs="clip" data-cs-delay="0.1" className="relative aspect-[9/16] overflow-hidden rounded-[18px] ring-1 ring-white/10 md:rounded-[24px]">
            {assets.reel ? (
              <LoopVideo
                src={assets.reel}
                poster={assets.reelPoster}
                label="Framed Splendor catalog reel"
                className="h-full w-full object-cover"
                pauseControl
                controlsClassName="absolute bottom-3 right-3 z-10"
              />
            ) : (
              <MediaSlot src={assets.reelPoster} alt="Framed Splendor catalog reel" label="Reel" kind="photo" className="h-full w-full" />
            )}
          </div>
          <span data-cs="fade" className="text-[11px] uppercase tracking-[0.25em] text-cream/45">
            Catalog reel
          </span>
        </div>

        {/* profile + post + line */}
        <div className="flex flex-col gap-3 md:col-span-4 md:gap-5">
          <div data-cs="fade" data-cs-delay="0.2" className="flex flex-col items-start gap-3 rounded-[18px] border border-cream/10 p-3 sm:flex-row sm:items-center md:gap-4 md:rounded-[24px] md:p-5">
            {assets.avatar && (
              <Image src={assets.avatar} alt="" width={800} height={800} sizes="56px" className="h-10 w-10 shrink-0 rounded-full md:h-14 md:w-14" />
            )}
            <span className="flex w-full min-w-0 flex-col">
              <span className="truncate text-[13px] md:text-[15px]">{social.handle}</span>
              <span className="truncate text-[10px] uppercase tracking-[0.2em] text-cream/45 md:text-[11px]">{fs.reveal.tagline}</span>
            </span>
          </div>
          <div data-cs="clip" data-cs-delay="0.2" className="relative aspect-[4/5] overflow-hidden rounded-[18px] md:rounded-[24px]">
            <div data-cs-inner className="absolute inset-0">
              <MediaSlot src={assets.post2} alt="Post: No more wiping down — built-in anti-fog." label="Post" kind="photo" sizes="(max-width: 768px) 50vw, 33vw" className="h-full w-full" />
            </div>
          </div>
          <span data-cs="fade" className="display mt-4 hidden text-2xl leading-tight md:block md:text-3xl">
            Same light. Same navy. <span style={{ color: fsColours.gold }}>Same gold.</span>
          </span>
        </div>
      </div>
    </Container>
  );
}
