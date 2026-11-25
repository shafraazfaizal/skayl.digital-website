import "server-only";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && adminEmails().includes(email.trim().toLowerCase());
}

/** The signed-in admin, or null. Checked on the server every time. */
export async function getAdmin(): Promise<{ email: string } | null> {
  try {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email;
    return email && isAdminEmail(email) ? { email } : null;
  } catch {
    return null;
  }
}

/** Use at the top of every admin page and server action. Anyone else gets a 404. */
export async function requireAdmin(): Promise<{ email: string }> {
  const admin = await getAdmin();
  if (!admin) notFound();
  return admin;
}
