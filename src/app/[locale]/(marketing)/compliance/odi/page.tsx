import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, FileCheck, FileText } from "lucide-react";

export default async function USFilingPage() {
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
            <FileCheck size={12} />
            {t("Khai báo thuế & Báo cáo Mỹ", "US Filing & Reporting", "美国税务申报与报告", "Declaración & Reporte en EE.UU.", "Pengajuan & Pelaporan AS")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            <span className="text-gold-gradient">
              {t("Khai báo thuế & báo cáo", "US Tax Filing", "美国税务申报", "Declaración Fiscal en EE.UU.", "Pengajuan Pajak AS")}
            </span>{" "}
            {t("liên bang Mỹ", "& Federal Reporting", "与联邦报告", "& Reporte Federal", "& Pelaporan Federal")}
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {t(
              "LLC nước ngoài tại Mỹ có các nghĩa vụ báo cáo bắt buộc với IRS và tiểu bang. Gloyce đảm bảo bạn nộp đúng, nộp đủ và đúng hạn — tránh phạt và rủi ro pháp lý.",
              "Foreign-owned US LLCs have mandatory reporting obligations with the IRS and state authorities. Gloyce ensures you file correctly, completely, and on time — avoiding penalties and legal risk.",
              "外资美国LLC对IRS和州政府有强制报告义务。Gloyce确保您正确、完整、按时申报——避免罚款和法律风险。",
              "Las LLC estadounidenses de propiedad extranjera tienen obligaciones de reporte obligatorio ante el IRS y autoridades estatales. Gloyce garantiza que presente correctamente, de forma completa y a tiempo — evitando sanciones y riesgos legales.",
              "LLC AS milik asing memiliki kewajiban pelaporan wajib kepada IRS dan otoritas negara bagian. Gloyce memastikan Anda mengajukan dengan benar, lengkap, dan tepat waktu — menghindari denda dan risiko hukum."
            )}
          </p>

          <div className="flex gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-8 max-w-2xl">
            <FileText size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">
              {t(
                "LLC thuộc sở hữu nước ngoài phải nộp Form 5472 mỗi năm. Phạt không nộp: $25,000 mỗi lần vi phạm. Gloyce lo toàn bộ cho bạn.",
                "Foreign-owned LLCs must file Form 5472 annually. Failure to file penalty: $25,000 per violation. Gloyce handles everything for you.",
                "外资LLC必须每年提交5472表。未申报罚款：每次违规$25,000。Gloyce为您全程处理。",
                "Las LLC de propiedad extranjera deben presentar el Formulario 5472 anualmente. Penalidad por no presentar: $25,000 por infracción. Gloyce lo gestiona todo.",
                "LLC milik asing harus mengajukan Form 5472 setiap tahun. Denda tidak mengajukan: $25.000 per pelanggaran. Gloyce menangani semuanya."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {t("Tư vấn miễn phí", "Free consultation", "免费咨询", "Consulta gratuita", "Konsultasi gratis")} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {ta(
              {
                vi: ["Chuẩn bị & nộp Form 5472 (LLC nước ngoài)","BOI Report theo FinCEN (bắt buộc từ 2024)","Annual Franchise Tax tại Delaware / Wyoming","Annual Report tại tiểu bang đăng ký","Form 1065 cho LLC có nhiều thành viên","Nhắc nhở deadline và theo dõi tình trạng nộp"],
                en: ["Prepare & file Form 5472 (foreign-owned LLC)","BOI Report with FinCEN (mandatory since 2024)","Annual Franchise Tax — Delaware / Wyoming","Annual Report in your registered state","Form 1065 for multi-member LLCs","Deadline reminders and filing status tracking"],
                zh: ["准备并提交5472表（外资LLC）","向FinCEN提交BOI报告（2024年起强制）","特拉华/怀俄明年度特许税","在注册州提交年度报告","多成员LLC的1065表","截止日期提醒和申报状态跟踪"],
                es: ["Preparar y presentar Formulario 5472 (LLC extranjera)","Reporte BOI con FinCEN (obligatorio desde 2024)","Impuesto de Franquicia Anual — Delaware / Wyoming","Informe Anual en el estado registrado","Formulario 1065 para LLC con múltiples miembros","Recordatorios de plazos y seguimiento del estado de presentación"],
                id: ["Menyiapkan & mengajukan Form 5472 (LLC asing)","BOI Report dengan FinCEN (wajib sejak 2024)","Annual Franchise Tax — Delaware / Wyoming","Annual Report di negara bagian terdaftar","Form 1065 untuk LLC multi-anggota","Pengingat deadline dan pelacakan status pengajuan"],
              },
              ["Prepare & file Form 5472 (foreign-owned LLC)","BOI Report with FinCEN (mandatory since 2024)","Annual Franchise Tax — Delaware / Wyoming","Annual Report in your registered state","Form 1065 for multi-member LLCs","Deadline reminders and filing status tracking"]
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
