import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "token and password required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Find valid token
  const { data: row } = await supabaseAdmin
    .from("onboarding_tokens")
    .select("id, user_id, expires_at, used")
    .eq("token", token)
    .single();

  if (!row) return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  if (row.used) return NextResponse.json({ error: "This link has already been used" }, { status: 400 });
  if (new Date(row.expires_at) < new Date()) {
    return NextResponse.json({ error: "This link has expired. Please contact us for a new one." }, { status: 400 });
  }

  // Update password
  const passwordHash = await bcrypt.hash(password, 12);
  const { error: updateErr } = await supabaseAdmin
    .from("users")
    .update({ password_hash: passwordHash, status: "active" })
    .eq("id", row.user_id);

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  // Mark token used
  await supabaseAdmin.from("onboarding_tokens").update({ used: true }).eq("id", row.id);

  return NextResponse.json({ ok: true });
}

// GET — validate token (check it's still valid before showing form)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ valid: false });

  const { data: row } = await supabaseAdmin
    .from("onboarding_tokens")
    .select("id, user_id, expires_at, used, users(name, email)")
    .eq("token", token)
    .single();

  if (!row || row.used || new Date(row.expires_at) < new Date()) {
    return NextResponse.json({ valid: false });
  }

  const user = (Array.isArray(row.users) ? row.users[0] : row.users) as { name: string; email: string } | null;
  return NextResponse.json({ valid: true, name: user?.name, email: user?.email });
}
