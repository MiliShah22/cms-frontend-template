"use client";
import { useState } from "react";
import { BRANDS, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";

// Compute real counts from PRODUCTS array (source of truth)
const BRAND_COUNTS = PRODUCTS.reduce<Record<string,number>>((acc, p) => {
  acc[p.brand] = (acc[p.brand] || 0) + 1;
  return acc;
}, {});

export default function BrandsPage() {
  const [selected, setSelected] = useState<string|null>(null);

  const brandProducts = selected ? PRODUCTS.filter((p)=>p.brand===selected) : [];
  const realCount = (name: string) => BRAND_COUNTS[name] ?? 0;

  return (
    <PageShell title="Our" accent="Brands" subtitle="Shop by your favourite brands from around the world">

      {/* Brand grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {BRANDS.map((b)=>{
          const count  = realCount(b.name);
          const active = selected===b.name;
          return (
            <button key={b.name} onClick={()=>setSelected(active?null:b.name)}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md text-center"
              style={{ background:active?"#eef2ff":"#fff", borderColor:active?"#6366f1":"#e2e8f0" }}>
              <span className="text-4xl">{b.emoji}</span>
              <div>
                <p className="text-[13px] font-semibold text-[#1e293b]">{b.name}</p>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">{b.tagline}</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${active?"bg-[#6366f1] text-white":"bg-[#eef2ff] text-[#6366f1]"}`}>
                  {count} product{count!==1?"s":""}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected brand products */}
      {selected ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
          {/* Brand header */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-3xl bg-[#f8fafc]">
                {BRANDS.find(b=>b.name===selected)?.emoji}
              </div>
              <div>
                <h2 className="font-poppins text-xl font-bold text-[#0f172a]">{selected}</h2>
                <p className="text-sm text-[#64748b]">
                  {BRANDS.find(b=>b.name===selected)?.tagline} ·{" "}
                  <span className="font-semibold text-[#6366f1]">{brandProducts.length} product{brandProducts.length!==1?"s":""}</span>
                </p>
              </div>
            </div>
            <button onClick={()=>setSelected(null)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] text-sm font-medium text-[#64748b] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#eef2ff] transition-all">
              ✕ Close
            </button>
          </div>

          {brandProducts.length>0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {brandProducts.map((p)=><ProductCard key={p.id} product={p}/>)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-[#1e293b]">No products listed for {selected} yet</p>
              <p className="text-sm mt-1 text-[#94a3b8]">Check back soon!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-14 rounded-2xl border border-dashed border-[#cbd5e1] bg-white">
          <p className="text-4xl mb-3">👆</p>
          <p className="font-semibold text-[#64748b]">Select a brand above to browse its products</p>
        </div>
      )}
    </PageShell>
  );
}
