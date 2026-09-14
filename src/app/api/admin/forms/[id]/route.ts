import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — admin reads a customer form with its fields and submitted responses
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data: form, error } = await supabaseAdmin
    .from("customer_forms")
    .select("*, form_templates(id, name, description, category, service_type), services(id, name, type), users(id, name, email)")
    .eq("id", id)
    .single();

  if (error || !form) return NextResponse.json({ error: "Form not found" }, { status: 404 });

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

// PATCH — admin updates form status and/or review notes
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { status, admin_review_notes, gov_submission_notes } = body;

  const allowed = ["approved", "needs_update", "gov_submitted", "completed"];
  if (status && !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (status) updates.status = status;
  if (admin_review_notes !== undefined) updates.admin_review_notes = admin_review_notes;
  if (gov_submission_notes !== undefined) updates.gov_submission_notes = gov_submission_notes;
  if (status === "approved" || status === "needs_update") updates.reviewed_at = new Date().toISOString();
  if (status === "gov_submitted") updates.gov_submitted_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("customer_forms")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
