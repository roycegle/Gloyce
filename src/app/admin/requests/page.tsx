"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList, Check, Clock, XCircle, ChevronDown, ChevronUp,
  FileText, Stamp, Upload, User, Calendar, AlertCircle,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  user_id: string;
  service_type: string;
  status: string;
  details: Record<string, unknown>;
  created_at: string;
  users?: { id: string; name: string; email: string; company?: string } | null;
  services?: { name: string; type: string } | null;
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = (status = statusFilter) => {
    setLoading(true);
    fetch(`/api/admin/requests?status=${status}`)
      .then(r => r.json())
      .then(d => { setRequests(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusFilter = (s: string) => {
    setStatusFilter(s);
    load(s);
  };

  const updateRequest = async (id: string, status: string) => {
    setSaving(id);
    await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: notes[id] || undefined }),
    });
    setSaving(null);
    load();
  };

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    in_progress: requests.filter(r => r.status === "in_progress").length,
    completed: requests.filter(r => r.status === "completed").length,
  };

  const pending = requests.filter(r => r.status === "pending").length;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Yêu cầu từ khách hàng</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            Quản lý và xử lý các yêu cầu tài liệu, chứng thực từ khách hàng
          </p>
        </div>
        {pending > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertCircle size={14} className="text-amber-400" />
            <span className="text-sm font-medium text-amber-400">{pending} chờ xử lý</span>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "in_progress", label: "Đang xử lý" },
          { key: "completed", label: "Hoàn thành" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleStatusFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              statusFilter === key
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "border-[#1E2A4A] text-slate-400 hover:text-slate-200 hover:border-[#2A3A5A]"
            }`}
          >
            {label}
            {key !== "all" && (counts as Record<string, number>)[key] > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({(counts as Record<string, number>)[key]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Requests list */}
      {loading ? (
        <div className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] p-12 text-center text-sm text-slate-500">
          Đang tải...
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] p-16 text-center">
          <ClipboardList size={32} className="mx-auto mb-3 text-slate-600" />
          <p className="text-slate-400 text-sm">Không có yêu cầu nào</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => {
            const isExpanded = expanded === req.id;
            const StatusIcon = req.status === "completed" ? Check : req.status === "in_progress" ? Clock : req.status === "rejected" ? XCircle : AlertCircle;
            const TypeIcon = TYPE_ICON[req.service_type] || FileText;
            const statusCfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
            const d = req.details || {};
            const adminNotes = (d.admin_notes as string) || "";

            return (
              <div key={req.id} className="bg-[#0D1733] rounded-xl border border-[#1E2A4A] overflow-hidden">
                {/* Header row */}
                <div
                  className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-[#111840] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : req.id)}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#1A2540] border border-[#2A3A5A] flex items-center justify-center shrink-0">
                    <TypeIcon size={16} className="text-amber-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-200">
                        {TYPE_LABEL[req.service_type] || req.service_type}
                      </span>
                      {(d.urgency as string) === "urgent" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">GẤP</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {req.users?.name || req.user_id}
                        {req.users?.company && <span className="text-slate-600">· {req.users.company}</span>}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(req.created_at)}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusCfg.color} flex items-center gap-1 shrink-0`}>
                    <StatusIcon size={11} />
                    {statusCfg.label}
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-slate-500 shrink-0" /> : <ChevronDown size={16} className="text-slate-500 shrink-0" />}
                </div>

                {/* Expanded detail + actions */}
                {isExpanded && (
                  <div className="border-t border-[#1E2A4A] px-4 py-4 space-y-4">
                    {/* Request details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {req.service_type === "document_request" && (
                        <>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Loại tài liệu yêu cầu</p>
                            <p className="text-sm text-slate-200 font-medium">{d.document_type as string || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Mức độ ưu tiên</p>
                            <p className="text-sm text-slate-200">{(d.urgency as string) === "urgent" ? "Gấp" : "Bình thường"}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-[11px] text-slate-500 mb-0.5">Mô tả từ khách hàng</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{d.description as string || "—"}</p>
                          </div>
                        </>
                      )}
                      {req.service_type === "certification" && (
                        <>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Loại chứng thực</p>
                            <p className="text-sm text-slate-200 font-medium">{d.certification_type as string || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Quốc gia đích</p>
                            <p className="text-sm text-slate-200">{d.destination_country as string || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Mục đích</p>
                            <p className="text-sm text-slate-300">{d.purpose as string || "—"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-500 mb-0.5">Hình thức nhận</p>
                            <p className="text-sm text-slate-300">{d.delivery_method as string || "—"} · {d.copies as string || 1} bản</p>
                          </div>
                          {d.notes && (
                            <div className="sm:col-span-2">
                              <p className="text-[11px] text-slate-500 mb-0.5">Ghi chú thêm</p>
                              <p className="text-sm text-slate-300">{d.notes as string}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Customer link */}
                    {req.users && (
                      <Link
                        href={`/admin/customers/${req.users.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <User size={12} />
                        Xem hồ sơ khách hàng → {req.users.name} ({req.users.email})
                      </Link>
                    )}

                    {/* Admin notes */}
                    <div>
                      <label className="text-[11px] text-slate-500 mb-1 block">Ghi chú xử lý (nội bộ)</label>
                      <textarea
                        defaultValue={adminNotes}
                        onChange={e => setNotes(n => ({ ...n, [req.id]: e.target.value }))}
                        rows={2}
                        placeholder="VD: Đã liên hệ đối tác, dự kiến hoàn thành 15/09..."
                        className="w-full bg-[#060C30] border border-[#1E2A4A] rounded-lg px-3 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40 resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    {req.status !== "completed" && req.status !== "rejected" && (
                      <div className="flex flex-wrap gap-2">
                        {req.status === "pending" && (
                          <button
                            onClick={() => updateRequest(req.id, "in_progress")}
                            disabled={saving === req.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 disabled:opacity-50 transition-colors"
                          >
                            <Clock size={13} />
                            {saving === req.id ? "Đang lưu..." : "Bắt đầu xử lý"}
                          </button>
                        )}
                        <button
                          onClick={() => updateRequest(req.id, "completed")}
                          disabled={saving === req.id}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                        >
                          <Check size={13} />
                          {saving === req.id ? "Đang lưu..." : "Đánh dấu hoàn thành"}
                        </button>
                        {req.service_type === "document_request" && req.users && (
                          <Link
                            href={`/admin/customers/${req.users.id}?tab=documents`}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                          >
                            <Upload size={13} />
                            Upload tài liệu cho khách →
                          </Link>
                        )}
                        <button
                          onClick={() => updateRequest(req.id, "rejected")}
                          disabled={saving === req.id}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                        >
                          <XCircle size={13} />
                          Từ chối
                        </button>
                      </div>
                    )}

                    {(req.status === "completed" || req.status === "rejected") && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Check size={13} />
                        Yêu cầu đã được {req.status === "completed" ? "hoàn thành" : "từ chối"}
                        {adminNotes && <span className="text-slate-400">· {adminNotes}</span>}
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
