import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, TrendingUp, Check } from "lucide-react";
export default async function RepatriationPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <TrendingUp size={12} /> {isVi ? "Hồi hương lợi nhuận" : "Profit Repatriation"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {isVi ? <><span className="text-gold-gradient">Hồi hương lợi nhuận</span> đúng hạn, đúng quy định</> : <><span className="text-gold-gradient">Profit repatriation</span> on time, fully compliant</>}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {isVi
              ? "Theo Luật Đầu tư 2020, lợi nhuận từ đầu tư ra nước ngoài phải được chuyển về Việt Nam trong vòng 12 tháng kể từ khi quyết toán thuế. Gloyce hỗ trợ bạn thực hiện đúng nghĩa vụ này."
              : "Under the Investment Law 2020, profits from outward investment must be repatriated to Vietnam within 12 months of tax settlement. Gloyce supports you in meeting this obligation correctly."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Tư vấn miễn phí" : "Free consultation"} <ArrowRight size={15} />
          </Link>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {(isVi
              ? ["Lập lịch hồi hương lợi nhuận hàng năm","Phối hợp với ngân hàng thực hiện chuyển tiền","Chuẩn bị chứng từ theo yêu cầu NHNN","Tư vấn thuế TNCN trên lợi nhuận nhận về","Hướng dẫn tối ưu thời điểm chuyển tiền","Báo cáo hậu hồi hương"]
              : ["Annual profit repatriation schedule","Coordinate with banks for transfers","Prepare SBV-required documentation","Personal income tax advice on received profits","Guide optimal transfer timing","Post-repatriation reporting"]
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
