// ---------------------------------------------------------------------------
// Gloyce testimonials data
//
// SIMPLE_TESTIMONIALS — English-only, used by TestimonialsSection.tsx
// TESTIMONIALS_ML    — Multilingual (vi/en/zh/es/id), used by the homepage
//
// To update a testimonial: edit the relevant object below.
// To add one: append to the array; the component will render it automatically.
// ---------------------------------------------------------------------------

/** Service tier the testimonial relates to. */
export type ServiceTier = "execute" | "operate" | "strategize";

// ---------------------------------------------------------------------------
// Simple (English-only) testimonials — TestimonialsSection component
// ---------------------------------------------------------------------------
export type SimpleTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Two-letter initials shown in the avatar circle */
  avatar: string;
  service?: ServiceTier;
};

export const SIMPLE_TESTIMONIALS: SimpleTestimonial[] = [
  {
    quote:
      "Gloyce helped us set up a Delaware LLC, get our EIN, and connect Stripe in under two weeks. The team was professional and available every step of the way.",
    name: "Alex Chen",
    role: "CEO & Founder",
    company: "Amazon Seller — 6 years",
    avatar: "AC",
    service: "execute",
  },
  {
    quote:
      "We used to coordinate three separate vendors: a US attorney, an accountant, and a bank. Gloyce consolidated everything into one relationship — massive time and cost savings.",
    name: "Priya Sharma",
    role: "Founder",
    company: "TikTok Shop International",
    avatar: "PS",
    service: "operate",
  },
  {
    quote:
      "I was especially impressed by how Gloyce handled our Form 5472 and BOI Report filings — everything was on time and I had zero IRS anxiety.",
    name: "David Park",
    role: "Director",
    company: "Cross-border Payment Startup",
    avatar: "DP",
    service: "operate",
  },
];

// ---------------------------------------------------------------------------
// Multilingual testimonials — homepage inline section
// ---------------------------------------------------------------------------
export type L = { vi: string; en: string; zh: string; es: string; id: string };

export type MultilingualTestimonial = {
  name: string;
  role: L;
  /** Hex colour for the generated avatar background (without #) */
  avatarBg: string;
  service: L;
  quote: L;
  country: string;
};

export const TESTIMONIALS_ML: MultilingualTestimonial[] = [
  {
    name: "Alex Chen",
    role: {
      vi: "Founder, TechExport JSC · Singapore",
      en: "Founder, TechExport JSC · Singapore",
      zh: "TechExport JSC创始人 · 新加坡",
      es: "Fundador, TechExport JSC · Singapur",
      id: "Pendiri, TechExport JSC · Singapura",
    },
    avatarBg: "C9960C",
    country: "Singapore",
    service: {
      vi: "US LLC",
      en: "US LLC",
      zh: "美国LLC",
      es: "LLC EE.UU.",
      id: "LLC AS",
    },
    quote: {
      vi: "Gloyce đã giúp chúng tôi thành lập LLC Delaware trong vòng 10 ngày. Toàn bộ quy trình rõ ràng, đội ngũ hỗ trợ chuyên nghiệp và phản hồi rất nhanh.",
      en: "Gloyce set up our Delaware LLC in 10 days. The whole process was crystal clear and the team was incredibly professional and responsive.",
      zh: "Gloyce在10天内帮我们设立了特拉华州LLC。整个流程清晰透明，团队非常专业，响应迅速。",
      es: "Gloyce configuró nuestra LLC de Delaware en 10 días. Todo el proceso fue muy claro y el equipo fue increíblemente profesional.",
      id: "Gloyce mendirikan LLC Delaware kami dalam 10 hari. Seluruh proses sangat jelas dan timnya sangat profesional serta responsif.",
    },
  },
  {
    name: "Ahmad Rizki",
    role: {
      vi: "Amazon Seller · Jakarta, Indonesia",
      en: "Amazon Seller · Jakarta, Indonesia",
      zh: "亚马逊卖家 · 雅加达，印度尼西亚",
      es: "Amazon Seller · Yakarta, Indonesia",
      id: "Amazon Seller · Jakarta, Indonesia",
    },
    avatarBg: "3B7DD8",
    country: "Indonesia",
    service: {
      vi: "Kế toán",
      en: "Accounting",
      zh: "会计",
      es: "Contabilidad",
      id: "Akuntansi",
    },
    quote: {
      vi: "Tôi bán hàng trên Amazon từ Indonesia và không hiểu gì về khai báo thuế Mỹ. Gloyce đã lo hết — từ EIN, Form 5472 đến kế toán hàng tháng. Rất đáng tin.",
      en: "I sell on Amazon from Indonesia and knew nothing about US tax filings. Gloyce handled everything — EIN, Form 5472, and monthly accounting. Extremely trustworthy.",
      zh: "我在印度尼西亚通过Amazon销售，对美国税务申报一无所知。Gloyce处理了一切——EIN、Form 5472和每月会计。非常值得信赖。",
      es: "Vendo en Amazon desde Indonesia y no sabía nada sobre declaraciones de impuestos en EE.UU. Gloyce lo manejó todo — EIN, Form 5472 y contabilidad mensual. Extremadamente confiable.",
      id: "Saya berjualan di Amazon dari Indonesia dan tidak tahu apa-apa tentang pengajuan pajak AS. Gloyce menangani semuanya — EIN, Form 5472, dan akuntansi bulanan. Sangat terpercaya.",
    },
  },
  {
    name: "Kevin Tan",
    role: {
      vi: "CEO, KL Digital · Malaysia",
      en: "CEO, KL Digital · Malaysia",
      zh: "CEO，KL Digital · 马来西亚",
      es: "CEO, KL Digital · Malasia",
      id: "CEO, KL Digital · Malaysia",
    },
    avatarBg: "10B981",
    country: "Malaysia",
    service: {
      vi: "Khai báo thuế Mỹ",
      en: "US Tax Filing",
      zh: "美国税务申报",
      es: "Declaración fiscal en EE.UU.",
      id: "Pengajuan pajak AS",
    },
    quote: {
      vi: "Gloyce giải thích rõ ràng Form 5472 và các nghĩa vụ thuế liên bang cho LLC nước ngoài. Rất nhiều đơn vị không am hiểu phần này — Gloyce hướng dẫn cụ thể từng bước.",
      en: "Gloyce clearly explained Form 5472 and federal tax obligations for a foreign-owned LLC. Very few providers understand this part — Gloyce guided me step by step.",
      zh: "Gloyce清楚地解释了外资LLC的Form 5472和联邦税务义务。很少有服务商了解这部分——Gloyce一步一步指导我。",
      es: "Gloyce explicó claramente Form 5472 y las obligaciones fiscales federales para una LLC de propiedad extranjera. Muy pocos proveedores entienden esto — Gloyce me guió paso a paso.",
      id: "Gloyce menjelaskan dengan jelas Form 5472 dan kewajiban pajak federal untuk LLC milik asing. Sangat sedikit penyedia yang memahami ini — Gloyce membimbing saya langkah demi langkah.",
    },
  },
];
