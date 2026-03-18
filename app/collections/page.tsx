"use client";
import { useState } from "react";
import { COLLECTIONS, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";
import { GhostBtn } from "@/components/ui/Buttons";

export default function CollectionsPage() {
  const [active, setActive] = useState<string | null>(null);
  const collectionProducts = active ? PRODUCTS.filter((p) => p.collection === active) : [];

  return (
    <PageShell title="Curated" accent="Collections" subtitle="Discover products grouped by lifestyle and taste">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {COLLECTIONS.map((col) => (
          <button key={col.name} onClick={() => setActive(active===col.name ? null : col.name)}
            className="relative rounded-2xl p-7 border text-left overflow-hidden transition-all duration-300 group hover:-translate-y-1"
            style={{
              background: col.color+"30",
              borderColor: active===col.name ? "#c9a84c" : "#1e2232",
            }}>
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background:col.color }}/>
            <div className="relative z-10">
              <div className="text-5xl mb-4">{col.emoji}</div>
              <h3 className="font-playfair text-xl font-bold mb-2" style={{ color:"#eef0f6" }}>{col.name}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color:"#8e96b5" }}>{col.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background:"rgba(201,168,76,0.15)", color:"#c9a84c" }}>
                  {col.count} product{col.count!==1?"s":""}
                </span>
                <span className="text-xs font-bold" style={{ color: active===col.name ? "#c9a84c" : "#6b7290" }}>
                  {active===col.name ? "▲ Hide" : "▼ Browse"} →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold" style={{ color:"#eef0f6" }}>
              {COLLECTIONS.find(c=>c.name===active)?.emoji} {active}
            </h2>
            <GhostBtn onClick={() => setActive(null)}>✕ Close</GhostBtn>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {collectionProducts.map((p) => <ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-dashed border-[#252b3d]">
          <p className="text-4xl mb-3">✨</p>
          <p className="font-semibold" style={{ color:"#8e96b5" }}>Tap any collection to explore its products</p>
        </div>
      )}
    </PageShell>
  );
}
