import type { Metadata } from "next";
import LegalPage from "@/components/sections/shared/LegalPage";

export const metadata: Metadata = { title: "Terms of Service — SKAYL" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="2026"
      sections={[
        {
          heading: "Agreement",
          body: "By engaging SKAYL you agree to these terms. Each project is also governed by a specific proposal or statement of work, which takes precedence where it differs.",
        },
        {
          heading: "Scope & deliverables",
          body: "Deliverables, timelines, and pricing are defined per project before work begins. Changes to scope may affect timeline and cost — all changes will be agreed in writing before implementation.",
        },
        {
          heading: "Payments",
          body: "Payment terms are set out in each proposal. We don’t offer refunds on completed work, but we are transparent upfront about whether we’re the right fit — before any payment is made.",
        },
        {
          heading: "Ownership",
          body: "On receipt of full payment, ownership of final deliverables transfers to you. We retain the right to showcase completed work in our portfolio unless otherwise agreed in writing.",
        },
        {
          heading: "Creative Principle",
          body: "All content produced by SKAYL — including video, photography, and social media content — is made without music. This is a non-negotiable condition of every engagement.",
        },
      ]}
    />
  );
}
