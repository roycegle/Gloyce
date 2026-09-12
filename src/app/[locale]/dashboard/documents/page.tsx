"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, File, FileSpreadsheet, Image, FolderOpen } from "lucide-react";
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

function getExtension(name: string): string {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "file";
}

const FILE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  docx: File,
  doc: File,
  xlsx: FileSpreadsheet,
  xls: FileSpreadsheet,
  jpg: Image,
  jpeg: Image,
  png: Image,
};

const FILE_COLORS: Record<string, string> = {
  pdf: "text-red-400",
  docx: "text-blue-400",
  doc: "text-blue-400",
  xlsx: "text-emerald-400",
  xls: "text-emerald-400",
  jpg: "text-purple-400",
  jpeg: "text-purple-400",
  png: "text-purple-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

type Category = "all" | "company" | "tax" | "banking" | "general" | "compliance" | "kyc";

export default function DocumentsPage() {
  const t = useTranslations("dashboard.documents");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    fetch("/api/dashboard/documents")
      .then(r => r.json())
      .then(d => { setDocuments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(documents.map(d => d.category)))];

  const filtered = activeCategory === "all"
    ? documents
    : documents.filter(d => d.category === activeCategory);

  const categoryLabel = (cat: string) => {
    if (cat === "all") return t("categories.all");
    if (cat === "company") return t("categories.company");
    if (cat === "tax") return t("categories.tax");
    if (cat === "banking") return t("categories.banking");
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">{t("subtitle")}</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as Category)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-gold/10 text-gold border border-gold/20"
                : "text-navy-400 hover:text-foreground border border-navy-700 hover:border-navy-600"
            )}
          >
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
              <div
                key={doc.id}
                className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 border-b border-navy-700/50 last:border-0 hover:bg-navy-750 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon size={16} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {ext.toUpperCase()} · {t("uploadedAt")} {formatDate(doc.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {doc.uploaded_by && (
                    <Badge variant={doc.uploaded_by === "Gloyce" ? "gold" : "default"} className="text-[10px] hidden sm:flex">
                      {doc.uploaded_by}
                    </Badge>
                  )}
                  {doc.file_url && (
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                      <Download size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
