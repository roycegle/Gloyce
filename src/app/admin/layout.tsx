"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Users, Briefcase,
  Globe, LogOut, Menu, X, ChevronRight, FileText, UserCog, ClipboardList, ChevronDown,
} from "lucide-react";
import { Toaster } from "sonner";
import { getAdminMessages } from "@/lib/admin-i18n";

const LOCALES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
] as const;

function AdminLanguageToggle({ locale, onChange }: { locale: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-ink-600 text-ink-400 hover:text-foreground hover:border-gold/40 transition-colors"
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown size={11} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl overflow-hidden shadow-xl z-50 bg-white border border-ink-600">
          {LOCALES.map(l => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors ${l.code === locale ? "bg-gold/8 text-gold font-semibold" : "text-ink-300 hover:bg-ink-700 hover:text-foreground"}`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === locale && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("gloyce_locale") || "en";
    setLocale(saved);
  }, []);

  useEffect(() => {
    fetch("/api/admin/requests?status=pending")
      .then(r => r.json())
      .then(d => setPendingRequests(Array.isArray(d) ? d.length : 0))
      .catch(() => {});
  }, [pathname]);

  const changeLocale = (code: string) => {
    setLocale(code);
    localStorage.setItem("gloyce_locale", code);
    document.cookie = `NEXT_LOCALE=${code}; max-age=31536000; path=/; SameSite=Lax`;
  };

  const m = getAdminMessages(locale);

  const NAV = [
    { href: "/admin", icon: LayoutDashboard, label: m.nav.dashboard, badge: false },
    { href: "/admin/customers", icon: Users, label: m.nav.customers, badge: false },
    { href: "/admin/requests", icon: ClipboardList, label: m.nav.requests, badge: true },
    { href: "/admin/services", icon: Briefcase, label: m.nav.services, badge: false },
    { href: "/admin/forms", icon: FileText, label: m.nav.forms, badge: false },
    { href: "/admin/staff", icon: UserCog, label: m.nav.staff, badge: false },
  ];

  return (
    <div className="flex h-screen bg-ink-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 flex flex-col w-60 transition-transform duration-200 md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `} style={{ background: "#EBF0FF", borderRight: "1px solid #C5D3F5" }}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 h-16" style={{ borderBottom: "1px solid #C5D3F5" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#1E3A8A" }}>Gloyce</p>
              <p className="text-[10px] text-amber-500 font-medium">Admin</p>
            </div>
          </div>
          <button className="md:hidden" style={{ color: "#7B90C8" }} onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
          {NAV.map(({ href, icon: Icon, label, badge }) => {
            const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            const badgeCount = badge ? pendingRequests : 0;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "#FFFFFF" : "transparent",
                  color: isActive ? "#1E3A8A" : "#4A5E9A",
                  border: isActive ? "1px solid #B8C9F5" : "1px solid transparent",
                  boxShadow: isActive ? "0 1px 3px rgba(30,58,138,0.08)" : "none",
                }}
                onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLAnchorElement).style.color = "#1E3A8A"; } }}
                onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#4A5E9A"; } }}
              >
                <Icon size={18} />
                <span>{label}</span>
                {badgeCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white min-w-[18px] text-center">
                    {badgeCount}
                  </span>
                )}
                {isActive && badgeCount === 0 && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-2 py-3" style={{ borderTop: "1px solid #C5D3F5" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full transition-colors"
            style={{ color: "#7B90C8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7B90C8")}
          >
            <LogOut size={16} />
            <span>{m.common.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 flex items-center gap-4 px-6 shrink-0 bg-ink-800 border-b border-ink-600">
          <button className="md:hidden text-ink-400" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-semibold text-ink-400">{m.topbar.title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <AdminLanguageToggle locale={locale} onChange={changeLocale} />
            <Link href="/en/dashboard" className="text-xs text-gold hover:text-gold-light">
              ← {m.topbar.viewAsCustomer}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
}
