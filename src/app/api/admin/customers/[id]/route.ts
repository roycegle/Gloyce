import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;

  const [
    { data: user },
    { data: services },
    { data: documents },
    { data: messages },
    { data: invoices },
    { data: requests },
    { data: forms },
  ] = await Promise.all([
    supabaseAdmin.from("users").select("id,name,email,phone,company,status,created_at").eq("id", id).single(),
    supabaseAdmin.from("services").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("documents").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("messages").select("*").eq("user_id", id).order("created_at", { ascending: true }),
    supabaseAdmin.from("invoices").select("*, services(name,type)").eq("user_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("service_requests").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("customer_forms").select("*, form_templates(name,description,category), services(name,type)").eq("user_id", id).order("created_at", { ascending: false }),
  ]);

  if (!user) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

  return NextResponse.json({
    user,
    services: services ?? [],
    documents: documents ?? [],
    messages: messages ?? [],
    invoices: invoices ?? [],
    requests: requests ?? [],
    forms: forms ?? [],
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_users");
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const allowed = ["status", "name", "company", "phone"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  const { data, error } = await supabaseAdmin.from("users").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
