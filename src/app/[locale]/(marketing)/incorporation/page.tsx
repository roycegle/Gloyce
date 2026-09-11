import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, Landmark, Globe, Building2, CreditCard } from "lucide-react";

export default async function IncorporationPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const options = [
    {
      icon: Landmark, flag: "🇺🇸",
      title: isVi ? "LLC tại Mỹ" : "US LLC",
      subtitle: isVi ? "Delaware hoặc Wyoming" : "Delaware or Wyoming",
      desc: isVi ? "Cấu trúc tối ưu cho seller Amazon, SaaS, nhận thanh toán Stripe/PayPal. Được VC ưa thích." : "Optimal for Amazon sellers, SaaS, Stripe/PayPal payments. VC-friendly structure.",
      price: "Từ $499",
      time: isVi ? "7–14 ngày" : "7–14 days",
      href: "/incorporation/us-llc",
      featured: true,
      perks: isVi
        ? ["Delaware hoặc Wyoming", "EIN từ IRS", "Mở tài khoản Mercury/Relay", "Form 5472 & BOI Report"]
        : ["Delaware or Wyoming", "EIN from IRS", "Mercury/Relay bank account", "Form 5472 & BOI Report"],
    },
    {
      icon: Globe, flag: "🇸🇬",
      title: "Singapore Pte Ltd",
      subtitle: isVi ? "Công ty tư nhân Singapore" : "Singapore private limited",
      desc: isVi ? "Hub tài chính châu Á, thuế thân thiện, hệ thống pháp lý minh bạch. Lý tưởng cho fintech, logistics, phân phối khu vực." : "Asia financial hub, business-friendly tax, transparent legal system. Ideal for fintech, logistics, regional distribution.",
      price: isVi ? "Liên hệ" : "Contact us",
      time: isVi ? "3–7 ngày" : "3–7 days",
      href: "/incorporation/singapore",
      featured: false,
      perks: isVi
        ? ["Nominee Director nếu cần", "Corporate bank account", "GST registration", "Annual filing support"]
        : ["Nominee Director if needed", "Corporate bank account", "GST registration", "Annual filing support"],
    },
    {
      icon: Building2, flag: "🇭🇰",
      title: "Hong Kong Limited",
      subtitle: isVi ? "Công ty TNHH Hồng Kông" : "Hong Kong limited company",
      desc: isVi ? "Cửa ngõ vào thị trường Trung Quốc, hệ thống ngân hàng quốc tế mạnh. Phù hợp cho thương mại và đầu tư xuyên biên giới." : "Gateway to China market, strong international banking. Suited for cross-border trade and investment.",
      price: isVi ? "Liên hệ" : "Contact us",
      time: isVi ? "5–10 ngày" : "5–10 days",
      href: "/incorporation/hong-kong",
      featured: false,
      perks: isVi
        ? ["Tài khoản ngân hàng HK", "Company secretary", "Annual Return filing", "Hỗ trợ đa ngôn ngữ"]
        : ["HK bank account", "Company secretary", "Annual Return filing", "Multilingual support"],
    },
    {
      icon: CreditCard, flag: "🏦",
      title: isVi ? "Mở tài khoản ngân hàng" : "Business bank account",
      subtitle: "Mercury · Wise · Airwallex",
      desc: isVi ? "Mở tài khoản ngân hàng quốc tế 100% online cho công ty đã thành lập — không cần đến Mỹ hay Singapore." : "Open an international business account 100% online for your existing company — no in-person visit required.",
      price: isVi ? "Theo gói" : "Per package",
      time: isVi ? "3–7 ngày" : "3–7 days",
      href: "/incorporation/bank-account",
      featured: false,
      perks: isVi
        ? ["Mercury, Relay, Wise", "Airwallex, Payoneer", "USD/SGD/HKD accounts", "Kết nối Stripe/PayPal"]
        : ["Mercury, Relay, Wise", "Airwallex, Payoneer", "USD/SGD/HKD accounts", "Stripe/PayPal integration"],
    },
  ];

  return (
    <main>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {isVi ? "THÀNH LẬP CÔNG TY" : "INCORPORATION"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi
                ? <>Thành lập công ty tại <span className="text-gold-gradient">Mỹ, Singapore</span> hoặc Hồng Kông</>
                : <>Incorporate in the <span className="text-gold-gradient">US, Singapore</span> or Hong Kong</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed">
              {isVi
                ? "Gloyce lo toàn bộ quy trình — từ đặt tên, nộp hồ sơ, lấy EIN đến mở tài khoản ngân hàng. Hỗ trợ đa ngôn ngữ và tuân thủ pháp lý Mỹ đầy đủ."
                : "Gloyce handles the entire process — from name check, filing, EIN to bank account opening. Multilingual support and full US compliance included."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <div key={opt.title} className={`relative bg-ink-800 rounded-2xl p-7 border transition-all hover:border-gold/40 ${opt.featured ? "border-gold/30 shadow-[0_0_40px_rgba(201,150,12,0.08)]" : "border-ink-600"}`}>
                  {opt.featured && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                      {isVi ? "Phổ biến nhất" : "Most popular"}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{opt.flag}</div>
                    <div>
                      <h2 className="font-bold text-foreground">{opt.title}</h2>
                      <p className="text-xs text-ink-400">{opt.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-ink-300 leading-relaxed mb-5">{opt.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {opt.perks.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-ink-200">
                        <Check size={13} className="text-gold shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-ink-700">
                    <div>
                      <p className="text-lg font-bold text-foreground">{opt.price}</p>
                      <p className="text-xs text-ink-400">{opt.time}</p>
                    </div>
                    <Link href={opt.href} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-ink-900 text-sm font-semibold hover:bg-gold-light transition-all">
                      {isVi ? "Tìm hiểu thêm" : "Learn more"} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">
            {isVi ? "Không biết nên chọn quốc gia nào?" : "Not sure which jurisdiction to choose?"}
          </h2>
          <p className="text-ink-300 text-sm mb-5">
            {isVi ? "Đặt lịch tư vấn miễn phí — chuyên gia Gloyce sẽ phân tích mô hình kinh doanh và đề xuất cấu trúc phù hợp nhất." : "Book a free consultation — our experts will analyze your business model and recommend the best structure."}
          </p>
          <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
            {isVi ? "Đặt lịch tư vấn miễn phí" : "Book a free consultation"} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
