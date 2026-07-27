import { haptics } from "../utils/haptics";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import RatingBadge from "./RatingBadge";
import PriceTag from "./PriceTag";
import ProgressiveImage from "./ProgressiveImage";
import { useNavigation } from "../contexts/NavigationContext";
import { memo } from "react";

const MotionLink = motion.create(Link);

interface ServiceCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  originalPrice?: number;
  offerPrice?: number;
  lengthPricing?: boolean;
}

const ServiceCard = memo(function ServiceCard({ 
  id, name, image, rating, originalPrice, offerPrice, lengthPricing
}: ServiceCardProps) {
  const { setLastClickedId } = useNavigation();
  return (
    <MotionLink 
      to={`/service/${id}`}
      whileHover="hover"
      whileTap="tap"
      onClick={() => {
        haptics.tick();
        setLastClickedId(id);
      }}
      className="block group bg-bg-surface/50 backdrop-blur-sm border border-white/5 rounded-[24px] overflow-hidden transition-colors duration-300 hover:bg-bg-surface hover:border-accent-green/50 hover:shadow-[0_8px_24px_rgba(34,165,89,0.1)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden p-1.5 pb-0">
        <motion.div 
          variants={{
            hover: { y: -2 },
            tap: { scale: 0.96, y: 0 }
          }}
          className="relative w-full h-full rounded-[20px] overflow-hidden"
        >
          <ProgressiveImage 
            variants={{
              hover: { scale: 1.08 },
              tap: { scale: 1.02 }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            src={image} 
            alt={name} 
            className="w-full h-full object-cover origin-center"
          />
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            <RatingBadge rating={rating} className="bg-black/40 backdrop-blur-md border border-white/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-80" />
        </motion.div>
      </div>
      
      <div className="p-4 pt-3">
        <h3 className="font-bold text-text-primary text-[15px] mb-2 line-clamp-1 group-hover:text-accent-green transition-colors">{name}</h3>
        {lengthPricing ? (
          <span className="text-accent-green text-sm font-semibold">Varies by length</span>
        ) : (
          <PriceTag originalPrice={originalPrice} offerPrice={offerPrice} size="sm" />
        )}
      </div>
    </MotionLink>
  );
});
export default ServiceCard;
