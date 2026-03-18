"use client";
import { useState } from "react";
import Link from "next/link";
import { showToast } from "@/components/ui/Toast";

const CATEGORIES = ["Order Issue","Return / Refund","Product Query","Payment Problem","Technical Issue","Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", category:"Order Issue", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<Record<string,string>>({});

  function set(k: string, v: string) { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); }

  function validate() {
    const e: Record<string,string> = {};
    if (!form.name.trim())           e.name    = "Required";
    if (!form.email.includes("@"))   e.email   = "Valid email required";
    if (!form.subject.trim())        e.subject = "Required";
    if (form.message.trim().length < 20) e.message = "Please provide at least 20 characters";
    setErrors(e); return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1200));
    setLoading(false);
    setSubmitted(true);
    showToast("Your message has been sent! 🎉");
  }

  const inp = (k: string) =>
    `w-full px-4 py-3 rounded-lg border bg-[#f8fafc] text-sm outline-none transition-colors focus:border-[#6366f1] text-[#1e293b] ${errors[k]?"border-[#ef4444]":"border-[#e2e8f0]"}`;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 pb-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-poppins text-4xl font-bold text-[#0f172a] mb-2">Contact <span className="text-[#6366f1]">Us</span></h1>
        <p className="text-sm text-[#64748b]">We&apos;re here to help. Reach out and we&apos;ll respond within 24 hours.</p>
        <div className="mt-4 h-1 w-16 rounded-full bg-[#6366f1] mx-auto"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#f0fdf4] border border-[#86efac] flex items-center justify-center mx-auto mb-5 text-4xl" style={{ animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>✅</div>
              <style>{`@keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
              <h2 className="font-poppins text-xl font-bold text-[#0f172a] mb-2">Message Received!</h2>
              <p className="text-sm text-[#64748b] mb-2">Thanks for reaching out, <strong>{form.name}</strong>.</p>
              <p className="text-sm text-[#64748b] mb-6">We&apos;ll reply to <strong>{form.email}</strong> within 24 hours.</p>
              <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] p-4 text-left mb-6">
                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Your Message</p>
                <p className="text-sm text-[#64748b]">{form.message}</p>
              </div>
              <button onClick={()=>{ setSubmitted(false); setForm({name:"",email:"",phone:"",category:"Order Issue",subject:"",message:""}); }}
                className="text-sm font-semibold text-[#6366f1] hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2 className="font-poppins text-lg font-bold text-[#0f172a]">Send a Message</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Full Name</label>
                  <input placeholder="Aryan Kapoor" value={form.name} onChange={e=>set("name",e.target.value)} className={inp("name")} style={{ fontFamily:"inherit" }}/>
                  {errors.name && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Phone (optional)</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)} className={inp("phone")} style={{ fontFamily:"inherit" }}/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Email Address</label>
                  <input type="email" placeholder="aryan@email.com" value={form.email} onChange={e=>set("email",e.target.value)} className={inp("email")} style={{ fontFamily:"inherit" }}/>
                  {errors.email && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Category</label>
                  <select value={form.category} onChange={e=>set("category",e.target.value)} className={inp("category")} style={{ fontFamily:"inherit" }}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Subject</label>
                  <input placeholder="Brief subject line" value={form.subject} onChange={e=>set("subject",e.target.value)} className={inp("subject")} style={{ fontFamily:"inherit" }}/>
                  {errors.subject && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.subject}</p>}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1.5 text-[#64748b]">Your Message</label>
                  <textarea rows={5} placeholder="Describe your issue or question in detail…" value={form.message} onChange={e=>set("message",e.target.value)}
                    className={`${inp("message")} resize-none`} style={{ fontFamily:"inherit" }}/>
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-[11px] text-[#ef4444]">{errors.message}</p> : <span/>}
                    <p className="text-[10px] text-[#94a3b8]">{form.message.length} chars</p>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-60 transition-all shadow-sm flex items-center justify-center gap-2"
                style={{ fontFamily:"inherit" }}>
                {loading ? (
                  <><svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Sending…</>
                ) : "Send Message ✉️"}
              </button>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <div className="flex flex-col gap-4">
          {[
            { icon:"📧", title:"Email Support", info:"support@luxestore.in", sub:"Reply within 24 hours", color:"#6366f1", bg:"#eef2ff" },
            { icon:"📞", title:"Phone Support", info:"+91 1800-123-4567", sub:"Mon–Sat, 9 AM–7 PM IST", color:"#10b981", bg:"#f0fdf4" },
            { icon:"💬", title:"Live Chat", info:"Chat with us now", sub:"Avg. response: 3 min", color:"#f59e0b", bg:"#fffbeb" },
            { icon:"🏢", title:"Head Office", info:"LUXE Store Pvt. Ltd.", sub:"Ahmedabad, Gujarat 380001", color:"#a855f7", bg:"#fdf4ff" },
          ].map(c=>(
            <div key={c.title} className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 flex items-start gap-4 hover:border-[#6366f1] transition-all group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background:c.bg }}>{c.icon}</div>
              <div>
                <p className="text-sm font-bold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">{c.title}</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color:c.color }}>{c.info}</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}

          <div className="bg-[#eef2ff] rounded-xl border border-[#c7d2fe] p-5 text-center">
            <p className="text-sm font-semibold text-[#1e293b] mb-1">📚 Check our FAQ first</p>
            <p className="text-xs text-[#64748b] mb-3">Most questions are answered there</p>
            <Link href="/faq" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6366f1] hover:underline">Browse FAQs →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
