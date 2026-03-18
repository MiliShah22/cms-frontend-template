"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, clearCart } from "@/store/slices/cartSlice";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummary from "@/components/cart/OrderSummary";
import { showToast } from "@/components/ui/Toast";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items    = useAppSelector(selectCartItems);
  const totalQty = items.reduce((s,i)=>s+i.qty, 0);

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-[#0f172a]">Shopping Cart</h1>
          {totalQty>0 && <p className="text-sm text-[#64748b] mt-1">{totalQty} item{totalQty>1?"s":""} in your bag</p>}
          <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
        </div>
        <div className="flex items-center gap-3">
          {items.length>0 && (
            <button onClick={()=>{ dispatch(clearCart()); showToast("Cart cleared"); }}
              className="px-3 py-2 rounded-lg border border-[#e2e8f0] text-xs font-medium text-[#64748b] hover:border-[#ef4444] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-all">
              🗑 Clear Cart
            </button>
          )}
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      {items.length===0 ? (
        <div className="text-center py-20 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="text-6xl mb-5">🛍️</div>
          <h2 className="font-poppins text-xl font-bold text-[#1e293b] mb-2">Your cart is empty</h2>
          <p className="text-sm text-[#94a3b8] mb-7">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div className="flex flex-col gap-4">
            {items.map((item)=><CartItemRow key={item.id} item={item}/>)}
          </div>
          <OrderSummary mode="cart"/>
        </div>
      )}
    </div>
  );
}
