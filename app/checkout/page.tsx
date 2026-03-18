"use client";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const router = useRouter();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items, router]);

  if (items.length === 0) return null;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 pb-16">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="flex items-center gap-1.5 text-sm font-medium mb-4 transition-colors hover:text-[#c9a84c]"
          style={{ color: "#8e96b5" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Cart
        </Link>
        <h1 className="font-playfair text-3xl font-bold" style={{ color: "#eef0f6" }}>Checkout</h1>
        <p className="text-sm mt-1" style={{ color: "#8e96b5" }}>Complete your purchase securely</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-3 mb-10">
        {[
          { n: 1, label: "Cart", done: true },
          { n: 2, label: "Details", done: false, active: true },
          { n: 3, label: "Confirm", done: false },
        ].map((step, i) => (
          <div key={step.n} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={
                  step.done
                    ? { background: "#34d399", color: "#080a0e" }
                    : step.active
                    ? { background: "#c9a84c", color: "#080a0e" }
                    : { background: "#1e2232", color: "#6b7290" }
                }
              >
                {step.done ? "✓" : step.n}
              </div>
              <span
                className="text-xs font-semibold hidden sm:block"
                style={{ color: step.active ? "#e8c97a" : step.done ? "#34d399" : "#6b7290" }}
              >
                {step.label}
              </span>
            </div>
            {i < 2 && (
              <div className="w-10 h-px" style={{ background: "#1e2232" }} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start">
        {/* Form */}
        <CheckoutForm />

        {/* Mini Order Summary */}
        <div className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-6 sticky top-20">
          <h3 className="font-playfair text-lg font-bold mb-5" style={{ color: "#eef0f6" }}>
            Order Summary
          </h3>
          <div className="flex flex-col gap-3 mb-5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-[#1e2232]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-[#1e2232]"
                  style={{ background: "#0f1117" }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: "#eef0f6" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "#6b7290" }}>Qty: {item.qty}</p>
                </div>
                <span className="font-playfair text-sm font-bold flex-shrink-0" style={{ color: "#e8c97a" }}>
                  ₹{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[15px] font-bold" style={{ color: "#eef0f6" }}>Total</span>
            <span className="font-playfair text-xl font-bold" style={{ color: "#e8c97a" }}>
              ₹{total.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-center gap-5 mt-5 pt-4 border-t border-[#1e2232]">
            {[{ icon: "🔒", label: "SSL Secured" }, { icon: "↩️", label: "Easy Returns" }].map((b) => (
              <div key={b.label} className="flex items-center gap-1 text-[11px]" style={{ color: "#6b7290" }}>
                <span>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
