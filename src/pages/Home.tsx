import { haptics } from "../utils/haptics";
import React, { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Scissors, Palette, Droplets, Smile, Flower2, Wand2, Search } from "lucide-react";
import SearchBar from "../components/SearchBar";
import SpecialOfferCarousel from "../components/SpecialOfferCarousel";
import ServiceCard from "../components/ServiceCard";
import Skeleton from "../components/Skeleton";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import { useNavigation } from "../contexts/NavigationContext";
import { audioCues } from "../utils/audio";
import { categories } from "../data/services";
import { specialOffers } from "../data/offers";




const RevealedServiceItem = memo(function RevealedServiceItem({ item, index, lastClickedId, skipEntrance }: { key?: any; item: any; index: number; lastClickedId: string | null; skipEntrance?: boolean }) {
  return (
    <motion.div 
      layout
      key={item.id}
      id={`service-card-${item.id}`}
      initial={skipEntrance ? false : { opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        ...(lastClickedId === item.id ? {
          boxShadow: ["0px 0px 0px 0px rgba(34,165,89,0)", "0px 0px 30px 4px rgba(34,165,89,0.4)", "0px 0px 0px 0px rgba(34,165,89,0)"],
          scale: [1, 1.02, 1]
        } : {})
      }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.5, 
        delay: skipEntrance ? 0 : index * 0.08, 
        ease: [0.23, 1, 0.32, 1],
        ...(lastClickedId === item.id ? {
          boxShadow: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
          scale: { duration: 0.5, delay: 0.5 }
        } : {})
      }}
      className="rounded-[24px]"
    >
      <ServiceCard
        id={item.id!}
        name={item.name}
        image={item.image!}
        rating={item.rating!}
        originalPrice={item.originalPrice}
        offerPrice={item.offerPrice}
        lengthPricing={item.lengthPricing}
        scrollKey="home"
      />
    </motion.div>
  );
});

export default function Home() {

  const [activeCategory, setActiveCategory] = useState(() => {
    const saved = sessionStorage.getItem('m2zion_active_cat');
    return saved ? parseInt(saved, 10) : categories[0].id;
  });
  const [isLoading, setIsLoading] = useState(() => {
    const hasLoadedBefore = sessionStorage.getItem('m2zion_has_loaded');
    if (hasLoadedBefore) return false;
    return true;
  });
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem('m2zion_search') || "");
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [pullY, setPullY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pullStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const scroller = document.getElementById('scroll-root');
    if (scroller && scroller.scrollTop === 0) {
      pullStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const scroller = document.getElementById('scroll-root');
    if (isPulling && scroller && scroller.scrollTop <= 0) {
      const y = e.touches[0].clientY;
      const delta = y - pullStartY.current;
      if (delta > 0) {
        setPullY(Math.min(delta * 0.4, 100)); // Add resistance and cap at 100px
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling) {
      if (pullY > 60) {
        setIsRefreshing(true);
        haptics.heavy();
        
        // Refresh without replacing list with skeletons to preserve layout
        setTimeout(() => {
          setIsRefreshing(false);
        }, 1500);
      }
      setPullY(0);
      setIsPulling(false);
    }
  };

  const navigate = useNavigate();
  const { lastClickedId, setLastClickedId, saveScrollPosition } = useNavigation();

  useScrollRestoration('home');
  const hasScrollToRestore = !!sessionStorage.getItem('scroll_pos_home');

  useEffect(() => {
    sessionStorage.setItem('m2zion_active_cat', activeCategory.toString());
  }, [activeCategory]);

  useEffect(() => {
    sessionStorage.setItem('m2zion_search', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (isLoading) {
      // Simulate network fetching for better perceived performance
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('m2zion_has_loaded', 'true');
        
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const isSearching = searchQuery.trim().length > 0;
  
  let displayItems: any[] = [];
  let sectionTitle = "";
  
  if (isSearching) {
    const query = searchQuery.toLowerCase();
    displayItems = categories.flatMap(cat => 
      cat.items
        .filter(item => item.name.toLowerCase().includes(query))
        .map(item => ({ ...item, lengthPricing: cat.lengthPricing }))
    );
    sectionTitle = "Search Results";
  } else {
    const categoryData = categories.find(c => c.id === activeCategory);
    sectionTitle = categoryData?.name || "";
    displayItems = categoryData?.items.map(item => ({ ...item, lengthPricing: categoryData.lengthPricing })) || [];
  }

  // Apply sorting
  if (sortBy === "Price (Low-High)") {
    displayItems.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
  } else if (sortBy === "Price (High-Low)") {
    displayItems.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
  } else if (sortBy === "Rating") {
    displayItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === "Popularity") {
    displayItems.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }

  return (
    <PageTransition className="min-h-screen bg-bg-base pb-32 relative">
      <AnimatePresence>
        {(isPulling && pullY > 0) || isRefreshing ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: isRefreshing ? 60 : pullY }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full flex items-center justify-center overflow-hidden"
          >
            <motion.div 
              animate={{ rotate: isRefreshing ? 360 : pullY * 2 }}
              transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : { type: "spring", bounce: 0 }}
            >
              <Loader2 className="w-6 h-6 text-accent-green" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-accent-green/5 blur-[120px] pointer-events-none rounded-full -translate-y-1/2" />

      {/* Header */}
      <header className="px-5 pt-6 pb-4 sticky top-0 bg-bg-base/80 backdrop-blur-xl z-40 border-b border-white/5">
        <motion.div
           initial={hasScrollToRestore ? false : { opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <SearchBar 
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
          />
        </motion.div>
      </header>

      <main className="relative z-10">
        {/* Featured Section */}
        <AnimatePresence>
          {!isSearching && (
            <motion.section 
              initial={hasScrollToRestore ? false : { opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-8 mt-2 overflow-hidden  "
            >
              <div className="flex justify-between items-end mb-4 px-5">
                <h2 className="text-3xl font-black text-text-primary tracking-tight">Special Offers</h2>
                <button onClick={() => { saveScrollPosition('home'); navigate('/search'); }} className="text-base font-bold text-accent-green hover:opacity-80 transition-opacity">View All →</button>
              </div>
              
              {/* Auto-advancing Carousel */}
              <div className="px-5">
                {isLoading ? (
                  <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden bg-bg-surface/50 border border-white/5">
                     <Skeleton className="w-full h-full absolute inset-0 opacity-20" />
                     <div className="absolute inset-0 p-6 flex flex-col justify-between">
                       <div className="flex flex-col gap-2">
                         <Skeleton className="w-24 h-7 rounded-full" />
                         <Skeleton className="w-32 h-7 rounded-full" />
                       </div>
                       <div className="flex justify-between items-end">
                          <div className="space-y-2">
                            <Skeleton className="w-40 h-8 rounded-full" />
                            <Skeleton className="w-56 h-4 rounded-full" />
                          </div>
                          <Skeleton className="w-12 h-12 rounded-full" />
                       </div>
                     </div>
                  </div>
                ) : (
                  <SpecialOfferCarousel offers={specialOffers} />
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Categories Section */}
        <AnimatePresence>
          {!isSearching && (
            <motion.section 
               initial={hasScrollToRestore ? false : { opacity: 0, x: 20, height: 0 }}
               animate={{ opacity: 1, x: 0, height: "auto" }}
               exit={{ opacity: 0, x: -20, height: 0, transition: { duration: 0.2 } }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="mb-6  "
            >
              <div className="flex justify-between items-end mb-4 px-5">
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Our Services</h2>
              </div>
              <div className="relative pl-5 sticky top-[88px] z-30 bg-bg-base/95 backdrop-blur-xl py-3 border-y border-white/5 -mt-3 mb-3" ref={constraintsRef}>
                {isLoading ? (
                  <div className="flex gap-4 pb-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 min-w-[84px] px-1 pt-1 pb-2">
                        <Skeleton className="w-14 h-14 rounded-full" />
                        <Skeleton className="w-12 h-3 rounded-full mt-1" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    drag="x" 
                    dragConstraints={constraintsRef}
                    className="flex gap-3 pb-4 pr-5 w-max cursor-grab active:cursor-grabbing"
                  >
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      
                      let Icon = Sparkles;
                      if (cat.name.includes("Hair and Beard")) Icon = Scissors;
                      else if (cat.name.includes("Colour")) Icon = Palette;
                      else if (cat.name.includes("De-tan")) Icon = Droplets;
                      else if (cat.name.includes("Facials")) Icon = Smile;
                      else if (cat.name.includes("Spa")) Icon = Flower2;
                      else if (cat.name.includes("Treatments")) Icon = Wand2;

                      return (
                        <motion.button
                          whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                          key={cat.id}
                          onClick={() => {
                            haptics.tick();
                            audioCues.playClick();
                            setActiveCategory(cat.id);
                          }}
                          className={`relative flex flex-col items-center justify-start gap-2 pt-1 pb-2 transition-all w-[84px] flex-shrink-0 ${
                            isActive 
                              ? "text-accent-green" 
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 shadow-lg ${
                            isActive ? "bg-accent-green text-bg-base shadow-accent-green/20" : "bg-white/5 border border-white/10 text-white shadow-black/20"
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10.5px] font-bold text-center leading-[1.2] whitespace-normal break-words w-full px-0.5">
                            {cat.name}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeCategoryTab"
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent-green rounded-t-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        <section className="px-5  ">
          <motion.div 
            layout
            className="flex flex-col gap-4 mb-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                {sectionTitle}
              </h2>
              <motion.button 
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors bg-white/5 px-3 py-1.5 rounded-full"
              >
                <span className="truncate max-w-[100px]">{sortBy}</span>
                <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </motion.div>
              </motion.button>
            </div>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, paddingBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", paddingBottom: 8 }}
                  exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex flex-wrap gap-2 overflow-hidden"
                >
                  {["Recommended", "Price (Low-High)", "Price (High-Low)", "Rating", "Popularity"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border ${
                        sortBy === option 
                          ? "bg-accent-green/20 text-accent-green border-accent-green/30" 
                          : "bg-bg-surface text-text-secondary border-white/5 hover:bg-white/5"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-bg-surface/50 rounded-[24px] overflow-hidden p-1.5 pb-0 border border-white/5">
                     <Skeleton className="w-full aspect-[4/3] rounded-[20px]" />
                     <div className="p-4 pt-3">
                       <Skeleton className="w-3/4 h-5 mb-2" />
                       <Skeleton className="w-1/2 h-4" />
                     </div>
                  </div>
                ))}
              </motion.div>
            ) : displayItems.length > 0 ? (
              <motion.div 
                key={isSearching ? "search" : activeCategory}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                layout
                className="grid grid-cols-2 gap-4"
              >
                <AnimatePresence>
                  {displayItems.map((item, index) => (
                    <RevealedServiceItem key={item.id} item={item} index={index} lastClickedId={lastClickedId} skipEntrance={hasScrollToRestore} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="relative w-48 h-48 mb-6"
                >
                  <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-[40px] animate-pulse" />
                  <motion.img 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&h=400&auto=format&fit=crop" 
                    alt="No results"
                    className="w-full h-full object-cover rounded-full border-4 border-bg-surface-raised shadow-2xl relative z-10 opacity-80"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-bg-surface p-4 rounded-full border border-white/5 shadow-xl z-20">
                    <Search className="w-6 h-6 text-accent-green" />
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2">No services found</h3>
                <p className="text-text-secondary max-w-[280px]">
                  We couldn't find anything matching "<span className="text-white font-medium">{searchQuery}</span>". Try adjusting your search.
                </p>
                <motion.button 
                  whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                  onClick={() => setSearchQuery("")}
                  className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full transition-all border border-white/10"
                >
                  Clear Search
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      
    </PageTransition>
  );
}
