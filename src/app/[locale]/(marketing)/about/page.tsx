import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Globe, Shield, Users, TrendingUp } from "lucide-react";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  const values = [
    {
      icon: Shield,
      title: t("Tuân thủ trên hết", "Compliance first", "合规为先", "Cumplimiento primero", "Kepatuhan adalah prioritas"),
      desc: t(
        "Không có lời khuyên mập mờ. Mọi dịch vụ đều được xây dựng trên nền tảng tuân thủ pháp luật Mỹ (liên bang và tiểu bang) và quốc tế.",
        "No ambiguous advice. Every service is built on a foundation of US federal, state and international legal compliance.",
        "没有模糊建议。每项服务都建立在美国联邦、州和国际法律合规的基础上。",
        "Sin consejos ambiguos. Cada servicio está construido sobre el cumplimiento legal federal, estatal e internacional de EE.UU.",
        "Tidak ada saran ambigu. Setiap layanan dibangun di atas kepatuhan hukum federal, negara bagian AS, dan internasional."
      ),
    },
    {
      icon: Users,
      title: t("Am hiểu ngôn ngữ & văn hóa", "Language & culture fluency", "语言与文化精通", "Fluidez cultural e idiomática", "Fasih bahasa & budaya"),
      desc: t(
        "Đội ngũ Gloyce đa ngôn ngữ, am hiểu bối cảnh kinh doanh châu Á và kết nối với đối tác quốc tế trên toàn cầu.",
        "The Gloyce team is multilingual, understands Asian business contexts, and connects with international partners worldwide.",
        "Gloyce团队精通多种语言，了解亚洲商业背景并与全球国际合作伙伴保持联系。",
        "El equipo de Gloyce es multilingüe, entiende los contextos empresariales asiáticos y conecta con socios internacionales en todo el mundo.",
        "Tim Gloyce multibahasa, memahami konteks bisnis Asia dan terhubung dengan mitra internasional di seluruh dunia."
      ),
    },
    {
      icon: TrendingUp,
      title: t("Chủ động, không thụ động", "Proactive, not reactive", "主动而非被动", "Proactivo, no reactivo", "Proaktif, bukan reaktif"),
      desc: t(
        "Chúng tôi theo dõi thay đổi pháp lý, deadline và cơ hội — chủ động thông báo trước khi vấn đề xảy ra.",
        "We monitor legal changes, deadlines and opportunities — proactively alerting you before issues arise.",
        "我们监测法律变化、截止日期和机会——在问题发生之前主动提醒您。",
        "Monitoreamos cambios legales, plazos y oportunidades — alertándote proactivamente antes de que surjan problemas.",
        "Kami memantau perubahan hukum, tenggat waktu, dan peluang — memberi tahu Anda secara proaktif sebelum masalah terjadi."
      ),
    },
    {
      icon: Globe,
      title: t("Mạng lưới đối tác toàn cầu", "Global partner network", "全球合作伙伴网络", "Red de socios globales", "Jaringan mitra global"),
      desc: t(
        "Gloyce kết nối với luật sư, kế toán, ngân hàng và fintech hàng đầu tại Mỹ, Singapore, Hồng Kông và các thị trường châu Á.",
        "Gloyce connects with top lawyers, accountants, banks and fintechs in the US, Singapore, Hong Kong and across Asian markets.",
        "Gloyce与美国、新加坡、香港及整个亚洲市场的顶级律师、会计师、银行和金融科技公司保持联系。",
        "Gloyce conecta con los mejores abogados, contadores, bancos y fintechs en EE.UU., Singapur, Hong Kong y los mercados asiáticos.",
        "Gloyce terhubung dengan pengacara, akuntan, bank, dan fintech terkemuka di AS, Singapura, Hong Kong, dan pasar-pasar Asia."
      ),
    },
  ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("VỀ CHÚNG TÔI", "ABOUT US", "关于我们", "ACERCA DE NOSOTROS", "TENTANG KAMI")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              {t("Giúp doanh nghiệp châu Á ", "Helping Asian businesses ", "帮助亚洲企业", "Ayudando a empresas asiáticas ", "Membantu bisnis Asia ")}
              <span className="text-gold-gradient">
                {t("chinh phục thị trường toàn cầu", "conquer global markets", "征服全球市场", "conquistar mercados globales", "menaklukkan pasar global")}
              </span>
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-6">
              {t(
                "Gloyce được thành lập với một mục tiêu rõ ràng: loại bỏ những rào cản phức tạp khi doanh nghiệp châu Á muốn vươn ra thế giới. Chúng tôi không chỉ là nhà cung cấp dịch vụ — chúng tôi là đối tác chiến lược đồng hành từ ngày đầu thành lập đến khi doanh nghiệp vận hành ổn định xuyên biên giới.",
                "Gloyce was founded with a clear goal: removing the complex barriers for Asian businesses looking to go global. We're not just a service provider — we're a strategic partner from day one of incorporation to full cross-border operations.",
                "Gloyce的创立有一个明确目标：消除亚洲企业走向全球的复杂障碍。我们不仅仅是服务提供商——我们是从成立第一天到全面跨境运营的战略合作伙伴。",
                "Gloyce fue fundada con un objetivo claro: eliminar las barreras complejas para las empresas asiáticas que desean globalizarse. No somos solo un proveedor de servicios — somos un socio estratégico desde el primer día.",
                "Gloyce didirikan dengan tujuan yang jelas: menghilangkan hambatan kompleks bagi bisnis Asia yang ingin go global. Kami bukan sekadar penyedia layanan — kami adalah mitra strategis dari hari pertama pendirian hingga operasi lintas negara yang stabil."
              )}
            </p>
            <p className="text-ink-300 leading-relaxed">
              {t(
                "Gloyce phục vụ các doanh nghiệp trên khắp châu Á — từ Đông Nam Á đến Đông Bắc Á — muốn thành lập tại Mỹ, Singapore hoặc Hồng Kông. Chúng tôi tự vận hành đội kế toán và compliance in-house — không thuần môi giới — để đảm bảo chất lượng dịch vụ nhất quán.",
                "Gloyce serves businesses across Asia — from Southeast Asia to Northeast Asia — looking to incorporate in the US, Singapore or Hong Kong. We operate our own in-house accounting and compliance team — not pure brokerage — to ensure consistent service quality.",
                "Gloyce服务于整个亚洲的企业——从东南亚到东北亚——希望在美国、新加坡或香港成立公司。我们运营自己的内部会计和合规团队——而非纯粹经纪业务——以确保一致的服务质量。",
                "Gloyce atiende a empresas de toda Asia — desde el Sudeste Asiático hasta el Noreste Asiático — que desean incorporarse en EE.UU., Singapur o Hong Kong. Operamos nuestro propio equipo interno de contabilidad y cumplimiento para garantizar una calidad de servicio consistente.",
                "Gloyce melayani bisnis di seluruh Asia — dari Asia Tenggara hingga Asia Timur Laut — yang ingin mendirikan perusahaan di AS, Singapura, atau Hong Kong. Kami menjalankan tim akuntansi dan kepatuhan internal sendiri untuk memastikan kualitas layanan yang konsisten."
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { n: "200+", label: t("Doanh nghiệp đã phục vụ", "Businesses served", "已服务企业", "Empresas atendidas", "Bisnis yang dilayani") },
              { n: "3", label: t("Quốc gia hỗ trợ", "Countries supported", "支持国家", "Países apoyados", "Negara yang didukung") },
              { n: "95%", label: t("Khách hàng giới thiệu", "Customer referral rate", "客户推荐率", "Tasa de referencia", "Tingkat referral") },
              { n: "2024", label: t("Năm thành lập", "Year founded", "成立年份", "Año de fundación", "Tahun berdiri") },
            ].map(s => (
              <div key={s.label} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 text-center">
                <p className="text-4xl font-black text-gold mb-1">{s.n}</p>
                <p className="text-sm text-ink-300">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t("Giá trị cốt lõi", "Our values", "核心价值观", "Nuestros valores", "Nilai inti kami")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map(v => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="flex gap-4 bg-ink-800 border border-ink-600 rounded-2xl p-6">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                      <p className="text-sm text-ink-300 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">
              {t("Tham gia cùng chúng tôi", "Join us", "加入我们", "Únete a nosotros", "Bergabung dengan kami")}
            </h2>
            <p className="text-ink-300 mb-5">
              {t(
                "Gloyce đang tìm kiếm chuyên gia kế toán, compliance và business development.",
                "Gloyce is looking for accounting, compliance and business development experts.",
                "Gloyce正在寻找会计、合规和业务发展方面的专家。",
                "Gloyce busca expertos en contabilidad, cumplimiento y desarrollo de negocios.",
                "Gloyce mencari pakar akuntansi, kepatuhan, dan pengembangan bisnis."
              )}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {t("Liên hệ với chúng tôi", "Contact us", "联系我们", "Contáctenos", "Hubungi kami")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
