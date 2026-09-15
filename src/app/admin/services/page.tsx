"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Service {
  id: string;
  type: string;
  name: string;
  status: string;
  current_step: number;
  total_steps: number;
  price?: number;
  created_at: string;
  users?: { name: string; email: string; company?: string };
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  action_required: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-ink-700 text-ink-400",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((data) => { setServices(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const filtered = filter ? services.filter((s) => s.status === filter) : services;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-ink-400 mt-1">{filtered.length} services</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {["", "active", "pending", "action_required", "completed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === s ? "bg-amber-500 text-white" : "bg-ink-800 border border-ink-600 text-ink-400 hover:border-amber-300"}`}>
            {s || "All"}
          </button>
        ))}
      </div>

      <div className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ink-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-ink-400 text-sm">No services</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-600 bg-ink-900">
                <th className="text-left px-4 py-3 font-medium text-ink-400">Service</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400 hidden md:table-cell">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400">Progress</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-600 hover:bg-ink-900">
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold text-amber-600 uppercase">{s.type}</span>
                    <p className="font-medium text-foreground">{s.name}</p>
                    {s.price && <p className="text-xs text-ink-400">${s.price.toLocaleString()}</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {s.users ? (
                      <div>
                        <p className="font-medium text-ink-300">{s.users.name}</p>
                        <p className="text-xs text-ink-400">{s.users.email}</p>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-ink-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(s.current_step / s.total_steps) * 100}%` }} />
                      </div>
                      <span className="text-xs text-ink-400">{s.current_step}/{s.total_steps}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[s.status] || "bg-ink-700 text-ink-400"}`}>
                      {s.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/customers/${(s as Service & { user_id?: string }).user_id}`} className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-xs font-medium">
                      Customer <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
