"use client";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.cat === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc")  return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "discount")   return (b.old-b.price)/b.old - (a.old-a.price)/a.old;
    if (sort === "rating")     return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <>
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} totalCount={sorted.length}/>

      <section className="px-6 md:px-10 py-10 pb-16 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-playfair text-3xl font-bold leading-tight">
              {activeCategory === "All" ? <>All <em className="italic" style={{ color:"#e8c97a" }}>Products</em></> : <><em className="italic" style={{ color:"#e8c97a" }}>{activeCategory}</em></>}
            </h2>
            <p className="text-sm mt-1" style={{ color:"#6b7290" }}>{sorted.length} item{sorted.length!==1?"s":""} found</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-[9px] border border-[#252b3d] bg-[#13161f]">
              <svg width="12" height="12" fill="none" stroke="#6b7290" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search products…"
                className="bg-transparent outline-none text-xs w-36"
                style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {search && <button onClick={()=>setSearch("")} className="text-xs" style={{ color:"#6b7290" }}>✕</button>}
            </div>

            <select value={sort} onChange={(e)=>setSort(e.target.value)}
              className="px-3.5 py-2 rounded-[9px] border border-[#252b3d] bg-[#13161f] text-xs font-medium outline-none cursor-pointer"
              style={{ color:"#8e96b5", fontFamily:"inherit" }}>
              <option value="popular">Sort: Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-playfair text-xl font-semibold mb-2" style={{ color:"#eef0f6" }}>No products found</p>
            <p className="text-sm" style={{ color:"#6b7290" }}>Try a different search or category</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold border border-[#252b3d] hover:border-[#c9a84c] transition-colors"
              style={{ color:"#8e96b5" }}>Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {sorted.map((product) => <ProductCard key={product.id} product={product}/>)}
          </div>
        )}
      </section>
    </>
  );
}
