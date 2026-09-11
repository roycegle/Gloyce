import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ServiceTierCard } from "./ServiceTierCard";

export function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="py-20 lg:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Dịch vụ</SectionLabel>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-3 text-navy-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <ServiceTierCard tier="execute" />
          <ServiceTierCard tier="operate" />
          <ServiceTierCard tier="strategize" />
        </div>
      </div>
    </section>
  );
}
