import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function PricingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const incorporationPlans = [
    {
      name: isVi ? "LLC Mỹ — Gói Standard" : "US LLC — Standard",
      price: "$499", period: isVi ? "một lần" : "one-time",
      desc: isVi ? "Delaware hoặc Wyoming LLC — trọn gói cơ bản" : "Delaware or Wyoming LLC — basic complete package",
      features: isVi
        ? ["Phí bang + Registered Agent năm đầu","EIN từ IRS","Operating Agreement","Certificate of Formation","Hỗ trợ ODI cơ bản"]
        : ["State fee + first-year Registered Agent","IRS EIN","Operating Agreement","Certificate of Formation","Basic ODI guidance"],
    },
    {
      name: isVi ? "LLC Mỹ — Gói Premium" : "US LLC — Premium",
      price: "$799", period: isVi ? "một lần" : "one-time",
      desc: isVi ? "Đầy đủ Standard + tài khoản ngân hàng + ODI đầy đủ" : "Everything Standard + bank account + full ODI",
      features: isVi
        ? ["Tất cả Gói Standard","Hỗ trợ mở Mercury/Relay/Wise","Hướng dẫn ODI đầy đủ + chứng từ NHNN","Business address (1 năm)","30 phút tư vấn chiến lược"]
        : ["Everything Standard","Mercury/Relay/Wise account setup","Full ODI guidance + SBV documents","Business address (1 year)","30-min strategy consultation"],
      featured: true,
    },
    {
      name: isVi ? "Singapore / Hồng Kông" : "Singapore / Hong Kong",
      price: isVi ? "Liên hệ" : "Contact",
      period: "",
      desc: isVi ? "Báo giá theo yêu cầu cụ thể" : "Custom quote per requirements",
      features: isVi
        ? ["Tư vấn lựa chọn jurisdiction","Trọn gói thành lập","Nominee Director nếu cần","Tài khoản ngân hàng","Thư ký công ty (năm đầu)"]
        : ["Jurisdiction selection consultation","Complete formation package","Nominee Director if needed","Bank account","First-year Company Secretary"],
    },
  ];

  const accountingPlans = [
    {
      name: "Starter",
      price: isVi ? "3.000.000đ" : "$149",
      period: isVi ? "/tháng" : "/mo",
      desc: isVi ? "Doanh thu dưới $50K/năm" : "Under $50K annual revenue",
      features: isVi ? ["Sổ sách hàng tháng","Báo cáo P&L","1 tài khoản ngân hàng","Hỗ trợ email"] : ["Monthly bookkeeping","P&L report","1 bank connection","Email support"],
    },
    {
      name: "Growth",
      price: isVi ? "6.000.000đ" : "$299",
      period: isVi ? "/tháng" : "/mo",
      desc: isVi ? "Doanh thu $50K–$500K/năm" : "$50K–$500K annual revenue",
      features: isVi ? ["Tất cả Starter","Tài khoản không giới hạn","Báo cáo hàng tuần","Khai thuế quý","Hỗ trợ ưu tiên"] : ["Everything Starter","Unlimited connections","Weekly reports","Quarterly tax","Priority support"],
      featured: true,
    },
    {
      name: "Scale",
      price: isVi ? "12.000.000đ" : "$599",
      period: isVi ? "/tháng" : "/mo",
      desc: isVi ? "Doanh thu trên $500K/năm" : "Over $500K annual revenue",
      features: isVi ? ["Tất cả Growth","Kế toán trưởng riêng","Đa thực thể","Lập kế hoạch thuế","CFO thuê ngoài 2h/tháng"] : ["Everything Growth","Dedicated senior accountant","Multi-entity","Tax planning","Fractional CFO 2h/mo"],
    },
  ];

  const compliancePlans = [
    {
      name: isVi ? "Thư ký công ty" : "Company Secretary",
      price: isVi ? "1.500.000đ" : "$75",
      period: isVi ? "/tháng" : "/mo",
      desc: isVi ? "Dành cho LLC Mỹ đang hoạt động" : "For active US LLC",
      features: isVi ? ["Duy trì sổ đăng ký","Soạn thảo nghị quyết","Annual filing","Nhắc deadline"] : ["Maintain registers","Draft resolutions","Annual filing","Deadline reminders"],
    },
    {
      name: isVi ? "Khai báo ODI" : "ODI Reporting",
      price: isVi ? "3.000.000đ" : "$150",
      period: isVi ? "một lần" : "one-time",
      desc: isVi ? "Đăng ký đầu tư ra nước ngoài với NHNN" : "Register outward investment with SBV",
      features: isVi ? ["Đánh giá nghĩa vụ","Chuẩn bị hồ sơ NHNN","Mở tài khoản vốn ODI","Báo cáo định kỳ"] : ["Obligation assessment","SBV filing preparation","ODI capital account","Periodic reporting"],
    },
    {
      name: isVi ? "Hồi hương lợi nhuận" : "Profit Repatriation",
      price: isVi ? "Liên hệ" : "Contact",
      period: "",
      desc: isVi ? "Tuỳ theo giá trị giao dịch" : "Depends on transaction value",
      features: isVi ? ["Lập kế hoạch hồi hương","Phối hợp ngân hàng","Chứng từ NHNN","Tư vấn thuế TNCN"] : ["Repatriation planning","Bank coordination","SBV documentation","Personal income tax advice"],
    },
  ];

  const sections = [
    { title: isVi ? "Thành lập công ty" : "Incorporation", plans: incorporationPlans },
    { title: isVi ? "Kế toán & Thuế" : "Accounting & Tax", plans: accountingPlans },
    { title: isVi ? "Tuân thủ" : "Compliance", plans: compliancePlans },
  ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {isVi ? "BẢNG GIÁ" : "PRICING"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Giá minh bạch, không phí ẩn" : "Transparent pricing, no hidden fees"}
            </h1>
            <p className="text-ink-300 text-lg">
              {isVi ? "Tất cả gói bao gồm hỗ trợ tiếng Việt và tư vấn không giới hạn." : "All plans include Vietnamese-language support and unlimited consultations."}
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="mb-16">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-ink-700">{section.title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.plans.map((plan) => (
                  <div key={plan.name} className={`relative bg-ink-800 rounded-2xl p-7 border ${(plan as {featured?: boolean}).featured ? "border-gold/30 shadow-[0_0_40px_rgba(201,150,12,0.10)]" : "border-ink-600"}`}>
                    {(plan as {featured?: boolean}).featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-ink-900 bg-gold px-3 py-1 rounded-full">
                        {isVi ? "Phổ biến nhất" : "Most popular"}
                      </span>
                    )}
                    <h3 className="font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-xs text-ink-400 mb-4">{plan.desc}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-black text-foreground">{plan.price}</span>
                      {plan.period && <span className="text-sm text-ink-400"> {plan.period}</span>}
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink-200">
                          <Check size={13} className="text-gold mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${(plan as {featured?: boolean}).featured ? "bg-gold text-ink-900 hover:bg-gold-light" : "border border-ink-500 text-foreground hover:bg-ink-700"}`}>
                      {plan.price === (isVi ? "Liên hệ" : "Contact") ? (isVi ? "Yêu cầu báo giá" : "Request a quote") : (isVi ? "Bắt đầu" : "Get started")}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">{isVi ? "Cần gói tuỳ chỉnh?" : "Need a custom plan?"}</h2>
            <p className="text-ink-300 mb-5">{isVi ? "Doanh nghiệp có nhiều thực thể, nhiều quốc gia hoặc yêu cầu phức tạp — hãy liên hệ để nhận báo giá riêng." : "Businesses with multiple entities, countries or complex requirements — contact us for a custom quote."}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {isVi ? "Liên hệ đội ngũ" : "Contact our team"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
