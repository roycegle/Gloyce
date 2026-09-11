import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, TrendingUp, Check } from "lucide-react";

export default async function InternationalTransfersPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <TrendingUp size={12} />
            {isVi ? "Chuyển tiền quốc tế" : "International Transfers"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi
              ? <><span className="text-gold-gradient">Chuyển tiền quốc tế</span> nhanh chóng, an toàn</>
              : <><span className="text-gold-gradient">International transfers</span> — fast, secure, efficient</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi
              ? "Gloyce kết nối bạn với mạng lưới ngân hàng và fintech hàng đầu để chuyển tiền quốc tế, phân phối lợi nhuận và quản lý dòng tiền xuyên biên giới một cách hiệu quả."
              : "Gloyce connects you with a network of top banks and fintechs to handle international wire transfers, profit distribution, and cross-border cash flow management efficiently."}
          </p>

          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)] mb-10">
            {isVi ? "Tư vấn miễn phí" : "Free consultation"} <ArrowRight size={15} />
          </Link>

          <div className="grid sm:grid-cols-2 gap-4">
            {(isVi
              ? [
                  "Wire transfer từ tài khoản Mỹ về Việt Nam",
                  "Phân phối lợi nhuận cho cổ đông",
                  "Kết nối Wise, Airwallex, Payoneer",
                  "Tư vấn tỷ giá và thời điểm chuyển tiền tối ưu",
                  "Theo dõi và xác nhận giao dịch quốc tế",
                  "Chuẩn bị chứng từ ngân hàng đầy đủ",
                ]
              : [
                  "Wire transfer from US account to Vietnam",
                  "Profit distribution to shareholders",
                  "Connect Wise, Airwallex, Payoneer",
                  "Exchange rate advice and optimal transfer timing",
                  "Track and confirm international transactions",
                  "Prepare complete banking documentation",
                ]
            ).map(f => (
              <div key={f} className="flex items-center gap-2 bg-ink-800 border border-ink-600 rounded-xl p-4 text-sm text-ink-200">
                <Check size={14} className="text-gold shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
