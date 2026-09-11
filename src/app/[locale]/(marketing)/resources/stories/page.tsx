import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

const UX = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

type L = { vi: string; en: string; zh: string; es: string; id: string };

function pick(locale: string, l: L): string {
  return (l as Record<string, string>)[locale] ?? l.en;
}

type Story = {
  name: string;
  role: L;
  company: L;
  service: L;
  quote: L;
  result: L;
  stats: { v: string; l: L }[];
  img: string;
  href: string;
};

const STORIES: Story[] = [
  {
    name: "Alex Chen",
    role: {
      vi: "Founder & CEO",
      en: "Founder & CEO",
      zh: "创始人兼CEO",
      es: "Fundador y CEO",
      id: "Pendiri & CEO",
    },
    company: {
      vi: "TechExport JSC",
      en: "TechExport JSC",
      zh: "TechExport JSC",
      es: "TechExport JSC",
      id: "TechExport JSC",
    },
    service: {
      vi: "LLC Mỹ + Kế toán",
      en: "US LLC + Accounting",
      zh: "美国LLC + 会计",
      es: "LLC EE.UU. + Contabilidad",
      id: "LLC AS + Akuntansi",
    },
    quote: {
      vi: "Trước Gloyce, tôi mất 2 tháng tự tìm hiểu và vẫn không chắc mình làm đúng. Gloyce xử lý mọi thứ trong 12 ngày — LLC Delaware, EIN, Mercury, Form 5472. Tôi chỉ cần cung cấp hộ chiếu.",
      en: "Before Gloyce, I spent 2 months researching and still wasn't sure I was doing it right. Gloyce handled everything in 12 days — Delaware LLC, EIN, Mercury, Form 5472. I just needed to provide my passport.",
      zh: "在Gloyce之前，我花了2个月研究，仍不确定自己做得对。Gloyce在12天内处理了一切——特拉华LLC、EIN、Mercury、5472表。我只需要提供护照。",
      es: "Antes de Gloyce, pasé 2 meses investigando y aún no estaba seguro de hacerlo bien. Gloyce manejó todo en 12 días — LLC Delaware, EIN, Mercury, Formulario 5472. Solo necesité proporcionar mi pasaporte.",
      id: "Sebelum Gloyce, saya menghabiskan 2 bulan meneliti dan masih tidak yakin melakukannya dengan benar. Gloyce menangani semuanya dalam 12 hari — LLC Delaware, EIN, Mercury, Form 5472. Saya hanya perlu memberikan paspor.",
    },
    result: {
      vi: "Từ 0 đến hoạt động đầy đủ chỉ trong 12 ngày.",
      en: "From zero to fully operational in just 12 days.",
      zh: "从零到完全运营只用了12天。",
      es: "De cero a completamente operativo en solo 12 días.",
      id: "Dari nol hingga beroperasi penuh hanya dalam 12 hari.",
    },
    stats: [
      {
        v: "12",
        l: {
          vi: "ngày từ ký đến hoạt động",
          en: "days from signing to operational",
          zh: "天从签约到运营",
          es: "días de firma a operación",
          id: "hari dari tanda tangan ke operasional",
        },
      },
      {
        v: "$0",
        l: {
          vi: "phạt IRS trong 2 năm",
          en: "IRS penalties in 2 years",
          zh: "IRS罚款（2年）",
          es: "multas IRS en 2 años",
          id: "denda IRS dalam 2 tahun",
        },
      },
      {
        v: "2h",
        l: {
          vi: "mỗi tháng cho kế toán",
          en: "per month on accounting",
          zh: "每月用于会计",
          es: "al mes en contabilidad",
          id: "per bulan untuk akuntansi",
        },
      },
    ],
    img: UX("1560472354-b33ff0c44a43", 800, 500),
    href: "/resources/stories/techexport",
  },
  {
    name: "Ahmad Rizki",
    role: {
      vi: "Amazon Seller · Jakarta, Indonesia",
      en: "Amazon Seller · Jakarta, Indonesia",
      zh: "亚马逊卖家 · 雅加达，印度尼西亚",
      es: "Vendedor Amazon · Yakarta, Indonesia",
      id: "Penjual Amazon · Jakarta, Indonesia",
    },
    company: {
      vi: "RizkiShop Global",
      en: "RizkiShop Global",
      zh: "RizkiShop Global",
      es: "RizkiShop Global",
      id: "RizkiShop Global",
    },
    service: {
      vi: "Kế toán & Thuế Mỹ",
      en: "Accounting & US Tax",
      zh: "会计与美国税务",
      es: "Contabilidad & Impuestos EE.UU.",
      id: "Akuntansi & Pajak AS",
    },
    quote: {
      vi: "Tôi bán hàng trên Amazon từ Indonesia từ 2020 nhưng không hiểu gì về khai báo thuế Mỹ. Sau khi bị audit nhẹ từ Amazon, tôi tìm đến Gloyce. Họ sắp xếp lại toàn bộ sổ sách 3 năm và nộp Form 5472 đúng hạn.",
      en: "I've been selling on Amazon from Indonesia since 2020 but didn't understand US tax filings. After a minor Amazon audit, I found Gloyce. They reorganized 3 years of books and filed Form 5472 on time.",
      zh: "我从2020年开始在印度尼西亚通过亚马逊销售，但不了解美国税务申报。在一次轻微的亚马逊审计后，我找到了Gloyce。他们重新整理了3年的账目，并按时提交了5472表。",
      es: "He estado vendiendo en Amazon desde Indonesia desde 2020 pero no entendía las declaraciones fiscales de EE.UU. Después de una pequeña auditoría de Amazon, encontré Gloyce. Reorganizaron 3 años de libros y presentaron el Formulario 5472 a tiempo.",
      id: "Saya telah berjualan di Amazon dari Indonesia sejak 2020 tetapi tidak memahami pengajuan pajak AS. Setelah audit kecil dari Amazon, saya menemukan Gloyce. Mereka mereorganisasi 3 tahun pembukuan dan mengajukan Form 5472 tepat waktu.",
    },
    result: {
      vi: "Sổ sách 3 năm được chỉnh lý, không phát sinh phạt.",
      en: "3 years of books reconciled, zero penalties.",
      zh: "3年账目核对完毕，零罚款。",
      es: "3 años de libros reconciliados, cero penalidades.",
      id: "3 tahun pembukuan direkonsiliasi, nol denda.",
    },
    stats: [
      {
        v: "3",
        l: {
          vi: "năm sổ sách được chỉnh lý",
          en: "years of books reconciled",
          zh: "年账目核对",
          es: "años de libros reconciliados",
          id: "tahun pembukuan direkonsiliasi",
        },
      },
      {
        v: "$180K",
        l: {
          vi: "doanh thu được tối ưu kế toán",
          en: "revenue properly accounted",
          zh: "收入正确核算",
          es: "ingresos correctamente contabilizados",
          id: "pendapatan dicatat dengan benar",
        },
      },
      {
        v: "40%",
        l: {
          vi: "giảm thời gian quản lý tài chính",
          en: "less time on financial admin",
          zh: "减少财务管理时间",
          es: "menos tiempo en administración financiera",
          id: "waktu admin keuangan berkurang",
        },
      },
    ],
    img: UX("1573496359142-b8d87734a5a2", 800, 500),
    href: "/resources/stories/hoashop",
  },
  {
    name: "Kevin Tan",
    role: {
      vi: "CEO · Kuala Lumpur, Malaysia",
      en: "CEO · Kuala Lumpur, Malaysia",
      zh: "CEO · 吉隆坡，马来西亚",
      es: "CEO · Kuala Lumpur, Malasia",
      id: "CEO · Kuala Lumpur, Malaysia",
    },
    company: {
      vi: "KL Digital",
      en: "KL Digital",
      zh: "KL Digital",
      es: "KL Digital",
      id: "KL Digital",
    },
    service: {
      vi: "US LLC + Form 5472 + BOI",
      en: "US LLC + Form 5472 + BOI",
      zh: "美国LLC + 5472表 + BOI",
      es: "LLC EE.UU. + Form 5472 + BOI",
      id: "LLC AS + Form 5472 + BOI",
    },
    quote: {
      vi: "Startup của tôi cần cấu trúc công ty Mỹ để nhận đầu tư từ quỹ Singapore. Gloyce không chỉ mở LLC mà còn tư vấn cấu trúc phù hợp cho vòng gọi vốn — điều mà các dịch vụ thông thường không làm được.",
      en: "My startup needed US entity structure to receive investment from a Singapore fund. Gloyce didn't just open the LLC — they advised on the right structure for our fundraising round, something standard services don't do.",
      zh: "我的初创公司需要美国实体结构来接受新加坡基金的投资。Gloyce不只是开设LLC——他们还为我们的融资轮提供了正确的结构建议，这是标准服务做不到的。",
      es: "Mi startup necesitaba estructura de entidad estadounidense para recibir inversión de un fondo de Singapur. Gloyce no solo abrió la LLC — también asesoró sobre la estructura correcta para nuestra ronda de financiación, algo que los servicios estándar no hacen.",
      id: "Startup saya membutuhkan struktur entitas AS untuk menerima investasi dari dana Singapura. Gloyce tidak hanya membuka LLC — mereka juga memberikan saran struktur yang tepat untuk putaran penggalangan dana kami, sesuatu yang tidak dilakukan layanan standar.",
    },
    result: {
      vi: "Cấu trúc pháp lý sẵn sàng cho vòng seed $500K.",
      en: "Legal structure ready for a $500K seed round.",
      zh: "法律结构为50万美元种子轮做好准备。",
      es: "Estructura legal lista para una ronda semilla de $500K.",
      id: "Struktur hukum siap untuk putaran seed $500K.",
    },
    stats: [
      {
        v: "$500K",
        l: {
          vi: "vòng seed thành công",
          en: "seed round raised",
          zh: "种子轮融资",
          es: "ronda semilla obtenida",
          id: "putaran seed terkumpul",
        },
      },
      {
        v: "14",
        l: {
          vi: "ngày từ ý tưởng đến LLC hoạt động",
          en: "days from idea to operational LLC",
          zh: "天从想法到LLC运营",
          es: "días de idea a LLC operativa",
          id: "hari dari ide ke LLC operasional",
        },
      },
      {
        v: "100%",
        l: {
          vi: "tuân thủ Form 5472 & BOI",
          en: "Form 5472 & BOI compliant",
          zh: "5472表和BOI合规",
          es: "cumplimiento Form 5472 & BOI",
          id: "kepatuhan Form 5472 & BOI",
        },
      },
    ],
    img: UX("1542744173-8e7e53415bb0", 800, 500),
    href: "/resources/stories/crossborder",
  },
];

export default async function StoriesPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("CÂU CHUYỆN KHÁCH HÀNG", "CUSTOMER STORIES", "客户案例", "CASOS DE ÉXITO", "KISAH PELANGGAN")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t(
                "Những doanh nhân đã chinh phục thị trường toàn cầu cùng Gloyce",
                "Founders who went global with Gloyce",
                "与Gloyce一起走向全球的创业者",
                "Fundadores que se globalizaron con Gloyce",
                "Pendiri yang mendunia bersama Gloyce"
              )}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl mx-auto">
              {t(
                "Câu chuyện thực tế từ các doanh nghiệp châu Á đã dùng Gloyce để thành lập, vận hành và tuân thủ tại Mỹ, Singapore và Hồng Kông.",
                "Real stories from businesses across Asia that used Gloyce to incorporate, operate, and stay compliant in the US, Singapore and Hong Kong.",
                "来自亚洲各地企业使用Gloyce在美国、新加坡和香港成立、运营并保持合规的真实案例。",
                "Historias reales de empresas de toda Asia que usaron Gloyce para incorporarse, operar y mantenerse en cumplimiento en EE.UU., Singapur y Hong Kong.",
                "Kisah nyata dari bisnis di seluruh Asia yang menggunakan Gloyce untuk mendirikan, beroperasi, dan tetap patuh di AS, Singapura, dan Hong Kong."
              )}
            </p>
          </div>

          {/* Stories */}
          <div className="space-y-8">
            {STORIES.map((story, i) => (
              <div key={story.href} className={`group relative bg-ink-800 border border-ink-600 hover:border-gold/30 rounded-3xl overflow-hidden transition-all grid ${i % 2 === 0 ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"}`}>
                {/* Image */}
                <div className={`relative h-56 md:h-auto ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                  <Image src={story.img} alt={pick(locale, story.company)} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-800/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-ink-900/80 backdrop-blur-sm border border-gold/30 px-3 py-1 rounded-full">
                      {pick(locale, story.service)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 sm:p-10 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  <Quote className="w-7 h-7 text-gold/20 mb-4" />
                  <p className="text-base text-ink-200 leading-relaxed italic mb-5">
                    &ldquo;{pick(locale, story.quote)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-sm font-bold text-gold shrink-0">
                      {story.name.split(" ").map(w => w[0]).slice(-2).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{story.name}</p>
                      <p className="text-xs text-ink-400">{pick(locale, story.role)} · {pick(locale, story.company)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {story.stats.map(s => (
                      <div key={s.v} className="bg-ink-700 border border-ink-600 rounded-xl p-3 text-center">
                        <p className="text-sm font-black text-gold">{s.v}</p>
                        <p className="text-[10px] text-ink-400 leading-tight mt-0.5">{pick(locale, s.l)}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={story.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                    {t("Đọc câu chuyện đầy đủ", "Read the full story", "阅读完整故事", "Leer la historia completa", "Baca kisah lengkapnya")}
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">
              {t(
                "Doanh nghiệp của bạn là câu chuyện tiếp theo?",
                "Is your business the next story?",
                "您的企业会是下一个案例吗？",
                "¿Es su empresa la próxima historia?",
                "Apakah bisnis Anda adalah kisah berikutnya?"
              )}
            </h2>
            <p className="text-ink-300 mb-5 max-w-md mx-auto">
              {t(
                "Hơn 200 doanh nghiệp đã tin tưởng Gloyce. Bắt đầu với tư vấn miễn phí 30 phút.",
                "Over 200 businesses trust Gloyce. Start with a free 30-minute consultation.",
                "超过200家企业信任Gloyce。从免费30分钟咨询开始。",
                "Más de 200 empresas confían en Gloyce. Comience con una consulta gratuita de 30 minutos.",
                "Lebih dari 200 bisnis mempercayai Gloyce. Mulailah dengan konsultasi gratis 30 menit."
              )}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
