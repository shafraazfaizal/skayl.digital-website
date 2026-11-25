"use server";

import { headers } from "next/headers";
import { isAdminEmail } from "@/lib/discovery/admin-auth";
import { rateLimit } from "@/lib/discovery/rate-limit";
import { SITE_URL } from "@/lib/discovery/site";
import { supabaseServer } from "@/lib/supabase/server";

export type SignInState = { status: "idle" | "sent" | "error"; message?: string };

/** Emails a magic link, but only to addresses on the ADMIN_EMAILS list. The reply never says which. */
export async function sendMagicLink(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: "error", message: "Please enter a valid email address." };
  if (!(await rateLimit("admin-sign-in", 5, 900))) return { status: "error", message: "Too many attempts. Please try again in a few minutes." };

  if (isAdminEmail(email)) {
    const h = await headers();
    const origin = h.get("origin") || SITE_URL;
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback`, shouldCreateUser: true },
    });
    if (error) console.error("[admin] magic link failed", error.message);
  }
  return { status: "sent" };
}
