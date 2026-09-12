"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: "client" | "admin";
  subject?: string;
  content: string;
  read: boolean;
  created_at: string;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = today.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

export default function MessagesPage() {
  const t = useTranslations("dashboard.messages");
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const res = await fetch("/api/dashboard/messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    await fetch("/api/dashboard/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage }),
    });
    setNewMessage("");
    await load();
    setSending(false);
  };

  const userName = (session?.user as { name?: string })?.name || "You";

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">Direct line to your Gloyce team.</p>
      </div>

      <div className="flex-1 bg-navy-800 rounded-2xl border border-navy-700 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {loading ? (
            <div className="text-center text-navy-500 text-sm py-8">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <MessageSquare size={20} className="text-gold" />
              </div>
              <p className="text-sm font-medium text-foreground">{t("noMessages")}</p>
              <p className="text-xs text-navy-500 text-center max-w-xs">Send a message below to start a conversation with your Gloyce team.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === "client" ? "bg-gold/15 border border-gold/20" : "bg-navy-700 border border-navy-600"}`}>
                  {msg.subject && <p className="text-xs font-semibold text-navy-400 mb-1">{msg.subject}</p>}
                  <p className="text-sm text-foreground">{msg.content}</p>
                  <p className={`text-[10px] mt-1.5 ${msg.sender === "client" ? "text-gold/60 text-right" : "text-navy-500"}`}>
                    {msg.sender === "client" ? userName : "Gloyce Team"} · {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-navy-700 flex gap-2">
          <input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={t("placeholder")}
            className="flex-1 bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim() || sending} size="icon" className="shrink-0">
            <Send size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
