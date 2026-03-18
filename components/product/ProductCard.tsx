"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/store/slices/wishlistSlice";
import { Product } from "@/lib/products";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { showToast } from "@/components/ui/Toast";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isWished = useAppSelector(selectIsWishlisted(product.id));
  const discount = Math.round(((product.old - product.price) / product.old) * 100);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(addToCart({ product, qty: 1 }));
    showToast(`"${product.name}" added to cart!`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(toggleWishlist(product.id));
    showToast(isWished ? "Removed from wishlist" : `"${product.name}" saved to wishlist ❤️`);
  }

  return (
    <>
      <style>{`
        .product-card { transition:transform 0.28s, box-shadow 0.28s, border-color 0.28s; }
        .product-card:hover { transform:translateY(-5px); border-color:#c9a84c !important; box-shadow:0 20px 50px rgba(0,0,0,0.5),0 0 30px rgba(201,168,76,0.12); }
        .quick-add-btn { background:#c9a84c; transition:background 0.2s, transform 0.2s; }
        .quick-add-btn:hover { background:#e8c97a; transform:scale(1.1); }
        .img-glow { opacity:0.1; transition:opacity 0.3s; }
        .product-card:hover .img-glow { opacity:0.2; }
      `}</style>
      <Link href={`/products/${product.id}`} className="group block">
        <div className="product-card relative rounded-2xl border border-[#1e2232] bg-[#13161f] overflow-hidden cursor-pointer">
          <div className="relative flex items-center justify-center" style={{ background:product.color+"20", aspectRatio:"1" }}>
            <div className="img-glow absolute inset-0" style={{ background:product.color }}/>
            {product.badge && <Badge type={product.badge}/>}
            <button onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all z-10"
              style={{ background:"rgba(15,17,23,0.85)", borderColor:isWished?"#f87171":"#252b3d", color:isWished?"#f87171":"#8e96b5" }}>
              <svg width="13" height="13" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <span className="text-6xl relative z-[1] select-none">{product.emoji}</span>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color:"#c9a84c" }}>{product.cat}</div>
            <div className="text-sm font-semibold leading-snug mb-1 line-clamp-2" style={{ color:"#eef0f6" }}>{product.name}</div>
            <div className="text-[10px] mb-2" style={{ color:"#6b7290" }}>{product.brand}</div>
            <StarRating rating={product.rating} reviews={product.reviews}/>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-playfair text-[19px] font-bold" style={{ color:"#e8c97a" }}>₹{product.price.toLocaleString()}</span>
                <span className="text-xs line-through" style={{ color:"#6b7290" }}>₹{product.old.toLocaleString()}</span>
              </div>
              <button onClick={handleQuickAdd} className="quick-add-btn w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[#080a0e] font-bold text-lg" title="Add to cart">+</button>
            </div>
            <div className="text-[11px] font-semibold mt-1" style={{ color:"#34d399" }}>{discount}% off</div>
          </div>
        </div>
      </Link>
    </>
  );
}
