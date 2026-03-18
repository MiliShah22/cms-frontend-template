export default function StarRating({
  rating,
  reviews,
  size = "sm",
}: {
  rating: number;
  reviews: number;
  size?: "sm" | "md";
}) {
  const starSize = size === "md" ? "text-sm" : "text-[11px]";
  const textSize = size === "md" ? "text-[13px]" : "text-[11px]";

  return (
    <div className="flex items-center gap-2">
      <span className={`${starSize} tracking-wide`} style={{ color: "#c9a84c" }}>
        {"★".repeat(Math.floor(rating))}
        {rating % 1 >= 0.5 ? "½" : ""}
      </span>
      <span className={`${textSize}`} style={{ color: "#6b7290" }}>
        {rating} · {reviews.toLocaleString()} reviews
      </span>
    </div>
  );
}
