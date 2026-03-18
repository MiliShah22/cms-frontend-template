"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { selectWishlistIds } from "@/store/slices/wishlistSlice";
import { selectUser, selectIsLoggedIn, logout } from "@/store/slices/authSlice";
import { useState } from "react";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections",  href: "/collections"  },
  { label: "Brands",       href: "/brands"        },
  { label: "Offers",       href: "/offers"        },
];

export default function Navbar() {
  const cartCount     = useAppSelector(selectCartCount);
  const wishlistIds   = useAppSelector(selectWishlistIds);
  const user          = useAppSelector(selectUser);
  const isLoggedIn    = useAppSelector(selectIsLoggedIn);
  const dispatch      = useAppDispatch();
  const pathname      = usePathname();
  const router        = useRouter();
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      {/* Promo Strip */}
      <div style={{ background:"linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c)" }}
        className="py-2 text-center text-xs font-semibold text-[#080a0e] tracking-wider">
        ✦ FREE SHIPPING on orders above ₹999 &nbsp;·&nbsp; USE CODE <strong>LUXE20</strong> FOR 20% OFF ✦
      </div>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-[#1e2232]"
        style={{ background:"rgba(8,10,14,0.92)", backdropFilter:"blur(20px)" }}>

        {/* Logo */}
        <Link href="/" className="font-playfair text-xl font-black tracking-widest flex-shrink-0" style={{ color:"#e8c97a" }}>
          LUXE
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex gap-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
              style={{ color: pathname === l.href ? "#e8c97a" : "#8e96b5",
                       background: pathname === l.href ? "rgba(201,168,76,0.1)" : "transparent" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Link href="/wishlist"
            className="relative w-9 h-9 rounded-[10px] border border-[#252b3d] bg-[#13161f] flex items-center justify-center transition-all duration-200 hover:border-[#c9a84c]"
            style={{ color: wishlistIds.length > 0 ? "#f87171" : "#8e96b5" }}>
            <svg width="14" height="14" fill={wishlistIds.length>0?"currentColor":"none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background:"#f87171" }}>
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart"
            className="relative w-9 h-9 rounded-[10px] border border-[#252b3d] bg-[#13161f] flex items-center justify-center text-[#8e96b5] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-[#080a0e]"
                style={{ background:"#c9a84c" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-[#252b3d] bg-[#13161f] transition-all duration-200 hover:border-[#c9a84c]">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-[#080a0e]"
                  style={{ background:"linear-gradient(135deg,#c9a84c,#e8c97a)" }}>
                  {user?.name?.[0] ?? "U"}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color:"#eef0f6" }}>{user?.name}</span>
                <svg width="10" height="10" fill="none" stroke="#6b7290" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#252b3d] bg-[#13161f] shadow-xl overflow-hidden z-50">
                  <Link href="/account" onClick={() => setDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#1e2232] transition-colors" style={{ color:"#eef0f6" }}>
                    <span>👤</span> My Account
                  </Link>
                  <Link href="/wishlist" onClick={() => setDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#1e2232] transition-colors" style={{ color:"#eef0f6" }}>
                    <span>❤️</span> Wishlist ({wishlistIds.length})
                  </Link>
                  <Link href="/cart" onClick={() => setDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#1e2232] transition-colors" style={{ color:"#eef0f6" }}>
                    <span>🛍️</span> Cart ({cartCount})
                  </Link>
                  <div className="border-t border-[#1e2232]"/>
                  <button onClick={() => { dispatch(logout()); setDropdown(false); router.push("/"); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#1e2232] transition-colors text-left" style={{ color:"#f87171" }}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{ background:"#c9a84c", color:"#080a0e" }}
              onMouseEnter={(e)=>((e.currentTarget as HTMLAnchorElement).style.background="#e8c97a")}
              onMouseLeave={(e)=>((e.currentTarget as HTMLAnchorElement).style.background="#c9a84c")}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
