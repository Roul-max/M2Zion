import { useEffect } from 'react';
import { haptics } from '../utils/haptics';

export function useGlobalHaptics() {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const clickable = target.closest('button, a, [role="button"]');
      if (clickable) {
        haptics.tick();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
}
