import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id,name,email,phone,company,status,created_at")
    .eq("id", auth.userId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.phone !== undefined) updates.phone = body.phone;
  if (body.company !== undefined) updates.company = body.company;

  if (body.newPassword && body.currentPassword) {
    const { data: user } = await supabaseAdmin.from("users").select("password_hash").eq("id", auth.userId).single();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const match = await bcrypt.compare(body.currentPassword, user.password_hash);
    if (!match) return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
    updates.password_hash = await bcrypt.hash(body.newPassword, 12);
  }

  if (Object.keys(updates).length === 0) return NextResponse.json({ message: "Nothing to update" });

  const { data, error } = await supabaseAdmin
    .from("users")
    .update(updates)
    .eq("id", auth.userId)
    .select("id,name,email,phone,company,status")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
