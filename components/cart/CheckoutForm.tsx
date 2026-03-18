"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, selectCartItems } from "@/store/slices/cartSlice";
import { GoldBtn } from "@/components/ui/Buttons";

const PAY_METHODS = [
  { id:"card",       label:"Card",        icon:"💳" },
  { id:"upi",        label:"UPI",         icon:"📲" },
  { id:"netbanking", label:"Net Banking", icon:"🏦" },
  { id:"cod",        label:"COD",         icon:"💵" },
];

export default function CheckoutForm() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const items    = useAppSelector(selectCartItems);

  const [payMethod, setPayMethod] = useState("card");
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"Gujarat", pin:"", country:"India",
    cardNumber:"", cardExpiry:"", cardCvv:"", cardName:"",
  });

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName)  e.lastName  = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length < 10)    e.phone = "Valid phone required";
    if (!form.address) e.address = "Required";
    if (!form.city)    e.city    = "Required";
    if (form.pin.length < 5) e.pin = "Valid PIN required";
    if (payMethod === "card") {
      if (form.cardNumber.replace(/\s/g,"").length < 16) e.cardNumber = "Valid 16-digit card required";
      if (!form.cardExpiry) e.cardExpiry = "Required";
      if (form.cardCvv.length < 3) e.cardCvv = "3-digit CVV required";
      if (!form.cardName)   e.cardName   = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    dispatch(clearCart());
    router.push("/confirmation");
  }

  const inp = (key: string) =>
    `w-full px-4 py-3 rounded-[9px] border bg-[#0f1117] text-sm outline-none transition-colors focus:border-[#c9a84c] ${errors[key] ? "border-[#f87171]" : "border-[#252b3d]"}`;

  return (
    <div className="flex flex-col gap-5">
      {/* Shipping */}
      <section className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-6">
        <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color:"#eef0f6" }}>
          <span style={{ color:"#c9a84c" }}>📍</span> Shipping Address
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key:"firstName", label:"First Name",   placeholder:"Aryan",                   span:1 },
            { key:"lastName",  label:"Last Name",    placeholder:"Kapoor",                  span:1 },
            { key:"email",     label:"Email",        placeholder:"aryan@email.com",          span:2, type:"email" },
            { key:"phone",     label:"Phone",        placeholder:"+91 98765 43210",          span:2, type:"tel"   },
            { key:"address",   label:"Street Address",placeholder:"Flat 4B, MG Road",       span:2 },
            { key:"city",      label:"City",         placeholder:"Ahmedabad",               span:1 },
            { key:"pin",       label:"PIN Code",     placeholder:"380001",                  span:1 },
          ].map((f) => (
            <div key={f.key} className={f.span===2 ? "col-span-2" : ""}>
              <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>{f.label}</label>
              <input type={f.type||"text"} placeholder={f.placeholder}
                value={(form as Record<string,string>)[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                className={inp(f.key)} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {errors[f.key] && <p className="text-[11px] mt-1" style={{ color:"#f87171" }}>{errors[f.key]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>State</label>
            <select value={form.state} onChange={(e) => set("state", e.target.value)}
              className={inp("state")} style={{ color:"#eef0f6", fontFamily:"inherit" }}>
              {["Gujarat","Maharashtra","Delhi","Karnataka","Tamil Nadu","Rajasthan","UP"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>Country</label>
            <select value={form.country} onChange={(e) => set("country", e.target.value)}
              className={inp("country")} style={{ color:"#eef0f6", fontFamily:"inherit" }}>
              {["India","USA","UK","UAE","Singapore"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="rounded-2xl border border-[#1e2232] bg-[#13161f] p-6">
        <h3 className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color:"#eef0f6" }}>
          <span style={{ color:"#c9a84c" }}>💳</span> Payment Method
        </h3>
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {PAY_METHODS.map((m) => (
            <button key={m.id} onClick={() => setPayMethod(m.id)}
              className="py-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all duration-200"
              style={ payMethod===m.id
                ? { borderColor:"#c9a84c", background:"rgba(201,168,76,0.1)" }
                : { borderColor:"#252b3d", background:"#0f1117" }}>
              <span className="text-xl">{m.icon}</span>
              <span className="text-[11px] font-bold" style={{ color:payMethod===m.id?"#e8c97a":"#8e96b5" }}>{m.label}</span>
            </button>
          ))}
        </div>

        {payMethod === "card" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>Card Number</label>
              <input placeholder="4242  4242  4242  4242" maxLength={19}
                value={form.cardNumber}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g,"").slice(0,16);
                  set("cardNumber", v.replace(/(.{4})/g,"$1 ").trim());
                }}
                className={inp("cardNumber")} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {errors.cardNumber && <p className="text-[11px] mt-1" style={{ color:"#f87171" }}>{errors.cardNumber}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>Expiry</label>
              <input placeholder="MM / YY" maxLength={7} value={form.cardExpiry}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g,"").slice(0,4);
                  set("cardExpiry", v.length > 2 ? v.slice(0,2)+" / "+v.slice(2) : v);
                }}
                className={inp("cardExpiry")} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {errors.cardExpiry && <p className="text-[11px] mt-1" style={{ color:"#f87171" }}>{errors.cardExpiry}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>CVV</label>
              <input placeholder="•••" maxLength={3} type="password" value={form.cardCvv}
                onChange={(e) => set("cardCvv", e.target.value.replace(/\D/g,"").slice(0,3))}
                className={inp("cardCvv")} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {errors.cardCvv && <p className="text-[11px] mt-1" style={{ color:"#f87171" }}>{errors.cardCvv}</p>}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>Name on Card</label>
              <input placeholder="Aryan Kapoor" value={form.cardName}
                onChange={(e) => set("cardName", e.target.value)}
                className={inp("cardName")} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
              {errors.cardName && <p className="text-[11px] mt-1" style={{ color:"#f87171" }}>{errors.cardName}</p>}
            </div>
          </div>
        )}
        {payMethod === "upi" && (
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>UPI ID</label>
            <input placeholder="yourname@upi" className={inp("upi")} style={{ color:"#eef0f6", fontFamily:"inherit" }}/>
          </div>
        )}
        {payMethod === "cod" && (
          <p className="text-sm py-3 px-4 rounded-xl border border-[#252b3d]" style={{ color:"#8e96b5", background:"#0f1117" }}>
            Pay in cash when your order is delivered. ₹40 COD charge applies.
          </p>
        )}
        {payMethod === "netbanking" && (
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color:"#6b7290" }}>Select Bank</label>
            <select className={inp("bank")} style={{ color:"#eef0f6", fontFamily:"inherit" }}>
              {["SBI","HDFC","ICICI","Axis","Kotak","Yes Bank"].map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        )}
      </section>

      <GoldBtn onClick={handlePlaceOrder} disabled={loading || items.length === 0} fullWidth>
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing…
          </>
        ) : <>🔒 Place Order</>}
      </GoldBtn>
    </div>
  );
}
