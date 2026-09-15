"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { signOut, useSession } from "next-auth/react";
import { LanguageToggle } from "./LanguageToggle";
import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard" as const, icon: LayoutDashboard, key: "overview" },
  { href: "/dashboard/services" as const, icon: Briefcase, key: "services" },
  { href: "/dashboard/billing" as const, icon: CreditCard, key: "billing" },
  { href: "/dashboard/settings" as const, icon: Settings, key: "settings" },
];

export function DashboardBottomNav() {
  const t = useTranslations("dashboard.nav");
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "User";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#111840]"
      style={{ background: "#060C30" }}
    >
      <div className="flex items-stretch">
        {/* Nav tabs */}
        <div className="flex flex-1">
          {NAV_ITEMS.map(({ href, icon: Icon, key }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 relative transition-colors"
                style={{ color: isActive ? "#B87C10" : "#9BAED0" }}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold rounded-full" />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[9px] font-medium tracking-wide leading-none hidden sm:block">
                  {t(key as Parameters<typeof t>[0])}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right side: language + user — desktop only */}
        <div className="hidden md:flex items-center gap-3 px-4 border-l border-[#111840]">
          <LanguageToggle direction="up" className="w-28" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate max-w-[120px]">{userName}</p>
              <p className="text-[10px] truncate max-w-[120px]" style={{ color: "#8B9EC7" }}>
                {session?.user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#8B9EC7" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8B9EC7")}
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
