import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

type Guide = { tag: string; tagEn: string; title: string; titleEn: string; desc: string; descEn: string; time: string; href: string; level: "beginner" | "intermediate" | "advanced" };

const GUIDES: Guide[] = [
  {
    tag: "LLC Mỹ", tagEn: "US LLC",
    title: "Hướng dẫn mở LLC Mỹ 2026 — Từ A đến Z",
    titleEn: "Complete Guide to Opening a US LLC in 2026",
    desc: "Hướng dẫn toàn diện từng bước: chọn bang, đặt tên, nộp hồ sơ, xin EIN và mở tài khoản ngân hàng.",
    descEn: "Step-by-step from choosing a state, naming, filing, getting an EIN, to opening a bank account.",
    time: "15 phút",
    href: "/resources/guides/us-llc",
    level: "beginner",
  },
  {
    tag: "Tuân thủ", tagEn: "Compliance",
    title: "Form 5472 là gì và khi nào cần nộp?",
    titleEn: "What is Form 5472 and when must you file?",
    desc: "Hướng dẫn đầy đủ về nghĩa vụ báo cáo IRS bắt buộc cho LLC nước ngoài — tránh phạt $25,000.",
    descEn: "Complete guide to the mandatory IRS filing for foreign-owned LLCs — avoid the $25,000 penalty.",
    time: "10 phút",
    href: "/resources/guides/form-5472",
    level: "intermediate",
  },
  {
    tag: "LLC Mỹ", tagEn: "US LLC",
    title: "Delaware vs Wyoming — Chọn bang nào?",
    titleEn: "Delaware vs Wyoming — Which state for your LLC?",
    desc: "So sánh 6 tiêu chí quan trọng: thuế, phí, bảo vệ tài sản, phù hợp với mô hình kinh doanh.",
    descEn: "Compare 6 key criteria: taxes, fees, asset protection, and fit for your business model.",
    time: "8 phút",
    href: "/resources/guides/compare",
    level: "beginner",
  },
  {
    tag: "Tuân thủ", tagEn: "Compliance",
    title: "BOI Report theo FinCEN — Hướng dẫn 2026",
    titleEn: "BOI Report with FinCEN — 2026 Guide",
    desc: "Corporate Transparency Act yêu cầu gì, ai phải nộp, deadline và hậu quả của việc không tuân thủ.",
    descEn: "What the Corporate Transparency Act requires, who must file, deadlines and non-compliance penalties.",
    time: "8 phút",
    href: "/resources/guides/boi-report",
    level: "intermediate",
  },
  {
    tag: "LLC Mỹ", tagEn: "US LLC",
    title: "10 sai lầm phổ biến khi mở công ty ở Mỹ",
    titleEn: "10 common mistakes when incorporating in the US",
    desc: "Những sai lầm người Việt thường gặp — từ chọn sai bang đến bỏ quên nghĩa vụ liên bang.",
    descEn: "Common mistakes Vietnamese founders make — from wrong state choice to missing federal obligations.",
    time: "7 phút",
    href: "/resources/guides/mistakes",
    level: "beginner",
  },
  {
    tag: "Kế toán", tagEn: "Accounting",
    title: "Rủi ro pháp lý khi mở LLC tại Mỹ",
    titleEn: "Legal risks of opening a US LLC",
    desc: "Các rủi ro thường bị bỏ qua: không nộp báo cáo, sai loại thực thể, thiếu Operating Agreement.",
    descEn: "Commonly overlooked risks: missed filings, wrong entity type, missing Operating Agreement.",
    time: "9 phút",
    href: "/resources/guides/legal-risk",
    level: "intermediate",
  },
  {
    tag: "Ngân hàng", tagEn: "Banking",
    title: "Mở tài khoản Mercury, Relay, Wise — Hướng dẫn thực tế",
    titleEn: "Opening Mercury, Relay, Wise accounts — Practical guide",
    desc: "Yêu cầu hồ sơ, quy trình nộp đơn và tỷ lệ phê duyệt cho chủ LLC Việt Nam.",
    descEn: "Document requirements, application process and approval tips for Vietnamese LLC owners.",
    time: "10 phút",
    href: "/resources/guides/bank-account",
    level: "beginner",
  },
  {
    tag: "Kế toán", tagEn: "Accounting",
    title: "Thuế doanh nghiệp Mỹ cho người Việt — Những điều cần biết",
    titleEn: "US Business Tax for Vietnamese Owners — Key Things to Know",
    desc: "Pass-through taxation, ECI, FDAP income và cách cấu trúc LLC để tối ưu thuế trong khuôn khổ pháp luật.",
    descEn: "Pass-through taxation, ECI, FDAP income and how to structure your LLC to optimize tax legally.",
    time: "12 phút",
    href: "/resources/guides/us-tax",
    level: "advanced",
  },
];

const LEVEL_LABELS: Record<string, { vi: string; en: string; color: string }> = {
  beginner:     { vi: "Cơ bản",     en: "Beginner",     color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  intermediate: { vi: "Trung cấp",  en: "Intermediate",  color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  advanced:     { vi: "Nâng cao",   en: "Advanced",      color: "text-gold bg-gold/10 border-gold/20" },
};

export default async function GuidesPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const tags = [...new Set(GUIDES.map(g => isVi ? g.tag : g.tagEn))];

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {isVi ? "HƯỚNG DẪN" : "GUIDES"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Hướng dẫn từng bước cho doanh nghiệp toàn cầu" : "Step-by-step guides for global businesses"}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl">
              {isVi
                ? "Các hướng dẫn thực tế, viết bởi chuyên gia Gloyce, giúp bạn điều hướng quy trình thành lập và tuân thủ pháp lý Mỹ."
                : "Practical guides written by Gloyce experts to help you navigate US incorporation and compliance."}
            </p>
          </div>

          {/* Tag filter row */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-ink-800 border border-ink-600 text-ink-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Guide grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUIDES.map(guide => {
              const lvl = LEVEL_LABELS[guide.level];
              return (
                <Link key={guide.href} href={guide.href} className="group flex flex-col bg-ink-800 border border-ink-600 hover:border-gold/40 rounded-2xl p-6 transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                      {isVi ? guide.tag : guide.tagEn}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${lvl.color}`}>
                      {isVi ? lvl.vi : lvl.en}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-gold transition-colors flex-1">
                    {isVi ? guide.title : guide.titleEn}
                  </h3>
                  <p className="text-xs text-ink-300 leading-relaxed mb-4">
                    {isVi ? guide.desc : guide.descEn}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gold font-medium pt-4 border-t border-ink-700">
                    <Clock size={11} /> {guide.time}
                    <span className="ml-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                      {isVi ? "Đọc hướng dẫn" : "Read guide"} <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
