"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, CheckCircle2 } from "lucide-react";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Tài khoản đã được tạo!</h2>
              <p className="text-navy-400 text-sm mb-6">
                Chúng tôi sẽ liên hệ trong vòng 1 ngày làm việc để xác minh và kích hoạt tài khoản.
              </p>
              <Link href="/auth/login">
                <Button variant="outline" size="md">
                  {t("login")}
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
                  label={t("name")}
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label={t("company")}
                  placeholder="Tên công ty"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <Input
                  label={t("email")}
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  label={t("phone")}
                  type="tel"
                  placeholder="+84 9xx xxx xxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label={t("password")}
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <Input
                  label={t("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  error={
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "Mật khẩu không khớp"
                      : undefined
                  }
                  required
                />

                <label className="flex items-start gap-2.5 text-sm text-navy-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                    className="mt-0.5 accent-gold"
                    required
                  />
                  <span>{t("terms")}</span>
                </label>

                <Button type="submit" size="lg" className="w-full" isLoading={loading}>
                  {t("submit")}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-navy-400">
                {t("hasAccount")}{" "}
                <Link href="/auth/login" className="text-gold hover:text-gold-light font-medium">
                  {t("login")}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
