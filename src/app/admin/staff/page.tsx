"use client";

import { useEffect, useState } from "react";
import { UserPlus, Shield, Trash2, CheckCircle, XCircle } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  status: string;
  permissions: string[];
  created_at: string;
}

const ALL_PERMISSIONS = [
  { key: "manage_users", label: "Manage Users", desc: "View & activate/suspend customer accounts" },
  { key: "manage_payments", label: "Manage Payments", desc: "Create invoices & mark payments" },
  { key: "manage_documents", label: "Manage Documents", desc: "Upload documents & assign forms" },
];

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", permissions: [] as string[] });
  const [editId, setEditId] = useState<string | null>(null);
  const [editPerms, setEditPerms] = useState<string[]>([]);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/staff");
    const data = await res.json();
    setStaff(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePerm = (key: string, perms: string[], setPerms: (p: string[]) => void) => {
    setPerms(perms.includes(key) ? perms.filter(p => p !== key) : [...perms, key]);
  };

  const createStaff = async () => {
    if (!form.name || !form.email || !form.password) return;
    setSaving(true);
    await fetch("/api/admin/staff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", email: "", password: "", permissions: [] }); setShowForm(false);
    await load(); setSaving(false);
  };

  const updatePerms = async (id: string) => {
    setSaving(true);
    await fetch(`/api/admin/staff/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ permissions: editPerms }) });
    setEditId(null);
    await load(); setSaving(false);
  };

  const toggleStatus = async (id: string, current: string) => {
    await fetch(`/api/admin/staff/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: current === "active" ? "suspended" : "active" }) });
    await load();
  };

  const deleteStaff = async (id: string) => {
    if (!confirm("Remove this staff member?")) return;
    await fetch(`/api/admin/staff/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff</h1>
          <p className="text-sm text-ink-400 mt-1">{staff.length} staff members</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">
          <UserPlus size={15} /> Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-ink-800 rounded-xl border border-ink-600 p-5 mb-6">
          <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2"><Shield size={16} className="text-amber-500" /> New Staff Member</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div><label className="text-xs font-medium text-ink-400 mb-1 block">Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="text-xs font-medium text-ink-400 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@gloyce.com" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
            <div className="col-span-2"><label className="text-xs font-medium text-ink-400 mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 8 characters" className="w-full border border-ink-600 rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-ink-400 mb-2 block">Permissions</label>
            <div className="flex flex-col gap-2">
              {ALL_PERMISSIONS.map(p => (
                <label key={p.key} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.permissions.includes(p.key)} onChange={() => togglePerm(p.key, form.permissions, (perms) => setForm({ ...form, permissions: perms }))}
                    className="mt-0.5 accent-amber-500" />
                  <div><p className="text-sm font-medium text-slate-200">{p.label}</p><p className="text-xs text-ink-400">{p.desc}</p></div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-ink-400 hover:text-slate-300">Cancel</button>
            <button onClick={createStaff} disabled={saving || !form.name || !form.email || !form.password} className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">Create</button>
          </div>
        </div>
      )}

      <div className="bg-ink-800 rounded-xl border border-ink-600 overflow-hidden">
        {loading ? <div className="p-12 text-center text-ink-400 text-sm">Loading...</div>
          : staff.length === 0 ? <div className="p-12 text-center text-ink-400 text-sm">No staff members yet</div>
            : (
              <div>
                {staff.map((s) => (
                  <div key={s.id} className="border-b border-ink-600 last:border-0 p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">{s.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span>
                        </div>
                        <p className="text-sm text-ink-400 mb-3">{s.email}</p>
                        {editId === s.id ? (
                          <div>
                            <div className="flex flex-col gap-2 mb-3">
                              {ALL_PERMISSIONS.map(p => (
                                <label key={p.key} className="flex items-start gap-3 cursor-pointer">
                                  <input type="checkbox" checked={editPerms.includes(p.key)} onChange={() => togglePerm(p.key, editPerms, setEditPerms)} className="mt-0.5 accent-amber-500" />
                                  <div><p className="text-sm font-medium text-slate-200">{p.label}</p><p className="text-xs text-ink-400">{p.desc}</p></div>
                                </label>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setEditId(null)} className="px-3 py-1.5 text-xs text-ink-400 hover:text-slate-300">Cancel</button>
                              <button onClick={() => updatePerms(s.id)} disabled={saving} className="px-3 py-1.5 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600">Save</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {s.permissions.length === 0
                              ? <span className="text-xs text-ink-400">No permissions</span>
                              : s.permissions.map(p => (
                                <span key={p} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">
                                  {ALL_PERMISSIONS.find(x => x.key === p)?.label || p}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                      {editId !== s.id && (
                        <div className="flex items-center gap-2 ml-4">
                          <button onClick={() => { setEditId(s.id); setEditPerms(s.permissions); }} className="text-xs text-amber-600 hover:text-amber-700 font-medium">Edit Permissions</button>
                          <button onClick={() => toggleStatus(s.id, s.status)} className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-400">
                            {s.status === "active" ? <XCircle size={15} className="text-red-400" /> : <CheckCircle size={15} className="text-green-400" />}
                          </button>
                          <button onClick={() => deleteStaff(s.id)} className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-400 hover:text-red-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  );
}
