import { Link } from "@/i18n/routing";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  incorporate: {
    title: "Thành lập",
    titleEn: "Incorporate",
    links: [
      { label: "LLC tại Mỹ", labelEn: "US LLC", href: "/incorporation/us-llc" },
      { label: "Singapore Pte Ltd", labelEn: "Singapore Pte Ltd", href: "/incorporation/singapore" },
      { label: "Hong Kong Limited", labelEn: "Hong Kong Limited", href: "/incorporation/hong-kong" },
      { label: "Mở tài khoản ngân hàng", labelEn: "Business bank account", href: "/incorporation/bank-account" },
    ],
  },
  accounting: {
    title: "Kế toán",
    titleEn: "Accounting",
    links: [
      { label: "Dịch vụ kế toán", labelEn: "Accounting services", href: "/accounting" },
      { label: "Kế toán cho Seller TMĐT", labelEn: "Ecommerce accounting", href: "/accounting/ecommerce" },
      { label: "Sổ sách kế toán", labelEn: "Bookkeeping", href: "/accounting/bookkeeping" },
      { label: "Hóa đơn", labelEn: "Invoicing", href: "/accounting/invoicing" },
      { label: "Báo cáo tài chính", labelEn: "Financial reporting", href: "/accounting/reporting" },
    ],
  },
  compliance: {
    title: "Tuân thủ",
    titleEn: "Compliance",
    links: [
      { label: "Thư ký công ty", labelEn: "Company secretary", href: "/compliance/secretary" },
      { label: "Khai báo thuế & báo cáo", labelEn: "US Filing & Reporting", href: "/compliance/odi" },
      { label: "Chuyển tiền quốc tế", labelEn: "International transfers", href: "/compliance/repatriation" },
    ],
  },
  resources: {
    title: "Tài nguyên",
    titleEn: "Resources",
    links: [
      { label: "Blog", labelEn: "Blog", href: "/resources/blog" },
      { label: "Hướng dẫn", labelEn: "Guides", href: "/resources/guides" },
      { label: "Câu chuyện khách hàng", labelEn: "Customer stories", href: "/resources/stories" },
      { label: "FAQ", labelEn: "FAQ", href: "/resources/faq" },
      { label: "Bảng giá", labelEn: "Pricing", href: "/pricing" },
    ],
  },
  company: {
    title: "Công ty",
    titleEn: "Company",
    links: [
      { label: "Về Gloyce", labelEn: "About Gloyce", href: "/about" },
      { label: "Đội ngũ", labelEn: "Our team", href: "/about#team" },
      { label: "Đối tác", labelEn: "Partners", href: "/about#partners" },
      { label: "Liên hệ", labelEn: "Contact us", href: "/contact" },
    ],
  },
};

export async function Footer({ locale }: { locale: string }) {
  const isVi = locale === "vi";
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
              {isVi
                ? "Nền tảng giúp doanh nghiệp Việt Nam thành lập, vận hành và mở rộng kinh doanh toàn cầu."
                : "Helping Vietnamese businesses incorporate, operate, and expand globally."}
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
          {Object.values(FOOTER_LINKS).map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4">
                {isVi ? col.title : col.titleEn}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-300 hover:text-foreground transition-colors"
                    >
                      {isVi ? l.label : l.labelEn}
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
          <p>© 2024–2026 Gloyce. {isVi ? "Bảo lưu mọi quyền." : "All rights reserved."}</p>
          <p className="text-center max-w-xl leading-relaxed">
            {isVi
              ? "Gloyce LLC là công ty tư vấn doanh nghiệp đăng ký tại California, Hoa Kỳ — không phải văn phòng luật hay tổ chức tài chính được cấp phép. Dịch vụ giúp khách hàng tuân thủ quy định liên bang và tiểu bang Mỹ."
              : "Gloyce LLC is a business consulting firm registered in California, USA — not a licensed law firm or financial institution. Our services help clients comply with applicable US federal and state regulations."}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">{isVi ? "Bảo mật" : "Privacy"}</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">{isVi ? "Điều khoản" : "Terms"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
