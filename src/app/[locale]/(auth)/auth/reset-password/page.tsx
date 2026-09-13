"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function ResetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "done">("loading");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`/api/auth/reset-password?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.valid) { setStatus("valid"); setUserEmail(d.email || ""); }
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const submit = async () => {
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setSubmitting(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || "Something went wrong."); setSubmitting(false); return; }

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
      <Loader2 size={24} className="animate-spin text-gold" />
    </div>
  );

  if (status === "invalid") return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center max-w-md w-full">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={24} className="text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">Link expired or invalid</h1>
        <p className="text-sm text-navy-400 mb-6">This reset link has expired or already been used. Please request a new one.</p>
        <a href="/en/auth/forgot-password" className="inline-block px-5 py-2.5 rounded-xl bg-gold text-ink-950 text-sm font-semibold hover:bg-amber-400 transition-colors">
          Request new link
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
        <h1 className="text-xl font-bold text-foreground mb-2">Password updated!</h1>
        <p className="text-sm text-navy-400">Redirecting you to your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="inline-block bg-gold text-ink-950 font-black text-sm px-3 py-1.5 rounded-lg tracking-widest">GLOYCE</span>
        </div>

        <h1 className="text-xl font-bold text-foreground text-center mb-1">Reset your password</h1>
        <p className="text-sm text-navy-400 text-center mb-8">Enter a new password for <strong className="text-foreground">{userEmail}</strong></p>

        <div className="flex flex-col gap-4">
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
            className="w-full py-3 rounded-xl bg-gold text-ink-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 mt-2"
          >
            {submitting ? "Updating password…" : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <Loader2 size={24} className="animate-spin text-gold" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
