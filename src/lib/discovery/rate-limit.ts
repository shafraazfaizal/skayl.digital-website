import "server-only";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

/** The visitor's IP, hashed so raw IPs are never stored. */
export async function clientKey(): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`skayl-discovery:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Counts a hit and returns true while the caller is under the limit.
 * Backed by a small Supabase table so limits hold across Vercel instances.
 * If the check itself fails, the request is allowed (and the error logged).
 */
export async function rateLimit(bucket: string, limit: number, windowSeconds: number): Promise<boolean> {
  try {
    const key = `${bucket}:${await clientKey()}`;
    const { data, error } = await supabaseAdmin().rpc("discovery_rate_limit_hit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) throw error;
    return data !== false;
  } catch (err) {
    console.error("[discovery] rate limit check failed", err);
    return true;
  }
}
