import Image from "next/image";
import Container from "@/components/ui/Container";
import MediaSlot from "@/components/case-study/MediaSlot";
import { fs, fsColours, type FsAssets } from "@/content/framed-case-study";

// 03 — Brand identity, as an editorial spread: the statement, the mark at
// scale, the system (colour, type, marks), then the identity in use.
export default function FsIdentity({ assets }: { assets: FsAssets }) {
  const { identity } = fs;
  return (
    <Container className="relative py-24 md:py-32">
      <div className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-[1fr_1.1fr_0.9fr] md:gap-0 md:pb-20">
        <div className="flex flex-col gap-7 md:pr-10">
          <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:text-xs">
            {identity.eyebrow}
            <span aria-hidden className="h-px w-10" style={{ backgroundColor: fsColours.gold }} />
          </span>
          <h2 className="display text-5xl leading-[0.92] md:text-6xl lg:text-7xl">
            {identity.title.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p data-cs="fade" className="max-w-sm text-[16px] leading-relaxed text-cream/60">
            {identity.body}
          </p>
        </div>

        {/* the mark, given room */}
        <div className="flex flex-col items-center justify-center gap-7 border-cream/10 py-6 md:border-x md:px-10">
          {assets.markLight && (
            <div data-cs="fade" className="w-[46%] max-w-[220px]">
              <Image src={assets.markLight} alt="The Framed Splendor FS monogram" width={925} height={822} unoptimized className="h-auto w-full" />
            </div>
          )}
          {assets.wordmarkLight && (
            <div data-cs="fade" data-cs-delay="0.15" className="w-[88%] max-w-[380px]">
              <Image src={assets.wordmarkLight} alt="Framed Splendor" width={900} height={200} unoptimized className="h-auto w-full" />
            </div>
          )}
          <span data-cs="fade" data-cs-delay="0.25" className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
            {fs.reveal.descriptor}
          </span>
        </div>

        {/* the system */}
        <div className="flex flex-col gap-10 md:pl-10">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-cream/45">Colour</span>
            <ul data-cs="stagger" className="grid grid-cols-4 gap-3">
              {identity.colours.map((c) => (
                <li key={c.hex} className="flex flex-col gap-2">
                  <span className="aspect-square rounded-full ring-1 ring-inset ring-cream/15" style={{ backgroundColor: c.hex }} />
                  <span className="text-[10px] uppercase leading-tight tracking-[0.15em] text-cream/55">
                    {c.name}
                    <br />
                    <span className="tabular-nums text-cream/35">{c.hex}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-cream/45">Marks</span>
            <div data-cs="stagger" className="grid grid-cols-2 gap-3">
              <div className="flex aspect-square items-center justify-center rounded-[14px]" style={{ backgroundColor: fsColours.cream }}>
                {assets.markDark && <Image src={assets.markDark} alt="FS monogram on cream" width={925} height={822} unoptimized className="h-auto w-[52%]" />}
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[14px]">
                <MediaSlot src={assets.avatar} alt="The Framed Splendor social avatar" label="Avatar" kind="photo" sizes="160px" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the identity in use */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-12 md:gap-4">
        <div data-cs="clip" className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[18px] md:col-span-5 md:aspect-auto md:min-h-[300px]">
          <div data-cs-inner className="absolute inset-0">
            <MediaSlot src={assets.webHome} alt="The Framed Splendor homepage" label="Website" kind="photo" position="0% 0%" sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full" />
          </div>
        </div>
        <div data-cs="clip" data-cs-delay="0.08" className="relative aspect-[4/5] overflow-hidden rounded-[18px] md:col-span-2">
          <div data-cs-inner className="absolute inset-0">
            <MediaSlot src={assets.post1} alt="Framed Splendor campaign post: Where light meets luxury" label="Post" kind="photo" position="50% 90%" sizes="(max-width: 768px) 50vw, 16vw" className="h-full w-full" />
          </div>
        </div>
        <div data-cs="clip" data-cs-delay="0.16" className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-[18px] md:col-span-2" style={{ backgroundColor: fsColours.navy }}>
          <span className="display px-4 text-center text-2xl leading-tight md:text-[1.7rem]">
            Light.
            <br />
            Space.
            <br />
            <span style={{ color: fsColours.gold }}>Splendor.</span>
          </span>
        </div>
        <div data-cs="clip" data-cs-delay="0.24" className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[18px] md:col-span-3 md:aspect-auto">
          <div data-cs-inner className="absolute inset-0">
            <MediaSlot src={assets.heroPhoto} alt="A Framed Splendor mirror glowing against dark stone" label="Photography" kind="photo" position="40% 50%" sizes="(max-width: 768px) 100vw, 25vw" className="h-full w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
