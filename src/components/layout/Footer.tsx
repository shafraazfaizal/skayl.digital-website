import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import BackToTop from "@/components/ui/BackToTop";
import { footer } from "@/content/navigation";

export default function Footer() {
  return (
    <footer className="px-5 pb-5 md:px-12">
      <div
        className="relative overflow-hidden rounded-[36px] text-cream"
        style={{
          background:
            "linear-gradient(to bottom, #0F0505 0%, #2A0F06 42%, #5C1D0B 70%, #E64A19 100%)",
        }}
      >
          {/* subtle top glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{
              background:
                "radial-gradient(60% 100% at 70% 0%, rgba(255,255,255,0.06), rgba(0,0,0,0))",
            }}
          />

          <div className="relative z-10 px-8 pt-16 md:px-14">
            <div className="grid grid-cols-2 gap-10 md:max-w-3xl md:grid-cols-3">
              {footer.columns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-4">
                  <span className="text-sm text-cream/45">{col.heading}</span>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          target={"external" in l && l.external ? "_blank" : undefined}
                          rel={"external" in l && l.external ? "noreferrer" : undefined}
                          className="text-lg font-medium text-cream transition-colors hover:text-orange-soft"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 flex flex-col gap-3 text-sm text-cream/55 md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} SKAYL. All rights reserved.</span>
              <span className="md:order-last">UK &amp; Sri Lanka</span>
              <BackToTop />
            </div>

          <div className="mt-8 pb-2">
            <Wordmark className="h-auto w-full text-cream" />
          </div>
        </div>
      </div>
    </footer>
  );
}
