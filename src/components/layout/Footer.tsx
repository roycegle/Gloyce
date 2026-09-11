import { Link } from "@/i18n/routing";
import { Globe, Mail, MapPin } from "lucide-react";

type L = { vi: string; en: string; zh: string; es: string; id: string };
function pick(locale: string, l: L) {
  return (l as Record<string, string>)[locale] ?? l.en;
}

const FOOTER_LINKS = [
  {
    title: { vi: "Thành lập", en: "Incorporate", zh: "成立公司", es: "Incorporación", id: "Pembentukan" },
    links: [
      { label: { vi: "LLC tại Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC en EE.UU.", id: "LLC di AS" }, href: "/incorporation/us-llc" },
      { label: { vi: "Singapore Pte Ltd", en: "Singapore Pte Ltd", zh: "新加坡私人有限公司", es: "Singapore Pte Ltd", id: "Singapore Pte Ltd" }, href: "/incorporation/singapore" },
      { label: { vi: "Hong Kong Limited", en: "Hong Kong Limited", zh: "香港有限公司", es: "Hong Kong Limited", id: "Hong Kong Limited" }, href: "/incorporation/hong-kong" },
      { label: { vi: "Mở tài khoản ngân hàng", en: "Business bank account", zh: "开设企业银行账户", es: "Cuenta bancaria empresarial", id: "Rekening bank bisnis" }, href: "/incorporation/bank-account" },
    ],
  },
  {
    title: { vi: "Kế toán", en: "Accounting", zh: "会计", es: "Contabilidad", id: "Akuntansi" },
    links: [
      { label: { vi: "Dịch vụ kế toán", en: "Accounting services", zh: "会计服务", es: "Servicios contables", id: "Layanan akuntansi" }, href: "/accounting" },
      { label: { vi: "Kế toán cho Seller TMĐT", en: "Ecommerce accounting", zh: "电商会计", es: "Contabilidad ecommerce", id: "Akuntansi ecommerce" }, href: "/accounting/ecommerce" },
      { label: { vi: "Sổ sách kế toán", en: "Bookkeeping", zh: "簿记", es: "Teneduría de libros", id: "Pembukuan" }, href: "/accounting/bookkeeping" },
      { label: { vi: "Hóa đơn", en: "Invoicing", zh: "发票", es: "Facturación", id: "Faktur" }, href: "/accounting/invoicing" },
      { label: { vi: "Báo cáo tài chính", en: "Financial reporting", zh: "财务报告", es: "Informes financieros", id: "Laporan keuangan" }, href: "/accounting/reporting" },
    ],
  },
  {
    title: { vi: "Tuân thủ", en: "Compliance", zh: "合规", es: "Cumplimiento", id: "Kepatuhan" },
    links: [
      { label: { vi: "Thư ký công ty", en: "Company secretary", zh: "公司秘书", es: "Secretaría corporativa", id: "Sekretaris perusahaan" }, href: "/compliance/secretary" },
      { label: { vi: "Khai báo thuế & báo cáo", en: "US Filing & Reporting", zh: "美国申报与报告", es: "Declaraciones en EE.UU.", id: "Pelaporan di AS" }, href: "/compliance/odi" },
      { label: { vi: "Chuyển tiền quốc tế", en: "International transfers", zh: "国际汇款", es: "Transferencias internacionales", id: "Transfer internasional" }, href: "/compliance/repatriation" },
    ],
  },
  {
    title: { vi: "Tài nguyên", en: "Resources", zh: "资源", es: "Recursos", id: "Sumber Daya" },
    links: [
      { label: { vi: "Blog", en: "Blog", zh: "博客", es: "Blog", id: "Blog" }, href: "/resources/blog" },
      { label: { vi: "Hướng dẫn", en: "Guides", zh: "指南", es: "Guías", id: "Panduan" }, href: "/resources/guides" },
      { label: { vi: "Câu chuyện khách hàng", en: "Customer stories", zh: "客户案例", es: "Historias de clientes", id: "Kisah pelanggan" }, href: "/resources/stories" },
      { label: { vi: "FAQ", en: "FAQ", zh: "常见问题", es: "Preguntas frecuentes", id: "FAQ" }, href: "/resources/faq" },
      { label: { vi: "Bảng giá", en: "Pricing", zh: "价格", es: "Precios", id: "Harga" }, href: "/pricing" },
    ],
  },
  {
    title: { vi: "Công ty", en: "Company", zh: "公司", es: "Empresa", id: "Perusahaan" },
    links: [
      { label: { vi: "Về Gloyce", en: "About Gloyce", zh: "关于Gloyce", es: "Acerca de Gloyce", id: "Tentang Gloyce" }, href: "/about" },
      { label: { vi: "Đội ngũ", en: "Our team", zh: "我们的团队", es: "Nuestro equipo", id: "Tim kami" }, href: "/about#team" },
      { label: { vi: "Đối tác", en: "Partners", zh: "合作伙伴", es: "Socios", id: "Mitra" }, href: "/about#partners" },
      { label: { vi: "Liên hệ", en: "Contact us", zh: "联系我们", es: "Contáctenos", id: "Hubungi kami" }, href: "/contact" },
    ],
  },
];

export async function Footer({ locale }: { locale: string }) {
  const t = (l: L) => pick(locale, l);
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <Globe className="w-4 h-4 text-ink-900" />
              </div>
              <span className="font-bold text-lg text-foreground">Gloyce</span>
            </Link>
            <p className="text-sm text-ink-300 leading-relaxed mb-4">
              {t({ vi: "Nền tảng giúp doanh nghiệp châu Á thành lập, vận hành và mở rộng kinh doanh toàn cầu.", en: "Helping Asian businesses incorporate, operate, and expand globally.", zh: "帮助亚洲企业在全球成立、运营和扩展业务。", es: "Ayudamos a empresas asiáticas a constituirse, operar y expandirse globalmente.", id: "Membantu bisnis Asia mendirikan, beroperasi, dan berkembang secara global." })}
            </p>
            <div className="space-y-2">
              <a href="mailto:hello@gloyce.co" className="flex items-center gap-2 text-xs text-ink-400 hover:text-gold transition-colors">
                <Mail size={13} className="shrink-0" /> hello@gloyce.co
              </a>
              <div className="flex items-start gap-2 text-xs text-ink-400">
                <MapPin size={13} className="shrink-0 mt-0.5" />
                <span>3000 Marketplace,<br />Irvine, CA 92602<br />United States</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title.en}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4">
                {t(col.title)}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-300 hover:text-foreground transition-colors"
                    >
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-400">
          <p>© 2024–2026 Gloyce. {t({ vi: "Bảo lưu mọi quyền.", en: "All rights reserved.", zh: "版权所有。", es: "Todos los derechos reservados.", id: "Semua hak dilindungi." })}</p>
          <p className="text-center max-w-xl leading-relaxed">
            {t({
              vi: "Gloyce LLC là công ty tư vấn doanh nghiệp đăng ký tại California, Hoa Kỳ — không phải văn phòng luật hay tổ chức tài chính được cấp phép. Dịch vụ giúp khách hàng tuân thủ quy định liên bang và tiểu bang Mỹ.",
              en: "Gloyce LLC is a business consulting firm registered in California, USA — not a licensed law firm or financial institution. Our services help clients comply with applicable US federal and state regulations.",
              zh: "Gloyce LLC 是一家在美国加利福尼亚州注册的商业咨询公司——非持牌律师事务所或金融机构。我们的服务帮助客户遵守美国联邦和州法规。",
              es: "Gloyce LLC es una firma de consultoría empresarial registrada en California, EE.UU. — no es un bufete de abogados ni una institución financiera con licencia. Nuestros servicios ayudan a los clientes a cumplir con las regulaciones de EE.UU.",
              id: "Gloyce LLC adalah perusahaan konsultan bisnis terdaftar di California, AS — bukan firma hukum berlisensi atau lembaga keuangan. Layanan kami membantu klien mematuhi peraturan federal dan negara bagian AS.",
            })}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">{t({ vi: "Bảo mật", en: "Privacy", zh: "隐私政策", es: "Privacidad", id: "Privasi" })}</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">{t({ vi: "Điều khoản", en: "Terms", zh: "条款", es: "Términos", id: "Syarat" })}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
