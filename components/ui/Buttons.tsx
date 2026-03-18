"use client";
import React from "react";

export function GoldBtn({
  children, onClick, className = "", type = "button", disabled = false, fullWidth = false,
}: {
  children: React.ReactNode; onClick?: () => void; className?: string;
  type?: "button"|"submit"|"reset"; disabled?: boolean; fullWidth?: boolean;
}) {
  return (
    <>
      <button type={type} onClick={onClick} disabled={disabled}
        className={`gold-btn ${fullWidth ? "w-full" : ""} ${className}`}>
        {children}
      </button>
      <style>{`
        .gold-btn {
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:10px 20px;border-radius:8px;border:none;
          background:#6366f1;color:#fff;
          font-size:14px;font-weight:600;font-family:inherit;
          cursor:pointer;transition:background 0.18s,box-shadow 0.18s;
        }
        .gold-btn:hover:not(:disabled){background:#4f46e5;box-shadow:0 4px 14px rgba(99,102,241,0.35);}
        .gold-btn:disabled{opacity:0.55;cursor:not-allowed;}
      `}</style>
    </>
  );
}

export function GoldOutlineBtn({
  children, onClick, className = "",
}: { children: React.ReactNode; onClick?: () => void; className?: string; }) {
  return (
    <>
      <button onClick={onClick} className={`gold-outline-btn ${className}`}>{children}</button>
      <style>{`
        .gold-outline-btn {
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:10px 20px;border-radius:8px;
          background:transparent;color:#6366f1;border:1.5px solid #6366f1;
          font-size:14px;font-weight:600;font-family:inherit;
          cursor:pointer;transition:background 0.18s;
        }
        .gold-outline-btn:hover{background:#eef2ff;}
      `}</style>
    </>
  );
}

export function GhostBtn({
  children, onClick, className = "", danger = false,
}: { children: React.ReactNode; onClick?: () => void; className?: string; danger?: boolean; }) {
  return (
    <>
      <button onClick={onClick} className={`ghost-btn ${danger ? "ghost-btn--danger" : ""} ${className}`}>{children}</button>
      <style>{`
        .ghost-btn {
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:8px 14px;border-radius:8px;
          background:transparent;color:#64748b;border:1px solid #e2e8f0;
          font-size:13px;font-weight:500;font-family:inherit;
          cursor:pointer;transition:border-color 0.18s,color 0.18s,background 0.18s;
        }
        .ghost-btn:hover{border-color:#6366f1;color:#6366f1;background:#eef2ff;}
        .ghost-btn--danger:hover{border-color:#ef4444;color:#ef4444;background:#fef2f2;}
      `}</style>
    </>
  );
}
