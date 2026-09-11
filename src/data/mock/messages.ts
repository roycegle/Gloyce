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
    title: "Mercury Bank Account Setup",
    lastMessage: "Please prepare the documents on the attached checklist...",
    lastDate: "2026-09-08T14:15:00",
    unreadCount: 2,
    messages: [
      {
        id: "msg-001",
        sender: "client",
        senderName: "Alex Chen",
        content: "Hi Gloyce team, the LLC has been issued an EIN. What are the next steps to open a Mercury account?",
        timestamp: "2026-09-07T09:00:00",
        read: true,
      },
      {
        id: "msg-002",
        sender: "gloyce",
        senderName: "Linh — Gloyce",
        content: "Hi Alex! Great news. To open a Mercury account, you'll need:\n\n1. Valid passport (clear photo)\n2. Proof of address (utility bill or bank statement in English)\n3. Certificate of Formation (already in your documents)\n4. EIN Letter (already in your documents)\n\nPlease upload items 1 & 2 in the Documents section — Gloyce will complete and submit the application on your behalf.",
        timestamp: "2026-09-08T14:15:00",
        read: true,
      },
      {
        id: "msg-003",
        sender: "gloyce",
        senderName: "Linh — Gloyce",
        content: "Mercury typically approves accounts within 3–5 business days. Let us know if you have any questions!",
        timestamp: "2026-09-08T14:16:00",
        read: false,
      },
    ],
  },
  {
    id: "conv-002",
    title: "August 2026 Bookkeeping Report",
    lastMessage: "The August financial report is complete and uploaded.",
    lastDate: "2026-09-10T09:00:00",
    unreadCount: 0,
    messages: [
      {
        id: "msg-004",
        sender: "gloyce",
        senderName: "Hung — Gloyce",
        content: "The August 2026 financial report is complete and uploaded. Please go to Documents > Tax Documents to view the details.\n\nTotal revenue: $12,340. No significant expense items flagged. Please review and confirm!",
        timestamp: "2026-09-10T09:00:00",
        read: true,
      },
    ],
  },
];
