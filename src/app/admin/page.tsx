"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Briefcase, MessageSquare, Clock } from "lucide-react";

interface Stats {
  totalCustomers: number;
  pendingCustomers: number;
  activeServices: number;
  newMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  const cards = [
    { label: "Total Customers", value: stats?.totalCustomers ?? "—", icon: Users, href: "/admin/customers", color: "#3B82F6" },
    { label: "Pending Approval", value: stats?.pendingCustomers ?? "—", icon: Clock, href: "/admin/customers?status=pending", color: "#F59E0B" },
    { label: "Active Services", value: stats?.activeServices ?? "—", icon: Briefcase, href: "/admin/services", color: "#10B981" },
    { label: "Unread Messages", value: stats?.newMessages ?? "—", icon: MessageSquare, href: "/admin/messages", color: "#8B5CF6" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to Gloyce Admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/customers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
              <Users size={16} className="text-blue-500" /> View all customers
            </Link>
            <Link href="/admin/customers?status=pending" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
              <Clock size={16} className="text-amber-500" /> Approve pending accounts
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
              <Briefcase size={16} className="text-green-500" /> Manage services
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
              <MessageSquare size={16} className="text-purple-500" /> Reply to messages
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Getting Started</h2>
          <ol className="flex flex-col gap-3 text-sm text-gray-600 list-none">
            {[
              "Customer signs up → status is 'pending'",
              "You review and activate their account",
              "Create a service for them (EXECUTE/OPERATE)",
              "Update service progress as work proceeds",
              "Communicate via Messages",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
