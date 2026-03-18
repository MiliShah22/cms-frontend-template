"use client";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";

export default function ProductGrid() {
  const [cat,    setCat]    = useState("All");
  const [sort,   setSort]   = useState("popular");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat    = cat==="All" || p.cat===cat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a,b) => {
    if (sort==="price-asc")  return a.price-b.price;
    if (sort==="price-desc") return b.price-a.price;
    if (sort==="discount")   return (b.old-b.price)/b.old-(a.old-a.price)/a.old;
    if (sort==="rating")     return b.rating-a.rating;
    return b.reviews-a.reviews;
  });

  return (
    <>
      <CategoryFilter active={cat} onChange={setCat} totalCount={sorted.length}/>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-16">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-[#0f172a]">
              {cat==="All" ? <>All <span className="text-[#6366f1]">Products</span></> : <span className="text-[#6366f1]">{cat}</span>}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-0.5">{sorted.length} items found</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white">
              <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search products…"
                className="bg-transparent outline-none text-xs w-36 text-[#1e293b] placeholder:text-[#94a3b8]"
                style={{ fontFamily:"inherit" }}/>
              {search && <button onClick={()=>setSearch("")} className="text-xs text-[#94a3b8] hover:text-[#ef4444]">✕</button>}
            </div>
            {/* Sort */}
            <select value={sort} onChange={(e)=>setSort(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-xs font-medium text-[#64748b] outline-none cursor-pointer"
              style={{ fontFamily:"inherit" }}>
              <option value="popular">Sort: Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {sorted.length===0 ? (
          <div className="text-center py-20 rounded-2xl border border-[#e2e8f0] bg-white">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-poppins text-xl font-semibold mb-2 text-[#1e293b]">No products found</p>
            <p className="text-sm text-[#94a3b8]">Try a different search or category</p>
            <button onClick={()=>{ setSearch(""); setCat("All"); }}
              className="mt-5 px-5 py-2 rounded-lg text-sm font-semibold border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] transition-colors text-[#64748b]">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {sorted.map((p)=><ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </div>
    </>
  );
}
