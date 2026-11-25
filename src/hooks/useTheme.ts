import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'st-theme';
const META: Record<Theme, string> = { light: '#F4F3EE', dark: '#090909' };

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) || 'light',
  );

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme]);
  }, [theme]);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'light' ? 'dark' : 'light';
      const apply = () => {
        document.documentElement.setAttribute('data-theme', next);
        setTheme(next);
        try {
          localStorage.setItem(KEY, next);
        } catch {
          /* storage unavailable */
        }
      };
      const doc = document as DocWithVT;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (doc.startViewTransition && !reduce) {
        const root = document.documentElement;
        root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth}px`);
        root.style.setProperty('--vt-y', `${origin?.y ?? 0}px`);
        doc.startViewTransition(apply);
      } else {
        apply();
      }
    },
    [theme],
  );

  return { theme, toggle };
}
