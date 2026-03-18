"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e2232] mt-16" style={{ background:"#0f1117" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-playfair text-2xl font-black tracking-widest inline-block mb-3"
              style={{ color:"#e8c97a" }}>LUXE</Link>
            <p className="text-xs leading-6 mb-4" style={{ color:"#6b7290" }}>
              Premium products from the world&apos;s top brands. Delivered fast, with love.
            </p>
            <div className="flex gap-2">
              {["𝕏","in","📸","▶️"].map((s,i) => (
                <div key={i} className="w-8 h-8 rounded-lg border border-[#252b3d] flex items-center justify-center text-xs cursor-pointer hover:border-[#c9a84c] transition-colors"
                  style={{ color:"#8e96b5" }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color:"#c9a84c" }}>Shop</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label:"New Arrivals", href:"/new-arrivals" },
                { label:"Collections", href:"/collections"  },
                { label:"Brands",      href:"/brands"        },
                { label:"Offers",      href:"/offers"        },
                { label:"Wishlist",    href:"/wishlist"      },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-xs hover:text-[#c9a84c] transition-colors" style={{ color:"#8e96b5" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color:"#c9a84c" }}>Help</p>
            <div className="flex flex-col gap-2.5">
              {["FAQ","Shipping Policy","Returns & Refunds","Track Order","Contact Us"].map((l) => (
                <span key={l} className="text-xs cursor-pointer hover:text-[#c9a84c] transition-colors"
                  style={{ color:"#8e96b5" }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color:"#c9a84c" }}>Newsletter</p>
            <p className="text-xs mb-3 leading-5" style={{ color:"#6b7290" }}>Get exclusive deals and new arrivals in your inbox.</p>
            <div className="flex gap-2">
              <input placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-lg border border-[#252b3d] bg-[#13161f] text-xs outline-none focus:border-[#c9a84c] transition-colors"
                style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              <button className="px-3 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ background:"#c9a84c", color:"#080a0e" }}
                onMouseEnter={(e)=>((e.currentTarget as HTMLButtonElement).style.background="#e8c97a")}
                onMouseLeave={(e)=>((e.currentTarget as HTMLButtonElement).style.background="#c9a84c")}>
                →
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-[#1e2232]">
          <p className="text-xs" style={{ color:"#6b7290" }}>© 2026 LUXE Store. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map((l) => (
              <span key={l} className="text-xs cursor-pointer hover:text-[#c9a84c] transition-colors"
                style={{ color:"#6b7290" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
