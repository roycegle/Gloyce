"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
        "text-xs font-semibold tracking-wider",
        "border border-navy-700 text-navy-300 hover:text-foreground hover:border-navy-600",
        "transition-colors duration-150",
        className
      )}
      aria-label="Toggle language"
    >
      <span className={locale === "vi" ? "text-gold" : "text-navy-400"}>VI</span>
      <span className="text-navy-600">/</span>
      <span className={locale === "en" ? "text-gold" : "text-navy-400"}>EN</span>
    </button>
  );
}
