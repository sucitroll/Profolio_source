import { useEffect, type RefObject } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';

export function useReveal(scope: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((group) => {
        gsap.from(group.querySelectorAll('.mask > *'), {
          yPercent: 110,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });
      el.querySelectorAll<HTMLElement>('[data-reveal="fade"]').forEach((node) => {
        gsap.from(node, {
          y: 28,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        });
      });
      el.querySelectorAll<HTMLElement>('[data-reveal="stagger"]').forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });
      el.querySelectorAll<HTMLElement>('[data-draw]').forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: line.dataset.draw === 'right' ? 'right center' : 'left center',
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: line, start: 'top 92%', once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [scope]);
}
