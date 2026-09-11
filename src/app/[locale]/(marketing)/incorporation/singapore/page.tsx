import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function SingaporePage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🇸🇬 Singapore Pte Ltd
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              <span className="text-gold-gradient">Singapore Pte Ltd</span>{" "}
              {t("cho doanh nghiệp Việt Nam", "for Vietnamese businesses", "面向越南企业", "para empresas vietnamitas", "untuk bisnis Vietnam")}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {t(
                "Thành lập công ty tư nhân tại Singapore — hub tài chính hàng đầu châu Á với hệ thống thuế thân thiện, pháp lý minh bạch và dễ dàng mở tài khoản ngân hàng quốc tế.",
                "Incorporate a private limited company in Singapore — Asia's top financial hub with business-friendly taxes, transparent legal system and easy international banking.",
                "在新加坡注册私人有限公司——亚洲顶级金融中心，拥有对商业友好的税制、透明的法律体系和便捷的国际银行业务。",
                "Incorpora una empresa privada en Singapur — el principal hub financiero de Asia con impuestos favorables, sistema legal transparente y fácil acceso a banca internacional.",
                "Dirikan perusahaan swasta terbatas di Singapura — pusat keuangan utama Asia dengan pajak ramah bisnis, sistem hukum transparan, dan akses perbankan internasional yang mudah."
              )}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
                {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={15} />
              </Link>
              <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
                {t("Tư vấn miễn phí", "Free consultation", "免费咨询", "Consulta gratuita", "Konsultasi gratis")}
              </Link>
            </div>
            <div className="space-y-2">
              {ta(
                {
                  vi: ["Xử lý 3–7 ngày làm việc","Company Secretary (năm đầu)","Registered address tại Singapore","Mở tài khoản DBS/OCBC/Wise","Hỗ trợ GST registration","Tư vấn tuân thủ pháp lý quốc tế"],
                  en: ["3–7 business day processing","First-year Company Secretary","Registered Singapore address","DBS/OCBC/Wise bank account","GST registration support","International compliance guidance"],
                  zh: ["3-7个工作日处理","首年公司秘书","新加坡注册地址","DBS/OCBC/Wise银行账户","GST注册支持","国际合规指导"],
                  es: ["Procesamiento en 3-7 días hábiles","Secretario Corporativo primer año","Dirección registrada en Singapur","Cuenta bancaria DBS/OCBC/Wise","Soporte para registro de GST","Orientación de cumplimiento internacional"],
                  id: ["Proses 3-7 hari kerja","Company Secretary tahun pertama","Alamat terdaftar di Singapura","Rekening bank DBS/OCBC/Wise","Dukungan registrasi GST","Panduan kepatuhan internasional"],
                },
                ["3–7 business day processing","First-year Company Secretary","Registered Singapore address","DBS/OCBC/Wise bank account","GST registration support","International compliance guidance"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink-200">
                  <Check size={14} className="text-gold shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8">
            <p className="text-xs text-ink-400 mb-1">{t("Chi phí trọn gói", "All-inclusive cost", "全包费用", "Costo todo incluido", "Biaya all-inclusive")}</p>
            <p className="text-4xl font-black text-foreground mb-1">{t("Liên hệ báo giá", "Contact for pricing", "联系获取报价", "Consultar precio", "Hubungi untuk harga")}</p>
            <p className="text-sm text-ink-400 mb-6">{t("Phụ thuộc vào yêu cầu cụ thể", "Depends on specific requirements", "取决于具体要求", "Según requerimientos específicos", "Tergantung kebutuhan spesifik")}</p>
            <Link href="/contact" className="block text-center py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all mb-3">
              {t("Yêu cầu báo giá", "Request a quote", "申请报价", "Solicitar cotización", "Minta penawaran")}
            </Link>
            <Link href="/contact?tab=call" className="block text-center py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
              {t("Đặt lịch tư vấn", "Schedule a call", "预约咨询", "Agendar una llamada", "Jadwalkan panggilan")}
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">{t("Tại sao chọn Singapore?", "Why choose Singapore?", "为什么选择新加坡？", "¿Por qué elegir Singapur?", "Mengapa memilih Singapura?")}</h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-8 text-left">
            {(locale === "zh"
              ? [["企业税率17%","亚洲最具竞争力的税率——无股息税，无资本利得税。"],["普通法体系","基于英国的透明法律体系——便于国际纠纷解决。"],["国际银行业务","轻松开设DBS、OCBC、渣打银行账户——全球认可。"]]
              : locale === "es"
              ? [["Impuesto corporativo 17%","Tasa competitiva en Asia — sin impuesto a dividendos ni ganancias de capital."],["Sistema Common Law","Sistema legal transparente basado en el inglés — fácil para disputas internacionales."],["Banca internacional","Fácil apertura de cuentas en DBS, OCBC, Standard Chartered — aceptación global."]]
              : locale === "id"
              ? [["Pajak korporat 17%","Tarif kompetitif di Asia — tanpa pajak dividen, tanpa pajak capital gain."],["Sistem Common Law","Sistem hukum transparan berbasis Inggris — mudah untuk sengketa internasional."],["Perbankan internasional","Mudah buka rekening DBS, OCBC, Standard Chartered — diterima secara global."]]
              : locale === "vi"
              ? [["Thuế doanh nghiệp 17%","Mức thuế cạnh tranh hàng đầu châu Á — miễn thuế thu nhập cổ tức và lợi vốn."],["Pháp lý Common Law","Hệ thống pháp lý minh bạch, dựa trên Anh quốc — dễ tranh chấp quốc tế."],["Banking quốc tế","Dễ dàng mở tài khoản DBS, OCBC, Standard Chartered — chấp nhận toàn cầu."]]
              : [["17% corporate tax","Asia-competitive rate — no dividend tax, no capital gains tax."],["Common Law system","Transparent UK-based legal system — easy for international disputes."],["International banking","Easy DBS, OCBC, Standard Chartered accounts — globally accepted."]]
            ).map(([title, desc]) => (
              <div key={title} className="bg-ink-800 border border-ink-600 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-ink-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
