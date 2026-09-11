import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
export default async function Page() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-4">Coming soon</p>
        <h1 className="text-3xl font-bold text-foreground mb-4">{isVi ? "Trang này đang được xây dựng" : "This page is coming soon"}</h1>
        <p className="text-ink-300 mb-8">{isVi ? "Chúng tôi đang chuẩn bị nội dung chất lượng cao. Theo dõi để không bỏ lỡ." : "We are preparing high-quality content. Follow us to stay updated."}</p>
        <Link href="/resources" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium">
          <ArrowLeft size={14} />{isVi ? "Quay lại Tài nguyên" : "Back to Resources"}
        </Link>
      </div>
    </main>
  );
}
