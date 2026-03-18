import Link from "next/link";

const STEPS = [
  { n:"01", icon:"📦", title:"Initiate Return", desc:"Go to My Orders, select the item, click 'Return Item' and choose your reason. You can return within 30 days of delivery." },
  { n:"02", icon:"🚚", title:"Schedule Pickup", desc:"A pickup is scheduled within 24–48 hours at your registered address. Ensure the item is packed in its original packaging." },
  { n:"03", icon:"🔍", title:"Quality Check", desc:"Once received, our team inspects the item within 2–3 business days to verify condition and eligibility for refund." },
  { n:"04", icon:"💰", title:"Refund Processed", desc:"Approved refunds are processed within 5–7 business days. You'll receive an email confirmation when the refund is initiated." },
];

const RETURN_TABLE = [
  { category:"Electronics",    window:"7 days",  condition:"Unused, original packaging, all accessories" },
  { category:"Fashion & Apparel","window":"30 days",condition:"Unworn, tags intact, original packaging"     },
  { category:"Home & Living",   window:"30 days", condition:"Unused, original packaging"                    },
  { category:"Beauty & Skincare","window":"15 days",condition:"Unopened, sealed"                             },
  { category:"Books & Media",   window:"15 days", condition:"Unread, no marks or damage"                    },
  { category:"Sports & Fitness","window":"30 days",condition:"Unused, tags intact"                           },
];

const NON_RETURNABLE = [
  "Perishable items (food, flowers)",
  "Personalised or customised products",
  "Downloadable software or digital products",
  "Intimate apparel and swimwear",
  "Opened beauty and skincare products",
  "Gift cards and vouchers",
  "Items damaged due to misuse",
];

const REFUND_METHODS = [
  { method:"Original Credit/Debit Card", time:"5–7 business days", icon:"💳" },
  { method:"UPI / Bank Transfer",        time:"3–5 business days", icon:"📲" },
  { method:"LUXE Store Credit",          time:"Instant",           icon:"✨" },
  { method:"Net Banking",                time:"5–7 business days", icon:"🏦" },
];

export default function ReturnsPage() {
  return (
    <div className="max-w-[860px] mx-auto px-6 md:px-10 py-10 pb-16">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-4">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>Home
        </Link>
        <h1 className="font-poppins text-4xl font-bold text-[#0f172a] mb-2">Returns &amp; <span className="text-[#6366f1]">Refunds</span></h1>
        <p className="text-sm text-[#64748b]">Last updated: March 2026</p>
        <div className="mt-4 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      {/* Policy highlight */}
      <div className="bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] rounded-2xl border border-[#c7d2fe] p-6 mb-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="text-5xl">↩️</div>
        <div>
          <h2 className="font-poppins text-xl font-bold text-[#1e293b] mb-1">30-Day Hassle-Free Returns</h2>
          <p className="text-sm text-[#64748b]">Changed your mind? No problem. Return most items within 30 days — no questions asked. We&apos;ll arrange free pickup and process your refund promptly.</p>
        </div>
      </div>

      {/* Steps */}
      <h2 className="font-poppins text-lg font-bold text-[#1e293b] mb-4">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {STEPS.map(s=>(
          <div key={s.n} className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 flex gap-4">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#eef2ff] flex items-center justify-center text-lg mb-2">{s.icon}</div>
              <span className="text-[10px] font-black text-[#c7d2fe]">{s.n}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1e293b] mb-1">{s.title}</p>
              <p className="text-xs text-[#64748b] leading-5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Return windows table */}
      <h2 className="font-poppins text-lg font-bold text-[#1e293b] mb-4">Return Windows by Category</h2>
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <tr>
              {["Category","Return Window","Condition Required"].map(h=>(
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#94a3b8]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RETURN_TABLE.map((r,i)=>(
              <tr key={r.category} className={`border-b border-[#f1f5f9] ${i===RETURN_TABLE.length-1?"border-none":""} hover:bg-[#f8fafc] transition-colors`}>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#1e293b]">{r.category}</td>
                <td className="px-5 py-3.5"><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#6366f1]">{r.window}</span></td>
                <td className="px-5 py-3.5 text-xs text-[#64748b]">{r.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Non-returnable */}
      <h2 className="font-poppins text-lg font-bold text-[#1e293b] mb-4">Non-Returnable Items</h2>
      <div className="bg-[#fef2f2] rounded-2xl border border-[#fca5a5] p-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NON_RETURNABLE.map(item=>(
            <div key={item} className="flex items-center gap-2 text-sm text-[#b91c1c]">
              <span className="text-[#ef4444]">✕</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* Refund methods */}
      <h2 className="font-poppins text-lg font-bold text-[#1e293b] mb-4">Refund Methods &amp; Timelines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {REFUND_METHODS.map(m=>(
          <div key={m.method} className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-4 flex items-center gap-4">
            <span className="text-2xl">{m.icon}</span>
            <div>
              <p className="text-sm font-semibold text-[#1e293b]">{m.method}</p>
              <p className="text-xs font-bold text-[#6366f1] mt-0.5">{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#eef2ff] rounded-2xl border border-[#c7d2fe] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-poppins text-base font-bold text-[#1e293b]">Need help with a return?</p>
          <p className="text-sm text-[#64748b] mt-0.5">Our team is happy to guide you through the process.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all">Contact Us</Link>
          <Link href="/orders" className="px-5 py-2.5 rounded-xl border border-[#c7d2fe] text-[#6366f1] text-sm font-semibold hover:bg-[#eef2ff] transition-all">My Orders</Link>
        </div>
      </div>
    </div>
  );
}
