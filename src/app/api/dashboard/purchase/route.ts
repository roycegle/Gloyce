import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

const SERVICE_META: Record<string, { name: string; type: string; steps: number; price: number }> = {
  us_llc_standard:   { name: "US LLC — Standard",              type: "us_llc",          steps: 6, price: 799 },
  us_llc_premium:    { name: "US LLC — Premium",               type: "us_llc",          steps: 8, price: 1299 },
  singapore:         { name: "Singapore Company Formation",     type: "singapore",       steps: 6, price: 999 },
  hong_kong:         { name: "Hong Kong Company Formation",     type: "hong_kong",       steps: 6, price: 1199 },
  us_bank:           { name: "US Bank Account",                 type: "us_bank",         steps: 4, price: 299 },
  payment_gateway:   { name: "Payment Gateway Setup",           type: "payment_gateway", steps: 3, price: 199 },
  accounting_basic:  { name: "Monthly Accounting — Basic",      type: "accounting",      steps: 3, price: 299 },
  accounting_pro:    { name: "Monthly Accounting — Pro",        type: "accounting",      steps: 3, price: 499 },
  odi:               { name: "ODI Registration",                type: "odi",             steps: 5, price: 499 },
  certification:     { name: "Document Certification",          type: "certification",   steps: 3, price: 199 },
};

export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const body = await req.json();
  const { serviceKey } = body;

  if (!serviceKey) {
    return NextResponse.json({ error: "serviceKey required" }, { status: 400 });
  }

  const meta = SERVICE_META[serviceKey];
  if (!meta) return NextResponse.json({ error: "Invalid service" }, { status: 400 });

  // Create service for existing user
  const { data: service, error: serviceError } = await supabaseAdmin
    .from("services")
    .insert({
      user_id: auth.userId,
      type: meta.type,
      name: meta.name,
      price: meta.price,
      currency: "USD",
      total_steps: meta.steps,
      current_step: 1,
      status: "pending",
    })
    .select("id")
    .single();

  if (serviceError || !service) {
    return NextResponse.json({ error: serviceError?.message || "Failed to create service" }, { status: 500 });
  }

  // Get user email for invoice reference
  const { data: user } = await supabaseAdmin
    .from("users").select("email").eq("id", auth.userId).single();

  // Create invoice
  await supabaseAdmin.from("invoices").insert({
    user_id: auth.userId,
    service_id: service.id,
    amount: meta.price,
    currency: "USD",
    description: `${meta.name} — Setup fee`,
    status: "pending",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Auto-assign form template
  const { data: template } = await supabaseAdmin
    .from("form_templates").select("id").eq("service_type", meta.type).limit(1).single();

  if (template) {
    await supabaseAdmin.from("customer_forms").insert({
      user_id: auth.userId,
      template_id: template.id,
      service_id: service.id,
      status: "pending",
      notes: `Required to process your ${meta.name}. Please complete as soon as possible.`,
    });
  }

  return NextResponse.json({ ok: true, serviceId: service.id, userEmail: user?.email });
}
