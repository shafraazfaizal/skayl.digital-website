import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import LoopVideo from "@/components/case-study/LoopVideo";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";

// 11 — Cinematic content. The promo film leads when it's in the project;
// the product film sits beside it. Sound is off until the viewer asks.
export default function ShFilm({ assets }: { assets: ShAssets }) {
  const { film } = sh;
  const lead = assets.promo ?? assets.film;
  const leadPoster = assets.promo ? assets.promoPoster : assets.filmPoster;
  const leadLabel = assets.promo ? film.promoLabel : film.label;
  const support = assets.promo ? assets.film : null;
  if (!lead) return null;

  return (
    <section className="px-5 md:px-12">
      <div className="relative overflow-hidden rounded-[28px] bg-black text-cream md:rounded-[36px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(40% 50% at 50% 55%, ${shColours.gold}1f, rgba(0,0,0,0) 70%)` }}
        />
        <Container className="relative grid gap-12 py-24 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16 md:py-32">
          <div className="flex flex-col gap-6">
            <Eyebrow light>{film.eyebrow}</Eyebrow>
            <h2 data-cs="lines" className="display text-5xl leading-[0.98] md:text-7xl">
              {film.headline}
            </h2>
            <p data-cs="fade" className="max-w-md text-[17px] leading-relaxed text-cream/60">
              {film.body}
            </p>
          </div>

          <div className="flex items-end justify-center gap-4 md:gap-6">
            <div data-cs="fade" className="relative aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-[22px] ring-1 ring-white/10">
              <LoopVideo
                src={lead}
                poster={leadPoster}
                label={leadLabel}
                className="h-full w-full object-cover"
                pauseControl
                soundControl
                controlsClassName="absolute bottom-4 left-4 right-4 z-10 justify-between"
              />
            </div>
            {support && (
              <div data-cs="fade" data-cs-delay="0.15" className="relative hidden aspect-[9/16] w-[38%] max-w-[220px] overflow-hidden rounded-[18px] ring-1 ring-white/10 sm:block md:mb-16">
                <LoopVideo src={support} poster={assets.filmPoster} label={film.label} className="h-full w-full object-cover" pauseControl controlsClassName="absolute bottom-3 right-3 z-10" />
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
