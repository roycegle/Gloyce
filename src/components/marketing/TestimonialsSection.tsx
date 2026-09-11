import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Gloyce helped us set up a Delaware LLC, get our EIN, and connect Stripe in under two weeks. The team was professional and available every step of the way.",
    name: "Alex Chen",
    role: "CEO & Founder",
    company: "Amazon Seller — 6 years",
    avatar: "AC",
  },
  {
    quote:
      "We used to coordinate three separate vendors: a US attorney, an accountant, and a bank. Gloyce consolidated everything into one relationship — massive time and cost savings.",
    name: "Priya Sharma",
    role: "Founder",
    company: "TikTok Shop International",
    avatar: "PS",
  },
  {
    quote:
      "I was especially impressed by how Gloyce handled our Form 5472 and BOI Report filings — everything was on time and I had zero IRS anxiety.",
    name: "David Park",
    role: "Director",
    company: "Cross-border Payment Startup",
    avatar: "DP",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="py-20 lg:py-28 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-3 text-navy-400">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-4"
            >
              <Quote className="w-8 h-8 text-gold/30" />
              <p className="text-sm text-navy-300 leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-navy-700">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-sm font-bold text-gold">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-navy-400">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
