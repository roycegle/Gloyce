"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ArrowLeft, CheckCircle2 } from "lucide-react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-navy-900" />
          </div>
          <span className="text-lg font-bold text-foreground">Gloyce</span>
        </Link>
        <LanguageToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{t("successTitle")}</h2>
              <p className="text-navy-400 text-sm mb-6">{t("success")}</p>
              <Link href="/auth/login">
                <Button variant="outline" size="md" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t("back")}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
                <p className="text-navy-400 text-sm mt-1">{t("subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label={t("email")}
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="lg" className="w-full" isLoading={loading}>
                  {t("submit")}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-navy-400 hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("back")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
