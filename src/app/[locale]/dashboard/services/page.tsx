"use client";

import { useTranslations, useLocale } from "next-intl";
import { MOCK_SERVICES } from "@/data/mock/services";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

const TIER_LABELS = {
  execute: "EXECUTE",
  operate: "OPERATE",
  strategize: "STRATEGIZE",
};

function formatDate(iso?: string, locale?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ServicesPage() {
  const t = useTranslations("dashboard.services");
  const locale = useLocale();

  const STATUS_CONFIG = {
    active: { label: t("status.active"), variant: "success" as const },
    pending: { label: t("status.pending"), variant: "warning" as const },
    action_required: { label: t("status.action_required"), variant: "danger" as const },
    complete: { label: t("status.complete"), variant: "default" as const },
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("noServices").replace(".", "—")} {/* reuse desc */}</p>
      </div>

      {MOCK_SERVICES.map((service) => {
        const cfg = STATUS_CONFIG[service.status];
        const completedSteps = service.steps.filter((s) => s.status === "complete").length;
        const totalSteps = service.steps.length;
        const pct = Math.round((completedSteps / totalSteps) * 100);

        return (
          <div key={service.id} className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="gold" className="text-[10px] tracking-widest">
                    {TIER_LABELS[service.tier]}
                  </Badge>
                  <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                </div>
                <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                <p className="text-xs text-navy-500 mt-0.5">
                  {formatDate(service.startDate, locale)} · {service.price}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-navy-400">
                  {t("step", { current: completedSteps, total: totalSteps })}
                </span>
                <span className="text-sm font-bold text-gold">{pct}%</span>
              </div>
              <div className="h-2 bg-navy-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2">
              {service.steps.map((step) => {
                const Icon =
                  step.status === "complete"
                    ? CheckCircle2
                    : step.status === "current"
                    ? Clock
                    : Circle;
                const iconColor =
                  step.status === "complete"
                    ? "text-emerald-400"
                    : step.status === "current"
                    ? "text-gold"
                    : "text-navy-600";
                const textColor =
                  step.status === "complete"
                    ? "text-navy-400"
                    : step.status === "current"
                    ? "text-foreground font-medium"
                    : "text-navy-600";

                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <Icon size={16} className={`shrink-0 ${iconColor}`} />
                    <span className={`text-sm ${textColor} flex-1`}>{step.label}</span>
                    {step.completedAt && (
                      <span className="text-[10px] text-navy-600 shrink-0">
                        {formatDate(step.completedAt, locale)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next action */}
            {service.nextAction && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-sm text-amber-300">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <p className="font-medium text-amber-300 mb-0.5">{t("nextAction")}</p>
                  <p className="text-xs text-amber-400/80 leading-relaxed">{service.nextAction}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
