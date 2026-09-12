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
