import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("id,name,category,file_url,status,uploaded_by,created_at")
    .eq("user_id", auth.userId)
    .eq("uploaded_by", "Gloyce")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST — customer uploads a document
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const category = (formData.get("category") as string) || "general";
  const customName = formData.get("name") as string | null;

  if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 });

  const timestamp = Date.now();
  const storagePath = `${auth.userId}/customer/${timestamp}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from("documents")
    .upload(storagePath, uint8, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from("documents").getPublicUrl(storagePath);

  const { data, error } = await supabaseAdmin
    .from("documents")
    .insert({
      user_id: auth.userId,
      name: customName || file.name,
      category,
      file_url: urlData.publicUrl,
      storage_path: storagePath,
      status: "active",
      uploaded_by: "Customer",
    })
    .select()
    .single();

  if (error) {
    await supabaseAdmin.storage.from("documents").remove([storagePath]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
