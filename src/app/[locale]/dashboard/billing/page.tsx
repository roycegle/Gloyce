"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, RefreshCw, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  due_date?: string;
  paid_at?: string;
  created_at: string;
  service_request_id?: string;
  services?: { name: string; type: string };
  service_requests?: { id: string; service_type: string };
}

function formatDate(iso?: string, locale?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function BillingPage() {
  const t = useTranslations("dashboard.billing");
  const locale = useLocale();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<string | null>(null);

  const loadInvoices = () => fetch("/api/dashboard/invoices")
    .then(r => r.json())
    .then(d => { setInvoices(Array.isArray(d) ? d : []); setLoading(false); })
    .catch(() => setLoading(false));

  useEffect(() => { loadInvoices(); }, []);

  const pay = async (invoiceId: string) => {
    setPaying(invoiceId);
    const res = await fetch(`/api/dashboard/invoices/${invoiceId}`, { method: "PATCH" });
    setPaying(null);
    if (res.ok) {
      toast.success("Đã xác nhận thanh toán. Gloyce sẽ bắt đầu xử lý yêu cầu của bạn.");
      loadInvoices();
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const STATUS_CONFIG: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    paid: { label: "Đã thanh toán", variant: "success" },
    pending: { label: "Chờ thanh toán", variant: "warning" },
    overdue: { label: "Quá hạn", variant: "danger" },
    cancelled: { label: "Đã hủy", variant: "default" },
  };

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">Your invoices and payment history.</p>
      </div>

      {/* Summary */}
      <div className="bg-navy-800 rounded-2xl border border-gold/20 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="text-xs text-navy-500 uppercase tracking-wider">Billing Summary</p>
            <p className="text-base font-bold text-foreground mt-0.5">Gloyce Services</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-navy-700">
          <div>
            <p className="text-xs text-navy-500">Total Paid</p>
            <p className="text-xl font-bold text-foreground mt-1">${totalPaid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-navy-500">Outstanding</p>
            <p className="text-xl font-bold text-amber-400 mt-1">${totalPending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("invoices")}</h3>
        <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
          {loading ? (
            <div className="px-4 py-10 text-center text-sm text-navy-500">Loading...</div>
          ) : invoices.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-navy-500">{t("noInvoices")}</div>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-navy-900 border-b border-navy-700 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                <span className="col-span-4">Mô tả</span>
                <span className="col-span-2">Số tiền</span>
                <span className="col-span-2">Ngày</span>
                <span className="col-span-2">Trạng thái</span>
                <span className="col-span-2"></span>
              </div>
              {invoices.map((inv) => {
                const cfg = STATUS_CONFIG[inv.status] || { label: inv.status, variant: "default" as const };
                const isPending = inv.status === "pending";
                const isPayingThis = paying === inv.id;
                const label = inv.description || inv.service_requests?.service_type?.replace(/_/g, " ") || inv.services?.name || "Invoice";
                return (
                  <div key={inv.id} className={`border-b border-navy-700/50 last:border-0 ${isPending ? "bg-amber-500/3" : ""}`}>
                    {/* Mobile */}
                    <div className="sm:hidden px-4 py-4 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-navy-300 leading-tight capitalize">{label}</p>
                          {inv.services && <p className="text-[10px] text-navy-500 mt-0.5">{inv.services.type.toUpperCase()}</p>}
                        </div>
                        <Badge variant={cfg.variant} className="text-[10px] py-0 shrink-0">{cfg.label}</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-base font-bold text-foreground">{inv.amount.toLocaleString()} {inv.currency}</p>
                          <p className="text-xs text-navy-500">{inv.due_date ? formatDate(inv.due_date, locale) : inv.paid_at ? `Paid ${formatDate(inv.paid_at, locale)}` : "—"}</p>
                        </div>
                        {isPending && (
                          <button
                            onClick={() => pay(inv.id)}
                            disabled={isPayingThis}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs font-semibold hover:bg-gold/20 transition-colors disabled:opacity-50"
                          >
                            {isPayingThis ? "..." : <><CheckCircle size={13} /> Thanh toán</>}
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-4 items-center">
                      <div className="col-span-4">
                        <p className="text-xs text-navy-300 capitalize">{label}</p>
                        {inv.services && <p className="text-[10px] text-navy-500 mt-0.5">{inv.services.type.toUpperCase()}</p>}
                      </div>
                      <span className="col-span-2 text-sm font-semibold text-foreground">{inv.amount.toLocaleString()} {inv.currency}</span>
                      <span className="col-span-2 text-xs text-navy-500">{inv.due_date ? formatDate(inv.due_date, locale) : inv.paid_at ? formatDate(inv.paid_at, locale) : "—"}</span>
                      <span className="col-span-2"><Badge variant={cfg.variant} className="text-[10px] py-0">{cfg.label}</Badge></span>
                      <span className="col-span-2 flex justify-end">
                        {isPending && (
                          <button
                            onClick={() => pay(inv.id)}
                            disabled={isPayingThis}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-semibold hover:bg-gold/20 transition-colors disabled:opacity-50"
                          >
                            {isPayingThis ? "..." : <><CheckCircle size={12} /> Thanh toán</>}
                          </button>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-navy-800 border border-navy-700 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
          <RefreshCw size={15} className="text-navy-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Questions about your invoice?</p>
          <p className="text-xs text-navy-500 mt-0.5">Contact the Gloyce team for assistance.</p>
        </div>
        <Link href="/contact"><Button variant="secondary" size="sm">Contact</Button></Link>
      </div>
    </div>
  );
}
