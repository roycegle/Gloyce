import { NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("customer_forms")
    .select("*, form_templates(id, name, description, category, service_type), services(id, name, type)")
    .eq("user_id", auth.userId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
