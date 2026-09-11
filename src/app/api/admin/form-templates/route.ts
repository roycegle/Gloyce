import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("form_templates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const body = await req.json();
  const { name, description, category } = body;
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("form_templates")
    .insert({ name, description, category: category || "general" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id } = await req.json();
  const { error } = await supabaseAdmin.from("form_templates").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
