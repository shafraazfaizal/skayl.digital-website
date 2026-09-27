import type { Metadata } from "next";
import LegalPage from "@/components/sections/shared/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — SKAYL",
  description: "What SKAYL collects, why, who it’s shared with, and your rights.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacy} other={{ label: "Terms of Service", href: "/terms-and-conditions" }} />;
}
