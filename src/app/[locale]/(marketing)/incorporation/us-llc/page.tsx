import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Check, Clock, DollarSign, FileText, Shield, Zap, ChevronDown } from "lucide-react";

export default async function USLLCPage() {
  const locale = await getLocale();
  const isVi = locale === "vi";

  const steps = isVi
    ? [
        { title: "Chọn bang & đặt tên", desc: "Tư vấn lựa chọn Delaware hay Wyoming. Kiểm tra tên công ty và đặt trước.", time: "Ngày 1" },
        { title: "Nộp hồ sơ thành lập", desc: "Gloyce nộp Articles of Organization với Registered Agent tại bang được chọn.", time: "Ngày 1–2" },
        { title: "Nhận EIN từ IRS", desc: "Đăng ký Employer Identification Number — mã số thuế liên bang Mỹ.", time: "Ngày 3–7" },
        { title: "Mở tài khoản ngân hàng", desc: "Mercury, Relay hoặc ngân hàng đối tác — mở 100% online, không cần đến Mỹ.", time: "Ngày 5–10" },
        { title: "Nhận hồ sơ hoàn chỉnh", desc: "Certificate of Formation, Operating Agreement, EIN letter — giao đủ bộ.", time: "Ngày 10–14" },
      ]
    : [
        { title: "Choose state & name", desc: "Delaware vs. Wyoming consultation. Company name check and reservation.", time: "Day 1" },
        { title: "File formation documents", desc: "Gloyce files the Articles of Organization with a Registered Agent in your chosen state.", time: "Day 1–2" },
        { title: "Obtain EIN from IRS", desc: "Employer Identification Number — your US federal tax ID.", time: "Day 3–7" },
        { title: "Open a bank account", desc: "Mercury, Relay or a partner bank — 100% online, no US visit required.", time: "Day 5–10" },
        { title: "Receive full package", desc: "Certificate of Formation, Operating Agreement, EIN letter — fully delivered.", time: "Day 10–14" },
      ];

  const features = isVi
    ? [
        { icon: Clock, title: "7–14 ngày", desc: "Thời gian xử lý trung bình từ khi đặt hàng đến khi nhận hồ sơ" },
        { icon: DollarSign, title: "Giá trọn gói rõ ràng", desc: "Không phí ẩn. Bao gồm phí bang, Registered Agent năm đầu và EIN" },
        { icon: Shield, title: "100% online", desc: "Không cần đến Mỹ, không cần SSN/ITIN — hoàn toàn từ xa" },
        { icon: FileText, title: "Form 5472 & BOI Report", desc: "Gloyce lo toàn bộ nghĩa vụ báo cáo IRS bắt buộc cho LLC nước ngoài" },
        { icon: Zap, title: "Tiếng Việt toàn trình", desc: "Hỗ trợ bằng tiếng Việt từ tư vấn đến nhận hồ sơ" },
        { icon: Check, title: "Tuân thủ từ ngày đầu", desc: "Operating Agreement, Registered Agent và filing cơ bản được setup đúng từ đầu" },
      ]
    : [
        { icon: Clock, title: "7–14 days", desc: "Average processing time from order to document delivery" },
        { icon: DollarSign, title: "Transparent flat fee", desc: "No hidden charges. Includes state fee, first-year Registered Agent and EIN" },
        { icon: Shield, title: "100% remote", desc: "No US visit required, no SSN/ITIN needed" },
        { icon: FileText, title: "Form 5472 & BOI Report", desc: "Gloyce handles all mandatory IRS reporting obligations for foreign-owned LLCs" },
        { icon: Zap, title: "Vietnamese support", desc: "Full Vietnamese-language support from consultation to document delivery" },
        { icon: Check, title: "Compliant from day one", desc: "Operating Agreement, Registered Agent and core filings set up correctly from the start" },
      ];

  const faqs = isVi
    ? [
        { q: "Người Việt Nam có thể mở LLC Mỹ không?", a: "Có. Người nước ngoài được phép thành lập và sở hữu 100% LLC tại Mỹ mà không cần visa, thẻ xanh hay SSN. LLC thuộc sở hữu nước ngoài cần nộp Form 5472 hàng năm với IRS — Gloyce lo toàn bộ phần này." },
        { q: "Delaware và Wyoming khác nhau thế nào?", a: "Delaware được ưu tiên nếu bạn muốn huy động vốn VC/angel investor — hệ thống luật công ty phát triển nhất Mỹ. Wyoming rẻ hơn (phí bang thấp), bảo mật thông tin tốt hơn, phù hợp cho công ty gia đình hoặc không có kế hoạch gọi vốn." },
        { q: "EIN là gì và tôi có cần không?", a: "EIN (Employer Identification Number) là mã số thuế liên bang Mỹ, tương đương mã số thuế doanh nghiệp tại Việt Nam. Bạn cần EIN để mở tài khoản ngân hàng Mỹ, khai báo thuế, và ký hợp đồng với Amazon/Stripe/PayPal." },
        { q: "Sau khi thành lập tôi cần làm gì hàng năm?", a: "LLC Delaware cần nộp Annual Franchise Tax (~$300/năm) trước ngày 1/6. Nếu có doanh thu, bạn cần nộp Form 1065 hoặc khai báo thuế cá nhân. Gloyce cung cấp dịch vụ kế toán & compliance hàng năm để lo phần này cho bạn." },
      ]
    : [
        { q: "Can Vietnamese nationals open a US LLC?", a: "Yes. Non-US residents can own 100% of a US LLC without a visa, green card or SSN. Foreign-owned LLCs must file Form 5472 annually with the IRS — Gloyce handles all of this for you." },
        { q: "Delaware vs Wyoming — what's the difference?", a: "Delaware is preferred for VC/angel fundraising — it has the most developed corporate law in the US. Wyoming is cheaper (lower state fees), more private, and better suited for family businesses or those without fundraising plans." },
        { q: "What is an EIN and do I need one?", a: "An EIN (Employer Identification Number) is the US federal tax ID — equivalent to a Vietnamese business tax code. You need it to open a US bank account, file taxes, and sign contracts with Amazon/Stripe/PayPal." },
        { q: "What annual obligations does an LLC have?", a: "Delaware LLCs must pay the Annual Franchise Tax (~$300/year) by June 1. If you have revenue, you need to file Form 1065 or include it in personal tax returns. Gloyce's accounting & compliance service handles all of this for you." },
      ];

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,150,12,0.10)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold-bg mb-5 text-xs font-medium text-gold">
              {isVi ? "Thành lập công ty" : "Incorporation"} / {isVi ? "LLC tại Mỹ" : "US LLC"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {isVi
                ? <>Thành lập <span className="text-gold-gradient">LLC Mỹ</span> cho doanh nghiệp Việt Nam</>
                : <>Open a <span className="text-gold-gradient">US LLC</span> as a Vietnamese business</>}
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              {isVi
                ? "Delaware hoặc Wyoming LLC — trọn gói từ hồ sơ thành lập, EIN, tài khoản ngân hàng đến Form 5472 & BOI Report. 100% online, không cần đến Mỹ."
                : "Delaware or Wyoming LLC — complete package including formation documents, EIN, bank account and Form 5472 & BOI Report. 100% remote, no US visit required."}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
                {isVi ? "Bắt đầu ngay" : "Get started"} <ArrowRight size={15} />
              </Link>
              <Link href="/contact?tab=call" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ink-600 text-foreground text-sm hover:bg-ink-800 transition-all">
                {isVi ? "Đặt lịch tư vấn" : "Schedule a call"}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-ink-300">
              {[isVi ? "Xử lý trong 7–14 ngày" : "7–14 day processing", isVi ? "Giá trọn gói từ $499" : "From $499 all-in", isVi ? "Hỗ trợ tiếng Việt" : "Vietnamese support"].map(f => (
                <span key={f} className="flex items-center gap-1.5"><Check size={14} className="text-gold" />{f}</span>
              ))}
            </div>
          </div>
          {/* Price card */}
          <div className="bg-ink-800 border border-gold/20 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-ink-400 mb-1">{isVi ? "Trọn gói từ" : "All-inclusive from"}</p>
            <p className="text-5xl font-black text-foreground mb-1">$499</p>
            <p className="text-sm text-ink-400 mb-6">USD · {isVi ? "thanh toán một lần" : "one-time payment"}</p>
            <div className="space-y-3 mb-6">
              {(isVi
                ? ["Phí bang Delaware/Wyoming","Registered Agent (năm đầu)","EIN từ IRS","Operating Agreement chuẩn","Certificate of Formation","Hỗ trợ tiếng Việt trọn trình","Form 5472 & BOI Report cơ bản"]
                : ["State filing fee (Delaware/Wyoming)","First-year Registered Agent","EIN from IRS","Standard Operating Agreement","Certificate of Formation","Full Vietnamese-language support","Form 5472 & BOI Report basics"]
              ).map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-ink-200">
                  <Check size={15} className="text-emerald-400 shrink-0" /> {f}
                </div>
              ))}
            </div>
            <Link href="/contact" className="block text-center py-3 rounded-xl bg-gold text-ink-900 font-semibold text-sm hover:bg-gold-light transition-all">
              {isVi ? "Bắt đầu thành lập" : "Start incorporation"}
            </Link>
            <p className="text-xs text-ink-500 text-center mt-3">{isVi ? "Không cần thẻ tín dụng để đặt lịch tư vấn" : "No credit card required to schedule a call"}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-ink-800 border border-ink-600 rounded-xl p-5">
                  <Icon className="w-5 h-5 text-gold mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-300">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="py-20 border-t border-ink-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">{isVi ? "QUY TRÌNH" : "PROCESS"}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">
            {isVi ? "Từ đặt hàng đến nhận hồ sơ trong 14 ngày" : "From order to documents in 14 days"}
          </h2>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 pb-8 last:pb-0 group">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center text-sm font-bold text-gold shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-ink-700 mt-2" />}
                </div>
                <div className="pt-1.5 pb-6">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">{step.time}</span>
                  </div>
                  <p className="text-sm text-ink-300">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-ink-700 bg-ink-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">FAQ</p>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {isVi ? "Câu hỏi thường gặp" : "Frequently asked questions"}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-ink-800 border border-ink-600 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-ink-700/50 rounded-xl transition-colors">
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <ChevronDown size={16} className="text-ink-400 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-ink-300 leading-relaxed border-t border-ink-700 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-ink-700">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {isVi ? "Sẵn sàng mở LLC Mỹ?" : "Ready to open your US LLC?"}
          </h2>
          <p className="text-ink-300 mb-6">
            {isVi ? "Đặt lịch tư vấn miễn phí — đội ngũ Gloyce sẽ liên hệ trong vòng 24 giờ." : "Book a free consultation — the Gloyce team will contact you within 24 hours."}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold text-ink-900 font-semibold hover:bg-gold-light transition-all shadow-[0_0_24px_rgba(201,150,12,0.25)]">
            {isVi ? "Đặt lịch tư vấn miễn phí" : "Book a free consultation"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
