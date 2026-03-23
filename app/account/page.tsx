"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, selectIsLoggedIn, logout, updateProfile } from "@/store/slices/authSlice";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { selectWishlistIds } from "@/store/slices/wishlistSlice";
import { ORDERS } from "@/lib/mockData";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

const STATUS_COLOR: Record<string, string> = { Delivered: "#10b981", Shipped: "#3b82f6", Processing: "#f59e0b", Cancelled: "#ef4444" };
const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  Delivered: { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  Shipped: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Processing: { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  Cancelled: { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

type Tab = "overview" | "orders" | "wishlist" | "profile";

export default function AccountPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const wishIds = useAppSelector(selectWishlistIds);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (user) {
      setFormData({ name: user.name || "", phone: user.phone || "", address: user.address || "" });
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Prevent flash while redirecting
  }

  const cartQty = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalSpent = ORDERS.reduce((s, o) => s + o.total, 0);
  const wishlistProducts = PRODUCTS.filter(p => wishIds.includes(p.id));

  const stats = [
    { label: "Total Orders", value: ORDERS.length.toString(), icon: "📦", color: "#6366f1", bg: "#eef2ff", href: "/orders" },
    { label: "Wishlist", value: wishIds.length.toString(), icon: "❤️", color: "#ef4444", bg: "#fef2f2", href: "/wishlist" },
    { label: "Cart Items", value: cartQty.toString(), icon: "🛍️", color: "#10b981", bg: "#f0fdf4", href: "/cart" },
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, icon: "💰", color: "#f59e0b", bg: "#fffbeb", href: "/orders" },
  ];

  const quickLinks = [
    { href: "/orders", icon: "📦", label: "View All Orders", sub: `${ORDERS.length} orders` },
    { href: "/wishlist", icon: "❤️", label: "View Wishlist", sub: `${wishIds.length} items` },
    { href: "/cart", icon: "🛍️", label: "View Cart", sub: `${cartQty} items · ₹${cartTotal.toLocaleString()}` },
    { href: "/new-arrivals", icon: "🌟", label: "New Arrivals", sub: "See what just landed" },
    { href: "/offers", icon: "🏷️", label: "Today's Offers", sub: "Up to 30% off sitewide" },
    { href: "/account/change-password", icon: "🔐", label: "Change Password", sub: "Update your security" },
  ];

  const tabs: Tab[] = ["overview", "orders", "wishlist", "profile"];
  const tabLabels: Record<Tab, string> = {
    overview: "Overview",
    orders: "My Orders",
    wishlist: "Wishlist",
    profile: "Profile",
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  const OrderList = () => (
    <div className="flex flex-col gap-4">
      {ORDERS.map((order) => {
        const st = STATUS_STYLE[order.status];
        return (
          <Link key={order.id} href={`/orders/${order.id}`} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 hover:border-[#6366f1] transition-all group">
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#f1f5f9]">
              <div>
                <p className="font-poppins text-sm font-bold text-[#1e293b]">{order.id}</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">Placed on {order.date}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: st.bg, color: st.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                  {order.status}
                </span>
                <span className="text-xs font-semibold text-[#6366f1] hover:underline">View Details →</span>
              </div>
            </div>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                {order.estimatedDelivery}
              </div>
              <div className="font-poppins text-base font-black text-[#6366f1]">₹{order.total.toLocaleString()}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 pb-16">
      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black bg-[#6366f1] text-white">
            {user?.name?.[0] || "?"}
          </div>
          <div>
            <h1 className="font-poppins text-xl font-bold text-[#0f172a]">{user?.name || "User"}</h1>
            <p className="text-sm text-[#64748b]">{user?.email || "email@example.com"}</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1] mt-1 inline-block">
              {user?.role || "Customer"}
            </span>
          </div>
        </div>
        <button onClick={() => { dispatch(logout()); router.push("/"); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e2e8f0] text-sm font-medium text-[#ef4444] hover:border-[#ef4444] hover:bg-[#fef2f2] transition-all">
          🚪 Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-[#e2e8f0] -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${activeTab === tab
                ? "border-[#6366f1] text-[#6366f1] bg-[#eef2ff]"
                : "border-transparent text-[#64748b] hover:text-[#6366f1] hover:border-[#6366f1]"
                }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 hover:border-[#6366f1] transition-all group"
                  style={{ borderLeftWidth: 4, borderLeftColor: s.color }}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div
                    className="font-poppins text-2xl font-black mb-0.5 group-hover:text-[#6366f1] transition-colors"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold text-[#64748b]">{s.label}</div>
                </Link>
              ))}
            </div>

            {/* Quick links + Profile sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
                <h3 className="font-poppins text-base font-bold text-[#0f172a] mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {quickLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 p-4 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#6366f1] hover:bg-[#eef2ff] transition-all group shadow-sm"
                    >
                      <span className="text-xl">{l.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">
                          {l.label}
                        </p>
                        <p className="text-xs text-[#94a3b8]">{l.sub}</p>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="group-hover:stroke-[#6366f1] transition-colors flex-shrink-0"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
                <h3 className="font-poppins text-base font-bold text-[#0f172a] mb-4">Profile Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Name", val: user?.name || "" },
                    { label: "Role", val: user?.role || "" },
                    { label: "Email", val: user?.email || "" },
                    { label: "Member Since", val: "January 2026" },
                  ].map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-0.5">
                        {f.label}
                      </p>
                      <p className="text-xs font-medium text-[#1e293b] truncate">{f.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-poppins text-2xl font-bold text-[#0f172a]">My Orders</h2>
                  <p className="text-sm text-[#64748b] mt-1">{ORDERS.length} orders placed</p>
                </div>
                <Link href="/orders" className="px-4 py-2 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all">
                  View All Orders →
                </Link>
              </div>
            </div>
            <OrderList />
          </>
        )}

        {activeTab === "wishlist" && (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 mb-6">
              <h2 className="font-poppins text-2xl font-bold text-[#0f172a]">Wishlist</h2>
              <p className="text-sm text-[#64748b] mt-1">{wishIds.length} items</p>
            </div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-12 text-center">
                <span className="text-5xl block mb-4">❤️</span>
                <h3 className="font-poppins text-lg font-bold text-[#0f172a] mb-2">Your wishlist is empty</h3>
                <p className="text-sm text-[#94a3b8] mb-6">Save items you love for later</p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlistProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-poppins text-xl font-bold text-[#0f172a]">Profile Details</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-sm font-semibold text-[#6366f1] hover:underline flex items-center gap-1"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-xl text-sm focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/10 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-xl text-sm focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1.5">Address</label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-[#e2e8f0] rounded-xl text-sm focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/10 transition-all resize-vertical"
                    placeholder="Enter your delivery address"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-sm transition-all"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Name", val: user?.name || "" },
                  { label: "Email", val: user?.email || "" },
                  { label: "Phone", val: user?.phone || "Not set" },
                  { label: "Address", val: user?.address || "Not set" },
                  { label: "Role", val: user?.role || "" },
                  { label: "Member Since", val: "January 2026" },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-0.5">
                      {f.label}
                    </p>
                    <p className="text-sm font-medium text-[#1e293b]">{f.val}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
