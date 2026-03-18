"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import CheckoutForm from "@/components/cart/CheckoutForm";

export default function CheckoutPage() {
  const items  = useAppSelector(selectCartItems);
  const total  = useAppSelector(selectCartTotal);
  const router = useRouter();

  useEffect(()=>{ if(items.length===0) router.replace("/cart"); },[items,router]);
  if (items.length===0) return null;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-4">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Cart
        </Link>
        <h1 className="font-poppins text-3xl font-bold text-[#0f172a]">Checkout</h1>
        <p className="text-sm text-[#64748b] mt-1">Complete your purchase securely</p>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {[
          { n:1, label:"Cart",    done:true  },
          { n:2, label:"Details", active:true },
          { n:3, label:"Confirm", done:false  },
        ].map((s,i)=>(
          <div key={s.n} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${s.done?"bg-[#10b981] text-white":s.active?"bg-[#6366f1] text-white":"bg-[#e2e8f0] text-[#94a3b8]"}`}>
                {s.done?"✓":s.n}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${s.active?"text-[#6366f1]":s.done?"text-[#10b981]":"text-[#94a3b8]"}`}>{s.label}</span>
            </div>
            {i<2 && <div className="w-10 h-px bg-[#e2e8f0]"/>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        <CheckoutForm/>

        {/* Mini summary */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm sticky top-20">
          <h3 className="font-poppins text-base font-bold text-[#0f172a] mb-5">Order Summary</h3>
          <div className="flex flex-col gap-3 mb-5">
            {items.map((item)=>(
              <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-[#f1f5f9]">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-[#f8fafc] border border-[#e2e8f0] flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate text-[#1e293b]">{item.name}</p>
                  <p className="text-[10px] text-[#94a3b8]">Qty: {item.qty}</p>
                </div>
                <span className="font-poppins text-sm font-bold text-[#1e293b] flex-shrink-0">
                  ₹{(item.price*item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#0f172a]">Total</span>
            <span className="font-poppins text-xl font-black text-[#6366f1]">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-center gap-5 mt-5 pt-4 border-t border-[#f1f5f9]">
            {[{icon:"🔒",label:"SSL Secured"},{icon:"↩️",label:"Easy Returns"}].map((b)=>(
              <div key={b.label} className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
                <span>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
