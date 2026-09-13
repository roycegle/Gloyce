import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "Gloyce <onboarding@resend.dev>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://gloyce.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

export async function sendWelcomeEmail({
  name,
  email,
  serviceName,
  token,
}: {
  name: string;
  email: string;
  serviceName: string;
  token: string;
}) {
  const link = `${BASE_URL}/en/auth/set-password?token=${token}`;

  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to Gloyce — Set your password to get started`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#0F172A;border-radius:16px;overflow:hidden">
    <!-- Header -->
    <div style="padding:32px 40px 24px;border-bottom:1px solid #1E293B">
      <div style="display:inline-block;background:#F59E0B;color:#0F172A;font-weight:800;font-size:18px;padding:6px 16px;border-radius:8px;letter-spacing:1px">GLOYCE</div>
    </div>
    <!-- Body -->
    <div style="padding:32px 40px">
      <h1 style="margin:0 0 8px;color:#F1F5F9;font-size:22px;font-weight:700">Welcome, ${name}! 👋</h1>
      <p style="margin:0 0 24px;color:#94A3B8;font-size:15px;line-height:1.6">
        Your order for <strong style="color:#F59E0B">${serviceName}</strong> has been received.
        We're excited to work with you.
      </p>
      <p style="margin:0 0 24px;color:#94A3B8;font-size:15px;line-height:1.6">
        To get started, please set your password and access your dashboard to complete the required forms.
      </p>
      <!-- CTA -->
      <div style="text-align:center;margin:32px 0">
        <a href="${link}" style="display:inline-block;background:#F59E0B;color:#0F172A;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
          Set Password &amp; Access Dashboard →
        </a>
      </div>
      <p style="margin:0;color:#475569;font-size:13px;text-align:center">
        This link expires in 48 hours. If you didn't request this, please ignore this email.
      </p>
    </div>
    <!-- Footer -->
    <div style="padding:20px 40px;border-top:1px solid #1E293B;text-align:center">
      <p style="margin:0;color:#334155;font-size:12px">
        Gloyce — Global Business Infrastructure<br>
        <a href="${BASE_URL}" style="color:#F59E0B;text-decoration:none">${BASE_URL}</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  });
}

export async function sendConsultationEmail({
  name,
  email,
  phone,
  company,
  service,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: "hello@gloyce.com",
    replyTo: email,
    subject: `New consultation request — ${service}`,
    html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto">
  <h2>New Consultation Request</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px;color:#64748b;width:120px">Name</td><td style="padding:8px;font-weight:600">${name}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px">${email}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Company</td><td style="padding:8px">${company || "—"}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Service</td><td style="padding:8px;font-weight:600;color:#F59E0B">${service}</td></tr>
    ${message ? `<tr><td style="padding:8px;color:#64748b">Message</td><td style="padding:8px">${message}</td></tr>` : ""}
  </table>
</div>`,
  });
}
