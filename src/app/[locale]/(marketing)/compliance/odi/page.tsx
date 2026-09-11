import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, FileCheck, FileText } from "lucide-react";

export default async function USFilingPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <FileCheck size={12} />
            {isVi ? "Khai báo thuế & Báo cáo Mỹ" : "US Filing & Reporting"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi
              ? <><span className="text-gold-gradient">Khai báo thuế & báo cáo</span> liên bang Mỹ</>
              : <><span className="text-gold-gradient">US Tax Filing</span> & Federal Reporting</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi
              ? "LLC nước ngoài tại Mỹ có các nghĩa vụ báo cáo bắt buộc với IRS và tiểu bang. Gloyce đảm bảo bạn nộp đúng, nộp đủ và đúng hạn — tránh phạt và rủi ro pháp lý."
              : "Foreign-owned US LLCs have mandatory reporting obligations with the IRS and state authorities. Gloyce ensures you file correctly, completely, and on time — avoiding penalties and legal risk."}
          </p>

          <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-8 max-w-2xl">
            <FileText size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">
              {isVi
                ? "LLC thuộc sở hữu nước ngoài phải nộp Form 5472 mỗi năm. Phạt không nộp: $25,000 mỗi lần vi phạm. Gloyce lo toàn bộ cho bạn."
                : "Foreign-owned LLCs must file Form 5472 annually. Failure to file penalty: $25,000 per violation. Gloyce handles everything for you."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {isVi ? "Tư vấn miễn phí" : "Free consultation"} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {(isVi
              ? [
                  "Chuẩn bị & nộp Form 5472 (LLC nước ngoài)",
                  "BOI Report theo FinCEN (bắt buộc từ 2024)",
                  "Annual Franchise Tax tại Delaware / Wyoming",
                  "Annual Report tại tiểu bang đăng ký",
                  "Form 1065 cho LLC có nhiều thành viên",
                  "Nhắc nhở deadline và theo dõi tình trạng nộp",
                ]
              : [
                  "Prepare & file Form 5472 (foreign-owned LLC)",
                  "BOI Report with FinCEN (mandatory since 2024)",
                  "Annual Franchise Tax — Delaware / Wyoming",
                  "Annual Report in your registered state",
                  "Form 1065 for multi-member LLCs",
                  "Deadline reminders and filing status tracking",
                ]
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
