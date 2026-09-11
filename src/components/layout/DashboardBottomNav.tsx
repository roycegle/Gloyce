"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard" as const, icon: LayoutDashboard, key: "overview", badge: 0 },
  { href: "/dashboard/services" as const, icon: Briefcase, key: "services", badge: 0 },
  { href: "/dashboard/documents" as const, icon: FileText, key: "documents", badge: 0 },
  { href: "/dashboard/messages" as const, icon: MessageSquare, key: "messages", badge: 2 },
  { href: "/dashboard/billing" as const, icon: CreditCard, key: "billing", badge: 0 },
  { href: "/dashboard/settings" as const, icon: Settings, key: "settings", badge: 0 },
];

export function DashboardBottomNav() {
  const t = useTranslations("dashboard.nav");
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t border-[#111840]"
      style={{ background: "#060C30" }}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, key, badge }) => {
        const isActive =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 relative transition-colors",
              isActive ? "text-gold" : "text-[#4A5A88]"
            )}
          >
            {/* Active indicator pill */}
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full" />
            )}

            <div className="relative">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              {badge > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-gold rounded-full text-[9px] font-bold text-[#060C30] flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>

            <span
              className={cn(
                "text-[9px] font-medium tracking-wide leading-none",
                isActive ? "text-gold" : "text-[#4A5A88]"
              )}
            >
              {t(key as Parameters<typeof t>[0])}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
