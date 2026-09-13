"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, File, FileSpreadsheet, Image, FolderOpen, Stamp, X, Check, ExternalLink, Upload, InboxIcon, Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  category: string;
  file_url?: string;
  status: string;
  uploaded_by?: string;
  created_at: string;
}

function getExtension(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "file";
}

const FILE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText, docx: File, doc: File,
  xlsx: FileSpreadsheet, xls: FileSpreadsheet,
  jpg: Image, jpeg: Image, png: Image,
};

const FILE_COLORS: Record<string, string> = {
  pdf: "text-red-400", docx: "text-blue-400", doc: "text-blue-400",
  xlsx: "text-emerald-400", xls: "text-emerald-400",
  jpg: "text-purple-400", jpeg: "text-purple-400", png: "text-purple-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

type Category = "all" | string;

export default function DocumentsPage() {
  const t = useTranslations("dashboard.documents");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Certification modal
  const [certDoc, setCertDoc] = useState<Document | null>(null);
  const [certForm, setCertForm] = useState({
    certification_type: "",
    destination_country: "",
    purpose: "",
    copies: "1",
    delivery_method: "Digital (PDF certified copy)",
    notes: "",
  });
  const [certSubmitting, setCertSubmitting] = useState(false);
  const [certDone, setCertDone] = useState(false);

  // Upload modal
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({ name: "", category: "general" });
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Request document modal
  const [showRequest, setShowRequest] = useState(false);
  const [requestForm, setRequestForm] = useState({ document_type: "", description: "", urgency: "normal" });
  const [requesting, setRequesting] = useState(false);
  const [requestDone, setRequestDone] = useState(false);

  // Track which document IDs already have a pending/in_progress cert request
  const [pendingCertDocIds, setPendingCertDocIds] = useState<Set<string>>(new Set());

  // My requests (all service_requests for this user)
  const [myRequests, setMyRequests] = useState<Array<{ id: string; service_type: string; status: string; details: Record<string, unknown>; created_at: string }>>([]);

  const reload = () => {
    fetch("/api/dashboard/documents")
      .then(r => r.json())
      .then(d => { setDocuments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));

    fetch("/api/dashboard/certifications/pending")
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          const ids = new Set(d.map((r: { document_id: string }) => r.document_id).filter(Boolean));
          setPendingCertDocIds(ids as Set<string>);
        }
      })
      .catch(() => {});

    fetch("/api/dashboard/requests")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMyRequests(d); })
      .catch(() => {});
  };

  useEffect(() => { reload(); }, []);

  const categories = ["all", ...Array.from(new Set(documents.map(d => d.category).filter(Boolean)))];

  const filtered = activeCategory === "all"
    ? documents
    : documents.filter(d => d.category === activeCategory);

  const categoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      all: t("categories.all"),
      company: t("categories.company"),
      tax: t("categories.tax"),
      banking: t("categories.banking"),
      compliance: "Compliance",
      license: "Licenses",
      certification: "Certified",
      general: "General",
      customer: "My Uploads",
    };
    return labels[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
  };

  const submitCertRequest = async () => {
    if (!certForm.certification_type || !certForm.destination_country || !certForm.purpose) return;
    setCertSubmitting(true);
    const res = await fetch("/api/dashboard/documents/certify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_id: certDoc?.id, ...certForm, copies: parseInt(certForm.copies) || 1 }),
    });
    setCertSubmitting(false);
    if (!res.ok) { alert("Gửi yêu cầu thất bại. Vui lòng thử lại."); return; }
    setCertDone(true);
    setTimeout(() => {
      setCertDoc(null); setCertDone(false);
      setCertForm({ certification_type: "", destination_country: "", purpose: "", copies: "1", delivery_method: "Digital (PDF certified copy)", notes: "" });
    }, 2000);
  };

  const submitUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("category", uploadForm.category);
    if (uploadForm.name) fd.append("name", uploadForm.name);
    const res = await fetch("/api/dashboard/documents", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      setUploadDone(true);
      setTimeout(() => {
        setShowUpload(false); setUploadDone(false);
        setUploadFile(null); setUploadForm({ name: "", category: "general" });
        if (fileRef.current) fileRef.current.value = "";
        reload();
      }, 1500);
    }
  };

  const submitRequest = async () => {
    if (!requestForm.document_type || !requestForm.description) return;
    setRequesting(true);
    const res = await fetch("/api/dashboard/documents/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestForm),
    });
    setRequesting(false);
    if (!res.ok) { const err = await res.json().catch(() => ({})); alert(`Gửi yêu cầu thất bại: ${err.error || "Vui lòng thử lại"}`); return; }
    setRequestDone(true);
    setTimeout(() => {
      setShowRequest(false); setRequestDone(false);
      setRequestForm({ document_type: "", description: "", urgency: "normal" });
    }, 2000);
  };

  const modalClass = "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4";
  const cardClass = "bg-navy-800 rounded-2xl border border-navy-700 p-6 w-full max-w-lg";
  const inputClass = "w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40";
  const labelClass = "text-xs font-medium text-navy-400 mb-1.5 block";

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <p className="text-sm text-navy-400 mt-0.5">{t("subtitle")}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setShowRequest(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-navy-600 text-xs font-medium text-navy-300 hover:text-foreground hover:border-navy-500 transition-colors">
            <InboxIcon size={14} />
            <span className="hidden sm:inline">Yêu cầu tài liệu</span>
          </button>
          <button onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs font-medium hover:bg-gold/20 transition-colors">
            <Upload size={14} />
            <span className="hidden sm:inline">Gửi tài liệu</span>
          </button>
        </div>
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className={modalClass}>
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-foreground">Gửi tài liệu lên</h3>
              <button onClick={() => { setShowUpload(false); setUploadFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="p-1.5 text-navy-500 hover:text-foreground rounded-lg"><X size={16} /></button>
            </div>
            {uploadDone ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check size={20} className="text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-foreground">Đã gửi thành công!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Chọn file *</label>
                  <input ref={fileRef} type="file" onChange={e => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-navy-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-navy-700 file:text-navy-300 hover:file:bg-navy-600 cursor-pointer" />
                </div>
                <div>
                  <label className={labelClass}>Tên tài liệu (để trống = dùng tên file)</label>
                  <input value={uploadForm.name} onChange={e => setUploadForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="VD: Hộ chiếu, Giấy đăng ký kinh doanh..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Loại tài liệu</label>
                  <select value={uploadForm.category} onChange={e => setUploadForm(f => ({ ...f, category: e.target.value }))} className={inputClass}>
                    <option value="general">Khác</option>
                    <option value="company">Giấy tờ công ty</option>
                    <option value="tax">Thuế / Kế toán</option>
                    <option value="banking">Ngân hàng</option>
                    <option value="compliance">Compliance</option>
                    <option value="license">Giấy phép</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => { setShowUpload(false); setUploadFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                    className="flex-1 py-2.5 rounded-xl border border-navy-600 text-sm text-navy-300 hover:text-foreground">Hủy</button>
                  <button onClick={submitUpload} disabled={uploading || !uploadFile}
                    className="flex-1 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 disabled:opacity-50">
                    {uploading ? "Đang gửi..." : "Gửi lên"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request document modal */}
      {showRequest && (
        <div className={modalClass}>
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-foreground">Yêu cầu tài liệu từ Gloyce</h3>
                <p className="text-xs text-navy-400 mt-0.5">Đội ngũ sẽ chuẩn bị và gửi trong 3–5 ngày làm việc</p>
              </div>
              <button onClick={() => setShowRequest(false)} className="p-1.5 text-navy-500 hover:text-foreground rounded-lg"><X size={16} /></button>
            </div>
            {requestDone ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check size={20} className="text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-foreground">Yêu cầu đã được gửi! Chúng tôi sẽ liên hệ sớm.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Loại tài liệu cần *</label>
                  <select value={requestForm.document_type} onChange={e => setRequestForm(f => ({ ...f, document_type: e.target.value }))} className={inputClass}>
                    <option value="">— Chọn loại tài liệu —</option>
                    <option value="Company Certificate">Giấy chứng nhận thành lập công ty</option>
                    <option value="EIN Letter">Giấy xác nhận EIN (Mỹ)</option>
                    <option value="Articles of Organization">Điều lệ công ty (Articles of Organization)</option>
                    <option value="Operating Agreement">Thỏa thuận vận hành (Operating Agreement)</option>
                    <option value="Bank Statement">Sao kê ngân hàng</option>
                    <option value="Shareholder Register">Sổ cổ đông</option>
                    <option value="Business License">Giấy phép kinh doanh</option>
                    <option value="Tax Return">Tờ khai thuế</option>
                    <option value="Apostille">Chứng thực Apostille</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Mô tả chi tiết yêu cầu *</label>
                  <textarea value={requestForm.description} onChange={e => setRequestForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="VD: Cần giấy chứng nhận thành lập có công chứng để nộp cho ngân hàng tại Việt Nam..."
                    rows={3} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className={labelClass}>Mức độ ưu tiên</label>
                  <select value={requestForm.urgency} onChange={e => setRequestForm(f => ({ ...f, urgency: e.target.value }))} className={inputClass}>
                    <option value="normal">Bình thường (3–5 ngày làm việc)</option>
                    <option value="urgent">Gấp (1–2 ngày, phụ phí có thể phát sinh)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setShowRequest(false)}
                    className="flex-1 py-2.5 rounded-xl border border-navy-600 text-sm text-navy-300 hover:text-foreground">Hủy</button>
                  <button onClick={submitRequest} disabled={requesting || !requestForm.document_type || !requestForm.description}
                    className="flex-1 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 disabled:opacity-50">
                    {requesting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certification modal */}
      {certDoc && (
        <div className={modalClass}>
          <div className={cardClass}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-foreground">Request Certification</h3>
                <p className="text-xs text-navy-400 mt-0.5">Document: {certDoc.name}</p>
              </div>
              <button onClick={() => setCertDoc(null)} className="p-1.5 text-navy-500 hover:text-foreground rounded-lg"><X size={16} /></button>
            </div>
            {certDone ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check size={20} className="text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-foreground">Request submitted! Our team will be in touch.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Certification Type *</label>
                  <select value={certForm.certification_type} onChange={e => setCertForm(f => ({ ...f, certification_type: e.target.value }))} className={inputClass}>
                    <option value="">— Select —</option>
                    {["Apostille", "Notarization", "Embassy Legalization", "Certified True Copy", "Government Authentication"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Destination Country *</label>
                  <input value={certForm.destination_country} onChange={e => setCertForm(f => ({ ...f, destination_country: e.target.value }))}
                    placeholder="e.g. Vietnam, Singapore" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Purpose *</label>
                  <textarea value={certForm.purpose} onChange={e => setCertForm(f => ({ ...f, purpose: e.target.value }))}
                    placeholder="e.g. Opening a bank account, Government filing" rows={2}
                    className={`${inputClass} resize-none`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Copies Needed</label>
                    <input type="number" min="1" value={certForm.copies} onChange={e => setCertForm(f => ({ ...f, copies: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Delivery</label>
                    <select value={certForm.delivery_method} onChange={e => setCertForm(f => ({ ...f, delivery_method: e.target.value }))} className={inputClass}>
                      {["Digital (PDF certified copy)", "Physical — courier to Vietnam", "Physical — pick up in US/SG/HK"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Additional Notes</label>
                  <textarea value={certForm.notes} onChange={e => setCertForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any special requirements..." rows={2} className={`${inputClass} resize-none`} />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setCertDoc(null)} className="flex-1 py-2.5 rounded-xl border border-navy-600 text-sm text-navy-300 hover:text-foreground">Cancel</button>
                  <button onClick={submitCertRequest} disabled={certSubmitting || !certForm.certification_type || !certForm.destination_country || !certForm.purpose}
                    className="flex-1 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 disabled:opacity-50">
                    {certSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-gold/10 text-gold border border-gold/20"
                : "text-navy-400 hover:text-foreground border border-navy-700 hover:border-navy-600")}>
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Document list */}
      {loading ? (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-10 text-center text-sm text-navy-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-navy-700 border border-navy-600 flex items-center justify-center">
            <FolderOpen size={24} className="text-navy-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground mb-1">{t("noDocumentsTitle")}</p>
            <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">{t("noDocuments")}</p>
          </div>
        </div>
      ) : (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
          {filtered.map((doc) => {
            const ext = getExtension(doc.name);
            const Icon = FILE_ICONS[ext] || File;
            const color = FILE_COLORS[ext] || "text-navy-400";
            const fromGloyce = doc.uploaded_by === "Gloyce";
            return (
              <div key={doc.id}
                className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 border-b border-navy-700/50 last:border-0 hover:bg-navy-750 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon size={16} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {ext.toUpperCase()} · {t("uploadedAt")} {formatDate(doc.created_at)}
                    {doc.uploaded_by && ` · ${doc.uploaded_by}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {fromGloyce && (
                    <Badge variant="gold" className="text-[10px] hidden sm:flex mr-1">Gloyce</Badge>
                  )}
                  {!fromGloyce && (
                    pendingCertDocIds.has(doc.id)
                      ? <span title="Đang chờ chứng thực" className="p-1.5 text-amber-400/60 cursor-default flex items-center">
                          <Stamp size={14} />
                        </span>
                      : <button onClick={() => { setCertDoc(doc); setCertDone(false); }}
                          title="Yêu cầu chứng thực"
                          className="p-1.5 text-navy-500 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
                          <Stamp size={14} />
                        </button>
                  )}
                  {doc.file_url && (
                    <>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                        title="Xem"
                        className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                        <ExternalLink size={14} />
                      </a>
                      <a href={doc.file_url} download
                        title="Tải xuống"
                        className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                        <Download size={14} />
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Requests */}
      {myRequests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock size={14} className="text-navy-400" />
            Yêu cầu của tôi
          </h3>
          <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
            {myRequests.map((req) => {
              const d = req.details as Record<string, unknown>;
              const isPending = req.status === "pending";
              const isInProgress = req.status === "in_progress";
              const isCompleted = req.status === "completed";
              const isRejected = req.status === "rejected";

              const statusBadge = isPending
                ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={10} />Chờ xử lý</span>
                : isInProgress
                ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><AlertCircle size={10} />Đang xử lý</span>
                : isCompleted
                ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 size={10} />Hoàn thành</span>
                : isRejected
                ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20"><XCircle size={10} />Từ chối</span>
                : null;

              const typeBadge = req.service_type === "certification"
                ? <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">Chứng thực</span>
                : <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-navy-700 text-navy-300 border border-navy-600">Yêu cầu tài liệu</span>;

              const summary = req.service_type === "certification"
                ? [d.certification_type, d.destination_country].filter(Boolean).map(String).join(" · ")
                : [d.document_type, d.urgency === "urgent" ? "⚡ Gấp" : null].filter(Boolean).map(String).join(" · ");

              const adminNotes = typeof d.admin_notes === "string" && d.admin_notes ? d.admin_notes : null;

              return (
                <div key={req.id} className="flex items-start gap-3 px-4 py-3.5 border-b border-navy-700/50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {typeBadge}
                      {statusBadge}
                    </div>
                    {summary && <p className="text-sm text-foreground truncate">{summary}</p>}
                    {adminNotes && (
                      <p className="text-xs text-navy-400 mt-1 italic">"{adminNotes}"</p>
                    )}
                    <p className="text-xs text-navy-500 mt-0.5">{formatDate(req.created_at)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certification info box */}
      <div className="p-4 rounded-xl bg-navy-800 border border-navy-700 flex items-start gap-3">
        <Stamp size={16} className="text-navy-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Cần chứng thực tài liệu?</p>
          <p className="text-xs text-navy-500 mt-0.5">Nhấn vào biểu tượng <Stamp size={10} className="inline" /> trên tài liệu bạn đã tải lên để yêu cầu Apostille, công chứng, hoặc chứng thực chính phủ. Chúng tôi xử lý trong 3–5 ngày làm việc.</p>
        </div>
      </div>
    </div>
  );
}
