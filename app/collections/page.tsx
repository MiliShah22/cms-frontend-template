"use client";
import { useState } from "react";
import { COLLECTIONS, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";

export default function CollectionsPage() {
  const [active, setActive] = useState<string|null>(null);
  const collectionProducts = active ? PRODUCTS.filter((p)=>p.collection===active) : [];

  return (
    <PageShell title="Curated" accent="Collections" subtitle="Discover products grouped by lifestyle and taste">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {COLLECTIONS.map((col)=>{
          const isActive = active===col.name;
          return (
            <button key={col.name} onClick={()=>setActive(isActive?null:col.name)}
              className="relative rounded-xl border p-6 text-left overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
              style={{ background:isActive?"#eef2ff":"#fff", borderColor:isActive?"#6366f1":"#e2e8f0" }}>
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-[0.06] pointer-events-none"
                style={{ background:col.color, transform:"translate(30%,-30%)" }}/>
              <div className="relative z-10">
                <div className="text-4xl mb-3">{col.emoji}</div>
                <h3 className="font-poppins text-base font-bold text-[#1e293b] mb-1">{col.name}</h3>
                <p className="text-xs text-[#64748b] mb-4 leading-5">{col.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1]">
                    {col.count} product{col.count!==1?"s":""}
                  </span>
                  <span className="text-xs font-semibold text-[#6366f1]">
                    {isActive?"▲ Hide":"▼ Browse"} →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{COLLECTIONS.find(c=>c.name===active)?.emoji}</span>
              <div>
                <h2 className="font-poppins text-lg font-bold text-[#0f172a]">{active}</h2>
                <p className="text-xs text-[#64748b]">{collectionProducts.length} products in this collection</p>
              </div>
            </div>
            <button onClick={()=>setActive(null)}
              className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-medium text-[#64748b] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#eef2ff] transition-all">
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {collectionProducts.map((p)=><ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-dashed border-[#cbd5e1] bg-white">
          <p className="text-4xl mb-3">✨</p>
          <p className="font-semibold text-[#64748b]">Tap any collection to explore its products</p>
        </div>
      )}
    </PageShell>
  );
}
