"use client";

import { useTranslations, useLocale } from "next-intl";
import { MOCK_INVOICES, MOCK_BILLING_SUMMARY } from "@/data/mock/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, RefreshCw } from "lucide-react";

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function BillingPage() {
  const t = useTranslations("dashboard.billing");
  const locale = useLocale();

  const STATUS_CONFIG = {
    paid: { label: t("status.paid"), variant: "success" as const },
    pending: { label: t("status.pending"), variant: "warning" as const },
    overdue: { label: t("status.overdue"), variant: "danger" as const },
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("noInvoices")}</p>
      </div>

      {/* Current plan */}
      <div className="bg-navy-800 rounded-2xl border border-gold/20 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-xs text-navy-500 uppercase tracking-wider">{t("currentPlan")}</p>
              <p className="text-base font-bold text-foreground mt-0.5">{MOCK_BILLING_SUMMARY.currentPlan}</p>
            </div>
          </div>
          <Badge variant="gold" className="text-xs">Active</Badge>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-navy-700">
          <div>
            <p className="text-xs text-navy-500">{t("nextCharge")}</p>
            <p className="text-xl font-bold text-foreground mt-1">{MOCK_BILLING_SUMMARY.nextCharge}</p>
            <p className="text-xs text-navy-500 mt-0.5">{MOCK_BILLING_SUMMARY.nextChargeDate}</p>
          </div>
          <div>
            <p className="text-xs text-navy-500">Total paid</p>
            <p className="text-xl font-bold text-foreground mt-1">{MOCK_BILLING_SUMMARY.totalPaid}</p>
            <p className="text-xs text-navy-500 mt-0.5">Since start</p>
          </div>
        </div>
      </div>

      {/* Invoice table — responsive */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("invoices")}</h3>
        <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
          {/* Desktop header — hidden on mobile */}
          <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-navy-900 border-b border-navy-700 text-xs font-semibold text-navy-500 uppercase tracking-wider">
            <span className="col-span-2">Invoice</span>
            <span className="col-span-4">Description</span>
            <span className="col-span-2">Amount</span>
            <span className="col-span-2">Date</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-1"></span>
          </div>

          {MOCK_INVOICES.map((inv) => {
            const cfg = STATUS_CONFIG[inv.status];
            return (
              <div key={inv.id} className="border-b border-navy-700/50 last:border-0">
                {/* Mobile card layout */}
                <div className="sm:hidden px-4 py-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-navy-400">{inv.invoiceNumber}</p>
                      <p className="text-xs text-navy-300 leading-tight mt-0.5">{inv.description}</p>
                    </div>
                    <Badge variant={cfg.variant} className="text-[10px] py-0 shrink-0">{cfg.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-foreground">{inv.amount}</p>
                      <p className="text-xs text-navy-500">{formatDate(inv.date, locale)}</p>
                    </div>
                    <button className="p-2 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>

                {/* Desktop row layout */}
                <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-navy-750 transition-colors">
                  <span className="col-span-2 text-xs font-mono text-navy-400">{inv.invoiceNumber}</span>
                  <span className="col-span-4 text-xs text-navy-300 leading-tight">{inv.description}</span>
                  <span className="col-span-2 text-sm font-semibold text-foreground">{inv.amount}</span>
                  <span className="col-span-2 text-xs text-navy-500">{formatDate(inv.date, locale)}</span>
                  <span className="col-span-1">
                    <Badge variant={cfg.variant} className="text-[10px] py-0">{cfg.label}</Badge>
                  </span>
                  <span className="col-span-1 flex justify-end">
                    <button className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                      <Download size={13} />
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade notice */}
      <div className="p-4 rounded-xl bg-navy-800 border border-navy-700 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
          <RefreshCw size={15} className="text-navy-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Need to change your plan?</p>
          <p className="text-xs text-navy-500 mt-0.5">Contact the Gloyce team for upgrade or adjustment advice.</p>
        </div>
        <Button variant="secondary" size="sm">Contact</Button>
      </div>
    </div>
  );
}
