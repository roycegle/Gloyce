"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";
import { LanguageToggle } from "./LanguageToggle";

const PATH_LABELS: Record<string, string> = {
  "/dashboard": "companies",
  "/dashboard/billing": "billing",
  "/dashboard/settings": "settings",
};

export function DashboardTopbar() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  const titleKey = pathname.startsWith("/dashboard/companies")
    ? "companies"
    : PATH_LABELS[pathname] || "companies";
  const title = t(`nav.${titleKey}` as Parameters<typeof t>[0]);

  return (
    <header className="h-14 md:h-16 border-b border-navy-700 bg-navy-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      <h1 className="text-base font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Language toggle — mobile only (desktop has it in sidebar) */}
        <div className="md:hidden">
          <LanguageToggle direction="down" />
        </div>

        <Badge variant="gold" className="text-xs hidden sm:flex">Demo</Badge>

        {/* Logout — visible on mobile, hidden on desktop */}
        <button
          onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
          className="md:hidden p-2 text-navy-400 hover:text-red-400 rounded-lg hover:bg-navy-700 transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
