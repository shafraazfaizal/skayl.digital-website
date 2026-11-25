import Link from "next/link";
import { notFound } from "next/navigation";
import AnswerView from "@/components/discovery/AnswerView";
import ClientLinkCard from "@/components/discovery/admin/ClientLinkCard";
import LinkActions from "@/components/discovery/admin/LinkActions";
import StatusBadge from "@/components/discovery/admin/StatusBadge";
import { ArrowLeft, Card, Eyebrow, Headline } from "@/components/discovery/ui";
import { requireAdmin } from "@/lib/discovery/admin-auth";
import { estimateMinutes, resolveForm, type Answers } from "@/lib/discovery/form";
import { displayStatus, findLinkById, findResponse } from "@/lib/discovery/links";
import { revealLinks } from "@/lib/discovery/reveal";
import { canRevealLinks } from "@/lib/discovery/token";

export const dynamic = "force-dynamic";

function when(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
}

export default async function DiscoverySubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const link = await findLinkById(id);
  if (!link) notFound();
  const response = await findResponse(link.id);
  const form = resolveForm(link.sections, link.overrides);
  const status = displayStatus(link);
  const answers = (response?.answers ?? {}) as Answers;
  const hasAnswers = Object.keys(answers).length > 0;
  const submitted = link.status === "submitted";
  const url = (await revealLinks([link.id]).catch(() => ({}) as Record<string, string>))[link.id] ?? null;
  const canReveal = canRevealLinks();

  const meta: [string, string][] = [
    ["Created", when(link.created_at)],
    ["Opened", when(link.opened_at)],
    ["Last activity", when(link.last_activity_at)],
    [submitted ? "Submitted" : "Expires", when(submitted ? link.submitted_at : link.expires_at)],
  ];

  return (
    <div>
      <Link href="/admin/discovery" className="inline-flex min-h-11 items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink">
        <ArrowLeft /> All links
      </Link>

      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <Eyebrow>{link.ref}</Eyebrow>
          <Headline className="mt-5 text-[2.8rem] md:text-[4.6rem]">
            <span dir="auto">{link.client_name}</span>
          </Headline>
          {link.organisation && <p className="mt-3 text-[18px] text-muted">{link.organisation}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <Card className="mt-10 grid grid-cols-2 gap-px overflow-hidden bg-line md:grid-cols-4">
        {meta.map(([k, v]) => (
          <div key={k} className="bg-[#FBF8F0] px-5 py-5 md:px-7 md:py-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{k}</p>
            <p className="mt-2 text-[15px] text-ink">{v}</p>
          </div>
        ))}
      </Card>

      <ClientLinkCard url={url} greeting={link.greeting ?? ""} minutes={estimateMinutes(form)} canReveal={canReveal} />

      <LinkActions id={link.id} clientName={link.client_name} status={status} canDownload={submitted || !!response?.pdf_path} canReveal={canReveal} />

      {submitted && response && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-muted">
          <span>Client copy: {response.client_email_sent_at ? `sent ${when(response.client_email_sent_at)}` : "not sent"}</span>
          <span>SKAYL copy: {response.admin_email_sent_at ? `sent ${when(response.admin_email_sent_at)}` : "not sent"}</span>
          {response.email_error && <span className="w-full text-[#B3380F]">Problem: {response.email_error}</span>}
        </div>
      )}

      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="display text-[1.8rem] leading-tight md:text-[2.2rem]">Answers</h2>
          {hasAnswers && !submitted && <span className="text-[13.5px] text-muted">Draft: not submitted yet</span>}
        </div>
        {hasAnswers ? (
          <AnswerView form={form} answers={answers} />
        ) : (
          <Card className="px-6 py-12 text-center text-[16px] text-muted">No answers yet.</Card>
        )}
      </div>
    </div>
  );
}
