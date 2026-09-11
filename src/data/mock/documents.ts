export type DocumentCategory = "company" | "tax" | "banking";

export interface MockDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  fileType: "pdf" | "docx" | "xlsx" | "jpg";
  size: string;
  uploadedAt: string;
  uploadedBy: "Gloyce" | "Client";
}

export const MOCK_DOCUMENTS: MockDocument[] = [
  {
    id: "doc-001",
    name: "Certificate of Formation — Delaware LLC",
    category: "company",
    fileType: "pdf",
    size: "245 KB",
    uploadedAt: "2026-08-20",
    uploadedBy: "Gloyce",
  },
  {
    id: "doc-002",
    name: "Operating Agreement",
    category: "company",
    fileType: "docx",
    size: "89 KB",
    uploadedAt: "2026-08-20",
    uploadedBy: "Gloyce",
  },
  {
    id: "doc-003",
    name: "EIN Confirmation Letter (SS-4)",
    category: "company",
    fileType: "pdf",
    size: "120 KB",
    uploadedAt: "2026-08-28",
    uploadedBy: "Gloyce",
  },
  {
    id: "doc-004",
    name: "Registered Agent Agreement",
    category: "company",
    fileType: "pdf",
    size: "198 KB",
    uploadedAt: "2026-08-21",
    uploadedBy: "Gloyce",
  },
  {
    id: "doc-005",
    name: "Hộ chiếu (Passport Copy)",
    category: "banking",
    fileType: "jpg",
    size: "1.2 MB",
    uploadedAt: "2026-09-05",
    uploadedBy: "Client",
  },
  {
    id: "doc-006",
    name: "Báo cáo tài chính tháng 8/2026",
    category: "tax",
    fileType: "xlsx",
    size: "67 KB",
    uploadedAt: "2026-09-10",
    uploadedBy: "Gloyce",
  },
];
