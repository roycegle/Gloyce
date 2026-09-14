import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — get a specific assigned form with its fields (for customer to fill)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data: form, error: formError } = await supabaseAdmin
    .from("customer_forms")
    .select("*, form_templates(id, name, description, category, service_type), services(id, name, type)")
    .eq("id", id)
    .eq("user_id", auth.userId)
    .single();

  if (formError || !form) return NextResponse.json({ error: "Form not found" }, { status: 404 });

  const templateId = (form.form_templates as { id: string } | null)?.id;
  let fields: unknown[] = [];

  if (templateId) {
    const { data } = await supabaseAdmin
      .from("form_fields")
      .select("*")
      .eq("template_id", templateId)
      .order("order_index");
    fields = data ?? [];
  }

  return NextResponse.json({ ...form, fields });
}

// PATCH — customer submits/updates their responses
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { responses, submit } = body;

  // Verify ownership
  const { data: form } = await supabaseAdmin
    .from("customer_forms")
    .select("id, status")
    .eq("id", id)
    .eq("user_id", auth.userId)
    .single();

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  const nonEditable = ["submitted", "approved", "gov_submitted", "completed"];
  if (nonEditable.includes(form.status)) {
    return NextResponse.json({ error: "Form cannot be edited in current status" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { responses };
  if (submit) {
    updates.status = "submitted";
    updates.submitted_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin
    .from("customer_forms")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
