import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("form_fields")
    .select("*")
    .eq("template_id", id)
    .order("order_index");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { label, field_type, required, options, placeholder, help_text, order_index } = body;

  if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("form_fields")
    .insert({
      template_id: id,
      label,
      field_type: field_type || "text",
      required: required ?? false,
      options: options || null,
      placeholder: placeholder || null,
      help_text: help_text || null,
      order_index: order_index ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id: templateId } = await params;
  const body = await req.json();
  const { fieldId, ...updates } = body;

  if (!fieldId) return NextResponse.json({ error: "fieldId required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("form_fields")
    .update(updates)
    .eq("id", fieldId)
    .eq("template_id", templateId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id: templateId } = await params;
  const { fieldId } = await req.json();

  const { error } = await supabaseAdmin
    .from("form_fields")
    .delete()
    .eq("id", fieldId)
    .eq("template_id", templateId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
