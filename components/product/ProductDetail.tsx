"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/store/slices/wishlistSlice";
import { showToast } from "@/components/ui/Toast";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { GoldBtn, GoldOutlineBtn } from "@/components/ui/Buttons";

const SIZES  = ["XS","S","M","L","XL","XXL"];
const COLORS = ["#1a1a2e","#c9a84c","#2d6a4f","#c1121f","#e0e0e0"];

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch  = useAppDispatch();
  const router    = useRouter();
  const isWished  = useAppSelector(selectIsWishlisted(product.id));
  const [qty, setQty]             = useState(1);
  const [size, setSize]           = useState("M");
  const [color, setColor]         = useState(COLORS[0]);
  const [thumb, setThumb]         = useState(0);
  const discount = Math.round(((product.old - product.price) / product.old) * 100);
  const thumbEmojis = [product.emoji,"🖼️","📦","🎁"];

  function handleAddToCart() {
    dispatch(addToCart({ product, qty, selectedSize:size, selectedColor:color }));
    showToast(`"${product.name}" × ${qty} added to cart!`);
  }
  function handleBuyNow() {
    dispatch(addToCart({ product, qty, selectedSize:size, selectedColor:color }));
    router.push("/checkout");
  }
  function handleWishlist() {
    dispatch(toggleWishlist(product.id));
    showToast(isWished ? "Removed from wishlist" : `"${product.name}" saved to wishlist ❤️`);
  }

  return (
    <>
      <style>{`
        .detail-thumb { transition:border-color 0.2s; }
        .detail-thumb:hover { border-color:#c9a84c !important; }
        .size-chip { transition:border-color 0.2s, color 0.2s, background 0.2s; }
        .wish-btn { transition:border-color 0.2s, color 0.2s; }
        .wish-btn:hover { border-color:#f87171 !important; color:#f87171 !important; }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color:"#6b7290" }}>
          <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
          <span style={{ color:"#252b3d" }}>/</span>
          <span className="hover:text-[#c9a84c] cursor-pointer transition-colors" onClick={() => router.push("/")}>{product.cat}</span>
          <span style={{ color:"#252b3d" }}>/</span>
          <span className="truncate max-w-[200px]" style={{ color:"#8e96b5" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative flex items-center justify-center rounded-2xl border border-[#1e2232] overflow-hidden"
              style={{ background:product.color+"20", aspectRatio:"1" }}>
              <div className="absolute inset-0 opacity-10" style={{ background:product.color }}/>
              {product.badge && <Badge type={product.badge}/>}
              <span className="text-[120px] select-none relative z-10">{thumbEmojis[thumb]}</span>
            </div>
            <div className="flex gap-3">
              {thumbEmojis.map((e,i) => (
                <button key={i} onClick={() => setThumb(i)}
                  className="detail-thumb w-[70px] h-[70px] rounded-xl border flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background:"#13161f", borderColor:thumb===i?"#c9a84c":"#1e2232" }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col pt-2">
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color:"#c9a84c" }}>{product.cat}</div>
            <div className="text-xs mb-3" style={{ color:"#6b7290" }}>by {product.brand}</div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color:"#eef0f6" }}>{product.name}</h1>
            <div className="mb-5"><StarRating rating={product.rating} reviews={product.reviews} size="md"/></div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-playfair text-4xl font-black" style={{ color:"#e8c97a" }}>₹{product.price.toLocaleString()}</span>
              <span className="text-lg line-through" style={{ color:"#6b7290" }}>₹{product.old.toLocaleString()}</span>
              <span className="text-sm font-bold px-2.5 py-1 rounded-md" style={{ background:"rgba(52,211,153,0.12)", color:"#34d399" }}>{discount}% OFF</span>
            </div>

            <div className="text-sm leading-7 mb-6 pb-6 border-b border-[#1e2232]" style={{ color:"#8e96b5" }}>{product.desc}</div>

            {/* Size */}
            <div className="mb-5">
              <p className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color:"#6b7290" }}>Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className="size-chip px-4 py-2 rounded-[8px] border text-sm font-medium"
                    style={ size===s
                      ? { borderColor:"#c9a84c", color:"#e8c97a", background:"rgba(201,168,76,0.12)" }
                      : { borderColor:"#252b3d", color:"#8e96b5", background:"#13161f" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color:"#6b7290" }}>Colour</p>
              <div className="flex gap-2.5">
                {COLORS.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className="w-8 h-8 rounded-full transition-all duration-200"
                    style={{ background:c, border:color===c?"2px solid #c9a84c":"2px solid transparent",
                      boxShadow:color===c?"0 0 0 3px rgba(201,168,76,0.25)":"none" }}/>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-7">
              <div className="flex items-center border border-[#252b3d] rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1,qty-1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-[#252b3d]" style={{ background:"#13161f", color:"#eef0f6" }}>−</button>
                <span className="w-11 text-center text-[15px] font-semibold" style={{ color:"#eef0f6" }}>{qty}</span>
                <button onClick={() => setQty(Math.min(10,qty+1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors hover:bg-[#252b3d]" style={{ background:"#13161f", color:"#eef0f6" }}>+</button>
              </div>
              <span className="text-xs font-medium flex items-center gap-1.5" style={{ color:"#34d399" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ background:"#34d399" }}/>
                In Stock · 42 units left
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-7">
              <GoldBtn onClick={handleAddToCart} className="flex-1">🛍️ Add to Cart</GoldBtn>
              <GoldOutlineBtn onClick={handleBuyNow} className="flex-1">⚡ Buy Now</GoldOutlineBtn>
              <button onClick={handleWishlist} className="wish-btn px-4 py-4 rounded-xl border transition-all"
                style={{ background:"transparent", borderColor:isWished?"#f87171":"#252b3d", color:isWished?"#f87171":"#8e96b5" }}>
                <svg width="16" height="16" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#1e2232]">
              {[{icon:"🚚",label:"Free Delivery"},{icon:"↩️",label:"30-Day Returns"},{icon:"🛡️",label:"1 Year Warranty"},{icon:"🔒",label:"Secure Checkout"}].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-xs" style={{ color:"#8e96b5" }}>
                  <span className="text-base">{f.icon}</span>{f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
