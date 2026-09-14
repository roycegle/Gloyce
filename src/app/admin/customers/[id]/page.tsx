"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle, XCircle, FileText, DollarSign, ClipboardList, FolderOpen, Upload, Trash2, ExternalLink, Download, ChevronDown, ChevronUp, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface User { id: string; name: string; email: string; phone?: string; company?: string; status: string; created_at: string; }
interface Service { id: string; type: string; name: string; status: string; current_step: number; total_steps: number; price?: number; created_at: string; }
interface Invoice { id: string; amount: number; currency: string; status: string; description?: string; due_date?: string; paid_at?: string; created_at: string; services?: { name: string; type: string }; }
interface Request { id: string; service_type: string; status: string; details: Record<string, unknown>; created_at: string; }
interface Document { id: string; name: string; category?: string; file_url?: string; status: string; uploaded_by: string; created_at: string; }
interface FormTemplate { id: string; name: string; description?: string; category: string; }
interface CustomerForm { id: string; status: string; notes?: string; due_date?: string; created_at: string; submitted_at?: string; reviewed_at?: string; gov_submitted_at?: string; admin_review_notes?: string; gov_submission_notes?: string; responses?: Record<string, string>; form_templates?: FormTemplate; services?: { name: string; type: string }; }
interface FormField { id: string; label: string; field_type: string; required: boolean; options?: string[]; order_index: number; }
interface AdminFormDetail extends CustomerForm { fields: FormField[]; }

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  action_required: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-ink-700 text-ink-400",
  in_progress: "bg-blue-100 text-blue-700",
};

type Tab = "overview" | "services" | "billing" | "requests" | "documents" | "forms";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{ user: User; services: Service[]; invoices: Invoice[]; requests: Request[]; documents: Document[]; forms: CustomerForm[] } | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [newService, setNewService] = useState({ type: "execute", name: "", price: "", total_steps: "5" });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ amount: "", description: "", due_date: "", service_id: "" });
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [showFormAssign, setShowFormAssign] = useState(false);
  const [assignForm, setAssignForm] = useState({ template_id: "", service_id: "", due_date: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [docUpload, setDocUpload] = useState({ name: "", category: "company", service_id: "" });
  const [docFile, setDocFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form review state
  const [expandedForm, setExpandedForm] = useState<string | null>(null);
  const [formDetail, setFormDetail] = useState<AdminFormDetail | null>(null);
  const [formDetailLoading, setFormDetailLoading] = useState(false);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [govNotes, setGovNotes] = useState<Record<string, string>>({});
  const [reviewSaving, setReviewSaving] = useState<string | null>(null);

  // Result file upload per request
  const [resultUploadId, setResultUploadId] = useState<string | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [resultUploading, setResultUploading] = useState(false);
  const resultFileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch(`/api/admin/customers/${id}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    load();
    fetch("/api/admin/form-templates").then(r => r.json()).then(d => setTemplates(Array.isArray(d) ? d : []));
  }, [id]);

  const uploadResult = async (id: string, source: "service" | "service_request" = "service_request") => {
    if (!resultFile) return;
    setResultUploading(true);
    const fd = new FormData();
    fd.append("file", resultFile);
    const endpoint = source === "service"
      ? `/api/admin/services/${id}/result`
      : `/api/admin/requests/${id}/result`;
    const res = await fetch(endpoint, { method: "POST", body: fd });
    setResultUploading(false);
    if (res.ok) {
      toast.success("Đã upload kết quả và đánh dấu hoàn thành");
      setResultUploadId(null); setResultFile(null);
      if (resultFileRef.current) resultFileRef.current.value = "";
      await load();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(`Lỗi: ${err.error || "Upload thất bại"}`);
    }
  };

  const updateStatus = async (status: string) => {
    setSaving(true);
    await fetch(`/api/admin/customers/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await load(); setSaving(false);
  };

  const createService = async () => {
    if (!newService.name) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: id, type: newService.type, name: newService.name, price: parseFloat(newService.price) || null, total_steps: parseInt(newService.total_steps) }) });
      if (!res.ok) throw new Error();
      setNewService({ type: "execute", name: "", price: "", total_steps: "5" });
      setShowServiceForm(false);
      await load();
      toast.success("Đã tạo dịch vụ");
    } catch {
      toast.error("Tạo dịch vụ thất bại");
    }
    setSaving(false);
  };

  const updateServiceStep = async (serviceId: string, step: number, total: number) => {
    await fetch(`/api/admin/services/${serviceId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current_step: step, status: step >= total ? "completed" : "active" }) });
    await load();
  };

  const createInvoice = async () => {
    if (!newInvoice.amount) return;
    setSaving(true);
    await fetch("/api/admin/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: id, amount: parseFloat(newInvoice.amount), description: newInvoice.description, due_date: newInvoice.due_date || null, service_id: newInvoice.service_id || null }) });
    setNewInvoice({ amount: "", description: "", due_date: "", service_id: "" }); setShowInvoiceForm(false);
    await load(); setSaving(false);
  };

  const updateInvoiceStatus = async (invoiceId: string, status: string) => {
    await fetch(`/api/admin/invoices/${invoiceId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await load();
  };

  const uploadDocument = async () => {
    if (!docFile) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("file", docFile);
      fd.append("user_id", id);
      fd.append("category", docUpload.category);
      if (docUpload.name) fd.append("name", docUpload.name);
      if (docUpload.service_id) fd.append("service_id", docUpload.service_id);
      const res = await fetch("/api/admin/documents", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      setDocFile(null);
      setDocUpload({ name: "", category: "company", service_id: "" });
      setShowDocUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await load();
      toast.success("Tài liệu đã được gửi thành công");
    } catch {
      toast.error("Gửi tài liệu thất bại. Vui lòng thử lại.");
    }
    setSaving(false);
  };

  const deleteDocument = async (docId: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch("/api/admin/documents", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: docId }) });
      if (!res.ok) throw new Error("Delete failed");
      await load();
      toast.success("Đã xóa tài liệu");
    } catch {
      toast.error("Xóa tài liệu thất bại");
    }
  };

  const assignTemplate = async () => {
    if (!assignForm.template_id) return;
    setSaving(true);
    await fetch(`/api/admin/customers/${id}/forms`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(assignForm) });
    setAssignForm({ template_id: "", service_id: "", due_date: "", notes: "" }); setShowFormAssign(false);
    await load(); setSaving(false);
  };

  const expandForm = async (formId: string) => {
    if (expandedForm === formId) { setExpandedForm(null); setFormDetail(null); return; }
    setExpandedForm(formId);
    setFormDetail(null);
    setFormDetailLoading(true);
    const res = await fetch(`/api/admin/forms/${formId}`);
    const d = await res.json();
    setFormDetail(d);
    setFormDetailLoading(false);
  };

  const patchForm = async (formId: string, body: Record<string, unknown>) => {
    setReviewSaving(formId);
    const res = await fetch(`/api/admin/forms/${formId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setReviewSaving(null);
    if (!res.ok) { toast.error("Lỗi cập nhật form"); return; }
    toast.success("Đã cập nhật");
    await load();
    // Reload form detail
    const d = await fetch(`/api/admin/forms/${formId}`).then(r => r.json());
    setFormDetail(d);
  };

  if (!data) return <div className="p-8 text-center text-ink-400">Loading...</div>;

  const { user, services, invoices, requests, documents, forms } = data;

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "services", label: "Services", count: services.length },
    { key: "billing", label: "Billing", count: invoices.length },
    { key: "requests", label: "Requests", count: services.length + requests.length },
    { key: "documents", label: "Documents", count: documents.length },
    { key: "forms", label: "Forms", count: forms.length },
  ];

  const totalBilled = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/customers" className="text-ink-400 hover:text-ink-300"><ArrowLeft size={20} /></Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-ink-400">{user.email} {user.company && `· ${user.company}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[user.status] || "bg-ink-700 text-ink-300"}`}>{user.status}</span>
          {user.status === "pending" && <button onClick={() => updateStatus("active")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600"><CheckCircle size={13} /> Activate</button>}
          {user.status === "active" && <button onClick={() => updateStatus("suspended")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600"><XCircle size={13} /> Suspend</button>}
          {user.status === "suspended" && <button onClick={() => updateStatus("active")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600"><CheckCircle size={13} /> Reactivate</button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-ink-600 overflow-x-auto">
        {tabs.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${tab === key ? "border-amber-500 text-amber-600" : "border-transparent text-ink-400 hover:text-slate-300"}`}>
            {label}
            {count !== undefined && count > 0 && <span className={`text-xs rounded-full px-1.5 py-0.5 ${tab === key ? "bg-amber-100 text-amber-700" : "bg-ink-700 text-ink-400"}`}>{count}</span>}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-ink-800 rounded-xl border border-ink-600 p-5">
            <h2 className="font-semibold text-slate-200 mb-4">Customer Info</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[["Name", user.name], ["Email", user.email], ["Phone", user.phone || "—"], ["Company", user.company || "—"], ["Status", user.status], ["Registered", new Date(user.created_at).toLocaleDateString()]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-ink-400">{k}</dt>
                  <dd className="font-medium text-slate-300 capitalize">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5">
              <h2 className="font-semibold text-slate-200 mb-3 flex items-center gap-2"><DollarSign size={15} className="text-green-500" /> Billing Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-ink-900 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">${totalBilled.toLocaleString()}</p>
                  <p className="text-xs text-ink-400">Total Billed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-700">${totalPaid.toLocaleString()}</p>
                  <p className="text-xs text-ink-400">Total Paid</p>
                </div>
              </div>
            </div>
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5">
              <h2 className="font-semibold text-slate-200 mb-3 flex items-center gap-2"><ClipboardList size={15} className="text-amber-500" /> Open Requests</h2>
              {requests.filter(r => r.status !== "completed").length === 0
                ? <p className="text-sm text-ink-400">No open requests</p>
                : requests.filter(r => r.status !== "completed").slice(0, 3).map(r => (
                  <div key={r.id} className="flex items-center justify-between py-1.5 text-sm">
                    <span className="text-slate-300 capitalize">{r.service_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[r.status] || "bg-ink-700 text-ink-400"}`}>{r.status}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      {tab === "services" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowServiceForm(!showServiceForm)} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"><Plus size={15} /> Add Service</button>
          </div>
          {showServiceForm && (
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-4">
              <h3 className="font-semibold text-slate-200 mb-4">New Service</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Service Type</label>
                  <select value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <optgroup label="Company Formation">
                      <option value="us_llc">US LLC Formation</option>
                      <option value="singapore">Singapore Company</option>
                      <option value="hong_kong">Hong Kong Company</option>
                    </optgroup>
                    <optgroup label="Banking & Payments">
                      <option value="us_bank">US Bank Account</option>
                      <option value="payment_gateway">Payment Gateway</option>
                    </optgroup>
                    <optgroup label="Compliance">
                      <option value="accounting">Monthly Accounting</option>
                      <option value="odi">ODI Registration</option>
                      <option value="certification">Document Certification</option>
                    </optgroup>
                    <optgroup label="Tiers">
                      <option value="execute">EXECUTE (custom)</option>
                      <option value="operate">OPERATE (custom)</option>
                      <option value="strategize">STRATEGIZE</option>
                    </optgroup>
                  </select></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Service Name</label>
                  <input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. US LLC Formation" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Price (USD)</label>
                  <input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} placeholder="499" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Total Steps</label>
                  <input type="number" value={newService.total_steps} onChange={(e) => setNewService({ ...newService, total_steps: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowServiceForm(false)} className="px-3 py-1.5 text-sm text-ink-400 hover:text-slate-300">Cancel</button>
                <button onClick={createService} disabled={saving || !newService.name} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create</button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {services.length === 0 ? <div className="bg-ink-800 rounded-xl border border-ink-600 p-8 text-center text-ink-400 text-sm">No services yet</div>
              : services.map((s) => (
                <div key={s.id} className="bg-ink-800 rounded-xl border border-ink-600 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><span className="text-xs font-bold uppercase tracking-wider text-amber-600">{s.type}</span>
                      <h3 className="font-semibold text-foreground mt-0.5">{s.name}</h3>
                      {s.price && <p className="text-xs text-ink-400">${s.price.toLocaleString()}</p>}</div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[s.status] || "bg-ink-700 text-ink-400"}`}>{s.status}</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-ink-400 mb-1"><span>Step {s.current_step} of {s.total_steps}</span><span>{Math.round((s.current_step / s.total_steps) * 100)}%</span></div>
                    <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${(s.current_step / s.total_steps) * 100}%` }} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink-400">Update step:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: s.total_steps }, (_, i) => i + 1).map((step) => (
                        <button key={step} onClick={() => updateServiceStep(s.id, step, s.total_steps)}
                          className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${step === s.current_step ? "bg-amber-500 text-white" : step < s.current_step ? "bg-amber-100 text-amber-700" : "bg-ink-700 text-ink-400 hover:bg-ink-700"}`}>
                          {step}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Billing */}
      {tab === "billing" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowInvoiceForm(!showInvoiceForm)} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"><Plus size={15} /> New Invoice</button>
          </div>
          {showInvoiceForm && (
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-4">
              <h3 className="font-semibold text-slate-200 mb-4">New Invoice</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Amount (USD)</label>
                  <input type="number" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} placeholder="500" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Due Date</label>
                  <input type="date" value={newInvoice.due_date} onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Description</label>
                  <input value={newInvoice.description} onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })} placeholder="e.g. US LLC Formation — Setup fee" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Related Service (optional)</label>
                  <select value={newInvoice.service_id} onChange={(e) => setNewInvoice({ ...newInvoice, service_id: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowInvoiceForm(false)} className="px-3 py-1.5 text-sm text-ink-400 hover:text-slate-300">Cancel</button>
                <button onClick={createInvoice} disabled={saving || !newInvoice.amount} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create Invoice</button>
              </div>
            </div>
          )}
          <div className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
            {invoices.length === 0 ? <div className="p-12 text-center text-ink-400 text-sm"><DollarSign size={28} className="mx-auto mb-2 text-ink-500" />No invoices yet</div>
              : (
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-ink-600 bg-ink-900">
                    <th className="text-left px-4 py-3 font-medium text-ink-400">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400">Amount</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400 hidden md:table-cell">Due</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400">Status</th>
                    <th className="px-4 py-3" />
                  </tr></thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-ink-600">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-200">{inv.description || "—"}</p>
                          {inv.services && <p className="text-xs text-ink-400">{inv.services.name}</p>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">${inv.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-ink-400 hidden md:table-cell">{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[inv.status] || "bg-ink-700 text-ink-400"}`}>{inv.status}</span></td>
                        <td className="px-4 py-3 text-right">
                          {inv.status === "pending" && (
                            <button onClick={() => updateInvoiceStatus(inv.id, "paid")} className="text-xs text-green-600 hover:text-green-700 font-medium">Mark Paid</button>
                          )}
                          {inv.status === "paid" && <span className="text-xs text-ink-400">Paid {inv.paid_at ? new Date(inv.paid_at).toLocaleDateString() : ""}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </div>
      )}

      {/* Requests */}
      {tab === "requests" && (
        <div className="flex flex-col gap-3">
          {/* Standard service purchases */}
          {services.map((svc) => {
            const svcStatus = svc.status === "complete" ? "completed" : svc.status === "pending" ? "pending" : "in_progress";
            const isComplete = svc.status === "complete";
            return (
              <div key={`svc-${svc.id}`} className="bg-ink-800 rounded-xl border border-ink-600 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">Dịch vụ mua</span>
                      <p className="text-sm font-semibold text-slate-200">{svc.name}</p>
                    </div>
                    <p className="text-xs text-ink-400 mt-0.5">{new Date(svc.created_at).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${STATUS_BADGE[svcStatus] || "bg-ink-700 text-ink-400"}`}>{svcStatus}</span>
                </div>
                <div className="text-xs text-ink-400 mb-3">
                  Bước {svc.current_step}/{svc.total_steps}
                  {svc.price && <span className="ml-3">${svc.price.toLocaleString()} USD</span>}
                </div>
                {!isComplete && (
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => { setResultUploadId(`svc-${svc.id}`); setResultFile(null); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20">
                      <Upload size={12} /> Upload kết quả
                    </button>
                  </div>
                )}
                {resultUploadId === `svc-${svc.id}` && (
                  <div className="mt-3 p-3 rounded-lg bg-ink-900 border border-ink-600">
                    <p className="text-xs font-medium text-slate-300 mb-2">Upload file kết quả — tự động đánh dấu hoàn thành</p>
                    <input ref={resultFileRef} type="file"
                      onChange={e => setResultFile(e.target.files?.[0] || null)}
                      className="w-full text-xs border border-ink-600 rounded-lg px-3 py-2 mb-2 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                    <div className="flex gap-2">
                      <button onClick={() => { setResultUploadId(null); setResultFile(null); }} className="px-3 py-1.5 text-xs text-ink-400 hover:text-slate-300">Hủy</button>
                      <button onClick={() => uploadResult(svc.id, "service")} disabled={!resultFile || resultUploading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-50">
                        <Upload size={12} />{resultUploading ? "Đang upload..." : "Upload & Hoàn thành"}
                      </button>
                    </div>
                  </div>
                )}
                {isComplete && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle size={13} /> Dịch vụ đã hoàn thành
                  </div>
                )}
              </div>
            );
          })}

          {/* Custom service_requests */}
          {requests.length === 0 && services.length === 0
            ? <div className="bg-ink-800 rounded-xl border border-ink-600 p-12 text-center text-ink-400 text-sm"><ClipboardList size={28} className="mx-auto mb-2 text-ink-500" />No requests yet</div>
            : requests.map((r) => {
              const d = r.details || {};
              const TYPE_LABEL: Record<string, string> = { document_request: "Yêu cầu tài liệu", certification: "Yêu cầu chứng thực" };
              // Find source document for certification requests from already-loaded documents
              const sourceDoc = r.service_type === "certification" && d.document_id
                ? documents.find(doc => doc.id === String(d.document_id)) ?? null
                : null;
              return (
                <div key={r.id} className="bg-ink-800 rounded-xl border border-ink-600 p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">Yêu cầu đặc biệt</span>
                        <p className="text-sm font-semibold text-slate-200">
                          {TYPE_LABEL[r.service_type] || r.service_type}
                          {(d.urgency as string) === "urgent" && <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">GẤP</span>}
                        </p>
                      </div>
                      <p className="text-xs text-ink-400 mt-0.5">{new Date(r.created_at).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize shrink-0 ${STATUS_BADGE[r.status] || "bg-ink-700 text-ink-400"}`}>{r.status}</span>
                  </div>
                  {/* Source document for certification */}
                  {r.service_type === "certification" && (
                    <div className="mb-3 p-2.5 rounded-lg border border-ink-600 bg-ink-900">
                      <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1.5">File cần chứng thực</p>
                      {sourceDoc ? (
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-amber-400 shrink-0" />
                          <span className="text-sm text-slate-200 flex-1 truncate">{sourceDoc.name}</span>
                          {sourceDoc.file_url && (
                            <div className="flex items-center gap-1 shrink-0">
                              <a href={sourceDoc.file_url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 px-2 py-1 rounded bg-ink-700 text-xs text-ink-300 hover:text-slate-200">
                                <ExternalLink size={11} />Xem
                              </a>
                              <a href={sourceDoc.file_url} download
                                className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 hover:bg-amber-500/20">
                                <Download size={11} />Tải về
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-ink-500 italic">Không tìm thấy file gốc</p>
                      )}
                    </div>
                  )}
                  <div className="text-xs text-ink-400 mb-3 space-y-1">
                    {!!(d.document_type) && <p><span className="text-ink-300">Loại:</span> {String(d.document_type)}</p>}
                    {!!(d.certification_type) && <p><span className="text-ink-300">Chứng thực:</span> {String(d.certification_type)}</p>}
                    {!!(d.description) && <p><span className="text-ink-300">Mô tả:</span> {String(d.description)}</p>}
                    {!!(d.purpose) && <p><span className="text-ink-300">Mục đích:</span> {String(d.purpose)}</p>}
                    {!!(d.destination_country) && <p><span className="text-ink-300">Quốc gia:</span> {String(d.destination_country)}</p>}
                    {!!(d.admin_notes) && <p className="text-emerald-400"><span className="text-ink-300">Ghi chú nội bộ:</span> {String(d.admin_notes)}</p>}
                  </div>
                  {r.status !== "completed" && r.status !== "rejected" && (
                    <div className="flex flex-wrap gap-2">
                      {r.status === "pending" && (
                        <button onClick={async () => { await fetch(`/api/admin/requests/${r.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "in_progress" }) }); await load(); toast.success("Đang xử lý"); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20">
                          <CheckCircle size={12} /> Bắt đầu xử lý
                        </button>
                      )}
                      <button onClick={() => { setResultUploadId(r.id); setResultFile(null); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20">
                        <Upload size={12} /> Upload kết quả
                      </button>
                      <button onClick={async () => { await fetch(`/api/admin/requests/${r.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "rejected" }) }); await load(); toast.success("Đã từ chối"); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20">
                        <XCircle size={12} /> Từ chối
                      </button>
                    </div>
                  )}
                  {/* Result upload panel */}
                  {resultUploadId === r.id && (
                    <div className="mt-3 p-3 rounded-lg bg-ink-900 border border-ink-600">
                      <p className="text-xs font-medium text-slate-300 mb-2">Upload file kết quả — tự động đánh dấu hoàn thành</p>
                      <input ref={resultFileRef} type="file"
                        onChange={e => setResultFile(e.target.files?.[0] || null)}
                        className="w-full text-xs border border-ink-600 rounded-lg px-3 py-2 mb-2 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                      <div className="flex gap-2">
                        <button onClick={() => { setResultUploadId(null); setResultFile(null); }}
                          className="px-3 py-1.5 text-xs text-ink-400 hover:text-slate-300">Hủy</button>
                        <button onClick={() => uploadResult(r.id, "service_request")} disabled={!resultFile || resultUploading}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-50">
                          <Upload size={12} />{resultUploading ? "Đang upload..." : "Upload & Hoàn thành"}
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Result file for completed requests */}
                  {r.status === "completed" && (d.result_url as string) && (
                    <div className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                      <span className="text-xs text-emerald-400 flex-1 truncate">Kết quả: {(d.result_filename as string) || "file"}</span>
                      <a href={d.result_url as string} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-ink-400 hover:text-slate-200">Xem</a>
                    </div>
                  )}
                  {(r.status === "completed" || r.status === "rejected") && !(d.result_url) && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-2 text-xs text-ink-500 flex-1 min-w-0">
                        <CheckCircle size={13} className="shrink-0" />
                        Yêu cầu đã được {r.status === "completed" ? "hoàn thành" : "từ chối"}
                      </div>
                      <button
                        onClick={() => { setResultUploadId(r.id); setResultFile(null); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                      >
                        <Upload size={12} />
                        Upload kết quả
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          }
        </div>
      )}

      {/* Documents */}
      {tab === "documents" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowDocUpload(!showDocUpload)} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"><Upload size={15} /> Upload Document</button>
          </div>
          {showDocUpload && (
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-4">
              <h3 className="font-semibold text-slate-200 mb-4">Upload Document to Customer Folder</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-ink-400 mb-1 block">File *</label>
                  <input ref={fileInputRef} type="file" onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                    className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                </div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Display Name (optional)</label>
                  <input value={docUpload.name} onChange={(e) => setDocUpload({ ...docUpload, name: e.target.value })} placeholder="e.g. Articles of Organization" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Category / Folder</label>
                  <select value={docUpload.category} onChange={(e) => setDocUpload({ ...docUpload, category: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <option value="company">Company Documents</option>
                    <option value="tax">Tax Documents</option>
                    <option value="banking">Banking Documents</option>
                    <option value="compliance">Compliance / ODI</option>
                    <option value="license">Licenses & Permits</option>
                    <option value="certification">Certified Documents</option>
                    <option value="general">General</option>
                  </select></div>
                <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Related Service (optional)</label>
                  <select value={docUpload.service_id} onChange={(e) => setDocUpload({ ...docUpload, service_id: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowDocUpload(false); setDocFile(null); }} className="px-3 py-1.5 text-sm text-ink-400 hover:text-slate-300">Cancel</button>
                <button onClick={uploadDocument} disabled={saving || !docFile} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">{saving ? "Uploading..." : "Upload"}</button>
              </div>
            </div>
          )}
          <div className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
            {documents.length === 0 ? <div className="p-12 text-center text-ink-400 text-sm"><FolderOpen size={28} className="mx-auto mb-2 text-ink-500" />No documents yet — upload one above</div>
              : (
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-ink-600 bg-ink-900">
                    <th className="text-left px-4 py-3 font-medium text-ink-400">Document</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400 hidden lg:table-cell">Uploaded</th>
                    <th className="text-left px-4 py-3 font-medium text-ink-400">Status</th>
                    <th className="px-4 py-3" />
                  </tr></thead>
                  <tbody>
                    {documents.map((d) => (
                      <tr key={d.id} className="border-b border-ink-600">
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><FileText size={15} className="text-ink-400" /><span className="font-medium text-slate-200">{d.name}</span></div></td>
                        <td className="px-4 py-3 text-ink-400 capitalize hidden md:table-cell">{d.category || "—"}</td>
                        <td className="px-4 py-3 text-ink-400 hidden lg:table-cell">{new Date(d.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[d.status] || "bg-ink-700 text-ink-400"}`}>{d.status}</span></td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {d.file_url && <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"><ExternalLink size={14} /></a>}
                            <button onClick={() => deleteDocument(d.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </div>
      )}

      {/* Forms */}
      {tab === "forms" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowFormAssign(!showFormAssign)} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"><Plus size={15} /> Assign Form</button>
          </div>
          {showFormAssign && (
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-4">
              <h3 className="font-semibold text-slate-200 mb-4">Assign Form Template</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Form Template</label>
                  <select value={assignForm.template_id} onChange={(e) => setAssignForm({ ...assignForm, template_id: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <option value="">— Select template —</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name} ({t.category})</option>)}
                  </select></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Related Service (optional)</label>
                  <select value={assignForm.service_id} onChange={(e) => setAssignForm({ ...assignForm, service_id: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
                <div><label className="text-xs font-medium text-ink-400 mb-1 block">Due Date (optional)</label>
                  <input type="date" value={assignForm.due_date} onChange={(e) => setAssignForm({ ...assignForm, due_date: e.target.value })} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Notes</label>
                  <input value={assignForm.notes} onChange={(e) => setAssignForm({ ...assignForm, notes: e.target.value })} placeholder="Instructions for the customer..." className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowFormAssign(false)} className="px-3 py-1.5 text-sm text-ink-400 hover:text-slate-300">Cancel</button>
                <button onClick={assignTemplate} disabled={saving || !assignForm.template_id} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Assign</button>
              </div>
            </div>
          )}
          {forms.length === 0
            ? <div className="bg-ink-800 rounded-xl border border-ink-600 p-12 text-center text-ink-400 text-sm"><FileText size={28} className="mx-auto mb-2 text-ink-500" />No forms assigned yet</div>
            : (
              <div className="space-y-3">
                {forms.map((f) => {
                  const isExpanded = expandedForm === f.id;
                  const isSaving = reviewSaving === f.id;
                  const FORM_STATUS: Record<string, string> = {
                    pending: "bg-amber-900/40 text-amber-300 border border-amber-700/40",
                    draft: "bg-ink-700 text-ink-300 border border-ink-600",
                    submitted: "bg-blue-900/40 text-blue-300 border border-blue-700/40",
                    approved: "bg-green-900/40 text-green-300 border border-green-700/40",
                    gov_submitted: "bg-purple-900/40 text-purple-300 border border-purple-700/40",
                    needs_update: "bg-red-900/40 text-red-300 border border-red-700/40",
                    completed: "bg-teal-900/40 text-teal-300 border border-teal-700/40",
                  };
                  const FORM_STATUS_LABEL: Record<string, string> = {
                    pending: "Chờ khách hàng", draft: "Bản nháp", submitted: "Đã nộp",
                    approved: "Đã duyệt", gov_submitted: "Đã nộp chính phủ",
                    needs_update: "Cần bổ sung", completed: "Hoàn thành",
                  };
                  return (
                    <div key={f.id} className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
                      {/* Header row */}
                      <button onClick={() => expandForm(f.id)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-ink-700/50 transition-colors">
                        <FileText size={18} className="text-ink-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-200 truncate">{f.form_templates?.name || "—"}</p>
                          <p className="text-xs text-ink-400">{f.form_templates?.category || ""}{f.due_date ? ` · Due ${new Date(f.due_date).toLocaleDateString()}` : ""}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${FORM_STATUS[f.status] || "bg-ink-700 text-ink-400"}`}>{FORM_STATUS_LABEL[f.status] || f.status}</span>
                        {isExpanded ? <ChevronUp size={16} className="text-ink-400 shrink-0" /> : <ChevronDown size={16} className="text-ink-400 shrink-0" />}
                      </button>

                      {/* Expanded panel */}
                      {isExpanded && (
                        <div className="border-t border-ink-600 px-5 py-4">
                          {formDetailLoading ? (
                            <div className="py-8 text-center text-ink-400 text-sm">Loading...</div>
                          ) : formDetail && formDetail.id === f.id ? (
                            <div className="space-y-5">
                              {/* Q&A responses */}
                              {formDetail.fields.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Câu trả lời của khách hàng</h4>
                                  <div className="space-y-3">
                                    {formDetail.fields.map((field) => (
                                      <div key={field.id} className="bg-ink-900 rounded-lg px-4 py-3">
                                        <p className="text-xs text-ink-400 mb-1">{field.label}{field.required && <span className="text-red-400 ml-0.5">*</span>}</p>
                                        <p className="text-sm text-slate-200 whitespace-pre-wrap">{formDetail.responses?.[field.id] || <span className="text-ink-500 italic">Chưa điền</span>}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Admin review notes display */}
                              {formDetail.admin_review_notes && (
                                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-3">
                                  <p className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1"><AlertTriangle size={12} /> Ghi chú duyệt</p>
                                  <p className="text-sm text-amber-200">{formDetail.admin_review_notes}</p>
                                </div>
                              )}
                              {formDetail.gov_submission_notes && (
                                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg px-4 py-3">
                                  <p className="text-xs font-semibold text-purple-400 mb-1">Ghi chú nộp chính phủ</p>
                                  <p className="text-sm text-purple-200">{formDetail.gov_submission_notes}</p>
                                </div>
                              )}

                              {/* Action buttons by status */}
                              {f.status === "submitted" && (
                                <div className="space-y-3 border-t border-ink-600 pt-4">
                                  <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Kiểm duyệt form</h4>
                                  <textarea
                                    value={reviewNotes[f.id] || ""}
                                    onChange={(e) => setReviewNotes(n => ({ ...n, [f.id]: e.target.value }))}
                                    placeholder="Ghi chú nếu cần bổ sung (bắt buộc khi từ chối)..."
                                    rows={2}
                                    className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-ink-500 resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => patchForm(f.id, { status: "approved" })}
                                      disabled={isSaving}
                                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                                    ><CheckCircle size={14} /> Duyệt</button>
                                    <button
                                      onClick={() => patchForm(f.id, { status: "needs_update", admin_review_notes: reviewNotes[f.id] || "" })}
                                      disabled={isSaving || !reviewNotes[f.id]}
                                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                                    ><AlertTriangle size={14} /> Yêu cầu bổ sung</button>
                                  </div>
                                </div>
                              )}

                              {f.status === "approved" && (
                                <div className="space-y-3 border-t border-ink-600 pt-4">
                                  <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Nộp lên chính phủ</h4>
                                  <textarea
                                    value={govNotes[f.id] || ""}
                                    onChange={(e) => setGovNotes(n => ({ ...n, [f.id]: e.target.value }))}
                                    placeholder="Ghi chú về việc nộp hồ sơ (tùy chọn)..."
                                    rows={2}
                                    className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-ink-500 resize-none"
                                  />
                                  <button
                                    onClick={() => patchForm(f.id, { status: "gov_submitted", gov_submission_notes: govNotes[f.id] || "" })}
                                    disabled={isSaving}
                                    className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                                  ><RefreshCw size={14} /> Đã nộp chính phủ</button>
                                </div>
                              )}

                              {f.status === "gov_submitted" && (
                                <div className="space-y-3 border-t border-ink-600 pt-4">
                                  <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Kết quả từ chính phủ</h4>
                                  <textarea
                                    value={govNotes[f.id] || ""}
                                    onChange={(e) => setGovNotes(n => ({ ...n, [f.id]: e.target.value }))}
                                    placeholder="Ghi chú nếu chính phủ yêu cầu bổ sung..."
                                    rows={2}
                                    className="w-full bg-ink-900 border border-ink-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-ink-500 resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => patchForm(f.id, { status: "completed" })}
                                      disabled={isSaving}
                                      className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                                    ><CheckCircle size={14} /> Chính phủ chấp nhận</button>
                                    <button
                                      onClick={() => patchForm(f.id, { status: "needs_update", gov_submission_notes: govNotes[f.id] || "" })}
                                      disabled={isSaving || !govNotes[f.id]}
                                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                                    ><AlertTriangle size={14} /> Yêu cầu bổ sung</button>
                                  </div>
                                </div>
                              )}

                              {f.status === "needs_update" && (
                                <div className="bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-3">
                                  <p className="text-xs font-semibold text-red-400 mb-1">Đang chờ khách hàng cập nhật</p>
                                  <p className="text-sm text-red-200">Khách hàng cần bổ sung thông tin theo ghi chú bên trên.</p>
                                </div>
                              )}

                              {f.status === "completed" && (
                                <div className="bg-teal-900/20 border border-teal-700/30 rounded-lg px-4 py-3">
                                  <p className="text-xs font-semibold text-teal-400">Hoàn thành — Chính phủ đã chấp nhận hồ sơ.</p>
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      )}

    </div>
  );
}
