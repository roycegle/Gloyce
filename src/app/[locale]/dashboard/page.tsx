"use client";

import { useTranslations, useLocale } from "next-intl";
import { MOCK_SERVICES, MOCK_ACTIVITY } from "@/data/mock/services";
import { MOCK_CONVERSATIONS } from "@/data/mock/messages";
import { MOCK_BILLING_SUMMARY } from "@/data/mock/billing";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  FileUp,
  MessageCircle,
  Receipt,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";

const ACTIVITY_ICONS = {
  file: FileUp,
  message: MessageCircle,
  check: CheckCircle2,
  billing: Receipt,
};

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DashboardOverviewPage() {
  const t = useTranslations("dashboard.overview");
  const ts = useTranslations("dashboard.services");
  const locale = useLocale();
  const totalUnread = MOCK_CONVERSATIONS.reduce((sum, c) => sum + c.unreadCount, 0);

  const STATUS_CONFIG = {
    active: { label: ts("status.active"), variant: "success" as const },
    pending: { label: ts("status.pending"), variant: "warning" as const },
    action_required: { label: ts("status.action_required"), variant: "danger" as const },
    complete: { label: ts("status.complete"), variant: "default" as const },
  };

  const STAT_CARDS = [
    { label: t("activeServices"), value: "2", icon: Briefcase, color: "text-gold", bg: "bg-gold/10 border-gold/20" },
    { label: t("pendingDocuments"), value: "1", icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: t("unreadMessages"), value: String(totalUnread), icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: t("nextBilling"), value: "Oct 1", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {t("greeting", { name: "Alex" })} 👋
        </h2>
        <p className="text-sm text-navy-400 mt-0.5">
          {t("title")}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-navy-800 rounded-xl border border-navy-700 p-4 flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${card.bg}`}>
                <Icon size={16} className={card.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-xs text-navy-400 mt-0.5 leading-tight">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Services */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">{t("yourServices")}</h3>
            <Link href="/dashboard/services" className="text-xs text-gold hover:text-gold-light flex items-center gap-1">
              {t("viewAll")} <ChevronRight size={12} />
            </Link>
          </div>

          {MOCK_SERVICES.map((service) => {
            const cfg = STATUS_CONFIG[service.status];
            const completedSteps = service.steps.filter((s) => s.status === "complete").length;
            const totalSteps = service.steps.length;
            const pct = Math.round((completedSteps / totalSteps) * 100);

            return (
              <div key={service.id} className="bg-navy-800 rounded-xl border border-navy-700 p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{service.name}</p>
                    <p className="text-xs text-navy-500 mt-0.5">
                      {formatDate(service.startDate, locale)} · {service.price}
                    </p>
                  </div>
                  <Badge variant={cfg.variant} className="shrink-0 text-xs">{cfg.label}</Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-navy-500">
                      {ts("step", { current: completedSteps, total: totalSteps })}
                    </span>
                    <span className="text-xs font-semibold text-gold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-navy-700 rounded-full">
                    <div className="h-1.5 bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {service.nextAction && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300">
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-amber-400" />
                    <span>{service.nextAction}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{t("recentActivity")}</h3>
          <div className="bg-navy-800 rounded-xl border border-navy-700 divide-y divide-navy-700">
            {MOCK_ACTIVITY.map((item) => {
              const Icon = ACTIVITY_ICONS[item.icon as keyof typeof ACTIVITY_ICONS];
              return (
                <div key={item.id} className="flex items-start gap-3 p-4">
                  <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-navy-300" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-300 leading-relaxed">{item.message}</p>
                    <p className="text-[10px] text-navy-600 mt-1">{formatDate(item.date, locale)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Billing summary */}
          <div className="bg-navy-800 rounded-xl border border-navy-700 p-4">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
              {t("nextBilling")}
            </p>
            <p className="text-xl font-bold text-foreground">{MOCK_BILLING_SUMMARY.nextCharge}</p>
            <p className="text-xs text-navy-500 mt-0.5">
              {MOCK_BILLING_SUMMARY.nextChargeDate} · {MOCK_BILLING_SUMMARY.currentPlan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
