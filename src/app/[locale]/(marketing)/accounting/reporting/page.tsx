import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, BarChart3 } from "lucide-react";
export default async function ReportingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <BarChart3 size={12} /> {isVi ? "Báo cáo tài chính" : "Financial Reporting"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Báo cáo thực thời</span> — nắm tài chính trong tầm tay</> : <><span className="text-gold-gradient">Real-time reports</span> — your finances at a glance</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi ? "P&L, Balance Sheet, Cash Flow Statement — cập nhật liên tục, trình bày theo chuẩn GAAP hoặc IFRS. Dashboard trực quan, dễ hiểu kể cả khi bạn không phải kế toán." : "P&L, Balance Sheet, Cash Flow — continuously updated, presented in GAAP or IFRS format. Visual dashboard, easy to understand even if you're not an accountant."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Xem demo" : "Watch a demo"} <ArrowRight size={15} />
          </Link>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["P&L Statement", "Balance Sheet", "Cash Flow", isVi ? "Báo cáo theo kỳ" : "Period comparison"].map(r => (
              <div key={r} className="bg-ink-800 border border-ink-600 rounded-xl p-5 text-center">
                <p className="font-semibold text-foreground text-sm">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
