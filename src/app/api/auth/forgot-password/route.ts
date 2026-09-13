import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://gloyce.com";
const FROM = process.env.RESEND_FROM || "Gloyce <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  // Always return ok to prevent email enumeration
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, name, email")
    .eq("email", email.toLowerCase())
    .single();

  if (!user) return NextResponse.json({ ok: true });

  // Invalidate old tokens
  await supabaseAdmin
    .from("password_reset_tokens")
    .update({ used: true })
    .eq("user_id", user.id)
    .eq("used", false);

  // Create new token
  const token = crypto.randomBytes(32).toString("hex");
  await supabaseAdmin.from("password_reset_tokens").insert({
    user_id: user.id,
    token,
    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
  });

  const link = `${BASE_URL}/en/auth/reset-password?token=${token}`;

  // Send email via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: user.email,
      subject: "Reset your Gloyce password",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#0F172A;border-radius:16px;overflow:hidden">
    <div style="padding:32px 40px 24px;border-bottom:1px solid #1E293B">
      <div style="display:inline-block;background:#F59E0B;color:#0F172A;font-weight:800;font-size:18px;padding:6px 16px;border-radius:8px;letter-spacing:1px">GLOYCE</div>
    </div>
    <div style="padding:32px 40px">
      <h1 style="margin:0 0 8px;color:#F1F5F9;font-size:22px;font-weight:700">Reset your password</h1>
      <p style="margin:0 0 24px;color:#94A3B8;font-size:15px;line-height:1.6">
        Hi ${user.name}, we received a request to reset the password for your Gloyce account.
      </p>
      <div style="text-align:center;margin:32px 0">
        <a href="${link}" style="display:inline-block;background:#F59E0B;color:#0F172A;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
          Reset Password →
        </a>
      </div>
      <p style="margin:0;color:#475569;font-size:13px;text-align:center">
        This link expires in 1 hour. If you didn't request a reset, you can safely ignore this email.
      </p>
    </div>
    <div style="padding:20px 40px;border-top:1px solid #1E293B;text-align:center">
      <p style="margin:0;color:#334155;font-size:12px">Gloyce — Global Business Infrastructure</p>
    </div>
  </div>
</body>
</html>`,
    });
  } catch (err) {
    console.error("Reset email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
