import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  ArrowRight, Star, Building2, Calculator, FileCheck,
  Check, Quote, TrendingUp, ShoppingBag, Laptop,
  ChevronRight, Shield, Clock, Globe2, BadgeCheck,
  Zap, Users2,
} from "lucide-react";

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

function avatarUrl(name: string, bg = "C9960C", fg = "06091A") {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${fg}&bold=true&size=96&format=svg`;
}

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
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  return (
    <main className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_30%,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_80%,_rgba(59,125,216,0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-ink-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-semibold text-gold tracking-wide">
                {t("Được tin dùng bởi 200+ doanh nghiệp", "Trusted by 200+ businesses", "200+家企业信赖", "Confiado por más de 200 empresas", "Dipercaya oleh 200+ bisnis")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="font-display italic text-gold-gradient block mb-1">
                {t("Thành lập. Vận hành.", "Incorporate. Operate.", "成立公司。运营。", "Incorpora. Opera.", "Dirikan. Operasikan.")}
              </span>
              <span className="text-foreground">
                {t("Mở rộng ra toàn cầu.", "Scale globally.", "全球扩展。", "Escala globalmente.", "Berkembang secara global.")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-300 leading-relaxed mb-8 max-w-lg">
              {t(
                "Gloyce giúp doanh nghiệp Việt Nam thành lập công ty, vận hành kế toán và mở rộng ra thị trường quốc tế — trọn gói tuân thủ từ một nơi.",
                "Gloyce helps Vietnamese businesses incorporate, run accounting, and expand globally — fully compliant, all from one place.",
                "Gloyce帮助越南企业成立公司、管理会计并拓展全球市场——合规完整，一站式服务。",
                "Gloyce ayuda a empresas vietnamitas a constituirse, gestionar su contabilidad y expandirse globalmente — totalmente conforme, todo en un solo lugar.",
                "Gloyce membantu bisnis Vietnam mendirikan perusahaan, menjalankan akuntansi, dan berkembang ke pasar global — patuh penuh, semua dari satu tempat."
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-ink-900 font-bold text-sm hover:bg-gold-light transition-all shadow-[0_0_40px_rgba(201,150,12,0.35)] hover:shadow-[0_0_50px_rgba(201,150,12,0.50)] hover:-translate-y-0.5">
                {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={16} />
              </Link>
              <Link href="/contact?tab=call"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-ink-500 text-foreground text-sm hover:bg-ink-800 hover:border-gold/30 transition-all">
                {t("Đặt lịch tư vấn", "Schedule a call", "预约咨询", "Agendar una llamada", "Jadwalkan panggilan")}
              </Link>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-gold text-gold" />)}</div>
                <span className="text-sm font-bold text-foreground">4.9</span>
                <span className="text-xs text-ink-400">/ 180 {t("đánh giá", "reviews", "条评价", "reseñas", "ulasan")}</span>
              </div>
              <div className="w-px h-4 bg-ink-600" />
              <span className="text-xs text-ink-300">
                {t("200+ doanh nghiệp · 15+ quốc gia", "200+ businesses · 15+ countries", "200+家企业 · 15+个国家", "200+ empresas · 15+ países", "200+ bisnis · 15+ negara")}
              </span>
            </div>
          </div>

          {/* Globe + floating cards */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            <div className="relative w-72 h-72 animate-float">
              <div className="absolute inset-0 bg-gold/5 rounded-full blur-3xl" />
              <GlobeVisual />
              <div className="absolute -top-4 -left-8 bg-ink-800/95 backdrop-blur-sm border border-gold/25 rounded-2xl px-4 py-3 shadow-2xl z-10">
                <p className="text-[10px] text-ink-400 mb-0.5">{t("Thành lập tại", "Incorporated in", "注册于", "Incorporado en", "Didirikan di")}</p>
                <div className="flex items-center gap-2">
                  <span className="text-base">🇺🇸</span>
                  <p className="text-sm font-bold text-foreground">Irvine, CA</p>
                </div>
              </div>
              <div className="absolute top-1/2 -right-14 -translate-y-1/2 bg-ink-800/95 backdrop-blur-sm border border-gold/20 rounded-xl px-3 py-2.5 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-emerald-400 shrink-0" />
                  <p className="text-xs font-semibold text-foreground">IRS Registered</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-ink-800/95 backdrop-blur-sm border border-gold/20 rounded-2xl px-4 py-3 shadow-2xl z-10">
                <p className="text-[10px] text-ink-400 mb-0.5">{t("Xử lý trong", "Done in", "完成于", "Procesado en", "Selesai dalam")}</p>
                <p className="text-sm font-bold text-gold">7–14 {t("ngày", "days", "天", "días", "hari")}</p>
              </div>
            </div>
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

      {/* PARTNER STRIP */}
      <section className="border-y border-ink-700 py-5 bg-ink-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400 shrink-0">
              {t("Kết nối với", "Works with", "适配", "Compatible con", "Bekerja dengan")}
            </p>
            {["🏦 Mercury Bank","💳 Stripe","💸 Wise","📦 Amazon FBA","🛍️ Shopee Global","🎵 TikTok Shop","✈️ Payoneer"].map(p => (
              <div key={p} className="logo-pill">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: PHOTOS.luxuryOffice,    label: t("Tư vấn 1-1 online", "1-on-1 online advisory", "线上一对一咨询", "Asesoría online 1 a 1", "Konsultasi online 1-1"), overlay: "from-ink-900/70" },
              { src: PHOTOS.globalHandshake, label: t("Kết nối đối tác quốc tế", "Global partner network", "全球合作伙伴网络", "Red de socios globales", "Jaringan mitra global"), overlay: "from-ink-900/60" },
              { src: PHOTOS.laptopWork,      label: t("Kế toán theo thời gian thực", "Real-time accounting", "实时会计", "Contabilidad en tiempo real", "Akuntansi real-time"), overlay: "from-ink-900/60" },
              { src: PHOTOS.businessCall,    label: t("Họp chiến lược doanh nghiệp", "Business strategy meetings", "商业战略会议", "Reuniones de estrategia empresarial", "Pertemuan strategi bisnis"), overlay: "from-ink-900/70" },
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

      {/* WHAT WE DO */}
      <section className="py-24 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("CHÚNG TÔI LÀM GÌ", "WHAT WE DO", "我们做什么", "LO QUE HACEMOS", "APA YANG KAMI LAKUKAN")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
            {t("Dịch vụ linh hoạt cho mọi giai đoạn doanh nghiệp", "Flexible services for every stage of your business", "适合每个业务阶段的灵活服务", "Servicios flexibles para cada etapa de tu negocio", "Layanan fleksibel untuk setiap tahap bisnis Anda")}
          </h2>
          <p className="text-ink-300 mb-14 max-w-xl text-sm">
            {t(
              "Từ thành lập đến kế toán và tuân thủ — Gloyce bao phủ toàn bộ hành trình quốc tế hóa doanh nghiệp.",
              "From incorporation to accounting and compliance — Gloyce covers your entire internationalization journey.",
              "从成立公司到会计和合规——Gloyce覆盖您整个国际化旅程。",
              "Desde la incorporación hasta la contabilidad y el cumplimiento — Gloyce cubre todo tu camino de internacionalización.",
              "Dari pendirian hingga akuntansi dan kepatuhan — Gloyce mencakup seluruh perjalanan internasionalisasi bisnis Anda."
            )}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Incorporation card */}
            <div className="group relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden hover:border-gold/40 transition-all card-glow">
              <div className="relative h-44 overflow-hidden">
                <Image src={PHOTOS.teamSmiling} alt="Team working on incorporation" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/30 to-ink-800" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-ink-900/80 backdrop-blur-sm border border-gold/30 px-2.5 py-1 rounded-full">
                    {t("Từ $499", "From $499", "起价$499", "Desde $499", "Mulai $499")}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">
                    {t("Thành lập công ty", "Incorporate", "成立公司", "Incorporación", "Pendirian Perusahaan")}
                  </h3>
                </div>
                <p className="text-ink-300 leading-relaxed mb-5 text-sm">
                  {t(
                    "Thành lập công ty nhanh chóng tại Mỹ, Singapore hoặc Hồng Kông. Bao gồm EIN, tài khoản ngân hàng và địa chỉ đăng ký.",
                    "Register your company fast in the US, Singapore or Hong Kong. Includes EIN, business bank account, and registered address from day one.",
                    "快速在美国、新加坡或香港注册公司。包括EIN、企业银行账户和注册地址。",
                    "Registra tu empresa rápido en EE.UU., Singapur o Hong Kong. Incluye EIN, cuenta bancaria empresarial y dirección registrada.",
                    "Daftarkan perusahaan Anda dengan cepat di AS, Singapura, atau Hong Kong. Termasuk EIN, rekening bank bisnis, dan alamat terdaftar."
                  )}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {ta({
                    vi: ["LLC Delaware","EIN & ITIN","Địa chỉ đăng ký","Tài khoản Mercury"],
                    en: ["Delaware LLC","EIN & ITIN","Registered address","Mercury account"],
                    zh: ["特拉华州LLC","EIN & ITIN","注册地址","Mercury账户"],
                    es: ["LLC Delaware","EIN & ITIN","Dirección registrada","Cuenta Mercury"],
                    id: ["LLC Delaware","EIN & ITIN","Alamat terdaftar","Akun Mercury"],
                  }, ["Delaware LLC","EIN & ITIN","Registered address","Mercury account"]).map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-ink-200"><Check size={11} className="text-gold shrink-0" />{f}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    {flag:"🇺🇸",label:t("LLC Mỹ","US LLC","美国LLC","LLC en EE.UU.","LLC di AS"),href:"/incorporation/us-llc"},
                    {flag:"🇸🇬",label:"Singapore",href:"/incorporation/singapore"},
                    {flag:"🇭🇰",label:t("Hồng Kông","Hong Kong","香港","Hong Kong","Hong Kong"),href:"/incorporation/hong-kong"},
                  ].map(j => (
                    <Link key={j.href} href={j.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-gold/40 hover:text-gold transition-all">
                      <span>{j.flag}</span>{j.label}
                    </Link>
                  ))}
                </div>
                <Link href="/incorporation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {t("Xem chi tiết", "Learn more", "了解详情", "Más información", "Pelajari lebih lanjut")}<ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
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
                    {t("Hàng tháng", "Monthly", "按月计费", "Mensual", "Bulanan")}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground">
                    {t("Kế toán & Tuân thủ", "Accounting & Compliance", "会计与合规", "Contabilidad y Cumplimiento", "Akuntansi & Kepatuhan")}
                  </h3>
                </div>
                <p className="text-ink-300 leading-relaxed mb-5 text-sm">
                  {t(
                    "Dịch vụ kế toán chuyên gia và thư ký công ty. Đầy đủ từ sổ sách hàng tháng đến báo cáo liên bang Mỹ.",
                    "Expert accounting and corporate secretarial services. From monthly bookkeeping to US federal reporting requirements.",
                    "专业会计和公司秘书服务。从每月簿记到美国联邦报告要求，应有尽有。",
                    "Servicios expertos de contabilidad y secretaría corporativa. Desde libros mensuales hasta reportes federales de EE.UU.",
                    "Layanan akuntansi ahli dan sekretaris perusahaan. Dari pembukuan bulanan hingga persyaratan pelaporan federal AS."
                  )}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {ta({
                    vi: ["Sổ sách hàng tháng","Khai báo thuế Mỹ","Form 5472","Chuyển tiền quốc tế"],
                    en: ["Monthly bookkeeping","US tax filing","Form 5472","International transfers"],
                    zh: ["每月簿记","美国税务申报","Form 5472","国际汇款"],
                    es: ["Contabilidad mensual","Declaración fiscal EE.UU.","Form 5472","Transferencias internacionales"],
                    id: ["Pembukuan bulanan","Pengajuan pajak AS","Form 5472","Transfer internasional"],
                  }, ["Monthly bookkeeping","US tax filing","Form 5472","International transfers"]).map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-ink-200"><Check size={11} className="text-blue-400 shrink-0" />{f}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    {label:t("Kế toán","Accounting","会计","Contabilidad","Akuntansi"),href:"/accounting"},
                    {label:t("Thư ký","Secretary","公司秘书","Secretaría","Sekretaris"),href:"/compliance/secretary"},
                    {label:t("Báo cáo","Filings","申报","Declaraciones","Pelaporan"),href:"/compliance/odi"},
                  ].map(item => (
                    <Link key={item.href} href={item.href} className="px-3 py-1.5 rounded-lg border border-ink-600 text-xs text-ink-200 hover:border-blue-500/40 hover:text-blue-400 transition-all">{item.label}</Link>
                  ))}
                </div>
                <Link href="/accounting" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {t("Xem chi tiết", "Learn more", "了解详情", "Más información", "Pelajari lebih lanjut")}<ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-ink-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,150,12,0.05)_0%,_transparent_65%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value:"200+", label: t("Doanh nghiệp\nđã thành lập", "Companies\nincorporated", "已成立\n企业", "Empresas\nincorporadas", "Perusahaan\ndidirikan"), icon: Building2 },
              { value:"95%",  label: t("Khách hàng\ngiới thiệu Gloyce", "Customers who\nrecommend us", "推荐Gloyce\n的客户", "Clientes que\nnos recomiendan", "Pelanggan yang\nmerekomendasikan"), icon: Star },
              { value:"3",    label: t("Quốc gia\nhỗ trợ", "Countries\nsupported", "支持\n国家", "Países\napoyados", "Negara\nyang didukung"), icon: Globe2 },
              { value:"$2M+", label: t("Doanh thu khách\nhàng được tối ưu", "Client revenue\noptimized", "客户营收\n优化", "Ingresos de\nclientes optimizados", "Pendapatan klien\nyang dioptimalkan"), icon: TrendingUp },
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

      {/* WHO WE HELP */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("CHÚNG TÔI PHỤC VỤ AI", "WHO WE HELP", "我们服务谁", "A QUIÉN AYUDAMOS", "SIAPA YANG KAMI BANTU")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            {t("Cho những doanh nhân sẵn sàng chinh phục thị trường toàn cầu", "For founders ready to conquer global markets", "为准备征服全球市场的创始人", "Para fundadores listos para conquistar mercados globales", "Untuk para pendiri yang siap menaklukkan pasar global")}
          </h2>
          <p className="text-ink-300 mb-14 max-w-xl text-sm">
            {t(
              "Dù bạn đang bán hàng online, vận hành startup hay xuất khẩu — Gloyce có giải pháp phù hợp.",
              "Whether you sell online, run a startup, or export goods — Gloyce has the right solution.",
              "无论您是在线销售、运营初创企业还是出口商品——Gloyce都有适合的解决方案。",
              "Ya sea que vendas online, dirijas una startup o exportes bienes — Gloyce tiene la solución adecuada.",
              "Apakah Anda berjualan online, menjalankan startup, atau mengekspor barang — Gloyce memiliki solusi yang tepat."
            )}
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: ShoppingBag, img: UX("1556761175-4b46a572b786",600,400),
                title: t("Seller thương mại điện tử","Ecommerce sellers","电商卖家","Vendedores de ecommerce","Penjual ecommerce"),
                desc: t(
                  "Bán hàng trên Amazon, Shopee, TikTok Shop và muốn tối ưu dòng tiền quốc tế.",
                  "Selling on Amazon, Shopee, TikTok Shop and looking to optimize cross-border cash flow.",
                  "在Amazon、Shopee、TikTok Shop上销售，希望优化跨境资金流的卖家。",
                  "Vendiendo en Amazon, Shopee, TikTok Shop y buscando optimizar el flujo de caja internacional.",
                  "Berjualan di Amazon, Shopee, TikTok Shop dan ingin mengoptimalkan arus kas lintas negara."
                ),
                href:"/accounting/ecommerce", tags:["Amazon","Shopee","TikTok Shop"] },
              { icon: Laptop, img: UX("1551434678-e076c223a692",600,400),
                title: t("Doanh nghiệp công nghệ","Tech & SaaS","科技与SaaS","Tech y SaaS","Tech & SaaS"),
                desc: t(
                  "Startup, SaaS, agency kỹ thuật số cần cấu trúc công ty linh hoạt để nhận thanh toán quốc tế.",
                  "Startups, SaaS, and digital agencies needing a flexible structure to receive global payments.",
                  "初创企业、SaaS和数字代理需要灵活的公司结构以接收国际付款。",
                  "Startups, SaaS y agencias digitales que necesitan una estructura flexible para recibir pagos globales.",
                  "Startup, SaaS, dan agensi digital yang membutuhkan struktur perusahaan fleksibel untuk menerima pembayaran global."
                ),
                href:"/accounting", tags:["Stripe","PayPal","Wise"] },
              { icon: TrendingUp, img: UX("1542744173-8e7e53415bb0",600,400),
                title: t("Doanh nghiệp xuất khẩu","Export businesses","出口企业","Empresas exportadoras","Bisnis ekspor"),
                desc: t(
                  "Doanh nghiệp có giao dịch với đối tác nước ngoài, muốn nhận thanh toán quốc tế và quản lý dòng tiền hiệu quả qua tài khoản Mỹ.",
                  "Businesses with foreign trade partners looking to receive international payments and manage cash flow through a US account.",
                  "与外国贸易伙伴有往来的企业，希望通过美国账户接收国际付款和管理资金流。",
                  "Empresas con socios comerciales extranjeros que buscan recibir pagos internacionales y gestionar su flujo de caja a través de una cuenta en EE.UU.",
                  "Bisnis dengan mitra dagang asing yang ingin menerima pembayaran internasional dan mengelola arus kas melalui rekening AS."
                ),
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
                      {t("Tìm hiểu thêm","Learn more","了解更多","Saber más","Pelajari lebih lanjut")}<ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY GLOYCE */}
      <section className="py-24 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden mb-14 h-56 sm:h-72 border border-ink-600">
            <Image src={PHOTOS.luxuryOffice} alt="Professional team at work" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-16 max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                {t("TẠI SAO CHỌN GLOYCE", "WHY CHOOSE US", "为什么选择GLOYCE", "POR QUÉ ELEGIRNOS", "MENGAPA MEMILIH GLOYCE")}
              </p>
              <h2 className="font-display text-2xl sm:text-4xl text-foreground leading-tight">
                {t(
                  "Từ thành lập đến vận hành, chúng tôi đồng hành cùng bạn",
                  "From founding to filing and beyond, we're with you",
                  "从成立到申报，我们始终与您同行",
                  "Desde la fundación hasta la presentación, estamos contigo",
                  "Dari pendirian hingga pelaporan, kami bersama Anda"
                )}
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Users2,
                title: t("Chuyên gia ngôn ngữ & thị trường","Language & market experts","语言与市场专家","Expertos en idioma y mercado","Ahli bahasa & pasar"),
                body: t(
                  "Đội ngũ nói tiếng Việt, am hiểu bối cảnh kinh doanh Việt Nam và luật pháp Mỹ. Giao tiếp hoàn toàn bằng tiếng Việt, không cần dịch thuật.",
                  "Our team speaks Vietnamese and understands both Vietnamese business context and US law. Communicate entirely in your language.",
                  "我们的团队会说越南语，了解越南商业背景和美国法律。完全用您的语言沟通，无需翻译。",
                  "Nuestro equipo habla vietnamita y entiende el contexto empresarial vietnamita y la ley de EE.UU. Comuníquese completamente en su idioma.",
                  "Tim kami berbahasa Vietnam dan memahami konteks bisnis Vietnam serta hukum AS. Berkomunikasi sepenuhnya dalam bahasa Anda."
                ) },
              { icon: FileCheck,
                title: t("Tuân thủ pháp luật Mỹ từ đầu","US-compliant from day one","从第一天起遵守美国法律","Cumplimiento en EE.UU. desde el primer día","Patuh hukum AS sejak hari pertama"),
                body: t(
                  "Setup đúng Operating Agreement, Registered Agent và nghĩa vụ liên bang ngay từ đầu — Form 5472, BOI Report, Annual Tax — không để gặp rủi ro pháp lý Mỹ.",
                  "Set up Operating Agreement, Registered Agent, and federal obligations correctly — Form 5472, BOI Report, Annual Tax — keeping you out of US legal risk.",
                  "正确设置经营协议、注册代理人和联邦义务——Form 5472、BOI报告、年度税务——让您远离美国法律风险。",
                  "Configure correctamente el Acuerdo Operativo, Agente Registrado y obligaciones federales — Form 5472, BOI Report, Impuesto Anual — manteniéndote fuera del riesgo legal de EE.UU.",
                  "Siapkan Perjanjian Operasi, Agen Terdaftar, dan kewajiban federal dengan benar — Form 5472, BOI Report, Pajak Tahunan — jauhkan Anda dari risiko hukum AS."
                ) },
              { icon: Clock,
                title: t("Xử lý nhanh 7–14 ngày","Fast 7–14 day processing","快速处理7–14天","Procesamiento rápido en 7–14 días","Proses cepat 7–14 hari"),
                body: t(
                  "Quy trình tối ưu giúp doanh nghiệp hoạt động nhanh hơn — không chờ hàng tháng như dịch vụ truyền thống.",
                  "Optimized process gets you operating faster — no waiting months like traditional services.",
                  "优化的流程让您更快运营——无需像传统服务那样等待数月。",
                  "El proceso optimizado te pone en marcha más rápido — sin esperar meses como los servicios tradicionales.",
                  "Proses yang dioptimalkan membuat Anda beroperasi lebih cepat — tidak perlu menunggu berbulan-bulan seperti layanan tradisional."
                ) },
              { icon: Shield,
                title: t("Bảo mật & Minh bạch","Secure & transparent","安全透明","Seguro y transparente","Aman & transparan"),
                body: t(
                  "Toàn bộ tài liệu được bảo mật. Không có phí ẩn — bạn biết chính xác mình đang trả tiền cho gì.",
                  "All documents are secure. No hidden fees — you know exactly what you're paying for.",
                  "所有文件都是安全的。没有隐藏费用——您确切知道自己在为什么付费。",
                  "Todos los documentos son seguros. Sin tarifas ocultas — sabes exactamente por qué estás pagando.",
                  "Semua dokumen aman. Tidak ada biaya tersembunyi — Anda tahu persis apa yang Anda bayar."
                ) },
              { icon: Globe2,
                title: t("Mạng lưới đối tác toàn cầu","Global partner network","全球合作伙伴网络","Red de socios globales","Jaringan mitra global"),
                body: t(
                  "Kết nối với ngân hàng, cổng thanh toán và đối tác pháp lý hàng đầu tại Mỹ, Singapore, Hồng Kông.",
                  "Connected with top banks, payment gateways, and legal partners in the US, Singapore, and HK.",
                  "与美国、新加坡、香港的顶级银行、支付网关和法律合作伙伴保持联系。",
                  "Conectado con los mejores bancos, pasarelas de pago y socios legales en EE.UU., Singapur y HK.",
                  "Terhubung dengan bank, gateway pembayaran, dan mitra hukum terkemuka di AS, Singapura, dan HK."
                ) },
              { icon: Zap,
                title: t("Dashboard theo dõi thực","Real-time dashboard","实时仪表板","Panel de control en tiempo real","Dashboard real-time"),
                body: t(
                  "Theo dõi tiến trình hồ sơ, xem tài liệu và nhận thông báo deadline qua dashboard cá nhân hóa.",
                  "Track filing progress, view documents, and receive deadline alerts via your personal dashboard.",
                  "通过个人仪表板跟踪申报进度、查看文件并接收截止日期提醒。",
                  "Rastrea el progreso de presentación, visualiza documentos y recibe alertas de plazos en tu panel personalizado.",
                  "Pantau progres pengajuan, lihat dokumen, dan terima peringatan tenggat waktu melalui dashboard personal Anda."
                ) },
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

      {/* TESTIMONIALS */}
      <section className="py-24 border-t border-ink-700 bg-ink-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("KHÁCH HÀNG NÓI VỀ CHÚNG TÔI", "TESTIMONIALS", "客户评价", "TESTIMONIOS", "TESTIMONI")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-12">
            {t("Câu chuyện từ những doanh nhân đã tin tưởng Gloyce", "Stories from founders who trusted Gloyce", "信任Gloyce的创始人的故事", "Historias de fundadores que confiaron en Gloyce", "Kisah para pendiri yang mempercayai Gloyce")}
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name:"Nguyễn Minh Tuấn", role: t("Founder, TechExport JSC","Founder, TechExport JSC","TechExport JSC创始人","Fundador, TechExport JSC","Pendiri, TechExport JSC"),
                service:"US LLC", avatarBg:"C9960C",
                quote: t(
                  "Gloyce đã giúp chúng tôi thành lập LLC Delaware trong vòng 10 ngày. Toàn bộ quy trình rõ ràng, đội ngũ hỗ trợ bằng tiếng Việt rất chuyên nghiệp.",
                  "Gloyce set up our Delaware LLC in 10 days. The whole process was crystal clear and the Vietnamese-speaking team was incredibly professional.",
                  "Gloyce在10天内帮我们设立了特拉华州LLC。整个流程清晰透明，越南语团队非常专业。",
                  "Gloyce configuró nuestra LLC de Delaware en 10 días. Todo el proceso fue muy claro y el equipo de habla vietnamita fue increíblemente profesional.",
                  "Gloyce mendirikan LLC Delaware kami dalam 10 hari. Seluruh proses sangat jelas dan tim berbahasa Vietnam sangat profesional."
                ) },
              { name:"Trần Thị Hoa", role: t("Amazon Seller, TP.HCM","Amazon Seller, HCMC","亚马逊卖家，胡志明市","Amazon Seller, Ciudad Ho Chi Minh","Amazon Seller, HCMC"),
                service: t("Kế toán","Accounting","会计","Contabilidad","Akuntansi"), avatarBg:"3B7DD8",
                quote: t(
                  "Tôi bán hàng trên Amazon và không hiểu gì về khai báo thuế Mỹ. Gloyce đã lo hết — từ EIN, Form 5472 đến kế toán hàng tháng. Rất đáng tin.",
                  "I sell on Amazon and knew nothing about US tax filings. Gloyce handled everything — EIN, Form 5472, and monthly accounting. Extremely trustworthy.",
                  "我在Amazon上销售，对美国税务申报一无所知。Gloyce处理了一切——EIN、Form 5472和每月会计。非常值得信赖。",
                  "Vendo en Amazon y no sabía nada sobre declaraciones de impuestos en EE.UU. Gloyce lo manejó todo — EIN, Form 5472 y contabilidad mensual. Extremadamente confiable.",
                  "Saya berjualan di Amazon dan tidak tahu apa-apa tentang pengajuan pajak AS. Gloyce menangani semuanya — EIN, Form 5472, dan akuntansi bulanan. Sangat terpercaya."
                ) },
              { name:"Lê Quốc Hùng", role:"CEO, Global Trade VN",
                service: t("Khai báo thuế Mỹ","US Tax Filing","美国税务申报","Declaración fiscal en EE.UU.","Pengajuan pajak AS"), avatarBg:"10B981",
                quote: t(
                  "Gloyce giải thích rõ ràng Form 5472 và các nghĩa vụ thuế liên bang cho LLC nước ngoài. Rất nhiều đơn vị không am hiểu phần này — Gloyce hướng dẫn cụ thể từng bước.",
                  "Gloyce clearly explained Form 5472 and federal tax obligations for a foreign-owned LLC. Very few providers understand this — Gloyce guided me step by step.",
                  "Gloyce清楚地解释了外资LLC的Form 5472和联邦税务义务。很少有服务商了解这部分——Gloyce一步一步指导我。",
                  "Gloyce explicó claramente Form 5472 y las obligaciones fiscales federales para una LLC de propiedad extranjera. Muy pocos proveedores entienden esto — Gloyce me guió paso a paso.",
                  "Gloyce menjelaskan dengan jelas Form 5472 dan kewajiban pajak federal untuk LLC milik asing. Sangat sedikit penyedia yang memahami ini — Gloyce membimbing saya langkah demi langkah."
                ) },
            ].map((testimonial, i) => (
              <div key={i} className="group bg-ink-800 border border-ink-600 rounded-3xl p-7 hover:border-gold/30 transition-all flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={13} className="fill-gold text-gold" />)}
                </div>
                <Quote className="w-7 h-7 text-gold/20 mb-3" />
                <p className="text-sm text-ink-200 leading-relaxed mb-5 italic flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-ink-700">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarUrl(testimonial.name, testimonial.avatarBg)} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-ink-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER STORY */}
      <section className="py-16 border-t border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative bg-ink-800 border border-ink-600 rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
              <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                <Image src={PHOTOS.globalHandshake} alt="Business success story" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-800 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-800 md:hidden" />
                <div className="absolute top-4 left-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-ink-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold/20">
                    {t("CÂU CHUYỆN KHÁCH HÀNG", "CUSTOMER STORY", "客户故事", "HISTORIA DE CLIENTE", "KISAH PELANGGAN")}
                  </p>
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
                  &ldquo;{t("Gloyce giúp chúng tôi tiết kiệm", "Gloyce saved us", "Gloyce帮我们节省了", "Gloyce nos ahorró", "Gloyce membantu kami menghemat")} <span className="text-gold-gradient">{t("15 giờ/tháng", "15 hours a month", "每月15小时", "15 horas al mes", "15 jam/bulan")}</span> {t("và tái đầu tư vào tăng trưởng", "and we reinvested into growth", "并重新投资于增长", "y lo reinvertimos en crecimiento", "dan menginvestasikannya kembali untuk pertumbuhan")}&rdquo;
                </h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-6">
                  {t(
                    "Nguyen Trading LLC bán hàng trên Amazon từ 2022. Trước khi dùng Gloyce, họ mất hàng chục giờ/tháng để tự quản lý sổ sách — không có chuyên môn và luôn lo lắng về rủi ro pháp lý Mỹ.",
                    "Nguyen Trading LLC has been selling on Amazon since 2022. Before Gloyce, they spent dozens of hours each month managing their own books — with no expertise and constant anxiety about US legal risk.",
                    "Nguyen Trading LLC自2022年起在Amazon上销售。在使用Gloyce之前，他们每月花费数十小时自己管理账簿——没有专业知识，并且一直担心美国法律风险。",
                    "Nguyen Trading LLC vende en Amazon desde 2022. Antes de Gloyce, pasaban decenas de horas al mes gestionando sus propios libros — sin experiencia y con constante ansiedad por el riesgo legal en EE.UU.",
                    "Nguyen Trading LLC telah berjualan di Amazon sejak 2022. Sebelum Gloyce, mereka menghabiskan puluhan jam setiap bulan untuk mengelola buku mereka sendiri — tanpa keahlian dan selalu khawatir tentang risiko hukum AS."
                  )}
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { v:"15h", l: t("tiết kiệm/tháng","saved/month","每月节省","ahorrado/mes","hemat/bulan") },
                    { v:"2+",  l: t("năm dùng Gloyce","years with us","年使用Gloyce","años con nosotros","tahun bersama kami") },
                    { v:"$180K", l: t("doanh thu/năm","revenue/year","年营收","ingresos/año","pendapatan/tahun") },
                  ].map(s => (
                    <div key={s.l} className="bg-ink-700 border border-ink-600 rounded-xl px-3 py-3 text-center">
                      <p className="text-lg font-black text-gold">{s.v}</p>
                      <p className="text-[10px] text-ink-400 leading-tight mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <Link href="/resources/stories" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                  {t("Đọc câu chuyện đầy đủ","Read the full story","阅读完整故事","Leer la historia completa","Baca kisah selengkapnya")}
                  <ArrowRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden border border-gold/20">
            <div className="absolute inset-0 bg-ink-800" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,150,12,0.15)_0%,_transparent_65%)]" />
            <div className="absolute inset-0 bg-dot-grid opacity-20" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="relative px-8 sm:px-14 py-16 sm:py-20 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-5">
                {t("BẮT ĐẦU NGAY HÔM NAY", "START TODAY", "立即开始", "COMIENZA HOY", "MULAI HARI INI")}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
                {t("Sẵn sàng đưa doanh nghiệp", "Ready to take your business", "准备好将您的业务", "¿Listo para llevar tu negocio", "Siap membawa bisnis Anda")}<br />
                <span className="text-gold-gradient">
                  {t("ra toàn cầu?", "global?", "推向全球了吗？", "al mundo?", "ke level global?")}
                </span>
              </h2>
              <p className="text-ink-300 mb-10 max-w-xl mx-auto">
                {t(
                  "Hơn 200 doanh nghiệp Việt Nam đã tin tưởng Gloyce. Đặt lịch tư vấn miễn phí ngay hôm nay — không cam kết, không ràng buộc.",
                  "Over 200 Vietnamese businesses already trust Gloyce. Book a free consultation today — no commitment, no strings attached.",
                  "超过200家越南企业已经信任Gloyce。立即预约免费咨询——无需承诺，无附加条件。",
                  "Más de 200 empresas vietnamitas ya confían en Gloyce. Reserva una consulta gratuita hoy — sin compromisos.",
                  "Lebih dari 200 bisnis Vietnam telah mempercayai Gloyce. Pesan konsultasi gratis hari ini — tanpa komitmen, tanpa syarat."
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold text-ink-900 font-bold hover:bg-gold-light transition-all shadow-[0_0_40px_rgba(201,150,12,0.35)] hover:shadow-[0_0_50px_rgba(201,150,12,0.5)] hover:-translate-y-0.5">
                  {t("Đặt lịch tư vấn miễn phí","Book a free consultation","预约免费咨询","Reserva una consulta gratuita","Pesan konsultasi gratis")}<ArrowRight size={16} />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-ink-500 text-foreground hover:bg-ink-700 hover:border-ink-400 transition-all">
                  {t("Xem bảng giá","View pricing","查看价格","Ver precios","Lihat harga")}
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-400">
                {[
                  t("✓ Không phí ẩn","✓ No hidden fees","✓ 无隐藏费用","✓ Sin tarifas ocultas","✓ Tanpa biaya tersembunyi"),
                  t("✓ Hỗ trợ tiếng Việt","✓ Vietnamese support","✓ 越南语支持","✓ Soporte en vietnamita","✓ Dukungan bahasa Vietnam"),
                  "✓ IRS & State compliant",
                  t("✓ Bảo mật tài liệu","✓ Document security","✓ 文件安全","✓ Seguridad de documentos","✓ Keamanan dokumen"),
                ].map(b => <span key={b} className="font-medium">{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
