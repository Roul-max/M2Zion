import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, Star, MapPin, Search as SearchIcon, X } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import { allServices } from "../data/services";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("rating"); // rating, distance, price
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  
  // Flatten mock services for search
  
  
  // Search logic
  
  let filtered = query 
    ? allServices.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.categoryName.toLowerCase().includes(query.toLowerCase()))
    : [...allServices].slice(0, 12);
    
  // Mock distance for sorting
  filtered = filtered.map((s, i) => ({...s, distance: (i * 0.5 + 0.5)}));
  
  if (activeSort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (activeSort === 'distance') {
    filtered.sort((a, b) => a.distance - b.distance);
  } else if (activeSort === 'price_low') {
    filtered.sort((a, b) => (a.offerPrice || a.small || 0) - (b.offerPrice || b.small || 0));
  } else if (activeSort === 'price_high') {
    filtered.sort((a, b) => (b.offerPrice || b.small || 0) - (a.offerPrice || a.small || 0));
  }


  return (
    <PageTransition className="min-h-screen bg-bg-base pb-32 relative">
      <header className="px-5 pt-6 pb-4 sticky top-0 bg-bg-base/80 backdrop-blur-xl z-40 border-b border-white/5">
        <h1 className="text-2xl font-black text-text-primary tracking-tight mb-4">Search</h1>
        <div className="flex gap-3">
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            className="flex-1"
          />
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-12 h-12 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary hover:bg-white/10 active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      
            <div className="px-5 mt-6 grid grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-bg-surface/50 rounded-[24px] overflow-hidden p-1.5 pb-0 border border-white/5">
               <Skeleton className="w-full aspect-[4/3] rounded-[20px]" />
               <div className="p-4 pt-3">
                 <Skeleton className="w-3/4 h-5 mb-2" />
                 <Skeleton className="w-1/2 h-4" />
               </div>
            </div>
          ))
        ) : filtered.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.23, 1, 0.32, 1],
                  layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-2 py-10 text-center text-text-secondary">
            No services found.
          </div>
        )}
      </div>


      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full bg-bg-surface border-t border-white/10 rounded-t-[32px] p-6 z-50 pb-safe shadow-2xl shadow-black/50"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-text-primary">Filter & Sort</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-full hover:bg-white/5">
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">Sort By</h4>
                  <div className="flex flex-wrap gap-3">
                    {['rating', 'distance', 'price_low', 'price_high'].map(sort => (
                      <button 
                        key={sort}
                        onClick={() => setActiveSort(sort)}
                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                          activeSort === sort 
                            ? 'bg-accent-green/20 border-accent-green text-accent-green' 
                            : 'bg-white/5 border-white/10 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {sort === 'rating' && 'Highest Rated'}
                        {sort === 'distance' && 'Nearest'}
                        {sort === 'price_low' && 'Price: Low to High'}
                        {sort === 'price_high' && 'Price: High to Low'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">Price Range</h4>
                  <div className="flex items-center gap-4">
                    <input type="range" className="w-full accent-accent-green" />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-2 font-medium">
                    <span>₹0</span>
                    <span>₹5000+</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider">Distance</h4>
                  <div className="flex items-center gap-4">
                    <input type="range" className="w-full accent-accent-green" />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-2 font-medium">
                    <span>1 km</span>
                    <span>20+ km</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 mt-4 bg-accent-green text-black font-black rounded-2xl active:scale-[0.98] transition-transform"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
