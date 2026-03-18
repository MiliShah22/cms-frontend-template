"use client";
import Link from "next/link";

const HIGHLIGHTS = [
  { emoji:"💻", label:"Tech Essentials", href:"/collections", bg:"#eef2ff", accent:"#6366f1" },
  { emoji:"👗", label:"Street Style",    href:"/collections", bg:"#fdf4ff", accent:"#a855f7" },
  { emoji:"🏠", label:"Home Luxe",       href:"/collections", bg:"#f0fdf4", accent:"#10b981" },
  { emoji:"✨", label:"Beauty Edit",     href:"/collections", bg:"#fff7ed", accent:"#f97316" },
];

export default function HeroBanner() {
  return (
    <div className="bg-white border-b border-[#e2e8f0]">
      {/* Promo strip */}
      <div className="bg-[#6366f1] py-2 text-center text-xs font-semibold text-white tracking-wide">
        ✦ FREE SHIPPING on orders above ₹999 &nbsp;·&nbsp; Use code <strong>LUXE20</strong> for 20% off ✦
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 bg-[#eef2ff] text-[#6366f1]">
              🌟 New Season · New You
            </span>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold leading-[1.15] mb-4 text-[#0f172a]">
              Discover<br/>
              <span className="text-[#6366f1]">Premium</span><br/>
              Products
            </h1>
            <p className="text-sm leading-7 mb-8 max-w-md text-[#64748b]">
              Shop the world&apos;s finest brands across electronics, fashion, beauty, and home — all in one place.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/new-arrivals"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md">
                🌟 New Arrivals
              </Link>
              <Link href="/offers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] hover:bg-[#eef2ff] text-[#64748b] font-semibold text-sm transition-all">
                🏷️ Today&apos;s Offers
              </Link>
            </div>
          </div>

          {/* Collection tiles */}
          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((h)=>(
              <Link key={h.label} href={h.href}>
                <div className="rounded-xl border border-[#e2e8f0] p-5 flex flex-col items-center gap-2 text-center cursor-pointer transition-all hover:border-[#6366f1] hover:shadow-md hover:-translate-y-0.5"
                  style={{ background:h.bg }}>
                  <span className="text-4xl">{h.emoji}</span>
                  <span className="text-sm font-semibold text-[#1e293b]">{h.label}</span>
                  <span className="text-xs font-medium" style={{ color:h.accent }}>Browse →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center md:justify-between gap-5 mt-10 pt-8 border-t border-[#e2e8f0]">
          {[
            { icon:"🚚", label:"Free Shipping",   sub:"Orders above ₹999"     },
            { icon:"↩️", label:"30-Day Returns",  sub:"Hassle-free returns"    },
            { icon:"🛡️", label:"1 Year Warranty", sub:"On all electronics"     },
            { icon:"🔒", label:"Secure Payments", sub:"256-bit SSL encryption" },
            { icon:"🎁", label:"Gift Wrapping",   sub:"Available on checkout"  },
          ].map((b)=>(
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="text-xl">{b.icon}</span>
              <div>
                <p className="text-xs font-semibold text-[#1e293b]">{b.label}</p>
                <p className="text-[10px] text-[#94a3b8]">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
