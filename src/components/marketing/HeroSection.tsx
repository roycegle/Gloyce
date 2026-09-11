"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
  "Mercury Bank",
  "Stripe",
  "Wise",
  "PayPal",
];

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-navy-900">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            <SectionLabel>{t("label")}</SectionLabel>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground">{t("title")}</span>
              <br />
              <span className="text-gold">{t("titleAccent")}</span>
            </h1>

            <p className="text-lg text-navy-300 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/contact">
                <Button size="lg" className="gap-2 group">
                  {t("cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/services/execute">
                <Button variant="outline" size="lg">
                  {t("ctaSecondary")}
                </Button>
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-navy-900 bg-navy-700 flex items-center justify-center text-xs font-semibold text-navy-300"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-navy-400">{t("trust")}</p>
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative lg:block hidden">
            {/* Main card */}
            <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20">
                  <Building2 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Nguyen Trading LLC</p>
                  <p className="text-xs text-navy-400">Delaware, United States</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex flex-col gap-3">
                {[
                  { label: "LLC Registration", done: true },
                  { label: "EIN Obtained", done: true },
                  { label: "Bank Account Opened", done: true },
                  { label: "Stripe Connected", done: false, current: true },
                  { label: "Form 5472 Filed", done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        step.done
                          ? "bg-emerald-500"
                          : step.current
                          ? "border-2 border-gold bg-gold/10"
                          : "border border-navy-600 bg-navy-800"
                      }`}
                    >
                      {step.done && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      )}
                      {step.current && (
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        step.done
                          ? "text-navy-300 line-through"
                          : step.current
                          ? "text-foreground font-medium"
                          : "text-navy-500"
                      }`}
                    >
                      {step.label}
                    </span>
                    {step.current && (
                      <span className="ml-auto text-xs text-gold font-medium">In progress</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-5 pt-4 border-t border-navy-700 flex items-center justify-between">
                <p className="text-xs text-navy-500">Step 4 of 5</p>
                <div className="flex-1 mx-3 bg-navy-700 rounded-full h-1.5">
                  <div className="bg-gold h-1.5 rounded-full" style={{ width: "60%" }} />
                </div>
                <p className="text-xs text-gold font-semibold">60%</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 shadow-xl">
              <p className="text-xs text-navy-400">Thời gian</p>
              <p className="text-lg font-bold text-foreground">14 ngày</p>
              <p className="text-xs text-gold">Nhanh nhất thị trường</p>
            </div>
          </div>
        </div>

        {/* Trust logos bar */}
        <div className="mt-16 pt-8 border-t border-navy-800">
          <p className="text-xs font-semibold text-navy-500 uppercase tracking-widest mb-5">
            {t("trustPartners")}
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item}
                className="text-sm font-semibold text-navy-500 hover:text-navy-300 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
