import Link from "next/link";

const SHIPPING_OPTIONS = [
  { name:"Standard Delivery",  time:"3–5 business days",  cost:"Free above ₹999 · ₹49 below", icon:"📦", color:"#6366f1", bg:"#eef2ff" },
  { name:"Express Delivery",   time:"1–2 business days",  cost:"₹99 flat rate",                icon:"⚡", color:"#f59e0b", bg:"#fffbeb" },
  { name:"Same Day Delivery",  time:"Within 6–8 hours",   cost:"₹199 · Select cities only",    icon:"🚀", color:"#10b981", bg:"#f0fdf4" },
  { name:"International",      time:"7–14 business days", cost:"Calculated at checkout",        icon:"✈️", color:"#a855f7", bg:"#fdf4ff" },
];

const SECTIONS = [
  {
    title:"Processing Time",
    content:[
      "Orders are processed within 1–2 business days of placement (excluding weekends and public holidays).",
      "During sale events and peak seasons, processing may take up to 3 business days.",
      "You'll receive a confirmation email with a tracking number as soon as your order ships.",
    ],
  },
  {
    title:"Delivery Partners",
    content:[
      "We partner with leading logistics providers including Delhivery, BlueDart, DTDC, FedEx, and Ekart.",
      "The courier is assigned automatically based on your pin code and availability.",
      "For premium orders above ₹50,000, we use specially insured courier services.",
    ],
  },
  {
    title:"International Shipping",
    content:[
      "We currently ship to UAE, Singapore, United Kingdom, and United States.",
      "International orders may be subject to customs duties and taxes levied by the destination country. These charges are the buyer's responsibility.",
      "We cannot ship certain items internationally due to country-specific regulations.",
    ],
  },
  {
    title:"Undelivered & Returned Packages",
    content:[
      "If delivery fails after 3 attempts, the package is held at the courier facility for 7 days.",
      "After 7 days, uncollected packages are returned to us and a refund is initiated (less the shipping cost).",
      "For wrong address or rejection at delivery, reshipping charges will apply.",
    ],
  },
  {
    title:"Damaged in Transit",
    content:[
      "If your package arrives damaged, take photos immediately and contact us within 48 hours of delivery.",
      "We'll arrange for a replacement or full refund, including shipping costs, at no extra charge to you.",
      "Do not discard packaging until the issue is resolved — we may request it as proof.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-[860px] mx-auto px-6 md:px-10 py-10 pb-16">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#6366f1] transition-colors mb-4">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>Home
        </Link>
        <h1 className="font-poppins text-4xl font-bold text-[#0f172a] mb-2">Shipping <span className="text-[#6366f1]">Policy</span></h1>
        <p className="text-sm text-[#64748b]">Last updated: March 2026</p>
        <div className="mt-4 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>

      {/* Shipping options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {SHIPPING_OPTIONS.map(opt=>(
          <div key={opt.name} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm flex items-start gap-4 hover:border-[#6366f1] transition-all">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background:opt.bg }}>{opt.icon}</div>
            <div>
              <p className="text-sm font-bold text-[#1e293b]">{opt.name}</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color:opt.color }}>{opt.time}</p>
              <p className="text-xs text-[#94a3b8] mt-0.5">{opt.cost}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Policy sections */}
      <div className="flex flex-col gap-6">
        {SECTIONS.map(s=>(
          <div key={s.title} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
            <h2 className="font-poppins text-base font-bold text-[#1e293b] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-[#6366f1] inline-block"/>
              {s.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {s.content.map((c,i)=>(
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#64748b] leading-6">
                  <span className="text-[#6366f1] mt-0.5 flex-shrink-0">•</span>{c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 bg-[#eef2ff] rounded-2xl border border-[#c7d2fe] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-poppins text-base font-bold text-[#1e293b]">Have shipping questions?</p>
          <p className="text-sm text-[#64748b] mt-0.5">Our support team can track your order or clarify shipping details.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all">Contact Us</Link>
          <Link href="/faq" className="px-5 py-2.5 rounded-xl border border-[#c7d2fe] text-[#6366f1] text-sm font-semibold hover:bg-[#eef2ff] transition-all">FAQ</Link>
        </div>
      </div>
    </div>
  );
}
