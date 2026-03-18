"use client";
import { CATEGORIES } from "@/lib/products";
interface Props { active:string; onChange:(cat:string)=>void; totalCount:number; }
export default function CategoryFilter({ active, onChange, totalCount }: Props) {
  return (
    <div className="bg-white border-b border-[#e2e8f0] px-6 md:px-10 py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-[#64748b] hidden md:block flex-shrink-0">
        <span className="font-semibold text-[#1e293b]">{totalCount}</span> products
      </p>
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {CATEGORIES.map((cat)=>(
          <button key={cat} onClick={()=>onChange(cat)}
            className="px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all"
            style={ active===cat
              ? { background:"#6366f1", borderColor:"#6366f1", color:"#fff" }
              : { background:"#fff", borderColor:"#e2e8f0", color:"#64748b" }}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
