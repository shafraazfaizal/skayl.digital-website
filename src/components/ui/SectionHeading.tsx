import AnimatedText from "./AnimatedText";
import GiantHeading from "./GiantHeading";
import Reveal from "./Reveal";

// Two heading treatments from Framer:
//  - "giant": the oversized Cal Sans title that fills the container width and
//    dissolves via a gradient mask (Recent Works, What we do, etc.)
//  - "standard": the centered Cal Sans/H2-64 heading (used for FAQ, etc.)
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  size = "giant",
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  size?: "giant" | "standard";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Reveal as="span" className={`mb-4 text-sm ${light ? "text-cream/60" : "text-muted"}`}>
        ({eyebrow})
      </Reveal>

      {size === "giant" ? (
        <GiantHeading text={title} light={light} />
      ) : (
        <AnimatedText
          text={title}
          as="h2"
          className={`display text-4xl leading-[1.02] sm:text-5xl md:text-6xl ${
            light ? "text-cream" : "text-ink"
          }`}
        />
      )}

      {sub && (
        <Reveal
          as="p"
          className={`mt-4 max-w-md text-balance ${light ? "text-cream/60" : "text-muted"}`}
        >
          {sub}
        </Reveal>
      )}
    </div>
  );
}
