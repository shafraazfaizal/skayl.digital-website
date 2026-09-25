import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { toolsStack } from "@/content/about";

export default function ToolsStack() {
  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-14">
          <SectionHeading
            eyebrow="Daily Stack"
            title="The Tools That Power Us"
            sub="Speed, scale, and craft — powered by the tools we know inside out."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {toolsStack.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.05}>
              <Card className="flex h-full flex-col gap-3 p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tightest">
                    {t.name}
                  </h3>
                  <span className="shrink-0 text-xs text-orange">
                    {t.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {t.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
