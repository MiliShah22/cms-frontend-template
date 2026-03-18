"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { selectIsLoggedIn } from "@/store/slices/authSlice";
import { ORDERS } from "@/lib/mockData";
import { PRODUCTS } from "@/lib/products";
import { showToast } from "@/components/ui/Toast";

const STATUS_STEPS: Record<string, number> = {
  Processing: 1, Shipped: 2, Delivered: 3,
};

const STATUS_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Delivered:  { bg:"#f0fdf4", text:"#15803d", border:"#86efac" },
  Shipped:    { bg:"#eff6ff", text:"#1d4ed8", border:"#93c5fd" },
  Processing: { bg:"#fffbeb", text:"#b45309", border:"#fcd34d" },
  Cancelled:  { bg:"#fef2f2", text:"#b91c1c", border:"#fca5a5" },
};

export default function OrderDetailPage() {
  const router     = useRouter();
  const dispatch   = useAppDispatch();
  const params     = useParams();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const orderId    = decodeURIComponent(params.id as string);
  const order      = ORDERS.find(o => o.id === orderId);

  useEffect(() => { if (!isLoggedIn) router.replace("/login"); }, [isLoggedIn, router]);
  if (!isLoggedIn) return null;

  if (!order) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-16 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="font-poppins text-2xl font-bold text-[#0f172a] mb-2">Order not found</h2>
        <p className="text-sm text-[#64748b] mb-6">We couldn&apos;t find order <span className="font-semibold text-[#6366f1]">{orderId}</span></p>
        <Link href="/orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all">← View All Orders</Link>
      </div>
    );
  }

  const st        = STATUS_STYLE[order.status];
  const stepIndex = STATUS_STEPS[order.status] ?? 0;

  function handleReorder() {
    order.items.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (product) dispatch(addToCart({ product, qty: item.qty }));
    });
    showToast("All items added to cart!");
    router.push("/cart");
  }

  const TIMELINE = [
    { label:"Order Placed",  icon:"🛍️",  date:order.date,               done:true  },
    { label:"Processing",    icon:"⚙️",   date:"Within 2 hrs",           done:stepIndex>=1 },
    { label:"Shipped",       icon:"🚚",   date:`Tracking: ${order.trackingId}`, done:stepIndex>=2 },
    { label:"Delivered",     icon:"🏠",   date:order.estimatedDelivery,  done:stepIndex>=3 },
  ];

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Back */}
      <Link href="/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-6">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Orders
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-[#0f172a] mb-1">{order.id}</h1>
            <p className="text-sm text-[#64748b]">Placed on {order.date} · {order.items.length} item{order.items.length!==1?"s":""}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold px-4 py-2 rounded-xl border"
              style={{ background:st.bg, color:st.text, borderColor:st.border }}>
              {order.status === "Delivered" ? "✓ " : order.status === "Shipped" ? "🚚 " : "⏳ "}
              {order.status}
            </span>
            <button onClick={handleReorder}
              className="px-4 py-2 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all flex items-center gap-2">
              🔁 Reorder
            </button>
          </div>
        </div>
      </div>

      {/* Delivery timeline */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-5">
        <h2 className="font-poppins text-sm font-bold text-[#0f172a] mb-5">Order Timeline</h2>
        <div className="flex items-start gap-0">
          {TIMELINE.map((t, i) => (
            <div key={t.label} className="flex-1 relative">
              {i < TIMELINE.length - 1 && (
                <div className="absolute top-4 left-[calc(50%+16px)] right-[-50%] h-0.5 z-0"
                  style={{ background: t.done && TIMELINE[i+1].done ? "#6366f1" : "#e2e8f0" }}/>
              )}
              <div className="relative z-10 flex flex-col items-center text-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base border-2 transition-all"
                  style={t.done
                    ? { background:"#eef2ff", borderColor:"#6366f1" }
                    : { background:"#f8fafc", borderColor:"#e2e8f0" }}>
                  {t.icon}
                </div>
                <p className="text-[11px] font-bold" style={{ color:t.done?"#6366f1":"#94a3b8" }}>{t.label}</p>
                <p className="text-[10px] text-[#94a3b8] max-w-[90px]">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Left */}
        <div className="flex flex-col gap-5">
          {/* Items */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
            <h2 className="font-poppins text-sm font-bold text-[#0f172a] mb-4">Items Ordered</h2>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => {
                const product = PRODUCTS.find(p => p.id === item.id);
                return (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                    <div className="w-14 h-14 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-3xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.id}`}
                        className="text-sm font-semibold text-[#1e293b] hover:text-[#6366f1] transition-colors block truncate">
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#94a3b8] mt-0.5">
                        Size: {item.size} · Qty: {item.qty} · ₹{item.price.toLocaleString()} each
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-poppins text-sm font-bold text-[#1e293b]">₹{(item.price * item.qty).toLocaleString()}</p>
                      {product && (
                        <button
                          onClick={() => { dispatch(addToCart({ product: product!, qty: item.qty })); showToast(`"${item.name}" added to cart!`); }}
                          className="text-[10px] font-semibold text-[#6366f1] hover:underline mt-0.5 block">
                          + Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping info */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
            <h2 className="font-poppins text-sm font-bold text-[#0f172a] mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label:"Delivery Address", value:order.address },
                { label:"Payment Method",   value:order.paymentMethod },
                { label:"Tracking ID",      value:order.trackingId },
                { label:"Delivery Status",  value:order.estimatedDelivery },
              ].map(f => (
                <div key={f.label} className={f.label === "Delivery Address" ? "col-span-2" : ""}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">{f.label}</p>
                  <p className="text-sm font-medium text-[#1e293b]">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Price breakdown */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 h-fit sticky top-20">
          <h2 className="font-poppins text-sm font-bold text-[#0f172a] mb-4">Price Breakdown</h2>
          <div className="flex flex-col gap-2.5 mb-4">
            {[
              { label:"Subtotal",          val:`₹${order.subtotal.toLocaleString()}`,   color:undefined   },
              { label:"Discount Applied",  val:`−₹${order.discount.toLocaleString()}`,  color:"#10b981"   },
              { label:"Delivery",          val:"FREE",                                   color:"#10b981"   },
              { label:"Tax (18% GST)",     val:`₹${order.tax.toLocaleString()}`,         color:undefined   },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm text-[#64748b]">
                <span>{r.label}</span>
                <span style={r.color ? { color:r.color } : undefined}>{r.val}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-[#f1f5f9] mb-5">
            <span className="text-sm font-bold text-[#0f172a]">Total Paid</span>
            <span className="font-poppins text-2xl font-black text-[#6366f1]">₹{order.total.toLocaleString()}</span>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={handleReorder}
              className="w-full py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all"
              style={{ fontFamily:"inherit" }}>
              🔁 Reorder All Items
            </button>
            {order.status === "Delivered" && (
              <Link href={`/products/${order.items[0].id}`}
                className="w-full py-2.5 rounded-xl border-2 border-[#e2e8f0] text-[#6366f1] text-sm font-semibold hover:border-[#6366f1] hover:bg-[#eef2ff] transition-all text-center">
                ⭐ Write a Review
              </Link>
            )}
            {order.status !== "Cancelled" && order.status !== "Delivered" && (
              <button className="w-full py-2.5 rounded-xl border border-[#fca5a5] text-[#ef4444] text-sm font-semibold hover:bg-[#fef2f2] transition-all"
                style={{ fontFamily:"inherit" }}>
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
