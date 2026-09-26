"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Ticker from "@/components/ui/Ticker";
import { services } from "@/content/services";
import { works } from "@/content/works";

const collage = [
  ...works.map((w) => w.cover),
  ...services.map((s) => s.image),
].slice(0, 9);

const emailWords = Array(4).fill("hello@skayl.digital");

export default function CTA() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-5 pb-6 md:px-12">
      <div className="w-full">
        <div className="mb-10 md:mb-14">
          <SectionHeading eyebrow="Get in touch" title="Let’s Connect" />
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-ink text-cream">
            {/* background collage */}
            <div className="pointer-events-none absolute inset-0">
              <div className="grid h-full w-full grid-cols-3 gap-2 opacity-[0.18]">
                {collage.map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-ink/80 backdrop-blur-[2px]" />
            </div>

            {/* content */}
            <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-14">
              <div className="flex flex-col justify-center gap-4">
                <h2 className="display text-4xl leading-[1.05] md:text-6xl">
                  Got a project in mind?
                </h2>
                <p className="text-cream/60">
                  Tell us what you’re building — we’ll come back with a straight
                  answer and a clear next step. No obligation, no sales pressure.
                </p>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-cream/50">Your Name</span>
                  <input
                    name="name"
                    required
                    placeholder="Enter your Name"
                    className="rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-cream/40"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-cream/50">Your Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter the Email"
                    className="rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-cream/40"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-cream/50">Tell us about your project</span>
                  <textarea
                    name="message"
                    rows={2}
                    required
                    placeholder="Type Here…"
                    className="resize-none rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/35 outline-none focus:border-cream/40"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.01] disabled:opacity-70"
                >
                  {status === "sending"
                    ? "Sending…"
                    : status === "sent"
                      ? "Sent — we’ll be in touch"
                      : status === "error"
                        ? "Try again"
                        : "Send it →"}
                </button>
              </form>
            </div>

            {/* email ticker */}
            <div className="relative py-5">
              <Ticker
                words={emailWords}
                size="sm"
                href="mailto:hello@skayl.digital"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
