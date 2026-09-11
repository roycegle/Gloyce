export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface MockInvoice {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
}

export const MOCK_INVOICES: MockInvoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "GLY-2026-001",
    description: "EXECUTE — US LLC Delaware Formation",
    amount: "8.000.000 VNĐ",
    status: "paid",
    date: "2026-08-15",
    dueDate: "2026-08-15",
  },
  {
    id: "inv-002",
    invoiceNumber: "GLY-2026-002",
    description: "OPERATE — Kế toán & Tuân thủ tháng 9/2026",
    amount: "3.000.000 VNĐ",
    status: "pending",
    date: "2026-09-01",
    dueDate: "2026-09-15",
  },
];

export const MOCK_BILLING_SUMMARY = {
  currentPlan: "OPERATE Monthly",
  nextCharge: "3.000.000 VNĐ",
  nextChargeDate: "2026-10-01",
  totalPaid: "11.000.000 VNĐ",
};
