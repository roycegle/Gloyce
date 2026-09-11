export type ServiceStatus = "active" | "pending" | "action_required" | "complete";
export type ServiceTier = "execute" | "operate" | "strategize";

export interface ServiceStep {
  id: string;
  label: string;
  status: "complete" | "current" | "upcoming";
  completedAt?: string;
}

export interface MockService {
  id: string;
  name: string;
  tier: ServiceTier;
  status: ServiceStatus;
  steps: ServiceStep[];
  nextAction?: string;
  nextActionDate?: string;
  price: string;
  startDate: string;
}

export const MOCK_SERVICES: MockService[] = [
  {
    id: "svc-001",
    name: "US LLC Formation — Delaware",
    tier: "execute",
    status: "action_required",
    price: "$499",
    startDate: "2026-08-15",
    steps: [
      { id: "s1", label: "Consultation & Information Gathering", status: "complete", completedAt: "2026-08-16" },
      { id: "s2", label: "Delaware LLC Filing", status: "complete", completedAt: "2026-08-20" },
      { id: "s3", label: "EIN Application (IRS)", status: "complete", completedAt: "2026-08-28" },
      { id: "s4", label: "Mercury Bank Account Opening", status: "current" },
      { id: "s5", label: "Stripe Integration", status: "upcoming" },
    ],
    nextAction: "Please upload a copy of your passport and proof of address to open the Mercury account.",
    nextActionDate: "2026-09-15",
  },
  {
    id: "svc-002",
    name: "OPERATE — Monthly Accounting & Tax",
    tier: "operate",
    status: "active",
    price: "$299/mo",
    startDate: "2026-09-01",
    steps: [
      { id: "s1", label: "Onboarding & Software Setup", status: "complete", completedAt: "2026-09-02" },
      { id: "s2", label: "Bookkeeping Aug 2026", status: "complete", completedAt: "2026-09-10" },
      { id: "s3", label: "Bookkeeping Sep 2026", status: "current" },
      { id: "s4", label: "Q3 Estimated Tax Filing", status: "upcoming" },
    ],
  },
];

export const MOCK_ACTIVITY = [
  {
    id: "act-001",
    type: "document",
    message: "Certificate of Formation uploaded to your documents.",
    date: "2026-09-09T10:30:00",
    icon: "file",
  },
  {
    id: "act-002",
    type: "message",
    message: "Specialist sent Mercury account opening instructions.",
    date: "2026-09-08T14:15:00",
    icon: "message",
  },
  {
    id: "act-003",
    type: "service",
    message: "EIN issued: 99-1234567",
    date: "2026-08-28T09:00:00",
    icon: "check",
  },
  {
    id: "act-004",
    type: "billing",
    message: "Invoice for September generated.",
    date: "2026-09-01T08:00:00",
    icon: "billing",
  },
];
