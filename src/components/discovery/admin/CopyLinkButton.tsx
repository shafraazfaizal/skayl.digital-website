"use client";

import { useState } from "react";
import { copyText } from "@/lib/discovery/share";
import { Check } from "../ui";

/** Small copy button for a row in the links list. */
export default function CopyLinkButton({ url, label }: { url: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(url)) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      aria-label={`Copy link for ${label}`}
      className="relative z-10 inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-3.5 text-[12px] text-ink transition-colors hover:border-ink"
    >
      {done ? (
        <>
          <Check /> Copied
        </>
      ) : (
        <>
          <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5">
            <rect x="5.5" y="5.5" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          Copy link
        </>
      )}
    </button>
  );
}
