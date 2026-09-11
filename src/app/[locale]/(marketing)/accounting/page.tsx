import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, BarChart3, BookOpen, Receipt, Zap, FileText } from "lucide-react";

export default async function AccountingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const services = [
    { icon: Zap, title: isVi ? "Kế toán cho Seller TMĐT" : "Ecommerce accounting", desc: isVi ? "Tích hợp Amazon, Shopee, TikTok Shop. Tự động đồng bộ giao dịch." : "Amazon, Shopee, TikTok Shop integration. Auto-sync transactions.", href: "/accounting/ecommerce" },
    { icon: BookOpen, title: isVi ? "Sổ sách kế toán" : "Bookkeeping", desc: isVi ? "Ghi chép đầy đủ hàng tháng, phân loại chi phí, đối chiếu ngân hàng." : "Full monthly recording, expense categorization, bank reconciliation.", href: "/accounting/bookkeeping" },
    { icon: Receipt, title: isVi ? "Hóa đơn" : "Invoicing", desc: isVi ? "Tạo và gửi hóa đơn chuyên nghiệp, theo dõi thanh toán tự động." : "Create and send professional invoices, auto-track payments.", href: "/accounting/invoicing" },
    { icon: BarChart3, title: isVi ? "Báo cáo tài chính" : "Financial reporting", desc: isVi ? "P&L, Balance Sheet, Cash Flow — báo cáo chuẩn mực quốc tế hàng tháng." : "P&L, Balance Sheet, Cash Flow — monthly international-standard reports.", href: "/accounting/reporting" },
    { icon: FileText, title: isVi ? "Kết nối ngân hàng" : "Bank integration", desc: isVi ? "Kết nối tự động Mercury, Wise, Airwallex — không nhập tay." : "Auto-connect Mercury, Wise, Airwallex — no manual entry.", href: "/accounting/bank-integration" },
  ];

  const plans = isVi
    ? [
        { name: "Starter", price: "3.000.000đ", period: "/tháng", desc: "Cho công ty mới thành lập, doanh thu dưới $50K/năm", features: ["Sổ sách hàng tháng", "Báo cáo P&L", "Kết nối 1 tài khoản ngân hàng", "Hỗ trợ email"] },
        { name: "Growth", price: "6.000.000đ", period: "/tháng", desc: "Cho doanh nghiệp đang tăng trưởng, doanh thu $50K–$500K/năm", features: ["Tất cả Starter", "Kết nối không giới hạn tài khoản", "Báo cáo hàng tuần", "Khai báo thuế quý", "Hỗ trợ ưu tiên (chat + call)"], featured: true },
        { name: "Scale", price: "12.000.000đ", period: "/tháng", desc: "Cho doanh nghiệp lớn, nhiều thực thể pháp lý", features: ["Tất cả Growth", "Kế toán trưởng riêng", "Đa thực thể (multi-entity)", "Lập kế hoạch thuế chủ động", "CFO thuê ngoài (2h/tháng)"] },
      ]
    : [
        { name: "Starter", price: "$149", period: "/mo", desc: "New companies with under $50K annual revenue", features: ["Monthly bookkeeping", "P&L report", "1 bank account connection", "Email support"] },
        { name: "Growth", price: "$299", period: "/mo", desc: "Growing businesses with $50K–$500K annual revenue", features: ["Everything in Starter", "Unlimited bank connections", "Weekly reports", "Quarterly tax filings", "Priority support (chat + call)"], featured: true },
        { name: "Scale", price: "$599", period: "/mo", desc: "Large businesses with multiple legal entities", features: ["Everything in Growth", "Dedicated senior accountant", "Multi-entity support", "Proactive tax planning", "Fractional CFO (2h/mo)"] },
      ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              {isVi ? "Kế toán & Thuế" : "Accounting & Tax"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi
                ? <>{isVi ? "Kế toán chuyên gia" : "Expert accounting"} <span className="text-gold-gradient">{isVi ? "cho doanh nghiệp toàn cầu" : "for global businesses"}</span></>
                : <><span className="text-gold-gradient">Expert accounting</span> for global businesses</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed">
              {isVi
                ? "Đội ngũ kế toán của Gloyce am hiểu luật thuế Mỹ (liên bang và tiểu bang), với kinh nghiệm chuyên sâu phục vụ doanh nghiệp chủ sở hữu Việt Nam — giúp bạn nộp đúng thuế, không bỏ lỡ deadline và tối ưu chi phí trong khuôn khổ pháp luật."
                : "Gloyce's accounting team specializes in US federal and state tax law, with deep expertise serving Vietnamese-owned businesses — helping you file correctly, never miss a deadline, and optimize costs within legal boundaries."}
            </p>
          </div>

          {/* Service list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} href={s.href} className="group bg-ink-800 border border-ink-600 rounded-xl p-5 hover:border-gold/40 transition-all">
                  <Icon className="w-5 h-5 text-gold mb-3" />
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-sm text-ink-300">{s.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* Pricing plans */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{isVi ? "BẢNG GIÁ" : "PRICING"}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">{isVi ? "Chọn gói phù hợp với bạn" : "Choose the right plan for you"}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative bg-ink-800 rounded-2xl p-7 border ${plan.featured ? "border-gold/30 shadow-[0_0_40px_rgba(201,150,12,0.10)]" : "border-ink-600"}`}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-ink-900 bg-gold px-3 py-1 rounded-full">
                    {isVi ? "Phổ biến nhất" : "Most popular"}
                  </span>
                )}
                <h3 className="font-bold text-foreground text-lg mb-1">{plan.name}</h3>
                <p className="text-xs text-ink-400 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  <span className="text-sm text-ink-400">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-200">
                      <Check size={13} className="text-gold mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.featured ? "bg-gold text-ink-900 hover:bg-gold-light" : "border border-ink-500 text-foreground hover:bg-ink-700"}`}>
                  {isVi ? "Bắt đầu" : "Get started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
