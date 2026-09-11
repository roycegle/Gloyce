import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function HongKongPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🇭🇰 Hong Kong Limited
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi ? <><span className="text-gold-gradient">Hong Kong Limited</span> — cửa ngõ châu Á</> : <><span className="text-gold-gradient">Hong Kong Limited</span> — Asia gateway</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {isVi
                ? "Công ty TNHH tại Hồng Kông — cửa ngõ vào thị trường Trung Quốc, hệ thống ngân hàng quốc tế mạnh mẽ, thuế đơn giản chỉ áp dụng trên lợi nhuận phát sinh tại HK."
                : "Hong Kong limited company — gateway to China market, strong international banking, simple territorial tax system applying only to HK-sourced profits."}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
                {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
              </Link>
              <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
                {isVi ? "Tư vấn miễn phí" : "Free consultation"}
              </Link>
            </div>
            <div className="space-y-2">
              {(isVi
                ? ["Xử lý 5–10 ngày làm việc","Company Secretary (năm đầu)","Registered address tại HK","Hỗ trợ mở tài khoản HSBC/Hang Seng","Business Registration Certificate","Profits Tax Return hỗ trợ hàng năm"]
                : ["5–10 business day processing","First-year Company Secretary","Registered HK address","HSBC/Hang Seng bank account support","Business Registration Certificate","Annual Profits Tax Return support"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink-200">
                  <Check size={14} className="text-gold shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8">
            <p className="text-xs text-ink-400 mb-1">{isVi ? "Chi phí trọn gói" : "All-inclusive cost"}</p>
            <p className="text-4xl font-black text-foreground mb-1">{isVi ? "Liên hệ báo giá" : "Contact for pricing"}</p>
            <p className="text-sm text-ink-400 mb-6">{isVi ? "Phụ thuộc vào yêu cầu cụ thể" : "Depends on specific requirements"}</p>
            <Link href="/contact" className="block text-center py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all mb-3">
              {isVi ? "Yêu cầu báo giá" : "Request a quote"}
            </Link>
            <Link href="/contact?tab=call" className="block text-center py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
              {isVi ? "Đặt lịch tư vấn" : "Schedule a call"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
