import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/discovery/admin-auth";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Where the magic link lands. Exchanges the code for a session, then lets
// only allow-listed admins through.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.redirect(`${origin}/auth/sign-in`);

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/auth/sign-in`);

  const { data } = await supabase.auth.getUser();
  if (!isAdminEmail(data.user?.email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/`);
  }
  return NextResponse.redirect(`${origin}/admin/discovery`);
}
