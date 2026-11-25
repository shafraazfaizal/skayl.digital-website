import path from "path";
import { Document, Font, Page, Path, Circle, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { formatAnswer, isVisible, resolveForm, type Answers } from "../form";
import { WORDMARK_ACCENT, WORDMARK_DOT, WORDMARK_LETTERS, WORDMARK_RATIO, WORDMARK_VIEWBOX } from "../wordmark";

// Fonts are bundled with the app (see next.config: outputFileTracingIncludes).
const FONT_DIR = path.join(process.cwd(), "src/lib/discovery/pdf/fonts");
let registered = false;

function registerFonts() {
  if (registered) return;
  Font.register({
    family: "Bricolage",
    fonts: [{ src: path.join(FONT_DIR, "bricolage-grotesque-600.woff"), fontWeight: 600 }],
  });
  Font.register({
    family: "Hanken",
    fonts: [
      { src: path.join(FONT_DIR, "hanken-grotesk-400.woff"), fontWeight: 400 },
      { src: path.join(FONT_DIR, "hanken-grotesk-500.woff"), fontWeight: 500 },
      { src: path.join(FONT_DIR, "hanken-grotesk-600.woff"), fontWeight: 600 },
    ],
  });
  Font.register({
    family: "NotoNaskh",
    fonts: [
      { src: path.join(FONT_DIR, "noto-naskh-arabic-400.woff"), fontWeight: 400 },
      { src: path.join(FONT_DIR, "noto-naskh-arabic-600.woff"), fontWeight: 600 },
    ],
  });
  // Don't split words with hyphens.
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}

const INK = "#0F0505";
const CREAM = "#F5F0E1";
const ORANGE = "#E64A19";
const GREY = "#5C5C5C";
const LINE = "#D9D3C4";

// Arabic falls back to Noto Naskh automatically.
const BODY = ["Hanken", "NotoNaskh"];
const DISPLAY = ["Bricolage", "NotoNaskh"];

const s = StyleSheet.create({
  page: { backgroundColor: CREAM, color: INK, fontFamily: BODY, fontSize: 10.5, paddingTop: 92, paddingBottom: 64, paddingHorizontal: 48 },
  header: { position: "absolute", top: 36, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerRight: { fontSize: 8.5, color: GREY, letterSpacing: 1.2, textTransform: "uppercase" },
  title: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, letterSpacing: -0.6, marginTop: 8, lineHeight: 1.05 },
  meta: { flexDirection: "row", flexWrap: "wrap", marginTop: 22, borderTopWidth: 0.75, borderTopColor: INK, paddingTop: 12 },
  metaCell: { width: "50%", marginBottom: 10, paddingRight: 12 },
  metaLabel: { fontSize: 7.5, color: GREY, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 3 },
  metaValue: { fontSize: 11, fontWeight: 500 },
  section: { marginTop: 26 },
  sectionHead: { flexDirection: "row", alignItems: "baseline", borderBottomWidth: 0.75, borderBottomColor: LINE, paddingBottom: 6, marginBottom: 4 },
  sectionNo: { fontSize: 8.5, color: GREY, width: 26 },
  sectionTitle: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 15, letterSpacing: -0.2 },
  qa: { paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: LINE },
  q: { fontSize: 8.5, color: GREY, marginBottom: 3, lineHeight: 1.35 },
  a: { fontSize: 10.5, lineHeight: 1.45 },
  none: { fontSize: 10.5, color: "#9A9488" },
  footer: { position: "absolute", left: 48, right: 48, bottom: 28, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: GREY },
});

function PdfWordmark({ width }: { width: number }) {
  return (
    <Svg viewBox={WORDMARK_VIEWBOX} width={width} height={width / WORDMARK_RATIO}>
      {WORDMARK_LETTERS.map((d) => (
        <Path key={d.slice(0, 12)} d={d} fill={INK} />
      ))}
      <Path d={WORDMARK_ACCENT} fill={ORANGE} />
      <Circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r={WORDMARK_DOT.r} fill={ORANGE} />
    </Svg>
  );
}

export type PdfInput = {
  reference: string;
  clientName: string;
  organisation: string | null;
  sections: string[];
  overrides: unknown;
  answers: Answers;
  submittedAt: string | null;
};

function formatDate(iso: string | null) {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
}

export function DiscoveryPdf({ reference, clientName, organisation, sections, overrides, answers, submittedAt }: PdfInput) {
  const form = resolveForm(sections, overrides);
  return (
    <Document title={`SKAYL Discovery ${reference}`} author="SKAYL" subject={`Discovery answers: ${clientName}`}>
      <Page size="A4" style={s.page} wrap>
        <View style={s.header} fixed>
          <PdfWordmark width={78} />
          <Text style={s.headerRight}>Discovery · {reference}</Text>
        </View>

        <Text style={s.title}>
          Discovery answers<Text style={{ color: ORANGE }}>.</Text>
        </Text>

        <View style={s.meta}>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Client</Text>
            <Text style={s.metaValue}>{clientName}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Organisation</Text>
            <Text style={s.metaValue}>{organisation || "—"}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Submitted</Text>
            <Text style={s.metaValue}>{formatDate(submittedAt)}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Reference</Text>
            <Text style={s.metaValue}>{reference}</Text>
          </View>
        </View>

        {form.map((section, i) => (
          <View key={section.id} style={s.section}>
            <View style={s.sectionHead} wrap={false} minPresenceAhead={60}>
              <Text style={s.sectionNo}>{String(i + 1).padStart(2, "0")}</Text>
              <Text style={s.sectionTitle}>{section.title}</Text>
            </View>
            {section.questions
              .filter((q) => isVisible(q, answers))
              .map((q) => {
                const value = formatAnswer(answers[q.id]);
                return (
                  <View key={q.id} style={s.qa} wrap={(value?.length ?? 0) > 600}>
                    <Text style={s.q}>{q.label}</Text>
                    {value ? <Text style={s.a}>{value}</Text> : <Text style={s.none}>Not answered</Text>}
                  </View>
                );
              })}
          </View>
        ))}

        <View style={s.footer} fixed>
          <Text>SKAYL · skayl.digital · hello@skayl.digital</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

export async function renderDiscoveryPdf(input: PdfInput): Promise<Buffer> {
  registerFonts();
  return renderToBuffer(<DiscoveryPdf {...input} />);
}

export function pdfFileName(reference: string, clientName: string) {
  const client = clientName
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40);
  return `SKAYL-Discovery-${reference}${client ? `-${client}` : ""}.pdf`;
}
