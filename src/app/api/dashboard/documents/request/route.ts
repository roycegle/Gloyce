import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — customer requests a document from Gloyce
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { document_type, service_id, description, urgency } = body;

  if (!document_type || !description) {
    return NextResponse.json({ error: "document_type and description are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .insert({
      user_id: auth.userId,
      service_id: service_id || null,
      service_type: "document_request",
      status: "pending",
      details: {
        document_type,
        description,
        urgency: urgency || "normal",
      },
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
