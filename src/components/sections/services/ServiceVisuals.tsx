import Image from "next/image";
import type { ReactNode } from "react";
import MediaSlot from "@/components/case-study/MediaSlot";
import LoopVideo from "@/components/case-study/LoopVideo";
import { BrowserFrame } from "@/components/case-study/Frames";
import { cn } from "@/lib/utils";

// Real work for each service chapter. Every image is from a delivered
// project; anything missing from /public simply shows its placeholder.

export type ServiceAssets = Record<
  | "jmaMockup"
  | "fsHomeFull"
  | "fsInterior"
  | "shajaraLid"
  | "shajaraStack"
  | "autoviveDeck"
  | "autovivePost"
  | "fsMark"
  | "shajaraReel"
  | "shajaraReelPoster"
  | "shajaraPour"
  | "shajaraPost",
  string | null
>;

function Tile({
  children,
  caption,
  className,
  delay = 0,
  parallax,
}: {
  children: ReactNode;
  caption: string;
  className?: string;
  delay?: number;
  parallax?: number;
}) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div data-cs="clip" data-cs-delay={String(delay)} className="relative overflow-hidden rounded-[18px] md:rounded-[24px]">
        <div data-cs-inner className="relative">
          {parallax ? <div data-cs-parallax={String(parallax)}>{children}</div> : children}
        </div>
      </div>
      <figcaption data-cs="fade" className="text-[11px] uppercase tracking-[0.22em] text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export function WebVisual({ a }: { a: ServiceAssets }) {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      <Tile caption="JMA UK — Website" className="col-span-6">
        <div className="relative aspect-[4/5] bg-ink">
          <MediaSlot src={a.jmaMockup} alt="The JMA UK website on a laptop" label="JMA UK" kind="photo" sizes="(max-width: 640px) 100vw, 30vw" className="absolute inset-0" />
        </div>
      </Tile>
      <Tile caption="Framed Splendor — E-commerce" className="col-span-6 mt-12 sm:mt-24" delay={0.1}>
        <div className="relative aspect-[4/5] bg-[#0B1F3A]">
          <MediaSlot src={a.fsInterior} alt="A Framed Splendor LED mirror in a travertine bathroom" label="Framed Splendor" kind="photo" position="42% 50%" sizes="(max-width: 640px) 100vw, 30vw" className="absolute inset-0" />
        </div>
      </Tile>
      <div data-cs="clip" className="col-span-12 mt-2 md:mt-4">
        <BrowserFrame url="framedsplendor.co.uk">
          <div data-cs-scrollimg className="relative aspect-[16/10]">
            <MediaSlot src={a.fsHomeFull} alt="The Framed Splendor homepage, scrolled top to bottom" label="Homepage" position="50% 0%" sizes="(max-width: 768px) 100vw, 55vw" className="absolute inset-0" />
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}

export function BrandVisual({ a }: { a: ServiceAssets }) {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      <Tile caption="Shajara Tea — Packaging" className="col-span-7" parallax={4}>
        <div className="relative aspect-[3/4] scale-[1.08] bg-[#12281D]">
          <MediaSlot src={a.shajaraLid} alt="Shajara Tea canisters with the calligraphic wordmark" label="Shajara Tea" kind="photo" sizes="(max-width: 640px) 100vw, 35vw" className="absolute inset-0" />
        </div>
      </Tile>
      <div className="col-span-5 mt-10 flex flex-col gap-3 sm:mt-20 md:gap-5">
        <Tile caption="Framed Splendor — Monogram" delay={0.1}>
          <div className="flex aspect-square items-center justify-center bg-[#07152A]">
            {a.fsMark && <Image src={a.fsMark} alt="The Framed Splendor FS monogram" width={925} height={822} unoptimized className="h-auto w-[42%]" />}
          </div>
        </Tile>
        <Tile caption="AutoVive — Social" delay={0.2}>
          <div className="relative aspect-square bg-[#0A2A4A]">
            <MediaSlot src={a.autovivePost} alt="An AutoVive social post" label="AutoVive" kind="photo" sizes="(max-width: 640px) 100vw, 25vw" className="absolute inset-0" />
          </div>
        </Tile>
      </div>
      <Tile caption="AutoVive — Investor pitch deck" className="col-span-12 mt-2 md:mt-4">
        <div className="relative aspect-[16/9] bg-ink">
          <MediaSlot src={a.autoviveDeck} alt="The AutoVive investor pitch deck cover" label="AutoVive" kind="photo" sizes="(max-width: 768px) 100vw, 55vw" className="absolute inset-0" />
        </div>
      </Tile>
    </div>
  );
}

export function ContentVisual({ a }: { a: ServiceAssets }) {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-5">
      <Tile caption="Shajara Tea — Photography" className="col-span-7" parallax={4}>
        <div className="relative aspect-[3/4] scale-[1.08] bg-[#E9E4DA]">
          <MediaSlot src={a.shajaraPour} alt="Shajara tea poured from a porcelain teapot" label="Photography" kind="photo" sizes="(max-width: 640px) 58vw, 35vw" className="absolute inset-0" />
        </div>
      </Tile>
      <div className="col-span-5 mt-12 flex flex-col gap-3 sm:mt-24 md:gap-5">
        <Tile caption="Shajara Tea — Product film" delay={0.1}>
          <div className="relative aspect-[9/16] bg-ink">
            {a.shajaraReel ? (
              <LoopVideo
                src={a.shajaraReel}
                poster={a.shajaraReelPoster}
                label="Shajara Tea product film"
                className="absolute inset-0 h-full w-full object-cover"
                pauseControl
                controlsClassName="absolute bottom-3 right-3 z-10"
              />
            ) : (
              <MediaSlot src={a.shajaraReelPoster} alt="Shajara Tea product film" label="Film" kind="photo" className="absolute inset-0" />
            )}
          </div>
        </Tile>
      </div>
      <Tile caption="Shajara Tea — Social" className="col-span-7 col-start-3 mt-2 sm:col-span-5 sm:col-start-2 md:mt-4" delay={0.1}>
        <div className="relative aspect-[4/5] bg-[#12281D]">
          <MediaSlot src={a.shajaraPost} alt="A Shajara Tea social post" label="Social" kind="photo" sizes="(max-width: 640px) 58vw, 25vw" className="absolute inset-0" />
        </div>
      </Tile>
    </div>
  );
}
