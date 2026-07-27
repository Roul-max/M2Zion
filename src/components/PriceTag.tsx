import { cn } from "../lib/utils";

interface PriceTagProps {
  originalPrice?: number;
  offerPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PriceTag({ originalPrice, offerPrice, className, size = "md" }: PriceTagProps) {
  if (originalPrice === undefined && offerPrice === undefined) return null;
  
  const hasOffer = originalPrice && offerPrice && originalPrice > offerPrice;
  const currentPrice = offerPrice || originalPrice;
  
  let percentSaved = 0;
  if (hasOffer) {
    percentSaved = Math.round((1 - offerPrice! / originalPrice!) * 100);
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="flex items-baseline gap-2">
        {hasOffer && (
          <span className={cn(
            "text-text-secondary line-through",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
          )}>
            ₹{originalPrice}
          </span>
        )}
        <span className={cn(
          "font-bold text-accent-green",
          size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg"
        )}>
          ₹{currentPrice}
        </span>
      </div>
      
      {hasOffer && percentSaved > 0 && (
        <span className={cn(
          "bg-accent-green-soft text-accent-green font-medium rounded-full",
          size === "sm" ? "px-1.5 py-0.5 text-[10px]" : size === "lg" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"
        )}>
          Save {percentSaved}%
        </span>
      )}
    </div>
  );
}
