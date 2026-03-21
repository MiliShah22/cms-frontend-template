"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, clearRegisterError, selectAuth, selectIsRegisterLoading } from "@/store/slices/authSlice";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, registerError, registerSuccess } = useAppSelector(selectAuth);
  const isRegisterLoading = useAppSelector(selectIsRegisterLoading);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(clearRegisterError());
    if (registerSuccess && !isRegisterLoading) {
      const timer = setTimeout(() => router.replace("/"), 1500);
      return () => clearTimeout(timer);
    }
  }, [registerSuccess, isRegisterLoading, router, dispatch]);

  useEffect(() => { if (isAuthenticated) router.replace("/"); }, [isAuthenticated, router]);

  const validateField = useCallback((key: string) => {
    validate();
  }, [form]);

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
    dispatch(clearRegisterError());
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (form.phone && form.phone.length < 10) e.phone = "Phone number must be at least 10 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    dispatch(registerUser({ name: form.name, email: form.email, password: form.password, phone: form.phone }));
  }

  const inp = (key: string) =>
    `w-full px-4 py-3 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${errors[key] ? "border-[#ef4444]" : "border-[#e2e8f0]"}`;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f1f5f9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[460px]">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-poppins text-2xl font-black text-[#6366f1] inline-block mb-4">LUXE</Link>
            <h1 className="font-poppins text-xl font-bold text-[#0f172a] mb-1">Create an account</h1>
            <p className="text-sm text-[#64748b]">Join thousands of happy shoppers</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Full Name</label>
              <input type="text" placeholder="Aryan Kapoor" value={form.name}
                onChange={e => set("name", e.target.value)} className={inp("name")} style={{ fontFamily: "inherit" }} />
              {errors.name && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Email Address</label>
              <input type="email" placeholder="aryan@email.com" value={form.email}
                onChange={e => set("email", e.target.value)} className={inp("email")} style={{ fontFamily: "inherit" }} />
              {errors.email && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Phone Number <span className="text-[#94a3b8] font-normal">(optional)</span></label>
              <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                onChange={e => set("phone", e.target.value)} onBlur={() => form.phone && !errors.phone && validateField("phone")}
                className={inp("phone")} style={{ fontFamily: "inherit" }} />
              {errors.phone && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={form.password}
                  onChange={e => set("password", e.target.value)} className={inp("password")} style={{ fontFamily: "inherit", paddingRight: "2.75rem" }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8] hover:text-[#64748b]">
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Confirm Password</label>
              <input type="password" placeholder="Re-enter your password" value={form.confirm}
                onChange={e => set("confirm", e.target.value)} className={inp("confirm")} style={{ fontFamily: "inherit" }} />
              {errors.confirm && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.confirm}</p>}
            </div>

            {/* Register success */}
            {registerSuccess && !isRegisterLoading && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#86efac] bg-[#f0fdf4] text-sm text-[#16a34a]">
                ✅ Account created successfully! Redirecting...
              </div>
            )}

            {/* Register error */}
            {registerError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#fca5a5] bg-[#fef2f2] text-sm text-[#ef4444]">
                ⚠️ {registerError}
              </div>
            )}

            {/* Terms */}
            <p className="text-xs text-[#94a3b8]">
              By creating an account you agree to our{" "}
              <span className="text-[#6366f1] cursor-pointer hover:underline">Terms of Service</span> and{" "}
              <span className="text-[#6366f1] cursor-pointer hover:underline">Privacy Policy</span>
            </p>

            <button type="submit" disabled={isRegisterLoading}
              className={`w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${isRegisterLoading ? 'bg-[#94a3b8] cursor-not-allowed' : 'bg-[#6366f1] hover:bg-[#4f46e5] hover:shadow-md'} mt-1`}
              style={{ fontFamily: "inherit" }}>
              {isRegisterLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-5 text-[#94a3b8]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#6366f1] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
