import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const [
    { count: totalCustomers },
    { count: pendingCustomers },
    { count: activeServices },
    { count: newMessages },
  ] = await Promise.all([
    supabaseAdmin.from("users").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabaseAdmin.from("users").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabaseAdmin.from("services").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabaseAdmin.from("messages").select("*", { count: "exact", head: true }).eq("read", false).eq("sender", "client"),
  ]);

  return NextResponse.json({
    totalCustomers: totalCustomers ?? 0,
    pendingCustomers: pendingCustomers ?? 0,
    activeServices: activeServices ?? 0,
    newMessages: newMessages ?? 0,
  });
}
