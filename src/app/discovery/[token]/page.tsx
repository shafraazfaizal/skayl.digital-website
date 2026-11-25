import type { Metadata } from "next";
import DiscoveryForm from "@/components/discovery/DiscoveryForm";
import LinkMessage from "@/components/discovery/LinkMessage";
import { resolveForm, type Answers } from "@/lib/discovery/form";
import { findLinkByToken, findResponse, linkState, markOpened } from "@/lib/discovery/links";
import { rateLimit } from "@/lib/discovery/rate-limit";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function DiscoveryPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!(await rateLimit("discovery-lookup", 60, 600))) return <LinkMessage kind="busy" />;

  let link;
  try {
    link = await findLinkByToken(token);
  } catch (err) {
    console.error("[discovery] lookup failed", err);
    return <LinkMessage kind="error" />;
  }
  if (!link) return <LinkMessage kind="invalid" />;

  const state = linkState(link);
  if (state !== "open") return <LinkMessage kind={state} />;

  await markOpened(link).catch((err) => console.error("[discovery] markOpened failed", err));
  const response = await findResponse(link.id).catch(() => null);
  const form = resolveForm(link.sections, link.overrides);

  return (
    <DiscoveryForm
      token={token}
      reference={link.ref}
      clientName={link.client_name}
      greeting={link.greeting ?? ""}
      introMessage={link.intro_message ?? ""}
      form={form}
      initialAnswers={(response?.answers ?? {}) as Answers}
      clientEmail={link.client_email ?? ""}
    />
  );
}
