export default function StarRating({ rating, reviews, size="sm" }: { rating:number; reviews:number; size?:"sm"|"md"; }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`${size==="md"?"text-sm":"text-xs"} text-[#f59e0b]`}>{"★".repeat(Math.floor(rating))}{rating%1>=0.5?"½":""}</span>
      <span className={`${size==="md"?"text-xs":"text-[11px]"} text-[#94a3b8]`}>{rating} ({reviews.toLocaleString()})</span>
    </div>
  );
}
