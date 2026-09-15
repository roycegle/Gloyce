"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ClipboardList, ChevronRight, X, Save, Check, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Service {
  id: string;
  type: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  price?: number;
  currency?: string;
  notes?: string;
  created_at: string;
}

interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  service_type?: string;
}

interface CustomerForm {
  id: string;
  status: string;
  notes?: string;
  due_date?: string;
  submitted_at?: string;
  reviewed_at?: string;
  gov_submitted_at?: string;
  admin_review_notes?: string;
  gov_submission_notes?: string;
  responses?: Record<string, string>;
  created_at: string;
  form_templates: FormTemplate | null;
  services: { id: string; name: string; type: string } | null;
}

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

interface ActiveForm extends CustomerForm {
  fields: FormField[];
}

function formatDate(iso?: string, locale?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ServicesPage() {
  const t = useTranslations("dashboard.services");
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [forms, setForms] = useState<CustomerForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"services" | "forms">("services");
  const [activeForm, setActiveForm] = useState<ActiveForm | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/services").then(r => r.json()),
      fetch("/api/dashboard/forms").then(r => r.json()),
    ]).then(([s, f]) => {
      setServices(Array.isArray(s) ? s : []);
      setForms(Array.isArray(f) ? f : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const pendingForms = forms.filter(f => f.status === "pending" || f.status === "needs_update");

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
      // refresh forms list
      const f = await fetch("/api/dashboard/forms").then(r => r.json());
      setForms(Array.isArray(f) ? f : []);
      setTimeout(() => setActiveForm(null), 1500);
    }
  };

  const STATUS_CONFIG: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    active: { label: t("status.active"), variant: "success" },
    pending: { label: t("status.pending"), variant: "warning" },
    action_required: { label: t("status.action_required"), variant: "danger" },
    completed: { label: t("status.complete"), variant: "default" },
    complete: { label: t("status.complete"), variant: "default" },
  };

  const FORM_STATUS: Record<string, { label: string; variant: "success" | "warning" | "danger" | "default" }> = {
    pending: { label: t("formStatus.pending"), variant: "warning" },
    draft: { label: t("formStatus.draft"), variant: "default" },
    submitted: { label: t("formStatus.submitted"), variant: "success" },
    approved: { label: t("formStatus.approved"), variant: "success" },
    gov_submitted: { label: t("formStatus.gov_submitted"), variant: "default" },
    needs_update: { label: t("formStatus.needs_update"), variant: "danger" },
    completed: { label: t("formStatus.completed"), variant: "default" },
  };

  if (loading) return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center text-navy-400 text-sm">Loading...</div>
    </div>
  );

  // Form fill overlay
  if (activeForm) {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setActiveForm(null)} className="flex items-center gap-1.5 text-sm text-navy-400 hover:text-foreground mb-5">
          <X size={14} /> {t("closeForm")}
        </button>
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">{activeForm.form_templates?.name}</h2>
            {activeForm.form_templates?.description && <p className="text-sm text-navy-400 mt-1">{activeForm.form_templates.description}</p>}
            {activeForm.notes && <div className="mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400">{activeForm.notes}</div>}
            {activeForm.admin_review_notes && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-red-400">
                <p className="font-semibold mb-0.5">{t("adminFeedback")}</p>
                <p>{activeForm.admin_review_notes}</p>
              </div>
            )}
            {activeForm.gov_submission_notes && (
              <div className="mt-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-400">
                <p className="font-semibold mb-0.5">{t("govFeedback")}</p>
                <p>{activeForm.gov_submission_notes}</p>
              </div>
            )}
            {activeForm.due_date && <p className="text-xs text-navy-500 mt-2">Due: {formatDate(activeForm.due_date, locale)}</p>}
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Check size={20} className="text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-foreground">{t("submittedSuccess")}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {activeForm.fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.help_text && <p className="text-xs text-navy-500">{field.help_text}</p>}
                  {field.field_type === "textarea" ? (
                    <textarea
                      value={responses[field.id] || ""}
                      onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                      placeholder={field.placeholder || ""}
                      rows={3}
                      className="bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                    />
                  ) : field.field_type === "select" ? (
                    <select
                      value={responses[field.id] || ""}
                      onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                      className="bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="">— Select —</option>
                      {(field.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.field_type === "date" ? "date" : field.field_type === "number" ? "number" : field.field_type === "email" ? "email" : "text"}
                      value={responses[field.id] || ""}
                      onChange={e => setResponses(r => ({ ...r, [field.id]: e.target.value }))}
                      placeholder={field.placeholder || ""}
                      className="bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2 border-t border-navy-700">
                <button onClick={() => saveForm(false)} disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-navy-600 text-sm text-navy-300 hover:text-foreground transition-colors disabled:opacity-50">
                  <Save size={14} /> {t("saveDraft")}
                </button>
                <button onClick={() => saveForm(true)} disabled={submitting}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors disabled:opacity-50">
                  {submitting ? "..." : t("submitForm")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        {pendingForms.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
            <ClipboardList size={13} />
            {pendingForms.length} form{pendingForms.length !== 1 ? "s" : ""} to fill
          </div>
        )}
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 p-1 bg-navy-800 border border-navy-700 rounded-xl w-fit">
        {([["services", t("myServices")], ["forms", t("formsToFill")]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setView(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${view === key ? "bg-navy-700 text-foreground" : "text-navy-400 hover:text-foreground"}`}>
            {label}
            {key === "forms" && pendingForms.length > 0 && (
              <span className="bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{pendingForms.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Services view */}
      {view === "services" && (
        services.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Briefcase size={24} className="text-gold" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground mb-1">{t("noServicesTitle")}</p>
              <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">{t("noServices")}</p>
            </div>
            <Link href="/get-started" className="mt-2 px-5 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors">
              {t("browseServices")}
            </Link>
          </div>
        ) : (
          services.map((service) => {
            const cfg = STATUS_CONFIG[service.status] || { label: service.status, variant: "default" as const };
            const pct = service.total_steps > 0 ? Math.round((service.current_step / service.total_steps) * 100) : 0;
            const isComplete = service.status === "complete" || service.status === "completed";
            const relatedForms = forms.filter(f => f.services?.id === service.id);

            return (
              <div key={service.id} className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <Badge variant="gold" className="text-[10px] tracking-widest">{service.type.replace(/_/g, " ").toUpperCase()}</Badge>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                    <p className="text-xs text-navy-500 mt-0.5">
                      {formatDate(service.created_at, locale)}
                      {service.price && ` · $${service.price.toLocaleString()} ${service.currency || "USD"}`}
                    </p>
                  </div>
                  <Badge variant={cfg.variant} className="text-sm shrink-0 px-3 py-1">{cfg.label}</Badge>
                </div>

                {/* Progress dots + bar */}
                {service.total_steps > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: service.total_steps }, (_, i) => {
                        const done = i + 1 < service.current_step;
                        const active = i + 1 === service.current_step;
                        return (
                          <div
                            key={i}
                            className={`rounded-full transition-all ${
                              done || isComplete
                                ? "bg-emerald-400 h-2"
                                : active
                                ? "bg-gold h-2"
                                : "bg-navy-600 h-2"
                            }`}
                            style={{ width: `${100 / service.total_steps}%`, maxWidth: 40, minWidth: 8 }}
                          />
                        );
                      })}
                      <span className="ml-2 text-xs font-semibold text-gold shrink-0">{pct}%</span>
                    </div>
                    {isComplete && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle2 size={13} />
                        <span>{cfg.label}</span>
                      </div>
                    )}
                  </div>
                )}

                {service.notes && (
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400/80 leading-relaxed">
                    {service.notes}
                  </div>
                )}

                {relatedForms.length > 0 && (
                  <div className="border-t border-navy-700 pt-4">
                    <p className="text-xs font-semibold text-navy-400 mb-2 uppercase tracking-wider">{t("requiredForms")}</p>
                    <div className="flex flex-col gap-2">
                      {relatedForms.map(f => {
                        const fs = FORM_STATUS[f.status] || { label: f.status, variant: "default" as const };
                        return (
                          <div key={f.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-navy-900 border border-navy-700">
                            <div className="min-w-0">
                              <p className="text-sm text-foreground truncate">{f.form_templates?.name}</p>
                              {f.due_date && <p className="text-xs text-navy-500 mt-0.5">Due {formatDate(f.due_date, locale)}</p>}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant={fs.variant} className="text-[10px]">{fs.label}</Badge>
                              {(f.status === "pending" || f.status === "needs_update") && (
                                <button onClick={() => openForm(f.id)} className={`flex items-center gap-1 text-xs ${f.status === "needs_update" ? "text-red-400 hover:text-red-300" : "text-gold hover:text-gold-light"}`}>
                                  {f.status === "needs_update" ? t("updateForm") : t("fillForm")} <ChevronRight size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )
      )}

      {/* Forms view */}
      {view === "forms" && (
        forms.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-navy-700 border border-navy-600 flex items-center justify-center">
              <ClipboardList size={24} className="text-navy-400" />
            </div>
            <p className="text-sm text-navy-400">No forms assigned yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {forms.map(f => {
              const fs = FORM_STATUS[f.status] || { label: f.status, variant: "default" as const };
              const canEdit = f.status === "pending" || f.status === "needs_update";
              return (
                <div key={f.id} className={`bg-navy-800 rounded-2xl border p-5 ${f.status === "needs_update" ? "border-red-500/40" : "border-navy-700"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={fs.variant} className="text-[10px]">{fs.label}</Badge>
                        {f.form_templates?.category && <span className="text-[10px] text-navy-500 uppercase tracking-wider">{f.form_templates.category}</span>}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{f.form_templates?.name || "Form"}</p>
                      {f.form_templates?.description && <p className="text-xs text-navy-500 mt-0.5">{f.form_templates.description}</p>}
                      {f.notes && <p className="text-xs text-amber-400/80 mt-1">{f.notes}</p>}
                      <div className="flex items-center gap-3 mt-2 text-xs text-navy-500">
                        {f.services && <span>For: {f.services.name}</span>}
                        {f.due_date && <span>Due: {formatDate(f.due_date, locale)}</span>}
                        {f.submitted_at && <span>Submitted: {formatDate(f.submitted_at, locale)}</span>}
                        {f.reviewed_at && <span>Reviewed: {formatDate(f.reviewed_at, locale)}</span>}
                      </div>
                    </div>
                    {canEdit && (
                      <button onClick={() => openForm(f.id)}
                        className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${f.status === "needs_update" ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20" : "bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20"}`}>
                        {f.status === "needs_update" ? "Cập nhật hồ sơ" : "Fill Form"} <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                  {f.admin_review_notes && f.status === "needs_update" && (
                    <div className="mt-3 p-3 rounded-xl bg-red-500/5 border border-red-500/15 text-xs text-red-400">
                      <p className="font-semibold mb-0.5">Yêu cầu bổ sung từ Gloyce:</p>
                      <p>{f.admin_review_notes}</p>
                    </div>
                  )}
                  {f.gov_submission_notes && f.status === "needs_update" && (
                    <div className="mt-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/15 text-xs text-purple-400">
                      <p className="font-semibold mb-0.5">Yêu cầu từ cơ quan chính phủ:</p>
                      <p>{f.gov_submission_notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
