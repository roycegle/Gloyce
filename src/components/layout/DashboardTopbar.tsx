"use client";

import { Globe } from "lucide-react";

export function DashboardTopbar() {
  return (
    /* Desktop: ẩn hoàn toàn — sidebar + page h2 đủ context
       Mobile: chỉ hiện brand vì sidebar bị ẩn */
    <header className="md:hidden h-12 flex items-center px-4 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gold rounded-md flex items-center justify-center">
          <Globe className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-sm text-foreground">Gloyce</span>
      </div>
    </header>
  );
}
