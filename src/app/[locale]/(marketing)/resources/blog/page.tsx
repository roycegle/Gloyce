import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock } from "lucide-react";

const POSTS_VI = [
  {
    tag: "LLC Mỹ",
    title: "Delaware vs Wyoming — Chọn bang nào khi mở LLC cho doanh nghiệp Việt Nam?",
    excerpt: "So sánh chi tiết hai bang phổ biến nhất: chi phí, bảo vệ tài sản, phù hợp với từng loại mô hình kinh doanh.",
    date: "08/2026",
    readTime: "8 phút",
    href: "/resources/blog/delaware-vs-wyoming",
    featured: true,
  },
  {
    tag: "Tuân thủ",
    title: "Form 5472: Hướng dẫn đầy đủ cho chủ LLC nước ngoài tại Mỹ",
    excerpt: "Ai phải nộp, nộp khi nào, hậu quả nếu bỏ lỡ và cách Gloyce giúp bạn tuân thủ đúng hạn.",
    date: "07/2026",
    readTime: "6 phút",
    href: "/resources/blog/form-5472-guide",
  },
  {
    tag: "Kế toán",
    title: "Seller Amazon nên biết 5 điều này về kế toán Mỹ trước khi quá muộn",
    excerpt: "FBA fees, reimbursements, advertising credits — tại sao kế toán thông thường không đủ cho Amazon Seller.",
    date: "07/2026",
    readTime: "5 phút",
    href: "/resources/blog/amazon-seller-accounting",
  },
  {
    tag: "Tài khoản ngân hàng",
    title: "Mercury vs Relay vs Wise Business — Ngân hàng nào tốt nhất cho LLC Việt?",
    excerpt: "Review thực tế từ góc độ seller Việt Nam: phí, giới hạn chuyển tiền, tích hợp Stripe/PayPal.",
    date: "06/2026",
    readTime: "7 phút",
    href: "/resources/blog/mercury-vs-relay-vs-wise",
  },
  {
    tag: "Chiến lược",
    title: "Khi nào nên mở Singapore thay vì Mỹ? 4 tiêu chí để quyết định",
    excerpt: "Với doanh nghiệp châu Á, B2B SaaS hoặc fintech — Singapore có thể là lựa chọn thông minh hơn.",
    date: "06/2026",
    readTime: "6 phút",
    href: "/resources/blog/singapore-vs-us",
  },
  {
    tag: "BOI Report",
    title: "BOI Report — Báo cáo FinCEN bắt buộc từ 2024: Mọi điều bạn cần biết",
    excerpt: "Lịch sử, ai phải nộp, deadline và hậu quả của việc không tuân thủ Corporate Transparency Act.",
    date: "05/2026",
    readTime: "5 phút",
    href: "/resources/blog/boi-report-guide",
  },
];

const POSTS_EN = [
  {
    tag: "US LLC",
    title: "Delaware vs Wyoming — Which state for your Vietnamese-owned LLC?",
    excerpt: "A detailed comparison of the two most popular states: costs, asset protection, and which fits your business model.",
    date: "Aug 2026",
    readTime: "8 min read",
    href: "/resources/blog/delaware-vs-wyoming",
    featured: true,
  },
  {
    tag: "Compliance",
    title: "Form 5472: The Complete Guide for Foreign-Owned US LLC Owners",
    excerpt: "Who must file, when to file, what happens if you miss it, and how Gloyce keeps you compliant.",
    date: "Jul 2026",
    readTime: "6 min read",
    href: "/resources/blog/form-5472-guide",
  },
  {
    tag: "Accounting",
    title: "5 Things Amazon Sellers Must Know About US Accounting Before It's Too Late",
    excerpt: "FBA fees, reimbursements, advertising credits — why standard bookkeeping falls short for Amazon Sellers.",
    date: "Jul 2026",
    readTime: "5 min read",
    href: "/resources/blog/amazon-seller-accounting",
  },
  {
    tag: "Bank account",
    title: "Mercury vs Relay vs Wise Business — Best bank for Vietnamese LLCs?",
    excerpt: "A real-world review for Vietnamese sellers: fees, transfer limits, Stripe/PayPal integrations.",
    date: "Jun 2026",
    readTime: "7 min read",
    href: "/resources/blog/mercury-vs-relay-vs-wise",
  },
  {
    tag: "Strategy",
    title: "When to incorporate in Singapore instead of the US — 4 key criteria",
    excerpt: "For Asia-focused businesses, B2B SaaS, or fintech — Singapore may be the smarter choice.",
    date: "Jun 2026",
    readTime: "6 min read",
    href: "/resources/blog/singapore-vs-us",
  },
  {
    tag: "BOI Report",
    title: "BOI Report — FinCEN's Mandatory Filing Since 2024: Everything You Need to Know",
    excerpt: "Background, who must file, deadlines and penalties under the Corporate Transparency Act.",
    date: "May 2026",
    readTime: "5 min read",
    href: "/resources/blog/boi-report-guide",
  },
];

export default async function BlogPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  const posts = isVi ? POSTS_VI : POSTS_EN;
  const [featured, ...rest] = posts;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {isVi ? "BLOG" : "BLOG"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Kiến thức thực tế cho doanh nghiệp toàn cầu" : "Practical knowledge for global businesses"}
            </h1>
            <p className="text-ink-300 text-lg max-w-xl">
              {isVi
                ? "Phân tích chuyên sâu về thành lập công ty, tuân thủ pháp lý Mỹ và chiến lược mở rộng quốc tế."
                : "In-depth analysis on US incorporation, compliance, and international expansion strategy."}
            </p>
          </div>

          {/* Featured post */}
          <Link href={featured.href} className="group block mb-10">
            <div className="relative bg-ink-800 border border-ink-600 hover:border-gold/40 rounded-3xl p-8 sm:p-10 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                    {featured.tag}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 rounded-full">
                    {isVi ? "Nổi bật" : "Featured"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold transition-colors max-w-3xl">
                  {featured.title}
                </h2>
                <p className="text-ink-300 text-base leading-relaxed mb-5 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-ink-400">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-500" />
                  <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-500" />
                  <span className="text-gold font-medium flex items-center gap-1">
                    {isVi ? "Đọc tiếp" : "Read more"} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => (
              <Link key={post.href} href={post.href} className="group bg-ink-800 border border-ink-600 hover:border-gold/40 rounded-2xl p-6 flex flex-col transition-all">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full mb-4 w-fit">
                  {post.tag}
                </span>
                <h3 className="font-semibold text-foreground leading-snug mb-3 group-hover:text-gold transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-xs text-ink-300 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] text-ink-500 pt-4 border-t border-ink-700">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-600" />
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
