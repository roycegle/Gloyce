"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "notifications" | "security";

export default function SettingsPage() {
  const t = useTranslations("dashboard.settings");
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    serviceUpdates: true,
    documentAlerts: true,
    billingReminders: true,
    marketingEmails: false,
  });

  const [profile, setProfile] = useState({
    name: "Alex Chen",
    email: "demo@gloyce.co",
    phone: "+65 9123 4567",
    company: "Chen Trading LLC",
  });

  const TABS: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "profile", label: t("tabs.profile"), icon: User },
    { key: "notifications", label: t("tabs.notifications"), icon: Bell },
    { key: "security", label: t("tabs.security"), icon: Shield },
  ];

  const NOTIFICATION_SETTINGS = [
    { key: "serviceUpdates", label: t("notifications.serviceUpdates"), description: "When your service status changes" },
    { key: "documentAlerts", label: t("notifications.documentAlerts"), description: "When new documents are uploaded" },
    { key: "billingReminders", label: t("notifications.billingReminders"), description: "3 days before payment deadline" },
    { key: "marketingEmails", label: t("notifications.marketingEmails"), description: "News and offers from Gloyce" },
  ];

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-navy-400 mt-0.5">Manage your account information and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-navy-800 border border-navy-700 rounded-xl w-fit flex-wrap">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === key
                ? "bg-navy-700 text-foreground"
                : "text-navy-400 hover:text-foreground"
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === "profile" && (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: "name" as const, label: t("profile.name") },
              { key: "email" as const, label: t("profile.email") },
              { key: "phone" as const, label: t("profile.phone") },
              { key: "company" as const, label: t("profile.company") },
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy-400">{label}</label>
                <Input
                  value={profile[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  className="bg-navy-900 border-navy-700 text-sm"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} size="sm" className="bg-gold text-ink-950 hover:bg-gold-light">
              {t("profile.saveChanges")}
            </Button>
            {saved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={13} /> {t("saved")}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {activeTab === "notifications" && (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">{t("notifications.emailNotifications")}</p>
          {NOTIFICATION_SETTINGS.map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between gap-4 py-2 border-b border-navy-700 last:border-0">
              <div>
                <p className="text-sm text-foreground">{label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{description}</p>
              </div>
              <button
                onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                className={cn(
                  "w-10 h-6 rounded-full transition-colors relative shrink-0",
                  notifications[key] ? "bg-gold" : "bg-navy-700"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                    notifications[key] ? "translate-x-5" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Security tab */}
      {activeTab === "security" && (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">{t("security.changePassword")}</p>
            {[
              { key: "currentPassword", label: t("security.currentPassword") },
              { key: "newPassword", label: t("security.newPassword") },
              { key: "confirmPassword", label: t("security.confirmPassword") },
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy-400">{label}</label>
                <Input type="password" placeholder="••••••••" className="bg-navy-900 border-navy-700 text-sm" />
              </div>
            ))}
            <Button size="sm" variant="secondary" className="w-fit">{t("save")}</Button>
          </div>

          <div className="border-t border-navy-700 pt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{t("security.twoFactor")}</p>
              <p className="text-xs text-navy-500 mt-0.5">{t("security.twoFactorDesc")}</p>
            </div>
            <Badge variant="default" className="text-xs shrink-0">Disabled</Badge>
          </div>
        </div>
      )}
    </div>
  );
}
