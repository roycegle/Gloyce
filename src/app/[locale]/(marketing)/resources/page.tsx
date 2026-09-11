import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BookOpen, Newspaper, Users, HelpCircle, ArrowRight } from "lucide-react";

export default async function ResourcesPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  const hubs = [
    {
      icon: Newspaper,
      title: "Blog",
      desc: t("Phân tích thị trường, kinh nghiệm kinh doanh quốc tế và cập nhật pháp lý mới nhất.", "Market analysis, international business insights and latest legal updates.", "市场分析、国际商业洞察和最新法律更新。", "Análisis de mercado, perspectivas de negocios internacionales y últimas actualizaciones legales.", "Analisis pasar, wawasan bisnis internasional, dan pembaruan hukum terkini."),
      href: "/resources/blog",
    },
    {
      icon: BookOpen,
      title: t("Hướng dẫn", "Guides", "指南", "Guías", "Panduan"),
      desc: t("Hướng dẫn từng bước về thành lập công ty, kế toán và tuân thủ pháp lý.", "Step-by-step guides on incorporation, accounting and compliance.", "关于成立公司、会计和合规的分步指南。", "Guías paso a paso sobre incorporación, contabilidad y cumplimiento.", "Panduan langkah demi langkah tentang pendirian perusahaan, akuntansi, dan kepatuhan."),
      href: "/resources/guides",
    },
    {
      icon: Users,
      title: t("Câu chuyện khách hàng", "Customer stories", "客户案例", "Casos de éxito", "Kisah pelanggan"),
      desc: t("Cách các doanh nghiệp châu Á mở rộng ra toàn cầu với Gloyce.", "How businesses across Asia expanded globally with Gloyce.", "亚洲企业如何借助Gloyce走向全球。", "Cómo empresas asiáticas se expandieron globalmente con Gloyce.", "Bagaimana bisnis Asia berkembang secara global dengan Gloyce."),
      href: "/resources/stories",
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      desc: t("Câu trả lời cho các câu hỏi phổ biến nhất về dịch vụ của Gloyce.", "Answers to the most common questions about Gloyce services.", "关于Gloyce服务最常见问题的解答。", "Respuestas a las preguntas más frecuentes sobre los servicios de Gloyce.", "Jawaban atas pertanyaan paling umum tentang layanan Gloyce."),
      href: "/resources/faq",
    },
  ];

  const featuredGuides = locale === "zh"
    ? [
        { title: "2026年美国LLC开设完整指南", href: "/resources/guides/us-llc", tag: "美国LLC" },
        { title: "什么是5472表？外资LLC完整指南", href: "/resources/guides/form-5472", tag: "合规" },
        { title: "特拉华州vs怀俄明州——选择哪个州？", href: "/resources/guides/compare", tag: "美国LLC" },
        { title: "5472表是什么以及何时需要提交？", href: "/resources/guides/form-5472", tag: "会计" },
        { title: "在美国注册公司的10个常见错误", href: "/resources/guides/mistakes", tag: "美国LLC" },
        { title: "利润汇回——法规与操作方法", href: "/resources/guides/repatriation", tag: "合规" },
      ]
    : locale === "es"
    ? [
        { title: "Guía completa para abrir una LLC en EE.UU. en 2026", href: "/resources/guides/us-llc", tag: "LLC EE.UU." },
        { title: "¿Qué es el Formulario 5472? Guía completa para LLC extranjeras", href: "/resources/guides/form-5472", tag: "Cumplimiento" },
        { title: "Delaware vs Wyoming — ¿Qué estado elegir para su LLC?", href: "/resources/guides/compare", tag: "LLC EE.UU." },
        { title: "¿Qué es el Formulario 5472 y cuándo debe presentarlo?", href: "/resources/guides/form-5472", tag: "Contabilidad" },
        { title: "10 errores comunes al incorporar en EE.UU.", href: "/resources/guides/mistakes", tag: "LLC EE.UU." },
        { title: "Repatriación de ganancias — Regulaciones y cómo cumplir", href: "/resources/guides/repatriation", tag: "Cumplimiento" },
      ]
    : locale === "id"
    ? [
        { title: "Panduan Lengkap Membuka LLC AS di 2026", href: "/resources/guides/us-llc", tag: "LLC AS" },
        { title: "Apa itu Form 5472? Panduan lengkap untuk LLC asing di AS", href: "/resources/guides/form-5472", tag: "Kepatuhan" },
        { title: "Delaware vs Wyoming — Pilih negara bagian mana?", href: "/resources/guides/compare", tag: "LLC AS" },
        { title: "Apa itu Form 5472 dan kapan harus diajukan?", href: "/resources/guides/form-5472", tag: "Akuntansi" },
        { title: "10 kesalahan umum saat mendirikan perusahaan di AS", href: "/resources/guides/mistakes", tag: "LLC AS" },
        { title: "Repatriasi keuntungan — Regulasi dan cara melakukannya", href: "/resources/guides/repatriation", tag: "Kepatuhan" },
      ]
    : locale === "vi"
    ? [
        { title: "Hướng dẫn mở LLC Mỹ 2026 — Từ A đến Z", href: "/resources/guides/us-llc", tag: "LLC Mỹ" },
        { title: "Form 5472 là gì? Hướng dẫn đầy đủ cho LLC nước ngoài tại Mỹ", href: "/resources/guides/form-5472", tag: "Tuân thủ" },
        { title: "Delaware vs Wyoming — Chọn bang nào khi mở LLC?", href: "/resources/guides/compare", tag: "LLC Mỹ" },
        { title: "Form 5472 là gì và khi nào cần nộp?", href: "/resources/guides/form-5472", tag: "Kế toán" },
        { title: "10 sai lầm phổ biến khi mở công ty ở Mỹ", href: "/resources/guides/mistakes", tag: "LLC Mỹ" },
        { title: "Hồi hương lợi nhuận — Quy định và cách thực hiện", href: "/resources/guides/repatriation", tag: "Tuân thủ" },
      ]
    : [
        { title: "Complete Guide to Opening a US LLC in 2026", href: "/resources/guides/us-llc", tag: "US LLC" },
        { title: "What is Form 5472? Complete guide for foreign-owned US LLCs", href: "/resources/guides/form-5472", tag: "Compliance" },
        { title: "Delaware vs Wyoming — Which state for your LLC?", href: "/resources/guides/compare", tag: "US LLC" },
        { title: "What is Form 5472 and when must you file it?", href: "/resources/guides/form-5472", tag: "Accounting" },
        { title: "10 common mistakes when incorporating in the US", href: "/resources/guides/mistakes", tag: "US LLC" },
        { title: "Profit repatriation — Regulations and how to comply", href: "/resources/guides/repatriation", tag: "Compliance" },
      ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("TÀI NGUYÊN", "RESOURCES", "资源中心", "RECURSOS", "SUMBER DAYA")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t("Kiến thức cho doanh nghiệp toàn cầu", "Knowledge for global businesses", "全球企业知识库", "Conocimiento para empresas globales", "Pengetahuan untuk bisnis global")}
            </h1>
            <p className="text-ink-300 text-lg">
              {t("Hướng dẫn thực tế, câu chuyện khách hàng và công cụ giúp bạn mở rộng kinh doanh ra nước ngoài đúng cách.", "Practical guides, customer stories and tools to help you expand internationally the right way.", "实用指南、客户案例和工具，帮助您以正确方式拓展国际业务。", "Guías prácticas, casos de éxito y herramientas para ayudarle a expandirse internacionalmente de la manera correcta.", "Panduan praktis, kisah pelanggan, dan alat untuk membantu Anda berkembang secara internasional dengan cara yang benar.")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {hubs.map(hub => {
              const Icon = hub.icon;
              return (
                <Link key={hub.href} href={hub.href} className="group bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-gold transition-colors">{hub.title}</h3>
                  <p className="text-sm text-ink-300">{hub.desc}</p>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {t("Hướng dẫn nổi bật", "Featured guides", "精选指南", "Guías destacadas", "Panduan unggulan")}
              </h2>
              <Link href="/resources/guides" className="text-sm text-gold hover:text-gold-light flex items-center gap-1">
                {t("Xem tất cả", "View all", "查看全部", "Ver todo", "Lihat semua")} <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGuides.map(g => (
                <Link key={g.href} href={g.href} className="group bg-ink-800 border border-ink-600 rounded-xl p-5 hover:border-gold/40 transition-all">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full mb-3">{g.tag}</span>
                  <h3 className="font-medium text-foreground text-sm leading-snug group-hover:text-gold transition-colors">{g.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
