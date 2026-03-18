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

const SIZES  = ["XS","S","M","L","XL","XXL"];
const COLORS = ["#1a1a2e","#6366f1","#10b981","#ef4444","#f59e0b"];

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const isWished = useAppSelector(selectIsWishlisted(product.id));
  const [qty,   setQty]   = useState(1);
  const [size,  setSize]  = useState("M");
  const [color, setColor] = useState(COLORS[0]);
  const [thumb, setThumb] = useState(0);
  const discount = Math.round(((product.old-product.price)/product.old)*100);
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
    showToast(isWished?"Removed from wishlist":`"${product.name}" saved ❤️`);
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#94a3b8] mb-8">
        <Link href="/" className="hover:text-[#6366f1] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-[#6366f1] transition-colors">{product.cat}</Link>
        <span>/</span>
        <span className="text-[#64748b] truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center justify-center rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden"
            style={{ aspectRatio:"1" }}>
            <div className="absolute inset-0 opacity-[0.06]" style={{ background:product.color }}/>
            {product.badge && <Badge type={product.badge}/>}
            <span className="text-[120px] select-none relative z-10">{thumbEmojis[thumb]}</span>
          </div>
          <div className="flex gap-3">
            {thumbEmojis.map((e,i)=>(
              <button key={i} onClick={()=>setThumb(i)}
                className="w-[68px] h-[68px] rounded-xl border-2 flex items-center justify-center text-2xl flex-shrink-0 transition-all bg-white hover:border-[#6366f1]"
                style={{ borderColor:thumb===i?"#6366f1":"#e2e8f0" }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col pt-1">
          {/* Category + brand */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1]">{product.cat}</span>
            <span className="text-xs text-[#94a3b8]">by {product.brand}</span>
          </div>

          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-3">{product.name}</h1>
          <div className="mb-4"><StarRating rating={product.rating} reviews={product.reviews} size="md"/></div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-[#f1f5f9]">
            <span className="font-poppins text-4xl font-black text-[#1e293b]">₹{product.price.toLocaleString()}</span>
            <span className="text-lg line-through text-[#94a3b8]">₹{product.old.toLocaleString()}</span>
            <span className="text-sm font-bold px-2.5 py-1 rounded-lg bg-[#f0fdf4] text-[#10b981]">{discount}% OFF</span>
          </div>

          <p className="text-sm leading-7 text-[#64748b] mb-5 pb-5 border-b border-[#f1f5f9]">{product.desc}</p>

          {/* Size */}
          <div className="mb-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#94a3b8] mb-3">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s)=>(
                <button key={s} onClick={()=>setSize(s)}
                  className="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all"
                  style={ size===s
                    ? { borderColor:"#6366f1", color:"#6366f1", background:"#eef2ff" }
                    : { borderColor:"#e2e8f0", color:"#64748b", background:"#fff" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="mb-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#94a3b8] mb-3">Colour</p>
            <div className="flex gap-3">
              {COLORS.map((c)=>(
                <button key={c} onClick={()=>setColor(c)}
                  className="w-8 h-8 rounded-full transition-all"
                  style={{ background:c, outline:color===c?"2px solid #6366f1":"2px solid transparent", outlineOffset:2 }}/>
              ))}
            </div>
          </div>

          {/* Qty + stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center rounded-xl border border-[#e2e8f0] overflow-hidden">
              <button onClick={()=>setQty(Math.max(1,qty-1))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">−</button>
              <span className="w-10 text-center text-sm font-bold text-[#1e293b]">{qty}</span>
              <button onClick={()=>setQty(Math.min(10,qty+1))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">+</button>
            </div>
            <span className="text-xs font-medium text-[#10b981] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block"/>
              In Stock · 42 units left
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              style={{ fontFamily:"inherit" }}>
              🛍️ Add to Cart
            </button>
            <button onClick={handleBuyNow}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-[#6366f1] border-2 border-[#6366f1] hover:bg-[#eef2ff] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily:"inherit" }}>
              ⚡ Buy Now
            </button>
            <button onClick={handleWishlist}
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all"
              style={{ borderColor:isWished?"#ef4444":"#e2e8f0", color:isWished?"#ef4444":"#94a3b8", background:isWished?"#fef2f2":"white" }}>
              <svg width="16" height="16" fill={isWished?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#f1f5f9]">
            {[{icon:"🚚",label:"Free Delivery"},{icon:"↩️",label:"30-Day Returns"},{icon:"🛡️",label:"1 Year Warranty"},{icon:"🔒",label:"Secure Checkout"}].map((f)=>(
              <div key={f.label} className="flex items-center gap-2 text-xs text-[#64748b]">
                <span>{f.icon}</span>{f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
