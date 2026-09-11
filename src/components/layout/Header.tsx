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

type L = { vi: string; en: string; zh: string; es: string; id: string };

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English",    flag: "🇺🇸" },
  { code: "zh", label: "中文",        flag: "🇨🇳" },
  { code: "es", label: "Español",    flag: "🇪🇸" },
  { code: "id", label: "Indonesia",  flag: "🇮🇩" },
];

const NAV = [
  {
    label: { vi: "Thành lập", en: "Incorporate", zh: "成立公司", es: "Incorporación", id: "Pembentukan" } as L,
    icon: Building2,
    groups: [
      {
        title: { vi: "Theo quốc gia", en: "By jurisdiction", zh: "按司法管辖区", es: "Por jurisdicción", id: "Berdasarkan yurisdiksi" } as L,
        items: [
          { icon: Landmark,  label: { vi: "LLC tại Mỹ", en: "US LLC", zh: "美国LLC", es: "LLC en EE.UU.", id: "LLC di AS" } as L, desc: { vi: "Thành lập LLC Delaware/Wyoming", en: "Delaware or Wyoming LLC formation", zh: "特拉华州或怀俄明州LLC", es: "LLC en Delaware o Wyoming", id: "LLC Delaware atau Wyoming" } as L, href: "/incorporation/us-llc" },
          { icon: Globe,     label: { vi: "Singapore Pte Ltd", en: "Singapore Pte Ltd", zh: "新加坡私人有限公司", es: "Singapore Pte Ltd", id: "Singapore Pte Ltd" } as L, desc: { vi: "Công ty tư nhân tại Singapore", en: "Private limited company in Singapore", zh: "新加坡私人有限公司", es: "Sociedad privada en Singapur", id: "Perusahaan swasta di Singapura" } as L, href: "/incorporation/singapore" },
          { icon: Building2, label: { vi: "Hong Kong Limited", en: "Hong Kong Limited", zh: "香港有限公司", es: "Hong Kong Limited", id: "Hong Kong Limited" } as L, desc: { vi: "Công ty TNHH tại Hồng Kông", en: "Limited company in Hong Kong", zh: "香港有限公司", es: "Empresa limitada en Hong Kong", id: "Perusahaan terbatas di Hong Kong" } as L, href: "/incorporation/hong-kong" },
        ],
      },
      {
        title: { vi: "Dịch vụ liên quan", en: "Related services", zh: "相关服务", es: "Servicios relacionados", id: "Layanan terkait" } as L,
        items: [
          { icon: CreditCard, label: { vi: "Mở tài khoản ngân hàng", en: "Business bank account", zh: "开设企业银行账户", es: "Cuenta bancaria empresarial", id: "Rekening bank bisnis" } as L, desc: { vi: "Mercury, Wise, Airwallex", en: "Mercury, Wise, Airwallex", zh: "Mercury, Wise, Airwallex", es: "Mercury, Wise, Airwallex", id: "Mercury, Wise, Airwallex" } as L, href: "/incorporation/bank-account" },
        ],
      },
    ],
    guides: [
      { label: { vi: "Hướng dẫn mở LLC Mỹ 2026", en: "How to open a US LLC 2026", zh: "如何在美国开设LLC 2026", es: "Cómo abrir una LLC en EE.UU. 2026", id: "Cara membuka LLC di AS 2026" } as L, href: "/resources/guides/us-llc" },
      { label: { vi: "So sánh 3 jurisdictions", en: "Compare 3 jurisdictions", zh: "比较3个司法管辖区", es: "Comparar 3 jurisdicciones", id: "Bandingkan 3 yurisdiksi" } as L, href: "/resources/guides/compare" },
      { label: { vi: "Checklist trước khi thành lập", en: "Pre-incorporation checklist", zh: "成立前检查清单", es: "Lista de verificación previa", id: "Daftar periksa pra-pendirian" } as L, href: "/resources/guides/checklist" },
    ],
  },
  {
    label: { vi: "Kế toán", en: "Accounting", zh: "会计", es: "Contabilidad", id: "Akuntansi" } as L,
    icon: Calculator,
    groups: [
      {
        title: { vi: "Dịch vụ", en: "Services", zh: "服务", es: "Servicios", id: "Layanan" } as L,
        items: [
          { icon: Calculator, label: { vi: "Dịch vụ kế toán", en: "Accounting services", zh: "会计服务", es: "Servicios contables", id: "Layanan akuntansi" } as L, desc: { vi: "Kế toán chuyên gia + phần mềm", en: "Expert accountants + software", zh: "专业会计师+软件", es: "Contadores expertos + software", id: "Akuntan ahli + perangkat lunak" } as L, href: "/accounting" },
          { icon: Zap,        label: { vi: "Kế toán cho Seller TMĐT", en: "Ecommerce accounting", zh: "电商会计", es: "Contabilidad ecommerce", id: "Akuntansi ecommerce" } as L, desc: { vi: "Amazon, Shopee, TikTok Shop", en: "Amazon, Shopee, TikTok Shop", zh: "Amazon, Shopee, TikTok Shop", es: "Amazon, Shopee, TikTok Shop", id: "Amazon, Shopee, TikTok Shop" } as L, href: "/accounting/ecommerce" },
          { icon: BookOpen,   label: { vi: "Sổ sách kế toán", en: "Bookkeeping", zh: "簿记", es: "Teneduría de libros", id: "Pembukuan" } as L, desc: { vi: "Ghi chép đầy đủ hàng tháng", en: "Full monthly bookkeeping", zh: "完整每月簿记", es: "Teneduría mensual completa", id: "Pembukuan bulanan lengkap" } as L, href: "/accounting/bookkeeping" },
          { icon: Receipt,    label: { vi: "Hóa đơn", en: "Invoicing", zh: "发票", es: "Facturación", id: "Faktur" } as L, desc: { vi: "Tạo & gửi hóa đơn nhanh chóng", en: "Create & send invoices fast", zh: "快速创建和发送发票", es: "Crea y envía facturas rápido", id: "Buat & kirim faktur cepat" } as L, href: "/accounting/invoicing" },
        ],
      },
      {
        title: { vi: "Tích hợp & Công cụ", en: "Integrations & Tools", zh: "集成与工具", es: "Integraciones y Herramientas", id: "Integrasi & Alat" } as L,
        items: [
          { icon: BarChart3, label: { vi: "Báo cáo tài chính", en: "Financial reporting", zh: "财务报告", es: "Informes financieros", id: "Laporan keuangan" } as L, desc: { vi: "Theo dõi hiệu quả kinh doanh", en: "Monitor business performance", zh: "监控业务绩效", es: "Monitorea el rendimiento", id: "Pantau kinerja bisnis" } as L, href: "/accounting/reporting" },
          { icon: FileText,  label: { vi: "Tích hợp ngân hàng", en: "Bank integration", zh: "银行集成", es: "Integración bancaria", id: "Integrasi bank" } as L, desc: { vi: "Kết nối tự động mọi tài khoản", en: "Auto-sync all bank accounts", zh: "自动同步所有银行账户", es: "Sincroniza todas las cuentas", id: "Sinkronisasi semua rekening" } as L, href: "/accounting/bank-integration" },
        ],
      },
    ],
    guides: [
      { label: { vi: "Thuế doanh nghiệp Mỹ cho người châu Á", en: "US business tax for Asian founders", zh: "亚洲创始人的美国企业税指南", es: "Impuestos empresariales en EE.UU. para fundadores asiáticos", id: "Pajak bisnis AS untuk pendiri Asia" } as L, href: "/resources/guides/us-tax" },
      { label: { vi: "Form 5472 là gì?", en: "What is Form 5472?", zh: "什么是表格5472?", es: "¿Qué es el Formulario 5472?", id: "Apa itu Form 5472?" } as L, href: "/resources/guides/form-5472" },
      { label: { vi: "10 phần mềm kế toán tốt nhất", en: "10 best accounting tools", zh: "10款最佳会计工具", es: "10 mejores herramientas contables", id: "10 alat akuntansi terbaik" } as L, href: "/resources/guides/tools" },
    ],
  },
  {
    label: { vi: "Tuân thủ", en: "Compliance", zh: "合规", es: "Cumplimiento", id: "Kepatuhan" } as L,
    icon: FileCheck,
    groups: [
      {
        title: { vi: "Dịch vụ", en: "Services", zh: "服务", es: "Servicios", id: "Layanan" } as L,
        items: [
          { icon: ShieldCheck, label: { vi: "Thư ký công ty", en: "Company secretary", zh: "公司秘书", es: "Secretaría corporativa", id: "Sekretaris perusahaan" } as L, desc: { vi: "Hồ sơ, nghị quyết, đăng ký", en: "Filings, resolutions, registers", zh: "文件、决议、登记", es: "Expedientes, resoluciones, registros", id: "Arsip, resolusi, daftar" } as L, href: "/compliance/secretary" },
          { icon: FileCheck,   label: { vi: "Khai báo thuế & báo cáo", en: "US Filing & Reporting", zh: "美国申报与报告", es: "Declaraciones en EE.UU.", id: "Pelaporan di AS" } as L, desc: { vi: "Form 5472, BOI Report, Annual Tax", en: "Form 5472, BOI Report, Annual Tax", zh: "Form 5472, BOI报告, 年度税务", es: "Form 5472, BOI Report, Impuesto anual", id: "Form 5472, BOI Report, Pajak tahunan" } as L, href: "/compliance/odi" },
          { icon: TrendingUp,  label: { vi: "Chuyển tiền quốc tế", en: "International transfers", zh: "国际汇款", es: "Transferencias internacionales", id: "Transfer internasional" } as L, desc: { vi: "Wire transfer, phân phối lợi nhuận", en: "Wire transfers, profit distribution", zh: "电汇、利润分配", es: "Transferencias, distribución de beneficios", id: "Transfer kawat, distribusi laba" } as L, href: "/compliance/repatriation" },
        ],
      },
    ],
    guides: [
      { label: { vi: "Rủi ro pháp lý khi mở LLC tại Mỹ", en: "Legal risks of a US LLC", zh: "美国LLC的法律风险", es: "Riesgos legales de una LLC en EE.UU.", id: "Risiko hukum LLC di AS" } as L, href: "/resources/guides/legal-risk" },
      { label: { vi: "Form 5472 là gì?", en: "What is Form 5472?", zh: "什么是表格5472?", es: "¿Qué es el Formulario 5472?", id: "Apa itu Form 5472?" } as L, href: "/resources/guides/form-5472" },
    ],
  },
];

const RESOURCES_ITEMS = [
  { icon: Newspaper, label: { vi: "Blog", en: "Blog", zh: "博客", es: "Blog", id: "Blog" } as L, href: "/resources/blog" },
  { icon: BookOpen,  label: { vi: "Hướng dẫn", en: "Guides", zh: "指南", es: "Guías", id: "Panduan" } as L, href: "/resources/guides" },
  { icon: Users,     label: { vi: "Câu chuyện khách hàng", en: "Customer stories", zh: "客户案例", es: "Historias de clientes", id: "Kisah pelanggan" } as L, href: "/resources/stories" },
  { icon: HelpCircle,label: { vi: "Câu hỏi thường gặp", en: "FAQ", zh: "常见问题", es: "Preguntas frecuentes", id: "FAQ" } as L, href: "/resources/faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];
  const t = (l: L) => (l as Record<string, string>)[locale] ?? l.en;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code as "vi" | "en" | "zh" | "es" | "id" });
    setLangOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold/10 border-b border-gold/20 text-center py-2 px-4 text-xs text-gold">
        {t({ vi: "🌟 Gloyce được vinh danh Top Fintech châu Á 2026 — ", en: "🌟 Gloyce named Top Asia Fintech 2026 — ", zh: "🌟 Gloyce荣获2026年亚洲顶级金融科技奖 — ", es: "🌟 Gloyce premiado Top Fintech Asia 2026 — ", id: "🌟 Gloyce dinobatkan Top Fintech Asia 2026 — " })}
        <Link href="/about" className="underline underline-offset-2 hover:text-gold-light transition-colors">
          {t({ vi: "Đọc thêm", en: "Read more", zh: "了解更多", es: "Leer más", id: "Baca selengkapnya" })}
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
              const itemKey = item.label.en;
              const isActive = open === itemKey;
              return (
                <div
                  key={itemKey}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(itemKey)}
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
                    {t(item.label)}
                    <ChevronDown
                      size={13}
                      className={cn("transition-transform duration-200 text-ink-400", isActive && "rotate-180")}
                    />
                  </button>

                  {/* Mega dropdown */}
                  {isActive && (
                    <div
                      className="absolute top-full left-0 mt-2 w-max min-w-[520px] bg-ink-800 border border-ink-600 rounded-2xl shadow-2xl shadow-black/60 p-5 grid gap-4"
                      style={{ gridTemplateColumns: item.groups.length > 1 ? "1fr 1fr" : "1fr" }}
                      onMouseEnter={() => handleMouseEnter(itemKey)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Service groups */}
                      <div className="space-y-4">
                        {item.groups.map((group) => (
                          <div key={group.title.en}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-2 px-2">
                              {t(group.title)}
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
                                        {t(navItem.label)}
                                      </p>
                                      <p className="text-xs text-ink-300 mt-0.5">
                                        {t(navItem.desc)}
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
                            {t({ vi: "Hướng dẫn chuyên gia", en: "Expert guides", zh: "专家指南", es: "Guías de expertos", id: "Panduan ahli" })}
                          </p>
                          <div className="space-y-1">
                            {item.guides.map((g) => (
                              <Link
                                key={g.href}
                                href={g.href}
                                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ink-700 text-sm text-ink-200 hover:text-foreground transition-colors group"
                              >
                                <ArrowRight size={13} className="text-gold shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                {t(g.label)}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/resources/guides"
                            className="mt-3 flex items-center gap-1 px-2 text-xs text-gold hover:text-gold-light font-medium transition-colors"
                          >
                            {t({ vi: "Xem tất cả hướng dẫn", en: "Explore all guides", zh: "查看所有指南", es: "Ver todas las guías", id: "Lihat semua panduan" })}
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
              {t({ vi: "Bảng giá", en: "Pricing", zh: "价格", es: "Precios", id: "Harga" })}
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
                {t({ vi: "Tài nguyên", en: "Resources", zh: "资源", es: "Recursos", id: "Sumber Daya" })}
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
                        {t(r.label)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Language picker */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-300 hover:text-foreground hover:bg-ink-800 transition-all border border-ink-600"
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="hidden xl:inline">{currentLang.label}</span>
                <ChevronDown size={11} className={cn("transition-transform text-ink-500", langOpen && "rotate-180")} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-ink-800 border border-ink-600 rounded-xl shadow-2xl shadow-black/60 py-1.5 z-50">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left",
                        locale === lang.code
                          ? "text-gold bg-gold/8"
                          : "text-ink-200 hover:text-foreground hover:bg-ink-700"
                      )}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {locale === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/auth/login"
              className="px-3 py-1.5 rounded-lg text-sm text-ink-200 hover:text-foreground hover:bg-ink-800 transition-all"
            >
              {t({ vi: "Đăng nhập", en: "Login", zh: "登录", es: "Iniciar sesión", id: "Masuk" })}
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold text-ink-900 hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(201,150,12,0.25)]"
            >
              {t({ vi: "Bắt đầu", en: "Get started", zh: "立即开始", es: "Comenzar", id: "Mulai" })}
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
                const itemKey = item.label.en;
                const isExpanded = mobileExpanded === itemKey;
                return (
                  <div key={itemKey}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : itemKey)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-ink-800 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Icon size={16} className="text-gold" />
                        {t(item.label)}
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
                            {t(navItem.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link href="/pricing" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {t({ vi: "Bảng giá", en: "Pricing", zh: "价格", es: "Precios", id: "Harga" })}
              </Link>
              <Link href="/resources" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {t({ vi: "Tài nguyên", en: "Resources", zh: "资源", es: "Recursos", id: "Sumber Daya" })}
              </Link>
              <Link href="/about" className="block px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-ink-800 transition-colors">
                {t({ vi: "Về chúng tôi", en: "About", zh: "关于我们", es: "Acerca de nosotros", id: "Tentang kami" })}
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-ink-700 flex flex-col gap-2">
              <div className="grid grid-cols-5 gap-1.5 mb-1">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={cn(
                      "flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-medium transition-colors",
                      locale === lang.code
                        ? "bg-gold/15 text-gold border border-gold/30"
                        : "text-ink-400 hover:text-foreground hover:bg-ink-800 border border-transparent"
                    )}
                  >
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <span className="truncate w-full text-center px-0.5">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <Link href="/auth/login" className="text-center py-2.5 rounded-xl border border-ink-600 text-sm text-foreground hover:bg-ink-800 transition-colors">
                {t({ vi: "Đăng nhập", en: "Login", zh: "登录", es: "Iniciar sesión", id: "Masuk" })}
              </Link>
              <Link href="/contact" className="text-center py-2.5 rounded-xl bg-gold text-ink-900 text-sm font-semibold hover:bg-gold-light transition-colors">
                {t({ vi: "Bắt đầu ngay", en: "Get started", zh: "立即开始", es: "Comenzar ahora", id: "Mulai sekarang" })}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
