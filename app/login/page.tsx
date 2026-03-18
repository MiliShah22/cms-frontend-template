"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, clearError, selectAuth } from "@/store/slices/authSlice";
import { GoldBtn } from "@/components/ui/Buttons";

export default function LoginPage() {
  const dispatch   = useAppDispatch();
  const router     = useRouter();
  const { isAuthenticated, error } = useAppSelector(selectAuth);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { if (isAuthenticated) router.replace("/"); }, [isAuthenticated, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  const borderColor = (hasErr: boolean) => ({ borderColor: hasErr ? "#f87171" : "#252b3d" });

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-playfair text-3xl font-black tracking-widest inline-block mb-4"
              style={{ color:"#e8c97a" }}>LUXE</Link>
            <h1 className="font-playfair text-xl font-bold mb-1" style={{ color:"#eef0f6" }}>Welcome back</h1>
            <p className="text-sm" style={{ color:"#6b7290" }}>Sign in to your account</p>
          </div>

          <div className="mb-6 p-3 rounded-xl border border-[#252b3d] bg-[#0f1117] text-center">
            <p className="text-xs font-semibold mb-0.5" style={{ color:"#c9a84c" }}>Demo Credentials</p>
            <p className="text-xs" style={{ color:"#8e96b5" }}>admin@admin.com &nbsp;/&nbsp; 123123</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color:"#6b7290" }}>Email Address</label>
              <input type="email" required value={email} placeholder="admin@admin.com"
                onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }}
                className="w-full px-4 py-3 rounded-[9px] border bg-[#0f1117] text-sm outline-none transition-colors focus:border-[#c9a84c]"
                style={{ ...borderColor(!!error), color:"#eef0f6", fontFamily:"inherit" }}/>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color:"#6b7290" }}>Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={password} placeholder="••••••••"
                  onChange={(e) => { setPassword(e.target.value); dispatch(clearError()); }}
                  className="w-full px-4 py-3 pr-11 rounded-[9px] border bg-[#0f1117] text-sm outline-none transition-colors focus:border-[#c9a84c]"
                  style={{ ...borderColor(!!error), color:"#eef0f6", fontFamily:"inherit" }}/>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color:"#6b7290" }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm"
                style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171" }}>
                ⚠️ {error}
              </div>
            )}

            <GoldBtn type="submit" fullWidth className="mt-2">Sign In</GoldBtn>
          </form>

          <p className="text-center text-xs mt-5" style={{ color:"#6b7290" }}>
            Don&apos;t have an account?{" "}
            <span className="font-semibold cursor-pointer hover:underline" style={{ color:"#c9a84c" }}>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}
