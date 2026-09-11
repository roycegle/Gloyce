import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-navy-900" />
              </div>
              <span className="text-xl font-bold text-foreground">Gloyce</span>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t("servicesTitle")}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: tNav("servicesExecute"), href: "/services/execute" },
                { label: tNav("servicesOperate"), href: "/services/operate" },
                { label: tNav("servicesStrategize"), href: "/services/strategize" },
                { label: tNav("pricing"), href: "/pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-400 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t("companyTitle")}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("companyLinks.about"), href: "/about" },
                { label: t("companyLinks.blog"), href: "/blog" },
                { label: t("companyLinks.contact"), href: "/contact" },
                { label: t("companyLinks.careers"), href: "/careers" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-400 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              {t("legalTitle")}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("privacyPolicy"), href: "/privacy" },
                { label: t("termsOfService"), href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-400 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 mt-10 pt-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <p className="text-xs text-navy-500 max-w-xl">{t("complianceNote")}</p>
          <p className="text-xs text-navy-500 shrink-0">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
