"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Globe } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

export function DashboardTopbar() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard.nav");

  const userName = session?.user?.name || "";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-navy-800/80">
      {/* Mobile: show brand since sidebar is hidden */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center">
          <Globe className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-sm text-foreground">Gloyce</span>
      </div>

      {/* Desktop: empty left so content title leads the page */}
      <div className="hidden md:block" />

      {/* Right: language + user avatar */}
      <div className="flex items-center gap-3">
        <LanguageToggle direction="down" />
        <div
          className="w-8 h-8 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-xs font-bold text-gold shrink-0 select-none"
          title={userName || session?.user?.email || ""}
        >
          {userInitials}
        </div>
      </div>
    </header>
  );
}
