"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronRight, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  type: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  price?: number;
  currency?: string;
  notes?: string;
  created_at: string;
}

export default function DashboardPage() {
  const t = useTranslations("dashboard.companies");
  const tov = useTranslations("dashboard.overview");
  const locale = useLocale();
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/services")
      .then(r => r.json())
      .then(d => { setServices(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-foreground">
          {userName ? tov("greeting", { name: userName }) : tov("greetingGeneric")} 👋
        </h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("subtitle")}</p>
      </div>

      {/* Companies grid */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t("myCompanies")}</h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-navy-800 rounded-2xl border border-navy-700 h-48 animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Briefcase size={24} className="text-gold" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground mb-1">{t("noCompaniesTitle")}</p>
              <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">{t("noCompaniesDesc")}</p>
            </div>
            <Link href="/get-started"
              className="mt-1 px-5 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors flex items-center gap-2">
              <Plus size={14} /> {t("addCompany")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => {
              const pct = service.total_steps > 0
                ? Math.round((service.current_step / service.total_steps) * 100)
                : 0;
              const isComplete = service.status === "complete" || service.status === "completed";
              const needsAction = !!service.notes;

              return (
                <Link
                  key={service.id}
                  href={`/dashboard/companies/${service.id}` as Parameters<typeof Link>[0]["href"]}
                  className="bg-navy-800 rounded-2xl border border-navy-700 p-5 flex flex-col gap-4 hover:border-navy-500 transition-all group cursor-pointer"
                >
                  {/* Type badge + status icon */}
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="gold" className="text-[10px] tracking-widest shrink-0">
                      {service.type.replace(/_/g, " ").toUpperCase()}
                    </Badge>
                    {needsAction ? (
                      <span className="text-xs text-amber-400 flex items-center gap-1 shrink-0">
                        <AlertCircle size={11} /> {t("actionNeeded")}
                      </span>
                    ) : isComplete ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1 shrink-0">
                        <CheckCircle2 size={11} /> {t("done")}
                      </span>
                    ) : (
                      <span className="text-xs text-navy-400 flex items-center gap-1 shrink-0">
                        <Clock size={11} /> {t("inProgress")}
                      </span>
                    )}
                  </div>

                  {/* Company name + date */}
                  <div className="flex-1 min-h-0">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors leading-snug line-clamp-2">
                      {service.name}
                    </h4>
                    <p className="text-xs text-navy-500 mt-1">
                      {new Date(service.created_at).toLocaleDateString(locale, { month: "short", year: "numeric" })}
                      {service.price ? ` · $${service.price.toLocaleString()} ${service.currency || "USD"}` : ""}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-navy-500">
                        {t("step", { current: service.current_step, total: service.total_steps })}
                      </span>
                      <span className={`text-xs font-semibold ${isComplete ? "text-emerald-400" : "text-gold"}`}>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${isComplete ? "bg-emerald-400" : "bg-gold"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-navy-700/60">
                    <span className="text-xs text-navy-500 group-hover:text-navy-300 transition-colors">
                      {t("viewDetails")}
                    </span>
                    <ChevronRight size={14} className="text-navy-500 group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              );
            })}

            {/* Add new company card */}
            <Link
              href="/get-started"
              className="bg-navy-800 rounded-2xl border-2 border-dashed border-navy-600 p-5 flex flex-col items-center justify-center gap-3 min-h-[11rem] hover:border-gold/40 hover:bg-navy-750 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-navy-700 border border-navy-600 flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all">
                <Plus size={20} className="text-navy-400 group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sm text-navy-500 group-hover:text-gold transition-colors text-center font-medium">
                {t("addCompany")}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
