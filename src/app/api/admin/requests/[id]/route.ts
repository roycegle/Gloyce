import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// PATCH — update status, admin_notes, price, payment_status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { status, admin_notes, price, currency, payment_status } = body;

  const updatePayload: Record<string, unknown> = {};
  if (status) updatePayload.status = status;
  if (price !== undefined) updatePayload.price = price;
  if (currency) updatePayload.currency = currency;
  if (payment_status) updatePayload.payment_status = payment_status;

  if (admin_notes !== undefined || body.payment_note !== undefined) {
    const { data: existing } = await supabaseAdmin
      .from("service_requests")
      .select("details")
      .eq("id", id)
      .single();

    updatePayload.details = {
      ...(existing?.details as Record<string, unknown> || {}),
      ...(admin_notes !== undefined ? { admin_notes } : {}),
      ...(body.payment_note !== undefined ? { payment_note: body.payment_note } : {}),
    };
  }

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .update(updatePayload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
