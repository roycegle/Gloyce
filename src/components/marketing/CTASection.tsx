import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="py-20 lg:py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-gold/10 via-navy-800 to-navy-800 border border-gold/20 p-10 lg:p-16 overflow-hidden text-center">
          {/* Background shimmer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold/5 blur-3xl rounded-full" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-semibold mb-6">
              <Calendar className="w-4 h-4" />
              Tư vấn miễn phí 30 phút
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-navy-300 max-w-xl mx-auto mb-8">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="gap-2 group">
                  {t("button")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/services/execute">
                <Button variant="ghost" size="lg" className="text-navy-300">
                  Xem các gói dịch vụ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
