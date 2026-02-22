import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number | null;
  count?: number | null;
}

export default function RatingBadge({ rating, count }: RatingBadgeProps) {
  if (!rating) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: "rgba(227,179,65,0.12)", color: "#E3B341" }}>
      <Star className="h-3 w-3 fill-current" />
      {rating.toFixed(1)}
      {count != null && <span className="text-white/30">({count})</span>}
    </span>
  );
}
