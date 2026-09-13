import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — list all service requests with user info
export async function GET(req: NextRequest) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const status = req.nextUrl.searchParams.get("status"); // pending | in_progress | completed | all
  const type = req.nextUrl.searchParams.get("type");

  let query = supabaseAdmin
    .from("service_requests")
    .select("*, users(id,name,email,company), services(name,type)")
    .order("created_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);
  if (type) query = query.eq("service_type", type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
