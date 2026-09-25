import Container from "@/components/ui/Container";
import PageHero from "./PageHero";

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={`Last updated ${updated}`} />
      <section className="pb-28">
        <Container>
          <div className="flex max-w-2xl flex-col gap-10 border-t border-line pt-10">
            {sections.map((s) => (
              <div key={s.heading} className="flex flex-col gap-3">
                <h2 className="font-display text-2xl tracking-tightest">
                  {s.heading}
                </h2>
                <p className="leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
