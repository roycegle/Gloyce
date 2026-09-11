import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Globe, Shield, Users, TrendingUp } from "lucide-react";

export default async function AboutPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  const values = [
    { icon: Shield, title: isVi ? "Tuân thủ trên hết" : "Compliance first", desc: isVi ? "Không có lời khuyên mập mờ. Mọi dịch vụ đều được xây dựng trên nền tảng tuân thủ pháp luật Việt Nam và quốc tế." : "No ambiguous advice. Every service is built on a foundation of Vietnamese and international legal compliance." },
    { icon: Users, title: isVi ? "Am hiểu ngôn ngữ & văn hóa" : "Language & culture fluency", desc: isVi ? "Đội ngũ Gloyce nói tiếng Việt, hiểu bối cảnh kinh doanh Việt Nam và kết nối với đối tác quốc tế." : "The Gloyce team speaks Vietnamese, understands Vietnamese business context and connects with international partners." },
    { icon: TrendingUp, title: isVi ? "Chủ động, không thụ động" : "Proactive, not reactive", desc: isVi ? "Chúng tôi theo dõi thay đổi pháp lý, deadline và cơ hội — chủ động thông báo trước khi vấn đề xảy ra." : "We monitor legal changes, deadlines and opportunities — proactively alerting you before issues arise." },
    { icon: Globe, title: isVi ? "Mạng lưới đối tác toàn cầu" : "Global partner network", desc: isVi ? "Gloyce kết nối với luật sư, kế toán, ngân hàng và fintech tại Mỹ, Singapore, Hồng Kông và Việt Nam." : "Gloyce connects with lawyers, accountants, banks and fintechs in the US, Singapore, Hong Kong and Vietnam." },
  ];
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{isVi ? "VỀ CHÚNG TÔI" : "ABOUT US"}</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              {isVi
                ? <>Giúp doanh nghiệp Việt Nam <span className="text-gold-gradient">chinh phục thị trường toàn cầu</span></>
                : <>Helping Vietnamese businesses <span className="text-gold-gradient">conquer global markets</span></>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-6">
              {isVi
                ? "Gloyce được thành lập với một mục tiêu rõ ràng: loại bỏ những rào cản phức tạp khi doanh nghiệp Việt Nam muốn vươn ra thế giới. Chúng tôi không chỉ là nhà cung cấp dịch vụ — chúng tôi là đối tác chiến lược đồng hành từ ngày đầu thành lập đến khi doanh nghiệp vận hành ổn định xuyên biên giới."
                : "Gloyce was founded with a clear goal: removing the complex barriers for Vietnamese businesses looking to go global. We're not just a service provider — we're a strategic partner from day one of incorporation to full cross-border operations."}
            </p>
            <p className="text-ink-300 leading-relaxed">
              {isVi
                ? "Mô hình của Gloyce tập trung vào hành lang Việt Nam ↔ Mỹ trước, sau đó mở rộng sang Singapore và Hồng Kông. Chúng tôi tự vận hành đội kế toán và compliance in-house — không thuần môi giới — để đảm bảo chất lượng dịch vụ và biên lợi nhuận đủ để tái đầu tư vào sản phẩm."
                : "Gloyce's model focuses on the Vietnam ↔ US corridor first, then expands to Singapore and Hong Kong. We operate our own in-house accounting and compliance team — not pure brokerage — to ensure service quality and margins sufficient to reinvest in the product."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { n: "200+", label: isVi ? "Doanh nghiệp đã phục vụ" : "Businesses served" },
              { n: "3", label: isVi ? "Quốc gia hỗ trợ" : "Countries supported" },
              { n: "95%", label: isVi ? "Khách hàng giới thiệu" : "Customer referral rate" },
              { n: "2024", label: isVi ? "Năm thành lập" : "Year founded" },
            ].map(s => (
              <div key={s.label} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 text-center">
                <p className="text-4xl font-black text-gold mb-1">{s.n}</p>
                <p className="text-sm text-ink-300">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">{isVi ? "Giá trị cốt lõi" : "Our values"}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map(v => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="flex gap-4 bg-ink-800 border border-ink-600 rounded-2xl p-6">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                      <p className="text-sm text-ink-300 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-foreground text-xl mb-3">{isVi ? "Tham gia cùng chúng tôi" : "Join us"}</h2>
            <p className="text-ink-300 mb-5">{isVi ? "Gloyce đang tìm kiếm chuyên gia kế toán, compliance và business development." : "Gloyce is looking for accounting, compliance and business development experts."}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {isVi ? "Liên hệ với chúng tôi" : "Contact us"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
