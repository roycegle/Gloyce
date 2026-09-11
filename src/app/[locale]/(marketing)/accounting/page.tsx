import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, BarChart3, BookOpen, Receipt, Zap, FileText } from "lucide-react";

export default async function AccountingPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  const services = [
    {
      icon: Zap,
      title: t("Kế toán cho Seller TMĐT", "Ecommerce accounting", "电商会计", "Contabilidad e-commerce", "Akuntansi e-commerce"),
      desc: t("Tích hợp Amazon, Shopee, TikTok Shop. Tự động đồng bộ giao dịch.", "Amazon, Shopee, TikTok Shop integration. Auto-sync transactions.", "集成Amazon、Shopee、TikTok Shop。自动同步交易。", "Integración con Amazon, Shopee, TikTok Shop. Sincronización automática de transacciones.", "Integrasi Amazon, Shopee, TikTok Shop. Sinkronisasi transaksi otomatis."),
      href: "/accounting/ecommerce",
    },
    {
      icon: BookOpen,
      title: t("Sổ sách kế toán", "Bookkeeping", "账务记录", "Contabilidad", "Pembukuan"),
      desc: t("Ghi chép đầy đủ hàng tháng, phân loại chi phí, đối chiếu ngân hàng.", "Full monthly recording, expense categorization, bank reconciliation.", "每月完整记录，费用分类，银行对账。", "Registro mensual completo, categorización de gastos, conciliación bancaria.", "Pencatatan bulanan lengkap, kategorisasi pengeluaran, rekonsiliasi bank."),
      href: "/accounting/bookkeeping",
    },
    {
      icon: Receipt,
      title: t("Hóa đơn", "Invoicing", "发票管理", "Facturación", "Fakturasi"),
      desc: t("Tạo và gửi hóa đơn chuyên nghiệp, theo dõi thanh toán tự động.", "Create and send professional invoices, auto-track payments.", "创建和发送专业发票，自动跟踪付款。", "Crea y envía facturas profesionales, seguimiento automático de pagos.", "Buat dan kirim faktur profesional, lacak pembayaran otomatis."),
      href: "/accounting/invoicing",
    },
    {
      icon: BarChart3,
      title: t("Báo cáo tài chính", "Financial reporting", "财务报告", "Informes financieros", "Pelaporan keuangan"),
      desc: t("P&L, Balance Sheet, Cash Flow — báo cáo chuẩn mực quốc tế hàng tháng.", "P&L, Balance Sheet, Cash Flow — monthly international-standard reports.", "P&L、资产负债表、现金流——每月国际标准报告。", "P&L, Balance Sheet, Cash Flow — informes mensuales según estándares internacionales.", "P&L, Neraca, Arus Kas — laporan standar internasional bulanan."),
      href: "/accounting/reporting",
    },
    {
      icon: FileText,
      title: t("Kết nối ngân hàng", "Bank integration", "银行对接", "Integración bancaria", "Integrasi perbankan"),
      desc: t("Kết nối tự động Mercury, Wise, Airwallex — không nhập tay.", "Auto-connect Mercury, Wise, Airwallex — no manual entry.", "自动连接Mercury、Wise、Airwallex——无需手动输入。", "Conexión automática con Mercury, Wise, Airwallex — sin entrada manual.", "Koneksi otomatis Mercury, Wise, Airwallex — tanpa entri manual."),
      href: "/accounting/bank-integration",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: locale === "vi" ? "3.000.000đ" : "$149",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Cho công ty mới thành lập, doanh thu dưới $50K/năm", "New companies with under $50K annual revenue", "新成立公司，年收入低于$50K", "Empresas nuevas con menos de $50K de ingresos anuales", "Perusahaan baru dengan pendapatan di bawah $50K/tahun"),
      features: ta(
        {
          vi: ["Sổ sách hàng tháng", "Báo cáo P&L", "Kết nối 1 tài khoản ngân hàng", "Hỗ trợ email"],
          en: ["Monthly bookkeeping", "P&L report", "1 bank account connection", "Email support"],
          zh: ["每月记账", "P&L报告", "连接1个银行账户", "电子邮件支持"],
          es: ["Contabilidad mensual", "Informe P&L", "1 conexión bancaria", "Soporte por email"],
          id: ["Pembukuan bulanan", "Laporan P&L", "1 koneksi rekening bank", "Dukungan email"],
        },
        ["Monthly bookkeeping", "P&L report", "1 bank account connection", "Email support"]
      ),
    },
    {
      name: "Growth",
      price: locale === "vi" ? "6.000.000đ" : "$299",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Cho doanh nghiệp đang tăng trưởng, doanh thu $50K–$500K/năm", "Growing businesses with $50K–$500K annual revenue", "成长型企业，年收入$50K–$500K", "Empresas en crecimiento con $50K–$500K de ingresos anuales", "Bisnis berkembang dengan pendapatan $50K–$500K/tahun"),
      features: ta(
        {
          vi: ["Tất cả Starter", "Kết nối không giới hạn tài khoản", "Báo cáo hàng tuần", "Khai báo thuế quý", "Hỗ trợ ưu tiên (chat + call)"],
          en: ["Everything in Starter", "Unlimited bank connections", "Weekly reports", "Quarterly tax filings", "Priority support (chat + call)"],
          zh: ["包含Starter所有功能", "无限银行账户连接", "每周报告", "季度税务申报", "优先支持（聊天+通话）"],
          es: ["Todo en Starter", "Conexiones bancarias ilimitadas", "Informes semanales", "Declaraciones fiscales trimestrales", "Soporte prioritario (chat + llamada)"],
          id: ["Semua di Starter", "Koneksi bank tanpa batas", "Laporan mingguan", "Pengajuan pajak kuartalan", "Dukungan prioritas (chat + telepon)"],
        },
        ["Everything in Starter", "Unlimited bank connections", "Weekly reports", "Quarterly tax filings", "Priority support (chat + call)"]
      ),
      featured: true,
    },
    {
      name: "Scale",
      price: locale === "vi" ? "12.000.000đ" : "$599",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Cho doanh nghiệp lớn, nhiều thực thể pháp lý", "Large businesses with multiple legal entities", "大型企业，拥有多个法律实体", "Grandes empresas con múltiples entidades legales", "Bisnis besar dengan beberapa entitas hukum"),
      features: ta(
        {
          vi: ["Tất cả Growth", "Kế toán trưởng riêng", "Đa thực thể (multi-entity)", "Lập kế hoạch thuế chủ động", "CFO thuê ngoài (2h/tháng)"],
          en: ["Everything in Growth", "Dedicated senior accountant", "Multi-entity support", "Proactive tax planning", "Fractional CFO (2h/mo)"],
          zh: ["包含Growth所有功能", "专属高级会计师", "多实体支持", "积极税务规划", "兼职CFO（每月2小时）"],
          es: ["Todo en Growth", "Contador senior dedicado", "Soporte multi-entidad", "Planificación fiscal proactiva", "CFO fraccional (2h/mes)"],
          id: ["Semua di Growth", "Akuntan senior khusus", "Dukungan multi-entitas", "Perencanaan pajak proaktif", "CFO fraksional (2j/bulan)"],
        },
        ["Everything in Growth", "Dedicated senior accountant", "Multi-entity support", "Proactive tax planning", "Fractional CFO (2h/mo)"]
      ),
    },
  ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              {t("Kế toán & Thuế", "Accounting & Tax", "会计与税务", "Contabilidad & Impuestos", "Akuntansi & Pajak")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {t("Kế toán chuyên gia", "Expert accounting", "专业会计服务", "Contabilidad experta", "Akuntansi ahli")}{" "}
              <span className="text-gold-gradient">
                {t("cho doanh nghiệp toàn cầu", "for global businesses", "助力全球企业", "para empresas globales", "untuk bisnis global")}
              </span>
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed">
              {t(
                "Đội ngũ kế toán của Gloyce am hiểu luật thuế Mỹ (liên bang và tiểu bang), với kinh nghiệm chuyên sâu phục vụ doanh nghiệp châu Á — giúp bạn nộp đúng thuế, không bỏ lỡ deadline và tối ưu chi phí trong khuôn khổ pháp luật.",
                "Gloyce's accounting team specializes in US federal and state tax law, with deep expertise serving Asian-owned businesses — helping you file correctly, never miss a deadline, and optimize costs within legal boundaries.",
                "Gloyce的会计团队专注于美国联邦和州税法，深耕服务越南籍业主企业——帮助您正确申报、不错过任何截止日期、并在法律框架内优化成本。",
                "El equipo de contabilidad de Gloyce se especializa en la ley fiscal federal y estatal de EE.UU., con profunda experiencia sirviendo a empresas de propietarios vietnamitas — ayudándole a declarar correctamente, nunca perder un plazo y optimizar costos dentro de los límites legales.",
                "Tim akuntansi Gloyce berspesialisasi dalam hukum pajak federal dan negara bagian AS, dengan keahlian mendalam melayani bisnis milik orang Vietnam — membantu Anda mengajukan dengan benar, tidak pernah melewati deadline, dan mengoptimalkan biaya dalam batas hukum."
              )}
            </p>
          </div>

          {/* Service list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.href} href={s.href} className="group bg-ink-800 border border-ink-600 rounded-xl p-5 hover:border-gold/40 transition-all">
                  <Icon className="w-5 h-5 text-gold mb-3" />
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-sm text-ink-300">{s.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* Pricing plans */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("BẢNG GIÁ", "PRICING", "价格方案", "PRECIOS", "HARGA")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
            {t("Chọn gói phù hợp với bạn", "Choose the right plan for you", "选择适合您的方案", "Elige el plan adecuado para ti", "Pilih paket yang tepat untuk Anda")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative bg-ink-800 rounded-2xl p-7 border ${plan.featured ? "border-gold/30 shadow-[0_0_40px_rgba(201,150,12,0.10)]" : "border-ink-600"}`}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-ink-900 bg-gold px-3 py-1 rounded-full">
                    {t("Phổ biến nhất", "Most popular", "最受欢迎", "Más popular", "Paling populer")}
                  </span>
                )}
                <h3 className="font-bold text-foreground text-lg mb-1">{plan.name}</h3>
                <p className="text-xs text-ink-400 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  <span className="text-sm text-ink-400">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-200">
                      <Check size={13} className="text-gold mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.featured ? "bg-gold text-ink-900 hover:bg-gold-light" : "border border-ink-500 text-foreground hover:bg-ink-700"}`}>
                  {t("Bắt đầu", "Get started", "立即开始", "Comenzar", "Mulai sekarang")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
