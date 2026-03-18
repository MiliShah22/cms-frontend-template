"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { GoldBtn, GhostBtn } from "@/components/ui/Buttons";

const FILTERS = [
  { key:"all",     label:"All New"  },
  { key:"tech",    label:"Tech"     },
  { key:"fashion", label:"Fashion"  },
  { key:"beauty",  label:"Beauty"   },
];

export default function NewArrivalsClient({ products }: { products: Product[] }) {
  const [active, setActive] = useState("all");

  const filtered = products.filter((p) => {
    if (active === "all")    return true;
    if (active === "tech")   return p.cat === "Electronics";
    if (active === "fashion") return p.cat === "Fashion";
    if (active === "beauty") return p.cat === "Beauty";
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 pb-16">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="font-playfair text-4xl font-bold mb-2">
          New <em className="italic" style={{ color:"#e8c97a" }}>Arrivals</em>
        </h1>
        <p className="text-sm" style={{ color:"#6b7290" }}>{products.length} fresh products just landed</p>
        <div className="mt-4 h-px w-24" style={{ background:"linear-gradient(90deg,#c9a84c,transparent)" }}/>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-10 p-10"
        style={{ background:"linear-gradient(135deg,#0d1020,#1a1a2e)", minHeight:200, border:"1px solid #1e2232" }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle at 70% 50%, #c9a84c 0%, transparent 60%)" }}/>
        <div className="relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-3 inline-block"
            style={{ background:"rgba(201,168,76,0.15)", color:"#c9a84c" }}>
            🌟 Just Landed
          </span>
          <h2 className="font-playfair text-3xl font-bold mb-2" style={{ color:"#eef0f6" }}>Fresh Off the Shelf</h2>
          <p style={{ color:"#8e96b5" }} className="text-sm max-w-md mb-5">
            The latest additions to LUXE — handpicked from the world&apos;s top brands, available now.
          </p>
          <Link href="/offers">
            <GoldBtn>🏷️ See Today&apos;s Offers</GoldBtn>
          </Link>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setActive(f.key)}
            className="px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200"
            style={ active===f.key
              ? { background:"#c9a84c", borderColor:"#c9a84c", color:"#080a0e" }
              : { background:"#13161f", borderColor:"#252b3d", color:"#8e96b5" }}>
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm" style={{ color:"#6b7290" }}>{filtered.length} items</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-[#1e2232]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold mb-4" style={{ color:"#eef0f6" }}>No new items in this category</p>
          <GhostBtn onClick={() => setActive("all")}>Show All New</GhostBtn>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      )}
    </div>
  );
}
