import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  let query = supabaseAdmin
    .from("messages")
    .select("*, users(name, email)")
    .order("created_at", { ascending: false });

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { user_id, subject, content } = await req.json();
  if (!user_id || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Mark admin reply
  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({ user_id, subject, content, sender: "admin", read: true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Mark customer messages as read
  await supabaseAdmin.from("messages").update({ read: true }).eq("user_id", user_id).eq("sender", "client");

  return NextResponse.json(data, { status: 201 });
}
