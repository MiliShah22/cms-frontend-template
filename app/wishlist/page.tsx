"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectWishlistIds, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { PRODUCTS } from "@/lib/products";
import { showToast } from "@/components/ui/Toast";

export default function WishlistPage() {
  const dispatch    = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const products    = PRODUCTS.filter((p)=>wishlistIds.includes(p.id));

  function moveToCart(id: number) {
    const p = PRODUCTS.find((x)=>x.id===id)!;
    dispatch(addToCart({ product:p, qty:1 }));
    dispatch(removeFromWishlist(id));
    showToast(`"${p.name}" moved to cart!`);
  }

  function removeItem(id: number) {
    const p = PRODUCTS.find((x)=>x.id===id)!;
    dispatch(removeFromWishlist(id));
    showToast(`"${p.name}" removed from wishlist`);
  }

  function moveAll() {
    products.forEach((p)=>{ dispatch(addToCart({ product:p, qty:1 })); dispatch(removeFromWishlist(p.id)); });
    showToast("All items moved to cart!");
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-[#0f172a]">
            My <span className="text-[#6366f1]">Wishlist</span>
          </h1>
          <p className="text-sm text-[#64748b] mt-1">{products.length} saved item{products.length!==1?"s":""}</p>
          <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
        </div>
        {products.length>0 && (
          <button onClick={moveAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all shadow-sm">
            🛍️ Move All to Cart
          </button>
        )}
      </div>

      {products.length===0 ? (
        <div className="text-center py-20 rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="font-poppins text-xl font-bold text-[#1e293b] mb-2">Nothing saved yet</h2>
          <p className="text-sm text-[#94a3b8] mb-6">Tap the heart icon on any product to save it here.</p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p)=>{
            const discount = Math.round(((p.old-p.price)/p.old)*100);
            return (
              <div key={p.id} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-md hover:border-[#6366f1] transition-all group">
                <Link href={`/products/${p.id}`}>
                  <div className="flex items-center justify-center relative" style={{ background:p.color+"10", aspectRatio:"4/3" }}>
                    <div className="absolute inset-0 opacity-[0.07]" style={{ background:p.color }}/>
                    <span className="text-7xl select-none relative z-10">{p.emoji}</span>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#6366f1]">{p.cat}</span>
                    <span className="text-[10px] text-[#94a3b8]">{p.brand}</span>
                  </div>
                  <Link href={`/products/${p.id}`}>
                    <p className="text-sm font-semibold text-[#1e293b] mb-1 hover:text-[#6366f1] transition-colors">{p.name}</p>
                  </Link>
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="font-poppins text-base font-bold text-[#1e293b]">₹{p.price.toLocaleString()}</span>
                    <span className="text-xs line-through text-[#94a3b8]">₹{p.old.toLocaleString()}</span>
                    <span className="text-[10px] font-semibold text-[#10b981]">{discount}% off</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>moveToCart(p.id)}
                      className="flex-1 py-2 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold transition-all">
                      Move to Cart
                    </button>
                    <button onClick={()=>removeItem(p.id)}
                      className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8] hover:border-[#ef4444] hover:text-[#ef4444] hover:bg-[#fef2f2] transition-all text-xs">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
