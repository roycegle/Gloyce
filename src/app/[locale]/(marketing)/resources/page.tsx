import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BookOpen, Newspaper, Users, HelpCircle, ArrowRight } from "lucide-react";

export default async function ResourcesPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  const hubs = [
    { icon: Newspaper, title: "Blog", desc: isVi ? "Phân tích thị trường, kinh nghiệm kinh doanh quốc tế và cập nhật pháp lý mới nhất." : "Market analysis, international business insights and latest legal updates.", href: "/resources/blog" },
    { icon: BookOpen, title: isVi ? "Hướng dẫn" : "Guides", desc: isVi ? "Hướng dẫn từng bước về thành lập công ty, kế toán và tuân thủ pháp lý." : "Step-by-step guides on incorporation, accounting and compliance.", href: "/resources/guides" },
    { icon: Users, title: isVi ? "Câu chuyện khách hàng" : "Customer stories", desc: isVi ? "Cách các doanh nghiệp Việt Nam mở rộng ra toàn cầu với Gloyce." : "How Vietnamese businesses expanded globally with Gloyce.", href: "/resources/stories" },
    { icon: HelpCircle, title: "FAQ", desc: isVi ? "Câu trả lời cho các câu hỏi phổ biến nhất về dịch vụ của Gloyce." : "Answers to the most common questions about Gloyce services.", href: "/resources/faq" },
  ];
  const featuredGuides = isVi
    ? [
        { title: "Hướng dẫn mở LLC Mỹ 2026 — Từ A đến Z", href: "/resources/guides/us-llc", tag: "LLC Mỹ" },
        { title: "Form 5472 là gì? Hướng dẫn đầy đủ cho LLC nước ngoài tại Mỹ", href: "/resources/guides/form-5472", tag: "Tuân thủ" },
        { title: "Delaware vs Wyoming — Chọn bang nào khi mở LLC?", href: "/resources/guides/compare", tag: "LLC Mỹ" },
        { title: "Form 5472 là gì và khi nào cần nộp?", href: "/resources/guides/form-5472", tag: "Kế toán" },
        { title: "10 sai lầm phổ biến khi mở công ty ở Mỹ", href: "/resources/guides/mistakes", tag: "LLC Mỹ" },
        { title: "Hồi hương lợi nhuận — Quy định và cách thực hiện", href: "/resources/guides/repatriation", tag: "Tuân thủ" },
      ]
    : [
        { title: "Complete Guide to Opening a US LLC in 2026", href: "/resources/guides/us-llc", tag: "US LLC" },
        { title: "What is Form 5472? Complete guide for foreign-owned US LLCs", href: "/resources/guides/form-5472", tag: "Compliance" },
        { title: "Delaware vs Wyoming — Which state for your LLC?", href: "/resources/guides/compare", tag: "US LLC" },
        { title: "What is Form 5472 and when must you file it?", href: "/resources/guides/form-5472", tag: "Accounting" },
        { title: "10 common mistakes when incorporating in the US", href: "/resources/guides/mistakes", tag: "US LLC" },
        { title: "Profit repatriation — Regulations and how to comply", href: "/resources/guides/repatriation", tag: "Compliance" },
      ];
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{isVi ? "TÀI NGUYÊN" : "RESOURCES"}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {isVi ? "Kiến thức cho doanh nghiệp toàn cầu" : "Knowledge for global businesses"}
            </h1>
            <p className="text-ink-300 text-lg">{isVi ? "Hướng dẫn thực tế, câu chuyện khách hàng và công cụ giúp bạn mở rộng kinh doanh ra nước ngoài đúng cách." : "Practical guides, customer stories and tools to help you expand internationally the right way."}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {hubs.map(hub => {
              const Icon = hub.icon;
              return (
                <Link key={hub.title} href={hub.href} className="group bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/40 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-gold transition-colors">{hub.title}</h3>
                  <p className="text-sm text-ink-300">{hub.desc}</p>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{isVi ? "Hướng dẫn nổi bật" : "Featured guides"}</h2>
              <Link href="/resources/guides" className="text-sm text-gold hover:text-gold-light flex items-center gap-1">{isVi ? "Xem tất cả" : "View all"} <ArrowRight size={13} /></Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGuides.map(g => (
                <Link key={g.title} href={g.href} className="group bg-ink-800 border border-ink-600 rounded-xl p-5 hover:border-gold/40 transition-all">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full mb-3">{g.tag}</span>
                  <h3 className="font-medium text-foreground text-sm leading-snug group-hover:text-gold transition-colors">{g.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
