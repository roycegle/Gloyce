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

  // Fetch source documents for certification requests
  const docIds = requests
    .filter(r => r.service_type === "certification" && (r.details as Record<string, unknown>)?.document_id)
    .map(r => (r.details as Record<string, unknown>).document_id as string)
    .filter(Boolean);

  const docMap: Record<string, { id: string; name: string; file_url?: string; category?: string }> = {};
  if (docIds.length > 0) {
    const { data: docs } = await supabaseAdmin
      .from("documents")
      .select("id,name,file_url,category")
      .in("id", docIds);
    (docs ?? []).forEach(doc => { docMap[doc.id] = doc; });
  }

  const enriched = requests.map(r => {
    const details = r.details as Record<string, unknown>;
    const sourceDocId = details?.document_id as string | undefined;
    return {
      ...r,
      users: userMap[r.user_id] ?? null,
      source_document: sourceDocId ? (docMap[sourceDocId] ?? null) : null,
    };
  });

  return NextResponse.json(enriched);
}
