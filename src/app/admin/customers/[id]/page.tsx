"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Plus, CheckCircle, XCircle, FileText, DollarSign, ClipboardList, FolderOpen, Upload, Trash2, ExternalLink } from "lucide-react";

interface User { id: string; name: string; email: string; phone?: string; company?: string; status: string; created_at: string; }
interface Service { id: string; type: string; name: string; status: string; current_step: number; total_steps: number; price?: number; created_at: string; }
interface Message { id: string; sender: string; subject?: string; content: string; created_at: string; }
interface Invoice { id: string; amount: number; currency: string; status: string; description?: string; due_date?: string; paid_at?: string; created_at: string; services?: { name: string; type: string }; }
interface Request { id: string; service_type: string; status: string; details: Record<string, unknown>; created_at: string; }
interface Document { id: string; name: string; category?: string; file_url?: string; status: string; uploaded_by: string; created_at: string; }
interface FormTemplate { id: string; name: string; description?: string; category: string; }
interface CustomerForm { id: string; status: string; notes?: string; due_date?: string; created_at: string; form_templates?: FormTemplate; services?: { name: string; type: string }; }

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  action_required: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-500",
  in_progress: "bg-blue-100 text-blue-700",
};

type Tab = "overview" | "services" | "billing" | "requests" | "documents" | "forms" | "messages";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{ user: User; services: Service[]; messages: Message[]; invoices: Invoice[]; requests: Request[]; documents: Document[]; forms: CustomerForm[] } | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [message, setMessage] = useState("");
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

  const load = async () => {
    const res = await fetch(`/api/admin/customers/${id}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    load();
    fetch("/api/admin/form-templates").then(r => r.json()).then(d => setTemplates(Array.isArray(d) ? d : []));
  }, [id]);

  const updateStatus = async (status: string) => {
    setSaving(true);
    await fetch(`/api/admin/customers/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await load(); setSaving(false);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setSaving(true);
    await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: id, content: message }) });
    setMessage(""); await load(); setSaving(false);
  };

  const createService = async () => {
    if (!newService.name) return;
    setSaving(true);
    await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: id, type: newService.type, name: newService.name, price: parseFloat(newService.price) || null, total_steps: parseInt(newService.total_steps) }) });
    setNewService({ type: "execute", name: "", price: "", total_steps: "5" }); setShowServiceForm(false);
    await load(); setSaving(false);
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
    const fd = new FormData();
    fd.append("file", docFile);
    fd.append("user_id", id);
    fd.append("category", docUpload.category);
    if (docUpload.name) fd.append("name", docUpload.name);
    if (docUpload.service_id) fd.append("service_id", docUpload.service_id);
    await fetch("/api/admin/documents", { method: "POST", body: fd });
    setDocFile(null);
    setDocUpload({ name: "", category: "company", service_id: "" });
    setShowDocUpload(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await load();
    setSaving(false);
  };

  const deleteDocument = async (docId: string) => {
    if (!confirm("Delete this document?")) return;
    await fetch("/api/admin/documents", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: docId }) });
    await load();
  };

  const assignTemplate = async () => {
    if (!assignForm.template_id) return;
    setSaving(true);
    await fetch(`/api/admin/customers/${id}/forms`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(assignForm) });
    setAssignForm({ template_id: "", service_id: "", due_date: "", notes: "" }); setShowFormAssign(false);
    await load(); setSaving(false);
  };

  if (!data) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  const { user, services, messages, invoices, requests, documents, forms } = data;

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "services", label: "Services", count: services.length },
    { key: "billing", label: "Billing", count: invoices.length },
    { key: "requests", label: "Requests", count: requests.filter(r => r.status !== "completed").length },
    { key: "documents", label: "Documents", count: documents.length },
    { key: "forms", label: "Forms", count: forms.length },
    { key: "messages", label: "Messages", count: messages.length },
  ];

  const totalBilled = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/customers" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.email} {user.company && `· ${user.company}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[user.status] || "bg-gray-100 text-gray-600"}`}>{user.status}</span>
          {user.status === "pending" && <button onClick={() => updateStatus("active")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600"><CheckCircle size={13} /> Activate</button>}
          {user.status === "active" && <button onClick={() => updateStatus("suspended")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600"><XCircle size={13} /> Suspend</button>}
          {user.status === "suspended" && <button onClick={() => updateStatus("active")} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600"><CheckCircle size={13} /> Reactivate</button>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${tab === key ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {label}
            {count !== undefined && count > 0 && <span className={`text-xs rounded-full px-1.5 py-0.5 ${tab === key ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{count}</span>}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Customer Info</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[["Name", user.name], ["Email", user.email], ["Phone", user.phone || "—"], ["Company", user.company || "—"], ["Status", user.status], ["Registered", new Date(user.created_at).toLocaleDateString()]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-gray-400">{k}</dt>
                  <dd className="font-medium text-gray-700 capitalize">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><DollarSign size={15} className="text-green-500" /> Billing Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">${totalBilled.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Total Billed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-700">${totalPaid.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Total Paid</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><ClipboardList size={15} className="text-amber-500" /> Open Requests</h2>
              {requests.filter(r => r.status !== "completed").length === 0
                ? <p className="text-sm text-gray-400">No open requests</p>
                : requests.filter(r => r.status !== "completed").slice(0, 3).map(r => (
                  <div key={r.id} className="flex items-center justify-between py-1.5 text-sm">
                    <span className="text-gray-700 capitalize">{r.service_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[r.status] || "bg-gray-100 text-gray-500"}`}>{r.status}</span>
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
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">New Service</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Service Type</label>
                  <select value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
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
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Service Name</label>
                  <input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. US LLC Formation" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Price (USD)</label>
                  <input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} placeholder="499" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Total Steps</label>
                  <input type="number" value={newService.total_steps} onChange={(e) => setNewService({ ...newService, total_steps: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowServiceForm(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={createService} disabled={saving || !newService.name} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create</button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {services.length === 0 ? <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">No services yet</div>
              : services.map((s) => (
                <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><span className="text-xs font-bold uppercase tracking-wider text-amber-600">{s.type}</span>
                      <h3 className="font-semibold text-gray-900 mt-0.5">{s.name}</h3>
                      {s.price && <p className="text-xs text-gray-400">${s.price.toLocaleString()}</p>}</div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[s.status] || "bg-gray-100 text-gray-500"}`}>{s.status}</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Step {s.current_step} of {s.total_steps}</span><span>{Math.round((s.current_step / s.total_steps) * 100)}%</span></div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${(s.current_step / s.total_steps) * 100}%` }} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Update step:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: s.total_steps }, (_, i) => i + 1).map((step) => (
                        <button key={step} onClick={() => updateServiceStep(s.id, step, s.total_steps)}
                          className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${step === s.current_step ? "bg-amber-500 text-white" : step < s.current_step ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>
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
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">New Invoice</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Amount (USD)</label>
                  <input type="number" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} placeholder="500" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Due Date</label>
                  <input type="date" value={newInvoice.due_date} onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 mb-1 block">Description</label>
                  <input value={newInvoice.description} onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })} placeholder="e.g. US LLC Formation — Setup fee" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 mb-1 block">Related Service (optional)</label>
                  <select value={newInvoice.service_id} onChange={(e) => setNewInvoice({ ...newInvoice, service_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowInvoiceForm(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={createInvoice} disabled={saving || !newInvoice.amount} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create Invoice</button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {invoices.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm"><DollarSign size={28} className="mx-auto mb-2 text-gray-200" />No invoices yet</div>
              : (
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Amount</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Due</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3" />
                  </tr></thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">{inv.description || "—"}</p>
                          {inv.services && <p className="text-xs text-gray-400">{inv.services.name}</p>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">${inv.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[inv.status] || "bg-gray-100 text-gray-500"}`}>{inv.status}</span></td>
                        <td className="px-4 py-3 text-right">
                          {inv.status === "pending" && (
                            <button onClick={() => updateInvoiceStatus(inv.id, "paid")} className="text-xs text-green-600 hover:text-green-700 font-medium">Mark Paid</button>
                          )}
                          {inv.status === "paid" && <span className="text-xs text-gray-300">Paid {inv.paid_at ? new Date(inv.paid_at).toLocaleDateString() : ""}</span>}
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
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {requests.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm"><ClipboardList size={28} className="mx-auto mb-2 text-gray-200" />No requests yet</div>
            : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Service Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Details</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                </tr></thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800 capitalize">{r.service_type}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs max-w-xs truncate">
                        {Object.entries(r.details || {}).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[r.status] || "bg-gray-100 text-gray-500"}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      )}

      {/* Documents */}
      {tab === "documents" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowDocUpload(!showDocUpload)} className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600"><Upload size={15} /> Upload Document</button>
          </div>
          {showDocUpload && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">Upload Document to Customer Folder</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-500 mb-1 block">File *</label>
                  <input ref={fileInputRef} type="file" onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                </div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Display Name (optional)</label>
                  <input value={docUpload.name} onChange={(e) => setDocUpload({ ...docUpload, name: e.target.value })} placeholder="e.g. Articles of Organization" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Category / Folder</label>
                  <select value={docUpload.category} onChange={(e) => setDocUpload({ ...docUpload, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="company">Company Documents</option>
                    <option value="tax">Tax Documents</option>
                    <option value="banking">Banking Documents</option>
                    <option value="compliance">Compliance / ODI</option>
                    <option value="license">Licenses & Permits</option>
                    <option value="certification">Certified Documents</option>
                    <option value="general">General</option>
                  </select></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 mb-1 block">Related Service (optional)</label>
                  <select value={docUpload.service_id} onChange={(e) => setDocUpload({ ...docUpload, service_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowDocUpload(false); setDocFile(null); }} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={uploadDocument} disabled={saving || !docFile} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">{saving ? "Uploading..." : "Upload"}</button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {documents.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm"><FolderOpen size={28} className="mx-auto mb-2 text-gray-200" />No documents yet — upload one above</div>
              : (
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Document</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Uploaded</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3" />
                  </tr></thead>
                  <tbody>
                    {documents.map((d) => (
                      <tr key={d.id} className="border-b border-gray-50">
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><FileText size={15} className="text-gray-300" /><span className="font-medium text-gray-800">{d.name}</span></div></td>
                        <td className="px-4 py-3 text-gray-500 capitalize hidden md:table-cell">{d.category || "—"}</td>
                        <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{new Date(d.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[d.status] || "bg-gray-100 text-gray-500"}`}>{d.status}</span></td>
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
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">Assign Form Template</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 mb-1 block">Form Template</label>
                  <select value={assignForm.template_id} onChange={(e) => setAssignForm({ ...assignForm, template_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">— Select template —</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name} ({t.category})</option>)}
                  </select></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Related Service (optional)</label>
                  <select value={assignForm.service_id} onChange={(e) => setAssignForm({ ...assignForm, service_id: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">— None —</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Due Date (optional)</label>
                  <input type="date" value={assignForm.due_date} onChange={(e) => setAssignForm({ ...assignForm, due_date: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="col-span-2"><label className="text-xs font-medium text-gray-500 mb-1 block">Notes</label>
                  <input value={assignForm.notes} onChange={(e) => setAssignForm({ ...assignForm, notes: e.target.value })} placeholder="Instructions for the customer..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowFormAssign(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={assignTemplate} disabled={saving || !assignForm.template_id} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Assign</button>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {forms.length === 0 ? <div className="p-12 text-center text-gray-400 text-sm"><FileText size={28} className="mx-auto mb-2 text-gray-200" />No forms assigned yet</div>
              : (
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Form</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Due</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  </tr></thead>
                  <tbody>
                    {forms.map((f) => (
                      <tr key={f.id} className="border-b border-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">{f.form_templates?.name || "—"}</p>
                          {f.notes && <p className="text-xs text-gray-400">{f.notes}</p>}
                        </td>
                        <td className="px-4 py-3 text-gray-500 capitalize hidden md:table-cell">{f.form_templates?.category || "—"}</td>
                        <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{f.due_date ? new Date(f.due_date).toLocaleDateString() : "—"}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[f.status] || "bg-gray-100 text-gray-500"}`}>{f.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </div>
      )}

      {/* Messages */}
      {tab === "messages" && (
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {messages.length === 0 ? <p className="text-center text-sm text-gray-400 py-8">No messages yet</p>
                : messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${m.sender === "admin" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                      {m.subject && <p className="font-semibold text-xs mb-1 opacity-75">{m.subject}</p>}
                      <p>{m.content}</p>
                      <p className={`text-[10px] mt-1 ${m.sender === "admin" ? "text-amber-200" : "text-gray-400"}`}>
                        {m.sender === "admin" ? "You" : user.name} · {new Date(m.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input value={message} onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message to ${user.name}...`}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <button onClick={sendMessage} disabled={!message.trim() || saving} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
