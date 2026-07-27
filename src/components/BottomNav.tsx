import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Calendar, Search, Heart, User } from "lucide-react";
import { haptics } from "../utils/haptics";
import { cn } from "../lib/utils";

const tabs = [
  { id: 'home', path: '/home', icon: Home, label: 'Home' },
  { id: 'bookings', path: '/bookings', icon: Calendar, label: 'Bookings' },
  { id: 'search', path: '/search', icon: Search, label: 'Search' },
  { id: 'favorites', path: '/favorites', icon: Heart, label: 'Favorites' },
  { id: 'profile', path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  // Don't show bottom nav on splash or service detail pages
  if (location.pathname === '/' || location.pathname.includes('/service/')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
      <div className="bg-bg-surface-raised/90 backdrop-blur-xl border border-white/10 rounded-full p-2 flex justify-between items-center shadow-2xl shadow-black/80">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              onClick={() => {
                if (!isActive) haptics.tick();
              }}
              className="relative px-4 py-3 rounded-full flex items-center justify-center z-10 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-accent-green rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon 
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  isActive ? "text-black" : "text-text-secondary hover:text-white"
                )} 
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
