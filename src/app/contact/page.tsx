import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactMotion from "@/components/sections/contact/ContactMotion";
import { contact } from "@/content/contact";
import { founders } from "@/content/about";
import { publicAsset } from "@/lib/public-asset";

export const metadata: Metadata = {
  title: "Contact — SKAYL",
  description: "Tell us what you’re building. We reply within 24 hours with a clear next step — no obligation, no sales pressure.",
};

export default function ContactPage() {
  // Founder portraits appear automatically once they're added to /public/about.
  const people = founders.map((f) => ({ name: f.name, role: f.role.replace(/^Co-Founder\s*—\s*/, ""), photo: publicAsset(f.portrait) }));

  return (
    <ContactMotion>
      <section className="pb-24 pt-10 md:pb-36 md:pt-24 lg:pt-28">
        <Container>
          <div className="grid gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 lg:grid-cols-12 lg:gap-0">
            {/* ——— left: the invitation ——— */}
            <div className="flex flex-col lg:col-span-5">
              <span data-ct="eyebrow" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted md:text-xs">
                ({contact.eyebrow})
                <span aria-hidden className="h-px w-10 bg-orange" />
              </span>

              <h1 className="display mt-8 text-[clamp(3.4rem,16vw,4.4rem)] leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-[3.4rem] lg:text-[5rem] xl:text-[5.6rem]">
                {contact.title.map((l) => (
                  <span key={l} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                    <span data-ct="line" className="block">
                      {l.endsWith(".") ? (
                        <>
                          {l.slice(0, -1)}
                          <span className="text-orange">.</span>
                        </>
                      ) : (
                        l
                      )}
                    </span>
                  </span>
                ))}
              </h1>

              <p data-ct="fade" className="mt-8 max-w-[26rem] text-[17px] leading-relaxed text-muted md:text-lg">
                {contact.body}
              </p>

              <a
                data-ct="fade"
                href={`mailto:${contact.email}`}
                className="group mt-10 inline-flex w-fit items-center gap-3 text-2xl text-orange md:text-[1.7rem]"
              >
                <span className="relative">
                  {contact.email}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-orange transition-transform duration-500 ease-skayl-out group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
                <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:translate-x-1.5">
                  →
                </span>
              </a>

              <p data-ct="fade" className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-ink/70">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#4ADE80] opacity-60 motion-safe:animate-ping [animation-duration:2.4s]" />
                  <span className="relative h-2 w-2 rounded-full bg-[#22A559]" />
                </span>
                {contact.availability}
              </p>

              {/* direct lines + who you'll speak to */}
              <div data-ct="fade" className="mt-14 border-t border-line pt-6 md:mt-auto lg:mt-20">
                <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-[15px] md:grid-cols-1 md:gap-y-1 lg:grid-cols-[auto_1fr] lg:gap-y-3">
                  {contact.phones.map((p) => (
                    <div key={p.tel} className="contents">
                      <dt className="text-[11px] uppercase leading-[22px] tracking-[0.22em] text-muted">{p.label}</dt>
                      <dd>
                        <a href={`tel:${p.tel}`} className="whitespace-nowrap tabular-nums text-ink transition-colors hover:text-orange">
                          {p.display}
                        </a>
                      </dd>
                    </div>
                  ))}
                  {contact.calendlyUrl && (
                    <div className="contents">
                      <dt className="text-[11px] uppercase leading-[22px] tracking-[0.22em] text-muted">Prefer to talk?</dt>
                      <dd>
                        <a
                          href={contact.calendlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-orange"
                        >
                          Book a call
                          <span aria-hidden className="transition-transform duration-500 ease-skayl-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted">You’ll speak with</span>
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {people.map((p) => (
                      <li key={p.name} className="flex items-center gap-3">
                        {p.photo && (
                          <Image src={p.photo} alt="" width={80} height={80} className="h-10 w-10 rounded-full object-cover" />
                        )}
                        <span className="flex flex-col">
                          <span className="text-[15px] text-ink">{p.name}</span>
                          <span className="text-[12px] text-muted">{p.role}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* hairline between the columns */}
            <div aria-hidden className="hidden lg:col-span-1 lg:flex lg:justify-center">
              <span data-ct="divider" className="block h-full w-px bg-line" />
            </div>

            {/* ——— right: the form ——— */}
            <div data-ct="form" className="lg:col-span-6 lg:pt-2">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </ContactMotion>
  );
}
