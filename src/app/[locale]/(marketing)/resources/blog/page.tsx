import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock } from "lucide-react";

type L = { vi: string; en: string; zh: string; es: string; id: string };

const POSTS: {
  tag: L; title: L; excerpt: L; date: L; readTime: L; href: string; featured?: boolean;
}[] = [
  {
    tag: { vi: "LLC Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC EE.UU.", id: "LLC AS" },
    title: {
      vi: "Delaware vs Wyoming — Chọn bang nào khi mở LLC cho doanh nghiệp châu Á?",
      en: "Delaware vs Wyoming — Which state for your Asian-owned LLC?",
      zh: "特拉华州vs怀俄明州——越南企业LLC选择哪个州？",
      es: "Delaware vs Wyoming — ¿Qué estado para su LLC de propiedad vietnamita?",
      id: "Delaware vs Wyoming — Negara bagian mana untuk LLC milik Vietnam Anda?",
    },
    excerpt: {
      vi: "So sánh chi tiết hai bang phổ biến nhất: chi phí, bảo vệ tài sản, phù hợp với từng loại mô hình kinh doanh.",
      en: "A detailed comparison of the two most popular states: costs, asset protection, and which fits your business model.",
      zh: "两个最热门州的详细对比：成本、资产保护以及哪个更适合您的商业模式。",
      es: "Una comparación detallada de los dos estados más populares: costos, protección de activos y cuál se adapta a su modelo de negocio.",
      id: "Perbandingan rinci dua negara bagian paling populer: biaya, perlindungan aset, dan mana yang cocok dengan model bisnis Anda.",
    },
    date: { vi: "08/2026", en: "Aug 2026", zh: "2026年8月", es: "Ago 2026", id: "Agu 2026" },
    readTime: { vi: "8 phút", en: "8 min read", zh: "8分钟", es: "8 min de lectura", id: "8 menit baca" },
    href: "/resources/blog/delaware-vs-wyoming",
    featured: true,
  },
  {
    tag: { vi: "Tuân thủ", en: "Compliance", zh: "合规", es: "Cumplimiento", id: "Kepatuhan" },
    title: {
      vi: "Form 5472: Hướng dẫn đầy đủ cho chủ LLC nước ngoài tại Mỹ",
      en: "Form 5472: The Complete Guide for Foreign-Owned US LLC Owners",
      zh: "5472表：外资美国LLC所有者完整指南",
      es: "Formulario 5472: La guía completa para propietarios de LLC en EE.UU.",
      id: "Form 5472: Panduan Lengkap untuk Pemilik LLC AS Asing",
    },
    excerpt: {
      vi: "Ai phải nộp, nộp khi nào, hậu quả nếu bỏ lỡ và cách Gloyce giúp bạn tuân thủ đúng hạn.",
      en: "Who must file, when to file, what happens if you miss it, and how Gloyce keeps you compliant.",
      zh: "谁必须提交、何时提交、错过会有什么后果，以及Gloyce如何帮您按时合规。",
      es: "Quién debe presentarlo, cuándo, qué pasa si lo omite y cómo Gloyce le mantiene en cumplimiento.",
      id: "Siapa yang harus mengajukan, kapan, apa yang terjadi jika terlewat, dan bagaimana Gloyce menjaga kepatuhan Anda.",
    },
    date: { vi: "07/2026", en: "Jul 2026", zh: "2026年7月", es: "Jul 2026", id: "Jul 2026" },
    readTime: { vi: "6 phút", en: "6 min read", zh: "6分钟", es: "6 min de lectura", id: "6 menit baca" },
    href: "/resources/blog/form-5472-guide",
  },
  {
    tag: { vi: "Kế toán", en: "Accounting", zh: "会计", es: "Contabilidad", id: "Akuntansi" },
    title: {
      vi: "Seller Amazon nên biết 5 điều này về kế toán Mỹ trước khi quá muộn",
      en: "5 Things Amazon Sellers Must Know About US Accounting Before It's Too Late",
      zh: "亚马逊卖家必须在为时已晚前了解的5件关于美国会计的事",
      es: "5 cosas que los vendedores de Amazon deben saber sobre contabilidad en EE.UU. antes de que sea demasiado tarde",
      id: "5 Hal yang Harus Diketahui Penjual Amazon tentang Akuntansi AS Sebelum Terlambat",
    },
    excerpt: {
      vi: "FBA fees, reimbursements, advertising credits — tại sao kế toán thông thường không đủ cho Amazon Seller.",
      en: "FBA fees, reimbursements, advertising credits — why standard bookkeeping falls short for Amazon Sellers.",
      zh: "FBA费用、报销、广告积分——为什么标准记账对亚马逊卖家来说不够用。",
      es: "Tarifas de FBA, reembolsos, créditos publicitarios — por qué la contabilidad estándar no es suficiente para los vendedores de Amazon.",
      id: "Biaya FBA, penggantian, kredit iklan — mengapa pembukuan standar tidak cukup untuk Penjual Amazon.",
    },
    date: { vi: "07/2026", en: "Jul 2026", zh: "2026年7月", es: "Jul 2026", id: "Jul 2026" },
    readTime: { vi: "5 phút", en: "5 min read", zh: "5分钟", es: "5 min de lectura", id: "5 menit baca" },
    href: "/resources/blog/amazon-seller-accounting",
  },
  {
    tag: { vi: "Tài khoản ngân hàng", en: "Bank account", zh: "银行账户", es: "Cuenta bancaria", id: "Rekening bank" },
    title: {
      vi: "Mercury vs Relay vs Wise Business — Ngân hàng nào tốt nhất cho LLC châu Á?",
      en: "Mercury vs Relay vs Wise Business — Best bank for Asian-owned LLCs?",
      zh: "Mercury vs Relay vs Wise Business——亚洲LLC的最佳银行？",
      es: "Mercury vs Relay vs Wise Business — ¿El mejor banco para LLC de propietarios asiáticos?",
      id: "Mercury vs Relay vs Wise Business — Bank terbaik untuk LLC pemilik Asia?",
    },
    excerpt: {
      vi: "Review thực tế cho các seller châu Á: phí, giới hạn chuyển tiền, tích hợp Stripe/PayPal.",
      en: "A real-world review for Asian sellers: fees, transfer limits, Stripe/PayPal integrations.",
      zh: "面向亚洲卖家的实际评测：费用、转账限额、Stripe/PayPal集成。",
      es: "Una reseña del mundo real para vendedores asiáticos: comisiones, límites de transferencia, integraciones con Stripe/PayPal.",
      id: "Ulasan dunia nyata untuk penjual Asia: biaya, batas transfer, integrasi Stripe/PayPal.",
    },
    date: { vi: "06/2026", en: "Jun 2026", zh: "2026年6月", es: "Jun 2026", id: "Jun 2026" },
    readTime: { vi: "7 phút", en: "7 min read", zh: "7分钟", es: "7 min de lectura", id: "7 menit baca" },
    href: "/resources/blog/mercury-vs-relay-vs-wise",
  },
  {
    tag: { vi: "Chiến lược", en: "Strategy", zh: "战略", es: "Estrategia", id: "Strategi" },
    title: {
      vi: "Khi nào nên mở Singapore thay vì Mỹ? 4 tiêu chí để quyết định",
      en: "When to incorporate in Singapore instead of the US — 4 key criteria",
      zh: "何时选择新加坡而非美国注册？4个关键标准",
      es: "Cuándo incorporarse en Singapur en lugar de EE.UU. — 4 criterios clave",
      id: "Kapan mendirikan perusahaan di Singapura daripada AS — 4 kriteria utama",
    },
    excerpt: {
      vi: "Với doanh nghiệp châu Á, B2B SaaS hoặc fintech — Singapore có thể là lựa chọn thông minh hơn.",
      en: "For Asia-focused businesses, B2B SaaS, or fintech — Singapore may be the smarter choice.",
      zh: "对于专注亚洲的企业、B2B SaaS或金融科技——新加坡可能是更明智的选择。",
      es: "Para empresas enfocadas en Asia, B2B SaaS o fintech — Singapur puede ser la opción más inteligente.",
      id: "Untuk bisnis yang berfokus di Asia, B2B SaaS, atau fintech — Singapura mungkin pilihan yang lebih cerdas.",
    },
    date: { vi: "06/2026", en: "Jun 2026", zh: "2026年6月", es: "Jun 2026", id: "Jun 2026" },
    readTime: { vi: "6 phút", en: "6 min read", zh: "6分钟", es: "6 min de lectura", id: "6 menit baca" },
    href: "/resources/blog/singapore-vs-us",
  },
  {
    tag: { vi: "BOI Report", en: "BOI Report", zh: "BOI报告", es: "Reporte BOI", id: "BOI Report" },
    title: {
      vi: "BOI Report — Báo cáo FinCEN bắt buộc từ 2024: Mọi điều bạn cần biết",
      en: "BOI Report — FinCEN's Mandatory Filing Since 2024: Everything You Need to Know",
      zh: "BOI报告——2024年起FinCEN强制申报：您需要了解的一切",
      es: "Reporte BOI — La presentación obligatoria de FinCEN desde 2024: Todo lo que necesita saber",
      id: "BOI Report — Pengajuan Wajib FinCEN Sejak 2024: Semua yang Perlu Anda Ketahui",
    },
    excerpt: {
      vi: "Lịch sử, ai phải nộp, deadline và hậu quả của việc không tuân thủ Corporate Transparency Act.",
      en: "Background, who must file, deadlines and penalties under the Corporate Transparency Act.",
      zh: "背景、谁必须申报、截止日期以及《企业透明度法》不合规的后果。",
      es: "Antecedentes, quién debe presentarlo, plazos y sanciones bajo la Ley de Transparencia Corporativa.",
      id: "Latar belakang, siapa yang harus mengajukan, tenggat waktu, dan denda berdasarkan Corporate Transparency Act.",
    },
    date: { vi: "05/2026", en: "May 2026", zh: "2026年5月", es: "May 2026", id: "Mei 2026" },
    readTime: { vi: "5 phút", en: "5 min read", zh: "5分钟", es: "5 min de lectura", id: "5 menit baca" },
    href: "/resources/blog/boi-report-guide",
  },
];

function pick(locale: string, l: L): string {
  return (l as Record<string, string>)[locale] ?? l.en;
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  const [featured, ...rest] = POSTS;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">BLOG</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t("Kiến thức thực tế cho doanh nghiệp toàn cầu", "Practical knowledge for global businesses", "全球企业实用知识", "Conocimiento práctico para empresas globales", "Pengetahuan praktis untuk bisnis global")}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl">
              {t(
                "Phân tích chuyên sâu về thành lập công ty, tuân thủ pháp lý Mỹ và chiến lược mở rộng quốc tế.",
                "In-depth analysis on US incorporation, compliance, and international expansion strategy.",
                "关于美国公司注册、合规和国际扩张战略的深度分析。",
                "Análisis profundo sobre incorporación en EE.UU., cumplimiento y estrategia de expansión internacional.",
                "Analisis mendalam tentang pendirian perusahaan AS, kepatuhan, dan strategi ekspansi internasional."
              )}
            </p>
          </div>

          {/* Featured post */}
          <Link href={featured.href} className="group block mb-10">
            <div className="relative bg-ink-800 border border-ink-600 hover:border-gold/40 rounded-3xl p-8 sm:p-10 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                    {pick(locale, featured.tag)}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 rounded-full">
                    {t("Nổi bật", "Featured", "精选", "Destacado", "Unggulan")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold transition-colors max-w-3xl">
                  {pick(locale, featured.title)}
                </h2>
                <p className="text-ink-300 text-base leading-relaxed mb-5 max-w-2xl">{pick(locale, featured.excerpt)}</p>
                <div className="flex items-center gap-4 text-xs text-ink-400">
                  <span>{pick(locale, featured.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-500" />
                  <span className="flex items-center gap-1"><Clock size={11} /> {pick(locale, featured.readTime)}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-500" />
                  <span className="text-gold font-medium flex items-center gap-1">
                    {t("Đọc tiếp", "Read more", "阅读更多", "Leer más", "Baca selengkapnya")} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => (
              <Link key={post.href} href={post.href} className="group bg-ink-800 border border-ink-600 hover:border-gold/40 rounded-2xl p-6 flex flex-col transition-all">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full mb-4 w-fit">
                  {pick(locale, post.tag)}
                </span>
                <h3 className="font-semibold text-foreground leading-snug mb-3 group-hover:text-gold transition-colors flex-1">
                  {pick(locale, post.title)}
                </h3>
                <p className="text-xs text-ink-300 leading-relaxed mb-4">{pick(locale, post.excerpt)}</p>
                <div className="flex items-center gap-3 text-[11px] text-ink-500 pt-4 border-t border-ink-700">
                  <span>{pick(locale, post.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-600" />
                  <span className="flex items-center gap-1"><Clock size={10} /> {pick(locale, post.readTime)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
