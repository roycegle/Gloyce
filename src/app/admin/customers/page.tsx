"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, Building2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
};

function CustomersContent() {
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/customers?${params}`);
    const data = await res.json();
    setCustomers(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [search, status]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-ink-400 mt-1">{customers.length} customers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-ink-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-sm border border-ink-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">All status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-ink-400 text-sm">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center text-ink-400 text-sm">No customers found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-600 bg-ink-900">
                <th className="text-left px-4 py-3 font-medium text-ink-400">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400 hidden md:table-cell">Company</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400 hidden lg:table-cell">Registered</th>
                <th className="text-left px-4 py-3 font-medium text-ink-400">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-ink-600 hover:bg-ink-900 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-ink-400">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-ink-300">
                      {c.company && <Building2 size={13} className="text-ink-400" />}
                      {c.company || <span className="text-ink-400">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-400 hidden lg:table-cell">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[c.status] || "bg-ink-700 text-ink-300"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/customers/${c.id}`} className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 text-xs font-medium">
                      View <ChevronRight size={14} />
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

export default function CustomersPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-ink-400 text-sm">Loading...</div>}>
      <CustomersContent />
    </Suspense>
  );
}
