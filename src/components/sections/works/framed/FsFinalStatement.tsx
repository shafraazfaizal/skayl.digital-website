import Image from "next/image";
import Container from "@/components/ui/Container";
import { fs, type FsAssets } from "@/content/framed-case-study";

// 10 — Final statement: a quiet, type-only pause before the final visual.
export default function FsFinalStatement({ assets }: { assets: FsAssets }) {
  const [first, second] = fs.finale.statement;
  return (
    <section className="pb-28 pt-4 md:pb-48 md:pt-8">
      <Container>
        <p className="mx-auto max-w-6xl text-center">
          <span data-cs="lines" className="display block text-balance text-[2.6rem] leading-[1.02] text-ink/35 sm:text-5xl md:text-7xl lg:text-[5.5rem]">
            {first}
          </span>
          <span data-cs="lines" data-cs-delay="0.15" className="display mt-2 block text-balance text-[2.6rem] leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
            {second}
          </span>
        </p>
        {assets.markDark && (
          <div data-cs="fade" className="mt-16 flex justify-center md:mt-24">
            <Image src={assets.markDark} alt="Framed Splendor" width={925} height={822} unoptimized className="h-16 w-auto md:h-20" />
          </div>
        )}
      </Container>
    </section>
  );
}
