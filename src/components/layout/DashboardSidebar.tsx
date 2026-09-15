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
  CreditCard,
  Settings,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function DashboardSidebar() {
  const t = useTranslations("dashboard.nav");
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved) setCollapsed(saved === "true");
    } catch {}
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem("sidebar-collapsed", String(next)); } catch {}
  };

  const NAV = [
    { href: "/dashboard" as const,          icon: LayoutDashboard, label: t("overview") },
    { href: "/dashboard/services" as const,  icon: Briefcase,       label: t("services") },
    { href: "/dashboard/billing" as const,   icon: CreditCard,      label: t("billing")  },
    { href: "/dashboard/settings" as const,  icon: Settings,        label: t("settings") },
  ];

  const userName = session?.user?.name || "";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
      style={{ background: "#EBF0FF", boxShadow: "2px 0 12px rgba(30,58,138,0.07)" }}
    >
      {/* Logo */}
      <div
        className={cn("flex items-center h-14 px-4", collapsed ? "justify-center" : "gap-2.5")}
        style={{ borderBottom: "1px solid #D3DDF7" }}
      >
        <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center shrink-0">
          <Globe className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold tracking-tight" style={{ color: "#1E3A8A" }}>Gloyce</span>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                collapsed ? "justify-center" : ""
              )}
              style={
                isActive
                  ? { background: "#FFFFFF", color: "#1E3A8A", boxShadow: "0 1px 2px rgba(30,58,138,0.06)" }
                  : { color: "#4A5E9A" }
              }
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.55)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "";
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="shrink-0" size={16} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="px-2 py-3 flex flex-col gap-1.5"
        style={{ borderTop: "1px solid #D3DDF7" }}
      >
        {!collapsed && <LanguageToggle className="mx-1 mb-0.5" direction="up" />}

        {/* User row */}
        <div className={cn("flex items-center gap-2.5 px-2 py-2 rounded-lg", collapsed ? "justify-center" : "")}>
          <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[11px] font-bold text-gold shrink-0">
            {userInitials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate leading-tight" style={{ color: "#1E3A8A" }}>{userName}</p>
              <p className="text-[10px] truncate" style={{ color: "#8FA0CC" }}>{session?.user?.email}</p>
            </div>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all",
            collapsed ? "justify-center" : ""
          )}
          style={{ color: "#8FA0CC" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f87171"; (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8FA0CC"; (e.currentTarget as HTMLElement).style.background = ""; }}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut size={14} />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center h-6 rounded-lg transition-all mt-0.5"
          style={{ color: "#A0B0D8" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#D5E0FF"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>
    </aside>
  );
}
