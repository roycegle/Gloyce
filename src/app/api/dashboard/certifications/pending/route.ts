import { NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — return all certification requests for the current user (all statuses)
// Used by the customer document page to show inline status + result on each doc row
export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .select("id, status, details")
    .eq("user_id", auth.userId)
    .eq("service_type", "certification")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json([], { status: 200 });

  const result = (data ?? [])
    .map(r => {
      const d = r.details as Record<string, unknown>;
      return {
        id: r.id,
        document_id: d?.document_id as string | null,
        status: r.status,
        result_url: (d?.result_url as string) || null,
        result_filename: (d?.result_filename as string) || null,
      };
    })
    .filter(r => r.document_id);

  return NextResponse.json(result);
}
