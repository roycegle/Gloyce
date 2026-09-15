import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, Clock, DollarSign, FileText, Shield, Zap, ChevronDown } from "lucide-react";

export default async function USLLCPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  const steps = [
    {
      title: t("Chọn bang & đặt tên", "Choose state & name", "选择州份和公司名称", "Elegir estado y nombre", "Pilih negara bagian & nama"),
      desc: t("Tư vấn lựa chọn Delaware hay Wyoming. Kiểm tra tên công ty và đặt trước.", "Delaware vs. Wyoming consultation. Company name check and reservation.", "咨询选择特拉华州或怀俄明州。检查并预留公司名称。", "Consulta Delaware o Wyoming. Verificación y reserva de nombre.", "Konsultasi pilih Delaware atau Wyoming. Verifikasi nama perusahaan."),
      time: t("Ngày 1", "Day 1", "第1天", "Día 1", "Hari 1"),
    },
    {
      title: t("Nộp hồ sơ thành lập", "File formation documents", "提交注册文件", "Presentar documentos de constitución", "Mengajukan dokumen pendirian"),
      desc: t("Gloyce nộp Articles of Organization với Registered Agent tại bang được chọn.", "Gloyce files the Articles of Organization with a Registered Agent in your chosen state.", "Gloyce向所选州提交公司章程，并指定注册代理人。", "Gloyce presenta los Artículos de Organización con un Agente Registrado en el estado elegido.", "Gloyce mengajukan Articles of Organization dengan Registered Agent di negara bagian yang dipilih."),
      time: t("Ngày 1–2", "Day 1–2", "第1-2天", "Día 1–2", "Hari 1–2"),
    },
    {
      title: t("Nhận EIN từ IRS", "Obtain EIN from IRS", "从IRS获取EIN", "Obtener EIN del IRS", "Dapatkan EIN dari IRS"),
      desc: t("Đăng ký Employer Identification Number — mã số thuế liên bang Mỹ.", "Employer Identification Number — your US federal tax ID.", "雇主识别号码——您的美国联邦税号。", "Número de Identificación de Empleador — su ID fiscal federal de EE.UU.", "Nomor Identifikasi Majikan — ID pajak federal AS Anda."),
      time: t("Ngày 3–7", "Day 3–7", "第3-7天", "Día 3–7", "Hari 3–7"),
    },
    {
      title: t("Mở tài khoản ngân hàng", "Open a bank account", "开设银行账户", "Abrir cuenta bancaria", "Buka rekening bank"),
      desc: t("Mercury, Relay hoặc ngân hàng đối tác — mở 100% online, không cần đến Mỹ.", "Mercury, Relay or a partner bank — 100% online, no US visit required.", "Mercury、Relay或合作银行——100%线上，无需赴美。", "Mercury, Relay o un banco asociado — 100% en línea, sin visitar EE.UU.", "Mercury, Relay atau bank mitra — 100% online, tidak perlu ke AS."),
      time: t("Ngày 5–10", "Day 5–10", "第5-10天", "Día 5–10", "Hari 5–10"),
    },
    {
      title: t("Nhận hồ sơ hoàn chỉnh", "Receive full package", "收取完整文件包", "Recibir el paquete completo", "Terima paket lengkap"),
      desc: t("Certificate of Formation, Operating Agreement, EIN letter — giao đủ bộ.", "Certificate of Formation, Operating Agreement, EIN letter — fully delivered.", "成立证书、运营协议、EIN信函——全套交付。", "Certificado de Constitución, Acuerdo Operativo, carta EIN — entrega completa.", "Certificate of Formation, Operating Agreement, surat EIN — selesai."),
      time: t("Ngày 10–14", "Day 10–14", "第10-14天", "Día 10–14", "Hari 10–14"),
    },
  ];

  const features = [
    {
      icon: Clock,
      title: t("7–14 ngày", "7–14 days", "7–14天", "7–14 días", "7–14 hari"),
      desc: t("Thời gian xử lý trung bình từ khi đặt hàng đến khi nhận hồ sơ", "Average processing time from order to document delivery", "从下单到收到文件的平均处理时间", "Tiempo de procesamiento promedio desde el pedido hasta la entrega", "Waktu pemrosesan rata-rata dari pemesanan hingga pengiriman dokumen"),
    },
    {
      icon: DollarSign,
      title: t("Giá trọn gói rõ ràng", "Transparent flat fee", "透明固定费用", "Tarifa fija transparente", "Biaya tetap transparan"),
      desc: t("Không phí ẩn. Bao gồm phí bang, Registered Agent năm đầu và EIN", "No hidden charges. Includes state fee, first-year Registered Agent and EIN", "无隐藏收费。包含州注册费、首年注册代理人和EIN", "Sin cargos ocultos. Incluye tarifa estatal, primer año de Agente Registrado y EIN", "Tanpa biaya tersembunyi. Termasuk biaya negara bagian, Registered Agent tahun pertama, dan EIN"),
    },
    {
      icon: Shield,
      title: t("100% online", "100% remote", "100%线上办理", "100% remoto", "100% online"),
      desc: t("Không cần đến Mỹ, không cần SSN/ITIN — hoàn toàn từ xa", "No US visit required, no SSN/ITIN needed", "无需赴美，无需SSN/ITIN", "Sin visita a EE.UU., sin SSN/ITIN requerido", "Tidak perlu ke AS, tidak perlu SSN/ITIN"),
    },
    {
      icon: FileText,
      title: "Form 5472 & BOI Report",
      desc: t("Gloyce lo toàn bộ nghĩa vụ báo cáo IRS bắt buộc cho LLC nước ngoài", "Gloyce handles all mandatory IRS reporting obligations for foreign-owned LLCs", "Gloyce处理外资LLC所有强制IRS报告义务", "Gloyce gestiona todas las obligaciones de informes del IRS para LLC extranjeras", "Gloyce menangani semua kewajiban pelaporan IRS wajib untuk LLC asing"),
    },
    {
      icon: Zap,
      title: t("Hỗ trợ đa ngôn ngữ toàn trình", "Multilingual support", "多语言全程支持", "Soporte multilingüe", "Dukungan multibahasa"),
      desc: t("Hỗ trợ đa ngôn ngữ từ tư vấn đến nhận hồ sơ", "Full multilingual support from consultation to document delivery", "从咨询到文件交付提供多语言全程支持", "Soporte multilingüe completo desde la consulta hasta la entrega de documentos", "Dukungan multibahasa penuh dari konsultasi hingga pengiriman dokumen"),
    },
    {
      icon: Check,
      title: t("Tuân thủ từ ngày đầu", "Compliant from day one", "从第一天起合规", "Conforme desde el primer día", "Patuh dari hari pertama"),
      desc: t("Operating Agreement, Registered Agent và filing cơ bản được setup đúng từ đầu", "Operating Agreement, Registered Agent and core filings set up correctly from the start", "运营协议、注册代理人和核心文件从一开始就正确设置", "Acuerdo Operativo, Agente Registrado y trámites clave configurados correctamente desde el inicio", "Operating Agreement, Registered Agent, dan pengajuan inti diatur dengan benar sejak awal"),
    },
  ];

  const faqs = [
    {
      q: t("Người châu Á có thể mở LLC Mỹ không?", "Can non-US nationals open a US LLC?", "非美国公民可以开设美国LLC吗？", "¿Los no ciudadanos pueden abrir una LLC en EE.UU.?", "Apakah warga negara asing bisa membuka LLC AS?"),
      a: t(
        "Có. Người nước ngoài được phép thành lập và sở hữu 100% LLC tại Mỹ mà không cần visa, thẻ xanh hay SSN. LLC thuộc sở hữu nước ngoài cần nộp Form 5472 hàng năm với IRS — Gloyce lo toàn bộ phần này.",
        "Yes. Non-US residents can own 100% of a US LLC without a visa, green card or SSN. Foreign-owned LLCs must file Form 5472 annually with the IRS — Gloyce handles all of this for you.",
        "可以。非美国居民可以100%拥有美国LLC，无需签证、绿卡或SSN。外资LLC必须每年向IRS提交5472表——Gloyce为您处理所有事务。",
        "Sí. Los no residentes en EE.UU. pueden poseer el 100% de una LLC estadounidense sin visa, green card o SSN. Las LLC de propiedad extranjera deben presentar el Formulario 5472 anualmente ante el IRS — Gloyce lo gestiona todo.",
        "Ya. Bukan warga AS dapat memiliki 100% LLC AS tanpa visa, green card, atau SSN. LLC milik asing harus mengajukan Form 5472 setiap tahun ke IRS — Gloyce menangani semuanya."
      ),
    },
    {
      q: t("Delaware và Wyoming khác nhau thế nào?", "Delaware vs Wyoming — what's the difference?", "特拉华州与怀俄明州有什么区别？", "Delaware vs Wyoming — ¿cuál es la diferencia?", "Delaware vs Wyoming — apa bedanya?"),
      a: t(
        "Delaware được ưu tiên nếu bạn muốn huy động vốn VC/angel investor — hệ thống luật công ty phát triển nhất Mỹ. Wyoming rẻ hơn (phí bang thấp), bảo mật thông tin tốt hơn, phù hợp cho công ty gia đình hoặc không có kế hoạch gọi vốn.",
        "Delaware is preferred for VC/angel fundraising — it has the most developed corporate law in the US. Wyoming is cheaper (lower state fees), more private, and better suited for family businesses or those without fundraising plans.",
        "特拉华州适合VC/天使投资融资——拥有美国最成熟的公司法。怀俄明州更便宜（州费用更低），隐私保护更好，更适合家族企业或无融资计划的公司。",
        "Delaware es preferido para financiamiento VC/angel — tiene la ley corporativa más desarrollada de EE.UU. Wyoming es más barato (menores tarifas estatales), más privado y mejor para empresas familiares o sin planes de financiamiento.",
        "Delaware lebih disukai untuk pendanaan VC/angel — memiliki hukum korporasi paling berkembang di AS. Wyoming lebih murah (biaya negara bagian lebih rendah), lebih privat, dan lebih cocok untuk bisnis keluarga atau yang tidak merencanakan pendanaan."
      ),
    },
    {
      q: t("EIN là gì và tôi có cần không?", "What is an EIN and do I need one?", "什么是EIN，我需要吗？", "¿Qué es un EIN y lo necesito?", "Apa itu EIN dan apakah saya membutuhkannya?"),
      a: t(
        "EIN (Employer Identification Number) là mã số thuế liên bang Mỹ, tương đương mã số thuế doanh nghiệp. Bạn cần EIN để mở tài khoản ngân hàng Mỹ, khai báo thuế, và ký hợp đồng với Amazon/Stripe/PayPal.",
        "An EIN (Employer Identification Number) is the US federal tax ID — similar to your local business tax code. You need it to open a US bank account, file taxes, and sign contracts with Amazon/Stripe/PayPal.",
        "EIN（雇主识别号码）是美国联邦税号——类似于您本地的企业税号。您需要EIN才能开设美国银行账户、申报税款以及与Amazon/Stripe/PayPal签订合同。",
        "Un EIN (Número de Identificación del Empleador) es el ID fiscal federal de EE.UU. — equivalente al código fiscal empresarial local. Lo necesita para abrir una cuenta bancaria en EE.UU., presentar impuestos y firmar contratos con Amazon/Stripe/PayPal.",
        "EIN (Employer Identification Number) adalah ID pajak federal AS — mirip dengan kode pajak bisnis lokal Anda. Anda membutuhkan EIN untuk membuka rekening bank AS, mengajukan pajak, dan menandatangani kontrak dengan Amazon/Stripe/PayPal."
      ),
    },
    {
      q: t("Sau khi thành lập tôi cần làm gì hàng năm?", "What annual obligations does an LLC have?", "LLC每年有哪些义务？", "¿Qué obligaciones anuales tiene una LLC?", "Apa kewajiban tahunan LLC?"),
      a: t(
        "LLC Delaware cần nộp Annual Franchise Tax (~$300/năm) trước ngày 1/6. Nếu có doanh thu, bạn cần nộp Form 1065 hoặc khai báo thuế cá nhân. Gloyce cung cấp dịch vụ kế toán & compliance hàng năm để lo phần này cho bạn.",
        "Delaware LLCs must pay the Annual Franchise Tax (~$300/year) by June 1. If you have revenue, you need to file Form 1065 or include it in personal tax returns. Gloyce's accounting & compliance service handles all of this for you.",
        "特拉华州LLC必须在6月1日前支付年度特许税（约$300/年）。如果有收入，需要提交1065表或在个人税申报中申报。Gloyce的会计及合规服务为您处理所有这些事宜。",
        "Las LLC de Delaware deben pagar el Impuesto de Franquicia Anual (~$300/año) antes del 1 de junio. Si tiene ingresos, debe presentar el Formulario 1065 o incluirlo en declaraciones personales. El servicio de contabilidad y cumplimiento de Gloyce lo gestiona todo.",
        "LLC Delaware harus membayar Annual Franchise Tax (~$300/tahun) sebelum 1 Juni. Jika ada pendapatan, perlu mengajukan Form 1065 atau menyertakannya dalam laporan pajak pribadi. Layanan akuntansi & kepatuhan Gloyce menangani semuanya."
      ),
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.10)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              {t("Thành lập công ty", "Incorporation", "成立公司", "Incorporación", "Pembentukan")} / {t("LLC tại Mỹ", "US LLC", "美国LLC", "LLC en EE.UU.", "LLC AS")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {t("Thành lập", "Open a", "成立", "Abre una", "Dirikan")}{" "}
              <span className="text-gold-gradient">
                {t("LLC Mỹ", "US LLC", "美国LLC", "LLC en EE.UU.", "LLC AS")}
              </span>{" "}
              {t("cho doanh nghiệp châu Á", "as an Asian business", "为亚洲企业", "como empresa asiática", "untuk bisnis Asia")}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {t(
                "Delaware hoặc Wyoming LLC — trọn gói từ hồ sơ thành lập, EIN, tài khoản ngân hàng đến Form 5472 & BOI Report. 100% online, không cần đến Mỹ.",
                "Delaware or Wyoming LLC — complete package including formation documents, EIN, bank account and Form 5472 & BOI Report. 100% remote, no US visit required.",
                "特拉华州或怀俄明州LLC——完整套餐包括注册文件、EIN、银行账户以及5472表和BOI报告。100%线上，无需赴美。",
                "LLC en Delaware o Wyoming — paquete completo con documentos de constitución, EIN, cuenta bancaria y Form 5472 & BOI Report. 100% remoto, sin visitar EE.UU.",
                "LLC Delaware atau Wyoming — paket lengkap termasuk dokumen pendirian, EIN, rekening bank, dan Form 5472 & BOI Report. 100% online, tidak perlu ke AS."
              )}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
                {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={15} />
              </Link>
              <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
                {t("Đặt lịch tư vấn", "Schedule a call", "预约咨询", "Agendar una llamada", "Jadwalkan panggilan")}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-ink-300">
              {ta(
                {
                  vi: ["Xử lý trong 7–14 ngày", "Giá trọn gói từ $499", "Hỗ trợ đa ngôn ngữ"],
                  en: ["7–14 day processing", "From $499 all-in", "Multilingual support"],
                  zh: ["7-14天处理", "全包价格从$499起", "多语言支持"],
                  es: ["Procesamiento en 7-14 días", "Todo incluido desde $499", "Soporte multilingüe"],
                  id: ["Proses 7-14 hari", "All-in dari $499", "Dukungan multibahasa"],
                },
                ["7–14 day processing", "From $499 all-in", "Multilingual support"]
              ).map(f => (
                <span key={f} className="flex items-center gap-1.5"><Check size={14} className="text-gold" />{f}</span>
              ))}
            </div>
          </div>
          {/* Price card */}
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-ink-400 mb-1">{t("Trọn gói từ", "All-inclusive from", "全包价格", "Todo incluido desde", "Harga all-inclusive dari")}</p>
            <p className="text-5xl font-black text-foreground mb-1">$499</p>
            <p className="text-sm text-ink-400 mb-6">USD · {t("thanh toán một lần", "one-time payment", "一次性付款", "pago único", "pembayaran satu kali")}</p>
            <div className="space-y-3 mb-6">
              {ta(
                {
                  vi: ["Phí bang Delaware/Wyoming","Registered Agent (năm đầu)","EIN từ IRS","Operating Agreement chuẩn","Certificate of Formation","Hỗ trợ đa ngôn ngữ trọn trình","Form 5472 & BOI Report cơ bản"],
                  en: ["State filing fee (Delaware/Wyoming)","First-year Registered Agent","EIN from IRS","Standard Operating Agreement","Certificate of Formation","Full multilingual support","Form 5472 & BOI Report basics"],
                  zh: ["州注册费（特拉华/怀俄明）","首年注册代理人","IRS颁发的EIN","标准运营协议","成立证书","全程多语言支持","5472表和BOI报告基础"],
                  es: ["Tarifa de registro estatal (Delaware/Wyoming)","Agente Registrado primer año","EIN del IRS","Acuerdo Operativo estándar","Certificado de Constitución","Soporte multilingüe completo","Form 5472 y BOI Report básicos"],
                  id: ["Biaya pengajuan negara bagian (Delaware/Wyoming)","Registered Agent tahun pertama","EIN dari IRS","Operating Agreement standar","Certificate of Formation","Dukungan multibahasa penuh","Form 5472 & BOI Report dasar"],
                },
                ["State filing fee (Delaware/Wyoming)","First-year Registered Agent","EIN from IRS","Standard Operating Agreement","Certificate of Formation","Full multilingual support","Form 5472 & BOI Report basics"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-ink-200">
                  <Check size={15} className="text-emerald-400 shrink-0" /> {f}
                </div>
              ))}
            </div>
            <Link href="/contact" className="block text-center py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {t("Bắt đầu thành lập", "Start incorporation", "开始注册", "Comenzar incorporación", "Mulai pembentukan")}
            </Link>
            <p className="text-xs text-ink-500 text-center mt-3">{t("Không cần thẻ tín dụng để đặt lịch tư vấn", "No credit card required to schedule a call", "预约咨询无需信用卡", "No se requiere tarjeta de crédito para agendar", "Tidak perlu kartu kredit untuk jadwalkan panggilan")}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-ink-800 border border-ink-600 rounded-xl p-5">
                  <Icon className="w-5 h-5 text-gold mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-300">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-20 border-t border-ink-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("QUY TRÌNH", "PROCESS", "办理流程", "PROCESO", "PROSES")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">
            {t("Từ đặt hàng đến nhận hồ sơ trong 14 ngày", "From order to documents in 14 days", "从下单到收到文件14天", "De la orden a los documentos en 14 días", "Dari pemesanan hingga dokumen dalam 14 hari")}
          </h2>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 pb-8 last:pb-0 group">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center text-sm font-bold text-gold shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-ink-700 mt-2" />}
                </div>
                <div className="pt-1.5 pb-6">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">{step.time}</span>
                  </div>
                  <p className="text-sm text-ink-300">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">FAQ</p>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {t("Câu hỏi thường gặp", "Frequently asked questions", "常见问题解答", "Preguntas frecuentes", "Pertanyaan yang sering diajukan")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-ink-800 border border-ink-600 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-ink-700/50 rounded-xl transition-colors">
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <ChevronDown size={16} className="text-ink-400 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-ink-300 leading-relaxed border-t border-ink-700 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-ink-700">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {t("Sẵn sàng mở LLC Mỹ?", "Ready to open your US LLC?", "准备好开设美国LLC了吗？", "¿Listo para abrir su LLC en EE.UU.?", "Siap membuka LLC AS Anda?")}
          </h2>
          <p className="text-ink-300 mb-6">
            {t("Đặt lịch tư vấn miễn phí — đội ngũ Gloyce sẽ liên hệ trong vòng 24 giờ.", "Book a free consultation — the Gloyce team will contact you within 24 hours.", "预约免费咨询——Gloyce团队将在24小时内与您联系。", "Agenda una consulta gratuita — el equipo de Gloyce se comunicará en 24 horas.", "Jadwalkan konsultasi gratis — tim Gloyce akan menghubungi Anda dalam 24 jam.")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-ink-900 font-semibold hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {t("Đặt lịch tư vấn miễn phí", "Book a free consultation", "预约免费咨询", "Agendar consulta gratuita", "Jadwalkan konsultasi gratis")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
