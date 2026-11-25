import type { Metadata } from "next";
import LegalPage from "@/components/sections/shared/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service — SKAYL",
  description: "The terms for using skayl.digital.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} other={{ label: "Privacy Policy", href: "/privacy-policy" }} />;
}
