import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — all requests for the current customer: standard services + ad-hoc service_requests
export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  // Fetch service_requests
  const { data: serviceRequests, error: srErr } = await supabaseAdmin
    .from("service_requests")
    .select("id, service_type, status, payment_status, price, currency, details, created_at")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: false });

  if (srErr) return NextResponse.json({ error: srErr.message }, { status: 500 });

  // Fetch standard services
  const { data: services, error: svcErr } = await supabaseAdmin
    .from("services")
    .select("id, type, name, status, price, currency, current_step, total_steps, notes, created_at")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: false });

  if (svcErr) return NextResponse.json({ error: svcErr.message }, { status: 500 });

  // Fetch invoices to derive payment_status for services
  const serviceIds = (services ?? []).map(s => s.id);
  const { data: invoices } = serviceIds.length
    ? await supabaseAdmin.from("invoices").select("service_id,status").in("service_id", serviceIds).eq("user_id", auth.userId)
    : { data: [] };

  const invoiceMap: Record<string, string> = {};
  (invoices ?? []).forEach(inv => {
    if (inv.service_id) invoiceMap[inv.service_id] = inv.status;
  });

  // Normalize services into unified shape
  const normalizedSvc = (services ?? []).map(svc => {
    const rawStatus = svc.status as string;
    const status =
      rawStatus === "complete" ? "completed" :
      rawStatus === "pending" ? "pending" : "in_progress";

    const invStatus = invoiceMap[svc.id];
    const payment_status = !invStatus ? "none" : invStatus === "paid" ? "paid" : "awaiting";

    return {
      id: svc.id,
      source: "service" as const,
      service_type: svc.type,
      display_name: svc.name,
      status,
      payment_status,
      price: svc.price ?? null,
      currency: svc.currency || "USD",
      is_price_fixed: true,
      current_step: svc.current_step,
      total_steps: svc.total_steps,
      details: { admin_notes: svc.notes } as Record<string, unknown>,
      created_at: svc.created_at,
    };
  });

  // Enrich service_requests
  const enrichedSR = (serviceRequests ?? []).map(r => ({
    ...r,
    source: "service_request" as const,
    is_price_fixed: false,
    display_name: null,
  }));

  // Merge and sort
  const combined = [...enrichedSR, ...normalizedSvc].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(combined);
}

// POST — customer submits a new ad-hoc service request
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { service_type, details } = body;

  if (!service_type || !["certification", "document_request"].includes(service_type)) {
    return NextResponse.json({ error: "Invalid service_type" }, { status: 400 });
  }

  // Prevent duplicate certification for same document
  if (service_type === "certification" && details?.document_id) {
    const { data: existing } = await supabaseAdmin
      .from("service_requests")
      .select("id")
      .eq("user_id", auth.userId)
      .eq("service_type", "certification")
      .filter("details->>document_id", "eq", details.document_id)
      .in("status", ["pending", "in_progress"])
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Tài liệu này đã có yêu cầu chứng thực đang xử lý" }, { status: 409 });
    }
  }

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .insert({
      user_id: auth.userId,
      service_type,
      status: "pending",
      payment_status: "none",
      details: details || {},
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
