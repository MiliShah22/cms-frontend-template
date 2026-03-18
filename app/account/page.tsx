"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, selectIsLoggedIn, logout } from "@/store/slices/authSlice";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { selectWishlistIds } from "@/store/slices/wishlistSlice";
import { GhostBtn } from "@/components/ui/Buttons";

const ORDER_HISTORY = [
  { id:"LUXE-2026-84201", date:"Mar 10, 2026", items:3, total:48890, status:"Delivered" },
  { id:"LUXE-2026-71038", date:"Feb 22, 2026", items:1, total:12995, status:"Delivered" },
  { id:"LUXE-2026-59314", date:"Jan 15, 2026", items:2, total:37489, status:"Delivered" },
];

export default function AccountPage() {
  const router     = useRouter();
  const dispatch   = useAppDispatch();
  const user       = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const cartItems  = useAppSelector(selectCartItems);
  const cartTotal  = useAppSelector(selectCartTotal);
  const wishIds    = useAppSelector(selectWishlistIds);

  useEffect(() => { if (!isLoggedIn) router.replace("/login"); }, [isLoggedIn, router]);
  if (!isLoggedIn || !user) return null;

  const cartQty = cartItems.reduce((s, i) => s + i.qty, 0);

  const statCards = [
    { label:"Orders",      value: ORDER_HISTORY.length,                                          icon:"📦", color:"#c9a84c" },
    { label:"Wishlist",    value: wishIds.length,                                                icon:"❤️",  color:"#f87171" },
    { label:"Cart Items",  value: cartQty,                                                       icon:"🛍️", color:"#34d399" },
    { label:"Total Spent", value:`₹${ORDER_HISTORY.reduce((s,o)=>s+o.total,0).toLocaleString()}`,icon:"💰", color:"#e8c97a" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
            style={{ background:"linear-gradient(135deg,#c9a84c,#e8c97a)", color:"#080a0e" }}>
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-playfair text-2xl font-bold" style={{ color:"#eef0f6" }}>{user.name}</h1>
            <p className="text-sm mt-0.5" style={{ color:"#8e96b5" }}>{user.email}</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full mt-1 inline-block"
              style={{ background:"rgba(201,168,76,0.15)", color:"#c9a84c" }}>{user.role}</span>
          </div>
        </div>
        <GhostBtn danger onClick={() => { dispatch(logout()); router.push("/"); }}>🚪 Logout</GhostBtn>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-playfair text-2xl font-black mb-1" style={{ color:s.color }}>{s.value}</div>
            <div className="text-xs font-semibold" style={{ color:"#6b7290" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Order History */}
        <div className="rounded-2xl border border-[#1e2232] bg-[#13161f] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2232]">
            <h2 className="font-playfair text-lg font-bold" style={{ color:"#eef0f6" }}>Order History</h2>
            <span className="text-xs" style={{ color:"#6b7290" }}>{ORDER_HISTORY.length} orders</span>
          </div>
          {ORDER_HISTORY.map((order, i) => (
            <div key={order.id}
              className={`flex items-center justify-between px-6 py-4 hover:bg-[#0f1117] transition-colors ${i < ORDER_HISTORY.length-1 ? "border-b border-[#1e2232]" : ""}`}>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color:"#eef0f6" }}>{order.id}</p>
                <p className="text-xs" style={{ color:"#6b7290" }}>{order.date} · {order.items} item{order.items>1?"s":""}</p>
              </div>
              <div className="text-right">
                <p className="font-playfair text-base font-bold mb-1" style={{ color:"#e8c97a" }}>₹{order.total.toLocaleString()}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background:"rgba(52,211,153,0.12)", color:"#34d399" }}>✓ {order.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          {[
            { href:"/wishlist",     icon:"❤️",  label:"My Wishlist",    sub:`${wishIds.length} items saved`                },
            { href:"/cart",         icon:"🛍️",  label:"My Cart",        sub:`${cartQty} items · ₹${cartTotal.toLocaleString()}` },
            { href:"/new-arrivals", icon:"🌟",  label:"New Arrivals",   sub:"See what just landed"                          },
            { href:"/offers",       icon:"🏷️",  label:"Today's Offers", sub:"Up to 30% off sitewide"                        },
            { href:"/collections",  icon:"✨",  label:"Collections",    sub:"Curated product sets"                          },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[#1e2232] bg-[#13161f] hover:border-[#252b3d] hover:-translate-y-0.5 transition-all group">
              <span className="text-2xl">{l.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold group-hover:text-[#c9a84c] transition-colors" style={{ color:"#eef0f6" }}>{l.label}</p>
                <p className="text-xs mt-0.5" style={{ color:"#6b7290" }}>{l.sub}</p>
              </div>
              <svg width="14" height="14" fill="none" stroke="#252b3d" strokeWidth="2" viewBox="0 0 24 24"
                className="group-hover:stroke-[#c9a84c] transition-colors flex-shrink-0">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-6 rounded-2xl border border-[#1e2232] bg-[#13161f] p-6">
        <h3 className="font-playfair text-lg font-bold mb-5" style={{ color:"#eef0f6" }}>Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label:"Full Name",    value:user.name              },
            { label:"Email",        value:user.email             },
            { label:"Role",         value:user.role              },
            { label:"Member Since", value:"January 2026"         },
            { label:"Phone",        value:"+91 98765 43210"      },
            { label:"Location",     value:"Ahmedabad, Gujarat"   },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color:"#6b7290" }}>{f.label}</p>
              <p className="text-sm font-medium" style={{ color:"#eef0f6" }}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
