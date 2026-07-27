import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoration(key: string, isLoading: boolean = false) {
  const location = useLocation();
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const savedScroll = sessionStorage.getItem(`scroll_pos_${key}`);
    
    if (savedScroll) {
      const targetScroll = parseInt(savedScroll, 10);
      
      const restoreScroll = () => {
        window.scrollTo({
          top: targetScroll,
          behavior: 'instant'
        });
      };
      
      // Try restoring at multiple intervals to catch layout shifts and animation completes
      restoreScroll();
      setTimeout(restoreScroll, 50);
      setTimeout(restoreScroll, 200);
       
    }

    const handleScroll = () => {
      // Don't save 0 if we are animating out
      if (window.scrollY > 0 || scrollRef.current === 0) {
        scrollRef.current = window.scrollY;
        sessionStorage.setItem(`scroll_pos_${key}`, window.scrollY.toString());
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [key, isLoading, location.pathname]);
}
