import Container from "@/components/ui/Container";
import { jma } from "@/content/jma-case-study";

// 02a — Project intelligence: the editorial metadata strip.
export default function ProjectMeta() {
  return (
    <section className="pt-20 md:pt-28">
      <Container>
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-[180px_1fr] md:gap-12">
          <span data-cs="fade" className="text-sm text-muted">
            (Project intelligence)
          </span>
          <dl
            data-cs="stagger"
            className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
          >
            {jma.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-muted">{m.label}</dt>
                <dd className="flex flex-col gap-1 text-[15px] leading-snug text-ink">
                  {m.value.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
