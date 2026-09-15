"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase, ChevronRight, CheckCircle2, Building2, MapPin,
  Calendar, ExternalLink,
} from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  type: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  notes?: string;
  created_at: string;
}

/* ── mapping loại hình + quốc gia ── */
const TYPE_INFO: Record<string, { label: string; country: string; flag: string }> = {
  us_llc_standard: { label: "US LLC",               country: "United States", flag: "🇺🇸" },
  us_llc_premium:  { label: "US LLC",               country: "United States", flag: "🇺🇸" },
  us_llc:          { label: "US LLC",               country: "United States", flag: "🇺🇸" },
  singapore:       { label: "Singapore Pte. Ltd.",  country: "Singapore",     flag: "🇸🇬" },
  hong_kong:       { label: "Hong Kong Limited",    country: "Hong Kong",     flag: "🇭🇰" },
  us_bank:         { label: "US Bank Account",      country: "United States", flag: "🇺🇸" },
  payment_gateway: { label: "Payment Gateway",      country: "Global",        flag: "🌐" },
  accounting_basic:{ label: "Accounting — Basic",   country: "",              flag: "📊" },
  accounting_pro:  { label: "Accounting — Pro",     country: "",              flag: "📊" },
  odi:             { label: "ODI Registration",     country: "Vietnam",       flag: "🇻🇳" },
  certification:   { label: "Document Cert.",       country: "",              flag: "📋" },
};

function fmt(iso?: string, locale?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

function typeInfo(type: string) {
  return TYPE_INFO[type] ?? { label: type.replace(/_/g, " "), country: "", flag: "🏢" };
}

export default function ServicesPage() {
  const t = useTranslations("dashboard.services");
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/services")
      .then(r => r.json())
      .then(s => { setServices(Array.isArray(s) ? s : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const complete   = services.filter(s => s.status === "complete" || s.status === "completed");
  const inProgress = services.filter(s => s.status !== "complete" && s.status !== "completed");

  const STATUS_CONFIG: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    active:          { label: t("status.active"),          variant: "success"  },
    pending:         { label: t("status.pending"),         variant: "warning"  },
    action_required: { label: t("status.action_required"), variant: "danger"   },
    completed:       { label: t("status.complete"),        variant: "default"  },
    complete:        { label: t("status.complete"),        variant: "default"  },
  };

  if (loading) return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center text-navy-400 text-sm">
        Loading...
      </div>
    </div>
  );

  if (services.length === 0) return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
      <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
        <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
          <Briefcase size={24} className="text-gold" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground mb-1">{t("noServicesTitle")}</p>
          <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">{t("noServices")}</p>
        </div>
        <Link href="/get-started"
          className="mt-2 px-5 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors">
          {t("browseServices")}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>

      {/* ── Công ty đang hoạt động ── */}
      {complete.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Công ty đang hoạt động
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {complete.map(svc => {
              const info = typeInfo(svc.type);
              return (
                <div key={svc.id}
                  className="bg-navy-800 rounded-2xl border border-emerald-500/20 p-5 sm:p-6 flex items-center justify-between gap-4 hover:border-emerald-500/35 transition-colors">
                  {/* Left: icon + tên công ty + meta */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-xl">
                      {info.flag}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-foreground truncate">{svc.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] text-navy-400">{info.label}</span>
                        {info.country && (
                          <>
                            <span className="text-navy-600">·</span>
                            <span className="text-[11px] text-navy-400 flex items-center gap-1">
                              <MapPin size={10} className="text-navy-500" />{info.country}
                            </span>
                          </>
                        )}
                        <span className="text-navy-600">·</span>
                        <span className="text-[11px] text-navy-400 flex items-center gap-1">
                          <Calendar size={10} className="text-navy-500" />{fmt(svc.created_at, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: action */}
                  <Link
                    href={`/dashboard/companies/${svc.id}` as Parameters<typeof Link>[0]["href"]}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors whitespace-nowrap"
                  >
                    <ExternalLink size={12} />
                    Quản trị
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Đang xử lý ── */}
      {inProgress.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold text-gold/80 uppercase tracking-widest">
              Đang xử lý
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {inProgress.map(svc => {
              const cfg = STATUS_CONFIG[svc.status] || { label: svc.status, variant: "default" as const };
              const pct = svc.total_steps > 0 ? Math.round((svc.current_step / svc.total_steps) * 100) : 0;
              const info = typeInfo(svc.type);
              return (
                <div key={svc.id} className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: icon + tên công ty + meta */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 text-xl">
                        {info.flag}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-foreground truncate">{svc.name}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[11px] text-navy-400">{info.label}</span>
                          {info.country && (
                            <>
                              <span className="text-navy-600">·</span>
                              <span className="text-[11px] text-navy-400 flex items-center gap-1">
                                <MapPin size={10} className="text-navy-500" />{info.country}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={cfg.variant} className="text-xs px-2.5 py-1">{cfg.label}</Badge>
                      <Link
                        href={`/dashboard/companies/${svc.id}` as Parameters<typeof Link>[0]["href"]}
                        className="flex items-center gap-1 text-xs text-navy-400 hover:text-gold transition-colors"
                      >
                        Chi tiết <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Progress */}
                  {svc.total_steps > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 flex-1">
                        {Array.from({ length: svc.total_steps }, (_, i) => {
                          const done   = i + 1 < svc.current_step;
                          const active = i + 1 === svc.current_step;
                          return (
                            <div key={i}
                              className={`rounded-full h-1.5 transition-all ${done ? "bg-emerald-400" : active ? "bg-gold" : "bg-navy-600"}`}
                              style={{ width: `${100 / svc.total_steps}%`, maxWidth: 40, minWidth: 8 }}
                            />
                          );
                        })}
                      </div>
                      <span className="text-xs font-semibold text-gold shrink-0">{pct}%</span>
                    </div>
                  )}

                  {svc.notes && (
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400/80 leading-relaxed">
                      {svc.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
