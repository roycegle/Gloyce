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
  ClipboardList,
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
    { href: "/dashboard/requests" as const, icon: ClipboardList, label: t("requests") },
    { href: "/dashboard/documents" as const, icon: FileText, label: t("documents") },
    { href: "/dashboard/billing" as const, icon: CreditCard, label: t("billing") },
    { href: "/dashboard/settings" as const, icon: Settings, label: t("settings") },
  ];

  const userName = session?.user?.name || "Alex Chen";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    /* Hidden on mobile — bottom tab bar handles navigation there */
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-200",
        "border-r",
        collapsed ? "w-16" : "w-60"
      )}
      style={{ background: "#EBF0FF", borderColor: "#C5D3F5" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-4 h-16"
        style={{ borderBottom: "1px solid #C5D3F5" }}
      >
        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold" style={{ color: "#1E3A8A" }}>Gloyce</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? ""
                  : ""
              )}
              style={isActive
                ? { background: "#FFFFFF", color: "#1E3A8A", border: "1px solid #B8C9F5", boxShadow: "0 1px 3px rgba(30,58,138,0.08)" }
                : { color: "#4A5E9A", border: "1px solid transparent" }
              }
              onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLAnchorElement).style.color = "#1E3A8A"; } }}
              onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = ""; (e.currentTarget as HTMLAnchorElement).style.color = "#4A5E9A"; } }}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="shrink-0" size={18} />
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
      <div
        className="px-2 py-3 flex flex-col gap-2"
        style={{ borderTop: "1px solid #C5D3F5" }}
      >
        {!collapsed && <LanguageToggle className="mx-1" direction="up" />}

        {/* User info */}
        <div className={cn("flex items-center gap-3 px-2 py-2 rounded-lg", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold shrink-0">
            {userInitials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#1E3A8A" }}>{userName}</p>
              <p className="text-[10px] truncate" style={{ color: "#7B90C8" }}>
                {session?.user?.email}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
            collapsed ? "justify-center" : ""
          )}
          style={{ color: "#7B90C8" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7B90C8")}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center h-7 rounded-lg transition-colors mt-1"
          style={{ color: "#7B90C8" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D5E0FF")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
