import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

const UX = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

type Story = {
  name: string; role: string; roleEn: string;
  company: string; companyEn: string;
  service: string; serviceEn: string;
  quote: string; quoteEn: string;
  result: string; resultEn: string;
  stats: { v: string; l: string; lEn: string }[];
  img: string;
  href: string;
};

const STORIES: Story[] = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Founder & CEO", roleEn: "Founder & CEO",
    company: "TechExport JSC", companyEn: "TechExport JSC",
    service: "LLC Mỹ + Kế toán", serviceEn: "US LLC + Accounting",
    quote: "Trước Gloyce, tôi mất 2 tháng tự tìm hiểu và vẫn không chắc mình làm đúng. Gloyce xử lý mọi thứ trong 12 ngày — LLC Delaware, EIN, Mercury, Form 5472. Tôi chỉ cần cung cấp hộ chiếu.",
    quoteEn: "Before Gloyce, I spent 2 months researching and still wasn't sure I was doing it right. Gloyce handled everything in 12 days — Delaware LLC, EIN, Mercury, Form 5472. I just needed to provide my passport.",
    result: "Từ 0 đến hoạt động đầy đủ chỉ trong 12 ngày.",
    resultEn: "From zero to fully operational in just 12 days.",
    stats: [
      { v: "12 ngày", l: "từ ký hợp đồng đến hoạt động", lEn: "from signing to operational" },
      { v: "$0", l: "phạt IRS trong 2 năm", lEn: "IRS penalties in 2 years" },
      { v: "2h/tháng", l: "thời gian cho kế toán", lEn: "spent on accounting" },
    ],
    img: UX("1560472354-b33ff0c44a43", 800, 500),
    href: "/resources/stories/techexport",
  },
  {
    name: "Trần Thị Hoa",
    role: "Amazon Seller — 6 năm kinh nghiệm", roleEn: "Amazon Seller — 6 years",
    company: "HoaShop Global", companyEn: "HoaShop Global",
    service: "Kế toán & Thuế Mỹ", serviceEn: "Accounting & US Tax",
    quote: "Tôi bán hàng trên Amazon từ 2020 nhưng không hiểu gì về khai báo thuế Mỹ. Sau khi bị audit nhẹ từ Amazon, tôi tìm đến Gloyce. Họ sắp xếp lại toàn bộ sổ sách 3 năm và nộp Form 5472 đúng hạn.",
    quoteEn: "I've been selling on Amazon since 2020 but didn't understand US tax filings. After a minor Amazon audit, I found Gloyce. They reorganized 3 years of books and filed Form 5472 on time.",
    result: "Sổ sách 3 năm được chỉnh lý, không phát sinh phạt.",
    resultEn: "3 years of books reconciled, zero penalties.",
    stats: [
      { v: "3 năm", l: "sổ sách được chỉnh lý", lEn: "of books reconciled" },
      { v: "$180K", l: "doanh thu được tối ưu kế toán", lEn: "revenue properly accounted" },
      { v: "40%", l: "giảm thời gian quản lý tài chính", lEn: "less time on financial admin" },
    ],
    img: UX("1573496359142-b8d87734a5a2", 800, 500),
    href: "/resources/stories/hoashop",
  },
  {
    name: "Lê Quốc Hùng",
    role: "CEO", roleEn: "CEO",
    company: "Cross-border Payment Startup", companyEn: "Cross-border Payment Startup",
    service: "US LLC + Form 5472 + BOI", serviceEn: "US LLC + Form 5472 + BOI",
    quote: "Startup của tôi cần cấu trúc công ty Mỹ để nhận đầu tư từ quỹ Singapore. Gloyce không chỉ mở LLC mà còn tư vấn cấu trúc phù hợp cho vòng gọi vốn — điều mà các dịch vụ thông thường không làm được.",
    quoteEn: "My startup needed US entity structure to receive investment from a Singapore fund. Gloyce didn't just open the LLC — they advised on the right structure for our fundraising round, something standard services don't do.",
    result: "Cấu trúc pháp lý sẵn sàng cho vòng seed $500K.",
    resultEn: "Legal structure ready for a $500K seed round.",
    stats: [
      { v: "$500K", l: "vòng seed thành công", lEn: "seed round raised" },
      { v: "14 ngày", l: "từ ý tưởng đến LLC hoạt động", lEn: "from idea to operational LLC" },
      { v: "100%", l: "tuân thủ Form 5472 & BOI", lEn: "Form 5472 & BOI compliant" },
    ],
    img: UX("1542744173-8e7e53415bb0", 800, 500),
    href: "/resources/stories/crossborder",
  },
];

export default async function StoriesPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {isVi ? "CÂU CHUYỆN KHÁCH HÀNG" : "CUSTOMER STORIES"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Những doanh nhân đã chinh phục thị trường toàn cầu cùng Gloyce" : "Founders who went global with Gloyce"}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl mx-auto">
              {isVi
                ? "Câu chuyện thực tế từ các doanh nghiệp Việt Nam đã dùng Gloyce để thành lập, vận hành và tuân thủ tại Mỹ."
                : "Real stories from Vietnamese businesses that used Gloyce to incorporate, operate, and stay compliant in the US."}
            </p>
          </div>

          {/* Stories */}
          <div className="space-y-8">
            {STORIES.map((story, i) => (
              <div key={story.href} className={`group relative bg-ink-800 border border-ink-600 hover:border-gold/30 rounded-3xl overflow-hidden transition-all grid ${i % 2 === 0 ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"}`}>
                {/* Image */}
                <div className={`relative h-56 md:h-auto ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                  <Image src={story.img} alt={story.company} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-800/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-ink-900/80 backdrop-blur-sm border border-gold/30 px-3 py-1 rounded-full">
                      {isVi ? story.service : story.serviceEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 sm:p-10 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  <Quote className="w-7 h-7 text-gold/20 mb-4" />
                  <p className="text-base text-ink-200 leading-relaxed italic mb-5">
                    &ldquo;{isVi ? story.quote : story.quoteEn}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-sm font-bold text-gold shrink-0">
                      {story.name.split(" ").map(w => w[0]).slice(-2).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{story.name}</p>
                      <p className="text-xs text-ink-400">{isVi ? story.role : story.roleEn} · {isVi ? story.company : story.companyEn}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {story.stats.map(s => (
                      <div key={s.v} className="bg-ink-700 border border-ink-600 rounded-xl p-3 text-center">
                        <p className="text-sm font-black text-gold">{s.v}</p>
                        <p className="text-[10px] text-ink-400 leading-tight mt-0.5">{isVi ? s.l : s.lEn}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={story.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors group/link">
                    {isVi ? "Đọc câu chuyện đầy đủ" : "Read the full story"}
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">
              {isVi ? "Doanh nghiệp của bạn là câu chuyện tiếp theo?" : "Is your business the next story?"}
            </h2>
            <p className="text-ink-300 mb-5 max-w-md mx-auto">
              {isVi
                ? "Hơn 200 doanh nghiệp đã tin tưởng Gloyce. Bắt đầu với tư vấn miễn phí 30 phút."
                : "Over 200 businesses trust Gloyce. Start with a free 30-minute consultation."}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
