"use client";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";

const DEALS = [
  { code:"LUXE20",  pct:20, label:"Flash Sale",  color:"#6366f1", bg:"#eef2ff", ends:"Today 11:59 PM" },
  { code:"SAVE10",  pct:10, label:"Weekend Deal", color:"#10b981", bg:"#f0fdf4", ends:"Sun 11:59 PM"   },
  { code:"FIRST15", pct:15, label:"New User",     color:"#f59e0b", bg:"#fffbeb", ends:"Limited time"   },
];

const DFS = [
  { key:"all", label:"All Deals"  },
  { key:"10",  label:"10–20% off" },
  { key:"20",  label:"20–30% off" },
  { key:"30",  label:"30%+ off"   },
];

export default function OffersPage() {
  const [copied,  setCopied]  = useState("");
  const [activeD, setActiveD] = useState("all");

  function copy(code: string) {
    navigator.clipboard.writeText(code).catch(()=>{});
    setCopied(code); setTimeout(()=>setCopied(""), 2000);
  }

  const saleProducts = PRODUCTS.filter((p)=>p.offerTag||p.badge==="sale"||p.badge==="hot");
  const filtered = activeD==="all" ? saleProducts : saleProducts.filter((p)=>{
    const d = Math.round(((p.old-p.price)/p.old)*100);
    if (activeD==="10") return d>=10&&d<20;
    if (activeD==="20") return d>=20&&d<30;
    if (activeD==="30") return d>=30;
    return true;
  });

  return (
    <PageShell title="Today&apos;s" accent="Offers" subtitle="Limited-time deals you don&apos;t want to miss">

      {/* Flash sale banner */}
      <div className="rounded-2xl p-6 mb-8 bg-gradient-to-r from-[#eef2ff] to-[#e0e7ff] border border-[#c7d2fe] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#6366f1] text-white mb-2 inline-block">🔥 Flash Sale Active</span>
          <h2 className="font-poppins text-2xl font-bold text-[#1e293b] mb-1">Up to 30% off sitewide</h2>
          <p className="text-sm text-[#64748b]">Use coupon codes below at checkout</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          {[{l:"HRS",v:"08"},{l:"MIN",v:"42"},{l:"SEC",v:"17"}].map((t)=>(
            <div key={t.l} className="text-center px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
              <div className="font-poppins text-2xl font-black text-[#6366f1]">{t.v}</div>
              <div className="text-[10px] font-bold tracking-wider text-[#94a3b8]">{t.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {DEALS.map((d)=>(
          <div key={d.code} className="rounded-xl p-5 border relative overflow-hidden"
            style={{ background:d.bg, borderColor:d.color+"44" }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-15" style={{ background:d.color, transform:"translate(30%,-30%)" }}/>
            <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3 inline-block text-white" style={{ background:d.color }}>
              {d.label}
            </span>
            <div className="font-poppins text-4xl font-black mb-1" style={{ color:d.color }}>{d.pct}% OFF</div>
            <p className="text-xs mb-4 text-[#64748b]">Expires: {d.ends}</p>
            <button onClick={()=>copy(d.code)}
              className="w-full py-2.5 rounded-lg border text-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2"
              style={{ borderColor:d.color+"88", color:d.color, background:copied===d.code?d.color+"22":"white" }}>
              {copied===d.code ? "✅ Copied!" : d.code}
              {copied!==d.code && <span className="text-xs opacity-50">· tap to copy</span>}
            </button>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-sm font-semibold text-[#64748b]">Filter:</span>
        {DFS.map((f)=>(
          <button key={f.key} onClick={()=>setActiveD(f.key)}
            className="px-4 py-1.5 rounded-full border text-xs font-semibold transition-all"
            style={ activeD===f.key
              ? { background:"#6366f1", borderColor:"#6366f1", color:"#fff" }
              : { background:"#fff", borderColor:"#e2e8f0", color:"#64748b" }}>
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#94a3b8]">{filtered.length} deals</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((p)=><ProductCard key={p.id} product={p}/>)}
      </div>
    </PageShell>
  );
}
