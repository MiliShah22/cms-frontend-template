"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

const FILTERS = [
  { key:"all",     label:"All New"  },
  { key:"tech",    label:"Tech"     },
  { key:"fashion", label:"Fashion"  },
  { key:"beauty",  label:"Beauty"   },
];

export default function NewArrivalsClient({ products }: { products:Product[] }) {
  const [active, setActive] = useState("all");

  const filtered = products.filter((p) => {
    if (active==="all")    return true;
    if (active==="tech")   return p.cat==="Electronics";
    if (active==="fashion") return p.cat==="Fashion";
    if (active==="beauty") return p.cat==="Beauty";
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-poppins text-3xl font-bold text-[#0f172a] mb-1">
          New <span className="text-[#6366f1]">Arrivals</span>
        </h1>
        <p className="text-sm text-[#64748b]">{products.length} fresh products just landed</p>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 p-10 bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] border border-[#c7d2fe]">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#6366f1] opacity-10 blur-3xl pointer-events-none"/>
        <div className="relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#6366f1] text-white mb-3">
            🌟 Just Landed
          </span>
          <h2 className="font-poppins text-2xl font-bold text-[#1e293b] mb-2">Fresh Off the Shelf</h2>
          <p className="text-sm text-[#64748b] max-w-md mb-5">
            The latest additions to LUXE — handpicked from the world&apos;s top brands, available now.
          </p>
          <Link href="/offers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all shadow-sm">
            🏷️ See Today&apos;s Offers
          </Link>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTERS.map((f)=>(
          <button key={f.key} onClick={()=>setActive(f.key)}
            className="px-4 py-2 rounded-full border text-sm font-semibold transition-all"
            style={ active===f.key
              ? { background:"#6366f1", borderColor:"#6366f1", color:"#fff" }
              : { background:"#fff", borderColor:"#e2e8f0", color:"#64748b" }}>
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#94a3b8]">{filtered.length} items</span>
      </div>

      {filtered.length===0 ? (
        <div className="text-center py-16 rounded-2xl border border-[#e2e8f0] bg-white">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold text-[#1e293b] mb-4">No new items in this category</p>
          <button onClick={()=>setActive("all")}
            className="px-5 py-2 rounded-lg border border-[#e2e8f0] text-sm font-semibold hover:border-[#6366f1] hover:text-[#6366f1] text-[#64748b] transition-all">
            Show All New
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p)=><ProductCard key={p.id} product={p}/>)}
        </div>
      )}
    </div>
  );
}
