import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pricing } from "@/content/home";

export default function PricingSection() {
  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Reveal>
              <span className="text-sm text-muted">({pricing.eyebrow})</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
                {pricing.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex flex-col items-start gap-7">
            <p className="max-w-md text-lg text-muted">{pricing.body}</p>
            <Button href={pricing.cta.href} variant="accent">
              {pricing.cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
