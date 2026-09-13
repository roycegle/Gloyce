"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2, Globe, CreditCard, Calculator, FileText, ChevronRight,
  Star, Users, Zap, Shield
} from "lucide-react";

const SERVICES = [
  {
    key: "us_llc_standard",
    name: "US LLC — Standard",
    price: 799,
    badge: null,
    icon: Building2,
    color: "blue",
    description: "Form a US LLC, get EIN tax number, registered agent for 1 year.",
    features: ["LLC formation in your state", "EIN (Tax ID)", "Registered agent 1yr", "Operating agreement", "Compliance guide"],
    duration: "7–14 days",
    category: "Company Formation",
  },
  {
    key: "us_llc_premium",
    name: "US LLC — Premium",
    price: 1299,
    badge: "Most Popular",
    icon: Building2,
    color: "gold",
    description: "Everything in Standard plus bank intro, payment gateway setup, and bookkeeping setup.",
    features: ["Everything in Standard", "US bank account intro", "Payment gateway setup", "Bookkeeping setup", "Priority support"],
    duration: "10–21 days",
    category: "Company Formation",
  },
  {
    key: "singapore",
    name: "Singapore Company",
    price: 999,
    badge: null,
    icon: Globe,
    color: "emerald",
    description: "Register a Private Limited company in Singapore with nominee director.",
    features: ["Pte Ltd registration", "Nominee director 1yr", "Registered address", "Corp secretary", "ACRA filing"],
    duration: "3–7 days",
    category: "Company Formation",
  },
  {
    key: "hong_kong",
    name: "Hong Kong Company",
    price: 1199,
    badge: null,
    icon: Globe,
    color: "rose",
    description: "Incorporate a Hong Kong Limited company with registered address.",
    features: ["HK Ltd incorporation", "Registered address 1yr", "Corp secretary 1yr", "BR registration", "Bank intro"],
    duration: "5–10 days",
    category: "Company Formation",
  },
  {
    key: "us_bank",
    name: "US Bank Account",
    price: 299,
    badge: null,
    icon: CreditCard,
    color: "sky",
    description: "Open a US business bank account remotely — no SSN or US travel required.",
    features: ["Remote account opening", "Debit card (Visa)", "ACH & wire transfers", "Mobile banking", "No monthly fee options"],
    duration: "3–7 days",
    category: "Banking",
  },
  {
    key: "payment_gateway",
    name: "Payment Gateway",
    price: 199,
    badge: null,
    icon: Zap,
    color: "violet",
    description: "Get approved for Stripe, PayPal, or a global payment processor.",
    features: ["Stripe / PayPal setup", "KYC document prep", "Integration guide", "Test mode walkthrough", "Go-live checklist"],
    duration: "2–5 days",
    category: "Banking",
  },
  {
    key: "accounting_basic",
    name: "Accounting — Basic",
    price: 299,
    badge: null,
    icon: Calculator,
    color: "teal",
    description: "Monthly bookkeeping, P&L reports, and annual tax filing for small LLCs.",
    features: ["Monthly P&L reports", "Annual tax return", "Form 5472 (if needed)", "Dedicated accountant", "Cloud accounting software"],
    duration: "Monthly",
    category: "Accounting",
    isMonthly: true,
  },
  {
    key: "accounting_pro",
    name: "Accounting — Pro",
    price: 499,
    badge: null,
    icon: Calculator,
    color: "teal",
    description: "Full bookkeeping, payroll, compliance, and CFO advisory for growing companies.",
    features: ["Everything in Basic", "Payroll management", "Multi-entity support", "CFO advisory calls", "ODI compliance support"],
    duration: "Monthly",
    category: "Accounting",
    isMonthly: true,
  },
  {
    key: "odi",
    name: "ODI Registration",
    price: 499,
    badge: null,
    icon: Shield,
    color: "amber",
    description: "Register your overseas investment with the State Bank of Vietnam (ODI compliance).",
    features: ["ODI application prep", "SBV submission", "Annual reporting setup", "Profit repatriation guide", "Compliance calendar"],
    duration: "21–30 days",
    category: "Compliance",
  },
  {
    key: "certification",
    name: "Document Certification",
    price: 199,
    badge: null,
    icon: FileText,
    color: "slate",
    description: "Apostille and notarization of Vietnamese or foreign documents.",
    features: ["Apostille processing", "Notarization", "Embassy legalization", "Translation (if needed)", "Express option available"],
    duration: "5–15 days",
    category: "Certification",
  },
];

const CATEGORIES = ["All", "Company Formation", "Banking", "Accounting", "Compliance", "Certification"];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400",    badge: "bg-blue-500/20 text-blue-300" },
  gold:    { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400",   badge: "bg-amber-500/20 text-amber-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/20",    text: "text-rose-400",    badge: "bg-rose-500/20 text-rose-300" },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/20",     text: "text-sky-400",     badge: "bg-sky-500/20 text-sky-300" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-400",  badge: "bg-violet-500/20 text-violet-300" },
  teal:    { bg: "bg-teal-500/10",    border: "border-teal-500/20",    text: "text-teal-400",    badge: "bg-teal-500/20 text-teal-300" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400",   badge: "bg-amber-500/20 text-amber-300" },
  slate:   { bg: "bg-slate-500/10",   border: "border-slate-500/20",   text: "text-slate-400",   badge: "bg-slate-500/20 text-slate-300" },
};

export default function GetStartedPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <div className="border-b border-navy-800 bg-navy-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="bg-gold text-ink-950 font-black text-sm px-2.5 py-1 rounded-md tracking-widest">GLOYCE</span>
          </Link>
          <Link href={`/${locale}/auth/login`} className="text-sm text-navy-400 hover:text-foreground transition-colors">
            Sign in
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium mb-4">
            <Star size={12} />
            Global Business Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose your service
          </h1>
          <p className="text-navy-400 text-lg max-w-xl mx-auto">
            Everything you need to launch and operate internationally — from company formation to compliance.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { icon: Users, label: "Businesses served", value: "500+" },
            { icon: Globe, label: "Countries supported", value: "3" },
            { icon: Shield, label: "Compliance track record", value: "100%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Icon size={14} className="text-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{value}</div>
                <div className="text-xs text-navy-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-gold text-ink-950"
                  : "bg-navy-800 border border-navy-700 text-navy-400 hover:text-foreground hover:border-navy-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(service => {
            const colors = COLOR_MAP[service.color] || COLOR_MAP.slate;
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="relative bg-navy-800 border border-navy-700 rounded-2xl p-6 flex flex-col hover:border-navy-600 transition-all group"
              >
                {service.badge && (
                  <div className="absolute -top-2.5 left-5">
                    <span className="px-3 py-0.5 rounded-full bg-gold text-ink-950 text-xs font-bold">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">
                      ${service.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-navy-500">
                      {service.isMonthly ? "/month" : "one-time"}
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-sm text-navy-400 mb-4 leading-relaxed flex-1">{service.description}</p>

                <ul className="flex flex-col gap-1.5 mb-5">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-navy-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.text} flex-shrink-0`} style={{ background: "currentColor" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-xs text-navy-500 mb-4">
                  <span>Timeline: {service.duration}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/buy?service=${service.key}`}
                    className="flex-1 py-2.5 rounded-xl bg-gold text-ink-950 text-sm font-semibold text-center hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5"
                  >
                    Get started <ChevronRight size={14} />
                  </Link>
                  <Link
                    href={`/${locale}/contact?service=${service.key}`}
                    className="px-4 py-2.5 rounded-xl bg-navy-700 border border-navy-600 text-navy-300 text-sm font-medium hover:text-foreground hover:border-navy-500 transition-colors"
                  >
                    Ask us
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-navy-800 border border-navy-700 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Not sure which service you need?</h2>
          <p className="text-navy-400 text-sm mb-5">Book a free 30-minute consultation and we'll map out the right path for your business.</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/30 text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
          >
            Book a free consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
