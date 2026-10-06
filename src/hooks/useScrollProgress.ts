import { useEffect, useState } from 'react';

export interface ScrollState {
  progress: number;
  scrolled: boolean;
  showBackToTop: boolean;
}

/** Tracks scroll position for the top progress bar, header shadow, and back-to-top button. */
export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false, showBackToTop: false });

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight || 1;
      setState({
        progress: Math.min(100, (scrollTop / scrollHeight) * 100),
        scrolled: scrollTop > 20,
        showBackToTop: scrollTop > 480,
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
