import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, TrendingUp, Check } from "lucide-react";

export default async function InternationalTransfersPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;
  const ta = (vals: Record<string, string[]>, fb: string[]) =>
    (vals as Record<string, string[]>)[locale] ?? fb;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
            <TrendingUp size={12} />
            {t("Chuyển tiền quốc tế", "International Transfers", "国际汇款", "Transferencias Internacionales", "Transfer Internasional")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            <span className="text-gold-gradient">
              {t("Chuyển tiền quốc tế", "International transfers", "国际汇款", "Transferencias internacionales", "Transfer internasional")}
            </span>{" "}
            {t("nhanh chóng, an toàn", "— fast, secure, efficient", "——快速、安全、高效", "— rápidas, seguras, eficientes", "— cepat, aman, efisien")}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {t(
              "Gloyce kết nối bạn với mạng lưới ngân hàng và fintech hàng đầu để chuyển tiền quốc tế, phân phối lợi nhuận và quản lý dòng tiền xuyên biên giới một cách hiệu quả.",
              "Gloyce connects you with a network of top banks and fintechs to handle international wire transfers, profit distribution, and cross-border cash flow management efficiently.",
              "Gloyce将您与顶级银行和金融科技公司网络对接，高效处理国际电汇、利润分配和跨境现金流管理。",
              "Gloyce le conecta con una red de los mejores bancos y fintechs para gestionar transferencias internacionales, distribución de ganancias y flujo de caja transfronterizo de manera eficiente.",
              "Gloyce menghubungkan Anda dengan jaringan bank dan fintech terkemuka untuk menangani transfer kawat internasional, distribusi keuntungan, dan manajemen arus kas lintas negara secara efisien."
            )}
          </p>

          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)] mb-10">
            {t("Tư vấn miễn phí", "Free consultation", "免费咨询", "Consulta gratuita", "Konsultasi gratis")} <ArrowRight size={15} />
          </Link>

          <div className="grid sm:grid-cols-2 gap-4">
            {ta(
              {
                vi: ["Wire transfer từ tài khoản Mỹ về Việt Nam","Phân phối lợi nhuận cho cổ đông","Kết nối Wise, Airwallex, Payoneer","Tư vấn tỷ giá và thời điểm chuyển tiền tối ưu","Theo dõi và xác nhận giao dịch quốc tế","Chuẩn bị chứng từ ngân hàng đầy đủ"],
                en: ["Wire transfer from US account to Vietnam","Profit distribution to shareholders","Connect Wise, Airwallex, Payoneer","Exchange rate advice and optimal transfer timing","Track and confirm international transactions","Prepare complete banking documentation"],
                zh: ["从美国账户电汇至越南","向股东分配利润","连接Wise、Airwallex、Payoneer","汇率建议和最优转账时机","跟踪并确认国际交易","准备完整的银行文件"],
                es: ["Wire transfer desde cuenta en EE.UU. a Vietnam","Distribución de ganancias a accionistas","Conectar con Wise, Airwallex, Payoneer","Asesoría sobre tipo de cambio y momento óptimo de transferencia","Seguimiento y confirmación de transacciones internacionales","Preparar documentación bancaria completa"],
                id: ["Wire transfer dari rekening AS ke Vietnam","Distribusi keuntungan ke pemegang saham","Terhubung dengan Wise, Airwallex, Payoneer","Saran kurs dan waktu transfer optimal","Lacak dan konfirmasi transaksi internasional","Menyiapkan dokumentasi perbankan lengkap"],
              },
              ["Wire transfer from US account to Vietnam","Profit distribution to shareholders","Connect Wise, Airwallex, Payoneer","Exchange rate advice and optimal transfer timing","Track and confirm international transactions","Prepare complete banking documentation"]
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
