"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

function SetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "done">("loading");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`/api/auth/set-password?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.valid) { setStatus("valid"); setUserName(d.name || ""); setUserEmail(d.email || ""); }
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const submit = async () => {
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setSubmitting(true);

    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || "Something went wrong."); setSubmitting(false); return; }

    // Auto sign in
    const result = await signIn("credentials", { email: userEmail, password, redirect: false });
    if (result?.ok) {
      setStatus("done");
      setTimeout(() => router.push("/en/dashboard"), 1500);
    } else {
      router.push("/en/auth/login");
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  if (status === "invalid") return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center max-w-md w-full">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={24} className="text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">Link expired or invalid</h1>
        <p className="text-sm text-navy-400 mb-6">This setup link has expired or already been used. Please contact us and we'll send you a new one.</p>
        <a href="mailto:hello@gloyce.com" className="inline-block px-5 py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/20 transition-colors">
          Contact Gloyce
        </a>
      </div>
    </div>
  );

  if (status === "done") return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center max-w-md w-full">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-emerald-400" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">Password set!</h1>
        <p className="text-sm text-navy-400">Redirecting you to your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <span className="inline-block bg-gold text-ink-950 font-black text-sm px-3 py-1.5 rounded-lg tracking-widest">GLOYCE</span>
        </div>

        <h1 className="text-xl font-bold text-foreground text-center mb-1">Welcome, {userName}!</h1>
        <p className="text-sm text-navy-400 text-center mb-8">Set a password to access your dashboard.</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-navy-400 mb-1.5 block">Account email</label>
            <div className="px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-sm text-navy-400">{userEmail}</div>
          </div>

          <div>
            <label className="text-xs font-medium text-navy-400 mb-1.5 block">New password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40 pr-11"
              />
              <button onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-foreground">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-navy-400 mb-1.5 block">Confirm password</label>
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="Repeat your password"
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={submit}
            disabled={submitting || !password || !confirm}
            className="w-full py-3 rounded-xl bg-gold text-ink-950 font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50 mt-2"
          >
            {submitting ? "Setting up your account…" : "Set password & go to dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-navy-950"><div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" /></div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
