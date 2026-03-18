"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectWishlistIds, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { PRODUCTS } from "@/lib/products";
import { showToast } from "@/components/ui/Toast";
import { GoldBtn, GhostBtn } from "@/components/ui/Buttons";

export default function WishlistPage() {
  const dispatch    = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const products    = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  function moveToCart(id: number) {
    const p = PRODUCTS.find((x) => x.id === id)!;
    dispatch(addToCart({ product:p, qty:1 }));
    dispatch(removeFromWishlist(id));
    showToast(`"${p.name}" moved to cart!`);
  }

  function removeItem(id: number) {
    const p = PRODUCTS.find((x) => x.id === id)!;
    dispatch(removeFromWishlist(id));
    showToast(`"${p.name}" removed from wishlist`);
  }

  function moveAll() {
    products.forEach((p) => {
      dispatch(addToCart({ product:p, qty:1 }));
      dispatch(removeFromWishlist(p.id));
    });
    showToast("All items moved to cart!");
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 pb-16">
      <div className="mb-10">
        <h1 className="font-playfair text-4xl font-bold mb-2">
          My <em className="italic" style={{ color:"#e8c97a" }}>Wishlist</em>
        </h1>
        <p className="text-sm" style={{ color:"#6b7290" }}>
          {products.length} saved item{products.length !== 1 ? "s" : ""}
        </p>
        <div className="mt-4 h-px w-24" style={{ background:"linear-gradient(90deg,#c9a84c,transparent)" }}/>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-[#1e2232] bg-[#13161f]">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="font-playfair text-2xl font-bold mb-2" style={{ color:"#eef0f6" }}>Nothing saved yet</h2>
          <p className="text-sm mb-6" style={{ color:"#8e96b5" }}>Tap the heart icon on any product to save it here.</p>
          <Link href="/"><GoldBtn>Explore Products</GoldBtn></Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-5">
            <button onClick={moveAll}
              className="px-5 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-[rgba(201,168,76,0.1)]"
              style={{ color:"#c9a84c", background:"transparent", borderColor:"#c9a84c" }}>
              🛍️ Move All to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => {
              const discount = Math.round(((p.old - p.price) / p.old) * 100);
              return (
                <div key={p.id} className="rounded-2xl border border-[#1e2232] bg-[#13161f] overflow-hidden transition-all hover:border-[#252b3d]">
                  <Link href={`/products/${p.id}`}>
                    <div className="flex items-center justify-center relative" style={{ background:p.color+"20", aspectRatio:"4/3" }}>
                      <div className="absolute inset-0 opacity-10" style={{ background:p.color }}/>
                      <span className="text-7xl select-none relative z-10">{p.emoji}</span>
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color:"#c9a84c" }}>
                      {p.cat} · {p.brand}
                    </div>
                    <Link href={`/products/${p.id}`}>
                      <p className="text-sm font-semibold mb-1 hover:text-[#c9a84c] transition-colors cursor-pointer" style={{ color:"#eef0f6" }}>
                        {p.name}
                      </p>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-playfair text-lg font-bold" style={{ color:"#e8c97a" }}>₹{p.price.toLocaleString()}</span>
                      <span className="text-xs line-through" style={{ color:"#6b7290" }}>₹{p.old.toLocaleString()}</span>
                      <span className="text-xs font-semibold" style={{ color:"#34d399" }}>{discount}% off</span>
                    </div>
                    <div className="flex gap-2">
                      <GoldBtn onClick={() => moveToCart(p.id)} className="flex-1 text-sm py-2.5 px-3">
                        Move to Cart
                      </GoldBtn>
                      <GhostBtn onClick={() => removeItem(p.id)} danger className="px-3 py-2.5">🗑</GhostBtn>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
