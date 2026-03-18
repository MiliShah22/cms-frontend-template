"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STEPS = [
  { icon:"✅", label:"Order Confirmed", value:"Just now"      },
  { icon:"📦", label:"Processing",      value:"Within 2 hrs"  },
  { icon:"🚚", label:"Shipped",         value:"Within 24 hrs" },
  { icon:"🏠", label:"Delivered",       value:"3–5 days"      },
];

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState("");
  const [show,    setShow]    = useState(false);

  useEffect(()=>{
    setOrderId("LUXE-2026-"+Math.floor(Math.random()*90000+10000));
    setTimeout(()=>setShow(true),100);
  },[]);

  return (
    <div className="max-w-[640px] mx-auto px-6 py-16 pb-20 text-center">
      <style>{`
        @keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      {/* Success icon */}
      <div className="pop-in w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 bg-[#f0fdf4] border border-[#86efac]">✅</div>

      <h1 className="font-poppins text-4xl font-black text-[#0f172a] mb-3"
        style={{ opacity:show?1:0, transition:"opacity 0.4s 0.2s" }}>
        Order Placed! 🎉
      </h1>
      <p className="text-sm leading-relaxed text-[#64748b] mb-6"
        style={{ opacity:show?1:0, transition:"opacity 0.4s 0.35s" }}>
        Thank you for your purchase. Your order has been confirmed and will be dispatched within 24 hours. You&apos;ll receive an email confirmation shortly.
      </p>

      {/* Order ID badge */}
      <div className="inline-block px-5 py-2.5 rounded-xl mb-8 text-sm font-bold tracking-wider bg-[#eef2ff] text-[#6366f1] border border-[#c7d2fe]"
        style={{ opacity:show?1:0, transition:"opacity 0.4s 0.45s" }}>
        ORDER #{orderId}
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-3 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm p-6 mb-8"
        style={{ opacity:show?1:0, transition:"opacity 0.4s 0.55s" }}>
        {STEPS.map((step,i)=>(
          <div key={step.label} className="relative text-center">
            {i<STEPS.length-1 && (
              <div className="absolute top-5 h-px bg-[#e2e8f0]" style={{ left:"calc(50% + 18px)", right:"-50%" }}/>
            )}
            <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-lg bg-[#eef2ff] border border-[#c7d2fe]">
              {step.icon}
            </div>
            <p className="text-[10px] font-bold text-[#64748b]">{step.label}</p>
            <p className="text-[10px] font-medium text-[#1e293b] mt-0.5">{step.value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center"
        style={{ opacity:show?1:0, transition:"opacity 0.4s 0.65s" }}>
        <Link href="/"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-[#e2e8f0] text-sm font-semibold text-[#64748b] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#eef2ff] transition-all">
          ← Continue Shopping
        </Link>
        <button
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all shadow-sm"
          style={{ fontFamily:"inherit" }}>
          📄 View Invoice
        </button>
      </div>
    </div>
  );
}
