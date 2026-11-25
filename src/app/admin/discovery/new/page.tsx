import NewLinkForm, { type NewLinkDefaults } from "@/components/discovery/admin/NewLinkForm";
import { requireAdmin } from "@/lib/discovery/admin-auth";
import { isSelectableSection, parseOverrides } from "@/lib/discovery/form";
import { findLinkById } from "@/lib/discovery/links";

export const dynamic = "force-dynamic";

export default async function NewDiscoveryLinkPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  await requireAdmin();
  const { from } = await searchParams;
  const source = from ? await findLinkById(from).catch(() => null) : null;

  // "Duplicate" copies the settings (sections, greeting, message, customisations), never the client or token.
  const defaults: NewLinkDefaults = source
    ? {
        sections: source.sections.filter(isSelectableSection),
        greeting: source.greeting ?? "",
        introMessage: source.intro_message ?? "",
        overrides: parseOverrides(source.overrides),
        duplicatedFrom: source.ref,
      }
    : { sections: ["website"], greeting: "", introMessage: "", overrides: {} };

  return <NewLinkForm defaults={defaults} />;
}
