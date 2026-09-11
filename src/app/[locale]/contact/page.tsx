"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const INFO_ITEMS = [
    { icon: Mail, label: t("info.email") },
    { icon: Phone, label: t("info.phone") },
    { icon: MapPin, label: t("info.address") },
    { icon: Clock, label: t("info.hours") },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="pt-32 pb-20 bg-navy-900 relative overflow-hidden flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(245,158,11,0.06)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <SectionLabel>Liên hệ</SectionLabel>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-foreground">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-navy-400 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {INFO_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <p className="text-sm text-navy-300">{item.label}</p>
                  </div>
                );
              })}

              <div className="mt-4 p-5 rounded-xl bg-navy-800 border border-navy-700">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Tư vấn miễn phí 30 phút
                </p>
                <p className="text-xs text-navy-400 leading-relaxed">
                  Đặt lịch gọi video với chuyên gia Gloyce. Chúng tôi sẽ đánh giá tình huống cụ thể và đề xuất lộ trình phù hợp — không cam kết, không phí.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Cảm ơn bạn đã liên hệ!
                  </h3>
                  <p className="text-navy-400 max-w-sm">{t("form.success")}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-4"
                >
                  <h3 className="text-lg font-semibold text-foreground">{t("form.title")}</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={t("form.name")}
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <Input
                      label={t("form.email")}
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={t("form.phone")}
                      type="tel"
                      placeholder="+84 9xx xxx xxx"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <Input
                      label={t("form.company")}
                      placeholder="Công ty của bạn"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-navy-200">
                      {t("form.service")}
                    </label>
                    <select
                      className="w-full h-10 px-3 py-2 text-sm rounded-lg bg-navy-900 border border-navy-700 text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">-- Chọn dịch vụ --</option>
                      <option value="execute">{t("form.serviceOptions.execute")}</option>
                      <option value="operate">{t("form.serviceOptions.operate")}</option>
                      <option value="strategize">{t("form.serviceOptions.strategize")}</option>
                      <option value="unsure">{t("form.serviceOptions.unsure")}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-navy-200">
                      {t("form.message")}
                    </label>
                    <textarea
                      className="w-full px-3 py-2 text-sm rounded-lg bg-navy-900 border border-navy-700 text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold resize-none h-28"
                      placeholder="Mô tả ngắn về doanh nghiệp và nhu cầu của bạn..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" isLoading={loading} className="w-full">
                    {t("form.submit")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
