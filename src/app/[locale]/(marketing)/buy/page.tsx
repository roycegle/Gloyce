"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, Loader2, Building2, Globe, CreditCard, Calculator, FileText, Shield, Zap } from "lucide-react";

const SERVICE_META: Record<string, { name: string; price: number; description: string; duration: string; isMonthly?: boolean }> = {
  us_llc_standard:  { name: "US LLC — Standard",              price: 799,  description: "LLC formation, EIN, registered agent 1yr", duration: "7–14 days" },
  us_llc_premium:   { name: "US LLC — Premium",               price: 1299, description: "LLC + bank intro + payment gateway + bookkeeping", duration: "10–21 days" },
  singapore:        { name: "Singapore Company Formation",     price: 999,  description: "Pte Ltd + nominee director + corp secretary", duration: "3–7 days" },
  hong_kong:        { name: "Hong Kong Company Formation",     price: 1199, description: "HK Ltd + registered address + corp secretary", duration: "5–10 days" },
  us_bank:          { name: "US Bank Account",                 price: 299,  description: "Remote US business bank account opening", duration: "3–7 days" },
  payment_gateway:  { name: "Payment Gateway Setup",           price: 199,  description: "Stripe / PayPal approval and setup", duration: "2–5 days" },
  accounting_basic: { name: "Monthly Accounting — Basic",      price: 299,  description: "Bookkeeping, P&L reports, annual tax return", duration: "Monthly", isMonthly: true },
  accounting_pro:   { name: "Monthly Accounting — Pro",        price: 499,  description: "Full accounting + payroll + ODI compliance", duration: "Monthly", isMonthly: true },
  odi:              { name: "ODI Registration",                price: 499,  description: "Register overseas investment with SBV", duration: "21–30 days" },
  certification:    { name: "Document Certification",          price: 199,  description: "Apostille and notarization of documents", duration: "5–15 days" },
};

const COUNTRIES = [
  "Vietnam", "United States", "Singapore", "Hong Kong", "Thailand", "Malaysia",
  "Indonesia", "Philippines", "Australia", "United Kingdom", "Germany", "Japan",
  "South Korea", "Canada", "Other",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
};

function BuyContent() {
  const params = useSearchParams();
  const routeParams = useParams();
  const router = useRouter();
  const locale = (routeParams.locale as string) || "en";

  const serviceKey = params.get("service") || "";
  const service = SERVICE_META[serviceKey];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", company: "", country: "Vietnam" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!service) {
      router.replace(`/${locale}/get-started`);
    }
  }, [service, locale, router]);

  if (!service) return null;

  const STEPS = ["Service", "Your info", "Review", "Done"];

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setApiError("");
    setSubmitting(true);

    const res = await fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, serviceKey }),
    });
    const data = await res.json();

    if (!res.ok) {
      setApiError(data.error || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setStep(4);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <div className="border-b border-navy-800 bg-navy-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/${locale}`}>
            <span className="bg-gold text-ink-950 font-black text-sm px-2.5 py-1 rounded-md tracking-widest">GLOYCE</span>
          </Link>
          <Link href={`/${locale}/get-started`} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-foreground transition-colors">
            <ChevronLeft size={14} /> All services
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Progress steps */}
        {step < 4 && (
          <div className="flex items-center gap-0 mb-10">
            {STEPS.slice(0, 3).map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      done ? "bg-emerald-500 border-emerald-500 text-white" :
                      active ? "border-gold bg-gold/10 text-gold" :
                      "border-navy-700 text-navy-600"
                    }`}>
                      {done ? <Check size={12} /> : num}
                    </div>
                    <span className={`text-xs mt-1 ${active ? "text-foreground" : "text-navy-600"}`}>{label}</span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 mx-2 mt-[-18px] ${done ? "bg-emerald-500/40" : "bg-navy-800"}`} />}
                </div>
              );
            })}
          </div>
        )}

        {/* Step 1: Service selected */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">You selected</h1>
            <p className="text-navy-400 mb-6">Review your chosen service before providing your details.</p>

            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{service.name}</h2>
                  <p className="text-sm text-navy-400 mt-0.5">{service.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold">${service.price.toLocaleString()}</div>
                  <div className="text-xs text-navy-500">{service.isMonthly ? "/month" : "one-time"}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-navy-700 flex items-center gap-4 text-xs text-navy-500">
                <span>Timeline: {service.duration}</span>
                <span>·</span>
                <span>Invoice due in 7 days</span>
              </div>
            </div>

            <div className="bg-navy-800/50 border border-navy-700 rounded-xl p-4 mb-6 text-sm text-navy-400">
              <p className="font-medium text-foreground mb-1">What happens next?</p>
              <ol className="list-decimal list-inside flex flex-col gap-1">
                <li>We create your account and send you a setup email</li>
                <li>You set your password and log into your dashboard</li>
                <li>Fill in the required forms for your service</li>
                <li>We process your order and send updates along the way</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/get-started`}
                className="px-5 py-3 rounded-xl border border-navy-700 text-navy-400 text-sm font-medium hover:text-foreground hover:border-navy-600 transition-colors"
              >
                Change service
              </Link>
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl bg-gold text-ink-950 font-semibold text-sm hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact info */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your information</h1>
            <p className="text-navy-400 mb-6">We'll create your Gloyce account and email you login instructions.</p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-xs font-medium text-navy-400 mb-1.5 block">Full name <span className="text-red-400">*</span></label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nguyen Van A"
                  className={`w-full bg-navy-800 border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 ${errors.name ? "border-red-500/50" : "border-navy-700"}`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-navy-400 mb-1.5 block">Email address <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className={`w-full bg-navy-800 border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 ${errors.email ? "border-red-500/50" : "border-navy-700"}`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-navy-400 mb-1.5 block">Phone number <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+84 90 xxx xxxx"
                  className={`w-full bg-navy-800 border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 ${errors.phone ? "border-red-500/50" : "border-navy-700"}`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-navy-400 mb-1.5 block">Company name <span className="text-navy-600">(optional)</span></label>
                <input
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Your current business name"
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-navy-400 mb-1.5 block">Country of residence</label>
                <select
                  value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-navy-700 text-navy-400 text-sm font-medium hover:text-foreground hover:border-navy-600 transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={() => { if (validate()) setStep(3); }}
                className="flex-1 py-3 rounded-xl bg-gold text-ink-950 font-semibold text-sm hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                Review order <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Review your order</h1>
            <p className="text-navy-400 mb-6">Please confirm all details before we create your account.</p>

            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 mb-4">
              <h3 className="text-xs font-medium text-navy-500 uppercase tracking-wide mb-3">Service</h3>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{service.name}</p>
                  <p className="text-sm text-navy-400">{service.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold">${service.price.toLocaleString()}</p>
                  <p className="text-xs text-navy-500">{service.isMonthly ? "/month" : "one-time"}</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 mb-6">
              <h3 className="text-xs font-medium text-navy-500 uppercase tracking-wide mb-3">Your details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-navy-500 text-xs">Name</p>
                  <p className="text-foreground font-medium">{form.name}</p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs">Email</p>
                  <p className="text-foreground font-medium truncate">{form.email}</p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs">Phone</p>
                  <p className="text-foreground font-medium">{form.phone}</p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs">Country</p>
                  <p className="text-foreground font-medium">{form.country}</p>
                </div>
                {form.company && (
                  <div className="col-span-2">
                    <p className="text-navy-500 text-xs">Company</p>
                    <p className="text-foreground font-medium">{form.company}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6 text-sm text-navy-400">
              <p className="font-medium text-amber-400 mb-1">Invoice will be sent separately</p>
              <p>Your invoice of <strong className="text-foreground">${service.price.toLocaleString()}</strong> will be sent to {form.email} and is due within 7 days. Service begins once payment is confirmed.</p>
            </div>

            {apiError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 text-sm text-red-400">
                {apiError}
                {apiError.includes("already exists") && (
                  <div className="mt-2">
                    <Link href={`/${locale}/auth/login`} className="text-gold underline">Sign in to your account →</Link>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-navy-700 text-navy-400 text-sm font-medium hover:text-foreground hover:border-navy-600 transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft size={14} /> Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-gold text-ink-950 font-semibold text-sm hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Creating your account…</>
                ) : (
                  <>Confirm &amp; create account <ChevronRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <Check size={28} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Order received!</h1>
            <p className="text-navy-400 mb-2">
              Check your inbox at <strong className="text-foreground">{form.email}</strong>
            </p>
            <p className="text-navy-500 text-sm mb-8">
              We've sent you an email with a link to set your password and access your dashboard. The link expires in 48 hours.
            </p>

            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 text-left mb-6 max-w-sm mx-auto">
              <h3 className="font-semibold text-foreground mb-3">What's next</h3>
              <ol className="flex flex-col gap-3">
                {[
                  "Check your email for setup link",
                  "Set your password",
                  "Log in to your dashboard",
                  "Fill in your service forms",
                  "Pay your invoice to begin",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-navy-400">
                    <div className="w-5 h-5 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-xs text-gold font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-xs text-navy-600">
              Questions? Email <a href="mailto:hello@gloyce.com" className="text-gold hover:underline">hello@gloyce.com</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <Loader2 size={24} className="animate-spin text-gold" />
      </div>
    }>
      <BuyContent />
    </Suspense>
  );
}
