import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = (vi: string, en: string, zh: string, es: string, id: string) =>
    ({ vi, en, zh, es, id } as Record<string, string>)[locale] ?? en;

  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {t("CHÍNH SÁCH BẢO MẬT", "PRIVACY POLICY", "隐私政策", "POLÍTICA DE PRIVACIDAD", "KEBIJAKAN PRIVASI")}
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("Chính sách Bảo mật", "Privacy Policy", "隐私政策", "Política de Privacidad", "Kebijakan Privasi")}
          </h1>
          <p className="text-ink-400 text-sm mb-12">
            {t("Cập nhật lần cuối: Tháng 9 năm 2026", "Last updated: September 2026", "最后更新：2026年9月", "Última actualización: septiembre de 2026", "Terakhir diperbarui: September 2026")}
          </p>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-ink-300">
            <div className="bg-ink-800 border border-gold/20 rounded-2xl p-6">
              <p className="text-ink-300 leading-relaxed">
                {t(
                  "Gloyce LLC cam kết bảo vệ thông tin cá nhân của bạn. Tài liệu này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn sử dụng dịch vụ của Gloyce.",
                  "Gloyce LLC is committed to protecting your personal information. This document describes how we collect, use, and protect information when you use Gloyce's services.",
                  "Gloyce LLC致力于保护您的个人信息。本文件描述了我们在您使用Gloyce服务时如何收集、使用和保护信息。",
                  "Gloyce LLC se compromete a proteger su información personal. Este documento describe cómo recopilamos, usamos y protegemos la información cuando usa los servicios de Gloyce.",
                  "Gloyce LLC berkomitmen untuk melindungi informasi pribadi Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi saat Anda menggunakan layanan Gloyce."
                )}
              </p>
            </div>

            {[
              {
                title: t("Thông tin chúng tôi thu thập", "Information we collect", "我们收集的信息", "Información que recopilamos", "Informasi yang kami kumpulkan"),
                body: t(
                  "Chúng tôi thu thập thông tin bạn cung cấp khi đăng ký, liên hệ hoặc sử dụng dịch vụ: tên, email, số điện thoại, tên công ty và thông tin liên quan đến dịch vụ bạn yêu cầu.",
                  "We collect information you provide when registering, contacting us, or using our services: name, email, phone number, company name, and information related to the service you request.",
                  "我们收集您在注册、联系我们或使用服务时提供的信息：姓名、电子邮件、电话号码、公司名称以及与您请求的服务相关的信息。",
                  "Recopilamos información que usted proporciona al registrarse, contactarnos o usar nuestros servicios: nombre, email, teléfono, nombre de empresa e información relacionada con el servicio solicitado.",
                  "Kami mengumpulkan informasi yang Anda berikan saat mendaftar, menghubungi kami, atau menggunakan layanan: nama, email, nomor telepon, nama perusahaan, dan informasi terkait layanan yang Anda minta."
                ),
              },
              {
                title: t("Cách chúng tôi sử dụng thông tin", "How we use your information", "我们如何使用您的信息", "Cómo usamos su información", "Bagaimana kami menggunakan informasi Anda"),
                body: t(
                  "Thông tin được sử dụng để cung cấp dịch vụ, liên lạc với bạn về yêu cầu hoặc cập nhật dịch vụ, và cải thiện trải nghiệm người dùng. Chúng tôi không bán thông tin cá nhân cho bên thứ ba.",
                  "Information is used to provide services, communicate with you about your requests or service updates, and improve user experience. We do not sell personal information to third parties.",
                  "信息用于提供服务、与您就请求或服务更新进行沟通以及改善用户体验。我们不会将个人信息出售给第三方。",
                  "La información se usa para prestar servicios, comunicarse con usted sobre solicitudes o actualizaciones, y mejorar la experiencia de usuario. No vendemos información personal a terceros.",
                  "Informasi digunakan untuk menyediakan layanan, berkomunikasi dengan Anda tentang permintaan atau pembaruan layanan, dan meningkatkan pengalaman pengguna. Kami tidak menjual informasi pribadi kepada pihak ketiga."
                ),
              },
              {
                title: t("Bảo mật dữ liệu", "Data security", "数据安全", "Seguridad de datos", "Keamanan data"),
                body: t(
                  "Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn khỏi truy cập, tiết lộ hoặc thay đổi trái phép.",
                  "We apply appropriate technical and organizational security measures to protect your information from unauthorized access, disclosure, or alteration.",
                  "我们采用适当的技术和组织安全措施，保护您的信息免遭未经授权的访问、披露或更改。",
                  "Aplicamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información contra acceso, divulgación o alteración no autorizados.",
                  "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi Anda dari akses, pengungkapan, atau perubahan yang tidak sah."
                ),
              },
              {
                title: t("Liên hệ", "Contact", "联系我们", "Contacto", "Kontak"),
                body: t(
                  "Nếu bạn có câu hỏi về chính sách bảo mật, hãy liên hệ: hello@gloyce.co",
                  "If you have questions about this privacy policy, please contact: hello@gloyce.co",
                  "如果您对此隐私政策有疑问，请联系：hello@gloyce.co",
                  "Si tiene preguntas sobre esta política de privacidad, contáctenos: hello@gloyce.co",
                  "Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi: hello@gloyce.co"
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
