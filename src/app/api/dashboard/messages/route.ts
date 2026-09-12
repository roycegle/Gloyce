import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("id,sender,subject,content,read,created_at")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { content, subject } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "content required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({ user_id: auth.userId, sender: "client", content, subject: subject || null, read: false })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
