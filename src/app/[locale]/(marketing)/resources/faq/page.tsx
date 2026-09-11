"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

type L = { vi: string; en: string; zh: string; es: string; id: string };

function pick(locale: string, l: L): string {
  return (l as Record<string, string>)[locale] ?? l.en;
}

type FAQ = { q: L; a: L };
type Category = { id: string; label: L; faqs: FAQ[] };

const CATEGORIES: Category[] = [
  {
    id: "llc",
    label: { vi: "LLC tại Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC en EE.UU.", id: "LLC AS" },
    faqs: [
      {
        q: {
          vi: "Người châu Á có thể mở LLC tại Mỹ không?",
          en: "Can Asian nationals open a US LLC?",
          zh: "亚洲人可以在美国开设LLC吗？",
          es: "¿Los ciudadanos asiáticos pueden abrir una LLC en EE.UU.?",
          id: "Apakah warga negara Asia bisa membuka LLC AS?",
        },
        a: {
          vi: "Có. Không cần quốc tịch Mỹ hay visa để thành lập LLC. Bất kỳ cá nhân hoặc tổ chức nước ngoài nào cũng có thể là thành viên (member) của một LLC Mỹ. Bạn chỉ cần có hộ chiếu và địa chỉ liên lạc hợp lệ.",
          en: "Yes. US citizenship or a visa is not required to form an LLC. Any foreign individual or entity can be a member of a US LLC. You only need a valid passport and a contact address.",
          zh: "可以。成立LLC不需要美国公民身份或签证。任何外国个人或实体都可以成为美国LLC的成员。您只需要有效护照和联系地址。",
          es: "Sí. No se requiere ciudadanía estadounidense ni visa para formar una LLC. Cualquier individuo u organización extranjera puede ser miembro de una LLC en EE.UU. Solo necesita un pasaporte válido y una dirección de contacto.",
          id: "Ya. Kewarganegaraan AS atau visa tidak diperlukan untuk membentuk LLC. Individu atau entitas asing mana pun dapat menjadi anggota LLC AS. Anda hanya memerlukan paspor valid dan alamat kontak.",
        },
      },
      {
        q: {
          vi: "Nên chọn Delaware hay Wyoming để mở LLC?",
          en: "Delaware or Wyoming — which is better for your LLC?",
          zh: "特拉华州还是怀俄明州——哪个更适合开设LLC？",
          es: "Delaware o Wyoming — ¿cuál es mejor para su LLC?",
          id: "Delaware atau Wyoming — mana yang lebih baik untuk LLC Anda?",
        },
        a: {
          vi: "Delaware phù hợp cho công ty muốn gọi vốn VC, có nhiều thành viên quốc tế hoặc cần hệ thống pháp lý rõ ràng nhất. Wyoming phù hợp hơn cho LLC một thành viên (single-member), chi phí thấp hơn và bảo vệ tài sản tốt hơn. Gloyce tư vấn miễn phí để giúp bạn chọn đúng từ đầu.",
          en: "Delaware is better for companies seeking VC funding, with multiple international members, or needing the clearest legal system. Wyoming is better suited for single-member LLCs, with lower costs and stronger asset protection. Gloyce offers free advice to help you choose correctly from the start.",
          zh: "特拉华州适合寻求VC融资、有多个国际成员或需要最清晰法律体系的公司。怀俄明州更适合单成员LLC，成本更低，资产保护更强。Gloyce提供免费咨询，帮助您从一开始就做出正确选择。",
          es: "Delaware es mejor para empresas que buscan financiamiento de VC, con múltiples miembros internacionales, o que necesitan el sistema legal más claro. Wyoming es más adecuado para LLC de un solo miembro, con costos más bajos y mayor protección de activos. Gloyce ofrece asesoría gratuita para ayudarle a elegir correctamente desde el inicio.",
          id: "Delaware lebih baik untuk perusahaan yang mencari pendanaan VC, dengan beberapa anggota internasional, atau membutuhkan sistem hukum yang paling jelas. Wyoming lebih cocok untuk LLC single-member, dengan biaya lebih rendah dan perlindungan aset yang lebih kuat. Gloyce menawarkan saran gratis untuk membantu Anda memilih dengan benar sejak awal.",
        },
      },
      {
        q: {
          vi: "Mất bao lâu để thành lập LLC?",
          en: "How long does it take to form an LLC?",
          zh: "成立LLC需要多长时间？",
          es: "¿Cuánto tiempo tarda en formarse una LLC?",
          id: "Berapa lama waktu yang dibutuhkan untuk membentuk LLC?",
        },
        a: {
          vi: "Thông thường 7–14 ngày làm việc từ khi nộp hồ sơ. Delaware có dịch vụ expedited (1–3 ngày) với phí phụ thu. Sau khi LLC được phê duyệt, EIN từ IRS thường mất thêm 1–2 tuần nếu nộp qua fax, hoặc ngay lập tức nếu có ITIN.",
          en: "Typically 7–14 business days from filing. Delaware offers an expedited service (1–3 days) for an additional fee. Once the LLC is approved, an EIN from the IRS usually takes an additional 1–2 weeks by fax, or immediately with an ITIN.",
          zh: "通常从提交文件到批准需要7-14个工作日。特拉华州提供加急服务（1-3天），需额外收费。LLC获批后，通过传真获取IRS的EIN通常需要额外1-2周，有ITIN则可立即获得。",
          es: "Normalmente 7–14 días hábiles desde la presentación. Delaware ofrece un servicio acelerado (1–3 días) por una tarifa adicional. Una vez aprobada la LLC, un EIN del IRS suele tardar 1–2 semanas adicionales por fax, o de inmediato con ITIN.",
          id: "Biasanya 7–14 hari kerja sejak pengajuan. Delaware menawarkan layanan dipercepat (1–3 hari) dengan biaya tambahan. Setelah LLC disetujui, EIN dari IRS biasanya membutuhkan tambahan 1–2 minggu melalui fax, atau segera jika memiliki ITIN.",
        },
      },
      {
        q: {
          vi: "EIN là gì và tôi có cần nó không?",
          en: "What is an EIN and do I need one?",
          zh: "什么是EIN？我需要吗？",
          es: "¿Qué es un EIN y lo necesito?",
          id: "Apa itu EIN dan apakah saya membutuhkannya?",
        },
        a: {
          vi: "EIN (Employer Identification Number) là mã số thuế liên bang của công ty — tương tự MST ở Việt Nam. Bạn cần EIN để mở tài khoản ngân hàng Mỹ, đăng ký Stripe/PayPal, ký hợp đồng với đối tác Mỹ và nộp báo cáo thuế liên bang. Gloyce lo toàn bộ quy trình xin EIN cho bạn.",
          en: "An EIN (Employer Identification Number) is the company's federal tax ID — similar to Vietnam's business tax code. You need an EIN to open a US bank account, register with Stripe/PayPal, sign contracts with US partners, and file federal tax reports. Gloyce handles the entire EIN application process for you.",
          zh: "EIN（雇主识别号码）是公司的联邦税号——类似于越南的企业税号。您需要EIN才能开设美国银行账户、在Stripe/PayPal注册、与美国合作伙伴签合同以及提交联邦税务报告。Gloyce为您处理整个EIN申请流程。",
          es: "Un EIN (Número de Identificación del Empleador) es el ID fiscal federal de la empresa — similar al código tributario empresarial de Vietnam. Necesita un EIN para abrir una cuenta bancaria en EE.UU., registrarse en Stripe/PayPal, firmar contratos con socios estadounidenses y presentar informes fiscales federales. Gloyce gestiona todo el proceso de solicitud de EIN.",
          id: "EIN (Employer Identification Number) adalah ID pajak federal perusahaan — mirip dengan kode pajak bisnis Vietnam. Anda memerlukan EIN untuk membuka rekening bank AS, mendaftar di Stripe/PayPal, menandatangani kontrak dengan mitra AS, dan mengajukan laporan pajak federal. Gloyce menangani seluruh proses permohonan EIN untuk Anda.",
        },
      },
      {
        q: {
          vi: "LLC có phải đóng thuế ở Mỹ không?",
          en: "Does an LLC pay taxes in the US?",
          zh: "LLC需要在美国缴税吗？",
          es: "¿Una LLC paga impuestos en EE.UU.?",
          id: "Apakah LLC membayar pajak di AS?",
        },
        a: {
          vi: "LLC một thành viên (single-member) bị mặc định coi là 'disregarded entity' — nghĩa là lợi nhuận chảy thẳng qua (pass-through) vào thuế cá nhân của chủ. Với non-resident alien (người nước ngoài không cư trú ở Mỹ) không có thu nhập nguồn gốc Mỹ (ECI), thường không phát sinh thuế liên bang. Nhưng vẫn phải nộp Form 5472 và các báo cáo bắt buộc.",
          en: "A single-member LLC is treated as a 'disregarded entity' by default — meaning profits pass through directly to the owner's personal taxes. For non-resident aliens without US-source income (ECI), federal tax liability generally does not arise. However, Form 5472 and other mandatory reports must still be filed.",
          zh: "单成员LLC默认被视为'被忽略实体'——即利润直接转嫁到所有者的个人税务。对于没有美国来源收入（ECI）的非居民外国人，通常不会产生联邦税负。但仍必须提交5472表和其他强制报告。",
          es: "Una LLC de un solo miembro se trata como una 'entidad ignorada' por defecto — lo que significa que las ganancias pasan directamente a los impuestos personales del propietario. Para los extranjeros no residentes sin ingresos de fuente estadounidense (ECI), generalmente no surge obligación tributaria federal. Sin embargo, aún deben presentarse el Formulario 5472 y otros reportes obligatorios.",
          id: "LLC single-member diperlakukan sebagai 'disregarded entity' secara default — artinya keuntungan langsung diteruskan ke pajak pribadi pemilik. Untuk orang asing non-residen tanpa pendapatan sumber AS (ECI), kewajiban pajak federal umumnya tidak timbul. Namun, Form 5472 dan laporan wajib lainnya tetap harus diajukan.",
        },
      },
    ],
  },
  {
    id: "banking",
    label: { vi: "Tài khoản ngân hàng", en: "Bank account", zh: "银行账户", es: "Cuenta bancaria", id: "Rekening bank" },
    faqs: [
      {
        q: {
          vi: "Mở tài khoản ngân hàng Mỹ có cần sang Mỹ không?",
          en: "Do I need to visit the US to open a US bank account?",
          zh: "开设美国银行账户需要去美国吗？",
          es: "¿Necesito visitar EE.UU. para abrir una cuenta bancaria americana?",
          id: "Apakah perlu ke AS untuk membuka rekening bank AS?",
        },
        a: {
          vi: "Không. Mercury, Relay và Wise Business đều cho phép mở tài khoản 100% online mà không cần đến Mỹ. Tuy nhiên yêu cầu LLC đã có EIN và địa chỉ Registered Agent hợp lệ. Tỷ lệ phê duyệt phụ thuộc vào ngành nghề và lịch sử tài chính. Gloyce có quy trình tối ưu để tăng tỷ lệ thành công.",
          en: "No. Mercury, Relay, and Wise Business all allow 100% online account opening without visiting the US. However, they require an LLC with a valid EIN and Registered Agent address. Approval rates depend on industry and financial history. Gloyce has an optimized process to increase your success rate.",
          zh: "不需要。Mercury、Relay和Wise Business都允许100%线上开户，无需前往美国。但需要LLC已有有效的EIN和注册代理人地址。审批率取决于行业和财务历史。Gloyce有优化流程来提高您的成功率。",
          es: "No. Mercury, Relay y Wise Business permiten abrir cuentas 100% en línea sin visitar EE.UU. Sin embargo, requieren una LLC con EIN válido y dirección de Agente Registrado. Las tasas de aprobación dependen de la industria e historial financiero. Gloyce tiene un proceso optimizado para aumentar su tasa de éxito.",
          id: "Tidak. Mercury, Relay, dan Wise Business semuanya memungkinkan pembukaan rekening 100% online tanpa mengunjungi AS. Namun, memerlukan LLC yang sudah memiliki EIN valid dan alamat Registered Agent. Tingkat persetujuan bergantung pada industri dan riwayat keuangan. Gloyce memiliki proses yang dioptimalkan untuk meningkatkan tingkat keberhasilan Anda.",
        },
      },
      {
        q: {
          vi: "Nên dùng Mercury, Relay hay Wise?",
          en: "Mercury, Relay or Wise — which should I use?",
          zh: "Mercury、Relay还是Wise——该用哪个？",
          es: "Mercury, Relay o Wise — ¿cuál debo usar?",
          id: "Mercury, Relay, atau Wise — mana yang sebaiknya digunakan?",
        },
        a: {
          vi: "Mercury là lựa chọn phổ biến nhất cho startup và seller — giao diện đẹp, tích hợp Stripe/PayPal tốt, không phí duy trì. Relay phù hợp cho doanh nghiệp cần tách tài khoản theo mục đích (budget buckets). Wise Business phù hợp khi cần chuyển tiền quốc tế nhiều với phí thấp. Gloyce tư vấn và hỗ trợ mở cả ba.",
          en: "Mercury is the most popular choice for startups and sellers — great UI, strong Stripe/PayPal integration, no maintenance fees. Relay suits businesses that need separate accounts by purpose (budget buckets). Wise Business is best when making frequent international transfers at low fees. Gloyce advises and supports all three.",
          zh: "Mercury是初创公司和卖家最受欢迎的选择——界面美观、Stripe/PayPal集成强、无维护费。Relay适合需要按用途分开账户（预算分桶）的企业。Wise Business最适合需要频繁以低费率进行国际转账的场景。Gloyce提供咨询并支持这三种选择。",
          es: "Mercury es la opción más popular para startups y vendedores — gran interfaz, fuerte integración con Stripe/PayPal, sin tarifas de mantenimiento. Relay es adecuado para negocios que necesitan cuentas separadas por propósito (presupuestos). Wise Business es mejor para transferencias internacionales frecuentes con bajas comisiones. Gloyce asesora y apoya las tres opciones.",
          id: "Mercury adalah pilihan paling populer untuk startup dan penjual — antarmuka bagus, integrasi Stripe/PayPal kuat, tanpa biaya pemeliharaan. Relay cocok untuk bisnis yang membutuhkan akun terpisah berdasarkan tujuan (budget buckets). Wise Business terbaik untuk transfer internasional yang sering dengan biaya rendah. Gloyce memberikan saran dan mendukung ketiganya.",
        },
      },
      {
        q: {
          vi: "Có thể nhận tiền từ Amazon/Shopee vào tài khoản Mỹ không?",
          en: "Can I receive Amazon/Shopee payments into a US account?",
          zh: "可以将亚马逊/Shopee的款项收入美国账户吗？",
          es: "¿Puedo recibir pagos de Amazon/Shopee en una cuenta de EE.UU.?",
          id: "Bisakah menerima pembayaran Amazon/Shopee ke rekening AS?",
        },
        a: {
          vi: "Có. Mercury và Relay đều được Amazon Seller Central, Shopee Global, TikTok Shop Affiliate chấp nhận là tài khoản nhận thanh toán. Bạn cần cung cấp số account và routing number khi đăng ký.",
          en: "Yes. Mercury and Relay are both accepted by Amazon Seller Central, Shopee Global, and TikTok Shop Affiliate as payment receiving accounts. You need to provide the account and routing numbers when registering.",
          zh: "可以。Mercury和Relay都被Amazon Seller Central、Shopee Global和TikTok Shop Affiliate接受为收款账户。注册时需要提供账户号码和路由号码。",
          es: "Sí. Mercury y Relay son aceptados por Amazon Seller Central, Shopee Global y TikTok Shop Affiliate como cuentas receptoras de pagos. Debe proporcionar el número de cuenta y de ruta al registrarse.",
          id: "Ya. Mercury dan Relay keduanya diterima oleh Amazon Seller Central, Shopee Global, dan TikTok Shop Affiliate sebagai rekening penerima pembayaran. Anda perlu memberikan nomor rekening dan routing saat mendaftar.",
        },
      },
    ],
  },
  {
    id: "compliance",
    label: { vi: "Tuân thủ & Khai báo", en: "Compliance & Filing", zh: "合规与申报", es: "Cumplimiento & Declaración", id: "Kepatuhan & Pengajuan" },
    faqs: [
      {
        q: {
          vi: "Form 5472 là gì và khi nào phải nộp?",
          en: "What is Form 5472 and when must it be filed?",
          zh: "5472表是什么？何时必须提交？",
          es: "¿Qué es el Formulario 5472 y cuándo debe presentarse?",
          id: "Apa itu Form 5472 dan kapan harus diajukan?",
        },
        a: {
          vi: "Form 5472 là báo cáo bắt buộc của IRS dành cho LLC sở hữu bởi người nước ngoài (foreign-owned disregarded entity). Phải nộp hàng năm cùng với Form 1120 (pro-forma). Hạn nộp: 15 tháng 4 (có thể gia hạn đến 15 tháng 10). Phạt không nộp: $25,000 mỗi lần vi phạm.",
          en: "Form 5472 is the mandatory IRS report for foreign-owned LLCs (disregarded entities). It must be filed annually along with Form 1120 (pro-forma). Deadline: April 15 (extendable to October 15). Failure to file penalty: $25,000 per violation.",
          zh: "5472表是IRS对外资LLC（被忽略实体）的强制报告。必须每年与1120表（形式上）一起提交。截止日期：4月15日（可延至10月15日）。未申报罚款：每次违规$25,000。",
          es: "El Formulario 5472 es el informe obligatorio del IRS para LLC de propiedad extranjera (entidades ignoradas). Debe presentarse anualmente junto con el Formulario 1120 (pro-forma). Plazo: 15 de abril (ampliable al 15 de octubre). Penalidad por no presentar: $25,000 por infracción.",
          id: "Form 5472 adalah laporan IRS wajib untuk LLC milik asing (disregarded entity). Harus diajukan setiap tahun bersama Form 1120 (pro-forma). Tenggat: 15 April (dapat diperpanjang hingga 15 Oktober). Denda tidak mengajukan: $25.000 per pelanggaran.",
        },
      },
      {
        q: {
          vi: "BOI Report là gì?",
          en: "What is a BOI Report?",
          zh: "什么是BOI报告？",
          es: "¿Qué es el Reporte BOI?",
          id: "Apa itu BOI Report?",
        },
        a: {
          vi: "Beneficial Ownership Information (BOI) Report là báo cáo bắt buộc theo Luật Corporate Transparency Act của Mỹ, nộp cho FinCEN. LLC thành lập trước 2024 phải nộp trước 1/1/2025. LLC thành lập từ 2024 phải nộp trong vòng 90 ngày sau khi được phê duyệt. Phạt không nộp: $591/ngày.",
          en: "The Beneficial Ownership Information (BOI) Report is a mandatory report under the US Corporate Transparency Act, filed with FinCEN. LLCs formed before 2024 had to file by January 1, 2025. LLCs formed from 2024 must file within 90 days of approval. Failure to file penalty: $591/day.",
          zh: "实益所有权信息（BOI）报告是根据美国《企业透明度法》向FinCEN提交的强制性报告。2024年前成立的LLC必须在2025年1月1日前提交。2024年起成立的LLC必须在获批后90天内提交。未申报罚款：$591/天。",
          es: "El Reporte de Información de Beneficiarios Reales (BOI) es un reporte obligatorio bajo la Ley de Transparencia Corporativa de EE.UU., presentado ante FinCEN. Las LLC formadas antes de 2024 debían presentarlo antes del 1 de enero de 2025. Las LLC formadas desde 2024 deben presentarlo dentro de los 90 días posteriores a su aprobación. Penalidad: $591/día.",
          id: "Beneficial Ownership Information (BOI) Report adalah laporan wajib berdasarkan Corporate Transparency Act AS, diajukan ke FinCEN. LLC yang dibentuk sebelum 2024 harus mengajukan sebelum 1 Januari 2025. LLC yang dibentuk sejak 2024 harus mengajukan dalam 90 hari setelah persetujuan. Denda: $591/hari.",
        },
      },
      {
        q: {
          vi: "Annual Report và Franchise Tax là gì?",
          en: "What are the Annual Report and Franchise Tax?",
          zh: "什么是年度报告和特许税？",
          es: "¿Qué son el Informe Anual y el Impuesto de Franquicia?",
          id: "Apa itu Annual Report dan Franchise Tax?",
        },
        a: {
          vi: "Đây là nghĩa vụ hàng năm với tiểu bang — Delaware yêu cầu nộp Annual Franchise Tax (tối thiểu $300/năm) trước ngày 1/6. Wyoming yêu cầu Annual Report với phí $60. Nộp trễ bị phạt và LLC có thể bị revoke. Gloyce theo dõi và nhắc nhở tất cả deadline cho bạn.",
          en: "These are annual obligations to the state — Delaware requires the Annual Franchise Tax (minimum $300/year) by June 1. Wyoming requires an Annual Report with a $60 fee. Late filing incurs penalties and the LLC may be revoked. Gloyce monitors and reminds you of all deadlines.",
          zh: "这些是对州政府的年度义务——特拉华州要求在6月1日前提交年度特许税（最低$300/年）。怀俄明州要求提交年度报告，费用$60。逾期提交会被罚款，LLC可能被撤销。Gloyce为您监控并提醒所有截止日期。",
          es: "Son obligaciones anuales ante el estado — Delaware requiere el Impuesto de Franquicia Anual (mínimo $300/año) antes del 1 de junio. Wyoming requiere un Informe Anual con una tarifa de $60. La presentación tardía genera penalidades y la LLC puede ser revocada. Gloyce monitorea y le recuerda todos los plazos.",
          id: "Ini adalah kewajiban tahunan kepada negara bagian — Delaware memerlukan Annual Franchise Tax (minimum $300/tahun) sebelum 1 Juni. Wyoming memerlukan Annual Report dengan biaya $60. Pengajuan terlambat dikenai denda dan LLC bisa dicabut. Gloyce memantau dan mengingatkan Anda tentang semua tenggat.",
        },
      },
      {
        q: {
          vi: "Tôi không có doanh thu — có cần nộp báo cáo gì không?",
          en: "I have no revenue — do I still need to file reports?",
          zh: "我没有收入——还需要提交报告吗？",
          es: "No tengo ingresos — ¿aún debo presentar informes?",
          id: "Saya tidak punya pendapatan — masih perlu mengajukan laporan?",
        },
        a: {
          vi: "Vẫn cần. Dù không có doanh thu hay hoạt động, LLC vẫn bắt buộc nộp Form 5472, BOI Report và Annual Report/Franchise Tax với tiểu bang. Các nghĩa vụ này không phụ thuộc vào việc có phát sinh doanh thu hay không.",
          en: "Yes, still required. Even with no revenue or activity, an LLC must file Form 5472, the BOI Report, and the Annual Report/Franchise Tax with the state. These obligations do not depend on whether revenue has been generated.",
          zh: "仍然需要。即使没有收入或活动，LLC仍必须提交5472表、BOI报告以及向州政府提交年度报告/特许税。这些义务不取决于是否产生了收入。",
          es: "Sí, aún es obligatorio. Incluso sin ingresos o actividad, una LLC debe presentar el Formulario 5472, el Reporte BOI y el Informe Anual/Impuesto de Franquicia al estado. Estas obligaciones no dependen de si se generaron ingresos.",
          id: "Masih perlu. Bahkan tanpa pendapatan atau aktivitas, LLC tetap wajib mengajukan Form 5472, BOI Report, dan Annual Report/Franchise Tax ke negara bagian. Kewajiban ini tidak bergantung pada apakah pendapatan telah dihasilkan.",
        },
      },
    ],
  },
  {
    id: "accounting",
    label: { vi: "Kế toán & Thuế", en: "Accounting & Tax", zh: "会计与税务", es: "Contabilidad & Impuestos", id: "Akuntansi & Pajak" },
    faqs: [
      {
        q: {
          vi: "Gloyce có cung cấp phần mềm kế toán không?",
          en: "Does Gloyce provide accounting software?",
          zh: "Gloyce提供会计软件吗？",
          es: "¿Gloyce proporciona software de contabilidad?",
          id: "Apakah Gloyce menyediakan perangkat lunak akuntansi?",
        },
        a: {
          vi: "Gloyce không cung cấp phần mềm riêng — thay vào đó chúng tôi tích hợp với QuickBooks, Xero và kết nối tự động Mercury, Wise, Airwallex. Đội kế toán của Gloyce xử lý toàn bộ sổ sách và báo cáo, bạn chỉ cần xem kết quả.",
          en: "Gloyce doesn't provide its own software — instead we integrate with QuickBooks, Xero and auto-connect Mercury, Wise, Airwallex. Gloyce's accounting team handles all bookkeeping and reporting; you just review the results.",
          zh: "Gloyce不提供自己的软件——而是与QuickBooks、Xero集成，并自动连接Mercury、Wise、Airwallex。Gloyce的会计团队处理所有账务和报告，您只需查看结果。",
          es: "Gloyce no proporciona software propio — en cambio, nos integramos con QuickBooks, Xero y conectamos automáticamente Mercury, Wise, Airwallex. El equipo contable de Gloyce maneja toda la contabilidad e informes; usted solo revisa los resultados.",
          id: "Gloyce tidak menyediakan perangkat lunak sendiri — sebaliknya kami berintegrasi dengan QuickBooks, Xero dan menghubungkan secara otomatis Mercury, Wise, Airwallex. Tim akuntansi Gloyce menangani semua pembukuan dan pelaporan; Anda cukup meninjau hasilnya.",
        },
      },
      {
        q: {
          vi: "Seller Amazon có cần kế toán riêng không?",
          en: "Do Amazon Sellers need specialized accounting?",
          zh: "亚马逊卖家需要专业会计吗？",
          es: "¿Los vendedores de Amazon necesitan contabilidad especializada?",
          id: "Apakah Penjual Amazon memerlukan akuntansi khusus?",
        },
        a: {
          vi: "Có. Seller Amazon có nhiều luồng thu nhập phức tạp: FBA fees, advertising credits, refunds, inventory adjustments. Kế toán thông thường thường sai số lớn với Amazon. Gloyce có quy trình chuyên biệt cho Amazon Seller — tích hợp tự động, phân loại đúng theo IRS.",
          en: "Yes. Amazon Sellers have complex income streams: FBA fees, advertising credits, refunds, inventory adjustments. Standard accounting is often highly inaccurate for Amazon. Gloyce has a specialized process for Amazon Sellers — auto-integration, correct IRS categorization.",
          zh: "是的。亚马逊卖家有复杂的收入流：FBA费用、广告积分、退款、库存调整。标准会计对亚马逊往往误差很大。Gloyce针对亚马逊卖家有专门流程——自动集成，按IRS正确分类。",
          es: "Sí. Los vendedores de Amazon tienen flujos de ingresos complejos: tarifas de FBA, créditos publicitarios, reembolsos, ajustes de inventario. La contabilidad estándar suele tener grandes errores con Amazon. Gloyce tiene un proceso especializado para vendedores de Amazon — integración automática, categorización correcta según el IRS.",
          id: "Ya. Penjual Amazon memiliki aliran pendapatan yang kompleks: biaya FBA, kredit iklan, pengembalian dana, penyesuaian inventaris. Akuntansi standar sering kali sangat tidak akurat untuk Amazon. Gloyce memiliki proses khusus untuk Penjual Amazon — integrasi otomatis, kategorisasi IRS yang benar.",
        },
      },
      {
        q: {
          vi: "Tôi cần kế toán hàng tháng hay hàng quý?",
          en: "Do I need monthly or quarterly accounting?",
          zh: "我需要月度还是季度会计？",
          es: "¿Necesito contabilidad mensual o trimestral?",
          id: "Apakah saya perlu akuntansi bulanan atau kuartalan?",
        },
        a: {
          vi: "Doanh nghiệp có doanh thu trên $10K/tháng nên dùng kế toán hàng tháng để theo dõi dòng tiền và phát hiện vấn đề sớm. Doanh nghiệp nhỏ hơn có thể dùng kế toán hàng quý. Gloyce có cả hai gói — bạn có thể chuyển đổi khi doanh thu tăng.",
          en: "Businesses with over $10K/month revenue should use monthly accounting to track cash flow and catch issues early. Smaller businesses can use quarterly accounting. Gloyce offers both plans — you can switch as revenue grows.",
          zh: "月收入超过$10K的企业应使用月度会计来跟踪现金流并及早发现问题。较小的企业可以使用季度会计。Gloyce提供两种方案——您可以随着收入增长进行切换。",
          es: "Las empresas con más de $10K/mes de ingresos deberían usar contabilidad mensual para rastrear el flujo de caja y detectar problemas temprano. Las empresas más pequeñas pueden usar contabilidad trimestral. Gloyce ofrece ambos planes — puede cambiar a medida que crecen los ingresos.",
          id: "Bisnis dengan pendapatan lebih dari $10K/bulan harus menggunakan akuntansi bulanan untuk melacak arus kas dan mendeteksi masalah lebih awal. Bisnis yang lebih kecil dapat menggunakan akuntansi kuartalan. Gloyce menawarkan kedua paket — Anda dapat beralih saat pendapatan meningkat.",
        },
      },
    ],
  },
  {
    id: "pricing",
    label: { vi: "Giá & Thanh toán", en: "Pricing & Payment", zh: "价格与付款", es: "Precios & Pagos", id: "Harga & Pembayaran" },
    faqs: [
      {
        q: {
          vi: "Chi phí trọn gói mở LLC Mỹ là bao nhiêu?",
          en: "What is the all-inclusive cost to open a US LLC?",
          zh: "开设美国LLC的全包费用是多少？",
          es: "¿Cuál es el costo todo incluido para abrir una LLC en EE.UU.?",
          id: "Berapa biaya all-inclusive untuk membuka LLC AS?",
        },
        a: {
          vi: "Gói Standard từ $499 (bao gồm phí bang, Registered Agent năm đầu, EIN, Operating Agreement). Gói Premium từ $799 (thêm hỗ trợ mở tài khoản Mercury/Relay, Form 5472 cơ bản, Business address 1 năm). Xem chi tiết tại trang Bảng giá.",
          en: "Standard package from $499 (includes state fee, first-year Registered Agent, EIN, Operating Agreement). Premium package from $799 (adds Mercury/Relay account opening support, basic Form 5472, 1-year Business address). See details on the Pricing page.",
          zh: "标准套餐从$499起（包含州费、首年注册代理人、EIN、运营协议）。高级套餐从$799起（另加Mercury/Relay开户支持、基础5472表、1年商业地址）。详见定价页面。",
          es: "Paquete Estándar desde $499 (incluye tarifa estatal, Agente Registrado primer año, EIN, Acuerdo Operativo). Paquete Premium desde $799 (agrega soporte para apertura de cuenta Mercury/Relay, Formulario 5472 básico, dirección comercial 1 año). Ver detalles en la página de Precios.",
          id: "Paket Standard dari $499 (termasuk biaya negara bagian, Registered Agent tahun pertama, EIN, Operating Agreement). Paket Premium dari $799 (tambah dukungan pembukaan rekening Mercury/Relay, Form 5472 dasar, alamat bisnis 1 tahun). Lihat detail di halaman Harga.",
        },
      },
      {
        q: {
          vi: "Phí kế toán hàng tháng là bao nhiêu?",
          en: "What are the monthly accounting fees?",
          zh: "每月会计费用是多少？",
          es: "¿Cuáles son las tarifas mensuales de contabilidad?",
          id: "Berapa biaya akuntansi bulanan?",
        },
        a: {
          vi: "Từ 3.000.000đ/tháng (~$149 USD) cho gói Starter (doanh thu dưới $50K/năm). Gói Growth từ 6.000.000đ/tháng ($299 USD) cho doanh thu $50K–$500K. Gói Scale từ 12.000.000đ/tháng ($599 USD) bao gồm CFO thuê ngoài. Tất cả gói đều thanh toán hàng tháng, không ràng buộc hợp đồng dài hạn.",
          en: "From $149/month for the Starter plan (under $50K annual revenue). Growth plan from $299/month for $50K–$500K revenue. Scale plan from $599/month including fractional CFO. All plans are billed monthly with no long-term contract.",
          zh: "Starter计划从$149/月起（年收入低于$50K）。Growth计划从$299/月起，适合$50K-$500K收入。Scale计划从$599/月起，包含兼职CFO。所有计划按月计费，无长期合同约束。",
          es: "Desde $149/mes para el plan Starter (ingresos anuales menores de $50K). Plan Growth desde $299/mes para ingresos de $50K–$500K. Plan Scale desde $599/mes incluyendo CFO fraccional. Todos los planes se facturan mensualmente sin contrato a largo plazo.",
          id: "Dari $149/bulan untuk paket Starter (pendapatan tahunan di bawah $50K). Paket Growth dari $299/bulan untuk pendapatan $50K–$500K. Paket Scale dari $599/bulan termasuk CFO fraksional. Semua paket ditagih bulanan tanpa kontrak jangka panjang.",
        },
      },
      {
        q: {
          vi: "Thanh toán bằng hình thức nào?",
          en: "What payment methods are accepted?",
          zh: "接受哪些付款方式？",
          es: "¿Qué métodos de pago se aceptan?",
          id: "Metode pembayaran apa yang diterima?",
        },
        a: {
          vi: "Gloyce chấp nhận thanh toán qua chuyển khoản ngân hàng (USD), Wise, PayPal và thẻ tín dụng quốc tế. Hóa đơn được gửi trước 5 ngày, thanh toán được xử lý trong 1–2 ngày làm việc.",
          en: "Gloyce accepts bank transfers (USD), Wise, PayPal, and international credit cards. Invoices are sent 5 days in advance and payments are processed within 1–2 business days.",
          zh: "Gloyce接受银行转账（越南盾或美元）、Wise、PayPal和国际信用卡付款。发票提前5天发送，付款在1-2个工作日内处理。",
          es: "Gloyce acepta transferencias bancarias (USD), Wise, PayPal y tarjetas de crédito internacionales. Las facturas se envían con 5 días de anticipación y los pagos se procesan en 1–2 días hábiles.",
          id: "Gloyce menerima transfer bank (USD), Wise, PayPal, dan kartu kredit internasional. Faktur dikirim 5 hari sebelumnya dan pembayaran diproses dalam 1–2 hari kerja.",
        },
      },
      {
        q: {
          vi: "Có hợp đồng tối thiểu không?",
          en: "Is there a minimum contract period?",
          zh: "有最低合同期限吗？",
          es: "¿Hay un período mínimo de contrato?",
          id: "Apakah ada periode kontrak minimum?",
        },
        a: {
          vi: "Dịch vụ thành lập công ty là one-time, không ràng buộc. Dịch vụ kế toán hàng tháng không yêu cầu hợp đồng tối thiểu — bạn có thể dừng bất cứ lúc nào với thông báo trước 30 ngày.",
          en: "The incorporation service is a one-time service with no commitment. Monthly accounting services have no minimum contract — you can stop at any time with 30 days' notice.",
          zh: "公司注册服务是一次性服务，无需承诺。月度会计服务无最低合同要求——您可以在提前30天通知的情况下随时停止。",
          es: "El servicio de incorporación es un servicio único sin compromiso. Los servicios de contabilidad mensual no tienen contrato mínimo — puede cancelar en cualquier momento con 30 días de aviso.",
          id: "Layanan pendirian perusahaan adalah layanan satu kali tanpa komitmen. Layanan akuntansi bulanan tidak memerlukan kontrak minimum — Anda dapat berhenti kapan saja dengan pemberitahuan 30 hari.",
        },
      },
    ],
  },
  {
    id: "general",
    label: { vi: "Câu hỏi chung", en: "General", zh: "一般问题", es: "General", id: "Umum" },
    faqs: [
      {
        q: {
          vi: "Gloyce là công ty gì?",
          en: "What is Gloyce?",
          zh: "Gloyce是什么公司？",
          es: "¿Qué es Gloyce?",
          id: "Apa itu Gloyce?",
        },
        a: {
          vi: "Gloyce LLC là công ty tư vấn doanh nghiệp đăng ký tại California, Hoa Kỳ. Chúng tôi chuyên giúp doanh nhân và doanh nghiệp châu Á thành lập, vận hành và mở rộng kinh doanh tại Mỹ, Singapore và Hồng Kông.",
          en: "Gloyce LLC is a business consulting firm registered in California, USA. We specialize in helping Asian entrepreneurs and businesses establish, operate, and expand in the US, Singapore, and Hong Kong.",
          zh: "Gloyce LLC是一家在美国加利福尼亚州注册的商业咨询公司。我们专门帮助亚洲企业家和企业在美国、新加坡和香港建立、运营和扩展业务。",
          es: "Gloyce LLC es una firma de consultoría empresarial registrada en California, EE.UU. Nos especializamos en ayudar a emprendedores y empresas asiáticas a establecer, operar y expandirse en EE.UU., Singapur y Hong Kong.",
          id: "Gloyce LLC adalah perusahaan konsultansi bisnis yang terdaftar di California, AS. Kami berspesialisasi dalam membantu pengusaha dan bisnis Asia untuk mendirikan, menjalankan, dan berkembang di AS, Singapura, dan Hong Kong.",
        },
      },
      {
        q: {
          vi: "Gloyce có phải là văn phòng luật không?",
          en: "Is Gloyce a law firm?",
          zh: "Gloyce是律师事务所吗？",
          es: "¿Es Gloyce una firma de abogados?",
          id: "Apakah Gloyce adalah firma hukum?",
        },
        a: {
          vi: "Không. Gloyce là công ty tư vấn doanh nghiệp, không phải văn phòng luật hay tổ chức tài chính được cấp phép. Chúng tôi cung cấp dịch vụ tư vấn thành lập, kế toán và tuân thủ — không cung cấp tư vấn pháp lý hành nghề luật.",
          en: "No. Gloyce is a business consulting firm, not a law firm or licensed financial institution. We provide incorporation, accounting and compliance consulting services — not licensed legal advice.",
          zh: "不是。Gloyce是一家商业咨询公司，不是律师事务所或持牌金融机构。我们提供公司注册、会计和合规咨询服务——不提供持牌法律建议。",
          es: "No. Gloyce es una firma de consultoría empresarial, no una firma de abogados ni una institución financiera licenciada. Prestamos servicios de consultoría de incorporación, contabilidad y cumplimiento — no asesoramiento legal con licencia.",
          id: "Tidak. Gloyce adalah perusahaan konsultansi bisnis, bukan firma hukum atau lembaga keuangan berlisensi. Kami menyediakan layanan konsultasi pendirian, akuntansi, dan kepatuhan — bukan nasihat hukum berlisensi.",
        },
      },
      {
        q: {
          vi: "Gloyce hỗ trợ đa ngôn ngữ không?",
          en: "Does Gloyce offer multilingual support?",
          zh: "Gloyce提供多语言支持吗？",
          es: "¿Gloyce ofrece soporte multilingüe?",
          id: "Apakah Gloyce menawarkan dukungan multibahasa?",
        },
        a: {
          vi: "Có. Gloyce hỗ trợ đa ngôn ngữ — tiếng Việt, tiếng Anh, tiếng Trung, tiếng Tây Ban Nha và tiếng Indonesia. Email, cuộc gọi, tài liệu hướng dẫn và dashboard đều có phiên bản đa ngôn ngữ. Đây là lợi thế lớn so với các dịch vụ Mỹ hay Singapore không có hỗ trợ đa ngôn ngữ.",
          en: "Yes. Gloyce offers multilingual support — Vietnamese, English, Chinese, Spanish, and Indonesian. Emails, calls, guides, and the dashboard are available in multiple languages. This is a major advantage over US or Singapore services that lack multilingual support.",
          zh: "是的。Gloyce提供多语言支持——越南语、英语、中文、西班牙语和印度尼西亚语。电子邮件、电话、指南和仪表板均有多语言版本。这相较于没有多语言支持的美国或新加坡服务是一大优势。",
          es: "Sí. Gloyce ofrece soporte multilingüe — vietnamita, inglés, chino, español e indonesio. Los correos electrónicos, llamadas, guías y el panel están disponibles en varios idiomas. Esta es una gran ventaja sobre los servicios de EE.UU. o Singapur que carecen de soporte multilingüe.",
          id: "Ya. Gloyce menawarkan dukungan multibahasa — Vietnam, Inggris, Mandarin, Spanyol, dan Indonesia. Email, panggilan, panduan, dan dasbor tersedia dalam berbagai bahasa. Ini adalah keunggulan besar dibandingkan layanan AS atau Singapura yang tidak memiliki dukungan multibahasa.",
        },
      },
      {
        q: {
          vi: "Tôi có thể tự mở LLC mà không cần Gloyce không?",
          en: "Can I open an LLC without Gloyce?",
          zh: "我可以不通过Gloyce自己开设LLC吗？",
          es: "¿Puedo abrir una LLC sin Gloyce?",
          id: "Bisakah saya membuka LLC tanpa Gloyce?",
        },
        a: {
          vi: "Có, về mặt kỹ thuật bạn có thể tự làm qua các dịch vụ như Stripe Atlas ($500) hay doola ($297). Tuy nhiên các dịch vụ này không có hỗ trợ tiếng Việt, không tư vấn chọn bang phù hợp, không hỗ trợ mở tài khoản ngân hàng và không nhắc deadline Form 5472/BOI Report. Gloyce không chỉ mở LLC — chúng tôi đồng hành toàn hành trình.",
          en: "Yes, technically you can do it yourself through services like Stripe Atlas ($500) or doola ($297). However, these services have no multilingual support, no advice on choosing the right state, no bank account opening support, and no Form 5472/BOI Report deadline reminders. Gloyce doesn't just open LLCs — we accompany you the entire way.",
          zh: "可以，从技术上讲，您可以通过Stripe Atlas（$500）或doola（$297）等服务自己操作。但这些服务没有越南语支持、没有选州建议、没有开户支持，也没有5472表/BOI报告截止日期提醒。Gloyce不只是开设LLC——我们全程陪伴您。",
          es: "Sí, técnicamente puede hacerlo usted mismo a través de servicios como Stripe Atlas ($500) o doola ($297). Sin embargo, estos servicios no tienen soporte en vietnamita, no asesoran sobre la elección del estado correcto, no ayudan con la apertura de cuentas bancarias y no recuerdan los plazos del Formulario 5472/Reporte BOI. Gloyce no solo abre LLCs — le acompañamos en todo el camino.",
          id: "Ya, secara teknis Anda bisa melakukannya sendiri melalui layanan seperti Stripe Atlas ($500) atau doola ($297). Namun layanan-layanan ini tidak memiliki dukungan bahasa Vietnam, tidak ada saran pemilihan negara bagian, tidak ada dukungan pembukaan rekening bank, dan tidak ada pengingat tenggat Form 5472/BOI Report. Gloyce tidak hanya membuka LLC — kami mendampingi Anda sepanjang perjalanan.",
        },
      },
    ],
  },
];

function FAQItem({ faq, locale }: { faq: FAQ; locale: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? "border-gold/30 bg-ink-800/80" : "border-ink-600 bg-ink-800/40"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground leading-snug">{pick(locale, faq.q)}</span>
        <ChevronDown
          size={16}
          className={`text-gold shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-ink-600 mb-4" />
          <p className="text-sm text-ink-300 leading-relaxed">{pick(locale, faq.a)}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const locale = useLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const [active, setActive] = useState("llc");

  const current = CATEGORIES.find(c => c.id === active) ?? CATEGORIES[0];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("CÂU HỎI THƯỜNG GẶP", "FAQ", "常见问题", "PREGUNTAS FRECUENTES", "PERTANYAAN UMUM")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t("Mọi thắc mắc được giải đáp", "Every question answered", "每个问题都有解答", "Cada pregunta respondida", "Setiap pertanyaan terjawab")}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl mx-auto">
              {t(
                "Tổng hợp các câu hỏi phổ biến nhất về thành lập công ty Mỹ, kế toán và tuân thủ pháp lý.",
                "Answers to the most common questions about US incorporation, accounting, and compliance.",
                "关于美国公司注册、会计和合规最常见问题的解答。",
                "Respuestas a las preguntas más comunes sobre incorporación en EE.UU., contabilidad y cumplimiento.",
                "Jawaban atas pertanyaan paling umum tentang pendirian perusahaan AS, akuntansi, dan kepatuhan."
              )}
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat.id
                    ? "bg-gold text-ink-900"
                    : "bg-ink-800 border border-ink-600 text-ink-300 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {pick(locale, cat.label)}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3 mb-16">
            {current.faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} locale={locale} />
            ))}
          </div>

          {/* CTA */}
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-lg mb-2">
              {t("Không tìm thấy câu trả lời?", "Didn't find your answer?", "没有找到您的答案？", "¿No encontró su respuesta?", "Tidak menemukan jawaban Anda?")}
            </h2>
            <p className="text-sm text-ink-300 mb-5">
              {t(
                "Đặt lịch tư vấn miễn phí 30 phút với chuyên gia Gloyce.",
                "Book a free 30-minute consultation with a Gloyce expert.",
                "与Gloyce专家预约30分钟免费咨询。",
                "Agende una consulta gratuita de 30 minutos con un experto de Gloyce.",
                "Jadwalkan konsultasi gratis 30 menit dengan pakar Gloyce."
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all"
            >
              {t("Liên hệ ngay", "Contact us", "立即联系", "Contáctenos", "Hubungi kami")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
