"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MOCK_DOCUMENTS, DocumentCategory } from "@/data/mock/documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, File, FileSpreadsheet, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const FILE_ICONS = {
  pdf: FileText,
  docx: File,
  xlsx: FileSpreadsheet,
  jpg: Image,
};

const FILE_COLORS = {
  pdf: "text-red-400",
  docx: "text-blue-400",
  xlsx: "text-emerald-400",
  jpg: "text-purple-400",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

export default function DocumentsPage() {
  const t = useTranslations("dashboard.documents");
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | "all">("all");

  const CATEGORY_LABELS: Record<DocumentCategory | "all", string> = {
    all: t("categories.all"),
    company: t("categories.company"),
    tax: t("categories.tax"),
    banking: t("categories.banking"),
  };

  const filtered =
    activeCategory === "all"
      ? MOCK_DOCUMENTS
      : MOCK_DOCUMENTS.filter((d) => d.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <p className="text-sm text-navy-400 mt-0.5">{t("noDocuments")}</p>
        </div>
        <Button variant="secondary" size="sm" className="gap-2 shrink-0">
          <Upload size={14} />
          {t("upload")}
        </Button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "company", "tax", "banking"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-gold/10 text-gold border border-gold/20"
                : "text-navy-400 hover:text-foreground border border-navy-700 hover:border-navy-600"
            )}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-500">{t("noDocuments")}</p>
        ) : (
          filtered.map((doc) => {
            const Icon = FILE_ICONS[doc.fileType];
            return (
              <div
                key={doc.id}
                className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 border-b border-navy-700/50 last:border-0 hover:bg-navy-750 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0">
                  <Icon size={16} className={FILE_COLORS[doc.fileType]} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {doc.fileType.toUpperCase()} · {doc.size} · {t("uploadedAt")} {formatDate(doc.uploadedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={doc.uploadedBy === "Gloyce" ? "gold" : "default"} className="text-[10px] hidden sm:flex">
                    {doc.uploadedBy}
                  </Badge>
                  <button className="p-1.5 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
