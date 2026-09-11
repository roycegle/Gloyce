import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function BankAccountPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  const banks = [
    {
      name: "Mercury",
      desc: t("Tốt nhất cho startup Mỹ. USD, không phí hàng tháng, API-first.", "Best for US startups. USD, no monthly fees, API-first.", "最适合美国初创公司。美元，无月费，API优先。", "La mejor opción para startups en EE.UU. USD, sin cuota mensual, API-first.", "Terbaik untuk startup AS. USD, tanpa biaya bulanan, API-first."),
      tags: ["USD", "US LLC", "Free"],
    },
    {
      name: "Wise Business",
      desc: t("Đa tiền tệ. USD, EUR, GBP, SGD, VND. Tỷ giá tốt nhất.", "Multi-currency. USD, EUR, GBP, SGD, VND. Best exchange rates.", "多币种。美元、欧元、英镑、新元、越南盾。最优汇率。", "Multidivisa. USD, EUR, GBP, SGD, VND. Los mejores tipos de cambio.", "Multi-mata uang. USD, EUR, GBP, SGD, VND. Kurs terbaik."),
      tags: ["Multi-currency", "Any entity", "Low fees"],
    },
    {
      name: "Airwallex",
      desc: t("Phù hợp cho e-commerce & cross-border payments. API mạnh.", "Great for e-commerce & cross-border payments. Strong API.", "适合电商和跨境支付。强大的API。", "Ideal para e-commerce y pagos transfronterizos. API potente.", "Cocok untuk e-commerce & pembayaran lintas negara. API kuat."),
      tags: ["USD/SGD/HKD", "E-commerce", "API"],
    },
    {
      name: "Relay",
      desc: t("Thay thế Mercury, ổn định hơn cho LLC Wyoming.", "Mercury alternative, more stable for Wyoming LLCs.", "Mercury的替代选择，对怀俄明州LLC更稳定。", "Alternativa a Mercury, más estable para LLCs de Wyoming.", "Alternatif Mercury, lebih stabil untuk LLC Wyoming."),
      tags: ["USD", "US LLC", "FDIC insured"],
    },
  ];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🏦 {t("Mở tài khoản ngân hàng", "Business bank account", "开设企业银行账户", "Cuenta bancaria empresarial", "Rekening bank bisnis")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              <span className="text-gold-gradient">
                {t("Tài khoản ngân hàng", "International bank account", "国际银行账户", "Cuenta bancaria internacional", "Rekening bank internasional")}
              </span>{" "}
              {t("quốc tế cho công ty của bạn", "for your company", "助力您的企业", "para su empresa", "untuk perusahaan Anda")}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {t(
                "Mở tài khoản Mercury, Wise, Airwallex hoặc Relay 100% online — không cần đến Mỹ hay Singapore. Gloyce hỗ trợ toàn bộ quy trình và kết nối với ngân hàng đối tác.",
                "Open Mercury, Wise, Airwallex or Relay accounts 100% online — no in-person visit required. Gloyce guides the entire process and connects with partner banks.",
                "100%线上开设Mercury、Wise、Airwallex或Relay账户——无需亲赴。Gloyce全程指导并对接合作银行。",
                "Abra cuentas de Mercury, Wise, Airwallex o Relay 100% en línea — sin visita presencial. Gloyce guía todo el proceso y conecta con bancos asociados.",
                "Buka rekening Mercury, Wise, Airwallex, atau Relay 100% online — tanpa kunjungan langsung. Gloyce membimbing seluruh proses dan menghubungkan dengan bank mitra."
              )}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {banks.map(bank => (
              <div key={bank.name} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/30 transition-all">
                <h3 className="font-bold text-foreground text-lg mb-2">{bank.name}</h3>
                <p className="text-sm text-ink-300 mb-4">{bank.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {bank.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-ink-600 text-ink-300">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-ink-800 border border-gold/20 rounded-2xl p-8">
            <h2 className="font-bold text-foreground text-xl mb-4">
              {t("Điều kiện để mở tài khoản", "Account opening requirements", "开户所需条件", "Requisitos para abrir una cuenta", "Persyaratan pembukaan rekening")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ta(
                {
                  vi: ["Công ty đã thành lập hợp lệ (LLC/Pte Ltd/Limited)","EIN (đối với US LLC) hoặc mã số thuế tương đương","Hộ chiếu còn hạn của thành viên/giám đốc","Operating Agreement hoặc M&AA","Certificate of Incorporation","Địa chỉ thực tế (Gloyce cung cấp nếu cần)"],
                  en: ["Valid incorporated company (LLC/Pte Ltd/Limited)","EIN (for US LLC) or equivalent tax ID","Valid passport of members/directors","Operating Agreement or M&AA","Certificate of Incorporation","Physical address (Gloyce provides if needed)"],
                  zh: ["有效注册公司（LLC/私人有限公司/有限公司）","EIN（美国LLC）或同等税号","成员/董事有效护照","运营协议或M&AA","公司注册证书","实际地址（如需，Gloyce提供）"],
                  es: ["Empresa válidamente constituida (LLC/Pte Ltd/Limited)","EIN (para LLC en EE.UU.) o ID fiscal equivalente","Pasaporte válido de miembros/directores","Acuerdo Operativo o M&AA","Certificado de Incorporación","Dirección física (Gloyce la provee si es necesario)"],
                  id: ["Perusahaan yang telah sah terdaftar (LLC/Pte Ltd/Limited)","EIN (untuk US LLC) atau ID pajak setara","Paspor valid anggota/direktur","Operating Agreement atau M&AA","Certificate of Incorporation","Alamat fisik (Gloyce menyediakan jika diperlukan)"],
                },
                ["Valid incorporated company (LLC/Pte Ltd/Limited)","EIN (for US LLC) or equivalent tax ID","Valid passport of members/directors","Operating Agreement or M&AA","Certificate of Incorporation","Physical address (Gloyce provides if needed)"]
              ).map(r => (
                <div key={r} className="flex items-start gap-2 text-sm text-ink-200">
                  <Check size={14} className="text-gold mt-0.5 shrink-0" /> {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
