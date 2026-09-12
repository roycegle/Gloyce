import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*, users(name, email, company)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { user_id, type, name, price, total_steps, notes } = body;

  if (!user_id || !type || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("services")
    .insert({ user_id, type, name, price, total_steps: total_steps ?? 5, notes, status: "active" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Auto-assign the matching form template if one exists for this service type
  const { data: template } = await supabaseAdmin
    .from("form_templates")
    .select("id")
    .eq("service_type", type)
    .limit(1)
    .single();

  if (template) {
    await supabaseAdmin.from("customer_forms").insert({
      user_id,
      template_id: template.id,
      service_id: data.id,
      status: "pending",
      notes: `Required for your ${name} service. Please fill this form so we can proceed.`,
    });
  }

  return NextResponse.json(data, { status: 201 });
}
