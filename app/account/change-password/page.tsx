"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword, clearPasswordStatus, selectAuth } from "@/store/slices/authSlice";

export default function ChangePasswordPage() {
  const dispatch   = useAppDispatch();
  const router     = useRouter();
  const { isAuthenticated, passwordChangeError, passwordChangeSuccess } = useAppSelector(selectAuth);
  const [form, setForm]       = useState({ current:"", newPass:"", confirm:"" });
  const [show, setShow]       = useState({ current:false, newPass:false, confirm:false });
  const [errors, setErrors]   = useState<Record<string,string>>({});

  useEffect(()=>{ if(!isAuthenticated) router.replace("/login"); },[isAuthenticated,router]);
  useEffect(()=>{
    if(passwordChangeSuccess) { setTimeout(()=>{ dispatch(clearPasswordStatus()); router.push("/account"); }, 2000); }
  },[passwordChangeSuccess, dispatch, router]);

  function set(key: string, val: string) {
    setForm(f=>({...f,[key]:val})); setErrors(e=>({...e,[key]:""})); dispatch(clearPasswordStatus());
  }

  function validate() {
    const e: Record<string,string> = {};
    if (!form.current)             e.current = "Required";
    if (form.newPass.length < 6)   e.newPass = "Must be at least 6 characters";
    if (form.newPass !== form.confirm) e.confirm = "Passwords do not match";
    if (form.newPass === form.current)  e.newPass = "New password must differ from current";
    setErrors(e); return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    dispatch(changePassword({ currentPassword:form.current, newPassword:form.newPass }));
  }

  const inp = (key: string) =>
    `w-full px-4 py-3 pr-11 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${errors[key]||passwordChangeError&&key==="current"?"border-[#ef4444]":"border-[#e2e8f0]"}`;

  const EyeBtn = ({ k }: { k:keyof typeof show }) => (
    <button type="button" onClick={()=>setShow(s=>({...s,[k]:!s[k]}))}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8] hover:text-[#64748b]">
      {show[k]?"🙈":"👁️"}
    </button>
  );

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-[480px] mx-auto px-6 py-10 pb-16">
      <Link href="/account" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-6">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Account
      </Link>

      <div className="mb-8">
        <h1 className="font-poppins text-3xl font-bold text-[#0f172a]">Change <span className="text-[#6366f1]">Password</span></h1>
        <p className="text-sm text-[#64748b] mt-1">Keep your account secure with a strong password</p>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      {/* Security tips */}
      <div className="bg-[#eef2ff] border border-[#c7d2fe] rounded-xl p-4 mb-6">
        <p className="text-xs font-bold text-[#6366f1] mb-2">💡 Password Tips</p>
        <ul className="text-xs text-[#4f46e5] space-y-1">
          {["At least 8 characters","Mix uppercase and lowercase letters","Include numbers and symbols","Don't reuse old passwords"].map(t=>(
            <li key={t} className="flex items-center gap-1.5"><span className="text-[#6366f1]">✓</span>{t}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
        {passwordChangeSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#f0fdf4] border border-[#86efac] flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
            <h3 className="font-poppins text-lg font-bold text-[#0f172a] mb-2">Password Changed!</h3>
            <p className="text-sm text-[#64748b]">Redirecting to your account…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { key:"current", label:"Current Password",  ph:"Your current password" },
              { key:"newPass", label:"New Password",       ph:"Min. 6 characters" },
              { key:"confirm", label:"Confirm New Password",ph:"Re-enter new password" },
            ].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">{f.label}</label>
                <div className="relative">
                  <input type={show[f.key as keyof typeof show]?"text":"password"}
                    placeholder={f.ph} value={form[f.key as keyof typeof form]}
                    onChange={e=>set(f.key,e.target.value)}
                    className={inp(f.key)} style={{ fontFamily:"inherit" }}/>
                  <EyeBtn k={f.key as keyof typeof show}/>
                </div>
                {errors[f.key] && <p className="text-[11px] mt-1 text-[#ef4444]">{errors[f.key]}</p>}
              </div>
            ))}

            {passwordChangeError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#fca5a5] bg-[#fef2f2] text-sm text-[#ef4444]">
                ⚠️ {passwordChangeError}
              </div>
            )}

            <div className="flex gap-3 mt-1">
              <button type="submit"
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm"
                style={{ fontFamily:"inherit" }}>
                Update Password
              </button>
              <Link href="/account"
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold border border-[#e2e8f0] text-[#64748b] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#eef2ff] transition-all text-center">
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
