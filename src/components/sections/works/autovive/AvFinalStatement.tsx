import Image from "next/image";
import Container from "@/components/ui/Container";
import { av, type AvAssets } from "@/content/autovive-case-study";

// 09 — Final statement: a quiet, type-only pause before the final visual.
export default function AvFinalStatement({ assets }: { assets: AvAssets }) {
  const [first, second] = av.finale.statement;
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
        {assets.logoDark && (
          <div data-cs="fade" className="mt-16 flex justify-center md:mt-24">
            <Image src={assets.logoDark} alt="AutoVive" width={1400} height={564} sizes="240px" className="h-auto w-[180px] md:w-[240px]" />
          </div>
        )}
      </Container>
    </section>
  );
}
