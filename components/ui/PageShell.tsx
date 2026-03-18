import React from "react";
interface Props { title:string; subtitle:string; accent?:string; children:React.ReactNode; }
export default function PageShell({ title, subtitle, accent="Products", children }: Props) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 pb-16">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl font-bold text-[#0f172a] mb-1">
          {title} <span className="text-[#6366f1]">{accent}</span>
        </h1>
        <p className="text-sm text-[#64748b]">{subtitle}</p>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#6366f1]"/>
      </div>
      {children}
    </div>
  );
}
