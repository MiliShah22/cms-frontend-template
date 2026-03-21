"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe } from "@/hooks/useStripe";

const PAY = [
  { id: "card", label: "Stripe Card", icon: "💳" },
  { id: "upi", label: "UPI", icon: "📲" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cod", label: "COD", icon: "💵" },
];

interface CheckoutFormProps {
  stripePromise: Promise<any>;
}

function CheckoutFormInner() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [pay, setPay] = useState("card");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "Gujarat", pin: "", country: "India",
  });

  async function createPaymentIntent() {
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    });
    const { clientSecret: secret } = await response.json();
    setClientSecret(secret);
  }

  useEffect(() => {
    if (pay === 'card') {
      createPaymentIntent();
    }
  }, [pay, total]);

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (form.pin.length < 5) e.pin = "Valid PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !stripe || !elements || !clientSecret) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          address: {
            line1: form.address,
            city: form.city,
            state: form.state,
            postal_code: form.pin,
          }
        }
      }
    });

    if (error) {
      setErrors({ stripe: error.message || 'Payment failed' });
    } else if (paymentIntent?.status === 'succeeded') {
      dispatch(clearCart());
      router.push('/confirmation');
    }
    setLoading(false);
  };

  const iCls = (k: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:border-[#6366f1] bg-[#f8fafc] text-[#1e293b] ${errors[k] ? "border-[#ef4444]" : "border-[#e2e8f0]"}`;

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-semibold mb-1.5 text-[#64748b] tracking-wide">{children}</label>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Shipping */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center font-bold">1</span>
          Shipping Address
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "firstName", label: "First Name", ph: "Aryan", span: 1 },
              { key: "lastName", label: "Last Name", ph: "Kapoor", span: 1 },
              { key: "email", label: "Email Address", ph: "aryan@email.com", span: 2, type: "email" },
              { key: "phone", label: "Phone Number", ph: "+91 98765 43210", span: 2, type: "tel" },
              { key: "address", label: "Street Address", ph: "Flat 4B, MG Road", span: 2 },
              { key: "city", label: "City", ph: "Ahmedabad", span: 1 },
              { key: "pin", label: "PIN Code", ph: "380001", span: 1 },
            ].map((f) => (
              <div key={f.key} className={f.span === 2 ? "col-span-2" : ""}>
                <Label>{f.label}</Label>
                <input
                  type={f.type || "text"}
                  placeholder={f.ph}
                  value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={iCls(f.key)}
                  style={{ fontFamily: "inherit" }}
                />
                {errors[f.key] && <p className="text-[11px] mt-1 text-[#ef4444]">{errors[f.key]}</p>}
              </div>
            ))}
            <div>
              <Label>State</Label>
              <select value={form.state} onChange={(e) => set("state", e.target.value)} className={iCls("state")} style={{ fontFamily: "inherit" }}>
                {["Gujarat", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Rajasthan", "UP"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label>Country</Label>
              <select value={form.country} onChange={(e) => set("country", e.target.value)} className={iCls("country")} style={{ fontFamily: "inherit" }}>
                {["India", "USA", "UK", "UAE", "Singapore"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center font-bold">2</span>
              Payment Method
            </h3>
            <div className="grid grid-cols-4 gap-2.5 mb-5">
              {PAY.map((m) => (
                <button key={m.id} onClick={() => setPay(m.id)} className="py-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all"
                  style={pay === m.id ? { borderColor: "#6366f1", background: "#eef2ff" } : { borderColor: "#e2e8f0", background: "#f8fafc" }}>
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-[11px] font-bold" style={{ color: pay === m.id ? "#6366f1" : "#64748b" }}>{m.label}</span>
                </button>
              ))}
            </div>

            {pay === "card" && (
              <div>
                <Label>Card details</Label>
                <div className={iCls('card')}>
                  <CardElement options={{
                    style: {
                      base: {
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        color: '#1e293b',
                        '::placeholder': {
                          color: '#94a3b8',
                        },
                      },
                    },
                  }} />
                </div>
                {errors.stripe && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.stripe}</p>}
              </div>
            )}
            {pay === "upi" && (
              <div>
                <Label>UPI ID</Label>
                <input placeholder="yourname@upi" className={iCls("upi")} style={{ fontFamily: "inherit" }} onChange={(e) => set("upi", e.target.value)} />
              </div>
            )}
            {pay === "cod" && (
              <p className="text-sm py-3 px-4 rounded-xl border border-[#e2e8f0] bg-[#fffbeb] text-[#64748b]">
                Pay in cash when your order is delivered. ₹40 COD charge applies.
              </p>
            )}
            {pay === "netbanking" && (
              <div>
                <Label>Select Bank</Label>
                <select className={iCls("bank")} style={{ fontFamily: "inherit" }}>
                  {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank"].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Place order */}
      <button type="submit" disabled={loading || items.length === 0}
        className="w-full py-4 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        style={{ fontFamily: "inherit" }}>
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V8z" />
            </svg>
            Processing…
          </>
        ) : (
          <>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Pay ₹{total.toLocaleString()}
          </>
        )}
      </button>
    </div>
  );
}

export default function CheckoutForm({ stripePromise }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  );
}
