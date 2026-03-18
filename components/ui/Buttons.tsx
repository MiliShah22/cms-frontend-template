"use client";
import React from "react";

/* ── Gold primary button ── */
export function GoldBtn({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`gold-btn ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
      <style>{`
        .gold-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 24px; border-radius:12px; border:none;
          background:#c9a84c; color:#080a0e;
          font-size:15px; font-weight:700; font-family:inherit;
          cursor:pointer; transition:background 0.2s, box-shadow 0.2s;
        }
        .gold-btn:hover:not(:disabled) { background:#e8c97a; box-shadow:0 8px 30px rgba(201,168,76,0.3); }
        .gold-btn:disabled { opacity:0.55; cursor:not-allowed; }
      `}</style>
    </button>
  );
}

/* ── Gold outline button ── */
export function GoldOutlineBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={`gold-outline-btn ${className}`}>
      {children}
      <style>{`
        .gold-outline-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:14px 20px; border-radius:12px;
          background:transparent; color:#e8c97a;
          border:1px solid #c9a84c;
          font-size:15px; font-weight:700; font-family:inherit;
          cursor:pointer; transition:background 0.2s;
        }
        .gold-outline-btn:hover { background:rgba(201,168,76,0.1); }
      `}</style>
    </button>
  );
}

/* ── Ghost border button ── */
export function GhostBtn({
  children,
  onClick,
  className = "",
  danger = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}) {
  return (
    <button onClick={onClick} className={`ghost-btn ${danger ? "ghost-btn--danger" : ""} ${className}`}>
      {children}
      <style>{`
        .ghost-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:6px;
          padding:8px 16px; border-radius:9px;
          background:transparent; color:#8e96b5;
          border:1px solid #252b3d;
          font-size:13px; font-weight:600; font-family:inherit;
          cursor:pointer; transition:border-color 0.2s, color 0.2s;
        }
        .ghost-btn:hover { border-color:#c9a84c; color:#c9a84c; }
        .ghost-btn--danger:hover { border-color:#f87171; color:#f87171; }
      `}</style>
    </button>
  );
}
