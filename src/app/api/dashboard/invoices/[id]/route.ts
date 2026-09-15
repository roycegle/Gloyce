import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// PATCH — customer marks invoice as paid
// Marks invoice paid and updates linked service_request to in_progress
export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { id } = await params;

  // Verify invoice belongs to this user and is still pending
  const { data: invoice, error: fetchErr } = await supabaseAdmin
    .from("invoices")
    .select("id, status, service_request_id")
    .eq("id", id)
    .eq("user_id", auth.userId)
    .single();

  if (fetchErr || !invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  if (invoice.status === "paid") return NextResponse.json({ error: "Already paid" }, { status: 400 });

  // Mark invoice paid
  const { error: invErr } = await supabaseAdmin
    .from("invoices")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", id);

  if (invErr) return NextResponse.json({ error: invErr.message }, { status: 500 });

  // Update linked service_request: payment confirmed → start processing
  if (invoice.service_request_id) {
    await supabaseAdmin
      .from("service_requests")
      .update({ payment_status: "paid", status: "in_progress" })
      .eq("id", invoice.service_request_id);
  }

  return NextResponse.json({ success: true });
}
