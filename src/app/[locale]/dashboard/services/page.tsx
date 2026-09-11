import { MOCK_SERVICES } from "@/data/mock/services";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, AlertCircle, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";

const STATUS_CONFIG = {
  active: { label: "Đang hoạt động", variant: "success" as const },
  pending: { label: "Chờ xem xét", variant: "warning" as const },
  action_required: { label: "Cần hành động", variant: "danger" as const },
  complete: { label: "Hoàn thành", variant: "default" as const },
};

const TIER_LABELS = {
  execute: "EXECUTE",
  operate: "OPERATE",
  strategize: "STRATEGIZE",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dịch vụ của tôi</h2>
        <p className="text-sm text-navy-400 mt-0.5">
          Theo dõi tiến trình tất cả dịch vụ đang hoạt động.
        </p>
      </div>

      {MOCK_SERVICES.map((service) => {
        const cfg = STATUS_CONFIG[service.status];
        const completedSteps = service.steps.filter((s) => s.status === "complete").length;
        const totalSteps = service.steps.length;
        const pct = Math.round((completedSteps / totalSteps) * 100);

        return (
          <div
            key={service.id}
            className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="gold" className="text-[10px] tracking-widest">
                    {TIER_LABELS[service.tier]}
                  </Badge>
                  <Badge variant={cfg.variant} className="text-xs">
                    {cfg.label}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                <p className="text-xs text-navy-500 mt-0.5">
                  Bắt đầu: {formatDate(service.startDate)} · {service.price}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-navy-400">
                  Tiến trình: Bước {completedSteps}/{totalSteps}
                </span>
                <span className="text-sm font-bold text-gold">{pct}%</span>
              </div>
              <div className="h-2 bg-navy-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-2">
              {service.steps.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex flex-col items-center mt-0.5">
                    {step.status === "complete" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : step.status === "current" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-navy-600 shrink-0" />
                    )}
                    {i < service.steps.length - 1 && (
                      <div
                        className={`w-px h-5 mt-1 ${
                          step.status === "complete" ? "bg-emerald-800" : "bg-navy-700"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <p
                      className={`text-sm leading-tight ${
                        step.status === "complete"
                          ? "text-navy-400 line-through"
                          : step.status === "current"
                          ? "text-foreground font-medium"
                          : "text-navy-600"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.completedAt && (
                      <p className="text-[10px] text-navy-600 mt-0.5 flex items-center gap-1">
                        <Clock size={10} />
                        Hoàn thành: {formatDate(step.completedAt)}
                      </p>
                    )}
                    {step.status === "current" && (
                      <p className="text-xs text-gold mt-0.5 font-medium">Đang xử lý</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action required */}
            {service.nextAction && (
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-400 shrink-0" />
                  <p className="text-xs font-semibold text-amber-300">Hành động cần thiết</p>
                  {service.nextActionDate && (
                    <span className="ml-auto text-[10px] text-amber-500">
                      Trước {formatDate(service.nextActionDate)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-300/80 leading-relaxed">{service.nextAction}</p>
                <Link
                  href="/dashboard/documents"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  <FileText size={12} />
                  Tải tài liệu lên
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
