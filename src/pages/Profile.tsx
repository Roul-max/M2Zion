import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion } from "motion/react";
import { User, Settings, LogOut, ChevronRight, Moon, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Profile() {
  const [theme, setTheme] = useState<'classic' | 'slate'>('classic');

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme-variant');
    if (savedTheme === 'slate') {
      setTheme('slate');
      document.documentElement.classList.add('theme-dark-slate');
    }
  }, []);

  const toggleTheme = (variant: 'classic' | 'slate') => {
    setTheme(variant);
    if (variant === 'slate') {
      document.documentElement.classList.add('theme-dark-slate');
      localStorage.setItem('theme-variant', 'slate');
    } else {
      document.documentElement.classList.remove('theme-dark-slate');
      localStorage.setItem('theme-variant', 'classic');
    }
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <PageTransition className="min-h-screen bg-bg-base pb-32 relative">
      <header className="px-5 pt-10 pb-6 sticky top-0 bg-bg-base/80 backdrop-blur-xl z-40 border-b border-white/5 flex justify-between items-center">
        <h1 className="text-2xl font-black text-text-primary tracking-tight">Profile</h1>
        {!isOnline && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline</span>
          </div>
        )}
      </header>
      <main className="px-5 py-6">
        {/* Profile Card */}
        <div className="bg-bg-surface border border-white/5 rounded-[24px] p-6 flex items-center gap-5 mb-8 shadow-xl shadow-black/20">
          <div className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center border border-accent-green/30">
            <User className="w-10 h-10 text-accent-green" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">John Doe</h2>
            <p className="text-text-secondary text-sm">john.doe@example.com</p>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 px-2">Appearance</h3>
          <div className="bg-bg-surface border border-white/5 rounded-[24px] overflow-hidden">
            <div className="p-4 border-b border-white/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-accent-green" />
                <span className="text-text-primary font-medium">Dark Mode Variant</span>
              </div>
              <div className="flex bg-bg-base p-1 rounded-full">
                <button
                  onClick={() => toggleTheme('classic')}
                  className={cn(
                    "flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    theme === 'classic' 
                      ? "bg-bg-surface-raised text-text-primary shadow-md" 
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Classic Black
                </button>
                <button
                  onClick={() => toggleTheme('slate')}
                  className={cn(
                    "flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    theme === 'slate' 
                      ? "bg-bg-surface-raised text-text-primary shadow-md" 
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Dark Slate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 px-2">Account</h3>
          <div className="bg-bg-surface border border-white/5 rounded-[24px] overflow-hidden flex flex-col">
            <Link to="/bookings" className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-bg-surface-raised transition-colors active:bg-bg-base">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary font-medium">My Bookings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </Link>
            <Link to="/favorites" className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-bg-surface-raised transition-colors active:bg-bg-base">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary font-medium">Favorites</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </Link>
            <button className="flex items-center justify-between p-5 hover:bg-bg-surface-raised transition-colors active:bg-bg-base">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary font-medium">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-5 bg-bg-surface border border-red-500/20 text-red-400 rounded-[24px] font-bold hover:bg-red-500/10 transition-colors active:scale-95">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </main>
    </PageTransition>
  );
}
