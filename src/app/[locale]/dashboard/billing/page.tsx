import { MOCK_INVOICES, MOCK_BILLING_SUMMARY } from "@/data/mock/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, RefreshCw } from "lucide-react";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const STATUS_CONFIG = {
  paid: { label: "Đã thanh toán", variant: "success" as const },
  pending: { label: "Chờ thanh toán", variant: "warning" as const },
  overdue: { label: "Quá hạn", variant: "danger" as const },
};

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Thanh toán</h2>
        <p className="text-sm text-navy-400 mt-0.5">Quản lý gói dịch vụ và lịch sử hóa đơn.</p>
      </div>

      {/* Current plan */}
      <div className="bg-navy-800 rounded-2xl border border-gold/20 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-xs text-navy-500 uppercase tracking-wider">Gói hiện tại</p>
              <p className="text-base font-bold text-foreground mt-0.5">
                {MOCK_BILLING_SUMMARY.currentPlan}
              </p>
            </div>
          </div>
          <Badge variant="gold" className="text-xs">Đang hoạt động</Badge>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-navy-700">
          <div>
            <p className="text-xs text-navy-500">Thanh toán tiếp theo</p>
            <p className="text-xl font-bold text-foreground mt-1">{MOCK_BILLING_SUMMARY.nextCharge}</p>
            <p className="text-xs text-navy-500 mt-0.5">Ngày {MOCK_BILLING_SUMMARY.nextChargeDate}</p>
          </div>
          <div>
            <p className="text-xs text-navy-500">Tổng đã thanh toán</p>
            <p className="text-xl font-bold text-foreground mt-1">{MOCK_BILLING_SUMMARY.totalPaid}</p>
            <p className="text-xs text-navy-500 mt-0.5">Từ khi bắt đầu</p>
          </div>
        </div>
      </div>

      {/* Invoice table */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Lịch sử hóa đơn</h3>
        <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-navy-900 border-b border-navy-700 text-xs font-semibold text-navy-500 uppercase tracking-wider">
            <span className="col-span-2">Số HĐ</span>
            <span className="col-span-4">Mô tả</span>
            <span className="col-span-2">Số tiền</span>
            <span className="col-span-2">Ngày</span>
            <span className="col-span-1">Trạng thái</span>
            <span className="col-span-1"></span>
          </div>

          {MOCK_INVOICES.map((inv) => {
            const cfg = STATUS_CONFIG[inv.status];
            return (
              <div
                key={inv.id}
                className="grid grid-cols-12 gap-2 px-4 py-4 border-b border-navy-700/50 last:border-0 items-center hover:bg-navy-750 transition-colors"
              >
                <span className="col-span-2 text-xs font-mono text-navy-400">
                  {inv.invoiceNumber}
                </span>
                <span className="col-span-4 text-xs text-navy-300 leading-tight">
                  {inv.description}
                </span>
                <span className="col-span-2 text-sm font-semibold text-foreground">
                  {inv.amount}
                </span>
                <span className="col-span-2 text-xs text-navy-500">{formatDate(inv.date)}</span>
                <span className="col-span-1">
                  <Badge variant={cfg.variant} className="text-[10px] py-0">
                    {cfg.label}
                  </Badge>
                </span>
                <span className="col-span-1 flex justify-end">
                  <button className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                    <Download size={13} />
                  </button>
                </span>
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
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Cần thay đổi gói dịch vụ?</p>
          <p className="text-xs text-navy-500 mt-0.5">Liên hệ đội ngũ Gloyce để được tư vấn nâng cấp hoặc điều chỉnh.</p>
        </div>
        <Button variant="secondary" size="sm">Liên hệ</Button>
      </div>
    </div>
  );
}
