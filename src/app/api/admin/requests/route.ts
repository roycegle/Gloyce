import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// Normalize a service row into the unified request shape
function normalizeService(svc: Record<string, unknown>, userMap: Record<string, unknown>, invoiceMap: Record<string, string>) {
  const svcId = svc.id as string;
  const rawStatus = svc.status as string;
  // Map service status → unified status
  const status =
    rawStatus === "complete" ? "completed" :
    rawStatus === "pending" ? "pending" : "in_progress";

  // Derive payment_status from invoice
  const invStatus = invoiceMap[svcId];
  const payment_status = !invStatus ? "none" : invStatus === "paid" ? "paid" : "awaiting";

  return {
    id: svcId,
    source: "service" as const,
    user_id: svc.user_id as string,
    service_type: svc.type as string,
    display_name: svc.name as string,
    status,
    payment_status,
    price: (svc.price as number) ?? null,
    currency: (svc.currency as string) || "USD",
    is_price_fixed: true,
    current_step: svc.current_step as number,
    total_steps: svc.total_steps as number,
    details: { admin_notes: svc.notes },
    created_at: svc.created_at as string,
    users: (userMap[svc.user_id as string] as Record<string, unknown>) ?? null,
    source_document: null,
  };
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const status = req.nextUrl.searchParams.get("status");
  const type = req.nextUrl.searchParams.get("type");

  // ── Fetch service_requests ──────────────────────────────────────────────────
  let srQuery = supabaseAdmin
    .from("service_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") srQuery = srQuery.eq("status", status);
  if (type) srQuery = srQuery.eq("service_type", type);

  const { data: serviceRequests, error: srErr } = await srQuery;
  if (srErr) return NextResponse.json({ error: srErr.message }, { status: 500 });

  // ── Fetch services (standard purchases) ────────────────────────────────────
  let svcQuery = supabaseAdmin
    .from("services")
    .select("id,user_id,type,name,status,price,currency,current_step,total_steps,notes,created_at")
    .order("created_at", { ascending: false });

  // Map service status filter
  if (status && status !== "all") {
    if (status === "completed") svcQuery = svcQuery.eq("status", "complete");
    else if (status === "pending") svcQuery = svcQuery.eq("status", "pending");
    else if (status === "in_progress") svcQuery = svcQuery.in("status", ["active", "action_required"]);
  }

  const { data: services, error: svcErr } = await svcQuery;
  if (svcErr) return NextResponse.json({ error: svcErr.message }, { status: 500 });

  // ── Collect all user IDs ────────────────────────────────────────────────────
  const allUserIds = [
    ...new Set([
      ...(serviceRequests ?? []).map(r => r.user_id),
      ...(services ?? []).map(s => s.user_id),
    ].filter(Boolean)),
  ];

  const { data: users } = allUserIds.length
    ? await supabaseAdmin.from("users").select("id,name,email,company").in("id", allUserIds)
    : { data: [] };

  const userMap = Object.fromEntries((users ?? []).map(u => [u.id, u]));

  // ── Fetch invoices for services to derive payment_status ───────────────────
  const serviceIds = (services ?? []).map(s => s.id);
  const { data: invoices } = serviceIds.length
    ? await supabaseAdmin.from("invoices").select("service_id,status").in("service_id", serviceIds)
    : { data: [] };

  // For each service, take the latest invoice status
  const invoiceMap: Record<string, string> = {};
  (invoices ?? []).forEach(inv => {
    if (inv.service_id) invoiceMap[inv.service_id] = inv.status;
  });

  // ── Fetch source docs for certification service_requests ───────────────────
  const docIds = (serviceRequests ?? [])
    .filter(r => r.service_type === "certification" && (r.details as Record<string, unknown>)?.document_id)
    .map(r => (r.details as Record<string, unknown>).document_id as string)
    .filter(Boolean);

  const docMap: Record<string, { id: string; name: string; file_url?: string; category?: string }> = {};
  if (docIds.length) {
    const { data: docs } = await supabaseAdmin.from("documents").select("id,name,file_url,category").in("id", docIds);
    (docs ?? []).forEach(doc => { docMap[doc.id] = doc; });
  }

  // ── Enrich service_requests ─────────────────────────────────────────────────
  const enrichedSR = (serviceRequests ?? []).map(r => {
    const details = r.details as Record<string, unknown>;
    const sourceDocId = details?.document_id as string | undefined;
    return {
      ...r,
      source: "service_request" as const,
      display_name: null,  // derived on frontend from service_type
      is_price_fixed: false,
      users: userMap[r.user_id] ?? null,
      source_document: sourceDocId ? (docMap[sourceDocId] ?? null) : null,
    };
  });

  // ── Normalize services ──────────────────────────────────────────────────────
  const normalizedSvc = (services ?? []).map(s =>
    normalizeService(s as Record<string, unknown>, userMap, invoiceMap)
  );

  // ── Merge and sort by created_at desc ──────────────────────────────────────
  const combined = [...enrichedSR, ...normalizedSvc].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(combined);
}
