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

  // Fetch existing to get user_id and details
  const { data: existing } = await supabaseAdmin
    .from("service_requests")
    .select("user_id, service_type, details, price")
    .eq("id", id)
    .single();

  const updatePayload: Record<string, unknown> = {};
  if (status) updatePayload.status = status;
  if (price !== undefined) updatePayload.price = price;
  if (currency) updatePayload.currency = currency;
  if (payment_status) updatePayload.payment_status = payment_status;

  if (admin_notes !== undefined || body.payment_note !== undefined) {
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

  // When admin sets price and marks awaiting payment → upsert an invoice
  if (payment_status === "awaiting" && price !== undefined && existing?.user_id) {
    const finalPrice = price ?? existing.price;
    const finalCurrency = currency || "USD";
    const TYPE_LABEL: Record<string, string> = {
      certification: "Chứng thực tài liệu",
      document_request: "Yêu cầu tài liệu",
    };
    const description = TYPE_LABEL[existing.service_type] || "Yêu cầu dịch vụ";

    // Check if invoice already exists for this service_request
    const { data: existingInv } = await supabaseAdmin
      .from("invoices")
      .select("id")
      .eq("service_request_id", id)
      .maybeSingle();

    if (existingInv) {
      // Update existing invoice
      await supabaseAdmin
        .from("invoices")
        .update({ amount: finalPrice, currency: finalCurrency, status: "pending" })
        .eq("id", existingInv.id);
    } else {
      // Create new invoice
      await supabaseAdmin.from("invoices").insert({
        user_id: existing.user_id,
        service_request_id: id,
        amount: finalPrice,
        currency: finalCurrency,
        description,
        status: "pending",
      });
    }
  }

  // When admin confirms payment manually → mark invoice paid too
  if (payment_status === "paid") {
    await supabaseAdmin
      .from("invoices")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("service_request_id", id);
  }

  return NextResponse.json(data);
}
