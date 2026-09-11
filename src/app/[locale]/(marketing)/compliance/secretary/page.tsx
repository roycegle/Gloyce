import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
export default async function SecretaryPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <ShieldCheck size={12} /> {isVi ? "Thư ký công ty" : "Company Secretary"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Thư ký công ty</span> — compliance không bao giờ bỏ lỡ deadline</> : <><span className="text-gold-gradient">Company Secretary</span> — never miss a compliance deadline</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi ? "Gloyce quản lý toàn bộ hồ sơ pháp lý, nghị quyết của hội đồng thành viên, cập nhật đăng ký và nộp báo cáo định kỳ theo đúng deadline." : "Gloyce manages all statutory records, board resolutions, register updates and periodic filings — always on time."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
          </Link>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {(isVi
              ? ["Duy trì sổ đăng ký thành viên & giám đốc","Soạn thảo nghị quyết & biên bản họp","Annual Return / Annual Report nộp đúng hạn","Thay đổi thông tin đăng ký (địa chỉ, thành viên)","Lưu trữ hồ sơ pháp lý điện tử","Nhắc deadline tự động qua email"]
              : ["Maintain member & director registers","Draft resolutions & meeting minutes","Annual Return / Annual Report on time","Register information changes (address, members)","Digital statutory record keeping","Automatic email deadline reminders"]
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
