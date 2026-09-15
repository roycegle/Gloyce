import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// POST — admin uploads one or more result files for a standard service
// Each file creates a Documents record; service is marked complete after all uploads
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
  const files = formData.getAll("files") as File[];
  if (!files.length) return NextResponse.json({ error: "No files provided" }, { status: 400 });

  const docCategory =
    service.type?.includes("llc") || service.type?.includes("singapore") || service.type?.includes("hong_kong")
      ? "license"
      : service.type?.includes("tax") || service.type?.includes("odi")
        ? "compliance"
        : "company";

  const results: { url: string; filename: string }[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop() || "bin";
    const storagePath = `${service.user_id}/results/${id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

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
      user_id: service.user_id,
      service_id: id,
      name: file.name,
      category: docCategory,
      file_url: publicUrl,
      storage_path: storagePath,
      status: "active",
      uploaded_by: "Gloyce",
    });

    results.push({ url: publicUrl, filename: file.name });
  }

  // Mark service complete after all files uploaded
  await supabaseAdmin
    .from("services")
    .update({ status: "complete", current_step: service.total_steps })
    .eq("id", id);

  return NextResponse.json({ files: results });
}
