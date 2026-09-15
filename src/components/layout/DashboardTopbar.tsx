"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { LogOut, Menu, X, LayoutDashboard, Briefcase, CreditCard, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { LanguageToggle } from "./LanguageToggle";

const PATH_LABELS: Record<string, string> = {
  "/dashboard": "overview",
  "/dashboard/services": "services",
  "/dashboard/billing": "billing",
  "/dashboard/settings": "settings",
};

export function DashboardTopbar() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const titleKey = PATH_LABELS[pathname] || "overview";
  const title = t(`nav.${titleKey}` as Parameters<typeof t>[0]);

  const NAV = [
    { href: "/dashboard" as const, icon: LayoutDashboard, label: t("nav.overview") },
    { href: "/dashboard/services" as const, icon: Briefcase, label: t("nav.services") },
    { href: "/dashboard/billing" as const, icon: CreditCard, label: t("nav.billing") },
    { href: "/dashboard/settings" as const, icon: Settings, label: t("nav.settings") },
  ];

  return (
    <>
      <header className="h-14 md:h-16 border-b border-[#C5D3F5] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shrink-0"
        style={{ background: "#EBF0FF" }}>
        <h1 className="text-base font-semibold" style={{ color: "#1E3A8A" }}>{title}</h1>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <LanguageToggle direction="down" />
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenu(true)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#4A5E9A" }}
          >
            <Menu size={20} />
          </button>

          {/* Logout — desktop only (sidebar handles it) */}
          <button
            onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
            className="hidden md:flex p-2 rounded-lg transition-colors"
            style={{ color: "#7B90C8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7B90C8")}
            title="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 flex flex-col shadow-2xl"
            style={{ background: "#EBF0FF" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 shrink-0"
              style={{ borderBottom: "1px solid #C5D3F5" }}>
              <span className="font-bold text-base" style={{ color: "#1E3A8A" }}>Gloyce</span>
              <button onClick={() => setMobileMenu(false)} className="p-1.5 rounded-lg"
                style={{ color: "#7B90C8" }}>
                <X size={18} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    style={isActive
                      ? { background: "#FFFFFF", color: "#1E3A8A", border: "1px solid #B8C9F5" }
                      : { color: "#4A5E9A", border: "1px solid transparent" }
                    }
                  >
                    <Icon size={18} className="shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom: language + logout */}
            <div className="px-2 py-3 flex flex-col gap-2" style={{ borderTop: "1px solid #C5D3F5" }}>
              <LanguageToggle className="mx-1" direction="up" />
              <button
                onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: "#7B90C8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7B90C8")}
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
