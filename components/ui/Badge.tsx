const BADGE_STYLES: Record<string, string> = {
  new:  "bg-[#eef2ff] text-[#6366f1]",
  hot:  "bg-[#fff7ed] text-[#f97316]",
  sale: "bg-[#fef2f2] text-[#ef4444]",
};
export default function Badge({ type }: { type:"new"|"hot"|"sale" }) {
  return (
    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase z-10 ${BADGE_STYLES[type]}`}>
      {type}
    </span>
  );
}
