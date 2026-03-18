import React from "react";

interface Props {
  title: string;
  subtitle: string;
  accent?: string;
  children: React.ReactNode;
}

export default function PageShell({ title, subtitle, accent = "Products", children }: Props) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 pb-16">
      <div className="mb-10">
        <h1 className="font-playfair text-4xl font-bold mb-2">
          {title} <em className="italic" style={{ color:"#e8c97a" }}>{accent}</em>
        </h1>
        <p className="text-sm" style={{ color:"#6b7290" }}>{subtitle}</p>
        <div className="mt-4 h-px w-24" style={{ background:"linear-gradient(90deg,#c9a84c,transparent)" }}/>
      </div>
      {children}
    </div>
  );
}
