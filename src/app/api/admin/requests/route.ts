import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — list all service requests, then enrich with user info
export async function GET(req: NextRequest) {
  const auth = await requireAdminOrStaff();
  if (auth.error) return auth.error;

  const status = req.nextUrl.searchParams.get("status");
  const type = req.nextUrl.searchParams.get("type");

  let query = supabaseAdmin
    .from("service_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);
  if (type) query = query.eq("service_type", type);

  const { data: requests, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!requests || requests.length === 0) return NextResponse.json([]);

  // Fetch user info for all unique user_ids in one query
  const userIds = [...new Set(requests.map(r => r.user_id).filter(Boolean))];
  const { data: users } = await supabaseAdmin
    .from("users")
    .select("id,name,email,company")
    .in("id", userIds);

  const userMap = Object.fromEntries((users ?? []).map(u => [u.id, u]));

  const enriched = requests.map(r => ({
    ...r,
    users: userMap[r.user_id] ?? null,
  }));

  return NextResponse.json(enriched);
}
