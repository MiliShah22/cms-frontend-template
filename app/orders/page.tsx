"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/store/slices/authSlice";
import { ORDERS } from "@/lib/mockData";

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  Delivered:  { bg:"#f0fdf4", text:"#15803d", dot:"#22c55e" },
  Shipped:    { bg:"#eff6ff", text:"#1d4ed8", dot:"#3b82f6" },
  Processing: { bg:"#fffbeb", text:"#b45309", dot:"#f59e0b" },
  Cancelled:  { bg:"#fef2f2", text:"#b91c1c", dot:"#ef4444" },
};

export default function OrdersPage() {
  const router     = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  useEffect(() => { if (!isLoggedIn) router.replace("/login"); }, [isLoggedIn, router]);
  if (!isLoggedIn) return null;

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <Link href="/account" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-4">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Account
        </Link>
        <h1 className="font-poppins text-3xl font-bold text-[#0f172a]">My <span className="text-[#6366f1]">Orders</span></h1>
        <p className="text-sm text-[#64748b] mt-1">{ORDERS.length} orders placed</p>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      <div className="flex flex-col gap-4">
        {ORDERS.map((order) => {
          const st = STATUS_STYLE[order.status];
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 hover:border-[#6366f1] transition-all group">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#f1f5f9]">
                <div>
                  <p className="font-poppins text-sm font-bold text-[#1e293b]">{order.id}</p>
                  <p className="text-xs text-[#94a3b8] mt-0.5">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{ background: st.bg, color: st.text }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: st.dot }}/>
                    {order.status}
                  </span>
                  <Link href={`/orders/${order.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[#6366f1] hover:bg-[#eef2ff] hover:border-[#6366f1] transition-all">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-[#1e293b] max-w-[140px] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#94a3b8]">Qty: {item.qty} · ₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  {order.estimatedDelivery}
                </div>
                <div className="font-poppins text-base font-black text-[#6366f1]">₹{order.total.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
