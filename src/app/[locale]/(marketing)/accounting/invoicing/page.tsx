import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Receipt } from "lucide-react";
export default async function InvoicingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <Receipt size={12} /> {isVi ? "Hóa đơn" : "Invoicing"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Hóa đơn chuyên nghiệp</span> — thanh toán nhanh hơn</> : <><span className="text-gold-gradient">Professional invoices</span> — get paid faster</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi ? "Tạo và gửi hóa đơn bằng USD, EUR hoặc VND trong vài giây. Theo dõi trạng thái thanh toán tự động. Nhắc nhở khách hàng tự động khi quá hạn." : "Create and send invoices in USD, EUR or VND in seconds. Auto-track payment status. Automatic overdue reminders to clients."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Dùng thử miễn phí" : "Try for free"} <ArrowRight size={15} />
          </Link>
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {(isVi
              ? [["Đa tiền tệ","USD, EUR, SGD, HKD, VND — một click chuyển đổi"],["Thanh toán online","Stripe, PayPal, Wise tích hợp sẵn"],["Tự động nhắc nhở","Email tự động gửi khi hóa đơn sắp hoặc đã quá hạn"]]
              : [["Multi-currency","USD, EUR, SGD, HKD, VND — one-click conversion"],["Online payment","Stripe, PayPal, Wise built-in"],["Auto reminders","Automatic emails for upcoming and overdue invoices"]]
            ).map(([title, desc]) => (
              <div key={title} className="bg-ink-800 border border-ink-600 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-ink-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
