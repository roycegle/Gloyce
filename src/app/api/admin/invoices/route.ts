import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrStaff } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_payments");
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  let query = supabaseAdmin
    .from("invoices")
    .select("*, users(name,email), services(name,type)")
    .order("created_at", { ascending: false });

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminOrStaff("manage_payments");
  if (auth.error) return auth.error;

  const body = await req.json();
  const { user_id, service_id, amount, currency, description, due_date } = body;
  if (!user_id || !amount) return NextResponse.json({ error: "user_id and amount required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("invoices")
    .insert({ user_id, service_id: service_id || null, amount, currency: currency || "USD", description, due_date: due_date || null, status: "pending" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
