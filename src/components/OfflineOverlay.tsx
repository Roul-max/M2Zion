import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WifiOff } from "lucide-react";

export default function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-base/95 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.1 }}
            className="flex flex-col items-center text-center max-w-[320px]"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-50" />
              <WifiOff className="w-10 h-10 text-red-500 opacity-80" />
            </div>
            <h2 className="text-2xl font-black text-text-primary mb-3">Connection Lost</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              It seems you're offline. Please check your internet connection to continue browsing our premium services.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
