import { haptics } from "../utils/haptics";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Tag, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import ProgressiveImage from "./ProgressiveImage";

interface Offer {
  id: number;
  image: string;
  title: string;
  description: string;
  shortDescription?: string;
  discount: string;
  code: string;
  gradient: string;
}

interface SpecialOfferCarouselProps {
  offers: Offer[];
}

export default function SpecialOfferCarousel({ offers }: SpecialOfferCarouselProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(slideTimer);
  }, [offers.length]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    const swipeThreshold = 50;

    if (swipe < -swipeThreshold) {
      haptics.tick();
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    } else if (swipe > swipeThreshold) {
      haptics.tick();
      setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <motion.div layoutId={`offer-card-${offers[currentIndex].id}`} className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-bg-surface group shadow-2xl shadow-black/50 border border-white/5 cursor-grab active:cursor-grabbing">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <ProgressiveImage 
            src={offers[currentIndex].image} 
            alt={offers[currentIndex].title} 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          {/* Dynamic Gradient Background */}
          <div className={cn("absolute inset-0 mix-blend-multiply opacity-30", offers[currentIndex].gradient)} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent opacity-70" />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              
              <div className="bg-accent-green text-black font-black text-sm px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(34,165,89,0.3)] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {offers[currentIndex].discount}
              </div>
            </div>
            
            <div className="relative z-10 mb-2">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-black text-white mb-2 leading-[1.1] tracking-tight drop-shadow-lg"
              >
                {offers[currentIndex].title}
              </motion.h3>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <p className="text-white/80 text-sm font-medium">
                  {offers[currentIndex].shortDescription || offers[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onTap={() => {
          haptics.tick();
          navigate(`/offer/${offers[currentIndex].id}`);
        }}
      />
      </motion.div>
      {/* Pagination Dots */}
      <div className="w-full flex justify-center gap-2 items-center">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex ? "w-6 bg-accent-green" : "w-2 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
