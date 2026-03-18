"use client";
import Link from "next/link";
import { GoldBtn, GhostBtn } from "@/components/ui/Buttons";

const HIGHLIGHTS = [
  { emoji:"💻", label:"Tech Essentials", href:"/collections" },
  { emoji:"👗", label:"Street Style",    href:"/collections" },
  { emoji:"🏠", label:"Home Luxe",       href:"/collections" },
  { emoji:"✨", label:"Beauty Edit",     href:"/collections" },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden px-6 md:px-10 pt-10 pb-8"
      style={{ background:"linear-gradient(135deg,#080a0e 0%,#0d1020 50%,#080a0e 100%)" }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background:"#c9a84c", filter:"blur(100px)", transform:"translate(30%,-30%)" }}/>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background:"#6c63ff", filter:"blur(80px)", transform:"translate(-30%,30%)" }}/>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full inline-block mb-4"
              style={{ background:"rgba(201,168,76,0.15)", color:"#c9a84c" }}>
              🌟 New Season. New You.
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl font-black leading-[1.1] mb-4" style={{ color:"#eef0f6" }}>
              Discover<br/>
              <em className="italic" style={{ color:"#e8c97a" }}>Premium</em><br/>
              Products
            </h1>
            <p className="text-sm leading-7 mb-8 max-w-md" style={{ color:"#8e96b5" }}>
              Shop the world&apos;s finest brands across electronics, fashion, beauty, and home — all in one place.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/new-arrivals"><GoldBtn>🌟 New Arrivals</GoldBtn></Link>
              <Link href="/offers"><GhostBtn>🏷️ Today&apos;s Offers</GhostBtn></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((h) => (
              <Link key={h.label} href={h.href}>
                <div className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-5 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:border-[#c9a84c] hover:-translate-y-1 text-center">
                  <span className="text-4xl">{h.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color:"#eef0f6" }}>{h.label}</span>
                  <span className="text-xs" style={{ color:"#c9a84c" }}>Browse →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between gap-4 mt-10 pt-6 border-t border-[#1e2232]">
          {[
            { icon:"🚚", label:"Free Shipping",   sub:"Orders above ₹999"      },
            { icon:"↩️", label:"30-Day Returns",  sub:"Hassle-free returns"     },
            { icon:"🛡️", label:"1 Year Warranty", sub:"On all electronics"      },
            { icon:"🔒", label:"Secure Payments", sub:"256-bit SSL encryption"  },
            { icon:"🎁", label:"Gift Wrapping",   sub:"Available on checkout"   },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="text-xl">{b.icon}</span>
              <div>
                <p className="text-xs font-bold" style={{ color:"#eef0f6" }}>{b.label}</p>
                <p className="text-[10px]" style={{ color:"#6b7290" }}>{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
