"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, AlertCircle } from "lucide-react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/${locale}/dashboard`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t("error"));
    } else {
      const session = await getSession();
      const role = (session?.user as { role?: string })?.role;
      if (role === "admin") {
        router.push("/admin");
      } else {
        // Use preferred locale from cookie/localStorage, fall back to URL locale
        const preferredLocale =
          document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1] ||
          localStorage.getItem("gloyce_locale") ||
          locale;
        const validLocales = ["en", "vi", "zh", "es", "id"];
        const safeLocale = validLocales.includes(preferredLocale) ? preferredLocale : locale;
        const target = callbackUrl.startsWith(`/${locale}/`)
          ? callbackUrl.replace(`/${locale}/`, `/${safeLocale}/`)
          : `/${safeLocale}/dashboard`;
        router.push(target);
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-navy-900" />
          </div>
          <span className="text-lg font-bold text-foreground">Gloyce</span>
        </Link>
        <LanguageToggle />
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
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
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-navy-200">{t("password")}</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-gold hover:text-gold-light"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3 py-2 text-sm rounded-lg bg-navy-900 border border-navy-700 text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" isLoading={loading}>
              {t("submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-400">
            {t("noAccount")}{" "}
            <Link href="/auth/register" className="text-gold hover:text-gold-light font-medium">
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
