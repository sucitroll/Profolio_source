import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';

interface ScrollApi {
  scrollTo: (target: string | number) => void;
  lock: () => void;
  unlock: () => void;
}

const ScrollContext = createContext<ScrollApi | null>(null);

const HEADER_OFFSET = -64;

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      scrollTo: (target) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { offset: typeof target === 'string' ? HEADER_OFFSET : 0, duration: 1.4 });
          return;
        }
        if (typeof target === 'number') {
          window.scrollTo({ top: target });
          return;
        }
        const el = document.querySelector(target);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
      },
      lock: () => {
        lenisRef.current?.stop();
        document.documentElement.style.overflow = 'hidden';
      },
      unlock: () => {
        lenisRef.current?.start();
        document.documentElement.style.overflow = '';
      },
    }),
    [],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used inside ScrollProvider');
  return ctx;
}
