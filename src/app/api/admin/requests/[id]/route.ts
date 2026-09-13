import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// PATCH — update request status and admin notes
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const { id } = await params;
  const body = await req.json();
  const { status, admin_notes } = body;

  // Merge admin_notes into details JSONB so no schema change needed
  const updatePayload: Record<string, unknown> = {};
  if (status) updatePayload.status = status;

  if (admin_notes !== undefined) {
    // Read current details then merge
    const { data: existing } = await supabaseAdmin
      .from("service_requests")
      .select("details")
      .eq("id", id)
      .single();

    updatePayload.details = { ...(existing?.details || {}), admin_notes };
  }

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .update(updatePayload)
    .eq("id", id)
    .select("*, users(id,name,email,company)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
