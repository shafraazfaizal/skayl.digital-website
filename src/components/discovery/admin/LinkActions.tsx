"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteLink, getPdfUrl, reopenLink, revokeLink, rotateLink } from "@/app/admin/discovery/actions";
import type { DisplayStatus } from "@/lib/discovery/links";
import { DEFAULT_EXPIRY_DAYS } from "@/lib/discovery/site";

const primary =
  "inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-[#241616] disabled:opacity-60";
const secondary =
  "inline-flex h-12 items-center justify-center rounded-full border border-ink/20 px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-ink disabled:opacity-60";

export default function LinkActions({ id, clientName, status, canDownload, canReveal }: { id: string; clientName: string; status: DisplayStatus; canDownload: boolean; canReveal: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [days, setDays] = useState(DEFAULT_EXPIRY_DAYS);
  const [freshUrl, setFreshUrl] = useState("");

  const run = (fn: () => Promise<void>) => {
    setError("");
    setMessage("");
    start(async () => {
      try {
        await fn();
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  const download = () =>
    run(async () => {
      const res = await getPdfUrl(id);
      if (!res.ok) return setError(res.error);
      window.location.href = res.url;
    });

  const reopen = () =>
    run(async () => {
      const res = await reopenLink(id, days);
      if (!res.ok) return setError(res.error);
      setMessage(`Reopened. The client’s link works again until ${new Date(res.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}.`);
      router.refresh();
    });

  const revoke = () => {
    if (!window.confirm("Revoke this link? The client won’t be able to open it any more.")) return;
    run(async () => {
      const res = await revokeLink(id);
      if (!res.ok) return setError(res.error);
      setMessage("Link revoked.");
      router.refresh();
    });
  };

  const rotate = () => {
    if (!window.confirm("Create a new link? The old link will stop working straight away.")) return;
    run(async () => {
      const res = await rotateLink(id);
      if (!res.ok) return setError(res.error);
      if (canReveal) {
        setMessage("New link created. Copy it from “Client link” above.");
        router.refresh();
      } else {
        setFreshUrl(res.url);
      }
    });
  };

  const remove = () => {
    if (!window.confirm(`Delete the link for ${clientName}?\n\nThis permanently removes the link, their answers and the PDF. It can’t be undone.`)) return;
    run(async () => {
      const res = await deleteLink(id);
      if (!res.ok) return setError(res.error);
      router.push("/admin/discovery");
      router.refresh();
    });
  };

  const canReopen = status === "Submitted" || status === "Expired" || status === "Revoked";
  const isOpen = status === "Not opened" || status === "Opened" || status === "In progress";

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {canDownload && (
          <button type="button" onClick={download} disabled={pending} className={primary}>
            Download PDF
          </button>
        )}
        <Link href={`/admin/discovery/new?from=${id}`} className={secondary}>
          Duplicate
        </Link>
        {isOpen && (
          <button type="button" onClick={rotate} disabled={pending} className={secondary}>
            New link
          </button>
        )}
        {status !== "Revoked" && (
          <button type="button" onClick={revoke} disabled={pending} className={secondary}>
            Revoke
          </button>
        )}
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#B3380F]/30 px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-[#B3380F] transition-colors duration-300 hover:border-[#B3380F] hover:bg-[#B3380F]/[0.06] disabled:opacity-60 md:ml-auto"
        >
          Delete
        </button>
      </div>

      {canReopen && (
        <div className="flex flex-wrap items-center gap-3 rounded-[24px] border border-line bg-[#FBF8F0] px-5 py-5 md:px-7">
          <label htmlFor="reopen-days" className="text-[14px] text-ink">
            Reopen for
          </label>
          <input
            id="reopen-days"
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="h-12 w-20 rounded-full border border-ink/15 bg-cream px-4 text-center text-[15px] outline-none focus:border-ink"
          />
          <span className="text-[14px] text-muted">days</span>
          <button type="button" onClick={reopen} disabled={pending} className={secondary}>
            Reopen
          </button>
          <p className="w-full text-[12.5px] text-muted">The client can edit and resubmit on the same link. Their previous answers are kept.</p>
        </div>
      )}

      {freshUrl && (
        <div className="rounded-[24px] border border-ink/25 bg-[#FBF8F0] px-5 py-5 md:px-7">
          <p className="text-[13px] text-muted">New link (shown once, so copy it now):</p>
          <input readOnly value={freshUrl} onFocus={(e) => e.currentTarget.select()} className="mt-3 h-12 w-full rounded-full border border-ink/15 bg-cream px-5 font-mono text-[12.5px] outline-none" aria-label="New discovery link" />
          <button type="button" onClick={() => navigator.clipboard?.writeText(freshUrl).then(() => setMessage("Copied."))} className={`${secondary} mt-3`}>
            Copy link
          </button>
        </div>
      )}

      <p aria-live="polite" className="text-[14px]">
        {message && <span className="text-ink">{message}</span>}
        {error && <span className="text-[#B3380F]">{error}</span>}
      </p>
    </div>
  );
}
