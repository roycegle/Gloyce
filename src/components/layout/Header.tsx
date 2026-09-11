"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Building2, Calculator, FileCheck, ChevronDown,
  Menu, X, ArrowRight, Globe, BookOpen, Users, HelpCircle,
  Landmark, CreditCard, BarChart3, Receipt, Zap, FileText,
  ShieldCheck, TrendingUp, Newspaper
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    label: "Thành lập",
    labelEn: "Incorporate",
    icon: Building2,
    groups: [
      {
        title: "Theo quốc gia",
        titleEn: "By jurisdiction",
        items: [
          { icon: Landmark, label: "LLC tại Mỹ", labelEn: "US LLC", desc: "Thành lập LLC Delaware/Wyoming", descEn: "Delaware or Wyoming LLC formation", href: "/incorporation/us-llc" },
          { icon: Globe,    label: "Singapore Pte Ltd", labelEn: "Singapore Pte Ltd", desc: "Công ty tư nhân tại Singapore", descEn: "Private limited company in Singapore", href: "/incorporation/singapore" },
          { icon: Building2,label: "Hong Kong Limited", labelEn: "Hong Kong Limited", desc: "Công ty TNHH tại Hồng Kông", descEn: "Limited company in Hong Kong", href: "/incorporation/hong-kong" },
        ],
      },
      {
        title: "Dịch vụ liên quan",
        titleEn: "Related services",
        items: [
          { icon: CreditCard, label: "Mở tài khoản ngân hàng", labelEn: "Business bank account", desc: "Mercury, Wise, Airwallex", descEn: "Mercury, Wise, Airwallex", href: "/incorporation/bank-account" },
        ],
      },
    ],
    guides: [
      { label: "Hướng dẫn mở LLC Mỹ 2026", labelEn: "How to open a US LLC 2026", href: "/resources/guides/us-llc" },
      { label: "So sánh 3 jurisdictions", labelEn: "Compare 3 jurisdictions", href: "/resources/guides/compare" },
      { label: "Checklist trước khi thành lập", labelEn: "Pre-incorporation checklist", href: "/resources/guides/checklist" },
    ],
  },
  {
    label: "Kế toán",
    labelEn: "Accounting",
    icon: Calculator,
    groups: [
      {
        title: "Dịch vụ",
        titleEn: "Services",
        items: [
          { icon: Calculator,  label: "Dịch vụ kế toán", labelEn: "Accounting services",    desc: "Kế toán chuyên gia + phần mềm", descEn: "Expert accountants + software", href: "/accounting" },
          { icon: Zap,         label: "Kế toán cho Seller TMĐT", labelEn: "Ecommerce accounting", desc: "Amazon, Shopee, TikTok Shop", descEn: "Amazon, Shopee, TikTok Shop",  href: "/accounting/ecommerce" },
          { icon: BookOpen,    label: "Sổ sách kế toán", labelEn: "Bookkeeping",             desc: "Ghi chép đầy đủ hàng tháng", descEn: "Full monthly bookkeeping",        href: "/accounting/bookkeeping" },
          { icon: Receipt,     label: "Hóa đơn", labelEn: "Invoicing",                       desc: "Tạo & gửi hóa đơn nhanh chóng", descEn: "Create & send invoices fast",   href: "/accounting/invoicing" },
        ],
      },
      {
        title: "Tích hợp & Công cụ",
        titleEn: "Integrations & Tools",
        items: [
          { icon: BarChart3,   label: "Báo cáo tài chính", labelEn: "Financial reporting", desc: "Theo dõi hiệu quả kinh doanh", descEn: "Monitor business performance", href: "/accounting/reporting" },
          { icon: FileText,    label: "Tích hợp ngân hàng", labelEn: "Bank integration",  desc: "Kết nối tự động mọi tài khoản", descEn: "Auto-sync all bank accounts",  href: "/accounting/bank-integration" },
        ],
      },
    ],
    guides: [
      { label: "Thuế doanh nghiệp Mỹ cho người Việt", labelEn: "US business tax for Vietnamese", href: "/resources/guides/us-tax" },
      { label: "Form 5472 là gì?", labelEn: "What is Form 5472?", href: "/resources/guides/form-5472" },
      { label: "10 phần mềm kế toán tốt nhất", labelEn: "10 best accounting tools", href: "/resources/guides/tools" },
    ],
  },
  {
    label: "Tuân thủ",
    labelEn: "Compliance",
    icon: FileCheck,
    groups: [
      {
        title: "Dịch vụ",
        titleEn: "Services",
        items: [
          { icon: ShieldCheck, label: "Thư ký công ty", labelEn: "Company secretary",   desc: "Hồ sơ, nghị quyết, đăng ký", descEn: "Filings, resolutions, registers", href: "/compliance/secretary" },
          { icon: FileCheck,   label: "Khai báo ODI", labelEn: "ODI reporting",         desc: "Đăng ký đầu tư ra nước ngoài", descEn: "Outward direct investment reg.", href: "/compliance/odi" },
          { icon: TrendingUp,  label: "Hồi hương lợi nhuận", labelEn: "Profit repatriation", desc: "Tuân thủ quy định NHNN", descEn: "SBV-compliant profit return",    href: "/compliance/repatriation" },
        ],
      },
    ],
    guides: [
      { label: "ODI là gì? Hướng dẫn đầy đủ", labelEn: "What is ODI? Full guide", href: "/resources/guides/odi" },
      { label: "Rủi ro pháp lý khi mở LLC tại Mỹ", labelEn: "Legal risks of US LLC", href: "/resources/guides/legal-risk" },
    ],
  },
];

const RESOURCES_ITEMS = [
  { icon: Newspaper, label: "Blog", labelEn: "Blog", href: "/resources/blog" },
  { icon: BookOpen,  label: "Hướng dẫn", labelEn: "Guides", href: "/resources/guides" },
  { icon: Users,     label: "Câu chuyện khách hàng", labelEn: "Customer stories", href: "/resources/stories" },
  { icon: HelpCircle,label: "Câu hỏi thường gặp", labelEn: "FAQ", href: "/resources/faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVi = locale === "vi";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const toggleLocale = () => {
    router.replace(pathname, { locale: isVi ? "en" : "vi" });
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold/10 border-b border-gold/20 text-center py-2 px-4 text-xs text-gold">
        {isVi
          ? "🌟 Gloyce được vinh danh Top Fintech Việt Nam 2026 — "
          : "🌟 Gloyce named Top Vietnam Fintech 2026 — "}
        <Link href="/about" className="underline underline-offset-2 hover:text-gold-light transition-colors">
          {isVi ? "Đọc thêm" : "Read more"}
        </Link>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-ink-900/95 backdrop-blur-xl border-b border-ink-700 shadow-[0_1px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-ink-900" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">Gloyce</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = open === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "text-foreground bg-ink-700"
                        : "text-ink-200 hover:text-foreground hover:bg-ink-800"
                    )}
                  >
                    <Icon size={15} />
                    {isVi ? item.label : item.labelEn}
                    <ChevronDown
                      size={13}
                      className={cn("transition-transform duration-200 text-ink-400", isActive && "rotate-180")}
                    />
                  </button>

                  {/* Mega dropdown */}
                  {isActive && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[520px] bg-ink-800 border border-ink-600 rounded-2xl shadow-2xl shadow-black/60 p-5 grid gap-4"
                      style={{ gridTemplateColumns: item.groups.length > 1 ? "1fr 1fr" : "1fr" }}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Service groups */}
                      <div className={cn("space-y-4", item.groups.length > 1 ? "col-span-1" : "col-span-1")}>
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-2 px-2">
                              {isVi ? group.title : group.titleEn}
                            </p>
                            <div className="space-y-0.5">
                              {group.items.map((navItem) => {
                                const NavIcon = navItem.icon;
                                return (
                                  <Link
                                    key={navItem.href}
                                    href={navItem.href}
                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-ink-700 transition-colors group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-gold-bg border border-gold/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/10 transition-colors">
                                      <NavIcon size={15} className="text-gold" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                                        {isVi ? navItem.label : navItem.labelEn}
                                      </p>
                                      <p className="text-xs text-ink-300 mt-0.5">
                                        {isVi ? navItem.desc : navItem.descEn}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expert guides */}
                      {item.guides && (
                        <div className="border-l border-ink-600 pl-4">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-2 px-2">
                            {isVi ? "Hướng dẫn chuyên gia" : "Expert guides"}
                          </p>
                          <div className="space-y-1">
                            {item.guides.map((g) => (
                              <Link
                                key={g.href}
                                href={g.href}
                                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ink-700 text-sm text-ink-200 hover:text-foreground transition-colors group"
                              >
                                <ArrowRight size={13} className="text-gold shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                {isVi ? g.label : g.labelEn}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/resources/guides"
                            className="mt-3 flex items-center gap-1 px-2 text-xs text-gold hover:text-gold-light font-medium transition-colors"
                          >
                            {isVi ? "Xem tất cả hướng dẫn" : "Explore all guides"}
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pricing */}
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg text-sm font-medium text-ink-200 hover:text-foreground hover:bg-ink-800 transition-all"
            >
              {isVi ? "Bảng giá" : "Pricing"}
            </Link>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  open === "resources"
                    ? "text-foreground bg-ink-700"
                    : "text-ink-200 hover:text-foreground hover:bg-ink-800"
                )}
              >
                {isVi ? "Tài nguyên" : "Resources"}
                <ChevronDown size={13} className={cn("transition-transform text-ink-400", open === "resources" && "rotate-180")} />
              </button>
              {open === "resources" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-ink-800 border border-ink-600 rounded-2xl shadow-2xl shadow-black/60 p-2"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                >
                  {RESOURCES_ITEMS.map((r) => {
                    const RIcon = r.icon;
                    return (
                      <Link
                        key={r.href}
                        href={r.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-700 text-sm text-ink-200 hover:text-foreground transition-colors"
                      >
                        <RIcon size={15} className="text-ink-400" />
                        {isVi ? r.label : r.labelEn}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLocale}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-300 hover:text-foreground hover:bg-ink-800 transition-all border border-ink-600"
            >
              {isVi ? "EN" : "VI"}
            </button>
            <Link
              href="/auth/login"
              className="px-3 py-1.5 rounded-lg text-sm text-ink-200 hover:text-foreground hover:bg-ink-800 transition-all"
            >
              {isVi ? "Đăng nhập" : "Login"}
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold text-ink-900 hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(201,150,12,0.25)]"
            >
              {isVi ? "Bắt đầu" : "Get started"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-ink-200 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-ink-700 bg-ink-900 px-4 pb-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-1 pt-4">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isExpanded = mobileExpanded === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-ink-800 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Icon size={16} className="text-gold" />
                        {isVi ? item.label : item.labelEn}
                      </span>
                      <ChevronDown size={14} className={cn("text-ink-400 transition-transform", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 pl-4 border-l border-ink-700 space-y-0.5 mb-2">
                        {item.groups.flatMap((g) => g.items).map((navItem) => (
                          <Link
                            key={navItem.href}
                            href={navItem.href}
                            className="block px-3 py-2 text-sm text-ink-200 hover:text-foreground rounded-lg hover:bg-ink-800 transition-colors"
                          >
                            {isVi ? navItem.label : navItem.labelEn}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link href="/pricing" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {isVi ? "Bảng giá" : "Pricing"}
              </Link>
              <Link href="/resources" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {isVi ? "Tài nguyên" : "Resources"}
              </Link>
              <Link href="/about" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {isVi ? "Về chúng tôi" : "About"}
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-ink-700 flex flex-col gap-2">
              <button onClick={toggleLocale} className="text-sm text-ink-300 text-center py-2">
                {isVi ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </button>
              <Link href="/auth/login" className="text-center py-2.5 rounded-xl border border-ink-600 text-sm text-foreground hover:bg-ink-800 transition-colors">
                {isVi ? "Đăng nhập" : "Login"}
              </Link>
              <Link href="/contact" className="text-center py-2.5 rounded-xl bg-gold text-ink-900 text-sm font-semibold hover:bg-gold-light transition-colors">
                {isVi ? "Bắt đầu ngay" : "Get started"}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
