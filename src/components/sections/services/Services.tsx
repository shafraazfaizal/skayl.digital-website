"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { useReveal } from "@/hooks/useReveal";
import { services } from "@/content/services";

export default function Services() {
  const listRef = useReveal<HTMLDivElement>({
    childrenSelector: "[data-service]",
    stagger: 0.12,
  });

  return (
    <section className="py-24 md:py-28">
      <Container>
        <div className="mb-[-3vw] md:mb-[-5vw]">
          <SectionHeading eyebrow="Services" title="What we do" />
        </div>

        <div ref={listRef} className="mt-8 flex flex-col">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={s.title}
                data-service
                className="group grid items-center gap-8 border-t border-line py-12 md:grid-cols-2 md:gap-16 md:py-16"
              >
                {/* Media */}
                <div
                  className={`relative aspect-[16/11] overflow-hidden rounded-[24px] ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-skayl-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-5 top-4 font-display text-lg text-cream/90 mix-blend-difference">
                    0{i + 1}
                  </span>
                </div>

                {/* Copy */}
                <div className={`flex flex-col gap-6 ${flip ? "md:order-1" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display text-3xl md:text-4xl">{s.title}</h3>
                    <span className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-skayl-out group-hover:-rotate-45 group-hover:border-orange group-hover:text-orange">
                      →
                    </span>
                  </div>
                  <p className="max-w-md text-muted">{s.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-10 text-sm">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted">Starts at</span>
                      <span className="font-medium">{s.price}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted">Timeline</span>
                      <span className="font-medium">{s.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
