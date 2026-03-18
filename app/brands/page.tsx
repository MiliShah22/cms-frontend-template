"use client";
import { useState } from "react";
import { BRANDS, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";
import { GhostBtn } from "@/components/ui/Buttons";

export default function BrandsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const brandProducts = selected ? PRODUCTS.filter((p) => p.brand === selected) : [];

  return (
    <PageShell title="Our" accent="Brands" subtitle="Shop by your favourite brands from around the world">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
        {BRANDS.map((b) => (
          <button key={b.name} onClick={() => setSelected(selected === b.name ? null : b.name)}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200 cursor-pointer group hover:-translate-y-1"
            style={{
              background: selected===b.name ? "rgba(201,168,76,0.1)" : "#13161f",
              borderColor: selected===b.name ? "#c9a84c" : "#1e2232",
            }}>
            <span className="text-4xl">{b.emoji}</span>
            <div className="text-center">
              <div className="text-[13px] font-bold leading-tight"
                style={{ color: selected===b.name ? "#e8c97a" : "#eef0f6" }}>{b.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color:"#6b7290" }}>{b.tagline}</div>
              <div className="text-[10px] font-semibold mt-1.5 px-2 py-0.5 rounded-full inline-block"
                style={{ background:"rgba(201,168,76,0.12)", color:"#c9a84c" }}>
                {b.count} product{b.count!==1?"s":""}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold" style={{ color:"#eef0f6" }}>
              {BRANDS.find(b=>b.name===selected)?.emoji} {selected}
              <span className="font-outfit text-sm font-normal ml-2" style={{ color:"#6b7290" }}>
                ({brandProducts.length} products)
              </span>
            </h2>
            <GhostBtn onClick={() => setSelected(null)}>✕ Clear</GhostBtn>
          </div>
          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {brandProducts.map((p) => <ProductCard key={p.id} product={p}/>)}
            </div>
          ) : (
            <div className="text-center py-14 rounded-2xl border border-[#1e2232]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold" style={{ color:"#eef0f6" }}>No products listed for {selected} yet</p>
              <p className="text-sm mt-1" style={{ color:"#6b7290" }}>Check back soon!</p>
            </div>
          )}
        </div>
      )}

      {!selected && (
        <div className="text-center py-14 rounded-2xl border border-dashed border-[#252b3d]">
          <p className="text-4xl mb-3">👆</p>
          <p className="font-semibold" style={{ color:"#8e96b5" }}>Select a brand above to browse its products</p>
        </div>
      )}
    </PageShell>
  );
}
