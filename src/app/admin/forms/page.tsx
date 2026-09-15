"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, FileText, ChevronDown, ChevronRight, GripVertical } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  field_type: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  help_text?: string;
  order_index: number;
}

interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  service_type?: string;
  created_at: string;
  fields?: FormField[];
}

const CATEGORIES = ["general", "company", "tax", "banking", "compliance", "kyc"];
const SERVICE_TYPES = [
  { value: "", label: "— None (manual assign only) —" },
  { value: "us_llc", label: "US LLC Formation" },
  { value: "singapore", label: "Singapore Company" },
  { value: "hong_kong", label: "Hong Kong Company" },
  { value: "us_bank", label: "US Bank Account" },
  { value: "payment_gateway", label: "Payment Gateway" },
  { value: "accounting", label: "Monthly Accounting" },
  { value: "odi", label: "ODI Registration" },
  { value: "certification", label: "Document Certification" },
];
const FIELD_TYPES = ["text", "textarea", "select", "date", "number", "email", "phone"];

const CATEGORY_COLORS: Record<string, string> = {
  general: "bg-ink-700 text-ink-300",
  company: "bg-blue-100 text-blue-700",
  tax: "bg-red-100 text-red-700",
  banking: "bg-green-100 text-green-700",
  compliance: "bg-purple-100 text-purple-700",
  kyc: "bg-amber-100 text-amber-700",
};

export default function FormsPage() {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", category: "general", service_type: "" });
  const [newField, setNewField] = useState({ label: "", field_type: "text", required: false, placeholder: "", help_text: "", options: "" });
  const [addingFieldTo, setAddingFieldTo] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/form-templates");
    const data = await res.json();
    setTemplates(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const loadFields = async (templateId: string) => {
    const res = await fetch(`/api/admin/form-templates/${templateId}/fields`);
    const fields = await res.json();
    setTemplates(prev => prev.map(t => t.id === templateId ? { ...t, fields: Array.isArray(fields) ? fields : [] } : t));
  };

  const toggleExpand = async (templateId: string) => {
    if (expanded === templateId) { setExpanded(null); return; }
    setExpanded(templateId);
    const t = templates.find(t => t.id === templateId);
    if (!t?.fields) await loadFields(templateId);
  };

  const create = async () => {
    if (!form.name) return;
    setSaving(true);
    await fetch("/api/admin/form-templates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, service_type: form.service_type || null }),
    });
    setForm({ name: "", description: "", category: "general", service_type: "" });
    setShowForm(false);
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this template and all its fields?")) return;
    await fetch("/api/admin/form-templates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  };

  const addField = async (templateId: string) => {
    if (!newField.label) return;
    setSaving(true);
    const options = newField.field_type === "select" && newField.options
      ? newField.options.split("\n").map(s => s.trim()).filter(Boolean)
      : null;
    const t = templates.find(t => t.id === templateId);
    const orderIndex = (t?.fields?.length || 0) + 1;
    await fetch(`/api/admin/form-templates/${templateId}/fields`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newField, options, order_index: orderIndex }),
    });
    setNewField({ label: "", field_type: "text", required: false, placeholder: "", help_text: "", options: "" });
    setAddingFieldTo(null);
    await loadFields(templateId);
    setSaving(false);
  };

  const deleteField = async (templateId: string, fieldId: string) => {
    await fetch(`/api/admin/form-templates/${templateId}/fields`, {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fieldId }),
    });
    await loadFields(templateId);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Form Templates</h1>
          <p className="text-sm text-ink-400 mt-1">{templates.length} templates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">
          <Plus size={15} /> New Template
        </button>
      </div>

      {showForm && (
        <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-6">
          <h3 className="font-semibold text-ink-100 mb-4">New Form Template</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="col-span-2">
              <label className="text-xs font-medium text-ink-400 mb-1 block">Template Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. US LLC Information Form" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-400 mb-1 block">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm capitalize">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-ink-400 mb-1 block">Auto-assign for service type</label>
              <select value={form.service_type} onChange={e => setForm({ ...form, service_type: e.target.value })}
                className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                {SERVICE_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-ink-400 mb-1 block">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="What this form is for..." rows={2} className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm resize-none" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-ink-400 hover:text-ink-300">Cancel</button>
            <button onClick={create} disabled={saving || !form.name} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create Template</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {loading ? <div className="bg-ink-800 rounded-xl border border-ink-600 p-12 text-center text-ink-400 text-sm">Loading...</div>
          : templates.length === 0 ? (
            <div className="bg-ink-800 rounded-xl border border-ink-600 p-12 text-center">
              <FileText size={32} className="text-ink-500 mx-auto mb-3" />
              <p className="text-sm text-ink-400">No templates yet</p>
            </div>
          ) : templates.map((t) => (
            <div key={t.id} className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
              {/* Template header */}
              <div className="flex items-center gap-3 px-5 py-4">
                <button onClick={() => toggleExpand(t.id)} className="text-ink-400 hover:text-ink-400">
                  {expanded === t.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_COLORS[t.category] || "bg-ink-700 text-ink-300"}`}>{t.category}</span>
                    {t.service_type && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">Auto: {t.service_type}</span>}
                  </div>
                  {t.description && <p className="text-xs text-ink-400 truncate">{t.description}</p>}
                </div>
                <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-400 hover:text-red-400 shrink-0">
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Expanded: fields */}
              {expanded === t.id && (
                <div className="border-t border-ink-600 px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
                      Fields ({t.fields?.length || 0})
                    </p>
                    <button onClick={() => setAddingFieldTo(addingFieldTo === t.id ? null : t.id)}
                      className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium">
                      <Plus size={13} /> Add field
                    </button>
                  </div>

                  {/* Field list */}
                  {(t.fields || []).length === 0 ? (
                    <p className="text-xs text-ink-400 py-4 text-center">No fields yet — add one above</p>
                  ) : (
                    <div className="flex flex-col gap-1 mb-4">
                      {(t.fields || []).map((f, i) => (
                        <div key={f.id} className="flex items-center gap-3 p-3 bg-ink-900 rounded-lg group">
                          <GripVertical size={14} className="text-ink-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-ink-100">{f.label}</span>
                              {f.required && <span className="text-[10px] text-red-500 font-medium">REQUIRED</span>}
                              <span className="text-[10px] text-ink-400 uppercase px-1.5 py-0.5 bg-ink-700 rounded">{f.field_type}</span>
                            </div>
                            {f.placeholder && <p className="text-xs text-ink-400 mt-0.5">Placeholder: {f.placeholder}</p>}
                            {f.options && <p className="text-xs text-ink-400 mt-0.5">Options: {f.options.join(", ")}</p>}
                          </div>
                          <button onClick={() => deleteField(t.id, f.id)}
                            className="p-1 text-ink-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add field form */}
                  {addingFieldTo === t.id && (
                    <div className="border border-dashed border-ink-600 rounded-xl p-4">
                      <p className="text-xs font-semibold text-ink-400 mb-3">New Field</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="text-xs text-ink-400 mb-1 block">Label *</label>
                          <input value={newField.label} onChange={e => setNewField({ ...newField, label: e.target.value })}
                            placeholder="e.g. Full Legal Name" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="text-xs text-ink-400 mb-1 block">Type</label>
                          <select value={newField.field_type} onChange={e => setNewField({ ...newField, field_type: e.target.value })}
                            className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm">
                            {FIELD_TYPES.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-ink-400 mb-1 block">Placeholder</label>
                          <input value={newField.placeholder} onChange={e => setNewField({ ...newField, placeholder: e.target.value })}
                            placeholder="Optional hint text" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        {newField.field_type === "select" && (
                          <div className="col-span-2">
                            <label className="text-xs text-ink-400 mb-1 block">Options (one per line)</label>
                            <textarea value={newField.options} onChange={e => setNewField({ ...newField, options: e.target.value })}
                              placeholder={"Option A\nOption B\nOption C"} rows={3}
                              className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm resize-none" />
                          </div>
                        )}
                        <div className="col-span-2">
                          <label className="text-xs text-ink-400 mb-1 block">Help text (optional)</label>
                          <input value={newField.help_text} onChange={e => setNewField({ ...newField, help_text: e.target.value })}
                            placeholder="Additional instructions for the customer" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <input type="checkbox" id={`req-${t.id}`} checked={newField.required} onChange={e => setNewField({ ...newField, required: e.target.checked })} />
                          <label htmlFor={`req-${t.id}`} className="text-xs text-ink-300">Required field</label>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end mt-3">
                        <button onClick={() => setAddingFieldTo(null)} className="px-3 py-1.5 text-xs text-ink-400 hover:text-ink-300">Cancel</button>
                        <button onClick={() => addField(t.id)} disabled={saving || !newField.label}
                          className="px-4 py-1.5 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600 disabled:opacity-50">Add Field</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
