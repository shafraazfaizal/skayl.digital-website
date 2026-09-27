import Image from "next/image";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import MediaSlot from "@/components/case-study/MediaSlot";
import { sh, shColours, type ShAssets } from "@/content/shajara-case-study";

const LAYOUT = [
  "md:col-start-1 md:col-span-5 aspect-[4/5]",
  "md:col-start-7 md:col-span-6 aspect-square md:mt-32",
  "md:col-start-1 md:col-span-7 aspect-[16/10]",
  "md:col-start-9 md:col-span-4 aspect-[4/5] md:mt-24",
];

// 09 — Packaging details: macro crops of the real photography, then the tags.
export default function ShDetails({ assets }: { assets: ShAssets }) {
  const { details } = sh;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="flex flex-col gap-6">
          <Eyebrow>{details.eyebrow}</Eyebrow>
          <h2 data-cs="lines" className="display text-5xl leading-[1] md:text-7xl">
            {details.headline}
          </h2>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-10 md:mt-20 md:grid-cols-12">
          {details.items.map((d, i) => (
            <figure key={d.key} className={`flex flex-col gap-4 ${LAYOUT[i].split(" ").filter((c) => c.startsWith("md:col") || c.startsWith("md:mt")).join(" ")}`}>
              <div data-cs="clip" className={`relative overflow-hidden rounded-[20px] ${LAYOUT[i].split(" ").filter((c) => c.startsWith("aspect")).join(" ")}`}>
                <MediaSlot src={assets[d.key]} alt={`${d.title}: ${d.caption}`} label={d.title} kind="photo" sizes="(max-width: 768px) 100vw, 55vw" className="h-full w-full" />
              </div>
              <figcaption data-cs="fade" className="flex items-baseline justify-between gap-6 border-t border-line pt-3">
                <span className="font-display text-lg">{d.title}</span>
                <span className="text-right text-[13px] text-muted">{d.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* hang tags, front and back, as objects */}
        <figure className="mt-16 md:mt-28">
          <div
            className="relative flex items-center justify-center gap-5 overflow-hidden rounded-[22px] px-6 py-14 md:gap-10 md:py-24"
            style={{ backgroundColor: "#E9E3C6" }}
          >
            {[assets.tagFront, assets.tagBack].map((src, i) =>
              src ? (
                <div
                  key={src}
                  data-cs="fade"
                  data-cs-delay={String(i * 0.12)}
                  className={`relative w-[42%] max-w-[300px] ${i === 0 ? "-rotate-2" : "rotate-2 md:mt-16"}`}
                  style={{ filter: "drop-shadow(0 30px 40px rgba(18,40,29,0.28))" }}
                >
                  <Image
                    src={src}
                    alt={i === 0 ? "Shajara hang tag, front: Rooted in Sri Lanka, brewed for you!" : "Shajara hang tag, back: wordmark and nutrition facts"}
                    width={450}
                    height={990}
                    sizes="(max-width: 768px) 42vw, 300px"
                    className="h-auto w-full rounded-[6px]"
                  />
                </div>
              ) : null
            )}
            <span aria-hidden className="absolute left-6 top-6 h-px w-10" style={{ backgroundColor: shColours.gold }} />
          </div>
          <figcaption data-cs="fade" className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
            {details.tags}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
