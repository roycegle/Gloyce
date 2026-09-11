"use client";

import { useState } from "react";
import { MOCK_CONVERSATIONS } from "@/data/mock/messages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = today.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] max-w-5xl gap-0 rounded-2xl overflow-hidden border border-navy-700">
      {/* Conversation list */}
      <div className="w-72 shrink-0 border-r border-navy-700 bg-navy-800 flex flex-col">
        <div className="p-4 border-b border-navy-700">
          <h3 className="text-sm font-semibold text-foreground">Tin nhắn</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={cn(
                "w-full text-left p-4 border-b border-navy-700/50 hover:bg-navy-750 transition-colors",
                activeConv.id === conv.id && "bg-gold/5 border-l-2 border-l-gold"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-foreground line-clamp-1">
                  {conv.title}
                </p>
                {conv.unreadCount > 0 && (
                  <Badge variant="gold" className="text-[10px] px-1.5 py-0 shrink-0">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-navy-500 line-clamp-2 leading-relaxed">
                {conv.lastMessage}
              </p>
              <p className="text-[10px] text-navy-600 mt-1">{formatDate(conv.lastDate)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message thread */}
      <div className="flex-1 flex flex-col bg-navy-900">
        {/* Thread header */}
        <div className="p-4 border-b border-navy-700 bg-navy-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
            <Globe size={14} className="text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{activeConv.title}</p>
            <p className="text-xs text-navy-500">Đội ngũ Gloyce</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {activeConv.messages.map((msg) => {
            const isClient = msg.sender === "client";
            return (
              <div
                key={msg.id}
                className={cn("flex gap-3 max-w-[80%]", isClient ? "ml-auto flex-row-reverse" : "")}
              >
                {!isClient && (
                  <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 text-[10px] font-bold text-gold mt-1">
                    G
                  </div>
                )}
                <div>
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                      isClient
                        ? "bg-gold text-navy-900 rounded-tr-sm"
                        : "bg-navy-800 border border-navy-700 text-navy-200 rounded-tl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  <p className={cn("text-[10px] text-navy-600 mt-1", isClient ? "text-right" : "")}>
                    {msg.senderName} · {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-navy-700 bg-navy-800 flex items-end gap-3"
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 resize-none h-10 max-h-32 px-3 py-2 text-sm rounded-xl bg-navy-900 border border-navy-700 text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
            <Send size={15} />
          </Button>
        </form>
      </div>
    </div>
  );
}
