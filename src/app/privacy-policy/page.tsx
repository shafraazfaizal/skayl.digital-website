import type { Metadata } from "next";
import LegalPage from "@/components/sections/shared/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy — SKAYL" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2026"
      sections={[
        {
          heading: "Overview",
          body: "This policy explains what information SKAYL collects, how it is used, and the choices you have. We only collect what we need to respond to enquiries and deliver our services.",
        },
        {
          heading: "Information we collect",
          body: "When you contact us we collect the details you provide — your name, email address, and project information. We do not sell or share your personal data with third parties for marketing purposes.",
        },
        {
          heading: "How we use it",
          body: "We use your information to respond to your enquiry, scope potential work, and deliver agreed services. We retain it only for as long as necessary for those purposes.",
        },
        {
          heading: "Your rights",
          body: "You have the right to access, correct, or request deletion of your personal data at any time. Email hello@skayl.digital and we’ll respond promptly.",
        },
        {
          heading: "Contact",
          body: "For any privacy questions or requests, email hello@skayl.digital and we’ll respond promptly.",
        },
      ]}
    />
  );
}
