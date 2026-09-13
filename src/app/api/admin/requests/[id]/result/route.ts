import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — admin uploads a result file for a service request
// Stores file in Supabase Storage, saves result_url to details, marks request completed
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data: serviceReq, error: fetchErr } = await supabaseAdmin
    .from("service_requests")
    .select("id, user_id, details")
    .eq("id", id)
    .single();

  if (fetchErr || !serviceReq) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() || "bin";
  const timestamp = Date.now();
  const storagePath = `${serviceReq.user_id}/results/${id}-${timestamp}.${ext}`;

  const bytes = await file.arrayBuffer();
  const { error: uploadErr } = await supabaseAdmin.storage
    .from("documents")
    .upload(storagePath, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

  const { data: { publicUrl } } = supabaseAdmin.storage.from("documents").getPublicUrl(storagePath);

  const updatedDetails = {
    ...(serviceReq.details as Record<string, unknown>),
    result_url: publicUrl,
    result_filename: file.name,
  };

  const { error: updateErr } = await supabaseAdmin
    .from("service_requests")
    .update({ details: updatedDetails, status: "completed" })
    .eq("id", id);

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  return NextResponse.json({ result_url: publicUrl, result_filename: file.name });
}
