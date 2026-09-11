import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export default async function SecretaryPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <ShieldCheck size={12} /> {t("Thư ký công ty", "Company Secretary", "公司秘书", "Secretario Corporativo", "Sekretaris Perusahaan")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            <span className="text-gold-gradient">
              {t("Thư ký công ty", "Company Secretary", "公司秘书", "Secretario Corporativo", "Sekretaris Perusahaan")}
            </span>{" "}
            —{" "}
            {t("compliance không bao giờ bỏ lỡ deadline", "never miss a compliance deadline", "永不错过合规截止日期", "nunca pierda un plazo de cumplimiento", "tidak pernah melewati tenggat kepatuhan")}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {t(
              "Gloyce quản lý toàn bộ hồ sơ pháp lý, nghị quyết của hội đồng thành viên, cập nhật đăng ký và nộp báo cáo định kỳ theo đúng deadline.",
              "Gloyce manages all statutory records, board resolutions, register updates and periodic filings — always on time.",
              "Gloyce管理所有法定记录、董事会决议、注册更新和定期申报——始终按时完成。",
              "Gloyce gestiona todos los registros estatutarios, resoluciones del directorio, actualizaciones de registro y presentaciones periódicas — siempre a tiempo.",
              "Gloyce mengelola semua catatan statutori, resolusi dewan, pembaruan register, dan pengajuan berkala — selalu tepat waktu."
            )}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {t("Bắt đầu ngay", "Get started", "立即开始", "Comenzar ahora", "Mulai sekarang")} <ArrowRight size={15} />
          </Link>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {ta(
              {
                vi: ["Duy trì sổ đăng ký thành viên & giám đốc","Soạn thảo nghị quyết & biên bản họp","Annual Return / Annual Report nộp đúng hạn","Thay đổi thông tin đăng ký (địa chỉ, thành viên)","Lưu trữ hồ sơ pháp lý điện tử","Nhắc deadline tự động qua email"],
                en: ["Maintain member & director registers","Draft resolutions & meeting minutes","Annual Return / Annual Report on time","Register information changes (address, members)","Digital statutory record keeping","Automatic email deadline reminders"],
                zh: ["维护成员和董事名册","起草决议和会议记录","按时提交年度回报/年度报告","更新注册信息（地址、成员）","数字法定记录保存","自动电子邮件截止日期提醒"],
                es: ["Mantener registros de miembros y directores","Redactar resoluciones y actas de reuniones","Annual Return / Informe Anual a tiempo","Cambios en la información de registro (dirección, miembros)","Gestión digital de registros estatutarios","Recordatorios automáticos de plazos por email"],
                id: ["Memelihara register anggota & direktur","Menyusun resolusi & risalah rapat","Annual Return / Annual Report tepat waktu","Perubahan informasi pendaftaran (alamat, anggota)","Penyimpanan catatan statutori digital","Pengingat deadline otomatis via email"],
              },
              ["Maintain member & director registers","Draft resolutions & meeting minutes","Annual Return / Annual Report on time","Register information changes (address, members)","Digital statutory record keeping","Automatic email deadline reminders"]
            ).map(f => (
              <div key={f} className="flex items-center gap-2 bg-ink-800 border border-ink-600 rounded-xl p-4 text-sm text-ink-200">
                <Check size={14} className="text-gold shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
