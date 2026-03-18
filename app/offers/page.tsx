"use client";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import PageShell from "@/components/ui/PageShell";

const DEALS = [
  { code:"LUXE20",  pct:20, label:"Flash Sale",   color:"#c9a84c", ends:"Today 11:59 PM" },
  { code:"SAVE10",  pct:10, label:"Weekend Deal",  color:"#34d399", ends:"Sun 11:59 PM"   },
  { code:"FIRST15", pct:15, label:"New User",      color:"#f87171", ends:"Limited time"   },
];

const DISCOUNT_FILTERS = [
  { key:"all", label:"All Deals"  },
  { key:"10",  label:"10–20% off" },
  { key:"20",  label:"20–30% off" },
  { key:"30",  label:"30%+ off"   },
];

export default function OffersPage() {
  const [copied, setCopied] = useState("");
  const [activeDf, setActiveDf] = useState("all");

  function copy(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  }

  const saleProducts = PRODUCTS.filter((p) => p.offerTag || p.badge === "sale" || p.badge === "hot");
  const filtered = activeDf === "all" ? saleProducts : saleProducts.filter((p) => {
    const d = Math.round(((p.old - p.price) / p.old) * 100);
    if (activeDf === "10") return d >= 10 && d < 20;
    if (activeDf === "20") return d >= 20 && d < 30;
    if (activeDf === "30") return d >= 30;
    return true;
  });

  return (
    <PageShell title="Today&apos;s" accent="Offers" subtitle="Limited-time deals you don&apos;t want to miss">
      {/* Countdown banner */}
      <div className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{ background:"linear-gradient(135deg,#1a0e00,#2e1a00)", border:"1px solid rgba(201,168,76,0.3)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle at 80% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)" }}/>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color:"#c9a84c" }}>🔥 Flash Sale Active</p>
            <h2 className="font-playfair text-2xl font-bold mb-1" style={{ color:"#eef0f6" }}>Up to 30% off sitewide</h2>
            <p className="text-sm" style={{ color:"#8e96b5" }}>Use coupon codes below at checkout</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            {[{ label:"HRS", val:"08" }, { label:"MIN", val:"42" }, { label:"SEC", val:"17" }].map((t) => (
              <div key={t.label} className="text-center px-4 py-3 rounded-xl"
                style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(201,168,76,0.2)" }}>
                <div className="font-playfair text-2xl font-black" style={{ color:"#e8c97a" }}>{t.val}</div>
                <div className="text-[10px] font-bold tracking-wider" style={{ color:"#6b7290" }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {DEALS.map((d) => (
          <div key={d.code} className="rounded-2xl p-5 border relative overflow-hidden"
            style={{ background:"#13161f", borderColor:d.color+"44" }}>
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
              style={{ background:d.color, transform:"translate(30%, -30%)" }}/>
            <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3 inline-block"
              style={{ background:d.color+"22", color:d.color }}>{d.label}</span>
            <div className="font-playfair text-4xl font-black mb-1" style={{ color:d.color }}>{d.pct}% OFF</div>
            <p className="text-xs mb-4" style={{ color:"#6b7290" }}>Expires: {d.ends}</p>
            <button onClick={() => copy(d.code)}
              className="w-full py-2.5 rounded-xl border text-sm font-bold tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
              style={{ borderColor:d.color+"66", color:d.color, background:copied===d.code ? d.color+"33" : d.color+"11" }}>
              {copied === d.code ? "✅ Copied!" : `${d.code}`}
              {copied !== d.code && <span className="text-xs opacity-60">— tap to copy</span>}
            </button>
          </div>
        ))}
      </div>

      {/* Discount filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-sm font-semibold" style={{ color:"#8e96b5" }}>Filter by discount:</span>
        {DISCOUNT_FILTERS.map((f) => (
          <button key={f.key} onClick={() => setActiveDf(f.key)}
            className="px-4 py-2 rounded-full border text-xs font-semibold transition-all"
            style={ activeDf===f.key
              ? { background:"#c9a84c", borderColor:"#c9a84c", color:"#080a0e" }
              : { background:"#13161f", borderColor:"#252b3d", color:"#8e96b5" }}>
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm" style={{ color:"#6b7290" }}>{filtered.length} deals</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((p) => <ProductCard key={p.id} product={p}/>)}
      </div>
    </PageShell>
  );
}
