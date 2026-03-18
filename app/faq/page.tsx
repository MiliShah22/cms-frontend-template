"use client";
import { useState } from "react";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    title:"Orders & Delivery", icon:"🚚",
    faqs:[
      { q:"How long does delivery take?", a:"Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for select pin codes at an additional ₹99. Orders above ₹999 qualify for free standard shipping." },
      { q:"Can I track my order?", a:"Yes! Once your order is shipped, you'll receive a tracking number via email and SMS. You can also view real-time tracking under My Orders in your account." },
      { q:"Do you deliver across India?", a:"We deliver to 19,000+ pin codes across India. International shipping is available to UAE, Singapore, UK, and USA with delivery times of 7–14 business days." },
      { q:"What if I miss my delivery?", a:"Our courier partner will attempt delivery up to 3 times. After that, the package is held at the nearest facility for 7 days before being returned. You can request re-delivery from your account." },
    ],
  },
  {
    title:"Returns & Refunds", icon:"↩️",
    faqs:[
      { q:"What is the return policy?", a:"We offer hassle-free 30-day returns on most items. Products must be unused, in original packaging, with all tags intact. Electronics must be returned within 7 days of delivery." },
      { q:"How do I initiate a return?", a:"Go to My Orders, select the order, click 'Return Item', and choose your reason. A pickup will be scheduled within 24–48 hours. Refunds are processed within 5–7 business days." },
      { q:"When will I get my refund?", a:"Once we receive and inspect the returned item (usually 2–3 days), refunds are processed within 5–7 business days to your original payment method or as LUXE store credit (instant)." },
      { q:"Are there any items that can't be returned?", a:"Perishables, personalised items, downloadable software, intimate apparel, and beauty products that have been opened cannot be returned for hygiene reasons." },
    ],
  },
  {
    title:"Payments", icon:"💳",
    faqs:[
      { q:"What payment methods do you accept?", a:"We accept all major credit/debit cards (Visa, Mastercard, RuPay, Amex), UPI, net banking (50+ banks), wallets (Paytm, PhonePe, Amazon Pay), EMI, and Cash on Delivery." },
      { q:"Is my payment information secure?", a:"Absolutely. All transactions are secured with 256-bit SSL encryption. We don't store card details—payments are processed via PCI-DSS compliant gateways." },
      { q:"Can I pay in instalments?", a:"Yes! We offer no-cost EMI on orders above ₹3,000 with most major credit cards and with Bajaj Finserv, ZestMoney, and LazyPay. Options are shown at checkout." },
      { q:"How do coupon codes work?", a:"Enter your coupon code in the Order Summary section at checkout and click Apply. Valid codes: LUXE20 (20% off), SAVE10 (10% off), FIRST15 (15% off for new users)." },
    ],
  },
  {
    title:"Account & Security", icon:"🔒",
    faqs:[
      { q:"How do I create an account?", a:"Click 'Login' in the top navigation and select 'Create one'. You'll need to provide your name, email, and a password. You can also check out as a guest." },
      { q:"I forgot my password. What do I do?", a:"Click 'Forgot Password' on the login page and enter your registered email. We'll send a secure reset link valid for 1 hour." },
      { q:"How do I change my password?", a:"Log in to your account, go to My Account, and click 'Change Password'. You'll need to verify your current password before setting a new one." },
      { q:"Is my personal data safe?", a:"We take privacy seriously. Your personal data is never sold to third parties. Read our full Privacy Policy to understand exactly how we collect and use your information." },
    ],
  },
  {
    title:"Products", icon:"🛍️",
    faqs:[
      { q:"Are all products genuine?", a:"100% authentic products only. We source directly from brands and authorised distributors. Every product comes with a manufacturer warranty and official packaging." },
      { q:"How do I know if a product is in stock?", a:"Out-of-stock items show a 'Notify Me' button. We'll email you as soon as stock is replenished. Most popular items are restocked within 3–7 business days." },
      { q:"Can I cancel an order?", a:"Orders can be cancelled within 1 hour of placement from My Orders. After dispatch, you'll need to follow the standard return process once delivered." },
      { q:"How do I write a product review?", a:"After receiving your order, visit the product page and scroll to the Reviews section. You must have purchased the product to leave a 'Verified' review." },
    ],
  },
];

export default function FAQPage() {
  const [openSection, setOpenSection] = useState<number|null>(0);
  const [openFaq,     setOpenFaq]     = useState<string|null>(null);
  const [search, setSearch]           = useState("");

  const filteredSections = FAQ_SECTIONS.map(section => ({
    ...section,
    faqs: section.faqs.filter(f =>
      !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.faqs.length > 0);

  return (
    <div className="max-w-[860px] mx-auto px-6 md:px-10 py-10 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-poppins text-4xl font-bold text-[#0f172a] mb-3">
          Frequently Asked <span className="text-[#6366f1]">Questions</span>
        </h1>
        <p className="text-sm text-[#64748b] mb-6">Can&apos;t find your answer? <Link href="/contact" className="text-[#6366f1] font-semibold hover:underline">Contact our support team →</Link></p>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#e2e8f0] bg-white shadow-sm max-w-md mx-auto">
          <svg width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search FAQs…"
            className="flex-1 bg-transparent outline-none text-sm text-[#1e293b] placeholder:text-[#94a3b8]"
            style={{ fontFamily:"inherit" }}/>
          {search && <button onClick={()=>setSearch("")} className="text-xs text-[#94a3b8] hover:text-[#ef4444]">✕</button>}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {FAQ_SECTIONS.map((s,i)=>(
          <button key={s.title} onClick={()=>setOpenSection(openSection===i?null:i)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all"
            style={openSection===i?{background:"#6366f1",borderColor:"#6366f1",color:"#fff"}:{background:"#fff",borderColor:"#e2e8f0",color:"#64748b"}}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* FAQ accordions */}
      {(search ? filteredSections : openSection!==null ? [FAQ_SECTIONS[openSection]] : FAQ_SECTIONS).map((section)=>(
        <div key={section.title} className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{section.icon}</span>
            <h2 className="font-poppins text-base font-bold text-[#1e293b]">{section.title}</h2>
          </div>
          <div className="flex flex-col gap-2">
            {section.faqs.map((faq)=>{
              const key = `${section.title}:${faq.q}`;
              const isOpen = openFaq===key;
              return (
                <div key={key} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm transition-all">
                  <button onClick={()=>setOpenFaq(isOpen?null:key)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#f8fafc]">
                    <span className="text-sm font-semibold text-[#1e293b] pr-4">{faq.q}</span>
                    <span className="text-lg flex-shrink-0 transition-transform" style={{ transform:isOpen?"rotate(45deg)":"rotate(0deg)" }}>
                      {isOpen ? "×" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 border-t border-[#f1f5f9]">
                      <p className="text-sm text-[#64748b] leading-6 pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {search && filteredSections.length===0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold text-[#1e293b] mb-1">No results for &quot;{search}&quot;</p>
          <p className="text-sm text-[#94a3b8]">Try different keywords or <Link href="/contact" className="text-[#6366f1] hover:underline">contact us</Link></p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 bg-[#eef2ff] rounded-2xl border border-[#c7d2fe] p-8 text-center">
        <p className="text-2xl mb-3">💬</p>
        <h3 className="font-poppins text-lg font-bold text-[#1e293b] mb-2">Still have questions?</h3>
        <p className="text-sm text-[#64748b] mb-5">Our support team is available Mon–Sat, 9 AM – 7 PM IST</p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all shadow-sm">
          Contact Support →
        </Link>
      </div>
    </div>
  );
}
