"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList, Check, Clock, XCircle, ChevronDown, ChevronUp,
  FileText, Stamp, Upload, User, Calendar, AlertCircle, Download, ExternalLink,
  RefreshCw, DollarSign, CreditCard, Building2, Briefcase,
} from "lucide-react";
import { toast } from "sonner";

interface UnifiedRequest {
  id: string;
  source: "service" | "service_request";
  user_id: string;
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
  users?: { id: string; name: string; email: string; company?: string } | null;
  source_document?: { id: string; name: string; file_url?: string; category?: string } | null;
}

const SR_TYPE_LABEL: Record<string, string> = {
  document_request: "Yêu cầu tài liệu",
  certification: "Yêu cầu chứng thực",
};

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

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending:     { label: "Chờ xử lý",  color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  in_progress: { label: "Đang xử lý", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  completed:   { label: "Hoàn thành", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  rejected:    { label: "Từ chối",     color: "bg-red-500/15 text-red-400 border-red-500/30" },
};

const PAYMENT_BADGE: Record<string, { label: string; color: string }> = {
  awaiting: { label: "Chờ thanh toán", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  paid:     { label: "Đã thanh toán",  color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatPrice(price?: number, currency?: string) {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(price);
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<UnifiedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [resultUploadId, setResultUploadId] = useState<string | null>(null);
  const [resultFiles, setResultFiles] = useState<File[]>([]);
  const [resultUploading, setResultUploading] = useState(false);
  const [priceInput, setPriceInput] = useState<Record<string, string>>({});
  const [settingPrice, setSettingPrice] = useState<string | null>(null);

  const load = (status = statusFilter) => {
    setLoading(true);
    setApiError(null);
    fetch(`/api/admin/requests?status=${status}`)
      .then(async r => {
        const d = await r.json();
        if (!r.ok) { setApiError(`HTTP ${r.status}: ${d?.error || JSON.stringify(d)}`); setRequests([]); }
        else if (Array.isArray(d)) setRequests(d);
        else { setApiError(`Unexpected: ${JSON.stringify(d)}`); setRequests([]); }
        setLoading(false);
      })
      .catch(err => { setApiError(String(err)); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleStatusFilter = (s: string) => { setStatusFilter(s); load(s); };

  const patchSR = async (id: string, body: Record<string, unknown>) => {
    setSaving(id);
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(null);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      toast.error((d as { error?: string }).error || "Lỗi cập nhật");
    }
    load();
  };

  const patchSvc = async (id: string, body: Record<string, unknown>) => {
    setSaving(id);
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(null);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      toast.error((d as { error?: string }).error || "Lỗi cập nhật");
    }
    load();
  };

  const setPrice = async (req: UnifiedRequest) => {
    const val = parseFloat(priceInput[req.id] || "");
    if (!val || val <= 0) { toast.error("Nhập số tiền hợp lệ"); return; }
    setSettingPrice(req.id);
    await patchSR(req.id, { price: val, currency: "USD", payment_status: "awaiting" });
    setSettingPrice(null);
  };

  const confirmPayment = (req: UnifiedRequest) =>
    patchSR(req.id, { payment_status: "paid", status: "in_progress" });

  const startProcessing = (req: UnifiedRequest) =>
    req.source === "service"
      ? patchSvc(req.id, { status: "active" })
      : patchSR(req.id, { status: "in_progress", admin_notes: notes[req.id] || undefined });

  const rejectSR = (req: UnifiedRequest) =>
    patchSR(req.id, { status: "rejected", admin_notes: notes[req.id] || undefined });

  const uploadResult = async (req: UnifiedRequest) => {
    if (!resultFiles.length) return;
    setResultUploading(true);
    const endpoint = req.source === "service"
      ? `/api/admin/services/${req.id}/result`
      : `/api/admin/requests/${req.id}/result`;
    const fd = new FormData();
    for (const f of resultFiles) fd.append("files", f);
    const res = await fetch(endpoint, { method: "POST", body: fd });
    setResultUploading(false);
    if (res.ok) {
      toast.success(`Upload thành công — ${resultFiles.length} file đã vào tab Docs của khách`);
      setResultUploadId(null); setResultFiles([]);
      load();
    } else {
      const d = await res.json().catch(() => ({}));
      toast.error((d as { error?: string }).error || "Upload thất bại");
    }
  };

  const awaitingCount = requests.filter(r => r.payment_status === "awaiting").length;
  const pendingCount = requests.filter(r => r.status === "pending" && (!r.payment_status || r.payment_status === "none")).length;

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    in_progress: requests.filter(r => r.status === "in_progress").length,
    completed: requests.filter(r => r.status === "completed").length,
  };

  return (
    <div className="max-w-5xl">
      {apiError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2">
          <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-400">Lỗi tải dữ liệu</p>
            <p className="text-xs text-red-400/80 mt-0.5 font-mono">{apiError}</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink-100">Yêu cầu từ khách hàng</h1>
          <p className="text-sm text-ink-400 mt-0.5">Dịch vụ mua và yêu cầu thêm — quản lý giá, thanh toán, kết quả</p>
        </div>
        <div className="flex items-center gap-2">
          {(awaitingCount + pendingCount) > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertCircle size={14} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400">{awaitingCount + pendingCount} cần xử lý</span>
            </div>
          )}
          <button onClick={() => load()} disabled={loading} title="Làm mới"
            className="p-2 rounded-lg border border-ink-600 text-ink-400 hover:text-ink-100 disabled:opacity-50 transition-colors">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "in_progress", label: "Đang xử lý" },
          { key: "completed", label: "Hoàn thành" },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => handleStatusFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              statusFilter === key
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "border-ink-600 text-ink-400 hover:text-ink-100 hover:border-ink-600"
            }`}>
            {label}
            {key !== "all" && (counts as Record<string, number>)[key] > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({(counts as Record<string, number>)[key]})</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-ink-800 rounded-xl border border-ink-600 p-12 text-center text-sm text-ink-400">Đang tải...</div>
      ) : requests.length === 0 ? (
        <div className="bg-ink-800 rounded-xl border border-ink-600 p-16 text-center">
          <ClipboardList size={32} className="mx-auto mb-3 text-ink-500" />
          <p className="text-ink-400 text-sm">Không có yêu cầu nào</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => {
            const isExpanded = expanded === req.id;
            const isStandard = req.source === "service";
            const isSR = req.source === "service_request";
            const TypeIcon = isStandard
              ? (SVC_TYPE_ICON[req.service_type] || Briefcase)
              : (SR_TYPE_ICON[req.service_type] || FileText);
            const statusCfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
            const StatusIcon = req.status === "completed" ? Check : req.status === "in_progress" ? Clock : req.status === "rejected" ? XCircle : AlertCircle;
            const d = req.details || {};
            const adminNotes = (d.admin_notes as string) || "";
            const payBadge = req.payment_status && req.payment_status !== "none" ? PAYMENT_BADGE[req.payment_status] : null;
            const title = req.display_name || SR_TYPE_LABEL[req.service_type] || req.service_type;

            return (
              <div key={req.id} className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
                {/* Header row */}
                <div className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-ink-700 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : req.id)}>
                  <div className="w-9 h-9 rounded-lg bg-ink-700 border border-ink-600 flex items-center justify-center shrink-0">
                    <TypeIcon size={16} className={isStandard ? "text-blue-400" : "text-amber-400"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-ink-100">{title}</span>
                      {isStandard && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">Dịch vụ mua</span>
                      )}
                      {isSR && (d.urgency as string) === "urgent" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">GẤP</span>
                      )}
                      {req.price && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700/50 text-ink-300">{formatPrice(req.price, req.currency)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-ink-400 flex-wrap">
                      <span className="flex items-center gap-1"><User size={11} />{req.users?.name || req.user_id}{req.users?.company && <span className="text-ink-500"> · {req.users.company}</span>}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(req.created_at)}</span>
                      {isStandard && req.total_steps && (
                        <span>Bước {req.current_step || 0}/{req.total_steps}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {payBadge && (
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border ${payBadge.color} hidden sm:flex items-center gap-1`}>
                        <CreditCard size={9} />{payBadge.label}
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusCfg.color} flex items-center gap-1`}>
                      <StatusIcon size={11} />{statusCfg.label}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-ink-400" /> : <ChevronDown size={16} className="text-ink-400" />}
                  </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                  <div className="border-t border-ink-600 px-4 py-4 space-y-4">

                    {/* Step progress bar (standard services) */}
                    {isStandard && req.total_steps && (
                      <div>
                        <p className="text-[11px] text-ink-400 mb-2 uppercase tracking-wider">Tiến trình</p>
                        <div className="flex gap-1">
                          {Array.from({ length: req.total_steps }).map((_, i) => (
                            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < (req.current_step || 0) ? "bg-emerald-400" : i === (req.current_step || 0) ? "bg-amber-400" : "bg-ink-700"}`} />
                          ))}
                        </div>
                        <p className="text-[10px] text-ink-400 mt-1">Bước {req.current_step || 0} / {req.total_steps}</p>
                      </div>
                    )}

                    {/* Certification source doc */}
                    {isSR && req.service_type === "certification" && (
                      <div className="p-3 rounded-lg border border-ink-600 bg-ink-900">
                        <p className="text-[11px] text-ink-400 mb-2 uppercase tracking-wider">File cần chứng thực</p>
                        {req.source_document ? (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-ink-700 border border-ink-600 flex items-center justify-center shrink-0">
                              <FileText size={14} className="text-amber-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink-100 truncate">{req.source_document.name}</p>
                              {req.source_document.category && <p className="text-xs text-ink-400 capitalize">{req.source_document.category}</p>}
                            </div>
                            {req.source_document.file_url && (
                              <div className="flex gap-1 shrink-0">
                                <a href={req.source_document.file_url} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-ink-700 border border-ink-600 text-xs text-ink-300 hover:text-ink-100 transition-colors">
                                  <ExternalLink size={12} />Xem
                                </a>
                                <a href={req.source_document.file_url} download
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 hover:bg-amber-500/20 transition-colors">
                                  <Download size={12} />Tải về
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-ink-400 italic">Không tìm thấy file gốc</p>
                        )}
                      </div>
                    )}

                    {/* Service request details */}
                    {isSR && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {req.service_type === "document_request" && (
                          <>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Loại tài liệu</p><p className="text-sm text-ink-100 font-medium">{d.document_type as string || "—"}</p></div>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Ưu tiên</p><p className="text-sm text-ink-100">{(d.urgency as string) === "urgent" ? "Gấp" : "Bình thường"}</p></div>
                            <div className="sm:col-span-2"><p className="text-[11px] text-ink-400 mb-0.5">Mô tả</p><p className="text-sm text-ink-300 leading-relaxed">{d.description as string || "—"}</p></div>
                          </>
                        )}
                        {req.service_type === "certification" && (
                          <>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Loại chứng thực</p><p className="text-sm text-ink-100 font-medium">{d.certification_type as string || "—"}</p></div>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Quốc gia đích</p><p className="text-sm text-ink-100">{d.destination_country as string || "—"}</p></div>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Mục đích</p><p className="text-sm text-ink-300">{d.purpose as string || "—"}</p></div>
                            <div><p className="text-[11px] text-ink-400 mb-0.5">Nhận kết quả</p><p className="text-sm text-ink-300">{d.delivery_method as string || "—"} · {d.copies as string || 1} bản</p></div>
                            {d.notes && <div className="sm:col-span-2"><p className="text-[11px] text-ink-400 mb-0.5">Ghi chú</p><p className="text-sm text-ink-300">{d.notes as string}</p></div>}
                          </>
                        )}
                      </div>
                    )}

                    {/* Customer link */}
                    {req.users && (
                      <Link href={`/admin/customers/${req.users.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                        <User size={12} />Xem hồ sơ → {req.users.name} ({req.users.email})
                      </Link>
                    )}

                    {/* Admin notes (service_requests only) */}
                    {isSR && (
                      <div>
                        <label className="text-[11px] text-ink-400 mb-1 block">Ghi chú xử lý (nội bộ)</label>
                        <textarea defaultValue={adminNotes}
                          onChange={e => setNotes(n => ({ ...n, [req.id]: e.target.value }))}
                          rows={2} placeholder="VD: Đã liên hệ đối tác..."
                          className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-300 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none" />
                      </div>
                    )}

                    {/* Payment section */}
                    <div className="p-3 rounded-lg border border-ink-600 bg-ink-900">
                      <p className="text-[11px] text-ink-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign size={11} />Thanh toán
                      </p>

                      {/* Standard service: fixed price, read-only */}
                      {isStandard && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {req.price
                            ? <span className="text-sm font-semibold text-ink-100">{formatPrice(req.price, req.currency)}</span>
                            : <span className="text-sm text-ink-400 italic">Chưa có giá</span>
                          }
                          <span className="text-[10px] px-1.5 py-0.5 rounded border border-ink-600 text-ink-400">Giá cố định</span>
                          {req.payment_status === "paid" && <span className="flex items-center gap-1 text-xs text-emerald-400"><Check size={11} />Đã thanh toán</span>}
                          {req.payment_status === "awaiting" && <span className="text-xs text-orange-400">Chờ thanh toán — xác nhận trong hóa đơn khách hàng</span>}
                          {(!req.payment_status || req.payment_status === "none") && <span className="text-xs text-ink-400">Thanh toán qua hóa đơn</span>}
                        </div>
                      )}

                      {/* Custom request: admin sets price */}
                      {isSR && (!req.payment_status || req.payment_status === "none") && (
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <label className="text-[11px] text-ink-400 mb-1 block">Giá dịch vụ (USD)</label>
                            <input type="number" min="0" step="0.01" placeholder="VD: 199"
                              value={priceInput[req.id] || ""}
                              onChange={e => setPriceInput(p => ({ ...p, [req.id]: e.target.value }))}
                              className="w-full bg-ink-800 border border-ink-600 rounded-lg px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40" />
                          </div>
                          <button onClick={() => setPrice(req)} disabled={settingPrice === req.id || !priceInput[req.id]}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 disabled:opacity-50 transition-colors shrink-0">
                            <DollarSign size={12} />{settingPrice === req.id ? "Đang lưu..." : "Đặt giá & Yêu cầu TT"}
                          </button>
                        </div>
                      )}
                      {isSR && req.payment_status === "awaiting" && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-orange-400">{formatPrice(req.price, req.currency)}</p>
                            <p className="text-xs text-ink-400 mt-0.5">Đang chờ khách hàng thanh toán</p>
                          </div>
                          <button onClick={() => confirmPayment(req)} disabled={saving === req.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-50 transition-colors shrink-0">
                            <Check size={12} />{saving === req.id ? "Đang lưu..." : "Xác nhận đã thanh toán"}
                          </button>
                        </div>
                      )}
                      {isSR && req.payment_status === "paid" && (
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400 shrink-0" />
                          <span className="text-sm text-emerald-400 font-medium">Đã thanh toán{req.price ? ` · ${formatPrice(req.price, req.currency)}` : ""}</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    {req.status !== "completed" && req.status !== "rejected" && (
                      <div className="flex flex-wrap gap-2">
                        {req.status === "pending" && req.payment_status !== "awaiting" && (
                          <button onClick={() => startProcessing(req)} disabled={saving === req.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 disabled:opacity-50 transition-colors">
                            <Clock size={13} />{saving === req.id ? "Đang lưu..." : "Bắt đầu xử lý"}
                          </button>
                        )}
                        <button onClick={() => { setResultUploadId(req.id); setResultFiles([]); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors">
                          <Upload size={13} />Upload kết quả
                        </button>
                        {isSR && (
                          <button onClick={() => rejectSR(req)} disabled={saving === req.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 disabled:opacity-50 transition-colors">
                            <XCircle size={13} />Từ chối
                          </button>
                        )}
                      </div>
                    )}

                    {/* Result upload panel */}
                    {resultUploadId === req.id && (
                      <div className="p-3 rounded-lg bg-ink-900 border border-ink-600 flex flex-col gap-2">
                        <p className="text-xs font-medium text-ink-300">Upload file kết quả — tự động gửi vào Docs của khách</p>

                        {/* File picker */}
                        <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-dashed border-ink-500 hover:border-amber-500/50 transition-colors">
                          <Upload size={13} className="text-ink-400 shrink-0" />
                          <span className="text-xs text-ink-400">Chọn file (có thể chọn nhiều)</span>
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={e => {
                              const picked = Array.from(e.target.files || []);
                              setResultFiles(prev => {
                                const existing = new Set(prev.map(f => f.name + f.size));
                                return [...prev, ...picked.filter(f => !existing.has(f.name + f.size))];
                              });
                              e.target.value = "";
                            }}
                          />
                        </label>

                        {/* List selected files */}
                        {resultFiles.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {resultFiles.map((f, i) => (
                              <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-ink-800 border border-ink-600">
                                <span className="text-xs text-ink-200 flex-1 truncate">{f.name}</span>
                                <span className="text-[10px] text-ink-500 shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                                <button
                                  onClick={() => setResultFiles(prev => prev.filter((_, j) => j !== i))}
                                  className="text-ink-500 hover:text-red-400 transition-colors shrink-0 ml-1"
                                >
                                  <XCircle size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 pt-1">
                          <button onClick={() => { setResultUploadId(null); setResultFiles([]); }} className="px-3 py-1.5 text-xs text-ink-400 hover:text-ink-100">Hủy</button>
                          <button onClick={() => uploadResult(req)} disabled={!resultFiles.length || resultUploading}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-50">
                            <Upload size={12} />
                            {resultUploading
                              ? "Đang upload..."
                              : resultFiles.length > 1
                                ? `Upload ${resultFiles.length} file & Hoàn thành`
                                : "Upload & Hoàn thành"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Result files display */}
                    {req.status === "completed" && (d.result_url as string) && (
                      <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        {((d.result_files as { url: string; filename: string }[] | undefined) || [{ url: d.result_url as string, filename: (d.result_filename as string) || "file" }])
                          .map((rf, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check size={13} className="text-emerald-400 shrink-0" />
                              <span className="text-xs text-emerald-400 flex-1 truncate">{rf.filename}</span>
                              <a href={rf.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-400 hover:text-ink-100 shrink-0">Xem</a>
                            </div>
                          ))
                        }
                      </div>
                    )}

                    {(req.status === "completed" || req.status === "rejected") && !(d.result_url) && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-2 text-xs text-ink-400 flex-1 min-w-0">
                          <Check size={13} className="shrink-0" />
                          Yêu cầu đã {req.status === "completed" ? "hoàn thành" : "bị từ chối"}
                        </div>
                        <button onClick={() => { setResultUploadId(req.id); setResultFiles([]); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors">
                          <Upload size={13} />Upload kết quả
                        </button>
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
