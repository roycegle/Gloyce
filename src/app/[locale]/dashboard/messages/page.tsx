"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MOCK_CONVERSATIONS } from "@/data/mock/messages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = today.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

export default function MessagesPage() {
  const t = useTranslations("dashboard.messages");
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [showThread, setShowThread] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  const handleSelectConv = (conv: typeof MOCK_CONVERSATIONS[0]) => {
    setActiveConv(conv);
    setShowThread(true);
  };

  return (
    /* Mobile: stack vertically; Desktop: side by side */
    <div className="flex h-[calc(100vh-8rem)] max-w-5xl gap-0 rounded-2xl overflow-hidden border border-navy-700">

      {/* Conversation list — hidden on mobile when thread is open */}
      <div className={cn(
        "border-r border-navy-700 bg-navy-800 flex flex-col",
        "w-full sm:w-72 sm:shrink-0",
        showThread ? "hidden sm:flex" : "flex"
      )}>
        <div className="p-4 border-b border-navy-700">
          <h3 className="text-sm font-semibold text-foreground">{t("title")}</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConv(conv)}
              className={cn(
                "w-full text-left p-4 border-b border-navy-700/50 transition-colors",
                activeConv.id === conv.id
                  ? "bg-gold/5 border-l-2 border-l-gold"
                  : "hover:bg-navy-750"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{conv.title}</p>
                {conv.unreadCount > 0 && (
                  <Badge variant="gold" className="text-[10px] px-1.5 py-0 shrink-0">{conv.unreadCount}</Badge>
                )}
              </div>
              <p className="text-xs text-navy-500 line-clamp-2 leading-relaxed">{conv.lastMessage}</p>
              <p className="text-[10px] text-navy-600 mt-1.5">{formatDate(conv.lastDate)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Thread panel — full width on mobile when open */}
      <div className={cn(
        "flex-1 flex flex-col bg-navy-900 min-w-0",
        showThread ? "flex" : "hidden sm:flex"
      )}>
        {/* Thread header */}
        <div className="px-4 py-3.5 border-b border-navy-700 flex items-center gap-3">
          <button
            onClick={() => setShowThread(false)}
            className="sm:hidden p-1.5 -ml-1 text-navy-400 hover:text-foreground rounded-lg"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{activeConv.title}</h3>
            <p className="text-xs text-navy-500">{t("team")}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {activeConv.messages.map((msg) => {
            const isClient = msg.sender === "client";
            return (
              <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", isClient ? "self-end flex-row-reverse" : "self-start")}>
                <div className="w-7 h-7 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-[10px] font-bold text-navy-300 shrink-0">
                  {msg.senderName.charAt(0)}
                </div>
                <div>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-wrap",
                    isClient
                      ? "bg-gold/10 border border-gold/20 text-foreground rounded-tr-sm"
                      : "bg-navy-800 border border-navy-700 text-navy-300 rounded-tl-sm"
                  )}>
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
        <form onSubmit={handleSend} className="p-4 border-t border-navy-700 flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-navy-800 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:border-gold/40 transition-colors"
          />
          <Button type="submit" size="sm" className="bg-gold text-ink-950 hover:bg-gold-light shrink-0 px-3">
            <Send size={15} />
          </Button>
        </form>
      </div>
    </div>
  );
}
