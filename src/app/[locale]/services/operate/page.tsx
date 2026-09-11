import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getTranslations } from "next-intl/server";
import { RefreshCw, CheckCircle2, ArrowRight, Calendar, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DELIVERABLES = [
  {
    icon: FileText,
    title: "Sổ sách kế toán hàng tháng",
    description: "Phân loại giao dịch, reconcile tài khoản, báo cáo tài chính tháng theo US GAAP.",
  },
  {
    icon: Calendar,
    title: "Khai thuế hàng năm",
    description: "Form 1120 (hoặc 1120-F nếu công ty nước ngoài), Form 5472 cho LLC thuộc sở hữu nước ngoài.",
  },
  {
    icon: RefreshCw,
    title: "Thuế ước tính hàng quý",
    description: "Tính và nhắc nhở nộp estimated tax payments vào tháng 4, 6, 9 và 1 năm sau.",
  },
  {
    icon: CheckCircle2,
    title: "Đăng ký ODI & Báo cáo hàng năm",
    description: "Hỗ trợ đăng ký ODI với NHNN Việt Nam và báo cáo hồi hương lợi nhuận đúng hạn.",
  },
];

const COMPLIANCE_CALENDAR = [
  { month: "Tháng 1", task: "Chuẩn bị hồ sơ thuế năm trước" },
  { month: "Tháng 3/15", task: "Deadline nộp thuế cho S-Corp/Partnership" },
  { month: "Tháng 4", task: "Nộp thuế ước tính Q1 (Q1 estimated tax)" },
  { month: "Tháng 4/15", task: "Deadline Form 1120 (có thể gia hạn đến 10/15)" },
  { month: "Tháng 6", task: "Nộp thuế ước tính Q2" },
  { month: "Tháng 9", task: "Nộp thuế ước tính Q3" },
  { month: "Tháng 10/15", task: "Deadline cuối sau gia hạn (Form 5472)" },
  { month: "Tháng 1 (năm sau)", task: "Nộp thuế ước tính Q4" },
];

export default async function OperatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.operate" });

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
                <RefreshCw className="w-6 h-6 text-gold" />
              </div>
              <Badge variant="gold" className="text-xs tracking-widest">
                {t("name")}
              </Badge>
              <Badge variant="gold" className="text-xs">
                {t("badge")}
              </Badge>
            </div>
            <SectionLabel>{t("tagline")}</SectionLabel>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Tuân thủ liên tục,{" "}
              <span className="text-gold">không lo deadline thuế</span>
            </h1>
            <p className="mt-5 text-lg text-navy-300 leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{t("price")}</p>
                <p className="text-xs text-navy-500 mt-0.5">Hủy bất kỳ lúc nào</p>
              </div>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  {t("cta")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Dịch vụ hàng tháng</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-8">
            Bạn nhận được gì mỗi tháng
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl bg-navy-800 border border-navy-700"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-navy-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Calendar */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Lịch tuân thủ</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-8">
            Gloyce theo dõi deadline thay bạn
          </h2>
          <div className="max-w-2xl grid sm:grid-cols-2 gap-3">
            {COMPLIANCE_CALENDAR.map((item) => (
              <div
                key={item.month}
                className="flex items-start gap-3 p-3 rounded-lg bg-navy-800 border border-navy-700"
              >
                <span className="text-xs font-bold text-gold shrink-0 w-24">
                  {item.month}
                </span>
                <span className="text-xs text-navy-300">{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Tất cả tính năng</h2>
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

      <CTASection />
      <Footer />
    </main>
  );
}
