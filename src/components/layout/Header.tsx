"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    {
      label: t("services"),
      href: "/services/execute",
      children: [
        { label: t("servicesExecute"), href: "/services/execute" },
        { label: t("servicesOperate"), href: "/services/operate" },
        { label: t("servicesStrategize"), href: "/services/strategize" },
      ],
    },
    { label: t("pricing"), href: "/pricing" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md border-b border-navy-800 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center group-hover:bg-gold-dark transition-colors">
              <Globe className="w-5 h-5 text-navy-900" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Gloyce
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-navy-300 hover:text-foreground rounded-lg hover:bg-navy-800/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                {t("login")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm">{t("getStarted")}</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-navy-300 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-800">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-navy-300 hover:text-foreground rounded-lg hover:bg-navy-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-navy-800 mt-2 pt-3 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="md" className="w-full">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <Button size="md" className="w-full">
                  {t("getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
