"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Mail, MapPin, Calendar, MessageSquare, Check } from "lucide-react";

const SERVICES = [
  { vi: "LLC tại Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC en EE.UU.", id: "LLC di AS" },
  { vi: "Singapore Pte Ltd", en: "Singapore Pte Ltd", zh: "新加坡私人有限公司", es: "Singapore Pte Ltd", id: "Singapore Pte Ltd" },
  { vi: "Hong Kong Limited", en: "Hong Kong Limited", zh: "香港有限公司", es: "Hong Kong Limited", id: "Hong Kong Limited" },
  { vi: "Mở tài khoản ngân hàng", en: "Business bank account", zh: "开设企业银行账户", es: "Cuenta bancaria empresarial", id: "Rekening bank bisnis" },
  { vi: "Dịch vụ kế toán", en: "Accounting services", zh: "会计服务", es: "Servicios contables", id: "Layanan akuntansi" },
  { vi: "Khai báo thuế & Báo cáo", en: "US Tax Filing & Reporting", zh: "美国税务申报", es: "Declaración fiscal en EE.UU.", id: "Pengajuan pajak AS" },
  { vi: "Chuyển tiền quốc tế", en: "International transfers", zh: "国际汇款", es: "Transferencias internacionales", id: "Transfer internasional" },
  { vi: "Khác", en: "Other", zh: "其他", es: "Otro", id: "Lainnya" },
];

export default function ContactPage() {
  const locale = useLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  const [tab, setTab] = useState<"form" | "call">("form");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Contact form error:", data);
      }
    } catch (err) {
      console.error("Contact form network error:", err);
    }
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
            {t("Cảm ơn bạn!", "Thank you!", "谢谢您！", "¡Gracias!", "Terima kasih!")}
          </h2>
          <p className="text-ink-300">
            {t(
              "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ trong vòng 24 giờ làm việc.",
              "We received your request and will contact you within 24 business hours.",
              "我们已收到您的请求，将在24个工作小时内与您联系。",
              "Recibimos su solicitud y nos comunicaremos dentro de las 24 horas hábiles.",
              "Kami telah menerima permintaan Anda dan akan menghubungi Anda dalam 24 jam kerja."
            )}
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              {t("LIÊN HỆ", "CONTACT", "联系我们", "CONTACTO", "KONTAK")}
            </p>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {t("Chúng tôi sẵn sàng hỗ trợ bạn", "We're ready to help", "我们随时为您提供帮助", "Estamos listos para ayudarte", "Kami siap membantu Anda")}
            </h1>
            <p className="text-ink-300 leading-relaxed mb-8">
              {t(
                "Đặt lịch tư vấn miễn phí hoặc gửi yêu cầu — đội ngũ Gloyce sẽ liên hệ trong vòng 24 giờ làm việc.",
                "Book a free consultation or send a request — the Gloyce team will contact you within 24 business hours.",
                "预约免费咨询或发送请求——Gloyce团队将在24个工作小时内与您联系。",
                "Reserva una consulta gratuita o envía una solicitud — el equipo de Gloyce te contactará dentro de las 24 horas hábiles.",
                "Pesan konsultasi gratis atau kirim permintaan — tim Gloyce akan menghubungi Anda dalam 24 jam kerja."
              )}
            </p>
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
              <p className="text-xs font-semibold text-gold mb-1">
                {t("Giờ làm việc", "Business hours", "工作时间", "Horario de atención", "Jam kerja")}
              </p>
              <p className="text-sm text-ink-300">
                {t("Thứ 2 – Thứ 6: 9:00 – 18:00 (PST)", "Mon – Fri: 9:00 AM – 6:00 PM (PST)", "周一至周五：9:00 – 18:00 (PST)", "Lun – Vie: 9:00 AM – 6:00 PM (PST)", "Sen – Jum: 9:00 – 18:00 (PST)")}
              </p>
              <p className="text-xs text-ink-500">
                {t("Hỗ trợ đa ngôn ngữ trong giờ làm việc", "Multilingual support during business hours", "工作时间内提供多语言支持", "Soporte multilingüe durante horario de atención", "Dukungan multibahasa dalam jam kerja")}
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-2">
            <div className="flex gap-1 mb-6 bg-ink-800 border border-ink-600 rounded-xl p-1 w-fit">
              {[
                { key: "form", label: t("Gửi yêu cầu", "Send request", "发送请求", "Enviar solicitud", "Kirim permintaan"), icon: MessageSquare },
                { key: "call", label: t("Đặt lịch tư vấn", "Book a call", "预约咨询", "Agendar llamada", "Jadwalkan panggilan"), icon: Calendar },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button key={item.key} onClick={() => setTab(item.key as "form" | "call")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === item.key ? "bg-gold text-ink-900" : "text-ink-300 hover:text-foreground"}`}>
                    <Icon size={14} />{item.label}
                  </button>
                );
              })}
            </div>

            {tab === "form" ? (
              <form onSubmit={handleSubmit} className="bg-ink-800 border border-ink-600 rounded-2xl p-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: t("Họ và tên *", "Full name *", "姓名 *", "Nombre completo *", "Nama lengkap *"), type: "text", required: true },
                    { key: "email", label: "Email *", type: "email", required: true },
                    { key: "phone", label: t("Số điện thoại", "Phone number", "电话号码", "Número de teléfono", "Nomor telepon"), type: "tel", required: false },
                    { key: "company", label: t("Tên công ty", "Company name", "公司名称", "Nombre de empresa", "Nama perusahaan"), type: "text", required: false },
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
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    {t("Dịch vụ quan tâm", "Service of interest", "感兴趣的服务", "Servicio de interés", "Layanan yang diminati")}
                  </label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors">
                    <option value="">
                      {t("Chọn dịch vụ...", "Select service...", "选择服务...", "Selecciona un servicio...", "Pilih layanan...")}
                    </option>
                    {SERVICES.map(s => (
                      <option key={s.en} value={s.en}>
                        {(s as Record<string, string>)[locale] ?? s.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    {t("Nội dung *", "Message *", "留言 *", "Mensaje *", "Pesan *")}
                  </label>
                  <textarea required rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={t("Mô tả ngắn về nhu cầu của bạn...", "Briefly describe your needs...", "简要描述您的需求...", "Describa brevemente sus necesidades...", "Deskripsikan kebutuhan Anda secara singkat...")}
                    className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-ink-500 focus:outline-none focus:border-gold/50 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(201,150,12,0.25)]">
                  {loading
                    ? t("Đang gửi...", "Sending...", "发送中...", "Enviando...", "Mengirim...")
                    : t("Gửi yêu cầu", "Send request", "发送请求", "Enviar solicitud", "Kirim permintaan")}
                </button>
              </form>
            ) : (
              <div className="bg-ink-800 border border-ink-600 rounded-2xl p-7">
                <h3 className="font-bold text-foreground mb-2">
                  {t("Đặt lịch tư vấn 30 phút miễn phí", "Book a free 30-minute consultation", "预约30分钟免费咨询", "Reserva una consulta gratuita de 30 minutos", "Pesan konsultasi gratis 30 menit")}
                </h3>
                <p className="text-sm text-ink-300 mb-6">
                  {t(
                    "Gửi thông tin bên dưới — chuyên gia Gloyce sẽ liên hệ trong vòng 4 giờ làm việc để xác nhận khung giờ phù hợp.",
                    "Send your details below — a Gloyce expert will reach out within 4 business hours to confirm a time.",
                    "发送您的详细信息——Gloyce专家将在4个工作小时内联系您确认时间。",
                    "Envía tus datos — un experto de Gloyce se comunicará dentro de las 4 horas hábiles para confirmar el horario.",
                    "Kirim detail Anda — ahli Gloyce akan menghubungi Anda dalam 4 jam kerja untuk mengkonfirmasi waktu."
                  )}
                </p>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">
                        {t("Họ và tên *", "Full name *", "姓名 *", "Nombre completo *", "Nama lengkap *")}
                      </label>
                      <input type="text" className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-ink-500 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder={t("Alex Chen", "Alex Chen", "Alex Chen", "Alex Chen", "Alex Chen")} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">Email *</label>
                      <input type="email" className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-ink-500 focus:outline-none focus:border-gold/50 transition-colors" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">
                      {t("Nhu cầu tư vấn", "What you need advice on", "咨询需求", "En qué necesitas asesoría", "Kebutuhan konsultasi")}
                    </label>
                    <select className="w-full bg-ink-700 border border-ink-600 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors">
                      <option value="">
                        {t("Chọn chủ đề...", "Choose a topic...", "选择主题...", "Elige un tema...", "Pilih topik...")}
                      </option>
                      {SERVICES.map(s => (
                        <option key={s.en} value={s.en}>
                          {(s as Record<string, string>)[locale] ?? s.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-2">
                      {t("Khung giờ bạn rảnh (PST)", "Your available times (PST)", "您的空闲时间 (PST)", "Tus horarios disponibles (PST)", "Waktu yang tersedia (PST)")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ta({
                        vi: ["Sáng (9–12h)","Trưa (12–15h)","Chiều (15–18h)","Thứ 2–3","Thứ 4–5","Thứ 6"],
                        en: ["Morning (9–12)","Midday (12–15)","Afternoon (15–18)","Mon–Tue","Wed–Thu","Friday"],
                        zh: ["上午 (9–12)","中午 (12–15)","下午 (15–18)","周一至二","周三至四","周五"],
                        es: ["Mañana (9–12)","Mediodía (12–15)","Tarde (15–18)","Lun–Mar","Mié–Jue","Viernes"],
                        id: ["Pagi (9–12)","Siang (12–15)","Sore (15–18)","Sen–Sel","Rab–Kam","Jumat"],
                      }, ["Morning (9–12)","Midday (12–15)","Afternoon (15–18)","Mon–Tue","Wed–Thu","Friday"]).map(slot => (
                        <label key={slot} className="flex items-center gap-2 px-3 py-2 bg-ink-700 border border-ink-600 rounded-lg text-xs text-ink-300 cursor-pointer hover:border-gold/40 hover:text-gold transition-all">
                          <input type="checkbox" className="accent-gold" /> {slot}
                        </label>
                      ))}
                    </div>
                  </div>
                  <a href={`mailto:hello@gloyce.co?subject=${encodeURIComponent(t("Đặt lịch tư vấn", "Book a consultation", "预约咨询", "Reservar consulta", "Jadwalkan konsultasi"))}`}
                    className="block w-full text-center py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(201,150,12,0.25)]">
                    {t("Gửi yêu cầu đặt lịch", "Send booking request", "发送预约请求", "Enviar solicitud de reserva", "Kirim permintaan pemesanan")}
                  </a>
                  <p className="text-xs text-ink-500 text-center">
                    {t("Hoặc liên hệ trực tiếp: ", "Or contact directly: ", "或直接联系：", "O contáctanos directamente: ", "Atau hubungi langsung: ")}
                    <a href="mailto:hello@gloyce.co" className="text-gold hover:text-gold-light transition-colors">hello@gloyce.co</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
