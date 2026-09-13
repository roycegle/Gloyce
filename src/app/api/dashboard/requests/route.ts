import { NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — return all service requests for the current customer
export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .select("id, service_type, status, details, created_at")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
