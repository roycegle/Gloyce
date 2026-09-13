import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";
import crypto from "crypto";

const SERVICE_META: Record<string, { name: string; type: string; steps: number; price: number }> = {
  us_llc_standard:   { name: "US LLC — Standard", type: "us_llc", steps: 6, price: 799 },
  us_llc_premium:    { name: "US LLC — Premium", type: "us_llc", steps: 8, price: 1299 },
  singapore:         { name: "Singapore Company Formation", type: "singapore", steps: 6, price: 999 },
  hong_kong:         { name: "Hong Kong Company Formation", type: "hong_kong", steps: 6, price: 1199 },
  us_bank:           { name: "US Bank Account", type: "us_bank", steps: 4, price: 299 },
  payment_gateway:   { name: "Payment Gateway Setup", type: "payment_gateway", steps: 3, price: 199 },
  accounting_basic:  { name: "Monthly Accounting — Basic", type: "accounting", steps: 3, price: 299 },
  accounting_pro:    { name: "Monthly Accounting — Pro", type: "accounting", steps: 3, price: 499 },
  odi:               { name: "ODI Registration", type: "odi", steps: 5, price: 499 },
  certification:     { name: "Document Certification", type: "certification", steps: 3, price: 199 },
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, company, country, serviceKey } = body;

  if (!name || !email || !serviceKey) {
    return NextResponse.json({ error: "name, email, serviceKey required" }, { status: 400 });
  }

  const meta = SERVICE_META[serviceKey];
  if (!meta) return NextResponse.json({ error: "Invalid service" }, { status: 400 });

  // Check duplicate
  const { data: existing } = await supabaseAdmin
    .from("users").select("id").eq("email", email.toLowerCase()).single();

  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists. Please log in." }, { status: 409 });
  }

  // Create user with random password (will be reset via magic link)
  const tempPassword = crypto.randomBytes(32).toString("hex");
  const passwordHash = await bcrypt.hash(tempPassword, 12);

  const { data: user, error: userError } = await supabaseAdmin
    .from("users")
    .insert({
      name,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      phone: phone || null,
      company: company || null,
      role: "client",
      status: "active",
    })
    .select("id,name,email")
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: userError?.message || "Failed to create account" }, { status: 500 });
  }

  // Create service
  const { data: service } = await supabaseAdmin
    .from("services")
    .insert({
      user_id: user.id,
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

  // Create invoice
  await supabaseAdmin.from("invoices").insert({
    user_id: user.id,
    service_id: service?.id || null,
    amount: meta.price,
    currency: "USD",
    description: `${meta.name} — Setup fee`,
    status: "pending",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Auto-assign form template
  const { data: template } = await supabaseAdmin
    .from("form_templates").select("id").eq("service_type", meta.type).limit(1).single();

  if (template && service) {
    await supabaseAdmin.from("customer_forms").insert({
      user_id: user.id,
      template_id: template.id,
      service_id: service.id,
      status: "pending",
      notes: `Required to process your ${meta.name}. Please complete as soon as possible.`,
    });
  }

  // Generate onboarding token
  const token = crypto.randomBytes(32).toString("hex");
  await supabaseAdmin.from("onboarding_tokens").insert({
    user_id: user.id,
    token,
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  });

  // Send welcome email
  try {
    await sendWelcomeEmail({ name: user.name, email: user.email, serviceName: meta.name, token });
  } catch (emailErr) {
    console.error("Email send failed:", emailErr);
    // Don't fail the whole purchase if email fails
  }

  return NextResponse.json({ ok: true, userId: user.id });
}
