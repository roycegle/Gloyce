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
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ mobileOpen = false, onMobileClose }: DashboardSidebarProps) {
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

  const userName = session?.user?.name || "Alex Chen";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sidebarContent = (isMobile = false) => (
    <aside
      className={cn(
        "flex flex-col h-full transition-all duration-200",
        /* Dark sidebar surface */
        "bg-[#060C30] border-r border-[#111840]",
        !isMobile && (collapsed ? "w-16" : "w-60")
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#111840] h-16">
        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-[#060C30]" />
        </div>
        {(!collapsed || isMobile) && (
          <span className="text-base font-bold text-white">Gloyce</span>
        )}
        {isMobile && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1.5 text-[#6B7BA4] hover:text-white rounded-lg hover:bg-[#0F1840] transition-colors"
          >
            <X size={18} />
          </button>
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
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-gold/15 text-gold border border-gold/25"
                  : "text-[#6B7BA4] hover:text-[#C4D0F0] hover:bg-[#0F1840]"
              )}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <Icon className="shrink-0" size={18} />
              {(!collapsed || isMobile) && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="gold" className="text-[10px] px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
              {collapsed && !isMobile && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-3 border-t border-[#111840] flex flex-col gap-2">
        {(!collapsed || isMobile) && <LanguageToggle className="mx-1" />}

        {/* User info */}
        <div className={cn("flex items-center gap-3 px-2 py-2 rounded-lg", collapsed && !isMobile ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold shrink-0">
            {userInitials}
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-[#4A5A88] truncate">{session?.user?.email}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/vi/auth/login" })}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#4A5A88] hover:text-red-400 hover:bg-red-500/5 transition-colors",
            collapsed && !isMobile ? "justify-center" : ""
          )}
          title={collapsed && !isMobile ? "Sign out" : undefined}
        >
          <LogOut size={16} />
          {(!collapsed || isMobile) && <span>Sign out</span>}
        </button>

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={toggleCollapsed}
            className="flex items-center justify-center h-7 rounded-lg text-[#3A4A6A] hover:text-[#6B7BA4] hover:bg-[#0F1840] transition-colors mt-1"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:flex h-screen shrink-0 sticky top-0">
        {sidebarContent(false)}
      </div>

      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 md:hidden flex flex-col h-full">
            {sidebarContent(true)}
          </div>
        </>
      )}
    </>
  );
}
