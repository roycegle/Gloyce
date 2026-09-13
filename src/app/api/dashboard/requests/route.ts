import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — all service requests for the current customer
export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .select("id, service_type, status, payment_status, price, currency, details, created_at")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST — customer submits a new service request (certification or document_request)
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { service_type, details } = body;

  if (!service_type || !["certification", "document_request"].includes(service_type)) {
    return NextResponse.json({ error: "Invalid service_type" }, { status: 400 });
  }

  // For certification, check for duplicate (same document_id pending/in_progress)
  if (service_type === "certification" && details?.document_id) {
    const { data: existing } = await supabaseAdmin
      .from("service_requests")
      .select("id, status")
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
