"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartSubtotal, selectCartDiscount, selectCartTotal,
  selectCouponCode, selectCouponDiscount, applyCoupon, removeCoupon,
} from "@/store/slices/cartSlice";
import { GoldBtn } from "@/components/ui/Buttons";

export default function OrderSummary({ mode, onCheckout }: { mode:"cart"|"checkout"; onCheckout?:()=>void }) {
  const dispatch       = useAppDispatch();
  const subtotal       = useAppSelector(selectCartSubtotal);
  const discount       = useAppSelector(selectCartDiscount);
  const couponCode     = useAppSelector(selectCouponCode);
  const couponDiscount = useAppSelector(selectCouponDiscount);
  const total          = useAppSelector(selectCartTotal);
  const couponSaving   = Math.round((subtotal * couponDiscount) / 100);
  const tax            = Math.round((subtotal - couponSaving) * 0.18);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    const valid = ["LUXE20","SAVE10","FIRST15"];
    if (valid.includes(couponInput.toUpperCase().trim())) {
      dispatch(applyCoupon(couponInput));
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code");
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-6 sticky top-20">
      <h2 className="font-playfair text-xl font-bold mb-5" style={{ color:"#eef0f6" }}>Order Summary</h2>

      <div className="flex flex-col gap-3 mb-4">
        {[
          { label:"Subtotal",          val:`₹${subtotal.toLocaleString()}`,            color:undefined },
          { label:"Product Discount",  val:`−₹${discount.toLocaleString()}`,           color:"#34d399" },
          ...(couponDiscount > 0 ? [{ label:`Coupon (${couponCode}) ${couponDiscount}%`, val:`−₹${couponSaving.toLocaleString()}`, color:"#34d399" }] : []),
          { label:"Delivery",          val:"FREE",                                     color:"#34d399" },
          { label:"Tax (18% GST)",     val:`₹${tax.toLocaleString()}`,                 color:undefined },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm" style={{ color:"#8e96b5" }}>
            <span>{row.label}</span>
            <span style={row.color ? { color:row.color } : undefined}>{row.val}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-baseline pt-4 border-t border-[#1e2232] mb-5">
        <span className="text-[17px] font-bold" style={{ color:"#eef0f6" }}>Total</span>
        <span className="font-playfair text-[22px] font-bold" style={{ color:"#e8c97a" }}>₹{total.toLocaleString()}</span>
      </div>

      {mode === "cart" && (
        <div className="mb-5">
          {couponCode ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold"
              style={{ background:"rgba(52,211,153,0.08)", borderColor:"rgba(52,211,153,0.3)", color:"#34d399" }}>
              <span>✓ {couponCode} applied · {couponDiscount}% off</span>
              <button onClick={() => dispatch(removeCoupon())}
                className="text-xs underline opacity-70 hover:opacity-100">Remove</button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="Coupon code (try LUXE20)"
                  className="flex-1 px-4 py-2.5 rounded-[9px] border bg-[#0f1117] text-sm outline-none transition-colors focus:border-[#c9a84c]"
                  style={{ borderColor:couponError?"#f87171":"#252b3d", color:"#eef0f6", fontFamily:"inherit" }}/>
                <button onClick={handleApplyCoupon}
                  className="px-4 py-2.5 rounded-[9px] text-sm font-bold coupon-apply-btn"
                  style={{ background:"#c9a84c", color:"#080a0e", fontFamily:"inherit" }}>
                  Apply
                  <style>{`.coupon-apply-btn:hover{background:#e8c97a}`}</style>
                </button>
              </div>
              {couponError && <p className="text-xs mt-1.5" style={{ color:"#f87171" }}>{couponError}</p>}
            </>
          )}
        </div>
      )}

      {mode === "cart" ? (
        <Link href="/checkout">
          <GoldBtn fullWidth>🔒 Proceed to Checkout</GoldBtn>
        </Link>
      ) : (
        <GoldBtn fullWidth onClick={onCheckout}>🔒 Place Order</GoldBtn>
      )}

      <div className="flex justify-center gap-5 mt-4">
        {[{ icon:"🔒", label:"SSL Secured" }, { icon:"↩️", label:"Easy Returns" }, { icon:"🚚", label:"Fast Ship" }].map((b) => (
          <div key={b.label} className="flex items-center gap-1 text-[11px]" style={{ color:"#6b7290" }}>
            <span>{b.icon}</span> {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
