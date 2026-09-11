import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id,name,email,status,permissions,created_at")
    .eq("role", "staff")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { name, email, password, permissions } = body;
  if (!name || !email || !password) return NextResponse.json({ error: "name, email, password required" }, { status: 400 });

  const { data: existing } = await supabaseAdmin.from("users").select("id").eq("email", email.toLowerCase()).single();
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const password_hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({ name, email: email.toLowerCase(), password_hash, role: "staff", status: "active", permissions: permissions ?? [] })
    .select("id,name,email,status,permissions,created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
