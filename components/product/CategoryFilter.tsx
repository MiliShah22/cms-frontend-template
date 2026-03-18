"use client";
import { CATEGORIES } from "@/lib/products";

interface Props {
  active: string;
  onChange: (cat: string) => void;
  totalCount: number;
}

export default function CategoryFilter({ active, onChange, totalCount }: Props) {
  return (
    <div
      className="flex items-center justify-between px-10 py-3.5 border-b border-[#1e2232]"
      style={{ background: "linear-gradient(135deg,#0d1020 0%,#141828 50%,#0d1020 100%)" }}
    >
      <p className="text-[13px] hidden md:block" style={{ color: "#8e96b5" }}>
        Showing <span className="font-semibold" style={{ color: "#e8c97a" }}>{totalCount} products</span> across all categories
      </p>
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-200"
            style={
              active === cat
                ? { background: "#c9a84c", borderColor: "#c9a84c", color: "#080a0e" }
                : { background: "#13161f", borderColor: "#252b3d", color: "#8e96b5" }
            }
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
