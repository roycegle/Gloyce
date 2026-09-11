import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function HongKongPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🇭🇰 Hong Kong Limited
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              <span className="text-gold-gradient">Hong Kong Limited</span>{" "}
              —{" "}
              {t("cửa ngõ châu Á", "Asia gateway", "亚洲门户", "puerta de Asia", "gerbang Asia")}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {t(
                "Công ty TNHH tại Hồng Kông — cửa ngõ vào thị trường Trung Quốc, hệ thống ngân hàng quốc tế mạnh mẽ, thuế đơn giản chỉ áp dụng trên lợi nhuận phát sinh tại HK.",
                "Hong Kong limited company — gateway to China market, strong international banking, simple territorial tax system applying only to HK-sourced profits.",
                "香港有限公司——进入中国市场的门户，强大的国际银行体系，简单的属地税制仅对香港来源利润征税。",
                "Empresa limitada en Hong Kong — puerta al mercado chino, sólida banca internacional, sistema fiscal territorial simple aplicado solo a beneficios originados en HK.",
                "Perusahaan terbatas Hong Kong — gerbang ke pasar China, perbankan internasional yang kuat, sistem pajak teritorial sederhana yang hanya berlaku atas keuntungan bersumber dari HK."
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
                  vi: ["Xử lý 5–10 ngày làm việc","Company Secretary (năm đầu)","Registered address tại HK","Hỗ trợ mở tài khoản HSBC/Hang Seng","Business Registration Certificate","Profits Tax Return hỗ trợ hàng năm"],
                  en: ["5–10 business day processing","First-year Company Secretary","Registered HK address","HSBC/Hang Seng bank account support","Business Registration Certificate","Annual Profits Tax Return support"],
                  zh: ["5-10个工作日处理","首年公司秘书","香港注册地址","汇丰/恒生银行开户支持","商业登记证书","年度利得税申报支持"],
                  es: ["Procesamiento en 5-10 días hábiles","Secretario Corporativo primer año","Dirección registrada en HK","Soporte para cuenta HSBC/Hang Seng","Certificado de Registro Empresarial","Soporte anual para Declaración de Impuesto a las Ganancias"],
                  id: ["Proses 5-10 hari kerja","Company Secretary tahun pertama","Alamat terdaftar di HK","Dukungan buka rekening HSBC/Hang Seng","Business Registration Certificate","Dukungan Profits Tax Return tahunan"],
                },
                ["5–10 business day processing","First-year Company Secretary","Registered HK address","HSBC/Hang Seng bank account support","Business Registration Certificate","Annual Profits Tax Return support"]
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
    </main>
  );
}
