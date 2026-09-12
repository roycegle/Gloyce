import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export default async function TermsPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("ĐIỀU KHOẢN DỊCH VỤ", "TERMS OF SERVICE", "服务条款", "TÉRMINOS DE SERVICIO", "SYARAT LAYANAN")}
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("Điều khoản Dịch vụ", "Terms of Service", "服务条款", "Términos de Servicio", "Syarat Layanan")}
          </h1>
          <p className="text-ink-400 text-sm mb-12">
            {t("Cập nhật lần cuối: Tháng 9 năm 2026", "Last updated: September 2026", "最后更新：2026年9月", "Última actualización: septiembre de 2026", "Terakhir diperbarui: September 2026")}
          </p>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-ink-300">
            <div className="bg-ink-800 border border-gold/20 rounded-2xl p-6">
              <p className="text-ink-300 leading-relaxed">
                {t(
                  "Bằng cách sử dụng dịch vụ của Gloyce LLC, bạn đồng ý với các điều khoản được nêu dưới đây. Gloyce LLC được đăng ký tại California, Hoa Kỳ và cung cấp dịch vụ tư vấn kinh doanh — không phải văn phòng luật hoặc tổ chức tài chính được cấp phép.",
                  "By using Gloyce LLC's services, you agree to the terms set out below. Gloyce LLC is registered in California, USA and provides business consulting services — not a licensed law firm or financial institution.",
                  "通过使用Gloyce LLC的服务，您同意以下条款。Gloyce LLC在美国加利福尼亚州注册，提供商业咨询服务——非持牌律师事务所或金融机构。",
                  "Al usar los servicios de Gloyce LLC, acepta los términos establecidos a continuación. Gloyce LLC está registrada en California, EE.UU. y proporciona servicios de consultoría empresarial, no es un bufete de abogados ni una institución financiera con licencia.",
                  "Dengan menggunakan layanan Gloyce LLC, Anda menyetujui ketentuan yang ditetapkan di bawah ini. Gloyce LLC terdaftar di California, AS dan menyediakan layanan konsultasi bisnis — bukan firma hukum berlisensi atau lembaga keuangan."
                )}
              </p>
            </div>

            {[
              {
                title: t("Phạm vi dịch vụ", "Scope of services", "服务范围", "Alcance de servicios", "Ruang lingkup layanan"),
                body: t(
                  "Gloyce cung cấp dịch vụ điều phối thành lập công ty, kế toán, tuân thủ và tư vấn kinh doanh quốc tế. Chúng tôi không cung cấp tư vấn pháp lý hoặc đại diện pháp lý.",
                  "Gloyce provides coordination services for company formation, accounting, compliance, and international business advisory. We do not provide legal advice or legal representation.",
                  "Gloyce提供公司成立、会计、合规和国际商业咨询的协调服务。我们不提供法律建议或法律代理。",
                  "Gloyce proporciona servicios de coordinación para formación de empresas, contabilidad, cumplimiento y asesoría empresarial internacional. No proporcionamos asesoramiento legal ni representación legal.",
                  "Gloyce menyediakan layanan koordinasi untuk pendirian perusahaan, akuntansi, kepatuhan, dan konsultasi bisnis internasional. Kami tidak memberikan nasihat hukum atau representasi hukum."
                ),
              },
              {
                title: t("Thanh toán và hoàn tiền", "Payment and refunds", "付款与退款", "Pago y reembolsos", "Pembayaran dan pengembalian dana"),
                body: t(
                  "Phí dịch vụ phải được thanh toán theo thỏa thuận trước khi bắt đầu dịch vụ. Phí không hoàn lại sau khi dịch vụ đã được thực hiện, trừ khi có thỏa thuận riêng.",
                  "Service fees must be paid as agreed before services begin. Fees are non-refundable after services have been performed, unless otherwise agreed.",
                  "服务费必须在服务开始前按约定支付。服务完成后费用不予退还，除非另有约定。",
                  "Las tarifas de servicio deben pagarse según lo acordado antes de que comiencen los servicios. Los honorarios no son reembolsables una vez prestados los servicios, salvo acuerdo contrario.",
                  "Biaya layanan harus dibayar sesuai kesepakatan sebelum layanan dimulai. Biaya tidak dapat dikembalikan setelah layanan dilakukan, kecuali ada kesepakatan lain."
                ),
              },
              {
                title: t("Giới hạn trách nhiệm", "Limitation of liability", "责任限制", "Limitación de responsabilidad", "Batasan tanggung jawab"),
                body: t(
                  "Gloyce không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc sử dụng dịch vụ. Trách nhiệm tối đa của chúng tôi không vượt quá phí dịch vụ bạn đã thanh toán.",
                  "Gloyce is not liable for any indirect, incidental, or consequential damages arising from use of the services. Our maximum liability does not exceed the service fees you have paid.",
                  "Gloyce对因使用服务而产生的任何间接、附带或后果性损害不承担责任。我们的最大责任不超过您已支付的服务费。",
                  "Gloyce no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de los servicios. Nuestra responsabilidad máxima no excede los honorarios que usted ha pagado.",
                  "Gloyce tidak bertanggung jawab atas kerusakan tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan. Tanggung jawab maksimum kami tidak melebihi biaya layanan yang telah Anda bayarkan."
                ),
              },
              {
                title: t("Luật điều chỉnh", "Governing law", "适用法律", "Ley aplicable", "Hukum yang berlaku"),
                body: t(
                  "Các điều khoản này được điều chỉnh bởi luật pháp tiểu bang California, Hoa Kỳ. Mọi tranh chấp sẽ được giải quyết tại Quận Cam, California.",
                  "These terms are governed by the laws of the State of California, USA. Any disputes will be resolved in Orange County, California.",
                  "本条款受美国加利福尼亚州法律管辖。任何争议将在加利福尼亚州奥兰治县解决。",
                  "Estos términos se rigen por las leyes del estado de California, EE.UU. Cualquier disputa se resolverá en el condado de Orange, California.",
                  "Ketentuan ini diatur oleh hukum Negara Bagian California, AS. Setiap perselisihan akan diselesaikan di Orange County, California."
                ),
              },
            ].map((section) => (
              <div key={section.title} className="border-b border-ink-700 pb-6 last:border-0">
                <h2 className="text-lg font-bold text-foreground mb-3">{section.title}</h2>
                <p className="leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors">
              {t("Có câu hỏi? Liên hệ với chúng tôi", "Have questions? Contact us", "有疑问？联系我们", "¿Preguntas? Contáctenos", "Ada pertanyaan? Hubungi kami")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
