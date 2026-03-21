"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useCallback, useState } from "react";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const cat = searchParams.get('category') ?? 'All';
  const sort = searchParams.get('sort') ?? 'popular';
  const search = searchParams.get('search') ?? '';

  async function loadProducts(reset = false) {
    if (loading) return;
    setLoading(true);
    const p = reset ? 1 : page;
    const res = getProducts({
      page: p,
      limit: 12,
      search,
      category: cat,
      sort
    });
    setProducts(reset ? res.data : [...products, ...res.data]);
    setHasMore(res.total > p * 12);
    if (!reset) setPage(p + 1);
    setLoading(false);
  }

  const lastProductRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadProducts(false);
      }
    });
    if (node) observer.current?.observe(node);
  }, [hasMore, loading]);

  function updateParams(updates: Record<string, string | null>) {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }

  useEffect(() => {
    loadProducts(true);
  }, [search, cat, sort]);

  return (
    <>
      <CategoryFilter active={cat} onChange={(newCat) => updateParams({ category: newCat })} totalCount={products.length} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-16">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-[#0f172a]">
              {cat === "All" ? <>All <span className="text-[#6366f1]">Products</span></> : <span className="text-[#6366f1]">{cat}</span>}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-0.5">{products.length} items found</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search (hidden on lg+ since Navbar has it) */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white hidden lg:flex">
              <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={search}
                placeholder="Search products…"
                className="bg-transparent outline-none text-xs w-36 text-[#1e293b] placeholder:text-[#94a3b8]"
                style={{ fontFamily: "inherit" }}
                onChange={(e) => updateParams({ search: e.target.value })}
              />
              {search && (
                <button onClick={() => updateParams({ search: null })} className="text-xs text-[#94a3b8] hover:text-[#ef4444]">
                  ✕
                </button>
              )}
            </div>
            {/* Sort */}
            <select value={sort} onChange={(e) => updateParams({ sort: e.target.value })}
              className="px-3 py-2 rounded-lg border border-[#e2e8f0] bg-white text-xs font-medium text-[#64748b] outline-none cursor-pointer"
              style={{ fontFamily: "inherit" }}>
              <option value="popular">Sort: Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-[#e2e8f0] bg-white">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-poppins text-xl font-semibold mb-2 text-[#1e293b]">No products found</p>
            <p className="text-sm text-[#94a3b8]">Try a different search or category</p>
            <button onClick={() => updateParams({ search: null, category: null, sort: null })}
              className="mt-5 px-5 py-2 rounded-lg text-sm font-semibold border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] transition-colors text-[#64748b]">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p, index) => (
              <div key={p.id} ref={index === products.length - 1 ? lastProductRef : null}>
                <ProductCard product={p} />
              </div>
            ))}
            {hasMore && loading && (
              <div className="col-span-full flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#e2e8f0] border-t-[#6366f1] rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

