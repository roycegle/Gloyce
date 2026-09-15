import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — admin uploads one or more result files for a service request
// Each file creates a Documents record; request is marked completed after all uploads
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data: serviceReq, error: fetchErr } = await supabaseAdmin
    .from("service_requests")
    .select("id, user_id, service_type, details")
    .eq("id", id)
    .single();

  if (fetchErr || !serviceReq) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  if (!files.length) return NextResponse.json({ error: "No files provided" }, { status: 400 });

  const docCategory =
    serviceReq.service_type === "certification" ? "certification" :
    serviceReq.service_type === "document_request" ? "company" : "general";

  const results: { url: string; filename: string }[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop() || "bin";
    const storagePath = `${serviceReq.user_id}/results/${id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

    const bytes = await file.arrayBuffer();
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("documents")
      .upload(storagePath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

    const { data: { publicUrl } } = supabaseAdmin.storage.from("documents").getPublicUrl(storagePath);

    await supabaseAdmin.from("documents").insert({
      user_id: serviceReq.user_id,
      name: file.name,
      category: docCategory,
      file_url: publicUrl,
      storage_path: storagePath,
      status: "active",
      uploaded_by: "Gloyce",
    });

    results.push({ url: publicUrl, filename: file.name });
  }

  // Save all result files to request details, mark completed
  const updatedDetails = {
    ...(serviceReq.details as Record<string, unknown>),
    result_files: results,
    // Keep legacy fields pointing to first file for backward compat
    result_url: results[0].url,
    result_filename: results[0].filename,
  };

  await supabaseAdmin
    .from("service_requests")
    .update({ details: updatedDetails, status: "completed" })
    .eq("id", id);

  return NextResponse.json({ files: results });
}
