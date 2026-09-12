// ---------------------------------------------------------------------------
// Gloyce pricing data
// Each plan lives in one of three section arrays: incorporation, accounting,
// compliance. The `featured` flag marks the "most popular" badge.
//
// To update a price or feature: edit the relevant plan below.
// To add a plan: append to the section array.
// ---------------------------------------------------------------------------

export type L = { vi: string; en: string; zh: string; es: string; id: string };

export type PricingPlan = {
  name: L;
  price: string;           // "$499" | "Contact"
  period: L;               // "one-time" / "/mo" / ""
  desc: L;
  features: Record<string, string[]>; // keyed by locale, fallback: en
  featured?: boolean;
};

export type PricingSection = {
  title: L;
  plans: PricingPlan[];
};

export const PRICING_SECTIONS: PricingSection[] = [
  {
    title: {
      vi: "Thành lập công ty",
      en: "Incorporation",
      zh: "成立公司",
      es: "Incorporación",
      id: "Pendirian Perusahaan",
    },
    plans: [
      {
        name: {
          vi: "LLC Mỹ — Gói Standard",
          en: "US LLC — Standard",
          zh: "美国LLC — 标准版",
          es: "LLC EE.UU. — Estándar",
          id: "LLC AS — Standar",
        },
        price: "$499",
        period: { vi: "một lần", en: "one-time", zh: "一次性", es: "pago único", id: "sekali bayar" },
        desc: {
          vi: "Delaware hoặc Wyoming LLC — trọn gói cơ bản",
          en: "Delaware or Wyoming LLC — basic complete package",
          zh: "特拉华州或怀俄明州LLC — 基础完整套餐",
          es: "LLC en Delaware o Wyoming — paquete básico completo",
          id: "LLC Delaware atau Wyoming — paket dasar lengkap",
        },
        features: {
          vi: ["Phí bang + Registered Agent năm đầu", "EIN từ IRS", "Operating Agreement", "Certificate of Formation", "Form 5472 & BOI Report cơ bản"],
          en: ["State fee + first-year Registered Agent", "IRS EIN", "Operating Agreement", "Certificate of Formation", "Form 5472 & BOI Report basics"],
          zh: ["州费 + 首年注册代理人", "IRS EIN", "经营协议", "公司成立证书", "Form 5472 & BOI Report基础"],
          es: ["Tarifa estatal + Agente Registrado 1er año", "IRS EIN", "Acuerdo Operativo", "Certificado de Formación", "Form 5472 & BOI Report básico"],
          id: ["Biaya negara + Agen Terdaftar tahun pertama", "IRS EIN", "Perjanjian Operasi", "Sertifikat Pembentukan", "Form 5472 & BOI Report dasar"],
        },
      },
      {
        name: {
          vi: "LLC Mỹ — Gói Premium",
          en: "US LLC — Premium",
          zh: "美国LLC — 高级版",
          es: "LLC EE.UU. — Premium",
          id: "LLC AS — Premium",
        },
        price: "$799",
        period: { vi: "một lần", en: "one-time", zh: "一次性", es: "pago único", id: "sekali bayar" },
        desc: {
          vi: "Đầy đủ Standard + tài khoản ngân hàng + khai báo liên bang đầy đủ",
          en: "Everything Standard + bank account + full US federal filing",
          zh: "标准版全部 + 银行账户 + 完整联邦申报",
          es: "Todo lo del Estándar + cuenta bancaria + declaración federal completa",
          id: "Semua Standar + rekening bank + pengajuan federal AS lengkap",
        },
        features: {
          vi: ["Tất cả Gói Standard", "Hỗ trợ mở Mercury/Relay/Wise", "Form 5472 & BOI Report đầy đủ", "Business address (1 năm)", "30 phút tư vấn chiến lược"],
          en: ["Everything Standard", "Mercury/Relay/Wise account setup", "Full Form 5472 & BOI Report filing", "Business address (1 year)", "30-min strategy consultation"],
          zh: ["标准版所有内容", "Mercury/Relay/Wise账户开设", "完整Form 5472 & BOI Report申报", "商业地址（1年）", "30分钟战略咨询"],
          es: ["Todo lo del Estándar", "Apertura de cuenta Mercury/Relay/Wise", "Presentación completa Form 5472 & BOI", "Dirección comercial (1 año)", "Consulta estratégica de 30 min"],
          id: ["Semua dari Standar", "Pembukaan akun Mercury/Relay/Wise", "Pengajuan Form 5472 & BOI Report lengkap", "Alamat bisnis (1 tahun)", "Konsultasi strategi 30 menit"],
        },
        featured: true,
      },
      {
        name: {
          vi: "Singapore / Hồng Kông",
          en: "Singapore / Hong Kong",
          zh: "新加坡 / 香港",
          es: "Singapur / Hong Kong",
          id: "Singapura / Hong Kong",
        },
        price: "CONTACT",
        period: { vi: "", en: "", zh: "", es: "", id: "" },
        desc: {
          vi: "Báo giá theo yêu cầu cụ thể",
          en: "Custom quote per requirements",
          zh: "根据需求定制报价",
          es: "Precio a medida según requerimientos",
          id: "Penawaran khusus sesuai kebutuhan",
        },
        features: {
          vi: ["Tư vấn lựa chọn jurisdiction", "Trọn gói thành lập", "Nominee Director nếu cần", "Tài khoản ngân hàng", "Thư ký công ty (năm đầu)"],
          en: ["Jurisdiction selection consultation", "Complete formation package", "Nominee Director if needed", "Bank account", "First-year Company Secretary"],
          zh: ["司法管辖区选择咨询", "完整成立套餐", "如需提名董事", "银行账户", "首年公司秘书"],
          es: ["Consulta de selección de jurisdicción", "Paquete completo de formación", "Director Nominado si es necesario", "Cuenta bancaria", "Secretaría corporativa primer año"],
          id: ["Konsultasi pemilihan yurisdiksi", "Paket pendirian lengkap", "Direktur Nominasi jika diperlukan", "Rekening bank", "Sekretaris perusahaan tahun pertama"],
        },
      },
    ],
  },
  {
    title: {
      vi: "Kế toán & Thuế",
      en: "Accounting & Tax",
      zh: "会计与税务",
      es: "Contabilidad e Impuestos",
      id: "Akuntansi & Pajak",
    },
    plans: [
      {
        name: { vi: "Starter", en: "Starter", zh: "Starter", es: "Starter", id: "Starter" },
        price: "$149",
        period: { vi: "/tháng", en: "/mo", zh: "/月", es: "/mes", id: "/bulan" },
        desc: {
          vi: "Doanh thu dưới $50K/năm",
          en: "Under $50K annual revenue",
          zh: "年营收低于$50K",
          es: "Ingresos anuales menores a $50K",
          id: "Pendapatan tahunan di bawah $50K",
        },
        features: {
          vi: ["Sổ sách hàng tháng", "Báo cáo P&L", "1 tài khoản ngân hàng", "Hỗ trợ email"],
          en: ["Monthly bookkeeping", "P&L report", "1 bank connection", "Email support"],
          zh: ["每月簿记", "P&L报告", "1个银行连接", "邮件支持"],
          es: ["Contabilidad mensual", "Informe P&L", "1 conexión bancaria", "Soporte por email"],
          id: ["Pembukuan bulanan", "Laporan P&L", "1 koneksi bank", "Dukungan email"],
        },
      },
      {
        name: { vi: "Growth", en: "Growth", zh: "Growth", es: "Growth", id: "Growth" },
        price: "$299",
        period: { vi: "/tháng", en: "/mo", zh: "/月", es: "/mes", id: "/bulan" },
        desc: {
          vi: "Doanh thu $50K–$500K/năm",
          en: "$50K–$500K annual revenue",
          zh: "年营收$50K–$500K",
          es: "Ingresos anuales $50K–$500K",
          id: "Pendapatan tahunan $50K–$500K",
        },
        features: {
          vi: ["Tất cả Starter", "Tài khoản không giới hạn", "Báo cáo hàng tuần", "Khai thuế quý", "Hỗ trợ ưu tiên"],
          en: ["Everything Starter", "Unlimited connections", "Weekly reports", "Quarterly tax", "Priority support"],
          zh: ["入门版所有内容", "无限连接", "每周报告", "季度税务", "优先支持"],
          es: ["Todo lo del Starter", "Conexiones ilimitadas", "Informes semanales", "Impuesto trimestral", "Soporte prioritario"],
          id: ["Semua dari Starter", "Koneksi tidak terbatas", "Laporan mingguan", "Pajak kuartalan", "Dukungan prioritas"],
        },
        featured: true,
      },
      {
        name: { vi: "Scale", en: "Scale", zh: "Scale", es: "Scale", id: "Scale" },
        price: "$599",
        period: { vi: "/tháng", en: "/mo", zh: "/月", es: "/mes", id: "/bulan" },
        desc: {
          vi: "Doanh thu trên $500K/năm",
          en: "Over $500K annual revenue",
          zh: "年营收超过$500K",
          es: "Ingresos anuales mayores a $500K",
          id: "Pendapatan tahunan di atas $500K",
        },
        features: {
          vi: ["Tất cả Growth", "Kế toán trưởng riêng", "Đa thực thể", "Lập kế hoạch thuế", "CFO thuê ngoài 2h/tháng"],
          en: ["Everything Growth", "Dedicated senior accountant", "Multi-entity", "Tax planning", "Fractional CFO 2h/mo"],
          zh: ["成长版所有内容", "专属高级会计师", "多实体", "税务规划", "兼职CFO 2小时/月"],
          es: ["Todo lo del Growth", "Contador senior dedicado", "Multi-entidad", "Planificación fiscal", "CFO fraccionado 2h/mes"],
          id: ["Semua dari Growth", "Akuntan senior khusus", "Multi-entitas", "Perencanaan pajak", "CFO paruh waktu 2j/bulan"],
        },
      },
    ],
  },
  {
    title: {
      vi: "Tuân thủ",
      en: "Compliance",
      zh: "合规",
      es: "Cumplimiento",
      id: "Kepatuhan",
    },
    plans: [
      {
        name: {
          vi: "Thư ký công ty",
          en: "Company Secretary",
          zh: "公司秘书",
          es: "Secretaría corporativa",
          id: "Sekretaris Perusahaan",
        },
        price: "$75",
        period: { vi: "/tháng", en: "/mo", zh: "/月", es: "/mes", id: "/bulan" },
        desc: {
          vi: "Dành cho LLC Mỹ đang hoạt động",
          en: "For active US LLC",
          zh: "适用于活跃的美国LLC",
          es: "Para LLC en EE.UU. activa",
          id: "Untuk LLC AS yang aktif",
        },
        features: {
          vi: ["Duy trì sổ đăng ký", "Soạn thảo nghị quyết", "Annual filing", "Nhắc deadline"],
          en: ["Maintain registers", "Draft resolutions", "Annual filing", "Deadline reminders"],
          zh: ["维护登记册", "起草决议", "年度申报", "截止日期提醒"],
          es: ["Mantener registros", "Redactar resoluciones", "Presentación anual", "Recordatorios de plazos"],
          id: ["Memelihara daftar", "Menyusun resolusi", "Pengajuan tahunan", "Pengingat tenggat waktu"],
        },
      },
      {
        name: {
          vi: "Khai báo thuế & Báo cáo",
          en: "US Tax Filing & Reporting",
          zh: "美国税务申报与报告",
          es: "Declaración fiscal en EE.UU.",
          id: "Pengajuan Pajak & Pelaporan AS",
        },
        price: "$150",
        period: { vi: "một lần", en: "one-time", zh: "一次性", es: "pago único", id: "sekali bayar" },
        desc: {
          vi: "Form 5472, BOI Report và khai báo liên bang hàng năm",
          en: "Form 5472, BOI Report and annual federal filings",
          zh: "Form 5472、BOI报告和年度联邦申报",
          es: "Form 5472, BOI Report y declaraciones federales anuales",
          id: "Form 5472, BOI Report dan pengajuan federal tahunan",
        },
        features: {
          vi: ["Đánh giá nghĩa vụ khai báo", "Chuẩn bị & nộp Form 5472", "BOI Report theo FinCEN", "Nhắc nhở deadline hàng năm"],
          en: ["Filing obligation assessment", "Prepare & file Form 5472", "BOI Report with FinCEN", "Annual deadline reminders"],
          zh: ["申报义务评估", "准备并提交Form 5472", "向FinCEN提交BOI报告", "年度截止日期提醒"],
          es: ["Evaluación de obligaciones de presentación", "Preparar y presentar Form 5472", "BOI Report con FinCEN", "Recordatorios anuales de plazos"],
          id: ["Penilaian kewajiban pengajuan", "Persiapkan & ajukan Form 5472", "BOI Report ke FinCEN", "Pengingat tenggat waktu tahunan"],
        },
      },
      {
        name: {
          vi: "Chuyển tiền quốc tế",
          en: "International Transfers",
          zh: "国际汇款",
          es: "Transferencias internacionales",
          id: "Transfer Internasional",
        },
        price: "CONTACT",
        period: { vi: "", en: "", zh: "", es: "", id: "" },
        desc: {
          vi: "Tuỳ theo giá trị giao dịch",
          en: "Depends on transaction value",
          zh: "根据交易金额而定",
          es: "Según el valor de la transacción",
          id: "Tergantung nilai transaksi",
        },
        features: {
          vi: ["Wire transfer từ tài khoản Mỹ", "Phân phối lợi nhuận cho cổ đông", "Kết nối Wise, Airwallex, Payoneer", "Tư vấn tỷ giá tối ưu"],
          en: ["Wire transfer from US account", "Profit distribution to shareholders", "Connect Wise, Airwallex, Payoneer", "Exchange rate optimization advice"],
          zh: ["从美国账户电汇", "利润分配给股东", "连接Wise、Airwallex、Payoneer", "汇率优化建议"],
          es: ["Transferencia desde cuenta en EE.UU.", "Distribución de beneficios a accionistas", "Conectar Wise, Airwallex, Payoneer", "Asesoría de optimización de tipo de cambio"],
          id: ["Transfer kawat dari rekening AS", "Distribusi laba kepada pemegang saham", "Hubungkan Wise, Airwallex, Payoneer", "Saran optimasi nilai tukar"],
        },
      },
    ],
  },
];
