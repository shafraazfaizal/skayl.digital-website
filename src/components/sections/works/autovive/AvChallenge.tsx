import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { av, avColours, type AvAssets } from "@/content/autovive-case-study";

// 03 — The challenge, beside the brand's own launch post that asks the
// question the business answers: "Dust settles. But should it settle here?"
// Then the four promises the identity had to carry.
export default function AvChallenge({ assets }: { assets: AvAssets }) {
  const { challenge } = av;
  return (
    <div>
      <div className="grid gap-12 py-20 md:grid-cols-[1fr_0.9fr] md:gap-0 md:py-0">
        <Container className="flex flex-col justify-center gap-8 md:py-32 md:pr-16">
          <Eyebrow light>{challenge.eyebrow}</Eyebrow>
          <h2 className="display max-w-xl text-[2.7rem] leading-[0.98] md:text-6xl lg:text-7xl">
            {challenge.headline.map((l, i) => (
              <span key={l} data-cs="lines" data-cs-delay={String(i * 0.08)} className="block">
                {i === challenge.headline.length - 1 ? (
                  <>
                    {l.replace(/\.$/, "")}
                    <span style={{ color: avColours.cyan }}>.</span>
                  </>
                ) : (
                  l
                )}
              </span>
            ))}
          </h2>
          <div data-cs="stagger" className="flex max-w-lg flex-col gap-5 text-[17px] leading-relaxed text-cream/65">
            {challenge.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>

        <figure className="relative mx-5 md:mx-0">
          <div data-cs="clip" className="relative aspect-square overflow-hidden rounded-[22px] md:aspect-auto md:h-full md:min-h-[720px] md:rounded-none">
            <div data-cs-inner className="absolute inset-0">
              <div data-cs-parallax="5" className="absolute -inset-y-[6%] inset-x-0">
                <MediaSlot
                  src={assets.post3}
                  alt="AutoVive post: “wash me” written in the dust on a car window — Dust settles. But should it settle here?"
                  label="Challenge"
                  kind="photo"
                  sizes="(max-width: 768px) 100vw, 46vw"
                  position="50% 40%"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-[#061526] md:via-transparent md:via-[22%]" />
          </div>
        </figure>
      </div>

      {/* the promises */}
      <Container className="pb-20 md:pb-28 md:pt-20">
        <div className="grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-[0.8fr_2fr] md:gap-16">
          <span data-cs="fade" className="text-[11px] uppercase tracking-[0.25em] text-cream/50">
            {challenge.promisesTitle}
          </span>
          <ol data-cs="stagger" className="grid gap-px overflow-hidden rounded-[20px] bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {challenge.promises.map((p, i) => (
              <li key={p} data-cs-focus className="group flex flex-col gap-8 p-6 md:p-7" style={{ backgroundColor: avColours.deep }}>
                <span
                  className="display text-3xl text-cream/20 transition-colors duration-500 group-hover:text-[color:var(--av)] [.cs-mobile-fx_.cs-focus_&]:text-[color:var(--av)]"
                  style={{ ["--av" as string]: avColours.cyan }}
                >
                  0{i + 1}
                </span>
                <span className="text-[16px] leading-snug text-cream/85">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
}
