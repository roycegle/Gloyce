"use client";

import { useState } from "react";
import { MOCK_DOCUMENTS, DocumentCategory } from "@/data/mock/documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, File, FileSpreadsheet, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<DocumentCategory | "all", string> = {
  all: "Tất cả",
  company: "Tài liệu công ty",
  tax: "Tài liệu thuế",
  banking: "Tài liệu ngân hàng",
};

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
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? MOCK_DOCUMENTS
      : MOCK_DOCUMENTS.filter((d) => d.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Tài liệu</h2>
          <p className="text-sm text-navy-400 mt-0.5">
            Tất cả tài liệu liên quan đến dịch vụ của bạn.
          </p>
        </div>
        <Button variant="secondary" size="sm" className="gap-2">
          <Upload size={14} />
          Tải lên
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
                ? "bg-gold/10 text-gold border border-gold/30"
                : "bg-navy-800 text-navy-400 border border-navy-700 hover:text-foreground"
            )}
          >
            {CATEGORY_LABELS[cat]}
            <span className="ml-1.5 text-navy-600">
              {cat === "all"
                ? MOCK_DOCUMENTS.length
                : MOCK_DOCUMENTS.filter((d) => d.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="bg-navy-800 rounded-2xl border border-navy-700 divide-y divide-navy-700">
        {filtered.map((doc) => {
          const Icon = FILE_ICONS[doc.fileType];
          const iconColor = FILE_COLORS[doc.fileType];

          return (
            <div
              key={doc.id}
              className="flex items-center gap-4 p-4 hover:bg-navy-750 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center shrink-0">
                <Icon size={18} className={iconColor} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-navy-500">{doc.size}</span>
                  <span className="text-xs text-navy-600">·</span>
                  <span className="text-xs text-navy-500">
                    Tải lên: {formatDate(doc.uploadedAt)}
                  </span>
                  <span className="text-xs text-navy-600">·</span>
                  <Badge
                    variant={doc.uploadedBy === "Gloyce" ? "gold" : "blue"}
                    className="text-[10px] py-0"
                  >
                    {doc.uploadedBy}
                  </Badge>
                </div>
              </div>

              <button className="p-2 text-navy-500 hover:text-foreground hover:bg-navy-700 rounded-lg transition-colors">
                <Download size={14} />
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-navy-500 text-sm">
            Không có tài liệu nào trong danh mục này.
          </div>
        )}
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-navy-700 rounded-xl p-8 text-center hover:border-navy-600 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-navy-600 mx-auto mb-2" />
        <p className="text-sm text-navy-400 font-medium">Kéo thả tài liệu vào đây</p>
        <p className="text-xs text-navy-600 mt-1">PDF, DOCX, XLSX, JPG — tối đa 10MB</p>
      </div>
    </div>
  );
}
