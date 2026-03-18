"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#1e293b] mt-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-poppins text-xl font-bold text-white mb-3">LUXE</p>
            <p className="text-xs leading-6 text-[#94a3b8] mb-4">Premium products from the world&apos;s top brands. Delivered fast, with love.</p>
            <div className="flex gap-2">
              {["𝕏","in","📸","▶️"].map((s,i)=>(
                <div key={i} className="w-8 h-8 rounded-lg border border-[#334155] flex items-center justify-center text-xs cursor-pointer hover:border-[#6366f1] hover:bg-[#6366f1] transition-all text-[#94a3b8]">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#6366f1] mb-4">Shop</p>
            <div className="flex flex-col gap-2.5">
              {[{l:"New Arrivals",h:"/new-arrivals"},{l:"Collections",h:"/collections"},{l:"Brands",h:"/brands"},{l:"Offers",h:"/offers"},{l:"Wishlist",h:"/wishlist"}].map(i=>(
                <Link key={i.h} href={i.h} className="text-xs text-[#94a3b8] hover:text-white transition-colors">{i.l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#6366f1] mb-4">Help</p>
            <div className="flex flex-col gap-2.5">
              {[{l:"FAQ",h:"/faq"},{l:"Contact Us",h:"/contact"},{l:"Shipping Policy",h:"/shipping-policy"},{l:"Returns & Refunds",h:"/returns"},{l:"Track Order",h:"/orders"}].map(i=>(
                <Link key={i.h} href={i.h} className="text-xs text-[#94a3b8] hover:text-white transition-colors">{i.l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#6366f1] mb-4">Newsletter</p>
            <p className="text-xs mb-3 leading-5 text-[#94a3b8]">Get exclusive deals and new arrivals in your inbox.</p>
            <div className="flex gap-2">
              <input placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-xs text-white outline-none focus:border-[#6366f1] transition-colors"
                style={{ fontFamily:"inherit" }}/>
              <button className="px-3 py-2 rounded-lg text-xs font-bold bg-[#6366f1] hover:bg-[#4f46e5] text-white transition-all">→</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-[#334155]">
          <p className="text-xs text-[#64748b]">© 2026 LUXE Store. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l=>(
              <span key={l} className="text-xs text-[#64748b] hover:text-[#94a3b8] cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
