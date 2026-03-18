const BADGE_STYLES: Record<string, string> = {
  new: "bg-[#c9a84c] text-[#080a0e]",
  hot: "bg-[#f97316] text-white",
  sale: "bg-[#ef4444] text-white",
};

export default function Badge({ type }: { type: "new" | "hot" | "sale" }) {
  return (
    <span
      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase z-10 ${BADGE_STYLES[type]}`}
    >
      {type}
    </span>
  );
}
