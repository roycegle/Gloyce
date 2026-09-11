export interface MockMessage {
  id: string;
  sender: "client" | "gloyce";
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface MockConversation {
  id: string;
  title: string;
  lastMessage: string;
  lastDate: string;
  unreadCount: number;
  messages: MockMessage[];
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: "conv-001",
    title: "Hướng dẫn mở tài khoản Mercury",
    lastMessage: "Vui lòng chuẩn bị các tài liệu theo danh sách đính kèm...",
    lastDate: "2026-09-08T14:15:00",
    unreadCount: 2,
    messages: [
      {
        id: "msg-001",
        sender: "client",
        senderName: "Nguyễn Văn Minh",
        content: "Chào team Gloyce, LLC đã được cấp EIN rồi. Bước tiếp theo tôi cần làm gì để mở tài khoản Mercury?",
        timestamp: "2026-09-07T09:00:00",
        read: true,
      },
      {
        id: "msg-002",
        sender: "gloyce",
        senderName: "Linh — Gloyce",
        content: "Chào anh Minh! Tuyệt vời. Để mở tài khoản Mercury, anh cần chuẩn bị:\n\n1. Hộ chiếu còn hiệu lực (chụp ảnh rõ nét)\n2. Bằng chứng địa chỉ (hóa đơn điện/nước hoặc sao kê ngân hàng - tiếng Anh hoặc dịch công chứng)\n3. Certificate of Formation (đã có trong hệ thống)\n4. EIN Letter (đã có trong hệ thống)\n\nAnh tải 2 tài liệu đầu lên phần Documents nhé, Gloyce sẽ điền form và submit thay anh.",
        timestamp: "2026-09-08T14:15:00",
        read: true,
      },
      {
        id: "msg-003",
        sender: "gloyce",
        senderName: "Linh — Gloyce",
        content: "Thường Mercury duyệt trong 3–5 ngày làm việc. Anh có câu hỏi gì thêm không ạ?",
        timestamp: "2026-09-08T14:16:00",
        read: false,
      },
    ],
  },
  {
    id: "conv-002",
    title: "Kế toán tháng 8/2026",
    lastMessage: "Báo cáo tài chính tháng 8 đã hoàn thành và upload lên hệ thống.",
    lastDate: "2026-09-10T09:00:00",
    unreadCount: 0,
    messages: [
      {
        id: "msg-004",
        sender: "gloyce",
        senderName: "Hùng — Gloyce",
        content: "Báo cáo tài chính tháng 8/2026 đã hoàn thành và upload lên hệ thống. Anh vào phần Documents > Tax Documents để xem chi tiết. Tổng doanh thu: $12,340. Không có khoản chi phí đáng chú ý nào. Anh xem và xác nhận nhé!",
        timestamp: "2026-09-10T09:00:00",
        read: true,
      },
    ],
  },
];
