"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  user_id: string;
  sender: string;
  content: string;
  read: boolean;
  created_at: string;
  users?: { name: string; email: string };
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => { setMessages(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  // Group by user
  const byUser = messages.reduce<Record<string, Message[]>>((acc, m) => {
    if (!acc[m.user_id]) acc[m.user_id] = [];
    acc[m.user_id].push(m);
    return acc;
  }, {});

  const threads = Object.entries(byUser).map(([userId, msgs]) => {
    const latest = msgs[0];
    const unread = msgs.filter((m) => !m.read && m.sender === "client").length;
    return { userId, latest, unread, user: latest.users };
  }).sort((a, b) => new Date(b.latest.created_at).getTime() - new Date(a.latest.created_at).getTime());

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">{threads.length} conversations</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading...</div>
        ) : threads.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No messages yet</p>
            <p className="text-xs text-gray-300 mt-1">Messages from customers will appear here</p>
          </div>
        ) : (
          <div>
            {threads.map(({ userId, latest, unread, user }) => (
              <Link key={userId} href={`/admin/customers/${userId}?tab=messages`}
                className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold text-amber-700 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{user?.name || "Unknown"}</p>
                    {unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {latest.sender === "admin" ? "You: " : ""}{latest.content}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(latest.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  <ChevronRight size={14} className="text-gray-300 mt-1 ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
