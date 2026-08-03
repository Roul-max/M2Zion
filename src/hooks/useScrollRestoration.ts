import { useEffect } from "react";

export function useScrollRestoration(key: string) {
  useEffect(() => {
    const saved = sessionStorage.getItem(`scroll_pos_${key}`);
    if (!saved) return;
    const target = parseInt(saved, 10);
    if (!target) return;

    const el = document.getElementById("scroll-root");
    if (!el) return;

    // Force scrollTop every rAF for 600ms — outlasts all page/card animations
    const deadline = performance.now() + 600;
    let rafId: number;

    const hold = (now: number) => {
      el.scrollTop = target;
      if (now < deadline) {
        rafId = requestAnimationFrame(hold);
      } else {
        sessionStorage.removeItem(`scroll_pos_${key}`);
      }
    };

    rafId = requestAnimationFrame(hold);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
