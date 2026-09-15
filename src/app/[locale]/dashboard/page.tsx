"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import {
  Building2, CreditCard, ChevronRight,
  CheckCircle2, Clock, AlertCircle, MapPin,
} from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string; type: string; name: string; company_name?: string;
  status: string; current_step: number; total_steps: number;
  notes?: string; created_at: string;
}
interface Invoice {
  id: string; amount: number; currency: string; status: string;
  description?: string; due_date?: string;
}

const TYPE_INFO: Record<string, { label: string; country: string; flag: string }> = {
  us_llc_standard: { label: "US LLC",              country: "United States", flag: "🇺🇸" },
  us_llc_premium:  { label: "US LLC",              country: "United States", flag: "🇺🇸" },
  us_llc:          { label: "US LLC",              country: "United States", flag: "🇺🇸" },
  singapore:       { label: "Singapore Pte. Ltd.", country: "Singapore",     flag: "🇸🇬" },
  hong_kong:       { label: "Hong Kong Limited",   country: "Hong Kong",     flag: "🇭🇰" },
  us_bank:         { label: "US Bank Account",     country: "United States", flag: "🇺🇸" },
  payment_gateway: { label: "Payment Gateway",     country: "",              flag: "🌐" },
  accounting_basic:{ label: "Accounting — Basic",  country: "",              flag: "📊" },
  accounting_pro:  { label: "Accounting — Pro",    country: "",              flag: "📊" },
  odi:             { label: "ODI Registration",    country: "Vietnam",       flag: "🇻🇳" },
  certification:   { label: "Document Cert.",      country: "",              flag: "📋" },
};
function typeInfo(type: string) {
  return TYPE_INFO[type] ?? { label: type.replace(/_/g, " "), country: "", flag: "🏢" };
}
function displayName(svc: Pick<Service, "company_name" | "name">) {
  return svc.company_name || svc.name;
}
function fmt(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DashboardOverviewPage() {
  const t  = useTranslations("dashboard.overview");
  const ts = useTranslations("dashboard.services");
  const locale = useLocale();
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "";

  const [services, setServices]   = useState<Service[]>([]);
  const [invoices, setInvoices]   = useState<Invoice[]>([]);
  const [loading,  setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/services").then(r => r.json()),
      fetch("/api/dashboard/invoices").then(r => r.json()),
    ]).then(([s, i]) => {
      setServices(Array.isArray(s) ? s : []);
      setInvoices(Array.isArray(i) ? i : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const STATUS_CFG: Record<string, { label: string; variant: "success"|"warning"|"danger"|"default"; icon: typeof CheckCircle2 }> = {
    active:          { label: ts("status.active"),          variant: "success",  icon: CheckCircle2 },
    pending:         { label: ts("status.pending"),         variant: "warning",  icon: Clock        },
    action_required: { label: ts("status.action_required"), variant: "danger",   icon: AlertCircle  },
    complete:        { label: ts("status.complete"),        variant: "success",  icon: CheckCircle2 },
    completed:       { label: ts("status.complete"),        variant: "success",  icon: CheckCircle2 },
  };

  const active   = services.filter(s => s.status === "active" || s.status === "pending").length;
  const complete = services.filter(s => s.status === "complete" || s.status === "completed").length;
  const pending  = invoices.filter(i => i.status === "pending");
  const totalOwed = pending.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">

      {/* ── Greeting ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {firstName ? t("greeting", { name: firstName }) : t("greetingGeneric")}
          </h2>
          <p className="text-sm text-navy-400 mt-0.5">{t("title")}</p>
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          {
            label: t("activeServices"),
            value: loading ? "—" : String(active),
            sub: t("companiesInProgress"),
            icon: Building2,
            color: "text-gold",
            ring: "border-gold/20 bg-gold/5",
          },
          {
            label: t("companiesActive"),
            value: loading ? "—" : String(complete),
            sub: t("registeredAndOperating"),
            icon: CheckCircle2,
            color: "text-emerald-400",
            ring: "border-emerald-500/20 bg-emerald-500/5",
          },
          {
            label: t("nextBilling"),
            value: loading ? "—" : (totalOwed > 0 ? `$${totalOwed.toLocaleString()}` : "—"),
            sub: pending.length > 0 ? `${pending.length} invoice${pending.length > 1 ? "s" : ""}` : t("noPendingInvoices"),
            icon: CreditCard,
            color: pending.length > 0 ? "text-amber-400" : "text-navy-500",
            ring: pending.length > 0 ? "border-amber-500/20 bg-amber-500/5" : "border-navy-700 bg-navy-800",
          },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label}
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col gap-4 ${card.ring}`}>
              <div className={`w-8 h-8 rounded-lg bg-navy-800/60 border border-navy-700/60 flex items-center justify-center`}>
                <Icon size={15} className={card.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground tabular-nums">{card.value}</p>
                <p className="text-xs font-medium text-navy-400 mt-0.5 leading-tight">{card.label}</p>
                <p className="text-[10px] text-navy-600 mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">

        {/* ── Companies list ── */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-widest">{t("yourServices")}</h3>
            <Link href="/dashboard/services"
              className="text-xs text-gold hover:text-gold-light flex items-center gap-1 font-medium">
              {t("viewAll")} <ChevronRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="bg-navy-800/60 rounded-2xl border border-navy-700 h-32 animate-pulse" />
          ) : services.length === 0 ? (
            <div className="bg-navy-800 rounded-2xl border border-navy-700 p-10 text-center">
              <p className="text-sm text-navy-500">{t("noServices")}</p>
              <Link href="/get-started" className="mt-3 inline-flex text-xs text-gold hover:text-gold-light">
                {ts("browseServices")} →
              </Link>
            </div>
          ) : (
            <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
              {services.slice(0, 4).map((svc, i) => {
                const cfg  = STATUS_CFG[svc.status] || { label: svc.status, variant: "default" as const, icon: Clock };
                const pct  = svc.total_steps > 0 ? Math.round((svc.current_step / svc.total_steps) * 100) : 0;
                const done = svc.status === "complete" || svc.status === "completed";
                const info = typeInfo(svc.type);
                const Icon = cfg.icon;

                return (
                  <Link
                    key={svc.id}
                    href={`/dashboard/companies/${svc.id}` as Parameters<typeof Link>[0]["href"]}
                    className={`flex items-center gap-4 px-4 py-3.5 hover:bg-navy-700/40 transition-colors group ${i > 0 ? "border-t border-navy-700/60" : ""}`}
                  >
                    {/* flag */}
                    <div className="text-lg shrink-0 w-8 text-center">{info.flag}</div>

                    {/* name + meta */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{displayName(svc)}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-navy-500">{info.label}</span>
                        {info.country && (
                          <>
                            <span className="text-navy-700">·</span>
                            <span className="text-[11px] text-navy-500 flex items-center gap-1">
                              <MapPin size={9} />{info.country}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* right: progress or complete + chevron */}
                    <div className="flex items-center gap-3 shrink-0">
                      {done ? (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Icon size={13} />
                          <span className="text-xs font-medium hidden sm:block">{cfg.label}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-navy-700 rounded-full hidden sm:block">
                            <div className="h-1.5 bg-gold rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gold">{pct}%</span>
                        </div>
                      )}
                      <ChevronRight size={14} className="text-navy-600 group-hover:text-navy-400 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Billing ── */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-widest">{t("nextBilling")}</h3>
            <Link href="/dashboard/billing"
              className="text-xs text-gold hover:text-gold-light flex items-center gap-1 font-medium">
              {t("viewAllInvoices")} <ChevronRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="bg-navy-800/60 rounded-2xl border border-navy-700 h-32 animate-pulse" />
          ) : pending.length === 0 ? (
            <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 flex flex-col items-center gap-2 text-center">
              <CheckCircle2 size={22} className="text-emerald-400" />
              <p className="text-sm text-navy-400">{t("noPendingInvoices")}</p>
            </div>
          ) : (
            <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
              {pending.slice(0, 4).map((inv, i) => (
                <div key={inv.id}
                  className={`flex items-center justify-between px-4 py-3.5 gap-4 ${i > 0 ? "border-t border-navy-700/60" : ""}`}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      ${inv.amount.toLocaleString()} <span className="text-navy-500 font-normal text-xs">{inv.currency}</span>
                    </p>
                    {inv.due_date && (
                      <p className="text-[11px] text-navy-500 mt-0.5">
                        {t("dueOn")} {fmt(inv.due_date, locale)}
                      </p>
                    )}
                  </div>
                  <Badge variant="warning" className="text-[10px] shrink-0">
                    {ts("formStatus.pending")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
