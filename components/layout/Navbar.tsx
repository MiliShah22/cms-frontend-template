"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistIds } from "@/store/slices/wishlistSlice";
import { selectUser, selectIsLoggedIn, logout } from "@/store/slices/authSlice";
import { useState } from "react";

const NAV_LINKS = [
  { label:"New Arrivals", href:"/new-arrivals" },
  { label:"Collections",  href:"/collections"  },
  { label:"Brands",       href:"/brands"        },
  { label:"Offers",       href:"/offers"        },
];

export default function Navbar() {
  const cartCount   = useAppSelector(selectCartCount);
  const wishlistIds = useAppSelector(selectWishlistIds);
  const user        = useAppSelector(selectUser);
  const isLoggedIn  = useAppSelector(selectIsLoggedIn);
  const dispatch    = useAppDispatch();
  const pathname    = usePathname();
  const router      = useRouter();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 border-b border-[#e2e8f0] bg-white shadow-sm">
      {/* Logo */}
      <Link href="/" className="font-poppins text-xl font-bold tracking-tight text-[#6366f1]">
        LUXE
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-1">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={pathname===l.href
              ? { background:"#eef2ff", color:"#6366f1" }
              : { color:"#64748b" }}
            onMouseEnter={(e)=>{ if(pathname!==l.href)(e.currentTarget as HTMLAnchorElement).style.background="#f8fafc"; }}
            onMouseLeave={(e)=>{ if(pathname!==l.href)(e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Wishlist */}
        <Link href="/wishlist"
          className="relative w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center transition-all hover:border-[#6366f1] hover:bg-[#eef2ff]"
          style={{ color:wishlistIds.length>0?"#ef4444":"#64748b" }}>
          <svg width="16" height="16" fill={wishlistIds.length>0?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {wishlistIds.length>0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white bg-[#ef4444]">
              {wishlistIds.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link href="/cart"
          className="relative w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center text-[#64748b] transition-all hover:border-[#6366f1] hover:bg-[#eef2ff] hover:text-[#6366f1]">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount>0 && (
            <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white bg-[#6366f1]">
              {cartCount>9?"9+":cartCount}
            </span>
          )}
        </Link>

        {/* Auth */}
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={()=>setDropdown(!dropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#6366f1] transition-all">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#6366f1]">
                {user?.name?.[0]??"U"}
              </div>
              <span className="text-sm font-medium hidden sm:block text-[#334155]">{user?.name}</span>
              <svg width="12" height="12" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#e2e8f0] bg-white shadow-xl overflow-hidden z-50">
                {[
                  { href:"/account",  icon:"👤", label:"My Account"                    },
                  { href:"/wishlist", icon:"❤️",  label:`Wishlist (${wishlistIds.length})` },
                  { href:"/cart",     icon:"🛍️",  label:`Cart (${cartCount})`           },
                ].map((item)=>(
                  <Link key={item.href} href={item.href} onClick={()=>setDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#334155] hover:bg-[#f8fafc] transition-colors">
                    <span>{item.icon}</span>{item.label}
                  </Link>
                ))}
                <div className="border-t border-[#e2e8f0]"/>
                <button onClick={()=>{ dispatch(logout()); setDropdown(false); router.push("/"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-[#ef4444] hover:bg-[#fef2f2] transition-colors">
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
