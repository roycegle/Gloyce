"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ClipboardList, Plus, Check, Clock, XCircle, ChevronDown, ChevronUp,
  FileText, Stamp, Calendar, AlertCircle, Download, ExternalLink,
  CreditCard, DollarSign, RefreshCw, Building2, Briefcase,
} from "lucide-react";
import { toast } from "sonner";

interface UnifiedRequest {
  id: string;
  source: "service" | "service_request";
  service_type: string;
  display_name: string | null;
  status: string;
  payment_status?: string;
  price?: number;
  currency?: string;
  is_price_fixed: boolean;
  current_step?: number;
  total_steps?: number;
  details: Record<string, unknown>;
  created_at: string;
}

const SR_TYPE_ICON: Record<string, typeof FileText> = {
  document_request: FileText,
  certification: Stamp,
};

const SVC_TYPE_ICON: Record<string, typeof Briefcase> = {
  us_llc: Building2,
  singapore: Building2,
  hong_kong: Building2,
  accounting: Briefcase,
  odi: FileText,
  us_bank: CreditCard,
  payment_gateway: CreditCard,
};

const STATUS_COLOR: Record<string, string> = {
  pending:     "bg-amber-500/15 text-amber-400 border-amber-500/30",
  in_progress: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  completed:   "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  rejected:    "bg-red-500/15 text-red-400 border-red-500/30",
};

const PAYMENT_COLOR: Record<string, string> = {
  awaiting: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  paid:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatPrice(price?: number, currency?: string) {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(price);
}

// ── New Request Modal ─────────────────────────────────────────────────────────
function NewRequestModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const t = useTranslations("dashboard.requests.modal");
  const [type, setType] = useState<"certification" | "document_request">("document_request");
  const [submitting, setSubmitting] = useState(false);

  const [docType, setDocType] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [urgency, setUrgency] = useState("normal");

  const [certType, setCertType] = useState("");
  const [certCountry, setCertCountry] = useState("");
  const [certPurpose, setCertPurpose] = useState("");
  const [certDelivery, setCertDelivery] = useState("email");
  const [certCopies, setCertCopies] = useState("1");
  const [certNotes, setCertNotes] = useState("");

  const tSrType = useTranslations("dashboard.requests.srType");

  const submit = async () => {
    if (type === "document_request" && (!docType || !docDesc)) { toast.error(t("validationError")); return; }
    if (type === "certification" && (!certType || !certCountry)) { toast.error(t("validationError")); return; }

    setSubmitting(true);
    const details = type === "document_request"
      ? { document_type: docType, description: docDesc, urgency }
      : { certification_type: certType, destination_country: certCountry, purpose: certPurpose, delivery_method: certDelivery, copies: certCopies, notes: certNotes };

    const res = await fetch("/api/dashboard/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_type: type, details }),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success(t("successToast"));
      onCreated(); onClose();
    } else {
      const d = await res.json().catch(() => ({}));
      toast.error((d as { error?: string }).error || t("errorToast"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white border border-ink-600 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-ink-600 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-ink-100">{t("title")}</h2>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-300 text-sm">{t("close")}</button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          <div>
            <p className="text-[11px] text-ink-500 mb-2 uppercase tracking-wider">{t("requestType")}</p>
            <div className="grid grid-cols-2 gap-2">
              {(["document_request", "certification"] as const).map(tp => (
                <button key={tp} onClick={() => setType(tp)}
                  className={`p-3 rounded-xl border text-left transition-colors ${type === tp ? "border-amber-500/40 bg-amber-500/10" : "border-ink-600 bg-ink-900 hover:border-ink-400"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {tp === "document_request" ? <FileText size={14} className="text-amber-400" /> : <Stamp size={14} className="text-amber-400" />}
                    <span className="text-xs font-semibold text-ink-200">{tSrType(tp as "document_request" | "certification")}</span>
                  </div>
                  <p className="text-[10px] text-ink-500 leading-relaxed">
                    {tp === "document_request" ? t("docRequestDesc") : t("certDesc")}
                  </p>
                </button>
              ))}
            </div>
          </div>
          {type === "document_request" && (
            <>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("docTypeLabel")}</label>
                <input value={docType} onChange={e => setDocType(e.target.value)} placeholder="VD: Certificate of Incorporation, EIN Letter..."
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("docDescLabel")}</label>
                <textarea value={docDesc} onChange={e => setDocDesc(e.target.value)} rows={3} placeholder="..."
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none" />
              </div>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("urgencyLabel")}</label>
                <select value={urgency} onChange={e => setUrgency(e.target.value)}
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                  <option value="normal">{t("urgencyNormal")}</option>
                  <option value="urgent">{t("urgencyUrgent")}</option>
                </select>
              </div>
            </>
          )}
          {type === "certification" && (
            <>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("certTypeLabel")}</label>
                <select value={certType} onChange={e => setCertType(e.target.value)}
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                  <option value="">{t("certTypePlaceholder")}</option>
                  <option value="notarization">{t("notarization")}</option>
                  <option value="apostille">{t("apostille")}</option>
                  <option value="consular_legalization">{t("consular")}</option>
                  <option value="certified_translation">{t("translation")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("destCountryLabel")}</label>
                <input value={certCountry} onChange={e => setCertCountry(e.target.value)} placeholder="Vietnam, USA, Singapore..."
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("purposeLabel")}</label>
                <input value={certPurpose} onChange={e => setCertPurpose(e.target.value)} placeholder="..."
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-ink-500 mb-1 block">{t("deliveryLabel")}</label>
                  <select value={certDelivery} onChange={e => setCertDelivery(e.target.value)}
                    className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                    <option value="email">{t("deliveryEmail")}</option>
                    <option value="pickup">{t("deliveryPickup")}</option>
                    <option value="courier">{t("deliveryCourier")}</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-ink-500 mb-1 block">{t("copiesLabel")}</label>
                  <input type="number" min="1" max="20" value={certCopies} onChange={e => setCertCopies(e.target.value)}
                    className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-ink-500 mb-1 block">{t("notesLabel")}</label>
                <textarea value={certNotes} onChange={e => setCertNotes(e.target.value)} rows={2} placeholder="..."
                  className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-200 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none" />
              </div>
            </>
          )}
        </div>
        <div className="p-5 border-t border-ink-600 flex gap-2 justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-ink-400 hover:text-ink-200 transition-colors">{t("cancel")}</button>
          <button onClick={submit} disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/20 disabled:opacity-50 transition-colors">
            {submitting ? t("submitting") : t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DashboardRequestsPage() {
  const t = useTranslations("dashboard.requests");
  const [requests, setRequests] = useState<UnifiedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/dashboard/requests")
      .then(r => r.json())
      .then(d => { setRequests(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-3xl">
      {showNew && <NewRequestModal onClose={() => setShowNew(false)} onCreated={load} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink-100">{t("title")}</h1>
          <p className="text-sm text-ink-500 mt-0.5">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} title={t("refresh")}
            className="p-2 rounded-lg border border-ink-600 text-ink-400 hover:text-ink-200 disabled:opacity-50 transition-colors">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">
            <Plus size={15} />{t("newRequest")}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-ink-600 p-12 text-center text-sm text-ink-500">{t("loading")}</div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-ink-600 p-16 text-center">
          <ClipboardList size={32} className="mx-auto mb-3 text-ink-500" />
          <p className="text-ink-300 font-medium text-sm mb-1">{t("emptyTitle")}</p>
          <p className="text-ink-500 text-xs mb-4">{t("emptyDesc")}</p>
          <button onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">
            <Plus size={14} />{t("emptyBtn")}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map(req => {
            const isExpanded = expanded === req.id;
            const isStandard = req.source === "service";
            const isSR = req.source === "service_request";
            const TypeIcon = isStandard
              ? (SVC_TYPE_ICON[req.service_type] || Briefcase)
              : (SR_TYPE_ICON[req.service_type] || FileText);
            const statusColor = STATUS_COLOR[req.status] || STATUS_COLOR.pending;
            const StatusIcon = req.status === "completed" ? Check : req.status === "in_progress" ? Clock : req.status === "rejected" ? XCircle : AlertCircle;
            const d = req.details || {};
            const hasPayment = req.payment_status && req.payment_status !== "none";
            const payColor = hasPayment ? PAYMENT_COLOR[req.payment_status!] : null;
            const title = req.display_name || t(`srType.${req.service_type}` as Parameters<typeof t>[0]) || req.service_type;

            return (
              <div key={req.id} className="bg-white rounded-xl border border-ink-600 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#111840] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : req.id)}>
                  <div className="w-9 h-9 rounded-lg bg-[#1A2540] border border-[#2A3A5A] flex items-center justify-center shrink-0">
                    <TypeIcon size={16} className={isStandard ? "text-blue-400" : "text-amber-400"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-ink-200">{title}</span>
                      {isStandard && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">{t("serviceBadge")}</span>
                      )}
                      {isSR && (d.urgency as string) === "urgent" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">{t("urgentBadge")}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-ink-500 flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(req.created_at)}</span>
                      {req.price && <span className="text-ink-400 font-medium">{formatPrice(req.price, req.currency)}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {payColor && (
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border ${payColor} hidden sm:flex items-center gap-1`}>
                        <CreditCard size={9} />{t(`payment.${req.payment_status}` as Parameters<typeof t>[0])}
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColor} flex items-center gap-1`}>
                      <StatusIcon size={11} />{t(`status.${req.status}` as Parameters<typeof t>[0])}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-ink-500" /> : <ChevronDown size={16} className="text-ink-500" />}
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-ink-600 px-4 py-4 space-y-4">

                    {/* Progress bar (standard services) */}
                    {isStandard && req.total_steps && (
                      <div>
                        <div className="flex gap-1">
                          {Array.from({ length: req.total_steps }).map((_, i) => (
                            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < (req.current_step || 0) ? "bg-emerald-400" : i === (req.current_step || 0) ? "bg-amber-400" : "bg-[#1A2540]"}`} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Workflow steps (service_requests) */}
                    {isSR && (
                      <div className="flex items-center gap-0 text-[10px]">
                        {[
                          { key: "pending", label: t("workflowStep.pending") },
                          { key: "awaiting_payment", label: t("workflowStep.payment") },
                          { key: "in_progress", label: t("workflowStep.in_progress") },
                          { key: "completed", label: t("workflowStep.completed") },
                        ].map((step, i, arr) => {
                          const isPayStep = step.key === "awaiting_payment";
                          const reachedPayment = req.payment_status && req.payment_status !== "none";
                          const reachedProgress = req.status === "in_progress" || req.status === "completed";
                          const reachedDone = req.status === "completed";
                          const active =
                            (step.key === "pending" && req.status === "pending" && !reachedPayment) ||
                            (isPayStep && reachedPayment && !reachedProgress) ||
                            (step.key === "in_progress" && reachedProgress && !reachedDone) ||
                            (step.key === "completed" && reachedDone);
                          const done =
                            (step.key === "pending" && (reachedPayment || reachedProgress || reachedDone)) ||
                            (isPayStep && (reachedProgress || reachedDone)) ||
                            (step.key === "in_progress" && reachedDone);
                          return (
                            <div key={step.key} className="flex items-center flex-1 min-w-0">
                              <div className={`flex flex-col items-center gap-0.5 flex-1 min-w-0 ${done ? "opacity-60" : active ? "opacity-100" : "opacity-30"}`}>
                                <div className={`w-2.5 h-2.5 rounded-full border flex-shrink-0 ${done ? "bg-emerald-400 border-emerald-400" : active ? "bg-amber-400 border-amber-400" : "bg-[#1A2540] border-[#2A3A5A]"}`} />
                                <span className={`truncate max-w-full text-center leading-tight ${active ? "text-amber-400" : "text-ink-500"}`}>{step.label}</span>
                              </div>
                              {i < arr.length - 1 && <div className={`h-px flex-1 mx-1 ${done ? "bg-[#2A3A5A]" : "bg-[#1A2540]"}`} />}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Payment info */}
                    {hasPayment && payColor && (
                      <div className={`p-3 rounded-lg border ${payColor}`} style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                        <div className="flex items-start gap-2">
                          <DollarSign size={14} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold">
                              {req.price ? formatPrice(req.price, req.currency) : ""} — {t(`payment.${req.payment_status}` as Parameters<typeof t>[0])}
                            </p>
                            <p className="text-xs mt-0.5 opacity-80">{t(`payment.${req.payment_status}Desc` as Parameters<typeof t>[0])}</p>
                            {req.payment_status === "awaiting" && (
                              <p className="text-xs mt-1.5 opacity-70">{t("payment.contactNote")}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard service: price note */}
                    {isStandard && (!req.payment_status || req.payment_status === "none") && req.price && (
                      <div className="flex items-center gap-2 text-xs text-ink-500 p-2 rounded-lg border border-ink-600">
                        <CreditCard size={12} className="shrink-0" />
                        <span>{t("servicePriceNote", { price: formatPrice(req.price, req.currency) })}</span>
                      </div>
                    )}

                    {/* Service request details */}
                    {isSR && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {req.service_type === "document_request" && (
                          <>
                            <div>
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.documentType")}</p>
                              <p className="text-sm text-ink-200 font-medium">{d.document_type as string || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.priority")}</p>
                              <p className="text-sm text-ink-200">
                                {(d.urgency as string) === "urgent" ? t("details.urgentLabel") : t("details.normalLabel")}
                              </p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.description")}</p>
                              <p className="text-sm text-ink-300 leading-relaxed">{d.description as string || "—"}</p>
                            </div>
                          </>
                        )}
                        {req.service_type === "certification" && (
                          <>
                            <div>
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.certType")}</p>
                              <p className="text-sm text-ink-200 font-medium">{d.certification_type as string || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.destCountry")}</p>
                              <p className="text-sm text-ink-200">{d.destination_country as string || "—"}</p>
                            </div>
                            {d.purpose && (
                              <div>
                                <p className="text-[11px] text-ink-500 mb-0.5">{t("details.purpose")}</p>
                                <p className="text-sm text-ink-300">{d.purpose as string}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-[11px] text-ink-500 mb-0.5">{t("details.delivery")}</p>
                              <p className="text-sm text-ink-300">{d.delivery_method as string || "—"} · {d.copies as string || 1} {t("details.copies")}</p>
                            </div>
                            {d.notes && (
                              <div className="sm:col-span-2">
                                <p className="text-[11px] text-ink-500 mb-0.5">{t("details.notes")}</p>
                                <p className="text-sm text-ink-300">{d.notes as string}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Admin note */}
                    {(d.admin_notes as string) && (
                      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-[11px] text-blue-400 mb-0.5 uppercase tracking-wider">{t("adminNotes")}</p>
                        <p className="text-sm text-ink-300">{d.admin_notes as string}</p>
                      </div>
                    )}

                    {/* Result file */}
                    {req.status === "completed" && (d.result_url as string) && (
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-[11px] text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                          <Check size={11} />{t("resultReady")}
                        </p>
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-emerald-400 shrink-0" />
                          <span className="text-sm text-ink-300 flex-1 truncate">{(d.result_filename as string) || "file"}</span>
                          <div className="flex gap-1 shrink-0">
                            <a href={d.result_url as string} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1A2540] border border-[#2A3A5A] text-xs text-ink-300 hover:text-white transition-colors">
                              <ExternalLink size={11} />{t("viewBtn")}
                            </a>
                            <a href={d.result_url as string} download
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                              <Download size={11} />{t("downloadBtn")}
                            </a>
                          </div>
                        </div>
                        <p className="text-[10px] text-ink-500 mt-1.5">{t("resultInDocs")}</p>
                      </div>
                    )}

                    {req.status === "rejected" && (
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 flex items-start gap-2">
                        <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-400">{t("rejectedTitle")}</p>
                          {(d.admin_notes as string) && <p className="text-xs text-ink-400 mt-0.5">{d.admin_notes as string}</p>}
                          <p className="text-xs text-ink-500 mt-1">{t("contactForDetails")}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
