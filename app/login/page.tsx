"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, clearError, selectAuth } from "@/store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { isAuthenticated, error } = useAppSelector(selectAuth);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(()=>{ if(isAuthenticated) router.replace("/"); },[isAuthenticated,router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); dispatch(login({ email, password }));
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f1f5f9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-poppins text-2xl font-black text-[#6366f1] inline-block mb-4">LUXE</Link>
            <h1 className="font-poppins text-xl font-bold text-[#0f172a] mb-1">Welcome back</h1>
            <p className="text-sm text-[#64748b]">Sign in to your account</p>
          </div>

          <div className="mb-6 p-3.5 rounded-xl border border-[#c7d2fe] bg-[#eef2ff] text-center">
            <p className="text-xs font-bold text-[#6366f1] mb-0.5">🔑 Demo Credentials</p>
            <p className="text-xs text-[#4f46e5] font-mono">admin@admin.com · 123123</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Email Address</label>
              <input type="email" required value={email} placeholder="admin@admin.com"
                onChange={e=>{ setEmail(e.target.value); dispatch(clearError()); }}
                className={`w-full px-4 py-3 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${error?"border-[#ef4444]":"border-[#e2e8f0]"}`}
                style={{ fontFamily:"inherit" }}/>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#64748b]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#6366f1] hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPass?"text":"password"} required value={password} placeholder="••••••••"
                  onChange={e=>{ setPassword(e.target.value); dispatch(clearError()); }}
                  className={`w-full px-4 py-3 pr-11 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${error?"border-[#ef4444]":"border-[#e2e8f0]"}`}
                  style={{ fontFamily:"inherit" }}/>
                <button type="button" onClick={()=>setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8] hover:text-[#64748b]">
                  {showPass?"🙈":"👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#fca5a5] bg-[#fef2f2] text-sm text-[#ef4444]">
                ⚠️ {error}
              </div>
            )}

            <button type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm hover:shadow-md mt-2"
              style={{ fontFamily:"inherit" }}>
              Sign In
            </button>
          </form>

          <p className="text-center text-xs mt-5 text-[#94a3b8]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#6366f1] hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
