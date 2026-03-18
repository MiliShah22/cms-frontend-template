"use client";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { updateQty, removeFromCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { CartItem as CartItemType } from "@/store/slices/cartSlice";
import { showToast } from "@/components/ui/Toast";

export default function CartItemRow({ item }: { item:CartItemType }) {
  const dispatch = useAppDispatch();

  function handleSaveForLater() {
    dispatch(toggleWishlist(item.id));
    dispatch(removeFromCart(item.id));
    showToast(`"${item.name}" saved to wishlist`);
  }

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#6366f1] transition-all group shadow-sm">
      <Link href={`/products/${item.id}`}>
        <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-[#e2e8f0] bg-[#f8fafc] group-hover:border-[#6366f1] transition-colors">
          {item.emoji}
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#6366f1]">{item.cat}</span>
          <span className="text-[10px] text-[#94a3b8]">{item.brand}</span>
        </div>
        <Link href={`/products/${item.id}`}>
          <p className="text-sm font-semibold text-[#1e293b] truncate hover:text-[#6366f1] transition-colors">{item.name}</p>
        </Link>
        <p className="text-xs text-[#94a3b8] mt-0.5 mb-3">Size: {item.selectedSize} · ₹{item.price.toLocaleString()} / unit</p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Qty */}
          <div className="flex items-center rounded-lg border border-[#e2e8f0] overflow-hidden">
            <button onClick={()=>dispatch(updateQty({ id:item.id, qty:item.qty-1 }))}
              className="w-8 h-8 flex items-center justify-center text-base font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">−</button>
            <span className="w-8 text-center text-sm font-semibold text-[#1e293b]">{item.qty}</span>
            <button onClick={()=>dispatch(updateQty({ id:item.id, qty:item.qty+1 }))}
              className="w-8 h-8 flex items-center justify-center text-base font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">+</button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-poppins text-base font-bold text-[#1e293b]">₹{(item.price*item.qty).toLocaleString()}</span>
            {item.qty>1 && <span className="text-xs text-[#94a3b8]">(×{item.qty})</span>}
          </div>

          {/* Save for later */}
          <button onClick={handleSaveForLater}
            className="text-xs font-medium text-[#94a3b8] hover:text-[#6366f1] transition-colors hidden sm:block">
            ♡ Save for later
          </button>

          {/* Delete */}
          <button onClick={()=>{ dispatch(removeFromCart(item.id)); showToast(`"${item.name}" removed`); }}
            className="ml-auto w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8] hover:border-[#ef4444] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-all">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
