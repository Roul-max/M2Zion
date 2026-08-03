import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Clock, Sparkles, Heart, Star } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import { getServiceById } from "../data/services";
import RatingBadge from "../components/RatingBadge";
import PriceTag from "../components/PriceTag";
import LengthSelector from "../components/LengthSelector";
import ProgressiveImage from "../components/ProgressiveImage";
import { useState, useEffect, useRef } from "react";
import { haptics } from "../utils/haptics";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(Number(id));
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLength, setSelectedLength] = useState<"Small" | "Medium" | "Long">("Medium");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
          const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (el) el.scrollTop = 0;
    
    // Simulate network loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    if (!service) return;
    
    const timer = setInterval(() => {
      setDirection(1); setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 3500);
    
    return () => {
      clearTimeout(loadTimer);
      clearInterval(timer);
    };
  }, [service]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base relative overflow-hidden pb-6">
        {/* Hero Image Skeleton */}
        <div className="relative h-[440px] w-full bg-bg-surface-raised rounded-b-[40px] animate-[pulse_1.5s_ease-in-out_infinite]">
          {/* Header Actions Skeleton */}
          <div className="absolute top-0 left-0 w-full p-5 pt-12 flex justify-between">
            <div className="w-12 h-12 rounded-full bg-white/5" />
            <div className="w-12 h-12 rounded-full bg-white/5" />
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="px-5 -mt-8 relative z-20 space-y-6">
          {/* Title & Rating Skeleton */}
          <div>
            <div className="h-10 w-3/4 bg-bg-surface-raised rounded-lg mb-4 animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-6 w-1/3 bg-bg-surface-raised rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
          
          {/* Pricing Card Skeleton */}
          <div className="h-24 w-full bg-bg-surface-raised rounded-[28px] animate-[pulse_1.5s_ease-in-out_infinite]" />
          
          {/* Highlights Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-bg-surface-raised rounded-[24px] animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-20 bg-bg-surface-raised rounded-[24px] animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-6 w-1/2 bg-bg-surface-raised rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-4 w-full bg-bg-surface-raised rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-4 w-full bg-bg-surface-raised rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="h-4 w-2/3 bg-bg-surface-raised rounded-lg animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return <div className="p-8 text-center text-text-primary">Service not found</div>;
  }

  const handleBack = () => navigate(-1);
  
  // Create mock carousel images based on the main image
  const carouselImages = [
    service.image,
    "https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?auto=format&fit=crop&q=80&w=800&h=800",
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800&h=800",
  ];
  
  return (
    <PageTransition className="min-h-screen bg-bg-base pb-6 relative">
      {/* Hero Image Carousel */}
      <div className="relative w-full h-[450px] overflow-hidden bg-bg-base">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentImageIndex}
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0, x: direction > 0 ? 300 : direction < 0 ? -300 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : direction < 0 ? 300 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            
          >
            <ProgressiveImage 
              src={carouselImages[currentImageIndex]} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-bg-base/30 to-black/20 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-bg-base z-0" />

        {/* Swipe Overlay */}
        <motion.div
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;
            if (swipe < -50) {
              haptics.tick();
              setDirection(1);
              setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
            } else if (swipe > 50) {
              haptics.tick();
              setDirection(-1);
              setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
            }
          }}
        />
        
        {/* Top Nav */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 left-0 w-full p-5 pt-10 flex justify-between items-center z-20 pointer-events-none"
        >
          <button 
            onClick={handleBack}
            style={{ pointerEvents: "auto" }}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <motion.button 
              style={{ pointerEvents: "auto" }}
              onClick={() => { haptics.favorite(); setIsFavorite(!isFavorite); }}
              whileTap={{ scale: 0.8 }}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <motion.div
                initial={false}
                animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent-green text-accent-green" : ""}`} />
              </motion.div>
            </motion.button>
            <motion.button 
              style={{ pointerEvents: "auto" }}
              whileTap={{ scale: 0.9 }} 
              onClick={() => {
                haptics.tick();
                if (navigator.share) {
                  navigator.share({
                    title: service.name,
                    text: `Check out ${service.name} at M2Zion Salons!`,
                    url: window.location.href,
                  }).catch(console.error);
                }
              }}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 z-10">
          {carouselImages.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentImageIndex ? "w-8 bg-accent-green" : "w-1.5 bg-white/40"
              }`} 
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
        }}
        className="px-5 -mt-8 relative z-20"
      >
        {/* Title & Rating */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="mb-6">
          <h1 className="text-4xl font-black text-text-primary mb-3 tracking-tight">{service.name}</h1>
          <div className="flex items-center gap-3">
            <RatingBadge rating={service.rating || 5.0} reviews={service.reviews || 120} size="md" className="bg-bg-surface-raised border border-white/5" />
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="bg-bg-surface/60 backdrop-blur-md border border-white/5 rounded-[28px] p-6 mb-8 shadow-xl shadow-black/20">
          {service.lengthPricing ? (
            <LengthSelector 
              options={[
                { label: "Small", price: service.small as number },
                { label: "Medium", price: service.medium as number },
                { label: "Long", price: service.long as number },
              ]}
              selectedLabel={selectedLength}
              onSelect={setSelectedLength}
            />
          ) : (
            <PriceTag 
              originalPrice={service.originalPrice} 
              offerPrice={service.offerPrice} 
              size="lg" 
            />
          )}
        </motion.div>

        {/* Service Highlights */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="grid grid-cols-2 gap-3 mb-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-[24px] flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <p className="text-text-secondary text-xs">Duration</p>
              <p className="text-text-primary text-sm font-bold">45-60 min</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-[24px] flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <p className="text-text-secondary text-xs">Quality</p>
              <p className="text-text-primary text-sm font-bold">Premium</p>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="mb-10 text-text-secondary leading-relaxed">
          <h2 className="text-xl font-bold text-text-primary mb-3">About this service</h2>
          <p>
            Experience premium care with our specialized {service.name} service. 
            Designed to bring out your best look, this treatment uses top-tier 
            products and techniques to ensure you leave feeling refreshed and revitalized. 
            Perfect for maintaining your grooming routine or preparing for a special occasion.
          </p>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div ref={reviewsRef} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } }} className="pb-4 min-h-[300px]">
          <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
            Customer Reviews <span className="text-text-secondary text-sm font-normal">({service.reviews || 42})</span>
          </h2>
            <>
              <div className="flex flex-col gap-4">
                            {[
                { id: 1, name: "Priya S.", rating: 5, date: "2 weeks ago", text: `Absolutely loved it! The staff was so professional and the ${service.name} was amazing. Highly recommend this to anyone looking for premium care.` },
                { id: 2, name: "Ananya P.", rating: 4, date: "1 month ago", text: "Great experience overall. The ambiance is very relaxing and the service was top-notch." },
                { id: 3, name: "Rahul K.", rating: 5, date: "2 months ago", text: "Best salon visit I've had in a long time. They really pay attention to the details and make you feel special." },
                { id: 4, name: "Sneha M.", rating: 5, date: "3 months ago", text: "Incredible service, definitely coming back. The stylist took their time to understand exactly what I wanted." },
                { id: 5, name: "Amit T.", rating: 4, date: "3 months ago", text: "Very good experience. Professional staff and clean environment." }
              ].slice(0, isReviewsExpanded ? undefined : 2).map((review) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} key={review.id} className="bg-bg-surface border border-white/5 p-5 rounded-[24px]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-text-primary font-bold text-sm">{review.name}</h4>
                        <p className="text-text-secondary text-xs">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-star-gold fill-star-gold" : "text-white/10"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{review.text}</p>
                </motion.div>
              ))}
                        </div>
            {!isReviewsExpanded && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => { haptics.tick(); setIsReviewsExpanded(true); }}
                className="w-full mt-4 py-3 rounded-[16px] border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Show all reviews
              </motion.button>
            )}
            {isReviewsExpanded && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => { haptics.tick(); setIsReviewsExpanded(false); }}
                className="w-full mt-4 py-3 rounded-[16px] border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Show less
              </motion.button>
            )}
            </>
        </motion.div>
      </motion.div>

                        </PageTransition>
  );
}