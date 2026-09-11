import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getTranslations } from "next-intl/server";
import { Building2, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Tư vấn & Thu thập thông tin",
    description: "Chuyên viên Gloyce tư vấn chọn bang phù hợp (Delaware/Wyoming) và thu thập hồ sơ cần thiết từ bạn.",
    days: "Ngày 1–2",
  },
  {
    step: 2,
    title: "Nộp hồ sơ thành lập LLC",
    description: "Gloyce nộp Articles of Organization và đăng ký Registered Agent tại bang bạn chọn.",
    days: "Ngày 3–7",
  },
  {
    step: 3,
    title: "Xin EIN từ IRS",
    description: "Sau khi LLC được phê duyệt, Gloyce xin Employer Identification Number từ IRS thay mặt bạn.",
    days: "Ngày 8–12",
  },
  {
    step: 4,
    title: "Mở tài khoản ngân hàng",
    description: "Hỗ trợ mở tài khoản Mercury hoặc Relay — hai ngân hàng thân thiện với non-US resident nhất.",
    days: "Ngày 13–17",
  },
  {
    step: 5,
    title: "Kết nối Payment Gateway",
    description: "Cài đặt Stripe hoặc PayPal Business, kết nối vào tài khoản ngân hàng vừa mở.",
    days: "Ngày 18–21",
  },
];

const FAQ = [
  {
    q: "Tôi có cần ở Mỹ để mở LLC không?",
    a: "Không. Công dân và cư dân của hầu hết quốc gia đều có thể mở LLC tại Mỹ mà không cần có mặt trực tiếp.",
  },
  {
    q: "Delaware hay Wyoming — chọn bang nào?",
    a: "Delaware phù hợp nếu bạn có kế hoạch gọi vốn VC. Wyoming phù hợp cho SME vì phí hàng năm thấp hơn và không có thuế thu nhập bang.",
  },
  {
    q: "Có cần khai thuế Mỹ không?",
    a: "LLC một thành viên (single-member) thuộc sở hữu nước ngoài phải nộp Form 5472 hàng năm. Gloyce hỗ trợ khai báo này trong dịch vụ OPERATE.",
  },
  {
    q: "ODI — tôi có phải đăng ký với NHNN không?",
    a: "Theo quy định Việt Nam, việc thành lập công ty ở nước ngoài được coi là đầu tư ra nước ngoài và về nguyên tắc cần đăng ký ODI. Gloyce tư vấn và hỗ trợ thủ tục này trong gói OPERATE.",
  },
];

export default async function ExecutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.execute" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(245,158,11,0.07)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <Badge variant="gold" className="text-xs tracking-widest">
                {t("name")}
              </Badge>
            </div>
            <SectionLabel>{t("tagline")}</SectionLabel>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Thành lập công ty tại Mỹ{" "}
              <span className="text-gold">trong 14–21 ngày</span>
            </h1>
            <p className="mt-5 text-lg text-navy-300 leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-navy-400">
                <Clock className="w-4 h-4 text-gold" />
                {t("timeline")}
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tuân thủ ODI Việt Nam
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <p className="text-2xl font-bold text-foreground">{t("price")}</p>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  {t("cta")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Bao gồm trong gói</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(t.raw("features") as string[]).map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-navy-800 border border-navy-700"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Quy trình</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-10">
            Từng bước từ A đến Z
          </h2>
          <div className="flex flex-col gap-6 max-w-3xl">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gold text-navy-900 flex items-center justify-center text-sm font-bold shrink-0">
                    {step.step}
                  </div>
                  {step.step < PROCESS_STEPS.length && (
                    <div className="w-px flex-1 bg-navy-700 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <Badge variant="outline" className="text-xs text-navy-400">
                      {step.days}
                    </Badge>
                  </div>
                  <p className="text-sm text-navy-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-8">
            Câu hỏi thường gặp
          </h2>
          <div className="max-w-3xl flex flex-col gap-5">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="p-5 rounded-xl bg-navy-800 border border-navy-700"
              >
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p className="text-sm text-navy-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
