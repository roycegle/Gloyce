import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check } from "lucide-react";

export default async function BankAccountPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";
  const banks = [
    { name: "Mercury", desc: isVi ? "Tốt nhất cho startup Mỹ. USD, không phí hàng tháng, API-first." : "Best for US startups. USD, no monthly fees, API-first.", tags: ["USD", "US LLC", "Free"] },
    { name: "Wise Business", desc: isVi ? "Đa tiền tệ. USD, EUR, GBP, SGD, VND. Tỷ giá tốt nhất." : "Multi-currency. USD, EUR, GBP, SGD, VND. Best exchange rates.", tags: ["Multi-currency", "Any entity", "Low fees"] },
    { name: "Airwallex", desc: isVi ? "Phù hợp cho e-commerce & cross-border payments. API mạnh." : "Great for e-commerce & cross-border payments. Strong API.", tags: ["USD/SGD/HKD", "E-commerce", "API"] },
    { name: "Relay", desc: isVi ? "Thay thế Mercury, ổn định hơn cho LLC Wyoming." : "Mercury alternative, more stable for Wyoming LLCs.", tags: ["USD", "US LLC", "FDIC insured"] },
  ];
  return (
    <main>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,150,12,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              🏦 {isVi ? "Mở tài khoản ngân hàng" : "Business bank account"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi
                ? <><span className="text-gold-gradient">Tài khoản ngân hàng</span> quốc tế cho công ty của bạn</>
                : <><span className="text-gold-gradient">International bank account</span> for your company</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {isVi
                ? "Mở tài khoản Mercury, Wise, Airwallex hoặc Relay 100% online — không cần đến Mỹ hay Singapore. Gloyce hỗ trợ toàn bộ quy trình và kết nối với ngân hàng đối tác."
                : "Open Mercury, Wise, Airwallex or Relay accounts 100% online — no in-person visit required. Gloyce guides the entire process and connects with partner banks."}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
              {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {banks.map(bank => (
              <div key={bank.name} className="bg-ink-800 border border-ink-600 rounded-2xl p-6 hover:border-gold/30 transition-all">
                <h3 className="font-bold text-foreground text-lg mb-2">{bank.name}</h3>
                <p className="text-sm text-ink-300 mb-4">{bank.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {bank.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-ink-600 text-ink-300">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-ink-800 border border-gold/20 rounded-2xl p-8">
            <h2 className="font-bold text-foreground text-xl mb-4">{isVi ? "Điều kiện để mở tài khoản" : "Account opening requirements"}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(isVi
                ? ["Công ty đã thành lập hợp lệ (LLC/Pte Ltd/Limited)","EIN (đối với US LLC) hoặc mã số thuế tương đương","Hộ chiếu còn hạn của thành viên/giám đốc","Operating Agreement hoặc M&AA","Certificate of Incorporation","Địa chỉ thực tế (Gloyce cung cấp nếu cần)"]
                : ["Valid incorporated company (LLC/Pte Ltd/Limited)","EIN (for US LLC) or equivalent tax ID","Valid passport of members/directors","Operating Agreement or M&AA","Certificate of Incorporation","Physical address (Gloyce provides if needed)"]
              ).map(r => (
                <div key={r} className="flex items-start gap-2 text-sm text-ink-200">
                  <Check size={14} className="text-gold mt-0.5 shrink-0" /> {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
