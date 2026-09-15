"use client";

import { useEffect, useState, use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft, CheckCircle2, FileText, FolderOpen,
  Download, ExternalLink, X, Save, Check, AlertCircle, File,
  FileSpreadsheet, Image as ImageIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";

/* ── types ── */
interface Service {
  id: string; type: string; name: string; status: string;
  current_step: number; total_steps: number;
  price?: number; currency?: string; notes?: string; created_at: string;
}
interface FormTemplate { id: string; name: string; description?: string; category?: string }
interface CustomerForm {
  id: string; status: string; notes?: string; due_date?: string;
  submitted_at?: string; reviewed_at?: string; gov_submitted_at?: string;
  admin_review_notes?: string; gov_submission_notes?: string;
  responses?: Record<string, string>; created_at: string;
  form_templates: FormTemplate | null;
}
interface FormField {
  id: string; label: string; field_type: string; required: boolean;
  options?: string[]; placeholder?: string; help_text?: string; order_index: number;
}
interface ActiveForm extends CustomerForm { fields: FormField[] }
interface Doc {
  id: string; name: string; category: string; file_url?: string;
  status: string; uploaded_by?: string; created_at: string;
}

type Tab = "status" | "forms" | "documents";

/* ── helpers ── */
function fmt(iso?: string, locale?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}
const FILE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText, docx: File, doc: File,
  xlsx: FileSpreadsheet, xls: FileSpreadsheet,
  jpg: ImageIcon, jpeg: ImageIcon, png: ImageIcon,
};
const FILE_COLORS: Record<string, string> = {
  pdf: "text-red-400", docx: "text-blue-400", doc: "text-blue-400",
  xlsx: "text-emerald-400", xls: "text-emerald-400",
  jpg: "text-purple-400", jpeg: "text-purple-400", png: "text-purple-400",
};
function ext(name: string) {
  const p = name.split("."); return p.length > 1 ? p[p.length - 1].toLowerCase() : "file";
}

/* ══════════════════════════════════════════════════════ */
export default function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("dashboard.companies");
  const locale = useLocale();

  const [tab, setTab] = useState<Tab>("status");
  const [service, setService] = useState<Service | null>(null);
  const [forms, setForms] = useState<CustomerForm[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* form overlay */
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/dashboard/services/${id}`);
    if (res.status === 404) { setNotFound(true); setLoading(false); return; }
    const data = await res.json();
    setService(data.service);
    setForms(data.forms ?? []);
    setDocs(data.documents ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  /* ── form actions ── */
  const openForm = async (formId: string) => {
    const res = await fetch(`/api/dashboard/forms/${formId}`);
    const data = await res.json();
    setActiveForm(data);
    setResponses(data.responses || {});
    setSubmitted(false);
  };
  const saveForm = async (submit = false) => {
    if (!activeForm) return;
    setSubmitting(true);
    await fetch(`/api/dashboard/forms/${activeForm.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses, submit }),
    });
    setSubmitting(false);
    if (submit) {
      setSubmitted(true);
      await load();
      setTimeout(() => { setActiveForm(null); setSubmitted(false); }, 1500);
    }
  };

  /* ── status configs ── */
  const SVC_STATUS: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    active:          { label: t("status.active"),          variant: "success" },
    pending:         { label: t("status.pending"),         variant: "warning" },
    action_required: { label: t("status.action_required"), variant: "danger"  },
    complete:        { label: t("status.complete"),        variant: "success" },
    completed:       { label: t("status.completed"),       variant: "success" },
    in_progress:     { label: t("status.in_progress"),     variant: "warning" },
  };
  const FORM_STATUS: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    pending:      { label: t("formStatus.pending"),      variant: "warning" },
    draft:        { label: t("formStatus.draft"),        variant: "default" },
    submitted:    { label: t("formStatus.submitted"),    variant: "warning" },
    approved:     { label: t("formStatus.approved"),     variant: "success" },
    gov_submitted:{ label: t("formStatus.gov_submitted"),variant: "success" },
    needs_update: { label: t("formStatus.needs_update"), variant: "danger"  },
    completed:    { label: t("formStatus.completed"),    variant: "success" },
  };

  const pendingFormCount = forms.filter(f => f.status === "pending" || f.status === "needs_update").length;

  /* ─── loading / error states ─── */
  if (loading) return (
    <div className="flex items-center justify-center h-48 text-navy-500 text-sm">Loading…</div>
  );
  if (notFound || !service) return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-navy-400 text-sm">Company not found.</p>
      <Link href="/dashboard" className="text-gold text-sm hover:underline">← {t("backToCompanies")}</Link>
    </div>
  );

  const pct = service.total_steps > 0 ? Math.round((service.current_step / service.total_steps) * 100) : 0;
  const isComplete = service.status === "complete" || service.status === "completed";
  const svcCfg = SVC_STATUS[service.status] || { label: service.status, variant: "default" as const };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Back */}
      <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-foreground transition-colors w-fit">
        <ChevronLeft size={15} /> {t("backToCompanies")}
      </Link>

      {/* Company header */}
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="gold" className="text-[10px] tracking-widest">
                {service.type.replace(/_/g, " ").toUpperCase()}
              </Badge>
              <Badge variant={svcCfg.variant} className="text-xs">{svcCfg.label}</Badge>
            </div>
            <h1 className="text-lg font-bold text-foreground">{service.name}</h1>
            <p className="text-xs text-navy-500 mt-1">
              {fmt(service.created_at, locale)}
              {service.price ? ` · $${service.price.toLocaleString()} ${service.currency || "USD"}` : ""}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className={`text-2xl font-black ${isComplete ? "text-emerald-400" : "text-gold"}`}>{pct}%</p>
            <p className="text-xs text-navy-500 mt-0.5">{t("step", { current: service.current_step, total: service.total_steps })}</p>
          </div>
        </div>

        {/* Progress dots */}
        {service.total_steps > 0 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: service.total_steps }, (_, i) => {
              const done = i + 1 < service.current_step;
              const active = i + 1 === service.current_step;
              return (
                <div key={i} className={`rounded-full h-2 transition-all flex-1 ${
                  done || isComplete ? "bg-emerald-400" : active ? "bg-gold" : "bg-navy-600"
                }`} style={{ maxWidth: 40 }} />
              );
            })}
          </div>
        )}

        {isComplete && (
          <div className="flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 size={15} /> {t("status.completed")}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-navy-800 border border-navy-700 rounded-xl w-fit flex-wrap">
        {([
          ["status",    t("tabs.status"),    0],
          ["forms",     t("tabs.forms"),     pendingFormCount],
          ["documents", t("tabs.documents"), 0],
        ] as [Tab, string, number][]).map(([key, label, badge]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === key ? "bg-navy-700 text-foreground" : "text-navy-400 hover:text-foreground"
            }`}
          >
            {label}
            {badge > 0 && (
              <span className="bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ═══ STATUS TAB ═══ */}
      {tab === "status" && (
        <div className="flex flex-col gap-4">
          {service.notes && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-amber-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>{service.notes}</p>
            </div>
          )}

          {/* Workflow steps */}
          <div className="bg-navy-800 rounded-2xl border border-navy-700 divide-y divide-navy-700/60">
            {Array.from({ length: service.total_steps }, (_, i) => {
              const stepNum = i + 1;
              const isDone = stepNum < service.current_step || isComplete;
              const isActive = stepNum === service.current_step && !isComplete;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : isActive ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-navy-700 text-navy-500 border border-navy-600"
                  }`}>
                    {isDone ? <Check size={14} /> : stepNum}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDone ? "text-navy-400 line-through" : isActive ? "text-foreground" : "text-navy-500"}`}>
                      Step {stepNum}
                    </p>
                  </div>
                  {isDone && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
                  {isActive && <span className="text-xs text-gold font-medium shrink-0">{t("inProgress")}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ FORMS TAB ═══ */}
      {tab === "forms" && (
        <div className="flex flex-col gap-3">
          {forms.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
              <FileText size={28} className="text-navy-600" />
              <p className="text-sm text-navy-400">{t("noForms")}</p>
            </div>
          ) : forms.map(f => {
            const fs = FORM_STATUS[f.status] || { label: f.status, variant: "default" as const };
            const canEdit = f.status === "pending" || f.status === "needs_update";
            return (
              <div key={f.id} className={`bg-navy-800 rounded-2xl border p-5 ${f.status === "needs_update" ? "border-red-500/40" : "border-navy-700"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={fs.variant} className="text-[10px]">{fs.label}</Badge>
                      {f.form_templates?.category && (
                        <span className="text-[10px] text-navy-500 uppercase tracking-wider">{f.form_templates.category}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground">{f.form_templates?.name || "Form"}</p>
                    {f.form_templates?.description && (
                      <p className="text-xs text-navy-500 mt-0.5">{f.form_templates.description}</p>
                    )}
                    {f.notes && <p className="text-xs text-amber-400/80 mt-1">{f.notes}</p>}
                    <div className="flex items-center gap-3 mt-2 text-xs text-navy-500 flex-wrap">
                      {f.due_date && <span>Due: {fmt(f.due_date, locale)}</span>}
                      {f.submitted_at && <span>Submitted: {fmt(f.submitted_at, locale)}</span>}
                    </div>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => openForm(f.id)}
                      className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        f.status === "needs_update"
                          ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                          : "bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20"
                      }`}
                    >
                      {f.status === "needs_update" ? t("updateForm") : t("fillForm")}
                    </button>
                  )}
                </div>
                {f.admin_review_notes && f.status === "needs_update" && (
                  <div className="mt-3 p-3 rounded-xl bg-red-500/5 border border-red-500/15 text-xs text-red-400">
                    <p className="font-semibold mb-0.5">{t("adminFeedback")}:</p>
                    <p>{f.admin_review_notes}</p>
                  </div>
                )}
                {f.gov_submission_notes && f.status === "needs_update" && (
                  <div className="mt-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/15 text-xs text-purple-400">
                    <p className="font-semibold mb-0.5">{t("govFeedback")}:</p>
                    <p>{f.gov_submission_notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ DOCUMENTS TAB ═══ */}
      {tab === "documents" && (
        docs.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
            <FolderOpen size={28} className="text-navy-600" />
            <p className="text-sm text-navy-400">{t("noDocuments")}</p>
          </div>
        ) : (
          <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
            {docs.map(doc => {
              const e = ext(doc.name);
              const Icon = FILE_ICONS[e] || File;
              const color = FILE_COLORS[e] || "text-navy-400";
              return (
                <div key={doc.id} className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 border-b border-navy-700/50 last:border-0 hover:bg-navy-750 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                    <Icon size={16} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <Badge variant={doc.uploaded_by === "Gloyce" ? "gold" : "default"} className="text-[10px] shrink-0">
                        {doc.uploaded_by || "Gloyce"}
                      </Badge>
                    </div>
                    <p className="text-xs text-navy-500 mt-0.5">
                      {e.toUpperCase()} · {fmt(doc.created_at, locale)}
                    </p>
                  </div>
                  {doc.file_url && (
                    <div className="flex items-center gap-1 shrink-0">
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                        title={t("view")}
                        className="p-2 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                        <ExternalLink size={15} />
                      </a>
                      <a href={doc.file_url} download
                        className="p-2 text-navy-500 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
                        <Download size={15} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}

      {/* ═══ FORM OVERLAY ═══ */}
      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* overlay header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-navy-700 shrink-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{activeForm.form_templates?.name}</p>
                {activeForm.form_templates?.description && (
                  <p className="text-xs text-navy-500 mt-0.5">{activeForm.form_templates.description}</p>
                )}
              </div>
              <button onClick={() => setActiveForm(null)} className="p-2 text-navy-400 hover:text-foreground rounded-lg hover:bg-navy-800 transition-colors">
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check size={24} className="text-emerald-400" />
                </div>
                <p className="text-sm text-emerald-400 font-medium">{t("submittedSuccess")}</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
                  {activeForm.admin_review_notes && activeForm.status === "needs_update" && (
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-red-400">
                      <p className="font-semibold mb-1">{t("adminFeedback")}:</p>
                      <p>{activeForm.admin_review_notes}</p>
                    </div>
                  )}
                  {activeForm.gov_submission_notes && activeForm.status === "needs_update" && (
                    <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-400">
                      <p className="font-semibold mb-1">{t("govFeedback")}:</p>
                      <p>{activeForm.gov_submission_notes}</p>
                    </div>
                  )}

                  {activeForm.fields
                    .sort((a, b) => a.order_index - b.order_index)
                    .map(field => (
                      <div key={field.id} className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-navy-300">
                          {field.label}
                          {field.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        {field.help_text && <p className="text-xs text-navy-500 -mt-0.5">{field.help_text}</p>}

                        {field.field_type === "select" && field.options ? (
                          <select
                            value={responses[field.id] || ""}
                            onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                            className="w-full h-10 px-3 rounded-lg bg-navy-800 border border-navy-700 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                          >
                            <option value="">Select…</option>
                            {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : field.field_type === "textarea" ? (
                          <textarea
                            value={responses[field.id] || ""}
                            onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold resize-none"
                          />
                        ) : field.field_type === "checkbox" ? (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={responses[field.id] === "true"}
                              onChange={e => setResponses(r => ({ ...r, [field.id]: String(e.target.checked) }))}
                              className="w-4 h-4 rounded accent-gold"
                            />
                            <span className="text-sm text-navy-300">{field.placeholder || field.label}</span>
                          </label>
                        ) : (
                          <input
                            type={field.field_type === "date" ? "date" : field.field_type === "email" ? "email" : field.field_type === "phone" ? "tel" : "text"}
                            value={responses[field.id] || ""}
                            onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full h-10 px-3 rounded-lg bg-navy-800 border border-navy-700 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                          />
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 px-5 py-4 border-t border-navy-700 shrink-0">
                  <button
                    onClick={() => saveForm(false)}
                    disabled={submitting}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-navy-600 text-navy-300 text-sm hover:border-navy-500 hover:text-foreground transition-colors disabled:opacity-50"
                  >
                    <Save size={14} /> {t("saveDraft")}
                  </button>
                  <button
                    onClick={() => saveForm(true)}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold text-ink-950 text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
                  >
                    <Check size={14} /> {t("submitForm")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
