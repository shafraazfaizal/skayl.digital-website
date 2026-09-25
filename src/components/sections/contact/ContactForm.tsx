"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Reveal delay={0.1}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 rounded-3xl border border-line p-6 md:p-8"
      >
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">Your name</span>
          <input
            name="name"
            required
            className="rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
            placeholder="Jane Doe"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            className="rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
            placeholder="you@company.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted">Tell us about your project</span>
          <textarea
            name="message"
            rows={5}
            required
            className="resize-none rounded-xl border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
            placeholder="What are you building and when do you need it?"
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Sent — we’ll be in touch إن شاء الله"
              : "Send it →"}
        </button>

        {status === "error" && (
          <p className="text-sm text-orange">{error}</p>
        )}
        {status === "sent" && (
          <p className="text-sm text-muted">
            We’ll be in touch shortly. You can also reach us directly at
            hello@skayl.digital.
          </p>
        )}
      </form>
    </Reveal>
  );
}
