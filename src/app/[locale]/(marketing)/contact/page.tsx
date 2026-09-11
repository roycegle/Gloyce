"use client";

import { useState } from "react";
import { Mail, MapPin, Calendar, MessageSquare, Check } from "lucide-react";

const SERVICES = [
  { vi: "LLC tại Mỹ", en: "US LLC" },
  { vi: "Singapore Pte Ltd", en: "Singapore Pte Ltd" },
  { vi: "Hong Kong Limited", en: "Hong Kong Limited" },
  { vi: "Mở tài khoản ngân hàng", en: "Business bank account" },
  { vi: "Dịch vụ kế toán", en: "Accounting services" },
  { vi: "Khai báo thuế & Báo cáo", en: "US Tax Filing & Reporting" },
  { vi: "Chuyển tiền quốc tế", en: "International transfers" },
  { vi: "Khác", en: "Other" },
];

export default function ContactPage() {
  const [tab, setTab] = useState<"form" | "call">("form");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const isVi = typeof window !== "undefined" ? window.location.pathname.startsWith("/vi") : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {isVi ? "Cảm ơn bạn!" : "Thank you!"}
          </h2>
          <p className="text-ink-300">
            {isVi ? "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ trong vòng 24 giờ làm việc." : "We received your request and will contact you within 24 business hours."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.07)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-3 gap-12">
          {/* Left info */}
          <div className="lg:col-span-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{isVi ? "LIÊN HỆ" : "CONTACT"}</p>
            <h1 className="text-3xl font-bold text-foreground mb-4">{isVi ? "Chúng tôi sẵn sàng hỗ trợ bạn" : "We're ready to help"}</h1>
            <p className="text-ink-300 leading-relaxed mb-8">{isVi ? "Đặt lịch tư vấn miễn phí hoặc gửi yêu cầu — đội ngũ Gloyce sẽ liên hệ trong vòng 24 giờ làm việc." : "Book a free consultation or send a request — the Gloyce team will contact you within 24 business hours."}</p>
            <div className="space-y-4 mb-8">
              <a href="mailto:hello@gloyce.co" className="flex items-center gap-3 text-ink-300 hover:text-foreground transition-colors">
                <div className="w-9 h-9 rounded-xl bg-ink-800 border border-ink-600 flex items-center justify-center shrink-0"><Mail size={15} className="text-gold" /></div>
                hello@gloyce.co
              </a>
              <div className="flex items-start gap-3 text-ink-300">
                <div className="w-9 h-9 rounded-xl bg-ink-800 border border-ink-600 flex items-center justify-center shrink-0"><MapPin size={15} className="text-gold" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-0.5">Gloyce LLC</p>
                  <p className="text-sm leading-relaxed">3000 Marketplace<br />Irvine, CA 92602<br />United States</p>
                </div>
              </div>
            </div>
            <div className="bg-ink-800 border border-gold/20 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-gold mb-1">{isVi ? "Giờ làm việc" : "Business hours"}</p>
              <p className="text-sm text-ink-300">{isVi ? "Thứ 2 – Thứ 6: 9:00 – 18:00 (PST)" : "Mon – Fri: 9:00 AM – 6:00 PM (PST)"}</p>
              <p className="text-xs text-ink-500">{isVi ? "Hỗ trợ tiếng Việt trong giờ làm việc" : "Vietnamese support during business hours"}</p>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-2">
            <div className="flex gap-1 mb-6 bg-ink-800 border border-ink-600 rounded-xl p-1 w-fit">
              {[
                { key: "form", label: isVi ? "Gửi yêu cầu" : "Send request", icon: MessageSquare },
                { key: "call", label: isVi ? "Đặt lịch tư vấn" : "Book a call", icon: Calendar },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.key} onClick={() => setTab(t.key as "form" | "call")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? "bg-gold text-ink-900" : "text-ink-300 hover:text-foreground"}`}>
                    <Icon size={14} />{t.label}
                  </button>
                );
              })}
            </div>

            {tab === "form" ? (
              <form onSubmit={handleSubmit} className="bg-ink-800 border border-ink-600 rounded-2xl p-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: isVi ? "Họ và tên *" : "Full name *", type: "text", required: true },
                    { key: "email", label: "Email *", type: "email", required: true },
                    { key: "phone", label: isVi ? "Số điện thoại" : "Phone number", type: "tel", required: false },
                    { key: "company", label: isVi ? "Tên công ty" : "Company name", type: "text", required: false },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">{field.label}</label>
                      <input
                        type={field.type} required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-ink-500 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">{isVi ? "Dịch vụ quan tâm" : "Service of interest"}</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors">
                    <option value="">{isVi ? "Chọn dịch vụ..." : "Select service..."}</option>
                    {SERVICES.map(s => <option key={s.en} value={s.en}>{isVi ? s.vi : s.en}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">{isVi ? "Nội dung *" : "Message *"}</label>
                  <textarea required rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={isVi ? "Mô tả ngắn về nhu cầu của bạn..." : "Briefly describe your needs..."}
                    className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-ink-500 focus:outline-none focus:border-gold/50 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(201,150,12,0.25)]">
                  {loading ? (isVi ? "Đang gửi..." : "Sending...") : (isVi ? "Gửi yêu cầu" : "Send request")}
                </button>
              </form>
            ) : (
              <div className="bg-ink-800 border border-ink-600 rounded-2xl p-7">
                <h3 className="font-bold text-foreground mb-2">{isVi ? "Đặt lịch tư vấn 30 phút miễn phí" : "Book a free 30-minute consultation"}</h3>
                <p className="text-sm text-ink-300 mb-6">{isVi ? "Chọn khung giờ phù hợp trên Calendly. Chuyên gia Gloyce sẽ phân tích nhu cầu và đề xuất giải pháp phù hợp nhất." : "Pick a time slot on Calendly. Gloyce experts will analyze your needs and propose the best solution."}</p>
                <div className="h-48 bg-ink-700 border border-ink-600 rounded-xl flex items-center justify-center">
                  <p className="text-sm text-ink-400">{isVi ? "Widget Calendly sẽ tích hợp tại đây" : "Calendly widget will be integrated here"}</p>
                </div>
                <p className="text-xs text-ink-500 mt-4 text-center">{isVi ? "Hoặc gửi email trực tiếp: hello@gloyce.co" : "Or email directly: hello@gloyce.co"}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
