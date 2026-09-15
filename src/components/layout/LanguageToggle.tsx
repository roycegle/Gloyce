"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", short: "VI" },
  { code: "en", label: "English",    flag: "🇺🇸", short: "EN" },
  { code: "zh", label: "中文",        flag: "🇨🇳", short: "ZH" },
  { code: "es", label: "Español",    flag: "🇪🇸", short: "ES" },
  { code: "id", label: "Indonesia",  flag: "🇮🇩", short: "ID" },
] as const;

export function LanguageToggle({
  className,
  direction = "down",
}: {
  className?: string;
  direction?: "up" | "down";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    // Persist preference across sessions via cookie + localStorage
    document.cookie = `NEXT_LOCALE=${code}; max-age=31536000; path=/; SameSite=Lax`;
    localStorage.setItem("gloyce_locale", code);
    router.replace(pathname, { locale: code });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg w-full",
          "text-xs font-semibold tracking-wide",
          "border border-[#CDD8F8] text-ink-300 hover:text-foreground hover:border-gold/40",
          "transition-colors duration-150 select-none"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="flex-1 text-left">{current.short}</span>
        <ChevronDown
          size={12}
          className={cn("transition-transform duration-150 shrink-0", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 w-48 rounded-xl overflow-hidden shadow-xl z-50",
            direction === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          )}
          style={{ background: "#FFFFFF", border: "1px solid #CDD8F8" }}
          role="listbox"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => switchLocale(l.code)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left",
                l.code === locale
                  ? "bg-gold/8 text-gold font-semibold"
                  : "text-ink-300 hover:bg-ink-700 hover:text-foreground"
              )}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {l.code === locale && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
