import Image from "next/image";
import Container from "@/components/ui/Container";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

// 04 — Brand identity, told as one composition rather than a spec sheet:
// the wordmark at scale, the same mark living on navy and on black, then the
// colour it's made of and the voice it speaks in.
export default function AvIdentity({ assets }: { assets: AvAssets }) {
  const { identity } = av;
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-6">
            <span data-cs="fade" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
              {identity.eyebrow}
              <span aria-hidden className="h-px w-10" style={{ backgroundColor: avColours.cyan }} />
            </span>
            <h2 className="display text-[3.2rem] leading-[0.9] sm:text-7xl md:text-8xl">
              {identity.title.map((l, i) => (
                <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className={i === 1 ? "block text-ink/45" : "block"}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-muted">
            {identity.body}
          </p>
        </div>

        {/* the mark, three ways */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-5">
          <div data-cs="clip" className="relative col-span-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px] bg-white md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[560px] md:rounded-[28px]">
            <div data-cs-inner className="flex h-full w-full items-center justify-center">
              {assets.logoDark && (
                <Image src={assets.logoDark} alt="The AutoVive wordmark" width={1400} height={564} sizes="(max-width: 768px) 80vw, 40vw" className="h-auto w-[70%]" />
              )}
            </div>
            <span className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.28em] text-ink/40">Primary wordmark</span>
          </div>
          <div data-cs="clip" data-cs-delay="0.1" className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[22px] md:col-span-5 md:aspect-auto md:min-h-[270px] md:rounded-[28px]" style={{ backgroundColor: avColours.navy }}>
            <div data-cs-inner className="flex h-full w-full items-center justify-center">
              {assets.logoLight && <Image src={assets.logoLight} alt="The AutoVive wordmark on navy" width={1400} height={564} sizes="(max-width: 768px) 40vw, 25vw" className="h-auto w-[62%]" />}
            </div>
            <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.28em] text-white/45">On navy</span>
          </div>
          <div data-cs="clip" data-cs-delay="0.2" className="relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-[22px] bg-[#0A0A0A] md:col-span-5 md:aspect-auto md:min-h-[270px] md:rounded-[28px]">
            <div data-cs-inner className="flex h-full w-full flex-col items-center justify-center gap-4">
              {assets.logoLight && <Image src={assets.logoLight} alt="The AutoVive wordmark on black" width={1400} height={564} sizes="(max-width: 768px) 40vw, 25vw" className="h-auto w-[46%]" />}
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 md:text-[11px]">{av.hero.tagline}</span>
            </div>
            <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.28em] text-white/45">On black</span>
          </div>
        </div>

        {/* colour */}
        <div className="mt-16 flex flex-col gap-5 md:mt-24">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
            <span data-cs="fade" className="text-[11px] uppercase tracking-[0.25em] text-muted">
              Colour
            </span>
            <span data-cs="fade" className="text-[11px] text-muted">
              Sampled from the logo and brand files
            </span>
          </div>
          <ul data-cs="stagger" className="grid grid-cols-2 gap-3 md:grid-cols-[2fr_1.4fr_1fr_0.8fr] md:gap-4">
            {identity.colours.map((c) => (
              <li key={c.hex} className="flex flex-col gap-3">
                <span className="block h-28 rounded-[16px] ring-1 ring-inset ring-ink/10 md:h-44 md:rounded-[20px]" style={{ backgroundColor: c.hex }} />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[14px] text-ink">{c.name}</span>
                  <span className="text-[12px] tabular-nums text-muted">
                    {c.hex} · {c.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* the voice, drifting past */}
      <div className="mt-20 overflow-hidden border-y border-line py-8 md:mt-28 md:py-12" aria-label="The brand’s voice">
        <Container>
          <span data-cs="fade" className="text-[11px] uppercase tracking-[0.25em] text-muted">
            The voice — lines from the brand’s own posts
          </span>
        </Container>
        <div data-cs-drift="8" className="mt-6 flex w-max items-center gap-10 whitespace-nowrap pl-[6vw] md:gap-14">
          {identity.voice.map((v, i) => (
            <span key={v} className="flex items-center gap-10 md:gap-14">
              <span className={`display text-4xl md:text-6xl lg:text-7xl ${i % 2 ? "text-ink/45" : "text-ink"}`}>{v}</span>
              <span aria-hidden className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: avColours.cyan }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
