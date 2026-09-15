import { NextResponse } from "next/server";
import { requireUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireUser();
  if (auth.error) return auth.error;

  const { id: serviceId } = await params;

  const { data: service, error: svcErr } = await supabaseAdmin
    .from("services")
    .select("id,type,name,company_name,status,current_step,total_steps,price,currency,notes,created_at")
    .eq("id", serviceId)
    .eq("user_id", auth.userId)
    .single();

  if (svcErr || !service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [
    { data: forms },
    { data: documents },
    { data: invoices },
    { data: requests },
  ] = await Promise.all([
    supabaseAdmin
      .from("customer_forms")
      .select("id,status,notes,due_date,submitted_at,reviewed_at,gov_submitted_at,admin_review_notes,gov_submission_notes,responses,created_at,form_templates(id,name,description,category)")
      .eq("service_id", serviceId)
      .eq("user_id", auth.userId)
      .order("created_at", { ascending: true }),
    supabaseAdmin
      .from("documents")
      .select("id,name,category,file_url,status,uploaded_by,created_at")
      .eq("service_id", serviceId)
      .eq("user_id", auth.userId)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("invoices")
      .select("id,amount,currency,status,description,due_date,paid_at")
      .eq("service_id", serviceId)
      .eq("user_id", auth.userId),
    supabaseAdmin
      .from("service_requests")
      .select("id,service_type,status,payment_status,price,currency,details,created_at")
      .eq("service_id", serviceId)
      .eq("user_id", auth.userId)
      .order("created_at", { ascending: false }),
  ]);

  return NextResponse.json({
    service,
    forms: forms ?? [],
    documents: documents ?? [],
    invoices: invoices ?? [],
    requests: requests ?? [],
  });
}
