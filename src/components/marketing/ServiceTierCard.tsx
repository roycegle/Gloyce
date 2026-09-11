import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Building2, RefreshCw, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Tier = "execute" | "operate" | "strategize";

const ICONS = {
  execute: Building2,
  operate: RefreshCw,
  strategize: TrendingUp,
};

const STYLES = {
  execute: {
    border: "border-gold/20",
    iconBg: "bg-gold/10 border-gold/20",
    icon: "text-gold",
    badge: "gold" as const,
    cta: "/contact",
    buttonVariant: "outline" as const,
  },
  operate: {
    border: "border-gold ring-1 ring-gold/30",
    iconBg: "bg-gold/10 border-gold/20",
    icon: "text-gold",
    badge: "gold" as const,
    cta: "/contact",
    buttonVariant: "primary" as const,
  },
  strategize: {
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    icon: "text-blue-400",
    badge: "blue" as const,
    cta: "/contact",
    buttonVariant: "secondary" as const,
  },
};

interface ServiceTierCardProps {
  tier: Tier;
  className?: string;
}

export function ServiceTierCard({ tier, className }: ServiceTierCardProps) {
  const t = useTranslations(`services.${tier}`);
  const style = STYLES[tier];
  const Icon = ICONS[tier];
  const badge = t.has("badge") ? t("badge") : null;

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-navy-800 p-6 flex flex-col gap-5 transition-transform hover:-translate-y-1 duration-200",
        style.border,
        tier === "operate" && "shadow-xl shadow-gold/5",
        className
      )}
    >
      {/* Most popular badge */}
      {badge && (
        <div className="absolute -top-3 left-6">
          <Badge variant="gold" className="text-xs px-3 py-1">
            {badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0",
            style.iconBg
          )}
        >
          <Icon className={cn("w-6 h-6", style.icon)} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={style.badge} className="text-[10px] tracking-widest">
              {t("name")}
            </Badge>
          </div>
          <h3 className="mt-1 text-base font-semibold text-foreground leading-tight">
            {t("tagline")}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-navy-400 leading-relaxed">{t("description")}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {(t.raw("features") as string[]).map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-navy-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="mt-auto pt-5 border-t border-navy-700 flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-foreground">{t("price")}</p>
          {tier === "execute" && (
            <p className="text-xs text-navy-500 mt-0.5">
              {t("timeline")}
            </p>
          )}
        </div>
        <Link href={style.cta}>
          <Button variant={style.buttonVariant} size="sm">
            {t("cta")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
