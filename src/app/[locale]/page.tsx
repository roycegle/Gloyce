import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { ServicesOverview } from "@/components/marketing/ServicesOverview";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { CTASection } from "@/components/marketing/CTASection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  };
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
