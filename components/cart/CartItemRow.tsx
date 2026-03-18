"use client";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { updateQty, removeFromCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { CartItem as CartItemType } from "@/store/slices/cartSlice";
import { showToast } from "@/components/ui/Toast";

export default function CartItemRow({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();

  function handleSaveForLater() {
    dispatch(toggleWishlist(item.id));
    dispatch(removeFromCart(item.id));
    showToast(`"${item.name}" saved to wishlist`);
  }

  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-[#1e2232] bg-[#13161f] transition-all hover:border-[#252b3d]">
      {/* Image */}
      <Link href={`/products/${item.id}`}>
        <div className="w-[90px] h-[90px] rounded-xl flex items-center justify-center text-4xl flex-shrink-0 border border-[#1e2232] transition-colors hover:border-[#c9a84c]"
          style={{ background:"#0f1117" }}>
          {item.emoji}
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color:"#c9a84c" }}>
          {item.cat} · {item.brand}
        </div>
        <Link href={`/products/${item.id}`}>
          <div className="text-[15px] font-semibold mb-0.5 truncate hover:text-[#c9a84c] transition-colors cursor-pointer"
            style={{ color:"#eef0f6" }}>
            {item.name}
          </div>
        </Link>
        <div className="text-xs mb-3" style={{ color:"#8e96b5" }}>
          Size: {item.selectedSize} · Colour: Dark · Unit: ₹{item.price.toLocaleString()}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Qty control */}
          <div className="flex items-center border border-[#252b3d] rounded-[8px] overflow-hidden">
            <button onClick={() => dispatch(updateQty({ id:item.id, qty:item.qty-1 }))}
              className="w-[30px] h-[30px] flex items-center justify-center text-base font-bold hover:bg-[#252b3d] transition-colors"
              style={{ background:"#0f1117", color:"#eef0f6" }}>−</button>
            <span className="w-9 text-center text-sm font-semibold" style={{ color:"#eef0f6" }}>{item.qty}</span>
            <button onClick={() => dispatch(updateQty({ id:item.id, qty:item.qty+1 }))}
              className="w-[30px] h-[30px] flex items-center justify-center text-base font-bold hover:bg-[#252b3d] transition-colors"
              style={{ background:"#0f1117", color:"#eef0f6" }}>+</button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-playfair text-lg font-bold" style={{ color:"#e8c97a" }}>
              ₹{(item.price * item.qty).toLocaleString()}
            </span>
            {item.qty > 1 && (
              <span className="text-xs" style={{ color:"#6b7290" }}>
                (₹{item.price.toLocaleString()} × {item.qty})
              </span>
            )}
          </div>

          {/* Save for later */}
          <button onClick={handleSaveForLater}
            className="text-xs font-medium transition-colors hover:text-[#c9a84c] ml-1 hidden sm:block"
            style={{ color:"#6b7290" }}>
            ♡ Save for later
          </button>

          {/* Delete */}
          <button onClick={() => { dispatch(removeFromCart(item.id)); showToast(`"${item.name}" removed`); }}
            className="ml-auto w-[30px] h-[30px] rounded-[8px] border border-[#252b3d] flex items-center justify-center text-xs transition-all hover:border-[#f87171] hover:text-[#f87171]"
            style={{ background:"transparent", color:"#6b7290" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
