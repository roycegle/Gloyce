"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Plus, CheckCircle, XCircle, Clock } from "lucide-react";

interface User { id: string; name: string; email: string; phone?: string; company?: string; status: string; created_at: string; }
interface Service { id: string; type: string; name: string; status: string; current_step: number; total_steps: number; price?: number; created_at: string; }
interface Message { id: string; sender: string; subject?: string; content: string; created_at: string; }

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
  action_required: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<{ user: User; services: Service[]; messages: Message[] } | null>(null);
  const [tab, setTab] = useState<"overview" | "services" | "messages">("overview");
  const [message, setMessage] = useState("");
  const [newService, setNewService] = useState({ type: "execute", name: "", price: "", total_steps: "5" });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/admin/customers/${id}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => { load(); }, [id]);

  const updateStatus = async (status: string) => {
    setSaving(true);
    await fetch(`/api/admin/customers/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await load();
    setSaving(false);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setSaving(true);
    await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: id, content: message }) });
    setMessage("");
    await load();
    setSaving(false);
  };

  const createService = async () => {
    if (!newService.name) return;
    setSaving(true);
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id, type: newService.type, name: newService.name, price: parseFloat(newService.price) || null, total_steps: parseInt(newService.total_steps) }),
    });
    setNewService({ type: "execute", name: "", price: "", total_steps: "5" });
    setShowServiceForm(false);
    await load();
    setSaving(false);
  };

  const updateServiceStep = async (serviceId: string, step: number, total: number) => {
    await fetch(`/api/admin/services/${serviceId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current_step: step, status: step >= total ? "completed" : "active" }) });
    await load();
  };

  if (!data) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  const { user, services, messages } = data;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/customers" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[user.status] || "bg-gray-100 text-gray-600"}`}>
            {user.status}
          </span>
          {user.status === "pending" && (
            <button onClick={() => updateStatus("active")} disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600">
              <CheckCircle size={13} /> Activate
            </button>
          )}
          {user.status === "active" && (
            <button onClick={() => updateStatus("suspended")} disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600">
              <XCircle size={13} /> Suspend
            </button>
          )}
          {user.status === "suspended" && (
            <button onClick={() => updateStatus("active")} disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600">
              <CheckCircle size={13} /> Reactivate
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {(["overview", "services", "messages"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {t} {t === "services" && `(${services.length})`} {t === "messages" && `(${messages.length})`}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Customer Info</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[["Name", user.name], ["Email", user.email], ["Phone", user.phone || "—"], ["Company", user.company || "—"], ["Status", user.status], ["Registered", new Date(user.created_at).toLocaleDateString()]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-gray-400">{k}</dt>
                  <dd className="font-medium text-gray-700 capitalize">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Services Summary</h2>
            {services.length === 0 ? (
              <p className="text-sm text-gray-400">No services yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {services.map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">Step {s.current_step}/{s.total_steps}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[s.status] || "bg-gray-100 text-gray-500"}`}>{s.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services */}
      {tab === "services" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowServiceForm(!showServiceForm)}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600">
              <Plus size={15} /> Add Service
            </button>
          </div>
          {showServiceForm && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">New Service</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                  <select value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="execute">EXECUTE</option>
                    <option value="operate">OPERATE</option>
                    <option value="strategize">STRATEGIZE</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Service Name</label>
                  <input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="e.g. US LLC Formation — Delaware"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Price (USD)</label>
                  <input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="499"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Total Steps</label>
                  <input type="number" value={newService.total_steps} onChange={(e) => setNewService({ ...newService, total_steps: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowServiceForm(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button onClick={createService} disabled={saving || !newService.name}
                  className="px-4 py-1.5 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 disabled:opacity-50">
                  Create Service
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {services.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">No services yet</div>
            ) : services.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">{s.type}</span>
                    <h3 className="font-semibold text-gray-900 mt-0.5">{s.name}</h3>
                    {s.price && <p className="text-xs text-gray-400">${s.price.toLocaleString()}</p>}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_BADGE[s.status] || "bg-gray-100 text-gray-500"}`}>{s.status}</span>
                </div>
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Step {s.current_step} of {s.total_steps}</span>
                    <span>{Math.round((s.current_step / s.total_steps) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(s.current_step / s.total_steps) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Update step:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: s.total_steps }, (_, i) => i + 1).map((step) => (
                      <button key={step} onClick={() => updateServiceStep(s.id, step, s.total_steps)}
                        className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${step === s.current_step ? "bg-amber-500 text-white" : step < s.current_step ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {tab === "messages" && (
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">No messages yet</p>
              ) : messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${m.sender === "admin" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                    {m.subject && <p className="font-semibold text-xs mb-1 opacity-75">{m.subject}</p>}
                    <p>{m.content}</p>
                    <p className={`text-[10px] mt-1 ${m.sender === "admin" ? "text-amber-200" : "text-gray-400"}`}>
                      {m.sender === "admin" ? "You" : user.name} · {new Date(m.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input value={message} onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message to ${user.name}...`}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <button onClick={sendMessage} disabled={!message.trim() || saving}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
