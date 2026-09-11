import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  ArrowRight, Star, Building2, Calculator, FileCheck,
  Check, Quote, TrendingUp, ShoppingBag, Laptop,
  ChevronRight, Shield, Clock, Globe2, BadgeCheck,
  Zap, Users2,
} from "lucide-react";

/* ─── Unsplash photo helpers ─────────────────────────── */
const UX = (id: string, w = 900, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PHOTOS = {
  teamMeeting:    UX("1522071820081-009f0129c71c", 900, 600),
  modernOffice:   UX("1497366216548-37526070297c", 900, 600),
  laptopWork:     UX("1551434678-e076c223a692",   800, 600),
  businessCall:   UX("1560472354-b33ff0c44a43",   800, 600),
  globalHandshake:UX("1542744173-8e7e53415bb0",   900, 600),
  luxuryOffice:   UX("1521737711867-e3b97375f902", 900, 500),
  womanWorking:   UX("1573496359142-b8d87734a5a2", 600, 700),
  teamSmiling:    UX("1600880292203-757bb62b4baf", 800, 600),
};

/* ─── Avatar via UI Avatars ─────────────────────────── */
function avatarUrl(name: string, bg = "C9960C", fg = "06091A") {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${fg}&bold=true&size=96&format=svg`;
}

/* ─── Globe SVG (hero right) ─────────────────────────── */
function GlobeVisual() {
  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="160" cy="160" r="155" stroke="rgba(201,150,12,0.08)" strokeWidth="1" />
      <g className="animate-spin-slow" style={{transformOrigin:"160px 160px"}}>
        <ellipse cx="160" cy="160" rx="145" ry="50" stroke="rgba(201,150,12,0.15)" strokeWidth="1" strokeDasharray="6 4"/>
      </g>
      <g className="animate-spin-reverse" style={{transformOrigin:"160px 160px"}}>
        <ellipse cx="160" cy="160" rx="100" ry="35" stroke="rgba(201,150,12,0.12)" strokeWidth="1" strokeDasharray="4 6"/>
      </g>
      <circle cx="160" cy="160" r="90" fill="rgba(13,21,40,0.95)" stroke="rgba(201,150,12,0.25)" strokeWidth="1.5"/>
      <ellipse cx="160" cy="160" rx="90" ry="30" stroke="rgba(201,150,12,0.12)" strokeWidth="1"/>
      <ellipse cx="160" cy="160" rx="90" ry="65" stroke="rgba(201,150,12,0.08)" strokeWidth="1"/>
      <line x1="160" y1="70" x2="160" y2="250" stroke="rgba(201,150,12,0.12)" strokeWidth="1"/>
      <line x1="70" y1="160" x2="250" y2="160" stroke="rgba(201,150,12,0.12)" strokeWidth="1"/>
      <path d="M160 70 Q200 160 160 250" stroke="rgba(201,150,12,0.08)" strokeWidth="1" fill="none"/>
      <path d="M160 70 Q120 160 160 250" stroke="rgba(201,150,12,0.08)" strokeWidth="1" fill="none"/>
      <path d="M120 130 Q135 118 155 125 Q168 130 165 145 Q158 155 140 153 Q118 148 120 130Z" fill="rgba(201,150,12,0.18)" />
      <path d="M165 148 Q178 140 192 146 Q200 154 195 165 Q185 172 172 168 Q162 160 165 148Z" fill="rgba(201,150,12,0.14)" />
      <path d="M130 165 Q140 158 152 163 Q158 170 153 180 Q142 185 132 180 Q124 172 130 165Z" fill="rgba(201,150,12,0.12)" />
      <path d="M180 130 Q190 122 200 128 Q206 135 202 144 Q192 149 182 144 Q175 136 180 130Z" fill="rgba(201,150,12,0.10)" />
      <circle cx="160" cy="160" r="4" fill="#C9960C" opacity="0.8"/>
      <circle cx="160" cy="160" r="8" fill="rgba(201,150,12,0.2)"/>
      <circle cx="130" cy="138" r="3" fill="#C9960C"/>
      <circle cx="130" cy="138" r="6" fill="rgba(201,150,12,0.25)"/>
      <circle cx="182" cy="152" r="2.5" fill="#E8B82A"/>
      <circle cx="182" cy="152" r="5" fill="rgba(232,184,42,0.25)"/>
      <circle cx="148" cy="172" r="2" fill="#C9960C" opacity="0.8"/>
      <circle cx="148" cy="172" r="5" fill="rgba(201,150,12,0.2)"/>
      <line x1="130" y1="138" x2="182" y2="152" stroke="rgba(201,150,12,0.4)" strokeWidth="0.8" strokeDasharray="3 2"/>
      <line x1="182" y1="152" x2="148" y2="172" stroke="rgba(201,150,12,0.3)" strokeWidth="0.8" strokeDasharray="3 2"/>
    </svg>
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  return (
    <main className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_30%,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_80%,_rgba(59,125,216,0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-ink-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold text-gold tracking-wide">
                {isVi ? "Được tin dùng bởi 200+ doanh nghiệp" : "Trusted by 200+ businesses"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="font-display italic text-gold-gradient block mb-1">
                {isVi ? "Thành lập. Vận hành." : "Incorporate. Operate."}
              </span>
              <span className="text-foreground">
                {isVi ? "Mở rộng ra toàn cầu." : "Scale globally."}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-300 leading-relaxed mb-8 max-w-lg">
              {isVi
                ? "Gloyce giúp doanh nghiệp Việt Nam thành lập công ty, vận hành kế toán và mở rộng ra thị trường quốc tế — trọn gói tuân thủ từ một nơi."
                : "Gloyce helps Vietnamese businesses incorporate, run accounting, and expand globally — fully compliant, all from one place."}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-ink-900 font-bold text-sm hover:bg-gold-light transition-all shadow-[0_0_40px_rgba(201,150,12,0.35)] hover:shadow-[0_0_50px_rgba(201,150,12,0.50)] hover:-translate-y-0.5">
                {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={16} />
              </Link>
              <Link href="/contact?tab=call"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-ink-500 text-foreground text-sm hover:bg-ink-800 hover:border-gold/30 transition-all">
                {isVi ? "Đặt lịch tư vấn" : "Schedule a call"}
              </Link>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-gold text-gold" />)}</div>
                <span className="text-sm font-bold text-foreground">4.9</span>
                <span className="text-xs text-ink-400">/ 180 {isVi ? "đánh giá" : "reviews"}</span>
              </div>
              <div className="w-px h-4 bg-ink-600" />
              <span className="text-xs text-ink-300">{isVi ? "200+ doanh nghiệp · 15+ quốc gia" : "200+ businesses · 15+ countries"}</span>
            </div>
          </div>

          {/* Right — Globe + floating cards */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            <div className="relative w-72 h-72 animate-float">
              <div className="absolute inset-0 bg-gold/5 rounded-full blur-3xl" />
              <GlobeVisual />

              {/* Floating card — top left */}
              <div className="absolute -top-4 -left-8 bg-ink-800/95 backdrop-blur-sm border border-gold/25 rounded-2xl px-4 py-3 shadow-2xl z-10">
                <p className="text-[10px] text-ink-400 mb-0.5">{isVi ? "Thành lập tại" : "Incorporated in"}</p>
                <div className="flex items-center gap-2">
                  <span className="text-base">🇺🇸</span>
                  <p className="text-sm font-bold text-foreground">Irvine, CA</p>
                </div>
              </div>

              {/* Floating card — right */}
              <div className="absolute top-1/2 -right-14 -translate-y-1/2 bg-ink-800/95 backdrop-blur-sm border border-gold/20 rounded-xl px-3 py-2.5 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-emerald-400 shrink-0" />
                  <p className="text-xs font-semibold text-foreground">IRS Registered</p>
                </div>
              </div>

              {/* Floating card — bottom right */}
              <div className="absolute -bottom-4 -right-4 bg-ink-800/95 backdrop-blur-sm border border-gold/20 rounded-2xl px-4 py-3 shadow-2xl z-10">
                <p className="text-[10px] text-ink-400 mb-0.5">{isVi ? "Xử lý trong" : "Done in"}</p>
                <p className="text-sm font-bold text-gold">7–14 {isVi ? "ngày" : "days"}</p>
              </div>
            </div>

            {/* Jurisdiction row */}
            <div className="flex gap-3">
              {[{flag:"🇺🇸",label:"US LLC"},{flag:"🇸🇬",label:"Singapore"},{flag:"🇭🇰",label:"Hong Kong"}].map(j => (
                <div key={j.label} className="flex items-center gap-2 px-3 py-2 bg-ink-800 border border-ink-600 rounded-xl text-xs font-medium text-ink-200 hover:border-gold/30 hover:text-gold transition-all cursor-default">
                  <span className="text-base">{j.flag}</span>{j.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARTNER STRIP
      ═══════════════════════════════════════════ */}
      <section className="border-y border-ink-700 py-5 bg-ink-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400 shrink-0">
              {isVi ? "Kết nối với" : "Works with"}
            </p>
            {["🏦 Mercury Bank","💳 Stripe","💸 Wise","📦 Amazon FBA","🛍️ Shopee Global","🎵 TikTok Shop","✈️ Payoneer"].map(p => (
              <div key={p} className="logo-pill">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ENVIRONMENT PHOTO STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: PHOTOS.luxuryOffice, label: isVi ? "Tư vấn 1-1 online" : "1-on-1 online advisory", overlay: "from-ink-900/70" },
              { src: PHOTOS.globalHandshake, label: isVi ? "Kết nối đối tác quốc tế" : "Global partner network", overlay: "from-ink-900/60" },
              { src: PHOTOS.laptopWork, label: isVi ? "Kế toán theo thời gian thực" : "Real-time accounting", overlay: "from-ink-900/60" },
              { src: PHOTOS.businessCall, label: isVi ? "Họp chiến lược doanh nghiệp" : "Business strategy meetings", overlay: "from-ink-900/70" },
            ].map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-ink-600 hover:border-gold/30 transition-all shadow-lg">
                <Image src={item.src} alt={item.label} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.overlay} to-transparent`} />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <p className="text-[11px] font-semibold text-white/90 leading-tight">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {isVi ? "CHÚNG TÔI LÀM GÌ" : "WHAT WE DO"}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
            {isVi ? "Dịch vụ linh hoạt cho mọi\ngiai đoạn doanh nghiệp" : "Flexible services for every\nstage of your business"}
          </h2>
          <p className="text-ink-300 mb-14 max-w-xl text-sm">
            {isVi
              ? "Từ thành lập đến kế toán và tuân thủ — Gloyce bao phủ toàn bộ hành trình quốc tế hóa doanh nghiệp."
              : "From incorporation to accounting and compliance — Gloyce covers your entire internationalization journey."}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Incorporation card */}
            <div className="group relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden hover:border-gold/40 transition-all card-glow">
              {/* Photo top */}
              <div className="relative h-44 overflow-hidden">
                <Image src={PHOTOS.teamSmiling} alt="Team working on incorporation" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-ink-800" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-ink-900/80 backdrop-blur-sm border border-gold/30 px-2.5 py-1 rounded-full">
                    {isVi ? "Từ $499" : "From $499"}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">{isVi ? "Thành lập công ty" : "Incorporate"}</h3>
                </div>
                <p className="text-ink-300 leading-relaxed mb-5 text-sm">
                  {isVi
                    ? "Thành lập công ty nhanh chóng tại Mỹ, Singapore hoặc Hồng Kông. Bao gồm EIN, tài khoản ngân hàng và địa chỉ đăng ký."
                    : "Register your company fast in the US, Singapore or Hong Kong. Includes EIN, business bank account, and registered address from day one."}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {(isVi ? ["LLC Delaware","EIN & ITIN","Địa chỉ đăng ký","Tài khoản Mercury"] : ["Delaware LLC","EIN & ITIN","Registered address","Mercury account"]).map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-ink-200"><Check size={11} className="text-gold shrink-0" />{f}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[{flag:"🇺🇸",label:"LLC Mỹ",href:"/incorporation/us-llc"},{flag:"🇸🇬",label:"Singapore",href:"/incorporation/singapore"},{flag:"🇭🇰",label:"Hồng Kông",href:"/incorporation/hong-kong"}].map(j => (
                    <Link key={j.label} href={j.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-gold/40 hover:text-gold transition-all">
                      <span>{j.flag}</span>{j.label}
                    </Link>
                  ))}
                </div>
                <Link href="/incorporation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {isVi ? "Xem chi tiết" : "Learn more"}<ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Accounting card */}
            <div className="group relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden hover:border-gold/40 transition-all card-glow">
              <div className="relative h-44 overflow-hidden">
                <Image src={PHOTOS.businessCall} alt="Expert accounting team" fill className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-ink-800" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-ink-900/80 backdrop-blur-sm border border-blue-500/30 px-2.5 py-1 rounded-full">
                    {isVi ? "Hàng tháng" : "Monthly"}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">{isVi ? "Kế toán & Tuân thủ" : "Accounting & Compliance"}</h3>
                </div>
                <p className="text-ink-300 leading-relaxed mb-5 text-sm">
                  {isVi
                    ? "Dịch vụ kế toán chuyên gia và thư ký công ty. Đầy đủ từ sổ sách hàng tháng đến báo cáo liên bang Mỹ."
                    : "Expert accounting and corporate secretarial services. From monthly bookkeeping to US federal reporting requirements."}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {(isVi ? ["Sổ sách hàng tháng","Khai báo thuế Mỹ","Form 5472","Chuyển tiền quốc tế"] : ["Monthly bookkeeping","US tax filing","Form 5472","International transfers"]).map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-ink-200"><Check size={11} className="text-blue-400 shrink-0" />{f}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[{label:isVi?"Kế toán":"Accounting",href:"/accounting"},{label:isVi?"Thư ký":"Secretary",href:"/compliance/secretary"},{label:isVi?"Báo cáo":"Filings",href:"/compliance/odi"}].map(item => (
                    <Link key={item.label} href={item.href} className="px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-blue-500/40 hover:text-blue-400 transition-all">{item.label}</Link>
                  ))}
                </div>
                <Link href="/accounting" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {isVi ? "Xem chi tiết" : "Learn more"}<ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════ */}
      <section className="py-16 border-y border-ink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,150,12,0.05)_0%,_transparent_65%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value:"200+", label: isVi ? "Doanh nghiệp\nđã thành lập" : "Companies\nincorporated", icon: Building2 },
              { value:"95%",  label: isVi ? "Khách hàng\ngiới thiệu Gloyce" : "Customers who\nrecommend us", icon: Star },
              { value:"3",    label: isVi ? "Quốc gia\nhỗ trợ" : "Countries\nsupported", icon: Globe2 },
              { value:"$2M+", label: isVi ? "Doanh thu khách\nhàng được tối ưu" : "Client revenue\noptimized", icon: TrendingUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.value} className="text-center group">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 mb-3 group-hover:bg-gold/15 transition-colors">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-gold-shimmer mb-1">{stat.value}</p>
                  <p className="text-xs text-ink-400 leading-snug whitespace-pre-line">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHO WE HELP
      ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {isVi ? "CHÚNG TÔI PHỤC VỤ AI" : "WHO WE HELP"}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            {isVi ? "Cho những doanh nhân sẵn sàng\nchinh phục thị trường toàn cầu" : "For founders ready to\nconquer global markets"}
          </h2>
          <p className="text-ink-300 mb-14 max-w-xl text-sm">
            {isVi
              ? "Dù bạn đang bán hàng online, vận hành startup hay xuất khẩu — Gloyce có giải pháp phù hợp."
              : "Whether you sell online, run a startup, or export goods — Gloyce has the right solution."}
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: ShoppingBag, emoji:"🛒", img: UX("1556761175-4b46a572b786",600,400),
                title: isVi ? "Seller thương mại điện tử" : "Ecommerce sellers",
                desc: isVi ? "Bán hàng trên Amazon, Shopee, TikTok Shop và muốn tối ưu dòng tiền quốc tế." : "Selling on Amazon, Shopee, TikTok Shop and looking to optimize cross-border cash flow.",
                href:"/accounting/ecommerce", tags:["Amazon","Shopee","TikTok Shop"] },
              { icon: Laptop, emoji:"💻", img: UX("1551434678-e076c223a692",600,400),
                title: isVi ? "Doanh nghiệp công nghệ" : "Tech & SaaS",
                desc: isVi ? "Startup, SaaS, agency kỹ thuật số cần cấu trúc công ty linh hoạt để nhận thanh toán quốc tế." : "Startups, SaaS, and digital agencies needing a flexible structure to receive global payments.",
                href:"/accounting", tags:["Stripe","PayPal","Wise"] },
              { icon: TrendingUp, emoji:"📈", img: UX("1542744173-8e7e53415bb0",600,400),
                title: isVi ? "Doanh nghiệp xuất khẩu" : "Export businesses",
                desc: isVi ? "Doanh nghiệp có giao dịch với đối tác nước ngoài, muốn nhận thanh toán quốc tế và quản lý dòng tiền hiệu quả qua tài khoản Mỹ." : "Businesses with foreign trade partners looking to receive international payments and manage cash flow through a US account.",
                href:"/compliance/odi", tags:["Mercury","Wise","Airwallex"] },
            ].map((seg) => {
              const Icon = seg.icon;
              return (
                <div key={seg.title} className="group relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden hover:border-gold/30 transition-all">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={seg.img} alt={seg.title} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 to-ink-800" />
                    <div className="absolute top-3 left-3">
                      <div className="w-9 h-9 rounded-xl bg-gold/10 backdrop-blur-sm border border-gold/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{seg.title}</h3>
                    <p className="text-sm text-ink-300 leading-relaxed mb-4">{seg.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {seg.tags.map(p => (
                        <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ink-700 border border-ink-600 text-ink-300">{p}</span>
                      ))}
                    </div>
                    <Link href={seg.href} className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light transition-colors">
                      {isVi ? "Tìm hiểu thêm" : "Learn more"}<ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY GLOYCE — full-width image + features
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Full-width image banner */}
          <div className="relative rounded-3xl overflow-hidden mb-14 h-56 sm:h-72 border border-ink-600">
            <Image src={PHOTOS.luxuryOffice} alt="Professional team at work" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-16 max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                {isVi ? "TẠI SAO CHỌN GLOYCE" : "WHY CHOOSE US"}
              </p>
              <h2 className="font-display text-2xl sm:text-4xl text-foreground leading-tight">
                {isVi ? "Từ thành lập đến vận hành,\nchúng tôi đồng hành cùng bạn" : "From founding to filing\nand beyond, we're with you"}
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Users2,    title: isVi ? "Chuyên gia ngôn ngữ & thị trường" : "Language & market experts",       body: isVi ? "Đội ngũ nói tiếng Việt, am hiểu bối cảnh kinh doanh Việt Nam và luật pháp Mỹ. Giao tiếp hoàn toàn bằng tiếng Việt, không cần dịch thuật." : "Our team speaks Vietnamese and understands both Vietnamese business context and US law. Communicate entirely in your language." },
              { icon: FileCheck, title: isVi ? "Tuân thủ pháp luật Mỹ từ đầu" : "US-compliant from day one", body: isVi ? "Setup đúng Operating Agreement, Registered Agent và nghĩa vụ liên bang ngay từ đầu — Form 5472, BOI Report, Annual Tax — không để gặp rủi ro pháp lý Mỹ." : "Set up Operating Agreement, Registered Agent, and federal obligations correctly — Form 5472, BOI Report, Annual Tax — keeping you out of US legal risk." },
              { icon: Clock,     title: isVi ? "Xử lý nhanh 7–14 ngày" : "Fast 7–14 day processing",  body: isVi ? "Quy trình tối ưu giúp doanh nghiệp hoạt động nhanh hơn — không chờ hàng tháng như dịch vụ truyền thống." : "Optimized process gets you operating faster — no waiting months like traditional services." },
              { icon: Shield,    title: isVi ? "Bảo mật & Minh bạch" : "Secure & transparent",       body: isVi ? "Toàn bộ tài liệu được bảo mật. Không có phí ẩn — bạn biết chính xác mình đang trả tiền cho gì." : "All documents are secure. No hidden fees — you know exactly what you're paying for." },
              { icon: Globe2,    title: isVi ? "Mạng lưới đối tác toàn cầu" : "Global partner network",  body: isVi ? "Kết nối với ngân hàng, cổng thanh toán và đối tác pháp lý hàng đầu tại Mỹ, Singapore, Hồng Kông." : "Connected with top banks, payment gateways, and legal partners in the US, Singapore, and HK." },
              { icon: Zap,       title: isVi ? "Dashboard theo dõi thực" : "Real-time dashboard",        body: isVi ? "Theo dõi tiến trình hồ sơ, xem tài liệu và nhận thông báo deadline qua dashboard cá nhân hóa." : "Track filing progress, view documents, and receive deadline alerts via your personal dashboard." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/25 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-ink-300 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="py-24 border-t border-ink-700 bg-ink-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {isVi ? "KHÁCH HÀNG NÓI VỀ CHÚNG TÔI" : "TESTIMONIALS"}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-12">
            {isVi ? "Câu chuyện từ những doanh nhân\nđã tin tưởng Gloyce" : "Stories from founders\nwho trusted Gloyce"}
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name:"Nguyễn Minh Tuấn", role: isVi ? "Founder, TechExport JSC" : "Founder, TechExport JSC",
                service:"US LLC", avatarBg:"C9960C",
                quote: isVi
                  ? "Gloyce đã giúp chúng tôi thành lập LLC Delaware trong vòng 10 ngày. Toàn bộ quy trình rõ ràng, đội ngũ hỗ trợ bằng tiếng Việt rất chuyên nghiệp."
                  : "Gloyce set up our Delaware LLC in 10 days. The whole process was crystal clear and the Vietnamese-speaking team was incredibly professional." },
              { name:"Trần Thị Hoa", role: isVi ? "Amazon Seller, TP.HCM" : "Amazon Seller, HCMC",
                service: isVi ? "Kế toán" : "Accounting", avatarBg:"3B7DD8",
                quote: isVi
                  ? "Tôi bán hàng trên Amazon và không hiểu gì về khai báo thuế Mỹ. Gloyce đã lo hết — từ EIN, Form 5472 đến kế toán hàng tháng. Rất đáng tin."
                  : "I sell on Amazon and knew nothing about US tax filings. Gloyce handled everything — EIN, Form 5472, and monthly accounting. Extremely trustworthy." },
              { name:"Lê Quốc Hùng", role:"CEO, Global Trade VN",
                service: isVi ? "Khai báo thuế Mỹ" : "US Tax Filing", avatarBg:"10B981",
                quote: isVi
                  ? "Gloyce giải thích rõ ràng Form 5472 và các nghĩa vụ thuế liên bang cho LLC nước ngoài. Rất nhiều đơn vị không am hiểu phần này — Gloyce hướng dẫn cụ thể từng bước."
                  : "Gloyce clearly explained Form 5472 and federal tax obligations for a foreign-owned LLC. Very few providers understand this — Gloyce guided me step by step." },
            ].map((t, i) => (
              <div key={i} className="group bg-ink-800 border border-ink-600 rounded-3xl p-7 hover:border-gold/30 transition-all flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={13} className="fill-gold text-gold" />)}
                </div>
                <Quote className="w-7 h-7 text-gold/20 mb-3" />
                <p className="text-sm text-ink-200 leading-relaxed mb-5 italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                    {t.service}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-ink-700">
                  {/* Avatar via UI Avatars */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl(t.name, t.avatarBg)}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CUSTOMER STORY
      ═══════════════════════════════════════════ */}
      <section className="py-16 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
              {/* Photo side */}
              <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                <Image src={PHOTOS.globalHandshake} alt="Business success story" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-800 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-800 md:hidden" />
                <div className="absolute top-4 left-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-ink-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold/20">
                    {isVi ? "CÂU CHUYỆN KHÁCH HÀNG" : "CUSTOMER STORY"}
                  </p>
                </div>
              </div>
              {/* Content side */}
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
                  {isVi
                    ? <>&ldquo;Gloyce giúp chúng tôi tiết kiệm <span className="text-gold-gradient">15 giờ/tháng</span> và tái đầu tư vào tăng trưởng&rdquo;</>
                    : <>&ldquo;Gloyce saved us <span className="text-gold-gradient">15 hours a month</span> and we reinvested into growth&rdquo;</>}
                </h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-6">
                  {isVi
                    ? "Nguyen Trading LLC bán hàng trên Amazon từ 2022. Trước khi dùng Gloyce, họ mất hàng chục giờ/tháng để tự quản lý sổ sách — không có chuyên môn và luôn lo lắng về rủi ro pháp lý Mỹ."
                    : "Nguyen Trading LLC has been selling on Amazon since 2022. Before Gloyce, they spent dozens of hours each month managing their own books — with no expertise and constant anxiety about US legal risk."}
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { v:"15h", l: isVi ? "tiết kiệm/tháng" : "saved/month" },
                    { v:"2+",  l: isVi ? "năm dùng Gloyce" : "years with us" },
                    { v:"$180K", l: isVi ? "doanh thu/năm" : "revenue/year" },
                  ].map(s => (
                    <div key={s.l} className="bg-ink-700 border border-ink-600 rounded-xl px-3 py-3 text-center">
                      <p className="text-lg font-black text-gold">{s.v}</p>
                      <p className="text-[10px] text-ink-400 leading-tight mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <Link href="/resources/stories" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {isVi ? "Đọc câu chuyện đầy đủ" : "Read the full story"}
                  <ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden border border-gold/20">
            {/* Background */}
            <div className="absolute inset-0 bg-ink-800" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,150,12,0.15)_0%,_transparent_65%)]" />
            <div className="absolute inset-0 bg-dot-grid opacity-20" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="relative px-8 sm:px-14 py-16 sm:py-20 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-5">
                {isVi ? "BẮT ĐẦU NGAY HÔM NAY" : "START TODAY"}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
                {isVi
                  ? <>Sẵn sàng đưa doanh nghiệp<br /><span className="text-gold-gradient">ra toàn cầu?</span></>
                  : <>Ready to take your business<br /><span className="text-gold-gradient">global?</span></>}
              </h2>
              <p className="text-ink-300 mb-10 max-w-xl mx-auto">
                {isVi
                  ? "Hơn 200 doanh nghiệp Việt Nam đã tin tưởng Gloyce. Đặt lịch tư vấn miễn phí ngay hôm nay — không cam kết, không ràng buộc."
                  : "Over 200 Vietnamese businesses already trust Gloyce. Book a free consultation today — no commitment, no strings attached."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold text-ink-900 font-bold hover:bg-gold-light transition-all shadow-[0_0_40px_rgba(201,150,12,0.35)] hover:shadow-[0_0_50px_rgba(201,150,12,0.5)] hover:-translate-y-0.5">
                  {isVi ? "Đặt lịch tư vấn miễn phí" : "Book a free consultation"}<ArrowRight size={16} />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-ink-500 text-foreground hover:bg-ink-700 hover:border-ink-400 transition-all">
                  {isVi ? "Xem bảng giá" : "View pricing"}
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-400">
                {[
                  isVi ? "✓ Không phí ẩn" : "✓ No hidden fees",
                  isVi ? "✓ Hỗ trợ tiếng Việt" : "✓ Vietnamese support",
                  isVi ? "✓ IRS & State compliant" : "✓ IRS & State compliant",
                  isVi ? "✓ Bảo mật tài liệu" : "✓ Document security",
                ].map(b => <span key={b} className="font-medium">{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
