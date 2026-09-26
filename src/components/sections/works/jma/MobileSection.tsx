import Image from "next/image";
import Container from "@/components/ui/Container";
import { DarkPanel, Eyebrow } from "@/components/case-study/Layout";
import { PhoneMock } from "@/components/case-study/Frames";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

const PHONES = [
  { key: "mobile1", label: "Homepage", className: "z-10 -mr-[6%] mt-[12%] w-[31%] md:w-[25%]", parallax: "6" },
  { key: "mobile2", label: "News & Updates", className: "z-20 w-[36%] md:w-[28%]", parallax: "2" },
  { key: "mobile3", label: "Donate", className: "z-10 -ml-[6%] mt-[20%] w-[31%] md:w-[25%]", parallax: "9" },
] as const;

type Size = { w: number; h: number } | null;
const SCREEN = 19.5 / 9; // phone screen height / width

// 12 — Mobile. Three screens, overlapping slightly, drifting at different
// speeds as the section scrolls. Full-page screenshots (taller than the
// screen) scroll through the page on a slow loop, like a screen recording.
export default function MobileSection({
  assets,
  sizes,
}: {
  assets: JmaAssets;
  sizes: Record<"mobile1" | "mobile2" | "mobile3", Size>;
}) {
  const { mobile } = jma;
  return (
    <DarkPanel glow="#0D5C6B">
      <Container className="py-20 md:py-32">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow light>{mobile.eyebrow}</Eyebrow>
          <h2 className="display text-4xl leading-[1] md:text-6xl lg:text-7xl">
            <span data-cs="lines" className="block text-cream/35">
              {mobile.headline[0]}
            </span>
            <span data-cs="lines" data-cs-delay="0.12" className="block">
              {mobile.headline[1]}
            </span>
          </h2>
          <p data-cs="fade" className="max-w-lg text-[17px] leading-relaxed text-cream/60">
            {mobile.body}
          </p>
        </div>

        <div className="mt-16 flex items-start justify-center md:mt-24">
          {PHONES.map((p, i) => (
            <div key={p.key} data-cs="fade" data-cs-delay={String(i * 0.12)} className={p.className}>
              <div data-cs-parallax={p.parallax}>
                <PhoneMock>
                  <PhoneScreen
                    src={assets[p.key]}
                    size={sizes[p.key]}
                    label={p.label}
                    file={jmaAssets[p.key]}
                    offset={i}
                  />
                </PhoneMock>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </DarkPanel>
  );
}

function PhoneScreen({
  src,
  size,
  label,
  file,
  offset,
}: {
  src: string | null;
  size: Size;
  label: string;
  file: string;
  offset: number;
}) {
  const ratio = size ? size.h / size.w : 0;
  // Only loop when there's meaningfully more page than screen.
  if (src && size && ratio > SCREEN * 1.15) {
    const travel = (1 - SCREEN / ratio) * 100; // % of the image's own height
    const duration = Math.min(34, Math.max(12, (ratio - SCREEN) * 3.2 + 8));
    return (
      <div
        data-cs-autoscroll
        className="absolute inset-x-0 top-0"
        style={
          {
            "--cs-scroll": `-${travel.toFixed(2)}%`,
            "--cs-dur": `${duration.toFixed(1)}s`,
            "--cs-delay": `${-offset * 2.5}s`,
          } as React.CSSProperties
        }
      >
        <Image
          src={src}
          alt={`JMA UK on mobile — ${label}`}
          width={size.w}
          height={size.h}
          sizes="(max-width: 768px) 36vw, 320px"
          className="block h-auto w-full"
        />
      </div>
    );
  }
  return (
    <MediaSlot
      src={src}
      alt={`JMA UK on mobile — ${label}`}
      label={label}
      file={file}
      position="50% 0%"
      sizes="(max-width: 768px) 36vw, 320px"
      className="absolute inset-0"
    />
  );
}
