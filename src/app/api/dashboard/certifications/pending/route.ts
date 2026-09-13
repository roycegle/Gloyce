import { NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — return document_ids that have a pending/in_progress certification request
export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .select("details")
    .eq("user_id", auth.userId)
    .eq("service_type", "certification")
    .in("status", ["pending", "in_progress"]);

  if (error) return NextResponse.json([], { status: 200 });

  const result = (data ?? [])
    .map(r => ({ document_id: (r.details as Record<string, unknown>)?.document_id as string | null }))
    .filter(r => r.document_id);

  return NextResponse.json(result);
}
