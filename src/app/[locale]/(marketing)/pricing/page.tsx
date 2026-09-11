import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function PricingPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  const contactLabel = t("Liên hệ", "Contact", "联系我们", "Contactar", "Hubungi");

  const incorporationPlans = [
    {
      name: t("LLC Mỹ — Gói Standard", "US LLC — Standard", "美国LLC — 标准版", "LLC EE.UU. — Estándar", "LLC AS — Standar"),
      price: "$499", period: t("một lần", "one-time", "一次性", "pago único", "sekali bayar"),
      desc: t("Delaware hoặc Wyoming LLC — trọn gói cơ bản", "Delaware or Wyoming LLC — basic complete package", "特拉华州或怀俄明州LLC — 基础完整套餐", "LLC en Delaware o Wyoming — paquete básico completo", "LLC Delaware atau Wyoming — paket dasar lengkap"),
      features: ta({
        vi: ["Phí bang + Registered Agent năm đầu","EIN từ IRS","Operating Agreement","Certificate of Formation","Form 5472 & BOI Report cơ bản"],
        en: ["State fee + first-year Registered Agent","IRS EIN","Operating Agreement","Certificate of Formation","Form 5472 & BOI Report basics"],
        zh: ["州费 + 首年注册代理人","IRS EIN","经营协议","公司成立证书","Form 5472 & BOI Report基础"],
        es: ["Tarifa estatal + Agente Registrado 1er año","IRS EIN","Acuerdo Operativo","Certificado de Formación","Form 5472 & BOI Report básico"],
        id: ["Biaya negara + Agen Terdaftar tahun pertama","IRS EIN","Perjanjian Operasi","Sertifikat Pembentukan","Form 5472 & BOI Report dasar"],
      }, ["State fee + first-year Registered Agent","IRS EIN","Operating Agreement","Certificate of Formation","Form 5472 & BOI Report basics"]),
    },
    {
      name: t("LLC Mỹ — Gói Premium", "US LLC — Premium", "美国LLC — 高级版", "LLC EE.UU. — Premium", "LLC AS — Premium"),
      price: "$799", period: t("một lần", "one-time", "一次性", "pago único", "sekali bayar"),
      desc: t("Đầy đủ Standard + tài khoản ngân hàng + khai báo liên bang đầy đủ", "Everything Standard + bank account + full US federal filing", "标准版全部 + 银行账户 + 完整联邦申报", "Todo lo del Estándar + cuenta bancaria + declaración federal completa", "Semua Standar + rekening bank + pengajuan federal AS lengkap"),
      features: ta({
        vi: ["Tất cả Gói Standard","Hỗ trợ mở Mercury/Relay/Wise","Form 5472 & BOI Report đầy đủ","Business address (1 năm)","30 phút tư vấn chiến lược"],
        en: ["Everything Standard","Mercury/Relay/Wise account setup","Full Form 5472 & BOI Report filing","Business address (1 year)","30-min strategy consultation"],
        zh: ["标准版所有内容","Mercury/Relay/Wise账户开设","完整Form 5472 & BOI Report申报","商业地址（1年）","30分钟战略咨询"],
        es: ["Todo lo del Estándar","Apertura de cuenta Mercury/Relay/Wise","Presentación completa Form 5472 & BOI","Dirección comercial (1 año)","Consulta estratégica de 30 min"],
        id: ["Semua dari Standar","Pembukaan akun Mercury/Relay/Wise","Pengajuan Form 5472 & BOI Report lengkap","Alamat bisnis (1 tahun)","Konsultasi strategi 30 menit"],
      }, ["Everything Standard","Mercury/Relay/Wise account setup","Full Form 5472 & BOI Report filing","Business address (1 year)","30-min strategy consultation"]),
      featured: true,
    },
    {
      name: t("Singapore / Hồng Kông", "Singapore / Hong Kong", "新加坡 / 香港", "Singapur / Hong Kong", "Singapura / Hong Kong"),
      price: contactLabel, period: "",
      desc: t("Báo giá theo yêu cầu cụ thể", "Custom quote per requirements", "根据需求定制报价", "Precio a medida según requerimientos", "Penawaran khusus sesuai kebutuhan"),
      features: ta({
        vi: ["Tư vấn lựa chọn jurisdiction","Trọn gói thành lập","Nominee Director nếu cần","Tài khoản ngân hàng","Thư ký công ty (năm đầu)"],
        en: ["Jurisdiction selection consultation","Complete formation package","Nominee Director if needed","Bank account","First-year Company Secretary"],
        zh: ["司法管辖区选择咨询","完整成立套餐","如需提名董事","银行账户","首年公司秘书"],
        es: ["Consulta de selección de jurisdicción","Paquete completo de formación","Director Nominado si es necesario","Cuenta bancaria","Secretaría corporativa primer año"],
        id: ["Konsultasi pemilihan yurisdiksi","Paket pendirian lengkap","Direktur Nominasi jika diperlukan","Rekening bank","Sekretaris perusahaan tahun pertama"],
      }, ["Jurisdiction selection consultation","Complete formation package","Nominee Director if needed","Bank account","First-year Company Secretary"]),
    },
  ];

  const accountingPlans = [
    {
      name: "Starter",
      price: locale === "vi" ? "3.000.000đ" : "$149",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Doanh thu dưới $50K/năm", "Under $50K annual revenue", "年营收低于$50K", "Ingresos anuales menores a $50K", "Pendapatan tahunan di bawah $50K"),
      features: ta({
        vi: ["Sổ sách hàng tháng","Báo cáo P&L","1 tài khoản ngân hàng","Hỗ trợ email"],
        en: ["Monthly bookkeeping","P&L report","1 bank connection","Email support"],
        zh: ["每月簿记","P&L报告","1个银行连接","邮件支持"],
        es: ["Contabilidad mensual","Informe P&L","1 conexión bancaria","Soporte por email"],
        id: ["Pembukuan bulanan","Laporan P&L","1 koneksi bank","Dukungan email"],
      }, ["Monthly bookkeeping","P&L report","1 bank connection","Email support"]),
    },
    {
      name: "Growth",
      price: locale === "vi" ? "6.000.000đ" : "$299",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Doanh thu $50K–$500K/năm", "$50K–$500K annual revenue", "年营收$50K–$500K", "Ingresos anuales $50K–$500K", "Pendapatan tahunan $50K–$500K"),
      features: ta({
        vi: ["Tất cả Starter","Tài khoản không giới hạn","Báo cáo hàng tuần","Khai thuế quý","Hỗ trợ ưu tiên"],
        en: ["Everything Starter","Unlimited connections","Weekly reports","Quarterly tax","Priority support"],
        zh: ["入门版所有内容","无限连接","每周报告","季度税务","优先支持"],
        es: ["Todo lo del Starter","Conexiones ilimitadas","Informes semanales","Impuesto trimestral","Soporte prioritario"],
        id: ["Semua dari Starter","Koneksi tidak terbatas","Laporan mingguan","Pajak kuartalan","Dukungan prioritas"],
      }, ["Everything Starter","Unlimited connections","Weekly reports","Quarterly tax","Priority support"]),
      featured: true,
    },
    {
      name: "Scale",
      price: locale === "vi" ? "12.000.000đ" : "$599",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Doanh thu trên $500K/năm", "Over $500K annual revenue", "年营收超过$500K", "Ingresos anuales mayores a $500K", "Pendapatan tahunan di atas $500K"),
      features: ta({
        vi: ["Tất cả Growth","Kế toán trưởng riêng","Đa thực thể","Lập kế hoạch thuế","CFO thuê ngoài 2h/tháng"],
        en: ["Everything Growth","Dedicated senior accountant","Multi-entity","Tax planning","Fractional CFO 2h/mo"],
        zh: ["成长版所有内容","专属高级会计师","多实体","税务规划","兼职CFO 2小时/月"],
        es: ["Todo lo del Growth","Contador senior dedicado","Multi-entidad","Planificación fiscal","CFO fraccionado 2h/mes"],
        id: ["Semua dari Growth","Akuntan senior khusus","Multi-entitas","Perencanaan pajak","CFO paruh waktu 2j/bulan"],
      }, ["Everything Growth","Dedicated senior accountant","Multi-entity","Tax planning","Fractional CFO 2h/mo"]),
    },
  ];

  const compliancePlans = [
    {
      name: t("Thư ký công ty", "Company Secretary", "公司秘书", "Secretaría corporativa", "Sekretaris Perusahaan"),
      price: locale === "vi" ? "1.500.000đ" : "$75",
      period: t("/tháng", "/mo", "/月", "/mes", "/bulan"),
      desc: t("Dành cho LLC Mỹ đang hoạt động", "For active US LLC", "适用于活跃的美国LLC", "Para LLC en EE.UU. activa", "Untuk LLC AS yang aktif"),
      features: ta({
        vi: ["Duy trì sổ đăng ký","Soạn thảo nghị quyết","Annual filing","Nhắc deadline"],
        en: ["Maintain registers","Draft resolutions","Annual filing","Deadline reminders"],
        zh: ["维护登记册","起草决议","年度申报","截止日期提醒"],
        es: ["Mantener registros","Redactar resoluciones","Presentación anual","Recordatorios de plazos"],
        id: ["Memelihara daftar","Menyusun resolusi","Pengajuan tahunan","Pengingat tenggat waktu"],
      }, ["Maintain registers","Draft resolutions","Annual filing","Deadline reminders"]),
    },
    {
      name: t("Khai báo thuế & Báo cáo", "US Tax Filing & Reporting", "美国税务申报与报告", "Declaración fiscal en EE.UU.", "Pengajuan Pajak & Pelaporan AS"),
      price: locale === "vi" ? "3.000.000đ" : "$150",
      period: t("một lần", "one-time", "一次性", "pago único", "sekali bayar"),
      desc: t("Form 5472, BOI Report và khai báo liên bang hàng năm", "Form 5472, BOI Report and annual federal filings", "Form 5472、BOI报告和年度联邦申报", "Form 5472, BOI Report y declaraciones federales anuales", "Form 5472, BOI Report dan pengajuan federal tahunan"),
      features: ta({
        vi: ["Đánh giá nghĩa vụ khai báo","Chuẩn bị & nộp Form 5472","BOI Report theo FinCEN","Nhắc nhở deadline hàng năm"],
        en: ["Filing obligation assessment","Prepare & file Form 5472","BOI Report with FinCEN","Annual deadline reminders"],
        zh: ["申报义务评估","准备并提交Form 5472","向FinCEN提交BOI报告","年度截止日期提醒"],
        es: ["Evaluación de obligaciones de presentación","Preparar y presentar Form 5472","BOI Report con FinCEN","Recordatorios anuales de plazos"],
        id: ["Penilaian kewajiban pengajuan","Persiapkan & ajukan Form 5472","BOI Report ke FinCEN","Pengingat tenggat waktu tahunan"],
      }, ["Filing obligation assessment","Prepare & file Form 5472","BOI Report with FinCEN","Annual deadline reminders"]),
    },
    {
      name: t("Chuyển tiền quốc tế", "International Transfers", "国际汇款", "Transferencias internacionales", "Transfer Internasional"),
      price: contactLabel, period: "",
      desc: t("Tuỳ theo giá trị giao dịch", "Depends on transaction value", "根据交易金额而定", "Según el valor de la transacción", "Tergantung nilai transaksi"),
      features: ta({
        vi: ["Wire transfer từ tài khoản Mỹ","Phân phối lợi nhuận cho cổ đông","Kết nối Wise, Airwallex, Payoneer","Tư vấn tỷ giá tối ưu"],
        en: ["Wire transfer from US account","Profit distribution to shareholders","Connect Wise, Airwallex, Payoneer","Exchange rate optimization advice"],
        zh: ["从美国账户电汇","利润分配给股东","连接Wise、Airwallex、Payoneer","汇率优化建议"],
        es: ["Transferencia desde cuenta en EE.UU.","Distribución de beneficios a accionistas","Conectar Wise, Airwallex, Payoneer","Asesoría de optimización de tipo de cambio"],
        id: ["Transfer kawat dari rekening AS","Distribusi laba kepada pemegang saham","Hubungkan Wise, Airwallex, Payoneer","Saran optimasi nilai tukar"],
      }, ["Wire transfer from US account","Profit distribution to shareholders","Connect Wise, Airwallex, Payoneer","Exchange rate optimization advice"]),
    },
  ];

  const sections = [
    { title: t("Thành lập công ty", "Incorporation", "成立公司", "Incorporación", "Pendirian Perusahaan"), plans: incorporationPlans },
    { title: t("Kế toán & Thuế", "Accounting & Tax", "会计与税务", "Contabilidad e Impuestos", "Akuntansi & Pajak"), plans: accountingPlans },
    { title: t("Tuân thủ", "Compliance", "合规", "Cumplimiento", "Kepatuhan"), plans: compliancePlans },
  ];

  const quoteLabel = t("Yêu cầu báo giá", "Request a quote", "请求报价", "Solicitar cotización", "Minta penawaran");
  const startLabel = t("Bắt đầu", "Get started", "立即开始", "Comenzar", "Mulai");
  const popularLabel = t("Phổ biến nhất", "Most popular", "最受欢迎", "Más popular", "Paling populer");

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("BẢNG GIÁ", "PRICING", "价格", "PRECIOS", "HARGA")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t("Giá minh bạch, không phí ẩn", "Transparent pricing, no hidden fees", "透明定价，无隐藏费用", "Precios transparentes, sin tarifas ocultas", "Harga transparan, tanpa biaya tersembunyi")}
            </h1>
            <p className="text-ink-300 text-lg">
              {t(
                "Tất cả gói bao gồm hỗ trợ tiếng Việt và tư vấn không giới hạn.",
                "All plans include Vietnamese-language support and unlimited consultations.",
                "所有套餐包含越南语支持和无限次咨询。",
                "Todos los planes incluyen soporte en vietnamita y consultas ilimitadas.",
                "Semua paket termasuk dukungan bahasa Vietnam dan konsultasi tak terbatas."
              )}
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
                        {popularLabel}
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
                      {plan.price === contactLabel ? quoteLabel : startLabel}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">
              {t("Cần gói tuỳ chỉnh?", "Need a custom plan?", "需要自定义套餐？", "¿Necesitas un plan personalizado?", "Butuh paket kustom?")}
            </h2>
            <p className="text-ink-300 mb-5">
              {t(
                "Doanh nghiệp có nhiều thực thể, nhiều quốc gia hoặc yêu cầu phức tạp — hãy liên hệ để nhận báo giá riêng.",
                "Businesses with multiple entities, countries or complex requirements — contact us for a custom quote.",
                "拥有多个实体、国家或复杂需求的企业——请联系我们获取定制报价。",
                "Empresas con múltiples entidades, países o requisitos complejos — contáctanos para una cotización personalizada.",
                "Bisnis dengan beberapa entitas, negara, atau persyaratan kompleks — hubungi kami untuk penawaran khusus."
              )}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {t("Liên hệ đội ngũ", "Contact our team", "联系我们的团队", "Contactar a nuestro equipo", "Hubungi tim kami")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
