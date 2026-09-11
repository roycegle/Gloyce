import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("customer_forms")
    .select("*, form_templates(name,description,category), services(name,type)")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { template_id, service_id, notes, due_date } = body;
  if (!template_id) return NextResponse.json({ error: "template_id required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("customer_forms")
    .insert({ user_id: id, template_id, service_id: service_id || null, notes, due_date: due_date || null, status: "pending" })
    .select("*, form_templates(name,description,category)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
