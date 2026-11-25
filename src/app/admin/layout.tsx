import type { Metadata } from "next";
import Link from "next/link";
import Wordmark from "@/components/discovery/Wordmark";
import { requireAdmin } from "@/lib/discovery/admin-auth";
import { arabicFont, BODY_WITH_ARABIC } from "@/lib/discovery/arabic-font";
import { signOut } from "./discovery/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio · SKAYL",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

// Every /admin page goes through here: anyone who isn't a signed-in,
// allow-listed admin gets a 404 before anything renders.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className={`${arabicFont.variable} flex min-h-[100svh] flex-col bg-cream text-ink`} style={{ fontFamily: BODY_WITH_ARABIC }}>
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 md:px-10">
          <Link href="/admin/discovery" className="flex items-center gap-4" aria-label="SKAYL Studio: all links">
            <Wordmark width={64} />
            <span aria-hidden className="h-5 w-px bg-ink/15" />
            <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-muted">Studio</span>
          </Link>
          <div className="flex items-center gap-5 text-[13px] text-muted">
            <span className="hidden md:inline">{admin.email}</span>
            <form action={signOut}>
              <button type="submit" className="inline-flex h-10 items-center rounded-full border border-ink/15 px-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 pb-24 pt-8 sm:px-5 md:px-10 md:pt-14">{children}</main>
    </div>
  );
}
