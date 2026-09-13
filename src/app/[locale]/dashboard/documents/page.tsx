"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, File, FileSpreadsheet, Image, FolderOpen, ExternalLink } from "lucide-react";
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

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tất cả",
  company: "Công ty",
  tax: "Thuế",
  banking: "Ngân hàng",
  compliance: "Compliance",
  license: "Giấy phép",
  certification: "Chứng thực",
  general: "Khác",
};

export default function DocumentsPage() {
  const t = useTranslations("dashboard.documents");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/dashboard/documents")
      .then(r => r.json())
      .then(d => { setDocuments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(documents.map(d => d.category).filter(Boolean)))];
  const filtered = activeCategory === "all" ? documents : documents.filter(d => d.category === activeCategory);

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-sm text-navy-400 mt-0.5">
          Hồ sơ và tài liệu hoàn chỉnh từ Gloyce — luôn có sẵn để xem và tải về
        </p>
      </div>

      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                activeCategory === cat
                  ? "bg-gold/10 text-gold border-gold/20"
                  : "text-navy-400 hover:text-foreground border-navy-700 hover:border-navy-600")}>
              {CATEGORY_LABELS[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1))}
            </button>
          ))}
        </div>
      )}

      {/* Document list */}
      {loading ? (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-10 text-center text-sm text-navy-500">
          Đang tải...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 bg-navy-800 rounded-2xl border border-navy-700 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-navy-700 border border-navy-600 flex items-center justify-center">
            <FolderOpen size={24} className="text-navy-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground mb-1">{t("noDocumentsTitle")}</p>
            <p className="text-sm text-navy-400 max-w-xs mx-auto leading-relaxed">
              Hồ sơ hoàn chỉnh của bạn sẽ xuất hiện ở đây sau khi Gloyce xử lý xong dịch vụ.
            </p>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <Badge variant="gold" className="text-[10px] shrink-0">Gloyce</Badge>
                  </div>
                  <p className="text-xs text-navy-500 mt-0.5">
                    {ext.toUpperCase()} · {formatDate(doc.created_at)}
                    {doc.category && doc.category !== "general" && ` · ${CATEGORY_LABELS[doc.category] || doc.category}`}
                  </p>
                </div>
                {doc.file_url && (
                  <div className="flex items-center gap-1 shrink-0">
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                      title="Xem"
                      className="p-2 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                      <ExternalLink size={15} />
                    </a>
                    <a href={doc.file_url} download
                      title="Tải xuống"
                      className="p-2 text-navy-500 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
                      <Download size={15} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
