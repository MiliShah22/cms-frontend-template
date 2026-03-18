"use client";
import { useEffect, useState } from "react";

// Simple event-based toast system
type ToastData = { msg: string; id: number };

const listeners: Array<(data: ToastData) => void> = [];

export function showToast(msg: string) {
  const data = { msg, id: Date.now() };
  listeners.forEach((l) => l(data));
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (data: ToastData) => {
      setToasts((prev) => [...prev, data]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== data.id));
      }, 3000);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#c9a84c] text-[13px] font-medium min-w-[260px] animate-slideIn"
          style={{
            background: "#13161f",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.18)",
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span style={{ color: "#eef0f6" }}>{t.msg}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease; }
      `}</style>
    </div>
  );
}
