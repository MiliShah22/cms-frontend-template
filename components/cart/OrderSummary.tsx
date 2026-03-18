"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartSubtotal, selectCartDiscount, selectCartTotal,
  selectCouponCode, selectCouponDiscount, applyCoupon, removeCoupon,
} from "@/store/slices/cartSlice";

export default function OrderSummary({ mode, onCheckout }: { mode:"cart"|"checkout"; onCheckout?:()=>void }) {
  const dispatch       = useAppDispatch();
  const subtotal       = useAppSelector(selectCartSubtotal);
  const discount       = useAppSelector(selectCartDiscount);
  const couponCode     = useAppSelector(selectCouponCode);
  const couponDiscount = useAppSelector(selectCouponDiscount);
  const total          = useAppSelector(selectCartTotal);
  const couponSaving   = Math.round((subtotal*couponDiscount)/100);
  const tax            = Math.round((subtotal-couponSaving)*0.18);
  const [input, setInput] = useState("");
  const [err,   setErr]   = useState("");

  function handleApply() {
    if (!input.trim()) return;
    if (["LUXE20","SAVE10","FIRST15"].includes(input.toUpperCase().trim())) {
      dispatch(applyCoupon(input)); setErr(""); setInput("");
    } else { setErr("Invalid coupon code"); }
  }

  const rows = [
    { label:"Subtotal",         val:`₹${subtotal.toLocaleString()}`,       color:undefined   },
    { label:"Product Discount", val:`−₹${discount.toLocaleString()}`,      color:"#10b981"   },
    ...(couponDiscount>0 ? [{ label:`Coupon (${couponCode}) ${couponDiscount}%`, val:`−₹${couponSaving.toLocaleString()}`, color:"#10b981" }] : []),
    { label:"Delivery",         val:"FREE",                                 color:"#10b981"   },
    { label:"Tax (18% GST)",    val:`₹${tax.toLocaleString()}`,             color:undefined   },
  ];

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm p-6 sticky top-20">
      <h2 className="font-poppins text-lg font-bold text-[#0f172a] mb-5">Order Summary</h2>

      <div className="flex flex-col gap-3 mb-4">
        {rows.map((r)=>(
          <div key={r.label} className="flex justify-between text-sm text-[#64748b]">
            <span>{r.label}</span>
            <span style={r.color?{color:r.color}:undefined}>{r.val}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-baseline pt-4 border-t border-[#e2e8f0] mb-5">
        <span className="text-base font-bold text-[#0f172a]">Total</span>
        <span className="font-poppins text-2xl font-black text-[#6366f1]">₹{total.toLocaleString()}</span>
      </div>

      {/* Coupon */}
      {mode==="cart" && (
        <div className="mb-5">
          {couponCode ? (
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[#86efac] bg-[#f0fdf4] text-sm font-semibold text-[#10b981]">
              <span>✓ {couponCode} · {couponDiscount}% off</span>
              <button onClick={()=>dispatch(removeCoupon())} className="text-xs underline opacity-70 hover:opacity-100">Remove</button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input value={input} onChange={(e)=>{ setInput(e.target.value); setErr(""); }}
                  onKeyDown={(e)=>e.key==="Enter"&&handleApply()}
                  placeholder="Coupon code (try LUXE20)"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm outline-none focus:border-[#6366f1] transition-colors"
                  style={{ color:"#1e293b", fontFamily:"inherit", borderColor:err?"#ef4444":"#e2e8f0" }}/>
                <button onClick={handleApply}
                  className="px-4 py-2.5 rounded-lg text-sm font-bold bg-[#6366f1] hover:bg-[#4f46e5] text-white transition-all"
                  style={{ fontFamily:"inherit" }}>Apply</button>
              </div>
              {err && <p className="text-xs mt-1.5 text-[#ef4444]">{err}</p>}
              <p className="text-[10px] text-[#94a3b8] mt-2">Try: LUXE20 · SAVE10 · FIRST15</p>
            </>
          )}
        </div>
      )}

      {/* CTA */}
      {mode==="cart" ? (
        <Link href="/checkout">
          <button className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            style={{ fontFamily:"inherit" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Proceed to Checkout
          </button>
        </Link>
      ) : (
        <button onClick={onCheckout}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          style={{ fontFamily:"inherit" }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Place Order
        </button>
      )}

      <div className="flex justify-center gap-5 mt-4">
        {[{icon:"🔒",label:"SSL Secured"},{icon:"↩️",label:"Easy Returns"},{icon:"🚚",label:"Fast Ship"}].map((b)=>(
          <div key={b.label} className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
            <span>{b.icon}</span>{b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
