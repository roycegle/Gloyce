import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, BookOpen } from "lucide-react";
export default async function BookkeepingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <BookOpen size={12} /> {isVi ? "Sổ sách kế toán" : "Bookkeeping"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <>{isVi ? "Sổ sách" : "Bookkeeping"} <span className="text-gold-gradient">{isVi ? "chuyên nghiệp hàng tháng" : "done professionally"}</span></> : <><span className="text-gold-gradient">Full-service bookkeeping</span> with expert support</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi ? "Gloyce ghi chép, phân loại và đối chiếu toàn bộ giao dịch của bạn hàng tháng — bạn tập trung vào kinh doanh, chúng tôi lo sổ sách." : "Gloyce records, categorizes and reconciles all your transactions monthly — you focus on business, we handle the books."}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {(isVi
              ? [["Ghi chép toàn bộ giao dịch","Phân loại chi phí theo chuẩn kế toán"],["Đối chiếu sao kê ngân hàng hàng tháng","Báo cáo P&L, Balance Sheet hàng tháng"],["Hỗ trợ thuế quý & cuối năm","Kế toán viên người Việt"]]
              : [["Full transaction recording","Expense categorization to accounting standards"],["Monthly bank statement reconciliation","Monthly P&L and Balance Sheet"],["Quarterly & year-end tax support","Multilingual accountant"]]
            ).map(([title, sub]) => (
              <div key={title} className="bg-ink-800 border border-ink-600 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1"><Check size={14} className="text-gold" /><span className="font-semibold text-foreground text-sm">{title}</span></div>
                <p className="text-xs text-ink-400 ml-5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
