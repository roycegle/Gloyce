import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, FileText } from "lucide-react";
export default async function BankIntegrationPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <FileText size={12} /> {isVi ? "Kết nối ngân hàng" : "Bank Integration"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Kết nối tự động</span> mọi tài khoản ngân hàng</> : <><span className="text-gold-gradient">Auto-connect</span> all your bank accounts</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi ? "Kết nối Mercury, Relay, Wise, Airwallex — giao dịch tự động chảy vào sổ sách. Không cần xuất file CSV, không cần nhập tay." : "Connect Mercury, Relay, Wise, Airwallex — transactions flow automatically into your books. No CSV exports, no manual entry."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Kết nối ngay" : "Connect now"} <ArrowRight size={15} />
          </Link>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Mercury", "Relay", "Wise", "Airwallex", "Payoneer", "Stripe", "PayPal", isVi ? "Ngân hàng VN" : "VN Banks"].map(b => (
              <div key={b} className="bg-ink-800 border border-ink-600 rounded-xl p-4 text-center text-sm font-medium text-foreground">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
