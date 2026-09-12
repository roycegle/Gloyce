"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Briefcase } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  type: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  price?: number;
  currency?: string;
  notes?: string;
  created_at: string;
}

function formatDate(iso?: string, locale?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ServicesPage() {
  const t = useTranslations("dashboard.services");
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/services")
      .then(r => r.json())
      .then(d => { setServices(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const STATUS_CONFIG: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    active: { label: t("status.active"), variant: "success" },
    pending: { label: t("status.pending"), variant: "warning" },
    action_required: { label: t("status.action_required"), variant: "danger" },
    completed: { label: t("status.complete"), variant: "default" },
    complete: { label: t("status.complete"), variant: "default" },
  };

  if (loading) return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center text-navy-400 text-sm">Loading...</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>

      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Briefcase size={24} className="text-gold" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground mb-1">{t("noServicesTitle")}</p>
            <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">{t("noServices")}</p>
          </div>
          <Link href="/contact" className="mt-2 px-5 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors">
            {t("contactUs")}
          </Link>
        </div>
      ) : (
        services.map((service) => {
          const cfg = STATUS_CONFIG[service.status] || { label: service.status, variant: "default" as const };
          const pct = service.total_steps > 0 ? Math.round((service.current_step / service.total_steps) * 100) : 0;
          const steps = Array.from({ length: service.total_steps }, (_, i) => i + 1);

          return (
            <div key={service.id} className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="gold" className="text-[10px] tracking-widest">{service.type.toUpperCase()}</Badge>
                    <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {formatDate(service.created_at, locale)}
                    {service.price && ` · $${service.price.toLocaleString()} ${service.currency || "USD"}`}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-navy-400">{t("step", { current: service.current_step, total: service.total_steps })}</span>
                  <span className="text-sm font-bold text-gold">{pct}%</span>
                </div>
                <div className="h-2 bg-navy-700 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {steps.map((stepNum) => {
                  const done = stepNum < service.current_step;
                  const current = stepNum === service.current_step;
                  const Icon = done ? CheckCircle2 : current ? Clock : Circle;
                  return (
                    <div key={stepNum} className="flex items-center gap-3">
                      <Icon size={16} className={`shrink-0 ${done ? "text-emerald-400" : current ? "text-gold" : "text-navy-600"}`} />
                      <span className={`text-sm flex-1 ${done ? "text-navy-400" : current ? "text-foreground font-medium" : "text-navy-600"}`}>
                        Step {stepNum}
                      </span>
                    </div>
                  );
                })}
              </div>

              {service.notes && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400/80 leading-relaxed">
                  {service.notes}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
