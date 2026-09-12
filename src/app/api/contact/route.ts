import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Log submission server-side (replace with email/CRM integration when ready)
    console.log("[Contact form submission]", {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      company: body.company ?? "",
      service: body.service ?? "",
      message: body.message,
    });

    // TODO: integrate with email service (Resend, SendGrid, etc.) or CRM
    // Example with Resend:
    // await resend.emails.send({
    //   from: "noreply@gloyce.co",
    //   to: "hello@gloyce.co",
    //   subject: `New contact: ${body.name} — ${body.service || "General"}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nCompany: ${body.company}\nService: ${body.service}\n\n${body.message}`,
    // });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
