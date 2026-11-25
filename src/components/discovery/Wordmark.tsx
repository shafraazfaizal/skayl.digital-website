import { WORDMARK_ACCENT, WORDMARK_DOT, WORDMARK_LETTERS, WORDMARK_RATIO, WORDMARK_VIEWBOX } from "@/lib/discovery/wordmark";

/** SKAYL wordmark, drawn from the original artwork. tone="dark" = cream letters for ink backgrounds. */
export default function Wordmark({ width = 76, tone = "light", className }: { width?: number; tone?: "light" | "dark"; className?: string }) {
  const ink = tone === "dark" ? "#F5F0E1" : "#0F0505";
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      width={width}
      height={Math.round(width / WORDMARK_RATIO)}
      role="img"
      aria-label="SKAYL"
      className={className}
      style={{ width, height: "auto", display: "block", flexShrink: 0 }}
    >
      {WORDMARK_LETTERS.map((d) => (
        <path key={d.slice(0, 16)} d={d} fill={ink} />
      ))}
      <path d={WORDMARK_ACCENT} fill="#E64A19" />
      <circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r={WORDMARK_DOT.r} fill="#E64A19" />
    </svg>
  );
}
