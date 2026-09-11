import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { getTranslations } from "next-intl/server";
import { TrendingUp, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WHEN_TO_USE = [
  "Bạn đang có doanh thu ổn định từ nhiều pháp nhân quốc tế và muốn tối ưu cấu trúc thuế.",
  "Bạn đang chuẩn bị gọi vốn từ nhà đầu tư nước ngoài và cần cấu trúc holding phù hợp.",
  "Bạn đang xem xét M&A (mua lại hoặc sáp nhập) với đối tác quốc tế.",
  "Bạn cần một CFO bán thời gian để điều hành tài chính và báo cáo cho ban lãnh đạo.",
  "Bạn muốn thiết lập chiến lược treasury tối ưu cho dòng tiền xuyên biên giới.",
];

export default async function StrategizePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.strategize" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(59,130,246,0.07)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <Badge variant="blue" className="text-xs tracking-widest">
                {t("name")}
              </Badge>
            </div>
            <SectionLabel>{t("tagline")}</SectionLabel>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Tư vấn chiến lược{" "}
              <span className="text-blue-400">cho giai đoạn tăng tốc</span>
            </h1>
            <p className="mt-5 text-lg text-navy-300 leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            <div className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-sm text-blue-300 max-w-fit">
              <Lock className="w-4 h-4" />
              Dịch vụ này chỉ mở cho doanh nghiệp đang trong gói OPERATE
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{t("price")}</p>
                <p className="text-xs text-navy-500 mt-0.5">Báo giá theo nhu cầu cụ thể</p>
              </div>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="gap-2 border border-blue-500/30 hover:border-blue-500/50">
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
          <h2 className="text-2xl font-bold text-foreground mb-8">Phạm vi dịch vụ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(t.raw("features") as string[]).map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-navy-800 border border-navy-700"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-navy-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to use */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>Dấu hiệu sẵn sàng</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-8">
            Khi nào nên dùng STRATEGIZE?
          </h2>
          <div className="max-w-3xl flex flex-col gap-3">
            {WHEN_TO_USE.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-navy-800 border border-navy-700"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-xs font-bold text-blue-400">
                  {i + 1}
                </div>
                <p className="text-sm text-navy-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-navy-800 to-navy-800 border border-blue-500/20 p-10 lg:p-16 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Sẵn sàng nói chuyện về chiến lược?
            </h2>
            <p className="text-navy-300 mb-8 max-w-xl mx-auto">
              Đặt lịch trao đổi 30 phút không cam kết với chuyên gia của Gloyce để đánh giá xem STRATEGIZE có phù hợp với bạn không.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2 border border-blue-500/30">
                Đặt lịch tư vấn <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
