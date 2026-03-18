"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, clearCart } from "@/store/slices/cartSlice";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummary from "@/components/cart/OrderSummary";
import { GoldBtn, GhostBtn } from "@/components/ui/Buttons";
import { showToast } from "@/components/ui/Toast";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items    = useAppSelector(selectCartItems);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold" style={{ color:"#eef0f6" }}>Your Cart</h1>
          {totalQty > 0 && (
            <p className="text-sm mt-1" style={{ color:"#8e96b5" }}>
              {totalQty} item{totalQty > 1 ? "s" : ""} in your bag
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {items.length > 0 && (
            <GhostBtn danger onClick={() => { dispatch(clearCart()); showToast("Cart cleared"); }}>
              🗑 Clear Cart
            </GhostBtn>
          )}
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#c9a84c]"
            style={{ color:"#8e96b5" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-[#1e2232] bg-[#13161f]">
          <div className="text-6xl mb-5">🛍️</div>
          <h2 className="font-playfair text-2xl font-bold mb-2" style={{ color:"#eef0f6" }}>Your cart is empty</h2>
          <p className="text-sm mb-7" style={{ color:"#8e96b5" }}>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/"><GoldBtn>Start Shopping</GoldBtn></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start">
          <div className="flex flex-col gap-4">
            {items.map((item) => <CartItemRow key={item.id} item={item}/>)}
          </div>
          <OrderSummary mode="cart"/>
        </div>
      )}
    </div>
  );
}
