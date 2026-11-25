import { useEffect, useRef, useState } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/motion';

export function Cursor() {
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion());
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [mode, setMode] = useState<'idle' | 'hover' | 'label'>('idle');

  useEffect(() => {
    if (!enabled || !ringRef.current || !dotRef.current) return;
    const root = document.documentElement;
    root.classList.add('cursor-on');
    const ring = ringRef.current;
    const dot = dotRef.current;
    gsap.set([ring, dot], { x: -100, y: -100 });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'expo.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'expo.out' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const labelled = t?.closest<HTMLElement>('[data-cursor]');
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? '');
        setMode('label');
        return;
      }
      setMode(t?.closest('a, button, input, [role="button"], label') ? 'hover' : 'idle');
    };
    const hide = () => gsap.to([ring, dot], { opacity: 0, duration: 0.3 });
    const show = () => gsap.to([ring, dot], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', hide);
    document.addEventListener('pointerenter', show);
    return () => {
      root.classList.remove('cursor-on');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('pointerenter', show);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className={`cursor-ring ${mode === 'label' ? 'is-label' : ''} ${mode === 'hover' ? 'is-hover' : ''}`}
      >
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}
