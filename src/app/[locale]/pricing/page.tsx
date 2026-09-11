import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getTranslations } from "next-intl/server";
import { Building2, RefreshCw, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Có phải ký hợp đồng dài hạn không?",
    a: "Không. Dịch vụ OPERATE là đăng ký tháng, bạn có thể hủy bất kỳ lúc nào.",
  },
  {
    q: "Có phí ẩn nào không?",
    a: "Không. Tất cả chi phí được công khai trước khi bắt đầu. Phí nộp hồ sơ nhà nước (state filing fee) được tính riêng và thông báo trước.",
  },
  {
    q: "Tôi có thể dùng EXECUTE mà không cần OPERATE không?",
    a: "Có. EXECUTE là dịch vụ một lần. Tuy nhiên chúng tôi khuyến khích dùng OPERATE để duy trì tuân thủ và tránh rủi ro pháp lý sau này.",
  },
  {
    q: "Thanh toán bằng VNĐ hay USD?",
    a: "Gloyce nhận thanh toán bằng VNĐ qua chuyển khoản ngân hàng trong nước. Giá USD là giá tham chiếu, giá VNĐ cập nhật theo tỷ giá hàng tháng.",
  },
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const tServices = await getTranslations({ locale, namespace: "services" });

  const plans = [
    {
      key: "execute" as const,
      icon: Building2,
      iconClass: "text-gold",
      iconBg: "bg-gold/10 border-gold/20",
      border: "border-navy-700",
      name: t("execute.name"),
      price: t("execute.price"),
      period: t("execute.period"),
      description: t("execute.description"),
      features: tServices.raw("execute.features") as string[],
      cta: t("getStarted"),
      ctaHref: "/contact",
      ctaVariant: "outline" as const,
      badge: null,
    },
    {
      key: "operate" as const,
      icon: RefreshCw,
      iconClass: "text-gold",
      iconBg: "bg-gold/10 border-gold/20",
      border: "border-gold ring-1 ring-gold/30",
      name: t("operate.name"),
      price: t("operate.price"),
      period: t("operate.period"),
      description: t("operate.description"),
      features: tServices.raw("operate.features") as string[],
      cta: t("getStarted"),
      ctaHref: "/contact",
      ctaVariant: "primary" as const,
      badge: t("operate.badge"),
    },
    {
      key: "strategize" as const,
      icon: TrendingUp,
      iconClass: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      border: "border-blue-500/20",
      name: t("strategize.name"),
      price: t("strategize.price"),
      period: t("strategize.period"),
      description: t("strategize.description"),
      features: tServices.raw("strategize.features") as string[],
      cta: t("contactUs"),
      ctaHref: "/contact",
      ctaVariant: "secondary" as const,
      badge: null,
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Header */}
      <section className="pt-32 pb-12 bg-navy-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Bảng giá</SectionLabel>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-navy-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-10 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.key}
                  className={cn(
                    "relative rounded-2xl border bg-navy-800 p-6 flex flex-col gap-5",
                    plan.border,
                    plan.key === "operate" && "shadow-xl shadow-gold/5"
                  )}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="gold" className="text-xs px-3 py-1">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0", plan.iconBg)}>
                      <Icon className={cn("w-5 h-5", plan.iconClass)} />
                    </div>
                    <Badge variant={plan.key === "strategize" ? "blue" : "gold"} className="text-xs tracking-widest">
                      {plan.name}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    </div>
                    <p className="text-xs text-navy-500 mt-0.5">{plan.period}</p>
                    <p className="text-sm text-navy-400 mt-2">{plan.description}</p>
                  </div>

                  <div className="border-t border-navy-700 pt-4">
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
                      {t("includes")}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-navy-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={plan.ctaHref} className="mt-auto">
                    <Button variant={plan.ctaVariant} size="md" className="w-full gap-2">
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-navy-500 mt-8">{t("allPlansNote")}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-8">{t("faq.title")}</h2>
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="p-5 rounded-xl bg-navy-800 border border-navy-700">
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
