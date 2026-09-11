import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function SingaporePage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🇸🇬 Singapore Pte Ltd
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi ? <><span className="text-gold-gradient">Singapore Pte Ltd</span> cho doanh nghiệp Việt Nam</> : <><span className="text-gold-gradient">Singapore Pte Ltd</span> for Vietnamese businesses</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {isVi
                ? "Thành lập công ty tư nhân tại Singapore — hub tài chính hàng đầu châu Á với hệ thống thuế thân thiện, pháp lý minh bạch và dễ dàng mở tài khoản ngân hàng quốc tế."
                : "Incorporate a private limited company in Singapore — Asia's top financial hub with business-friendly taxes, transparent legal system and easy international banking."}
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
                ? ["Xử lý 3–7 ngày làm việc","Company Secretary (năm đầu)","Registered address tại Singapore","Mở tài khoản DBS/OCBC/Wise","Hỗ trợ GST registration","Tư vấn tuân thủ pháp lý quốc tế"]
                : ["3–7 business day processing","First-year Company Secretary","Registered Singapore address","DBS/OCBC/Wise bank account","GST registration support","International compliance guidance"]
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
      <section className="py-16 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">{isVi ? "Tại sao chọn Singapore?" : "Why choose Singapore?"}</h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-8 text-left">
            {(isVi
              ? [["Thuế doanh nghiệp 17%","Mức thuế cạnh tranh hàng đầu châu Á — miễn thuế thu nhập cổ tức và lợi vốn."],["Pháp lý Common Law","Hệ thống pháp lý minh bạch, dựa trên Anh quốc — dễ tranh chấp quốc tế."],["Banking quốc tế","Dễ dàng mở tài khoản DBS, OCBC, Standard Chartered — chấp nhận toàn cầu."]]
              : [["17% corporate tax","Asia-competitive rate — no dividend tax, no capital gains tax."],["Common Law system","Transparent UK-based legal system — easy for international disputes."],["International banking","Easy DBS, OCBC, Standard Chartered accounts — globally accepted."]]
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
