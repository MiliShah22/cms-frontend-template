"use client";
import { useEffect, useState } from "react";

type ToastData = { msg:string; id:number };
const listeners: Array<(d:ToastData)=>void> = [];

export function showToast(msg: string) {
  const d = { msg, id:Date.now() };
  listeners.forEach((l)=>l(d));
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(()=>{
    const handler = (d: ToastData) => {
      setToasts((p)=>[...p,d]);
      setTimeout(()=>setToasts((p)=>p.filter((t)=>t.id!==d.id)),3000);
    };
    listeners.push(handler);
    return ()=>{ const i=listeners.indexOf(handler); if(i>-1)listeners.splice(i,1); };
  },[]);

  return (
    <div className="fixed bottom-5 right-5 z-[9998] flex flex-col gap-2.5">
      {toasts.map((t)=>(
        <div key={t.id}
          className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#c7d2fe] bg-white text-[13px] font-medium min-w-[260px] shadow-xl"
          style={{ animation:"slideIn 0.3s ease" }}>
          <div className="w-6 h-6 rounded-full bg-[#6366f1] flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span className="text-[#1e293b]">{t.msg}</span>
        </div>
      ))}
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
