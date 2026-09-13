"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Users, Briefcase, MessageSquare,
  Globe, LogOut, Menu, X, ChevronRight, FileText, UserCog,
} from "lucide-react";
import { Toaster } from "sonner";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/services", icon: Briefcase, label: "Services" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/forms", icon: FileText, label: "Forms" },
  { href: "/admin/staff", icon: UserCog, label: "Staff" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      `} style={{ background: "#060C30", borderRight: "1px solid #111840" }}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 h-16" style={{ borderBottom: "1px solid #111840" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Gloyce</p>
              <p className="text-[10px] text-amber-400 font-medium">Admin</p>
            </div>
          </div>
          <button className="md:hidden text-navy-500" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
          {NAV.map(({ href, icon: Icon, label }) => {
            const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "rgba(245,158,11,0.12)" : "transparent",
                  color: isActive ? "#F59E0B" : "#6B7BA4",
                  border: isActive ? "1px solid rgba(245,158,11,0.2)" : "1px solid transparent",
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-2 py-3" style={{ borderTop: "1px solid #111840" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/en/auth/login" })}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full transition-colors"
            style={{ color: "#4A5A88" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4A5A88")}
          >
            <LogOut size={16} />
            <span>Sign out</span>
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
          <h1 className="text-sm font-semibold text-ink-400">Gloyce Admin Panel</h1>
          <Link href="/en/dashboard" className="ml-auto text-xs text-gold hover:text-gold-light">
            ← View as customer
          </Link>
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
