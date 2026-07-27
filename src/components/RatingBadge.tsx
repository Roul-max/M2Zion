import { Star } from "lucide-react";
import { cn } from "../lib/utils";

interface RatingBadgeProps {
  rating: number;
  reviews?: number;
  className?: string;
  size?: "sm" | "md";
}

export default function RatingBadge({ rating, reviews, className, size = "sm" }: RatingBadgeProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 bg-bg-base/80 backdrop-blur-sm rounded-full",
      size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
      className
    )}>
      <Star className={cn(
        "text-star-gold fill-star-gold",
        size === "sm" ? "w-3 h-3" : "w-4 h-4"
      )} />
      <span className="font-semibold text-text-primary">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-text-secondary ml-1">({reviews})</span>
      )}
    </div>
  );
}
