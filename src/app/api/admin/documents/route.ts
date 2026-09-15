import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — list documents for a customer
export async function GET(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) return NextResponse.json({ error: "user_id required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*, services(name,type)")
    .eq("user_id", userId)
    .eq("uploaded_by", "Gloyce")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST — admin uploads one or more documents to customer folder via Supabase Storage
export async function POST(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const userId = formData.get("user_id") as string;
  const category = (formData.get("category") as string) || "general";
  const serviceId = formData.get("service_id") as string | null;
  const customName = formData.get("name") as string | null; // only used when single file

  if (!files.length || !userId) {
    return NextResponse.json({ error: "files and user_id are required" }, { status: 400 });
  }

  const inserted: unknown[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const storagePath = `${userId}/${category}/${timestamp}-${Math.random().toString(36).slice(2,6)}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from("documents")
      .upload(storagePath, new Uint8Array(arrayBuffer), { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from("documents").getPublicUrl(storagePath);

    const { data, error } = await supabaseAdmin
      .from("documents")
      .insert({
        user_id: userId,
        name: (files.length === 1 && customName) ? customName : file.name,
        category,
        service_id: serviceId || null,
        file_url: urlData.publicUrl,
        storage_path: storagePath,
        status: "active",
        uploaded_by: "Gloyce",
      })
      .select()
      .single();

    if (error) {
      await supabaseAdmin.storage.from("documents").remove([storagePath]);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    inserted.push(data);
  }

  return NextResponse.json(inserted.length === 1 ? inserted[0] : inserted);
}

// DELETE — remove a document
export async function DELETE(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_documents");
  if (auth.error) return auth.error;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data: doc } = await supabaseAdmin.from("documents").select("storage_path").eq("id", id).single();

  const { error } = await supabaseAdmin.from("documents").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (doc?.storage_path) {
    await supabaseAdmin.storage.from("documents").remove([doc.storage_path]);
  }

  return NextResponse.json({ ok: true });
}
