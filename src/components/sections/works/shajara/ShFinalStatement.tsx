import Container from "@/components/ui/Container";
import { sh, type ShAssets } from "@/content/shajara-case-study";
import { GoldRule } from "./ShPanel";
import Wordmark from "./Wordmark";

// 15 — A quiet pause before the final visual.
export default function ShFinalStatement({ assets }: { assets: ShAssets }) {
  return (
    <section className="pb-24 pt-8 md:pb-40 md:pt-16">
      <Container className="flex flex-col items-center gap-14 text-center md:gap-20">
        <GoldRule />
        <h2 data-cs="lines" className="display max-w-5xl text-balance text-[2.6rem] leading-[1] sm:text-6xl md:text-7xl lg:text-8xl">
          {sh.finale.statement.join(" ")}
        </h2>
        <div data-cs="fade" className="w-[46%] max-w-[260px]">
          <Wordmark logo={assets.logo} wordmark={assets.wordmark} />
        </div>
      </Container>
    </section>
  );
}
