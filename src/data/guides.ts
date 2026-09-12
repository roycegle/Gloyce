// ---------------------------------------------------------------------------
// Gloyce guides data
// To add a guide: append to the GUIDES array.
// To update content: edit the relevant object's L fields.
// ---------------------------------------------------------------------------

export type L = { vi: string; en: string; zh: string; es: string; id: string };

export type GuideLevel = "beginner" | "intermediate" | "advanced";

export type Guide = {
  tag: L;
  title: L;
  desc: L;
  time: L;
  /** URL path relative to /resources/guides/ */
  href: string;
  level: GuideLevel;
};

export const GUIDES: Guide[] = [
  {
    tag: { vi: "LLC Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC EE.UU.", id: "LLC AS" },
    title: {
      vi: "Hướng dẫn mở LLC Mỹ 2026 — Từ A đến Z",
      en: "Complete Guide to Opening a US LLC in 2026",
      zh: "2026年美国LLC开设完整指南——从A到Z",
      es: "Guía completa para abrir una LLC en EE.UU. en 2026",
      id: "Panduan Lengkap Membuka LLC AS 2026 — Dari A sampai Z",
    },
    desc: {
      vi: "Hướng dẫn toàn diện từng bước: chọn bang, đặt tên, nộp hồ sơ, xin EIN và mở tài khoản ngân hàng.",
      en: "Step-by-step from choosing a state, naming, filing, getting an EIN, to opening a bank account.",
      zh: "从选州、命名、提交文件、获取EIN到开设银行账户的分步完整指南。",
      es: "Paso a paso desde elegir un estado, nombrar, presentar, obtener un EIN, hasta abrir una cuenta bancaria.",
      id: "Langkah demi langkah dari memilih negara bagian, penamaan, pengajuan, mendapatkan EIN, hingga membuka rekening bank.",
    },
    time: { vi: "15 phút", en: "15 min read", zh: "15分钟", es: "15 min de lectura", id: "15 menit baca" },
    href: "/resources/guides/us-llc",
    level: "beginner",
  },
  {
    tag: { vi: "Tuân thủ", en: "Compliance", zh: "合规", es: "Cumplimiento", id: "Kepatuhan" },
    title: {
      vi: "Form 5472 là gì và khi nào cần nộp?",
      en: "What is Form 5472 and when must you file?",
      zh: "什么是5472表？何时必须提交？",
      es: "¿Qué es el Formulario 5472 y cuándo debe presentarlo?",
      id: "Apa itu Form 5472 dan kapan harus diajukan?",
    },
    desc: {
      vi: "Hướng dẫn đầy đủ về nghĩa vụ báo cáo IRS bắt buộc cho LLC nước ngoài — tránh phạt $25,000.",
      en: "Complete guide to the mandatory IRS filing for foreign-owned LLCs — avoid the $25,000 penalty.",
      zh: "外资LLC强制IRS申报的完整指南——避免$25,000罚款。",
      es: "Guía completa sobre la presentación obligatoria del IRS para LLC extranjeras — evite la penalidad de $25,000.",
      id: "Panduan lengkap pengajuan IRS wajib untuk LLC asing — hindari denda $25.000.",
    },
    time: { vi: "10 phút", en: "10 min read", zh: "10分钟", es: "10 min de lectura", id: "10 menit baca" },
    href: "/resources/guides/form-5472",
    level: "intermediate",
  },
  {
    tag: { vi: "LLC Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC EE.UU.", id: "LLC AS" },
    title: {
      vi: "Delaware vs Wyoming — Chọn bang nào?",
      en: "Delaware vs Wyoming — Which state for your LLC?",
      zh: "特拉华州vs怀俄明州——选择哪个州？",
      es: "Delaware vs Wyoming — ¿Qué estado para su LLC?",
      id: "Delaware vs Wyoming — Negara bagian mana untuk LLC Anda?",
    },
    desc: {
      vi: "So sánh 6 tiêu chí quan trọng: thuế, phí, bảo vệ tài sản, phù hợp với mô hình kinh doanh.",
      en: "Compare 6 key criteria: taxes, fees, asset protection, and fit for your business model.",
      zh: "对比6个关键标准：税务、费用、资产保护以及与商业模式的契合度。",
      es: "Compare 6 criterios clave: impuestos, tarifas, protección de activos y adecuación a su modelo de negocio.",
      id: "Bandingkan 6 kriteria utama: pajak, biaya, perlindungan aset, dan kesesuaian dengan model bisnis Anda.",
    },
    time: { vi: "8 phút", en: "8 min read", zh: "8分钟", es: "8 min de lectura", id: "8 menit baca" },
    href: "/resources/guides/compare",
    level: "beginner",
  },
  {
    tag: { vi: "Tuân thủ", en: "Compliance", zh: "合规", es: "Cumplimiento", id: "Kepatuhan" },
    title: {
      vi: "BOI Report theo FinCEN — Hướng dẫn 2026",
      en: "BOI Report with FinCEN — 2026 Guide",
      zh: "FinCEN BOI报告——2026年指南",
      es: "Reporte BOI con FinCEN — Guía 2026",
      id: "BOI Report dengan FinCEN — Panduan 2026",
    },
    desc: {
      vi: "Corporate Transparency Act yêu cầu gì, ai phải nộp, deadline và hậu quả của việc không tuân thủ.",
      en: "What the Corporate Transparency Act requires, who must file, deadlines and non-compliance penalties.",
      zh: "《企业透明度法》要求什么、谁必须申报、截止日期以及不合规的后果。",
      es: "Qué exige la Ley de Transparencia Corporativa, quién debe presentar, plazos y penalidades por incumplimiento.",
      id: "Apa yang dipersyaratkan Corporate Transparency Act, siapa yang harus mengajukan, tenggat waktu, dan denda ketidakpatuhan.",
    },
    time: { vi: "8 phút", en: "8 min read", zh: "8分钟", es: "8 min de lectura", id: "8 menit baca" },
    href: "/resources/guides/boi-report",
    level: "intermediate",
  },
  {
    tag: { vi: "LLC Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC EE.UU.", id: "LLC AS" },
    title: {
      vi: "10 sai lầm phổ biến khi mở công ty ở Mỹ",
      en: "10 common mistakes when incorporating in the US",
      zh: "在美国注册公司的10个常见错误",
      es: "10 errores comunes al incorporarse en EE.UU.",
      id: "10 kesalahan umum saat mendirikan perusahaan di AS",
    },
    desc: {
      vi: "Những sai lầm doanh nghiệp châu Á thường gặp — từ chọn sai bang đến bỏ quên nghĩa vụ liên bang.",
      en: "Common mistakes Asian founders make — from wrong state choice to missing federal obligations.",
      zh: "亚洲创始人常犯的错误——从错误选州到遗漏联邦义务。",
      es: "Errores comunes que cometen los fundadores asiáticos — desde elegir el estado incorrecto hasta omitir obligaciones federales.",
      id: "Kesalahan umum yang dibuat pendiri Asia — dari pilihan negara bagian yang salah hingga melewatkan kewajiban federal.",
    },
    time: { vi: "7 phút", en: "7 min read", zh: "7分钟", es: "7 min de lectura", id: "7 menit baca" },
    href: "/resources/guides/mistakes",
    level: "beginner",
  },
  {
    tag: { vi: "Kế toán", en: "Accounting", zh: "会计", es: "Contabilidad", id: "Akuntansi" },
    title: {
      vi: "Rủi ro pháp lý khi mở LLC tại Mỹ",
      en: "Legal risks of opening a US LLC",
      zh: "在美国开设LLC的法律风险",
      es: "Riesgos legales de abrir una LLC en EE.UU.",
      id: "Risiko hukum membuka LLC AS",
    },
    desc: {
      vi: "Các rủi ro thường bị bỏ qua: không nộp báo cáo, sai loại thực thể, thiếu Operating Agreement.",
      en: "Commonly overlooked risks: missed filings, wrong entity type, missing Operating Agreement.",
      zh: "常被忽视的风险：遗漏申报、实体类型错误、缺少运营协议。",
      es: "Riesgos comúnmente ignorados: presentaciones omitidas, tipo de entidad incorrecto, falta de Acuerdo Operativo.",
      id: "Risiko yang sering diabaikan: pengajuan yang terlewat, jenis entitas salah, Operating Agreement tidak ada.",
    },
    time: { vi: "9 phút", en: "9 min read", zh: "9分钟", es: "9 min de lectura", id: "9 menit baca" },
    href: "/resources/guides/legal-risk",
    level: "intermediate",
  },
  {
    tag: { vi: "Ngân hàng", en: "Banking", zh: "银行", es: "Banca", id: "Perbankan" },
    title: {
      vi: "Mở tài khoản Mercury, Relay, Wise — Hướng dẫn thực tế",
      en: "Opening Mercury, Relay, Wise accounts — Practical guide",
      zh: "开设Mercury、Relay、Wise账户——实操指南",
      es: "Abrir cuentas Mercury, Relay, Wise — Guía práctica",
      id: "Membuka rekening Mercury, Relay, Wise — Panduan praktis",
    },
    desc: {
      vi: "Yêu cầu hồ sơ, quy trình nộp đơn và tỷ lệ phê duyệt cho chủ LLC châu Á.",
      en: "Document requirements, application process and approval tips for Asian LLC owners.",
      zh: "亚洲LLC所有者的文件要求、申请流程和审批技巧。",
      es: "Requisitos de documentos, proceso de solicitud y consejos de aprobación para propietarios de LLC asiáticos.",
      id: "Persyaratan dokumen, proses aplikasi, dan tips persetujuan untuk pemilik LLC Asia.",
    },
    time: { vi: "10 phút", en: "10 min read", zh: "10分钟", es: "10 min de lectura", id: "10 menit baca" },
    href: "/resources/guides/bank-account",
    level: "beginner",
  },
  {
    tag: { vi: "Kế toán", en: "Accounting", zh: "会计", es: "Contabilidad", id: "Akuntansi" },
    title: {
      vi: "Thuế doanh nghiệp Mỹ cho doanh nghiệp châu Á — Những điều cần biết",
      en: "US Business Tax for Asian Business Owners — Key Things to Know",
      zh: "亚洲企业主的美国企业税——需要了解的关键事项",
      es: "Impuesto Empresarial en EE.UU. para Propietarios Asiáticos — Aspectos Clave",
      id: "Pajak Bisnis AS untuk Pemilik Bisnis Asia — Hal-hal Penting yang Perlu Diketahui",
    },
    desc: {
      vi: "Pass-through taxation, ECI, FDAP income và cách cấu trúc LLC để tối ưu thuế trong khuôn khổ pháp luật.",
      en: "Pass-through taxation, ECI, FDAP income and how to structure your LLC to optimize tax legally.",
      zh: "转嫁税制、ECI、FDAP收入以及如何合法构建LLC以优化税务。",
      es: "Tributación pass-through, ECI, ingresos FDAP y cómo estructurar su LLC para optimizar impuestos legalmente.",
      id: "Perpajakan pass-through, ECI, pendapatan FDAP, dan cara menyusun LLC untuk mengoptimalkan pajak secara legal.",
    },
    time: { vi: "12 phút", en: "12 min read", zh: "12分钟", es: "12 min de lectura", id: "12 menit baca" },
    href: "/resources/guides/us-tax",
    level: "advanced",
  },
];

export const GUIDE_LEVEL_META: Record<
  GuideLevel,
  { label: L; color: string }
> = {
  beginner: {
    label: { vi: "Cơ bản", en: "Beginner", zh: "入门", es: "Básico", id: "Dasar" },
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  intermediate: {
    label: { vi: "Trung cấp", en: "Intermediate", zh: "中级", es: "Intermedio", id: "Menengah" },
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  advanced: {
    label: { vi: "Nâng cao", en: "Advanced", zh: "高级", es: "Avanzado", id: "Lanjutan" },
    color: "text-gold bg-gold/10 border-gold/20",
  },
};
