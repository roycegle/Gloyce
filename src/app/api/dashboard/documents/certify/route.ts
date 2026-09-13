import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — customer requests certification/apostille for a document
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { document_id, certification_type, destination_country, purpose, copies, delivery_method, notes } = body;

  if (!certification_type || !destination_country || !purpose) {
    return NextResponse.json({ error: "certification_type, destination_country, purpose are required" }, { status: 400 });
  }

  // Prevent duplicate: check if there's already a pending/in_progress request for this document
  if (document_id) {
    const { data: existing } = await supabaseAdmin
      .from("service_requests")
      .select("id, status")
      .eq("user_id", auth.userId)
      .eq("service_type", "certification")
      .in("status", ["pending", "in_progress"])
      .contains("details", { document_id })
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Tài liệu này đã có yêu cầu chứng thực đang ${existing.status === "pending" ? "chờ xử lý" : "được xử lý"}` },
        { status: 409 }
      );
    }
  }

  const details: Record<string, unknown> = {
    document_id: document_id || null,
    certification_type,
    destination_country,
    purpose,
    copies: copies || 1,
    delivery_method: delivery_method || "digital",
    notes: notes || null,
  };

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .insert({
      user_id: auth.userId,
      service_type: "certification",
      status: "pending",
      details,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
