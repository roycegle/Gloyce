"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { signOut, useSession } from "next-auth/react";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardSidebar() {
  const t = useTranslations("dashboard.nav");
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const NAV = [
    { href: "/dashboard" as const, icon: LayoutDashboard, label: t("overview") },
    { href: "/dashboard/services" as const, icon: Briefcase, label: t("services") },
    { href: "/dashboard/documents" as const, icon: FileText, label: t("documents") },
    { href: "/dashboard/messages" as const, icon: MessageSquare, label: t("messages"), badge: 2 },
    { href: "/dashboard/billing" as const, icon: CreditCard, label: t("billing") },
    { href: "/dashboard/settings" as const, icon: Settings, label: t("settings") },
  ];

  const userName = session?.user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-navy-950 border-r border-navy-800 transition-all duration-200 sticky top-0 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-navy-800 h-16">
        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-navy-900" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-foreground">Gloyce</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-navy-400 hover:text-foreground hover:bg-navy-800"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="gold" className="text-[10px] px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-3 border-t border-navy-800 flex flex-col gap-2">
        {!collapsed && <LanguageToggle className="mx-1" />}

        {/* User info */}
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg",
            collapsed ? "justify-center" : ""
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold shrink-0">
            {userInitials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{userName}</p>
              <p className="text-[10px] text-navy-500 truncate">{session?.user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/vi/auth/login" })}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-navy-500 hover:text-red-400 hover:bg-red-500/5 transition-colors",
            collapsed ? "justify-center" : ""
          )}
          title={collapsed ? "Đăng xuất" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Đăng xuất</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center h-7 rounded-lg text-navy-600 hover:text-navy-400 hover:bg-navy-800 transition-colors mt-1"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
