import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  ArrowRight, Star, Building2, Calculator, FileCheck,
  Check, Quote, TrendingUp, Users, ShoppingBag, Laptop,
  ChevronRight
} from "lucide-react";

export default async function HomePage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const t = {
    banner: isVi ? "Gloyce được vinh danh Top Fintech Việt Nam 2026" : "Gloyce named Top Vietnam Fintech 2026",
    heroTitle: isVi
      ? ["Thành lập công ty và", "kế toán chuyên gia", "cho doanh nghiệp toàn cầu"]
      : ["Hassle-free incorporation", "and expert accounting", "for global businesses"],
    heroSub: isVi
      ? "Gloyce giúp doanh nghiệp Việt Nam thành lập, vận hành và mở rộng ra thị trường quốc tế — trọn gói từ một nơi."
      : "Gloyce helps Vietnamese businesses incorporate, operate and expand globally — everything in one place.",
    cta1: isVi ? "Bắt đầu ngay" : "Get started",
    cta2: isVi ? "Đặt lịch tư vấn" : "Schedule a call",
    rating: isVi ? "đánh giá" : "reviews",
    customers: isVi ? "200+ doanh nghiệp từ 15+ quốc gia" : "200+ businesses from 15+ countries",
    whatWeDoTitle: isVi ? "CHÚNG TÔI LÀM GÌ" : "WHAT WE DO",
    whatWeDoSub: isVi ? "Dịch vụ linh hoạt cho mọi giai đoạn doanh nghiệp" : "Flexible services for every stage of your business",
    whoHelp: isVi ? "CHÚNG TÔI PHỤC VỤ AI" : "WHO WE HELP",
    whoHelpSub: isVi ? "Cho những doanh nhân sẵn sàng chinh phục thị trường toàn cầu" : "For founders ready to conquer global markets",
    whyTitle: isVi ? "TẠI SAO CHỌN GLOYCE" : "WHY CHOOSE US",
    whySub: isVi ? "Từ thành lập đến vận hành, chúng tôi đồng hành cùng bạn" : "From founding to filing and beyond, we're with you",
    testimonialsTitle: isVi ? "KHÁCH HÀNG NÓI VỀ CHÚNG TÔI" : "TESTIMONIALS",
    statsTitle: isVi ? "CON SỐ THỰC TẾ" : "FACTS & NUMBERS",
    storiesTitle: isVi ? "CÂU CHUYỆN KHÁCH HÀNG" : "CUSTOMER STORIES",
  };

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.10)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,125,216,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_60%,_rgba(6,9,26,0.8)_100%)]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(rgba(201,150,12,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,150,12,0.5) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-medium text-gold">{isVi ? "Được tin dùng bởi 200+ doanh nghiệp" : "Trusted by 200+ businesses"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              {t.heroTitle[0]}{" "}
              <span className="text-gold-gradient">{t.heroTitle[1]}</span>
              {" "}{t.heroTitle[2]}
            </h1>
            <p className="text-base sm:text-lg text-ink-300 leading-relaxed mb-8 max-w-xl">{t.heroSub}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_30px_rgba(201,150,12,0.30)] hover:shadow-[0_0_40px_rgba(201,150,12,0.45)]">
                {t.cta1} <ArrowRight size={16} />
              </Link>
              <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 hover:border-ink-500 transition-all">
                {t.cta2}
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
                <span className="ml-1 text-sm font-semibold text-foreground">4.9</span>
                <span className="text-sm text-ink-400">/ 180 {t.rating}</span>
              </div>
              <div className="w-px h-4 bg-ink-600" />
              <span className="text-sm text-ink-300">{t.customers}</span>
            </div>
          </div>

          {/* Right — feature card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-xl" />
              <div className="relative bg-ink-800 border border-ink-600 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-400">{isVi ? "Đang xử lý" : "In progress"}</p>
                    <p className="font-semibold text-sm">Nguyen Trading LLC</p>
                  </div>
                  <span className="ml-auto text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full border border-gold/20 font-medium">Delaware</span>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { done: true,  label: isVi ? "Đặt tên & kiểm tra tên" : "Name check & reservation" },
                    { done: true,  label: isVi ? "Nộp hồ sơ tại Delaware" : "Delaware state filing" },
                    { done: true,  label: isVi ? "Nhận EIN từ IRS" : "IRS EIN issuance" },
                    { done: false, label: isVi ? "Mở tài khoản Mercury" : "Mercury bank account", active: true },
                    { done: false, label: isVi ? "Hoàn tất onboarding" : "Complete onboarding" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-emerald-500/20 border border-emerald-500/40" : step.active ? "border-2 border-gold" : "border border-ink-600"}`}>
                        {step.done
                          ? <Check size={12} className="text-emerald-400" />
                          : step.active
                            ? <span className="w-2 h-2 rounded-full bg-gold" />
                            : null}
                      </div>
                      <span className={`text-sm ${step.done ? "text-ink-300 line-through" : step.active ? "text-foreground font-medium" : "text-ink-500"}`}>{step.label}</span>
                      {step.active && <span className="ml-auto text-[10px] text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20 animate-pulse">{isVi ? "Đang xử lý" : "Active"}</span>}
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-ink-700">
                  <div className="flex items-center justify-between text-xs text-ink-400 mb-2">
                    <span>{isVi ? "Tiến trình" : "Progress"}</span>
                    <span className="text-gold font-semibold">60%</span>
                  </div>
                  <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-gradient-to-r from-gold-dark to-gold rounded-full" />
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 shadow-xl">
                <p className="text-xs text-ink-400">{isVi ? "Thời gian xử lý" : "Processing time"}</p>
                <p className="text-sm font-bold text-gold">7–14 {isVi ? "ngày" : "days"}</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 shadow-xl">
                <p className="text-xs text-ink-400">{isVi ? "Chi phí trọn gói" : "All-inclusive cost"}</p>
                <p className="text-sm font-bold text-foreground">$499 USD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-20 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t.whatWeDoTitle}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">{t.whatWeDoSub}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 — Incorporation */}
            <div className="group relative bg-ink-800 border border-ink-600 rounded-2xl p-8 hover:border-gold/40 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.06)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {isVi ? "Thành lập công ty" : "Start my business"}
                </h3>
                <p className="text-ink-300 leading-relaxed mb-6">
                  {isVi
                    ? "Thành lập công ty nhanh chóng tại Mỹ, Singapore hoặc Hồng Kông. Bao gồm tài khoản ngân hàng và địa chỉ đăng ký."
                    : "Register your company fast in the US, Singapore or Hong Kong. Includes a bank account and registered address from day one."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["LLC Mỹ", "Singapore", "Hồng Kông"].map(j => (
                    <Link key={j} href={`/incorporation/${j === "LLC Mỹ" ? "us-llc" : j === "Singapore" ? "singapore" : "hong-kong"}`}
                      className="px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-gold/40 hover:text-gold transition-all">
                      {j}
                    </Link>
                  ))}
                </div>
                <Link href="/incorporation/us-llc" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors group/link">
                  {isVi ? "Xem chi tiết" : "Learn more"}
                  <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2 — Accounting */}
            <div className="group relative bg-ink-800 border border-ink-600 rounded-2xl p-8 hover:border-gold/40 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.06)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <Calculator className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {isVi ? "Chuyển sang Gloyce" : "Switch to Gloyce"}
                </h3>
                <p className="text-ink-300 leading-relaxed mb-6">
                  {isVi
                    ? "Dịch vụ kế toán chuyên gia và thư ký công ty, kèm phần mềm dễ dùng và sổ sách không giới hạn."
                    : "Expert accounting and corporate secretarial services alongside easy-to-use software and unlimited bookkeeping."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { label: isVi ? "Kế toán" : "Accounting", href: "/accounting" },
                    { label: isVi ? "Tuân thủ" : "Compliance", href: "/compliance/secretary" },
                  ].map(item => (
                    <Link key={item.label} href={item.href}
                      className="px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-gold/40 hover:text-gold transition-all">
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link href="/accounting" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors group/link">
                  {isVi ? "Xem chi tiết" : "Learn more"}
                  <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO WE HELP ─── */}
      <section className="py-20 bg-ink-800/50 border-y border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t.whoHelp}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">{t.whoHelpSub}</h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: isVi ? "Seller thương mại điện tử" : "Ecommerce sellers",
                desc: isVi
                  ? "Bán hàng trên Amazon, Shopee, TikTok Shop và muốn tối ưu dòng tiền quốc tế qua cấu trúc công ty đúng đắn."
                  : "Selling on Amazon, Shopee, TikTok Shop and looking to optimize cross-border cash flow with the right company structure.",
                href: "/accounting/ecommerce",
              },
              {
                icon: Laptop,
                title: isVi ? "Doanh nghiệp công nghệ" : "Tech companies",
                desc: isVi
                  ? "Startup, SaaS, agency kỹ thuật số cần cấu trúc công ty linh hoạt để nhận thanh toán quốc tế và thu hút đầu tư."
                  : "Startups, SaaS, and digital agencies needing a flexible structure to receive global payments and attract investment.",
                href: "/accounting",
              },
              {
                icon: TrendingUp,
                title: isVi ? "Doanh nghiệp xuất khẩu" : "Export businesses",
                desc: isVi
                  ? "Doanh nghiệp có giao dịch với đối tác nước ngoài, muốn quản lý dòng tiền quốc tế tuân thủ đúng quy định ODI."
                  : "Businesses with foreign trade partners, looking to manage international cash flow in full ODI compliance.",
                href: "/compliance/odi",
              },
            ].map((seg) => {
              const Icon = seg.icon;
              return (
                <div key={seg.title} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/30 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{seg.title}</h3>
                  <p className="text-sm text-ink-300 leading-relaxed mb-4">{seg.desc}</p>
                  <Link href={seg.href} className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-light transition-colors">
                    {isVi ? "Tìm hiểu thêm" : "Learn more"} <ChevronRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY GLOYCE ─── */}
      <section className="py-20 border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t.whyTitle}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">{t.whySub}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: isVi ? "Chuyên gia hiểu doanh nghiệp của bạn" : "Accountants that know your business",
                body: isVi
                  ? "Chúng tôi chủ động giúp bạn đưa ra quyết định tài chính sáng suốt để tăng doanh thu. Đội ngũ Gloyce hỗ trợ bạn nộp đúng thuế, theo dõi deadline và quản lý hồ sơ — bằng tiếng Việt."
                  : "We take a proactive approach to help you make informed financial decisions to grow revenue. The Gloyce team helps you pay the right tax, track deadlines and manage filing.",
                cta: { label: isVi ? "Tìm hiểu thêm" : "Learn more", href: "/accounting" },
              },
              {
                icon: FileCheck,
                title: isVi ? "Tuân thủ ODI từ đầu" : "ODI-compliant from day one",
                body: isVi
                  ? "Gloyce là đơn vị duy nhất chuyên biệt vào hành lang Việt Nam ↔ Mỹ với hướng dẫn khai báo ODI, mở tài khoản vốn đầu tư ra nước ngoài và hồi hương lợi nhuận đúng hạn theo quy định NHNN."
                  : "Gloyce is the only service specializing in the Vietnam ↔ US corridor with full ODI registration guidance, outward investment accounts, and profit repatriation in compliance with SBV regulations.",
                cta: { label: isVi ? "Tìm hiểu về ODI" : "Learn about ODI", href: "/compliance/odi" },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-5 p-6 bg-ink-800 border border-ink-600 rounded-2xl hover:border-gold/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-ink-300 leading-relaxed mb-4">{item.body}</p>
                    <Link href={item.cta.href} className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-light transition-colors">
                      {item.cta.label} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 border-b border-ink-700 bg-ink-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "95%", label: isVi ? "khách hàng giới thiệu chúng tôi" : "of customers recommend us" },
              { value: "200+", label: isVi ? "doanh nghiệp đã thành lập" : "companies incorporated" },
              { value: "3", label: isVi ? "quốc gia hỗ trợ" : "countries supported" },
              { value: "$2M+", label: isVi ? "doanh thu khách hàng được tối ưu" : "client revenue optimized" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-gold mb-1">{stat.value}</p>
                <p className="text-sm text-ink-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t.testimonialsTitle}</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                quote: isVi
                  ? "Gloyce đã giúp chúng tôi thành lập LLC Delaware trong vòng 10 ngày. Toàn bộ quy trình rõ ràng, đội ngũ hỗ trợ bằng tiếng Việt rất chuyên nghiệp."
                  : "Gloyce set up our Delaware LLC in 10 days. The whole process was clear and the Vietnamese-speaking team was incredibly professional.",
                name: "Nguyễn Minh Tuấn",
                title: isVi ? "Founder, TechExport JSC" : "Founder, TechExport JSC",
                rating: 5,
              },
              {
                quote: isVi
                  ? "Tôi bán hàng trên Amazon và không hiểu gì về khai báo thuế Mỹ. Gloyce đã lo hết — từ EIN, Form 5472 đến kế toán hàng tháng. Rất đáng tin."
                  : "I sell on Amazon and knew nothing about US tax filings. Gloyce handled everything — EIN, Form 5472, and monthly accounting. Very trustworthy.",
                name: "Trần Thị Hoa",
                title: isVi ? "Amazon Seller, TP.HCM" : "Amazon Seller, Ho Chi Minh City",
                rating: 5,
              },
              {
                quote: isVi
                  ? "Phần tôi thích nhất là Gloyce giải thích rõ về ODI và hồi hương lợi nhuận. Nhiều đối thủ tránh chủ đề này, Gloyce thì hướng dẫn cụ thể từng bước."
                  : "What I loved most was how Gloyce explained ODI and profit repatriation clearly. Other providers avoid this topic — Gloyce guides you step by step.",
                name: "Lê Quốc Hùng",
                title: isVi ? "CEO, Global Trade VN" : "CEO, Global Trade VN",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/30 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-gold/30 mb-3" />
                <p className="text-sm text-ink-200 leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER STORY ─── */}
      <section className="py-20 border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t.storiesTitle}</p>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isVi ? '"Gloyce giúp chúng tôi tiết kiệm 15 giờ/tháng và tái đầu tư vào tăng trưởng"' : '"Gloyce saved us 15 hours a month and we reinvested into growth"'}
            </h2>
            <Link href="/resources/stories" className="hidden md:inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors shrink-0 ml-4">
              {isVi ? "Xem tất cả" : "View all"} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="bg-ink-800 border border-ink-600 rounded-2xl p-8 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="text-ink-300 leading-relaxed mb-4">
                {isVi
                  ? "Nguyen Trading LLC là doanh nghiệp bán hàng trên Amazon từ 2022. Trước khi sử dụng Gloyce, họ mất hàng chục giờ mỗi tháng để tự quản lý sổ sách và khai báo thuế Mỹ — không có chuyên môn và luôn lo lắng về rủi ro pháp lý."
                  : "Nguyen Trading LLC has been selling on Amazon since 2022. Before Gloyce, they spent dozens of hours each month managing their own books and US tax filings — with no expertise and constant legal anxiety."}
              </p>
              <Link href="/resources/stories/nguyen-trading" className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors">
                {isVi ? "Đọc câu chuyện đầy đủ" : "Read the full story"} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: isVi ? "Thời gian tiết kiệm" : "Time saved", value: "15h/tháng" },
                { label: isVi ? "Năm sử dụng Gloyce" : "Years with Gloyce", value: "2 năm" },
                { label: isVi ? "Doanh thu Amazon" : "Amazon revenue", value: "$180K/năm" },
              ].map(s => (
                <div key={s.label} className="bg-ink-700 rounded-xl px-4 py-3">
                  <p className="text-xs text-ink-400">{s.label}</p>
                  <p className="font-bold text-gold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative bg-ink-800 border border-gold/20 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,150,12,0.12)_0%,_transparent_70%)]" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                {isVi ? "BẮT ĐẦU NGAY HÔM NAY" : "START TODAY"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {isVi ? "Sẵn sàng đưa doanh nghiệp ra toàn cầu?" : "Ready to take your business global?"}
              </h2>
              <p className="text-ink-300 mb-8 max-w-xl mx-auto">
                {isVi
                  ? "Hơn 200 doanh nghiệp Việt Nam đã tin tưởng Gloyce. Đặt lịch tư vấn miễn phí ngay hôm nay."
                  : "Over 200 Vietnamese businesses already trust Gloyce. Book a free consultation today."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-ink-900 font-semibold hover:bg-gold-light transition-all shadow-[0_0_30px_rgba(201,150,12,0.30)]">
                  {isVi ? "Đặt lịch tư vấn miễn phí" : "Book a free consultation"}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-ink-500 text-foreground hover:bg-ink-700 transition-all">
                  {isVi ? "Xem bảng giá" : "View pricing"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
