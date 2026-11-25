"use client";

import { useState } from "react";
import { copyText, whatsappMessage } from "@/lib/discovery/share";
import { Check, Eyebrow } from "../ui";

/** The client's link on the admin page: view it, copy it, or copy the WhatsApp message, any time. */
export default function ClientLinkCard({
  url,
  greeting,
  minutes,
  canReveal,
}: {
  url: string | null;
  greeting: string;
  minutes: number;
  canReveal: boolean;
}) {
  const [copied, setCopied] = useState<"" | "link" | "whatsapp">("");

  const copy = async (what: "link" | "whatsapp") => {
    if (!url) return;
    if (await copyText(what === "link" ? url : whatsappMessage(greeting, minutes, url))) {
      setCopied(what);
      setTimeout(() => setCopied(""), 2000);
    }
  };

  return (
    <div className="mt-4 rounded-[24px] border border-line bg-[#FBF8F0] px-5 py-6 md:rounded-[28px] md:px-8 md:py-7">
      <Eyebrow>Client link</Eyebrow>
      {url ? (
        <>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              readOnly
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Client link"
              className="h-12 min-w-0 flex-1 rounded-full border border-ink/15 bg-cream px-5 font-mono text-[12.5px] text-ink/80 outline-none focus:border-ink"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copy("link")}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-[#241616]"
              >
                {copied === "link" ? (
                  <>
                    <Check /> Copied
                  </>
                ) : (
                  "Copy link"
                )}
              </button>
              <button
                type="button"
                onClick={() => copy("whatsapp")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/20 px-6 text-[12px] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-ink"
              >
                {copied === "whatsapp" ? (
                  <>
                    <Check /> Copied
                  </>
                ) : (
                  "Copy WhatsApp message"
                )}
              </button>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-muted">
            Opening it yourself marks it as opened. Don’t submit it, or it will lock for the client.
          </p>
        </>
      ) : (
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
          {canReveal
            ? "This link was created before links could be shown again. Use “New link” below to get one you can copy any time. The old link will stop working, so send the new one to the client."
            : "Links can’t be shown again until DISCOVERY_LINK_SECRET is set in your environment variables."}
        </p>
      )}
    </div>
  );
}
