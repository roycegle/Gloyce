import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CTASection } from "@/components/marketing/CTASection";
import { getTranslations } from "next-intl/server";
import { Globe, Shield, Users, Lightbulb, Eye } from "lucide-react";

const VALUE_ICONS = {
  transparency: Eye,
  compliance: Shield,
  expertise: Lightbulb,
  partnership: Users,
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.06)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <SectionLabel>{t("hero.label")}</SectionLabel>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            {t("hero.title")}
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <SectionLabel>{t("mission.title")}</SectionLabel>
            </div>
            <p className="text-lg text-navy-300 leading-relaxed">{t("mission.body")}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel>{t("values.title")}</SectionLabel>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {(["transparency", "compliance", "expertise", "partnership"] as const).map((key) => {
              const Icon = VALUE_ICONS[key];
              return (
                <div
                  key={key}
                  className="flex gap-4 p-6 rounded-2xl bg-navy-800 border border-navy-700"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm text-navy-400 leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance commitment */}
      <section className="py-16 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <SectionLabel>{t("compliance.title")}</SectionLabel>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
              <p className="text-navy-300 leading-relaxed">{t("compliance.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel>Đội ngũ</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold text-foreground mb-4">
            Những người đứng sau Gloyce
          </h2>
          <p className="text-navy-400 mb-8 max-w-xl mx-auto">
            Đội ngũ của chúng tôi bao gồm các chuyên gia kế toán, luật sư và cố vấn tài chính với kinh nghiệm làm việc với doanh nghiệp Việt Nam tại Mỹ, Singapore và Hong Kong.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <div className="w-16 h-16 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center">
                  <Users className="w-7 h-7 text-navy-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-navy-400">Coming soon</p>
                </div>
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
