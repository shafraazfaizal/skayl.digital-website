import "server-only";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { linkUrl } from "./site";
import { decryptToken } from "./token";

/** The site the admin is on right now (localhost, a preview, or the live site). */
export async function requestOrigin(): Promise<string | null> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return null;
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto.split(",")[0].trim()}://${host}`;
}

/** Client links the admin can copy again, keyed by link id. Links that can't be shown are left out. */
export async function revealLinks(ids: string[]): Promise<Record<string, string>> {
  if (!ids.length) return {};
  const { data } = await supabaseAdmin().from("discovery_links").select("id, token_hash, token_encrypted").in("id", ids);
  const origin = await requestOrigin();
  const out: Record<string, string> = {};
  for (const row of (data ?? []) as { id: string; token_hash: string; token_encrypted: string | null }[]) {
    const token = decryptToken(row.token_encrypted, row.token_hash);
    if (token) out[row.id] = linkUrl(token, origin);
  }
  return out;
}
