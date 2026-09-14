import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — admin uploads result file for a standard service purchase
// Saves file to Storage, creates Documents record, marks service complete
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { id } = await params;

  const { data: service, error: fetchErr } = await supabaseAdmin
    .from("services")
    .select("id, user_id, type, name, total_steps")
    .eq("id", id)
    .single();

  if (fetchErr || !service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop() || "bin";
  const timestamp = Date.now();
  const storagePath = `${service.user_id}/results/${id}-${timestamp}.${ext}`;

  const bytes = await file.arrayBuffer();
  const { error: uploadErr } = await supabaseAdmin.storage
    .from("documents")
    .upload(storagePath, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

  const { data: { publicUrl } } = supabaseAdmin.storage.from("documents").getPublicUrl(storagePath);

  // Mark service as complete
  const { error: updateErr } = await supabaseAdmin
    .from("services")
    .update({ status: "complete", current_step: service.total_steps })
    .eq("id", id);

  if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 });

  // Create Documents record so file appears in customer's Documents tab
  const docCategory =
    service.type?.includes("llc") || service.type?.includes("singapore") || service.type?.includes("hong_kong")
      ? "license"
      : service.type?.includes("tax") || service.type?.includes("odi")
        ? "compliance"
        : "company";

  await supabaseAdmin.from("documents").insert({
    user_id: service.user_id,
    service_id: id,
    name: file.name,
    category: docCategory,
    file_url: publicUrl,
    storage_path: storagePath,
    status: "active",
    uploaded_by: "Gloyce",
  });

  return NextResponse.json({ result_url: publicUrl, result_filename: file.name });
}
