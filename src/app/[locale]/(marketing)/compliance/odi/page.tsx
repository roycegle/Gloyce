import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, FileCheck, AlertTriangle } from "lucide-react";
export default async function ODIPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <FileCheck size={12} /> {isVi ? "Khai báo ODI" : "ODI Reporting"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Khai báo ODI</span> — đầu tư ra nước ngoài đúng quy định</> : <><span className="text-gold-gradient">ODI Reporting</span> — outward investment done right</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi
              ? "Cá nhân và tổ chức Việt Nam đầu tư ra nước ngoài (thành lập LLC Mỹ, Singapore, Hồng Kông) cần đăng ký với Ngân hàng Nhà nước và mở tài khoản vốn đầu tư ra nước ngoài. Gloyce hướng dẫn toàn bộ quy trình này."
              : "Vietnamese individuals and organizations investing abroad (forming US LLC, Singapore, Hong Kong companies) must register with the State Bank and open an outward investment capital account. Gloyce guides the entire process."}
          </p>
          {/* Warning box */}
          <div className="flex gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-8 max-w-2xl">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200">
              {isVi
                ? "Không khai báo ODI có thể bị phạt 20–60 triệu VNĐ. Gloyce giúp bạn tuân thủ đúng — không né tránh, không rủi ro pháp lý."
                : "Failure to declare ODI can result in fines of VND 20–60 million. Gloyce helps you comply correctly — no avoidance, no legal risk."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {isVi ? "Tư vấn ODI miễn phí" : "Free ODI consultation"} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {(isVi
              ? ["Đánh giá nghĩa vụ khai báo ODI của bạn","Chuẩn bị hồ sơ đăng ký với NHNN Việt Nam","Mở tài khoản vốn đầu tư ra nước ngoài","Tư vấn hạn mức và điều kiện chuyển tiền","Hướng dẫn hồi hương lợi nhuận đúng hạn","Báo cáo định kỳ theo quy định NHNN"]
              : ["Assess your ODI declaration obligations","Prepare registration documents for SBV","Open outward investment capital account","Advise on transfer limits and conditions","Guide timely profit repatriation","Periodic reporting as required by SBV"]
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
