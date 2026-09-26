import Image from "next/image";
import Container from "@/components/ui/Container";
import { jma, type JmaAssets } from "@/content/jma-case-study";

// 14 — Final statement: the interface stripped back to type.
export default function FinalStatement({ assets }: { assets: JmaAssets }) {
  const [first, second] = jma.finale.statement;
  return (
    <section className="py-28 md:py-48">
      <Container>
        <p className="mx-auto max-w-6xl text-center">
          <span
            data-cs="lines"
            className="display block text-balance text-[2.6rem] leading-[1.02] text-ink/35 sm:text-5xl md:text-7xl lg:text-[5.5rem]"
          >
            {first}
          </span>
          <span
            data-cs="lines"
            data-cs-delay="0.15"
            className="display mt-2 block text-balance text-[2.6rem] leading-[1.02] sm:text-5xl md:text-7xl lg:text-[5.5rem]"
          >
            {second}
          </span>
        </p>
        <div data-cs="fade" className="mt-16 flex justify-center md:mt-24">
          {assets.logo ? (
            <Image src={assets.logo} alt="JMA UK" width={220} height={80} unoptimized={assets.logo.endsWith(".svg")} className="h-14 w-auto md:h-16" />
          ) : (
            <span
              className="text-sm font-bold uppercase tracking-wide text-ink/70"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Jaffna Muslim Association UK
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
