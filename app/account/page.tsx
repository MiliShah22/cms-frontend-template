"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, selectIsLoggedIn, logout } from "@/store/slices/authSlice";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { selectWishlistIds } from "@/store/slices/wishlistSlice";
import { ORDERS } from "@/lib/mockData";

const STATUS_COLOR: Record<string,string> = { Delivered:"#10b981", Shipped:"#3b82f6", Processing:"#f59e0b", Cancelled:"#ef4444" };

export default function AccountPage() {
  const router    = useRouter();
  const dispatch  = useAppDispatch();
  const user      = useAppSelector(selectUser);
  const isLoggedIn= useAppSelector(selectIsLoggedIn);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const wishIds   = useAppSelector(selectWishlistIds);

  useEffect(()=>{ if(!isLoggedIn) router.replace("/login"); },[isLoggedIn,router]);
  if (!isLoggedIn||!user) return null;

  const cartQty = cartItems.reduce((s,i)=>s+i.qty,0);
  const totalSpent = ORDERS.reduce((s,o)=>s+o.total,0);

  const stats = [
    { label:"Total Orders",  value:ORDERS.length,                icon:"📦", color:"#6366f1", bg:"#eef2ff", href:"/orders" },
    { label:"Wishlist",      value:wishIds.length,               icon:"❤️",  color:"#ef4444", bg:"#fef2f2", href:"/wishlist" },
    { label:"Cart Items",    value:cartQty,                      icon:"🛍️", color:"#10b981", bg:"#f0fdf4", href:"/cart" },
    { label:"Total Spent",   value:`₹${totalSpent.toLocaleString()}`,icon:"💰",color:"#f59e0b",bg:"#fffbeb", href:"/orders" },
  ];

  const quickLinks = [
    { href:"/orders",          icon:"📦", label:"My Orders",        sub:`${ORDERS.length} orders placed`                    },
    { href:"/wishlist",        icon:"❤️",  label:"My Wishlist",       sub:`${wishIds.length} items saved`                   },
    { href:"/cart",            icon:"🛍️",  label:"My Cart",           sub:`${cartQty} items · ₹${cartTotal.toLocaleString()}` },
    { href:"/new-arrivals",    icon:"🌟",  label:"New Arrivals",      sub:"See what just landed"                             },
    { href:"/offers",          icon:"🏷️",  label:"Today's Offers",   sub:"Up to 30% off sitewide"                           },
    { href:"/account/change-password", icon:"🔐", label:"Change Password", sub:"Update your security"                       },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black bg-[#6366f1] text-white">{user.name[0]}</div>
          <div>
            <h1 className="font-poppins text-xl font-bold text-[#0f172a]">{user.name}</h1>
            <p className="text-sm text-[#64748b]">{user.email}</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1] mt-1 inline-block">{user.role}</span>
          </div>
        </div>
        <button onClick={()=>{ dispatch(logout()); router.push("/"); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e2e8f0] text-sm font-medium text-[#ef4444] hover:border-[#ef4444] hover:bg-[#fef2f2] transition-all">
          🚪 Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(s=>(
          <Link key={s.label} href={s.href}
            className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 hover:border-[#6366f1] transition-all group"
            style={{ borderLeftWidth:4, borderLeftColor:s.color }}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-poppins text-2xl font-black mb-0.5 group-hover:text-[#6366f1] transition-colors" style={{ color:s.color }}>{s.value}</div>
            <div className="text-xs font-semibold text-[#64748b]">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
            <h2 className="font-poppins text-base font-bold text-[#0f172a]">Recent Orders</h2>
            <Link href="/orders" className="text-xs font-semibold text-[#6366f1] hover:underline">View all →</Link>
          </div>
          {ORDERS.map((o,i)=>(
            <Link key={o.id} href={`/orders/${o.id}`}
              className={`flex items-center justify-between px-6 py-4 hover:bg-[#f8fafc] transition-colors ${i<ORDERS.length-1?"border-b border-[#f1f5f9]":""} group`}>
              <div>
                <p className="text-sm font-semibold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">{o.id}</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">{o.date} · {o.items.length} item{o.items.length>1?"s":""}</p>
              </div>
              <div className="text-right">
                <p className="font-poppins text-sm font-bold text-[#1e293b]">₹{o.total.toLocaleString()}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                  style={{ background:STATUS_COLOR[o.status]+"18", color:STATUS_COLOR[o.status] }}>
                  ✓ {o.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          {quickLinks.map(l=>(
            <Link key={l.href} href={l.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#6366f1] hover:bg-[#eef2ff] transition-all group shadow-sm">
              <span className="text-xl">{l.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">{l.label}</p>
                <p className="text-xs text-[#94a3b8]">{l.sub}</p>
              </div>
              <svg width="14" height="14" fill="none" stroke="#cbd5e1" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:stroke-[#6366f1] transition-colors flex-shrink-0">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          ))}

          {/* Profile info */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5">
            <h3 className="font-poppins text-sm font-bold text-[#0f172a] mb-4">Profile</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:"Name",  val:user.name          },
                { label:"Role",  val:user.role          },
                { label:"Email", val:user.email         },
                { label:"Since", val:"January 2026"     },
              ].map(f=>(
                <div key={f.label}>
                  <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-0.5">{f.label}</p>
                  <p className="text-xs font-medium text-[#1e293b] truncate">{f.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
