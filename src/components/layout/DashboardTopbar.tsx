"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Bell, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PATH_LABELS: Record<string, string> = {
  "/dashboard": "overview",
  "/dashboard/services": "services",
  "/dashboard/documents": "documents",
  "/dashboard/messages": "messages",
  "/dashboard/billing": "billing",
  "/dashboard/settings": "settings",
};

interface DashboardTopbarProps {
  onMenuClick?: () => void;
}

export function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  const titleKey = PATH_LABELS[pathname] || "overview";
  const title = t(`nav.${titleKey}` as Parameters<typeof t>[0]);

  return (
    <header className="h-16 border-b border-navy-700 bg-navy-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-1 text-navy-400 hover:text-foreground rounded-lg hover:bg-navy-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-navy-400 hover:text-foreground rounded-lg hover:bg-navy-700 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
        </button>
        <Badge variant="gold" className="text-xs hidden sm:flex">Demo</Badge>
      </div>
    </header>
  );
}
