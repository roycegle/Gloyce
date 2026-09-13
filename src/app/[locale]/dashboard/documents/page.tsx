"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, File, FileSpreadsheet, Image, FolderOpen, Stamp, X, Check, ExternalLink } from "lucide-react";
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

  useEffect(() => {
    fetch("/api/dashboard/documents")
      .then(r => r.json())
      .then(d => { setDocuments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
    };
    return labels[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
  };

  const submitCertRequest = async () => {
    if (!certForm.certification_type || !certForm.destination_country || !certForm.purpose) return;
    setCertSubmitting(true);
    await fetch("/api/dashboard/documents/certify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document_id: certDoc?.id,
        ...certForm,
        copies: parseInt(certForm.copies) || 1,
      }),
    });
    setCertSubmitting(false);
    setCertDone(true);
    setTimeout(() => { setCertDoc(null); setCertDone(false); setCertForm({ certification_type: "", destination_country: "", purpose: "", copies: "1", delivery_method: "Digital (PDF certified copy)", notes: "" }); }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("subtitle")}</p>
      </div>

      {/* Certification request modal */}
      {certDoc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6 w-full max-w-lg">
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
                  <label className="text-xs font-medium text-navy-400 mb-1.5 block">Certification Type *</label>
                  <select value={certForm.certification_type} onChange={e => setCertForm(f => ({ ...f, certification_type: e.target.value }))}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40">
                    <option value="">— Select —</option>
                    {["Apostille", "Notarization", "Embassy Legalization", "Certified True Copy", "Government Authentication"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-400 mb-1.5 block">Destination Country *</label>
                  <input value={certForm.destination_country} onChange={e => setCertForm(f => ({ ...f, destination_country: e.target.value }))}
                    placeholder="e.g. Vietnam, Singapore" className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40" />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-400 mb-1.5 block">Purpose *</label>
                  <textarea value={certForm.purpose} onChange={e => setCertForm(f => ({ ...f, purpose: e.target.value }))}
                    placeholder="e.g. Opening a bank account, Government filing" rows={2}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-navy-400 mb-1.5 block">Copies Needed</label>
                    <input type="number" min="1" value={certForm.copies} onChange={e => setCertForm(f => ({ ...f, copies: e.target.value }))}
                      className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-400 mb-1.5 block">Delivery</label>
                    <select value={certForm.delivery_method} onChange={e => setCertForm(f => ({ ...f, delivery_method: e.target.value }))}
                      className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40">
                      {["Digital (PDF certified copy)", "Physical — courier to Vietnam", "Physical — pick up in US/SG/HK"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-400 mb-1.5 block">Additional Notes</label>
                  <textarea value={certForm.notes} onChange={e => setCertForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any special requirements..." rows={2}
                    className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none" />
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
                  {doc.uploaded_by === "Gloyce" && (
                    <Badge variant="gold" className="text-[10px] hidden sm:flex mr-1">Gloyce</Badge>
                  )}
                  {doc.uploaded_by !== "Gloyce" && (
                    <button onClick={() => { setCertDoc(doc); setCertDone(false); }}
                      title="Request certification"
                      className="p-1.5 text-navy-500 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
                      <Stamp size={14} />
                    </button>
                  )}
                  {doc.file_url && (
                    <>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                        title="View"
                        className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                        <ExternalLink size={14} />
                      </a>
                      <a href={doc.file_url} download
                        title="Download"
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

      {/* Info box */}
      <div className="p-4 rounded-xl bg-navy-800 border border-navy-700 flex items-start gap-3">
        <Stamp size={16} className="text-navy-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Need document certification?</p>
          <p className="text-xs text-navy-500 mt-0.5 mb-3">Request apostille, notarization, or government certification for any of your documents. Our team will process it within 3–5 business days.</p>
          {documents.filter(d => d.uploaded_by !== "Gloyce").length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {documents.filter(d => d.uploaded_by !== "Gloyce").map(doc => (
                <button key={doc.id}
                  onClick={() => { setCertDoc(doc); setCertDone(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-700 border border-navy-600 text-xs text-navy-300 hover:text-gold hover:border-gold/40 transition-colors">
                  <Stamp size={11} />
                  {doc.name.length > 30 ? doc.name.slice(0, 30) + "…" : doc.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-navy-600 italic">No documents available for certification yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
