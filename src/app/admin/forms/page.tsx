"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, FileText } from "lucide-react";

interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  created_at: string;
}

const CATEGORIES = ["general", "company", "tax", "banking", "compliance", "kyc"];

export default function FormsPage() {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "general" });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/form-templates");
    const data = await res.json();
    setTemplates(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.name) return;
    setSaving(true);
    await fetch("/api/admin/form-templates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", description: "", category: "general" }); setShowForm(false);
    await load(); setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    await fetch("/api/admin/form-templates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  };

  const CATEGORY_COLORS: Record<string, string> = {
    general: "bg-gray-100 text-gray-600",
    company: "bg-blue-100 text-blue-700",
    tax: "bg-red-100 text-red-700",
    banking: "bg-green-100 text-green-700",
    compliance: "bg-purple-100 text-purple-700",
    kyc: "bg-amber-100 text-amber-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Templates</h1>
          <p className="text-sm text-gray-500 mt-1">{templates.length} templates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">
          <Plus size={15} /> New Template
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">New Form Template</h3>
          <div className="flex flex-col gap-3 mb-4">
            <div><label className="text-xs font-medium text-gray-500 mb-1 block">Template Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. US LLC Operating Agreement" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-500 mb-1 block">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm capitalize">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select></div>
            <div><label className="text-xs font-medium text-gray-500 mb-1 block">Description (optional)</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What this form is for..." rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" /></div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button onClick={create} disabled={saving || !form.name} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create Template</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400 text-sm">Loading...</div>
          : templates.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No templates yet</p>
              <p className="text-xs text-gray-300 mt-1">Create templates to assign to customers (e.g. LLC docs, KYC forms, ODI filings)</p>
            </div>
          ) : (
            <div>
              {templates.map((t) => (
                <div key={t.id} className="flex items-start gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_COLORS[t.category] || "bg-gray-100 text-gray-600"}`}>{t.category}</span>
                    </div>
                    {t.description && <p className="text-xs text-gray-400">{t.description}</p>}
                    <p className="text-xs text-gray-300 mt-1">Added {new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-red-400 shrink-0">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
