"use client";

import { useActionState } from "react";
import { PillButton } from "@/components/discovery/ui";
import { sendMagicLink, type SignInState } from "../actions";

export default function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(sendMagicLink, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div role="status" className="mt-10 rounded-[24px] border border-line bg-[#FBF8F0] px-6 py-6">
        <p className="text-[17px] font-medium text-ink">Check your inbox.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">If that email is allowed to sign in, a link is on its way. Open it in this browser.</p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-10 flex flex-col gap-3">
      <label htmlFor="email" className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        required
        placeholder="you@skayl.digital"
        className="h-14 w-full border-0 border-b border-ink/20 bg-transparent px-0 text-[19px] text-ink outline-none transition-colors placeholder:text-ink/25 hover:border-ink/45 focus:border-ink focus:ring-0"
      />
      {state.status === "error" && (
        <p role="alert" className="text-[14px] text-[#B3380F]">
          {state.message}
        </p>
      )}
      <PillButton type="submit" disabled={pending} arrow={!pending} className="mt-6 w-full">
        {pending ? "Sending…" : "Email me a sign-in link"}
      </PillButton>
    </form>
  );
}
