"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const KNOWN = ["admin@admin.com","user@luxe.com"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email address"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    if (KNOWN.includes(email.toLowerCase())) {
      setSent(true); setError("");
    } else {
      setError("No account found with that email address");
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f1f5f9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-poppins text-2xl font-black text-[#6366f1] inline-block mb-4">LUXE</Link>
            {!sent ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#eef2ff] flex items-center justify-center mx-auto mb-4 text-2xl">🔐</div>
                <h1 className="font-poppins text-xl font-bold text-[#0f172a] mb-1">Forgot Password?</h1>
                <p className="text-sm text-[#64748b]">Enter your email to receive a reset link</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#86efac] flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
                <h1 className="font-poppins text-xl font-bold text-[#0f172a] mb-1">Email Sent!</h1>
                <p className="text-sm text-[#64748b]">Check your inbox for the reset link</p>
              </>
            )}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Email Address</label>
                <input type="email" required value={email} placeholder="admin@admin.com"
                  onChange={e=>{ setEmail(e.target.value); setError(""); }}
                  className={`w-full px-4 py-3 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${error?"border-[#ef4444]":"border-[#e2e8f0]"}`}
                  style={{ fontFamily:"inherit" }}/>
                {error && <p className="text-[11px] mt-1 text-[#ef4444]">{error}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-60 transition-all shadow-sm flex items-center justify-center gap-2"
                style={{ fontFamily:"inherit" }}>
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Sending…
                  </>
                ) : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-[#f0fdf4] rounded-xl border border-[#86efac] p-4 mb-5 text-sm text-[#15803d]">
                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox and spam folder.
              </div>
              <button onClick={() => setSent(false)}
                className="text-xs text-[#6366f1] hover:underline">
                Didn&apos;t receive it? Try again
              </button>
            </div>
          )}

          <p className="text-center text-xs mt-5 text-[#94a3b8]">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-[#6366f1] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
