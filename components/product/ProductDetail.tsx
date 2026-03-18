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
import { getReviewsForProduct, Review } from "@/lib/mockData";

const SIZES  = ["XS","S","M","L","XL","XXL"];
const COLORS = ["#1a1a2e","#6366f1","#10b981","#ef4444","#f59e0b"];

function ReviewStars({ n, size=14 }: { n:number; size?:number }) {
  return (
    <span style={{ fontSize:size }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i<=n ? "#f59e0b" : "#e2e8f0" }}>★</span>
      ))}
    </span>
  );
}

function RatingBar({ label, count, total }: { label:string; count:number; total:number }) {
  const pct = total ? Math.round((count/total)*100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-12 text-right text-[#64748b]">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
        <div className="h-full rounded-full bg-[#f59e0b] transition-all" style={{ width:`${pct}%` }}/>
      </div>
      <span className="w-6 text-[#94a3b8]">{count}</span>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const isWished = useAppSelector(selectIsWishlisted(product.id));
  const [qty,   setQty]   = useState(1);
  const [size,  setSize]  = useState("M");
  const [color, setColor] = useState(COLORS[0]);
  const [thumb, setThumb] = useState(0);
  const [reviewTab, setReviewTab] = useState<"all"|"positive"|"critical">("all");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating:5, title:"", body:"" });

  const discount  = Math.round(((product.old-product.price)/product.old)*100);
  const thumbEmojis = [product.emoji,"🖼️","📦","🎁"];
  const reviews   = getReviewsForProduct(product.id);
  const avgRating = reviews.length ? reviews.reduce((s,r)=>s+r.rating,0)/reviews.length : product.rating;

  // Rating distribution
  const ratingDist = [5,4,3,2,1].map(n => ({ label:`${n} star`, count: reviews.filter(r=>r.rating===n).length }));

  const filteredReviews = reviews.filter(r => {
    if (reviewTab === "positive") return r.rating >= 4;
    if (reviewTab === "critical") return r.rating <= 3;
    return true;
  });

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

      {/* ── Product Info Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center justify-center rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden" style={{ aspectRatio:"1" }}>
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
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1]">{product.cat}</span>
            <span className="text-xs text-[#94a3b8]">by {product.brand}</span>
          </div>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <ReviewStars n={Math.round(avgRating)}/>
            <span className="text-sm font-semibold text-[#1e293b]">{avgRating.toFixed(1)}</span>
            <a href="#reviews" className="text-xs text-[#6366f1] hover:underline">({reviews.length || product.reviews.toLocaleString()} reviews)</a>
          </div>

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
              {SIZES.map(s=>(
                <button key={s} onClick={()=>setSize(s)}
                  className="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all"
                  style={size===s?{borderColor:"#6366f1",color:"#6366f1",background:"#eef2ff"}:{borderColor:"#e2e8f0",color:"#64748b",background:"#fff"}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="mb-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#94a3b8] mb-3">Colour</p>
            <div className="flex gap-3">
              {COLORS.map(c=>(
                <button key={c} onClick={()=>setColor(c)} className="w-8 h-8 rounded-full transition-all"
                  style={{ background:c, outline:color===c?"2px solid #6366f1":"2px solid transparent", outlineOffset:2 }}/>
              ))}
            </div>
          </div>

          {/* Qty + stock */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center rounded-xl border border-[#e2e8f0] overflow-hidden">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">−</button>
              <span className="w-10 text-center text-sm font-bold text-[#1e293b]">{qty}</span>
              <button onClick={()=>setQty(Math.min(10,qty+1))} className="w-10 h-10 flex items-center justify-center text-lg font-bold bg-[#f8fafc] text-[#64748b] hover:bg-[#eef2ff] hover:text-[#6366f1] transition-colors">+</button>
            </div>
            <span className="text-xs font-medium text-[#10b981] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block"/>In Stock · 42 units left
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm flex items-center justify-center gap-2"
              style={{ fontFamily:"inherit" }}>🛍️ Add to Cart</button>
            <button onClick={handleBuyNow}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-[#6366f1] border-2 border-[#6366f1] hover:bg-[#eef2ff] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily:"inherit" }}>⚡ Buy Now</button>
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
            {[{icon:"🚚",label:"Free Delivery"},{icon:"↩️",label:"30-Day Returns"},{icon:"🛡️",label:"1 Year Warranty"},{icon:"🔒",label:"Secure Checkout"}].map(f=>(
              <div key={f.label} className="flex items-center gap-2 text-xs text-[#64748b]"><span>{f.icon}</span>{f.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reviews Section ── */}
      <div id="reviews" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-poppins text-2xl font-bold text-[#0f172a]">Customer <span className="text-[#6366f1]">Reviews</span></h2>
          <span className="text-sm font-semibold text-[#64748b] bg-[#f1f5f9] px-3 py-1 rounded-full">{reviews.length} reviews</span>
        </div>

        {/* Rating summary + distribution */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Big score */}
            <div className="text-center md:text-left flex items-center gap-6">
              <div>
                <div className="font-poppins text-6xl font-black text-[#1e293b]">{avgRating.toFixed(1)}</div>
                <ReviewStars n={Math.round(avgRating)} size={20}/>
                <p className="text-sm text-[#94a3b8] mt-1">Based on {reviews.length || product.reviews.toLocaleString()} reviews</p>
              </div>
            </div>
            {/* Bars */}
            <div className="flex flex-col gap-2">
              {ratingDist.map(d=>(
                <RatingBar key={d.label} label={d.label} count={d.count} total={reviews.length}/>
              ))}
            </div>
          </div>
        </div>

        {/* Filter tabs + Write review button */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex gap-2">
            {(["all","positive","critical"] as const).map(tab => (
              <button key={tab} onClick={()=>setReviewTab(tab)}
                className="px-4 py-2 rounded-full border text-xs font-semibold capitalize transition-all"
                style={reviewTab===tab?{background:"#6366f1",borderColor:"#6366f1",color:"#fff"}:{background:"#fff",borderColor:"#e2e8f0",color:"#64748b"}}>
                {tab==="all" ? `All (${reviews.length})` : tab==="positive" ? `Positive (${reviews.filter(r=>r.rating>=4).length})` : `Critical (${reviews.filter(r=>r.rating<=3).length})`}
              </button>
            ))}
          </div>
          <button onClick={()=>setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-bold transition-all flex items-center gap-1.5">
            ✏️ Write a Review
          </button>
        </div>

        {/* Write review form */}
        {showReviewForm && (
          <div className="bg-white rounded-2xl border-2 border-[#6366f1] shadow-sm p-6 mb-6">
            <h3 className="font-poppins text-base font-bold text-[#0f172a] mb-4">Share your experience</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#64748b] mb-2">Your Rating</label>
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(n=>(
                  <button key={n} onClick={()=>setNewReview(r=>({...r,rating:n}))}
                    className="text-2xl transition-transform hover:scale-110">
                    <span style={{ color:n<=newReview.rating?"#f59e0b":"#e2e8f0" }}>★</span>
                  </button>
                ))}
                <span className="text-xs text-[#94a3b8] self-center ml-1">{["","Terrible","Poor","Average","Good","Excellent"][newReview.rating]}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#64748b] mb-1.5">Review Title</label>
              <input value={newReview.title} onChange={e=>setNewReview(r=>({...r,title:e.target.value}))}
                placeholder="Summarise your experience"
                className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm outline-none focus:border-[#6366f1] transition-colors text-[#1e293b]"
                style={{ fontFamily:"inherit" }}/>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#64748b] mb-1.5">Your Review</label>
              <textarea value={newReview.body} onChange={e=>setNewReview(r=>({...r,body:e.target.value}))}
                placeholder="Tell other customers what you think..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm outline-none focus:border-[#6366f1] transition-colors text-[#1e293b] resize-none"
                style={{ fontFamily:"inherit" }}/>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>{ showToast("Review submitted! Thank you 🙏"); setShowReviewForm(false); setNewReview({rating:5,title:"",body:""}); }}
                className="px-6 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all"
                style={{ fontFamily:"inherit" }}>Submit Review</button>
              <button onClick={()=>setShowReviewForm(false)}
                className="px-6 py-2.5 rounded-xl border border-[#e2e8f0] text-[#64748b] text-sm font-medium hover:border-[#6366f1] hover:text-[#6366f1] transition-all"
                style={{ fontFamily:"inherit" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Review cards */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-[#e2e8f0] bg-white">
            <p className="text-3xl mb-2">💬</p>
            <p className="text-sm text-[#94a3b8]">No {reviewTab !== "all" ? reviewTab : ""} reviews yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((review: Review)=>(
              <div key={review.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5 hover:border-[#6366f1] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1e293b]">{review.author}</p>
                      <p className="text-[10px] text-[#94a3b8]">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ReviewStars n={review.rating} size={13}/>
                    {review.verified && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#10b981]">✓ Verified</span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#1e293b] mb-1.5">{review.title}</p>
                <p className="text-xs text-[#64748b] leading-5 mb-3">{review.body}</p>
                <div className="flex items-center gap-2 text-[10px] text-[#94a3b8]">
                  <span>Helpful?</span>
                  <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] transition-all">👍 {review.helpful}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
