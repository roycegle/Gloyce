"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  notes?: string;
  created_at: string;
  price?: number;
  currency?: string;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  due_date?: string;
}

interface Message {
  id: string;
  read: boolean;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DashboardOverviewPage() {
  const t = useTranslations("dashboard.overview");
  const ts = useTranslations("dashboard.services");
  const locale = useLocale();
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "";

  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/services").then(r => r.json()).then(d => setServices(Array.isArray(d) ? d : []));
    fetch("/api/dashboard/messages").then(r => r.json()).then(d => setMessages(Array.isArray(d) ? d : []));
    fetch("/api/dashboard/invoices").then(r => r.json()).then(d => setInvoices(Array.isArray(d) ? d : []));
  }, []);

  const STATUS_CONFIG = {
    active: { label: ts("status.active"), variant: "success" as const },
    pending: { label: ts("status.pending"), variant: "warning" as const },
    action_required: { label: ts("status.action_required"), variant: "danger" as const },
    complete: { label: ts("status.complete"), variant: "default" as const },
    completed: { label: ts("status.complete"), variant: "default" as const },
  };

  const unreadCount = messages.filter(m => !m.read).length;
  const pendingInvoices = invoices.filter(i => i.status === "pending");
  const nextDue = pendingInvoices.sort((a, b) => new Date(a.due_date || "").getTime() - new Date(b.due_date || "").getTime())[0];
  const activeServices = services.filter(s => s.status === "active" || s.status === "pending").length;

  const STAT_CARDS = [
    { label: t("activeServices"), value: String(activeServices), icon: Briefcase, color: "text-gold", bg: "bg-gold/10 border-gold/20" },
    { label: t("pendingDocuments"), value: "—", icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: t("unreadMessages"), value: String(unreadCount), icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    {
      label: t("nextBilling"),
      value: nextDue ? `$${nextDue.amount.toLocaleString()}` : "—",
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {userName ? t("greeting", { name: userName }) : t("greetingGeneric")} 👋
        </h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("title")}</p>
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

          {services.length === 0 ? (
            <div className="bg-navy-800 rounded-xl border border-navy-700 p-8 text-center text-sm text-navy-500">
              No active services yet.{" "}
              <Link href="/contact" className="text-gold hover:underline">Contact us</Link> to get started.
            </div>
          ) : (
            services.slice(0, 3).map((service) => {
              const cfg = STATUS_CONFIG[service.status as keyof typeof STATUS_CONFIG] || { label: service.status, variant: "default" as const };
              const pct = service.total_steps > 0 ? Math.round((service.current_step / service.total_steps) * 100) : 0;

              return (
                <div key={service.id} className="bg-navy-800 rounded-xl border border-navy-700 p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{service.name}</p>
                      <p className="text-xs text-navy-500 mt-0.5">
                        {formatDate(service.created_at, locale)}
                        {service.price ? ` · $${service.price.toLocaleString()} ${service.currency || "USD"}` : ""}
                      </p>
                    </div>
                    <Badge variant={cfg.variant} className="shrink-0 text-xs">{cfg.label}</Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-navy-500">
                        {ts("step", { current: service.current_step, total: service.total_steps })}
                      </span>
                      <span className="text-xs font-semibold text-gold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700 rounded-full">
                      <div className="h-1.5 bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {service.notes && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 text-xs text-amber-300">
                      <AlertCircle size={14} className="shrink-0 mt-0.5 text-amber-400" />
                      <span>{service.notes}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Billing summary */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{t("nextBilling")}</h3>

          {pendingInvoices.length === 0 ? (
            <div className="bg-navy-800 rounded-xl border border-navy-700 p-6 text-center text-sm text-navy-500">
              No pending invoices.
            </div>
          ) : (
            <div className="bg-navy-800 rounded-xl border border-navy-700 divide-y divide-navy-700">
              {pendingInvoices.slice(0, 4).map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-4 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">${inv.amount.toLocaleString()} {inv.currency}</p>
                    {inv.due_date && <p className="text-xs text-navy-500 mt-0.5">Due {formatDate(inv.due_date, locale)}</p>}
                  </div>
                  <Badge variant="warning" className="text-xs">Pending</Badge>
                </div>
              ))}
            </div>
          )}

          <Link href="/dashboard/billing" className="text-xs text-gold hover:text-gold-light flex items-center gap-1 self-end">
            View all invoices <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
