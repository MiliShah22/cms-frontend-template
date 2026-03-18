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
    dispatch(addToCart({ product, qty:1 }));
    showToast(`"${product.name}" added to cart!`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(toggleWishlist(product.id));
    showToast(isWished ? "Removed from wishlist" : `"${product.name}" saved ❤️`);
  }

  return (
    <>
      <style>{`
        .pcard{transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
        .pcard:hover{transform:translateY(-3px);border-color:#6366f1!important;box-shadow:0 8px 24px rgba(99,102,241,0.12);}
        .pcard:hover .pcard-img-bg{opacity:0.15;}
        .pcard-img-bg{opacity:0.08;transition:opacity 0.3s;}
        .pcard-add{transition:background 0.18s,transform 0.18s;}
        .pcard-add:hover{background:#4f46e5!important;transform:scale(1.08);}
        .pcard-wish{transition:border-color 0.18s,color 0.18s,background 0.18s;}
        .pcard-wish:hover{border-color:#ef4444!important;color:#ef4444!important;background:#fef2f2!important;}
      `}</style>
      <Link href={`/products/${product.id}`} className="group block">
        <div className="pcard rounded-xl border border-[#e2e8f0] bg-white overflow-hidden cursor-pointer">
          {/* Image */}
          <div className="relative flex items-center justify-center" style={{ background:product.color+"12", aspectRatio:"1" }}>
            <div className="pcard-img-bg absolute inset-0" style={{ background:product.color }}/>
            {product.badge && <Badge type={product.badge}/>}
            <button onClick={handleWishlist}
              className="pcard-wish absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center border border-[#e2e8f0] bg-white z-10"
              style={{ color:isWished?"#ef4444":"#94a3b8", borderColor:isWished?"#ef4444":"#e2e8f0" }}>
              <svg width="13" height="13" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <span className="text-6xl select-none relative z-[1]">{product.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#6366f1]">{product.cat}</span>
              <span className="text-[10px] text-[#94a3b8]">{product.brand}</span>
            </div>
            <p className="text-sm font-semibold text-[#1e293b] leading-snug mb-1.5 line-clamp-2">{product.name}</p>
            <StarRating rating={product.rating} reviews={product.reviews}/>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="font-poppins text-lg font-bold text-[#1e293b]">₹{product.price.toLocaleString()}</span>
                <span className="text-xs line-through text-[#94a3b8] ml-1.5">₹{product.old.toLocaleString()}</span>
                <span className="ml-1.5 text-[10px] font-semibold text-[#10b981]">{discount}% off</span>
              </div>
              <button onClick={handleQuickAdd}
                className="pcard-add w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-base bg-[#6366f1]"
                title="Add to cart">+</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
