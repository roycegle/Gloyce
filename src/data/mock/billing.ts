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
    amount: "$499",
    status: "paid",
    date: "2026-08-15",
    dueDate: "2026-08-15",
  },
  {
    id: "inv-002",
    invoiceNumber: "GLY-2026-002",
    description: "OPERATE — Accounting & Compliance Sep 2026",
    amount: "$299",
    status: "pending",
    date: "2026-09-01",
    dueDate: "2026-09-15",
  },
];

export const MOCK_BILLING_SUMMARY = {
  currentPlan: "OPERATE Monthly",
  nextCharge: "$299",
  nextChargeDate: "2026-10-01",
  totalPaid: "$798",
};
