"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

type FAQ = { q: string; a: string };
type Category = { id: string; label: string; labelEn: string; faqs: FAQ[] };

const CATEGORIES: Category[] = [
  {
    id: "llc",
    label: "LLC tại Mỹ",
    labelEn: "US LLC",
    faqs: [
      {
        q: "Người Việt Nam có thể mở LLC tại Mỹ không?",
        a: "Có. Không cần quốc tịch Mỹ hay visa để thành lập LLC. Bất kỳ cá nhân hoặc tổ chức nước ngoài nào cũng có thể là thành viên (member) của một LLC Mỹ. Bạn chỉ cần có hộ chiếu và địa chỉ liên lạc hợp lệ.",
      },
      {
        q: "Nên chọn Delaware hay Wyoming để mở LLC?",
        a: "Delaware phù hợp cho công ty muốn gọi vốn VC, có nhiều thành viên quốc tế hoặc cần hệ thống pháp lý rõ ràng nhất. Wyoming phù hợp hơn cho LLC một thành viên (single-member), chi phí thấp hơn và bảo vệ tài sản tốt hơn. Gloyce tư vấn miễn phí để giúp bạn chọn đúng từ đầu.",
      },
      {
        q: "Mất bao lâu để thành lập LLC?",
        a: "Thông thường 7–14 ngày làm việc từ khi nộp hồ sơ. Delaware có dịch vụ expedited (1–3 ngày) với phí phụ thu. Sau khi LLC được phê duyệt, EIN từ IRS thường mất thêm 1–2 tuần nếu nộp qua fax, hoặc ngay lập tức nếu có ITIN.",
      },
      {
        q: "EIN là gì và tôi có cần nó không?",
        a: "EIN (Employer Identification Number) là mã số thuế liên bang của công ty — tương tự MST ở Việt Nam. Bạn cần EIN để mở tài khoản ngân hàng Mỹ, đăng ký Stripe/PayPal, ký hợp đồng với đối tác Mỹ và nộp báo cáo thuế liên bang. Gloyce lo toàn bộ quy trình xin EIN cho bạn.",
      },
      {
        q: "LLC có phải đóng thuế ở Mỹ không?",
        a: "LLC một thành viên (single-member) bị mặc định coi là 'disregarded entity' — nghĩa là lợi nhuận chảy thẳng qua (pass-through) vào thuế cá nhân của chủ. Với non-resident alien (người nước ngoài không cư trú ở Mỹ) không có thu nhập nguồn gốc Mỹ (ECI), thường không phát sinh thuế liên bang. Nhưng vẫn phải nộp Form 5472 và các báo cáo bắt buộc.",
      },
    ],
  },
  {
    id: "banking",
    label: "Tài khoản ngân hàng",
    labelEn: "Bank account",
    faqs: [
      {
        q: "Mở tài khoản ngân hàng Mỹ có cần sang Mỹ không?",
        a: "Không. Mercury, Relay và Wise Business đều cho phép mở tài khoản 100% online mà không cần đến Mỹ. Tuy nhiên yêu cầu LLC đã có EIN và địa chỉ Registered Agent hợp lệ. Tỷ lệ phê duyệt phụ thuộc vào ngành nghề và lịch sử tài chính. Gloyce có quy trình tối ưu để tăng tỷ lệ thành công.",
      },
      {
        q: "Nên dùng Mercury, Relay hay Wise?",
        a: "Mercury là lựa chọn phổ biến nhất cho startup và seller — giao diện đẹp, tích hợp Stripe/PayPal tốt, không phí duy trì. Relay phù hợp cho doanh nghiệp cần tách tài khoản theo mục đích (budget buckets). Wise Business phù hợp khi cần chuyển tiền quốc tế nhiều với phí thấp. Gloyce tư vấn và hỗ trợ mở cả ba.",
      },
      {
        q: "Có thể nhận tiền từ Amazon/Shopee vào tài khoản Mỹ không?",
        a: "Có. Mercury và Relay đều được Amazon Seller Central, Shopee Global, TikTok Shop Affiliate chấp nhận là tài khoản nhận thanh toán. Bạn cần cung cấp số account và routing number khi đăng ký.",
      },
    ],
  },
  {
    id: "compliance",
    label: "Tuân thủ & Khai báo",
    labelEn: "Compliance & Filing",
    faqs: [
      {
        q: "Form 5472 là gì và khi nào phải nộp?",
        a: "Form 5472 là báo cáo bắt buộc của IRS dành cho LLC sở hữu bởi người nước ngoài (foreign-owned disregarded entity). Phải nộp hàng năm cùng với Form 1120 (pro-forma). Hạn nộp: 15 tháng 4 (có thể gia hạn đến 15 tháng 10). Phạt không nộp: $25,000 mỗi lần vi phạm.",
      },
      {
        q: "BOI Report là gì?",
        a: "Beneficial Ownership Information (BOI) Report là báo cáo bắt buộc theo Luật Corporate Transparency Act của Mỹ, nộp cho FinCEN (Financial Crimes Enforcement Network). LLC thành lập trước 2024 phải nộp trước 1/1/2025. LLC thành lập từ 2024 phải nộp trong vòng 90 ngày sau khi được phê duyệt. Phạt không nộp: $591/ngày.",
      },
      {
        q: "Annual Report và Franchise Tax là gì?",
        a: "Đây là nghĩa vụ hàng năm với tiểu bang — Delaware yêu cầu nộp Annual Franchise Tax (tối thiểu $300/năm) trước ngày 1/6. Wyoming yêu cầu Annual Report với phí $60. Nộp trễ bị phạt và LLC có thể bị revoke (mất hiệu lực). Gloyce theo dõi và nhắc nhở tất cả deadline cho bạn.",
      },
      {
        q: "Tôi không có doanh thu — có cần nộp báo cáo gì không?",
        a: "Vẫn cần. Dù không có doanh thu hay hoạt động, LLC vẫn bắt buộc nộp Form 5472, BOI Report và Annual Report/Franchise Tax với tiểu bang. Các nghĩa vụ này không phụ thuộc vào việc có phát sinh doanh thu hay không.",
      },
    ],
  },
  {
    id: "accounting",
    label: "Kế toán & Thuế",
    labelEn: "Accounting & Tax",
    faqs: [
      {
        q: "Gloyce có cung cấp phần mềm kế toán không?",
        a: "Gloyce không cung cấp phần mềm riêng — thay vào đó chúng tôi tích hợp với QuickBooks, Xero và kết nối tự động Mercury, Wise, Airwallex. Đội kế toán của Gloyce xử lý toàn bộ sổ sách và báo cáo, bạn chỉ cần xem kết quả.",
      },
      {
        q: "Seller Amazon có cần kế toán riêng không?",
        a: "Có. Seller Amazon có nhiều luồng thu nhập phức tạp: FBA fees, advertising credits, refunds, inventory adjustments. Kế toán thông thường thường sai số lớn với Amazon. Gloyce có quy trình chuyên biệt cho Amazon Seller — tích hợp tự động, phân loại đúng theo IRS.",
      },
      {
        q: "Tôi cần kế toán hàng tháng hay hàng quý?",
        a: "Doanh nghiệp có doanh thu trên $10K/tháng nên dùng kế toán hàng tháng để theo dõi dòng tiền và phát hiện vấn đề sớm. Doanh nghiệp nhỏ hơn có thể dùng kế toán hàng quý. Gloyce có cả hai gói — bạn có thể chuyển đổi khi doanh thu tăng.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Giá & Thanh toán",
    labelEn: "Pricing & Payment",
    faqs: [
      {
        q: "Chi phí trọn gói mở LLC Mỹ là bao nhiêu?",
        a: "Gói Standard từ $499 (bao gồm phí bang, Registered Agent năm đầu, EIN, Operating Agreement). Gói Premium từ $799 (thêm hỗ trợ mở tài khoản Mercury/Relay, Form 5472 cơ bản, Business address 1 năm). Xem chi tiết tại trang Bảng giá.",
      },
      {
        q: "Phí kế toán hàng tháng là bao nhiêu?",
        a: "Từ 3.000.000đ/tháng (~$149 USD) cho gói Starter (doanh thu dưới $50K/năm). Gói Growth từ 6.000.000đ/tháng ($299 USD) cho doanh thu $50K–$500K. Gói Scale từ 12.000.000đ/tháng ($599 USD) bao gồm CFO thuê ngoài. Tất cả gói đều thanh toán hàng tháng, không ràng buộc hợp đồng dài hạn.",
      },
      {
        q: "Thanh toán bằng hình thức nào?",
        a: "Gloyce chấp nhận thanh toán qua chuyển khoản ngân hàng (VND hoặc USD), Wise, PayPal và thẻ tín dụng quốc tế. Hóa đơn được gửi trước 5 ngày, thanh toán được xử lý trong 1–2 ngày làm việc.",
      },
      {
        q: "Có hợp đồng tối thiểu không?",
        a: "Dịch vụ thành lập công ty là one-time, không ràng buộc. Dịch vụ kế toán hàng tháng không yêu cầu hợp đồng tối thiểu — bạn có thể dừng bất cứ lúc nào với thông báo trước 30 ngày.",
      },
    ],
  },
  {
    id: "general",
    label: "Câu hỏi chung",
    labelEn: "General",
    faqs: [
      {
        q: "Gloyce là công ty gì?",
        a: "Gloyce LLC là công ty tư vấn doanh nghiệp đăng ký tại California, Hoa Kỳ (địa chỉ: 3000 Marketplace, Irvine, CA 92602). Chúng tôi chuyên giúp doanh nhân và doanh nghiệp Việt Nam thành lập, vận hành và mở rộng kinh doanh tại Mỹ, Singapore và Hồng Kông.",
      },
      {
        q: "Gloyce có phải là văn phòng luật không?",
        a: "Không. Gloyce là công ty tư vấn doanh nghiệp, không phải văn phòng luật hay tổ chức tài chính được cấp phép. Chúng tôi cung cấp dịch vụ tư vấn thành lập, kế toán và tuân thủ — không cung cấp tư vấn pháp lý hành nghề luật.",
      },
      {
        q: "Gloyce hỗ trợ tiếng Việt không?",
        a: "Có. Toàn bộ đội ngũ Gloyce giao tiếp bằng tiếng Việt. Email, cuộc gọi, tài liệu hướng dẫn và dashboard đều có phiên bản tiếng Việt. Đây là lợi thế lớn so với các dịch vụ Mỹ hay Singapore không có hỗ trợ tiếng Việt.",
      },
      {
        q: "Tôi có thể tự mở LLC mà không cần Gloyce không?",
        a: "Có, về mặt kỹ thuật bạn có thể tự làm qua các dịch vụ như Stripe Atlas ($500) hay doola ($297). Tuy nhiên các dịch vụ này không có hỗ trợ tiếng Việt, không tư vấn chọn bang phù hợp, không hỗ trợ mở tài khoản ngân hàng và không nhắc deadline Form 5472/BOI Report. Gloyce không chỉ mở LLC — chúng tôi đồng hành toàn hành trình.",
      },
    ],
  },
];

function FAQItem({ faq, isVi }: { faq: { q: string; a: string; qEn?: string; aEn?: string }; isVi: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? "border-gold/30 bg-ink-800/80" : "border-ink-600 bg-ink-800/40"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground leading-snug">{faq.q}</span>
        <ChevronDown
          size={16}
          className={`text-gold shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-ink-600 mb-4" />
          <p className="text-sm text-ink-300 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const locale = useLocale();
  const isVi = locale === "vi";
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
              {isVi ? "CÂU HỎI THƯỜNG GẶP" : "FAQ"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Mọi thắc mắc được giải đáp" : "Every question answered"}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl mx-auto">
              {isVi
                ? "Tổng hợp các câu hỏi phổ biến nhất về thành lập công ty Mỹ, kế toán và tuân thủ pháp lý."
                : "Answers to the most common questions about US incorporation, accounting, and compliance."}
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
                {isVi ? cat.label : cat.labelEn}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3 mb-16">
            {current.faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} isVi={isVi} />
            ))}
          </div>

          {/* CTA */}
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-lg mb-2">
              {isVi ? "Không tìm thấy câu trả lời?" : "Didn't find your answer?"}
            </h2>
            <p className="text-sm text-ink-300 mb-5">
              {isVi
                ? "Đặt lịch tư vấn miễn phí 30 phút với chuyên gia Gloyce."
                : "Book a free 30-minute consultation with a Gloyce expert."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all"
            >
              {isVi ? "Liên hệ ngay" : "Contact us"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
