"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "notifications" | "security";

const TABS: { key: Tab; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Hồ sơ", icon: User },
  { key: "notifications", label: "Thông báo", icon: Bell },
  { key: "security", label: "Bảo mật", icon: Shield },
];

const NOTIFICATION_SETTINGS = [
  { key: "serviceUpdates", label: "Cập nhật dịch vụ", description: "Khi có thay đổi trạng thái dịch vụ", default: true },
  { key: "documentAlerts", label: "Cảnh báo tài liệu", description: "Khi có tài liệu mới được tải lên", default: true },
  { key: "billingReminders", label: "Nhắc nhở thanh toán", description: "Trước deadline thanh toán 3 ngày", default: true },
  { key: "marketingEmails", label: "Email marketing", description: "Tin tức và ưu đãi từ Gloyce", default: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_SETTINGS.map((s) => [s.key, s.default]))
  );

  const [profile, setProfile] = useState({
    name: "Nguyễn Văn Minh",
    email: "demo@gloyce.co",
    phone: "+84 903 123 456",
    company: "Nguyen Trading LLC",
  });

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Cài đặt tài khoản</h2>
        <p className="text-sm text-navy-400 mt-0.5">Quản lý thông tin và tùy chọn tài khoản.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy-800 rounded-xl p-1 border border-navy-700 w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-navy-900 text-foreground shadow-sm"
                  : "text-navy-400 hover:text-foreground"
              )}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile tab */}
      {activeTab === "profile" && (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-lg font-bold text-gold">
              NM
            </div>
            <div>
              <p className="font-semibold text-foreground">{profile.name}</p>
              <Badge variant="gold" className="text-xs mt-1">Client</Badge>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Họ và tên"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled
            />
            <Input
              label="Số điện thoại"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <Input
              label="Tên công ty"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} size="md">
              Lưu thay đổi
            </Button>
            {saved && (
              <div className="flex items-center gap-1.5 text-sm text-emerald-400">
                <CheckCircle2 size={15} />
                Đã lưu thành công!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {activeTab === "notifications" && (
        <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground">Thông báo Email</h3>
          <div className="flex flex-col gap-3">
            {NOTIFICATION_SETTINGS.map((setting) => (
              <div
                key={setting.key}
                className="flex items-center justify-between py-3 border-b border-navy-700 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{setting.label}</p>
                  <p className="text-xs text-navy-500 mt-0.5">{setting.description}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [setting.key]: !prev[setting.key],
                    }))
                  }
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors shrink-0",
                    notifications[setting.key] ? "bg-gold" : "bg-navy-700"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      notifications[setting.key] ? "left-5" : "left-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleSave} size="md" className="w-fit">
            Lưu cài đặt
          </Button>
        </div>
      )}

      {/* Security tab */}
      {activeTab === "security" && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Đổi mật khẩu</h3>
            <Input label="Mật khẩu hiện tại" type="password" placeholder="••••••••" />
            <Input label="Mật khẩu mới" type="password" placeholder="••••••••" />
            <Input label="Xác nhận mật khẩu mới" type="password" placeholder="••••••••" />
            <Button size="md" className="w-fit">Đổi mật khẩu</Button>
          </div>

          <div className="bg-navy-800 rounded-2xl border border-navy-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Xác thực hai yếu tố (2FA)</h3>
                <p className="text-xs text-navy-500 mt-0.5">
                  Thêm lớp bảo mật bổ sung cho tài khoản của bạn
                </p>
              </div>
              <Badge variant="outline" className="text-xs">Chưa bật</Badge>
            </div>
            <Button variant="secondary" size="sm" className="mt-4">
              Bật 2FA
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
