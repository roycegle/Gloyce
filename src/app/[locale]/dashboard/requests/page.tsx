"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList, Plus, Check, Clock, XCircle, ChevronDown, ChevronUp,
  FileText, Stamp, Upload, Calendar, AlertCircle, Download, ExternalLink,
  CreditCard, DollarSign, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface ServiceRequest {
  id: string;
  service_type: string;
  status: string;
  payment_status?: string;
  price?: number;
  currency?: string;
  details: Record<string, unknown>;
  created_at: string;
}

const TYPE_LABEL: Record<string, string> = {
  document_request: "Yêu cầu tài liệu",
  certification: "Yêu cầu chứng thực",
};

const TYPE_ICON: Record<string, typeof FileText> = {
  document_request: FileText,
  certification: Stamp,
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending:     { label: "Chờ xử lý",   color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  in_progress: { label: "Đang xử lý",  color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  completed:   { label: "Hoàn thành",  color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  rejected:    { label: "Từ chối",      color: "bg-red-500/15 text-red-400 border-red-500/30" },
};

const PAYMENT_CONFIG: Record<string, { label: string; color: string; desc: string }> = {
  awaiting: {
    label: "Chờ thanh toán",
    color: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    desc: "Gloyce đã báo giá. Vui lòng liên hệ để thanh toán.",
  },
  paid: {
    label: "Đã thanh toán",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    desc: "Thanh toán được xác nhận. Đang xử lý yêu cầu.",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatPrice(price?: number, currency?: string) {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(price);
}

// ── New Request Modal ─────────────────────────────────────────────────────────
function NewRequestModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [type, setType] = useState<"certification" | "document_request">("document_request");
  const [submitting, setSubmitting] = useState(false);

  // document_request fields
  const [docType, setDocType] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [urgency, setUrgency] = useState("normal");

  // certification fields
  const [certType, setCertType] = useState("");
  const [certCountry, setCertCountry] = useState("");
  const [certPurpose, setCertPurpose] = useState("");
  const [certDelivery, setCertDelivery] = useState("email");
  const [certCopies, setCertCopies] = useState("1");
  const [certNotes, setCertNotes] = useState("");

  const submit = async () => {
    if (type === "document_request" && (!docType || !docDesc)) { toast.error("Điền đầy đủ thông tin"); return; }
    if (type === "certification" && (!certType || !certCountry)) { toast.error("Điền đầy đủ thông tin"); return; }

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
      toast.success("Yêu cầu đã được gửi thành công");
      onCreated();
      onClose();
    } else {
      const d = await res.json().catch(() => ({}));
      toast.error((d as { error?: string }).error || "Gửi yêu cầu thất bại");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0D1733] border border-[#1E2A4A] rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-[#1E2A4A] flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-100">Tạo yêu cầu mới</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-sm">Đóng</button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Type selector */}
          <div>
            <p className="text-[11px] text-slate-500 mb-2 uppercase tracking-wider">Loại yêu cầu</p>
            <div className="grid grid-cols-2 gap-2">
              {(["document_request", "certification"] as const).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`p-3 rounded-xl border text-left transition-colors ${type === t ? "border-amber-500/40 bg-amber-500/10" : "border-[#1E2A4A] bg-[#060C30] hover:border-[#2A3A5A]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {t === "document_request" ? <FileText size={14} className="text-amber-400" /> : <Stamp size={14} className="text-amber-400" />}
                    <span className="text-xs font-semibold text-slate-200">{TYPE_LABEL[t]}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {t === "document_request" ? "Yêu cầu Gloyce chuẩn bị tài liệu pháp lý" : "Chứng thực/hợp pháp hóa tài liệu hiện có"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {type === "document_request" && (
            <>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Loại tài liệu cần *</label>
                <input value={docType} onChange={e => setDocType(e.target.value)} placeholder="VD: Certificate of Incorporation, EIN Letter..."
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Mô tả chi tiết *</label>
                <textarea value={docDesc} onChange={e => setDocDesc(e.target.value)} rows={3}
                  placeholder="Mô tả mục đích sử dụng, deadline nếu có..."
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none" />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Mức độ ưu tiên</label>
                <select value={urgency} onChange={e => setUrgency(e.target.value)}
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                  <option value="normal">Bình thường</option>
                  <option value="urgent">Gấp (cần sớm)</option>
                </select>
              </div>
            </>
          )}

          {type === "certification" && (
            <>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Loại chứng thực *</label>
                <select value={certType} onChange={e => setCertType(e.target.value)}
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                  <option value="">-- Chọn loại --</option>
                  <option value="notarization">Công chứng (Notarization)</option>
                  <option value="apostille">Hợp pháp hóa lãnh sự (Apostille)</option>
                  <option value="consular_legalization">Hợp pháp hóa Lãnh sự quán</option>
                  <option value="certified_translation">Dịch thuật có chứng nhận</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Quốc gia sử dụng tài liệu *</label>
                <input value={certCountry} onChange={e => setCertCountry(e.target.value)} placeholder="VD: Vietnam, USA, Singapore..."
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Mục đích sử dụng</label>
                <input value={certPurpose} onChange={e => setCertPurpose(e.target.value)} placeholder="VD: Mở tài khoản ngân hàng, visa..."
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 mb-1 block">Nhận kết quả qua</label>
                  <select value={certDelivery} onChange={e => setCertDelivery(e.target.value)}
                    className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                    <option value="email">Email (bản số)</option>
                    <option value="pickup">Nhận trực tiếp</option>
                    <option value="courier">Chuyển phát</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 mb-1 block">Số bản</label>
                  <input type="number" min="1" max="20" value={certCopies} onChange={e => setCertCopies(e.target.value)}
                    className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 mb-1 block">Ghi chú thêm</label>
                <textarea value={certNotes} onChange={e => setCertNotes(e.target.value)} rows={2}
                  placeholder="Deadline, yêu cầu đặc biệt..."
                  className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none" />
              </div>
            </>
          )}
        </div>

        <div className="p-5 border-t border-[#1E2A4A] flex gap-2 justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">Hủy</button>
          <button onClick={submit} disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/20 disabled:opacity-50 transition-colors">
            {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DashboardRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
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
          <h1 className="text-xl font-bold text-slate-100">Yêu cầu dịch vụ</h1>
          <p className="text-sm text-slate-500 mt-0.5">Theo dõi tiến trình và kết quả tất cả yêu cầu</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} title="Làm mới"
            className="p-2 rounded-lg border border-[#1E2A4A] text-slate-400 hover:text-slate-200 disabled:opacity-50 transition-colors">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">
            <Plus size={15} />Tạo yêu cầu
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] p-12 text-center text-sm text-slate-500">Đang tải...</div>
      ) : requests.length === 0 ? (
        <div className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] p-16 text-center">
          <ClipboardList size={32} className="mx-auto mb-3 text-slate-600" />
          <p className="text-slate-300 font-medium text-sm mb-1">Chưa có yêu cầu nào</p>
          <p className="text-slate-500 text-xs mb-4">Tạo yêu cầu đầu tiên để Gloyce bắt đầu xử lý</p>
          <button onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">
            <Plus size={14} />Tạo yêu cầu mới
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map(req => {
            const isExpanded = expanded === req.id;
            const TypeIcon = TYPE_ICON[req.service_type] || FileText;
            const statusCfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
            const StatusIcon = req.status === "completed" ? Check : req.status === "in_progress" ? Clock : req.status === "rejected" ? XCircle : AlertCircle;
            const d = req.details || {};
            const payCfg = req.payment_status && req.payment_status !== "none" ? PAYMENT_CONFIG[req.payment_status] : null;

            return (
              <div key={req.id} className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#111840] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : req.id)}>
                  <div className="w-9 h-9 rounded-lg bg-[#1A2540] border border-[#2A3A5A] flex items-center justify-center shrink-0">
                    <TypeIcon size={16} className="text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-200">{TYPE_LABEL[req.service_type] || req.service_type}</span>
                      {(d.urgency as string) === "urgent" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">GẤP</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <Calendar size={11} />{formatDate(req.created_at)}
                      {req.price && <span className="text-slate-400 font-medium">{formatPrice(req.price, req.currency)}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {payCfg && (
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border ${payCfg.color} hidden sm:flex items-center gap-1`}>
                        <CreditCard size={9} />{payCfg.label}
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusCfg.color} flex items-center gap-1`}>
                      <StatusIcon size={11} />{statusCfg.label}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-[#1E2A4A] px-4 py-4 space-y-4">

                    {/* Workflow steps */}
                    <div className="flex items-center gap-0 text-[10px]">
                      {[
                        { key: "pending", label: "Chờ xử lý" },
                        { key: "awaiting_payment", label: "Thanh toán" },
                        { key: "in_progress", label: "Đang xử lý" },
                        { key: "completed", label: "Hoàn thành" },
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
                              <span className={`truncate max-w-full text-center leading-tight ${active ? "text-amber-400" : "text-slate-500"}`}>{step.label}</span>
                            </div>
                            {i < arr.length - 1 && <div className={`h-px flex-1 mx-1 ${done || (active && step.key !== "completed") ? "bg-[#2A3A5A]" : "bg-[#1A2540]"}`} />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Payment prompt */}
                    {payCfg && (
                      <div className={`p-3 rounded-lg border ${payCfg.color} bg-opacity-10`}>
                        <div className="flex items-start gap-2">
                          <DollarSign size={14} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold">{req.price ? formatPrice(req.price, req.currency) : ""} — {payCfg.label}</p>
                            <p className="text-xs mt-0.5 opacity-80">{payCfg.desc}</p>
                            {req.payment_status === "awaiting" && (
                              <p className="text-xs mt-1.5 opacity-70">Liên hệ Gloyce qua email hoặc Zalo để hoàn tất thanh toán.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Request details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {req.service_type === "document_request" && (
                        <>
                          <div><p className="text-[11px] text-slate-500 mb-0.5">Loại tài liệu</p><p className="text-sm text-slate-200 font-medium">{d.document_type as string || "—"}</p></div>
                          <div><p className="text-[11px] text-slate-500 mb-0.5">Ưu tiên</p><p className="text-sm text-slate-200">{(d.urgency as string) === "urgent" ? "Gấp" : "Bình thường"}</p></div>
                          <div className="sm:col-span-2"><p className="text-[11px] text-slate-500 mb-0.5">Mô tả</p><p className="text-sm text-slate-300 leading-relaxed">{d.description as string || "—"}</p></div>
                        </>
                      )}
                      {req.service_type === "certification" && (
                        <>
                          <div><p className="text-[11px] text-slate-500 mb-0.5">Loại chứng thực</p><p className="text-sm text-slate-200 font-medium">{d.certification_type as string || "—"}</p></div>
                          <div><p className="text-[11px] text-slate-500 mb-0.5">Quốc gia đích</p><p className="text-sm text-slate-200">{d.destination_country as string || "—"}</p></div>
                          {d.purpose && <div><p className="text-[11px] text-slate-500 mb-0.5">Mục đích</p><p className="text-sm text-slate-300">{d.purpose as string}</p></div>}
                          <div><p className="text-[11px] text-slate-500 mb-0.5">Nhận kết quả</p><p className="text-sm text-slate-300">{d.delivery_method as string || "—"} · {d.copies as string || 1} bản</p></div>
                          {d.notes && <div className="sm:col-span-2"><p className="text-[11px] text-slate-500 mb-0.5">Ghi chú</p><p className="text-sm text-slate-300">{d.notes as string}</p></div>}
                        </>
                      )}
                    </div>

                    {/* Admin notes */}
                    {(d.admin_notes as string) && (
                      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-[11px] text-blue-400 mb-0.5 uppercase tracking-wider">Ghi chú từ Gloyce</p>
                        <p className="text-sm text-slate-300">{d.admin_notes as string}</p>
                      </div>
                    )}

                    {/* Result file */}
                    {req.status === "completed" && (d.result_url as string) && (
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-[11px] text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                          <Check size={11} />Kết quả đã có
                        </p>
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-emerald-400 shrink-0" />
                          <span className="text-sm text-slate-300 flex-1 truncate">{(d.result_filename as string) || "file"}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <a href={d.result_url as string} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1A2540] border border-[#2A3A5A] text-xs text-slate-300 hover:text-white transition-colors">
                              <ExternalLink size={11} />Xem
                            </a>
                            <a href={d.result_url as string} download
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                              <Download size={11} />Tải về
                            </a>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1.5">File này cũng có trong tab Documents của bạn.</p>
                      </div>
                    )}

                    {req.status === "rejected" && (
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 flex items-start gap-2">
                        <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-400">Yêu cầu bị từ chối</p>
                          {(d.admin_notes as string) && <p className="text-xs text-slate-400 mt-0.5">{d.admin_notes as string}</p>}
                          <p className="text-xs text-slate-500 mt-1">Liên hệ Gloyce để biết thêm chi tiết hoặc tạo yêu cầu mới.</p>
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
