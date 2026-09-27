import Container from "@/components/ui/Container";
import { servicesIntro } from "@/content/services";

// 02 — The promise in one line, and three facts that frame every service.
export default function ServicesIntro() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <h2 data-cs="lines" className="display max-w-5xl text-balance text-[2.6rem] leading-[1] sm:text-5xl md:text-6xl lg:text-7xl">
          {servicesIntro.statement}
        </h2>
        <dl data-cs="stagger" className="mt-14 grid border-t border-line md:mt-20 md:grid-cols-3">
          {servicesIntro.facts.map((f, i) => (
            <div key={f.label} className={`flex flex-col gap-3 border-b border-line py-7 md:border-b-0 md:py-9 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
              <dt className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange" />
                {f.label}
              </dt>
              <dd className="text-[16px] leading-relaxed text-muted">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
