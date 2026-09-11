import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, ShoppingBag, Zap, BarChart3 } from "lucide-react";

export default async function EcommerceAccountingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              <ShoppingBag size={12} /> {isVi ? "Kế toán cho Seller TMĐT" : "Ecommerce Accounting"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi
                ? <>{isVi ? "Kế toán" : "Accounting"} <span className="text-gold-gradient">{isVi ? "được thiết kế cho Seller" : "designed for Sellers"}</span></>
                : <><span className="text-gold-gradient">Accounting designed</span> for Sellers</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {isVi
                ? "Tích hợp trực tiếp với Amazon, Shopee, TikTok Shop. Tự động đồng bộ doanh thu, phí hoa hồng, phí FBA, hoàn trả — không cần nhập tay."
                : "Direct integration with Amazon, Shopee, TikTok Shop. Auto-sync revenue, commissions, FBA fees, refunds — no manual entry required."}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
                {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="space-y-2">
              {(isVi
                ? ["Tích hợp Amazon Seller Central","Tích hợp Shopee & TikTok Shop","Tự động phân loại FBA/FBM fees","Theo dõi inventory & COGS","Báo cáo lợi nhuận theo SKU","Đối chiếu payouts hàng tuần","Hỗ trợ khai thuế Mỹ (Form 5472, 1065)"]
                : ["Amazon Seller Central integration","Shopee & TikTok Shop integration","Auto-categorize FBA/FBM fees","Inventory & COGS tracking","Per-SKU profitability reports","Weekly payout reconciliation","US tax filing support (Form 5472, 1065)"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink-200">
                  <Check size={14} className="text-gold shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Zap, title: isVi ? "Tự động hóa 90% công việc" : "90% automation", desc: isVi ? "Dữ liệu từ sàn TMĐT tự động chảy vào sổ sách — bạn chỉ cần review và approve." : "Marketplace data flows automatically into your books — you just review and approve." },
              { icon: BarChart3, title: isVi ? "Báo cáo lợi nhuận thực" : "Real profit reports", desc: isVi ? "Biết chính xác lợi nhuận sau khi trừ tất cả phí sàn, phí vận chuyển, thuế và chi phí hàng tồn kho." : "Know exactly your profit after all marketplace fees, shipping, taxes and inventory costs." },
              { icon: ShoppingBag, title: isVi ? "Hỗ trợ đa sàn" : "Multi-platform support", desc: isVi ? "Quản lý Amazon US, EU, Shopee Singapore/Malaysia, TikTok Shop — tất cả trong một dashboard." : "Manage Amazon US, EU, Shopee Singapore/Malaysia, TikTok Shop — all in one dashboard." },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-ink-800 border border-ink-600 rounded-xl p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-ink-300">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
