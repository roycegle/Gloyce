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
    price: "8.000.000 VNĐ",
    startDate: "2026-08-15",
    steps: [
      { id: "s1", label: "Tư vấn & Thu thập thông tin", status: "complete", completedAt: "2026-08-16" },
      { id: "s2", label: "Nộp hồ sơ LLC Delaware", status: "complete", completedAt: "2026-08-20" },
      { id: "s3", label: "Xin EIN từ IRS", status: "complete", completedAt: "2026-08-28" },
      { id: "s4", label: "Mở tài khoản Mercury", status: "current" },
      { id: "s5", label: "Kết nối Stripe", status: "upcoming" },
    ],
    nextAction: "Cần cung cấp bản sao hộ chiếu và bằng chứng địa chỉ để mở tài khoản Mercury",
    nextActionDate: "2026-09-15",
  },
  {
    id: "svc-002",
    name: "OPERATE — Kế toán & Thuế hàng tháng",
    tier: "operate",
    status: "active",
    price: "3.000.000 VNĐ/tháng",
    startDate: "2026-09-01",
    steps: [
      { id: "s1", label: "Onboarding & Cài đặt phần mềm", status: "complete", completedAt: "2026-09-02" },
      { id: "s2", label: "Sổ sách tháng 8/2026", status: "complete", completedAt: "2026-09-10" },
      { id: "s3", label: "Sổ sách tháng 9/2026", status: "current" },
      { id: "s4", label: "Khai thuế Q3 (estimated)", status: "upcoming" },
    ],
  },
];

export const MOCK_ACTIVITY = [
  {
    id: "act-001",
    type: "document",
    message: "Tài liệu Certificate of Formation đã được tải lên",
    date: "2026-09-09T10:30:00",
    icon: "file",
  },
  {
    id: "act-002",
    type: "message",
    message: "Chuyên viên gửi hướng dẫn mở tài khoản Mercury",
    date: "2026-09-08T14:15:00",
    icon: "message",
  },
  {
    id: "act-003",
    type: "service",
    message: "EIN đã được cấp: 99-1234567",
    date: "2026-08-28T09:00:00",
    icon: "check",
  },
  {
    id: "act-004",
    type: "billing",
    message: "Hóa đơn tháng 9 đã được tạo",
    date: "2026-09-01T08:00:00",
    icon: "billing",
  },
];
