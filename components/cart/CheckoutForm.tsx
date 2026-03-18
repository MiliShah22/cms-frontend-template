"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, selectCartItems } from "@/store/slices/cartSlice";

const PAY = [
  { id:"card",       label:"Card",        icon:"💳" },
  { id:"upi",        label:"UPI",         icon:"📲" },
  { id:"netbanking", label:"Net Banking", icon:"🏦" },
  { id:"cod",        label:"COD",         icon:"💵" },
];

export default function CheckoutForm() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const items    = useAppSelector(selectCartItems);

  const [pay,     setPay]    = useState("card");
  const [loading, setLoading]= useState(false);
  const [errors,  setErrors] = useState<Record<string,string>>({});
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"Gujarat", pin:"", country:"India",
    cardNumber:"", cardExpiry:"", cardCvv:"", cardName:"",
  });

  function set(key: string, val: string) {
    setForm((f)=>({ ...f, [key]:val })); setErrors((e)=>({ ...e, [key]:"" }));
  }

  function validate() {
    const e: Record<string,string> = {};
    if (!form.firstName) e.firstName="Required";
    if (!form.lastName)  e.lastName="Required";
    if (!form.email.includes("@")) e.email="Valid email required";
    if (form.phone.length<10) e.phone="Valid phone required";
    if (!form.address) e.address="Required";
    if (!form.city)    e.city="Required";
    if (form.pin.length<5) e.pin="Valid PIN required";
    if (pay==="card") {
      if (form.cardNumber.replace(/\s/g,"").length<16) e.cardNumber="16-digit card required";
      if (!form.cardExpiry) e.cardExpiry="Required";
      if (form.cardCvv.length<3) e.cardCvv="3-digit CVV required";
      if (!form.cardName) e.cardName="Required";
    }
    setErrors(e); return Object.keys(e).length===0;
  }

  async function handlePlace() {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r)=>setTimeout(r,1200));
    dispatch(clearCart());
    router.push("/confirmation");
  }

  const iCls = (k: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:border-[#6366f1] bg-[#f8fafc] text-[#1e293b] ${errors[k]?"border-[#ef4444]":"border-[#e2e8f0]"}`;

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
        <div className="grid grid-cols-2 gap-4">
          {[
            { key:"firstName", label:"First Name",    ph:"Aryan",               span:1 },
            { key:"lastName",  label:"Last Name",     ph:"Kapoor",              span:1 },
            { key:"email",     label:"Email Address", ph:"aryan@email.com",     span:2, type:"email" },
            { key:"phone",     label:"Phone Number",  ph:"+91 98765 43210",     span:2, type:"tel" },
            { key:"address",   label:"Street Address",ph:"Flat 4B, MG Road",   span:2 },
            { key:"city",      label:"City",          ph:"Ahmedabad",           span:1 },
            { key:"pin",       label:"PIN Code",      ph:"380001",              span:1 },
          ].map((f)=>(
            <div key={f.key} className={f.span===2?"col-span-2":""}>
              <Label>{f.label}</Label>
              <input type={f.type||"text"} placeholder={f.ph}
                value={(form as Record<string,string>)[f.key]}
                onChange={(e)=>set(f.key,e.target.value)}
                className={iCls(f.key)} style={{ fontFamily:"inherit" }}/>
              {errors[f.key] && <p className="text-[11px] mt-1 text-[#ef4444]">{errors[f.key]}</p>}
            </div>
          ))}
          <div>
            <Label>State</Label>
            <select value={form.state} onChange={(e)=>set("state",e.target.value)}
              className={iCls("state")} style={{ fontFamily:"inherit" }}>
              {["Gujarat","Maharashtra","Delhi","Karnataka","Tamil Nadu","Rajasthan","UP"].map((s)=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Country</Label>
            <select value={form.country} onChange={(e)=>set("country",e.target.value)}
              className={iCls("country")} style={{ fontFamily:"inherit" }}>
              {["India","USA","UK","UAE","Singapore"].map((c)=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center font-bold">2</span>
          Payment Method
        </h3>
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {PAY.map((m)=>(
            <button key={m.id} onClick={()=>setPay(m.id)}
              className="py-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all"
              style={ pay===m.id
                ? { borderColor:"#6366f1", background:"#eef2ff" }
                : { borderColor:"#e2e8f0", background:"#f8fafc" }}>
              <span className="text-xl">{m.icon}</span>
              <span className="text-[11px] font-bold" style={{ color:pay===m.id?"#6366f1":"#64748b" }}>{m.label}</span>
            </button>
          ))}
        </div>

        {pay==="card" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Card Number</Label>
              <input placeholder="4242  4242  4242  4242" maxLength={19} value={form.cardNumber}
                onChange={(e)=>{ const v=e.target.value.replace(/\D/g,"").slice(0,16); set("cardNumber",v.replace(/(.{4})/g,"$1 ").trim()); }}
                className={iCls("cardNumber")} style={{ fontFamily:"inherit" }}/>
              {errors.cardNumber && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.cardNumber}</p>}
            </div>
            <div>
              <Label>Expiry</Label>
              <input placeholder="MM / YY" maxLength={7} value={form.cardExpiry}
                onChange={(e)=>{ const v=e.target.value.replace(/\D/g,"").slice(0,4); set("cardExpiry",v.length>2?v.slice(0,2)+" / "+v.slice(2):v); }}
                className={iCls("cardExpiry")} style={{ fontFamily:"inherit" }}/>
              {errors.cardExpiry && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.cardExpiry}</p>}
            </div>
            <div>
              <Label>CVV</Label>
              <input placeholder="•••" maxLength={3} type="password" value={form.cardCvv}
                onChange={(e)=>set("cardCvv",e.target.value.replace(/\D/g,"").slice(0,3))}
                className={iCls("cardCvv")} style={{ fontFamily:"inherit" }}/>
              {errors.cardCvv && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.cardCvv}</p>}
            </div>
            <div className="col-span-2">
              <Label>Name on Card</Label>
              <input placeholder="Aryan Kapoor" value={form.cardName}
                onChange={(e)=>set("cardName",e.target.value)}
                className={iCls("cardName")} style={{ fontFamily:"inherit" }}/>
              {errors.cardName && <p className="text-[11px] mt-1 text-[#ef4444]">{errors.cardName}</p>}
            </div>
          </div>
        )}
        {pay==="upi" && (
          <div>
            <Label>UPI ID</Label>
            <input placeholder="yourname@upi" className={iCls("upi")} style={{ fontFamily:"inherit" }}/>
          </div>
        )}
        {pay==="cod" && (
          <p className="text-sm py-3 px-4 rounded-xl border border-[#e2e8f0] bg-[#fffbeb] text-[#64748b]">
            Pay in cash when your order is delivered. ₹40 COD charge applies.
          </p>
        )}
        {pay==="netbanking" && (
          <div>
            <Label>Select Bank</Label>
            <select className={iCls("bank")} style={{ fontFamily:"inherit" }}>
              {["SBI","HDFC","ICICI","Axis","Kotak","Yes Bank"].map((b)=><option key={b}>{b}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Place order */}
      <button onClick={handlePlace} disabled={loading||items.length===0}
        className="w-full py-4 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        style={{ fontFamily:"inherit" }}>
        {loading ? (
          <>
            <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Processing…
          </>
        ) : (
          <>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Place Order
          </>
        )}
      </button>
    </div>
  );
}
