"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoldBtn, GhostBtn } from "@/components/ui/Buttons";

const STEPS = [
  { icon:"✅", label:"Order Confirmed", value:"Just now"      },
  { icon:"📦", label:"Processing",      value:"Within 2 hrs"  },
  { icon:"🚚", label:"Shipped",         value:"Within 24 hrs" },
  { icon:"🏠", label:"Delivered",       value:"3–5 days"      },
];

export default function ConfirmationPage() {
  const [orderId,  setOrderId]  = useState("");
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    setOrderId("LUXE-2026-" + Math.floor(Math.random() * 90000 + 10000));
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-[680px] mx-auto px-6 py-16 pb-20 text-center">
      <style>{`
        @keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      <div className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-4xl mx-auto mb-8 pop-in"
        style={{ background:"linear-gradient(135deg,rgba(52,211,153,0.2),rgba(52,211,153,0.05))", border:"1px solid rgba(52,211,153,0.3)" }}>
        ✅
      </div>

      <h1 className="font-playfair text-4xl md:text-5xl font-black mb-4"
        style={{ color:"#eef0f6", opacity:visible?1:0, transition:"opacity 0.4s 0.2s" }}>
        Order Placed! 🎉
      </h1>
      <p className="text-[15px] leading-relaxed mb-7"
        style={{ color:"#8e96b5", opacity:visible?1:0, transition:"opacity 0.4s 0.35s" }}>
        Thank you for your purchase. Your order has been confirmed and will be dispatched within 24 hours. You&apos;ll receive an email confirmation shortly.
      </p>

      <div className="inline-block px-5 py-2.5 rounded-lg mb-9 text-[13px] font-bold tracking-wider"
        style={{ background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.3)", color:"#e8c97a",
          opacity:visible?1:0, transition:"opacity 0.4s 0.45s" }}>
        ORDER #{orderId}
      </div>

      <div className="grid grid-cols-4 gap-3 rounded-2xl border border-[#1e2232] bg-[#13161f] p-6 mb-9"
        style={{ opacity:visible?1:0, transition:"opacity 0.4s 0.55s" }}>
        {STEPS.map((step, i) => (
          <div key={step.label} className="relative text-center">
            {i < STEPS.length-1 && (
              <div className="absolute top-5 h-px" style={{ left:"calc(50% + 18px)", right:"-50%", background:"#1e2232" }}/>
            )}
            <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-base"
              style={{ background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.2)" }}>
              {step.icon}
            </div>
            <p className="text-[11px] font-bold" style={{ color:"#8e96b5" }}>{step.label}</p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color:"#eef0f6" }}>{step.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center"
        style={{ opacity:visible?1:0, transition:"opacity 0.4s 0.65s" }}>
        <Link href="/"><GhostBtn>← Continue Shopping</GhostBtn></Link>
        <GoldBtn>📄 View Invoice</GoldBtn>
      </div>
    </div>
  );
}
