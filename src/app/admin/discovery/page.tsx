import Link from "next/link";
import StatusBadge from "@/components/discovery/admin/StatusBadge";
import { Card, Eyebrow, Headline, PillLink } from "@/components/discovery/ui";
import { requireAdmin } from "@/lib/discovery/admin-auth";
import { displayStatus, LINK_COLUMNS, type DiscoveryLink } from "@/lib/discovery/links";
import { SECTIONS, type SectionId } from "@/lib/discovery/questions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function when(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/London" });
}

const SHORT: Record<string, string> = { website: "Website", design: "Design & social", app: "App" };

export default async function DiscoveryAdminPage() {
  await requireAdmin();

  let links: DiscoveryLink[] = [];
  let problem: string | null = null;
  try {
    const { data, error } = await supabaseAdmin().from("discovery_links").select(LINK_COLUMNS).order("created_at", { ascending: false }).limit(500);
    if (error) throw error;
    links = (data ?? []) as DiscoveryLink[];
  } catch (err) {
    const e = err as { message?: string; code?: string; hint?: string };
    problem = [e.code, e.message, e.hint].filter(Boolean).join(" · ") || String(err);
    console.error("[admin] couldn't load discovery links", err);
  }

  const statuses = links.map(displayStatus);
  const stats = [
    { label: "All links", value: links.length },
    { label: "Waiting to start", value: statuses.filter((s) => s === "Not opened" || s === "Opened").length },
    { label: "In progress", value: statuses.filter((s) => s === "In progress").length },
    { label: "Submitted", value: statuses.filter((s) => s === "Submitted").length },
  ];

  return (
    <div>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Discovery</Eyebrow>
          <Headline className="mt-5 text-[3rem] md:text-[4.8rem]">Client links</Headline>
        </div>
        <PillLink href="/admin/discovery/new" arrow className="w-full md:w-auto">
          New discovery link
        </PillLink>
      </div>

      {problem ? (
        <Card className="mt-10 border-[#B3380F]/25 px-6 py-6 md:px-8">
          <p className="text-[16px] font-medium text-[#B3380F]">Couldn’t load your links.</p>
          <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/70">{problem}</p>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Check that <code className="text-ink">SUPABASE_SERVICE_ROLE_KEY</code> is set and that the SQL in <code className="text-ink">supabase/discovery.sql</code> has run, then restart
            the dev server.
          </p>
        </Card>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="px-5 py-5 md:px-7 md:py-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{s.label}</p>
                <p className="display mt-4 text-[2.6rem] leading-none md:text-[3.4rem]">{s.value}</p>
              </Card>
            ))}
          </div>

          {links.length === 0 ? (
            <Card className="mt-4 px-6 py-14 text-center md:py-20">
              <p className="display text-[1.8rem] leading-tight md:text-[2.2rem]">No links yet</p>
              <p className="mx-auto mt-3 max-w-sm text-[16px] text-muted">Create your first discovery link and send it to a client on WhatsApp or by email.</p>
            </Card>
          ) : (
            <Card className="mt-4 overflow-hidden">
              <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_24px] gap-6 border-b border-line px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted lg:grid">
                <span>Client</span>
                <span>Sections</span>
                <span>Expires</span>
                <span>Status</span>
                <span>Last activity</span>
                <span />
              </div>
              <ul>
                {links.map((l, i) => (
                  <li key={l.id} className={i > 0 ? "border-t border-line" : ""}>
                    <Link
                      href={`/admin/discovery/${l.id}`}
                      className="group grid gap-3 px-5 py-5 transition-colors hover:bg-ink/[0.025] sm:px-7 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_24px] lg:items-center lg:gap-6 lg:px-8"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span dir="auto" className="block truncate text-[17px] font-medium text-ink">
                            {l.client_name}
                          </span>
                          <span className="block truncate text-[13px] text-muted">
                            {l.organisation ? `${l.organisation} · ` : ""}
                            {l.ref}
                          </span>
                        </span>
                        <span className="lg:hidden">
                          <StatusBadge status={displayStatus(l)} />
                        </span>
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {l.sections.map((id) => (
                          <span key={id} className="rounded-full border border-ink/10 px-2.5 py-1 text-[12px] text-ink/70">
                            {SHORT[id] ?? SECTIONS[id as SectionId]?.title ?? id}
                          </span>
                        ))}
                      </span>
                      <span className="text-[13.5px] text-muted">
                        <span className="lg:hidden">Expires </span>
                        {when(l.expires_at)}
                      </span>
                      <span className="hidden lg:block">
                        <StatusBadge status={displayStatus(l)} />
                      </span>
                      <span className="text-[13.5px] text-muted">
                        <span className="lg:hidden">Last activity </span>
                        {when(l.last_activity_at ?? l.opened_at)}
                      </span>
                      <span aria-hidden className="hidden text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink lg:block">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
