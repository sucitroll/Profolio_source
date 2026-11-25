import { useEffect, useRef, useState } from 'react';
import { CATEGORY_LABEL, type Project } from '@/data/projects';
import { Blueprint } from '@/components/work/Blueprint';
import { gsap, isFinePointer } from '@/lib/motion';

interface Props {
  projects: Project[];
  onOpen: (p: Project) => void;
}

export function ProjectIndex({ projects, onOpen }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [fine] = useState(isFinePointer);

  useEffect(() => {
    const el = card.current;
    const area = wrap.current;
    if (!el || !area || !fine) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'expo.out' });
    const rTo = gsap.quickTo(el, 'rotation', { duration: 1.2, ease: 'expo.out' });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [fine]);

  useEffect(() => {
    if (!card.current || !fine) return;
    gsap.to(card.current, { scale: active ? 1 : 0.6, opacity: active ? 1 : 0, duration: 0.7, ease: 'expo.out' });
  }, [active, fine]);

  return (
    <div ref={wrap} onPointerLeave={() => setActive(null)}>
      <div className="micro hidden grid-cols-12 gap-x-4 pb-4 text-ink2 md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Project</span>
        <span className="col-span-2">Category</span>
        <span className="col-span-3">Stack</span>
        <span className="col-span-1">Year</span>
        <span className="col-span-1 text-right">Open</span>
      </div>
      <ul data-list>
        {projects.map((p) => (
          <li key={p.id} className="hair-t last:hair-b">
            <button
              type="button"
              onClick={() => onOpen(p)}
              onPointerEnter={() => setActive(p)}
              onFocus={() => setActive(p)}
              onBlur={() => setActive(null)}
              data-cursor="VIEW"
              className="group relative grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 py-5 text-left md:py-6"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-700 ease-expo group-hover:scale-y-100" />
              <span className="micro relative col-span-2 text-ink2 md:col-span-1">{p.index}</span>
              <span className="relative col-span-10 font-display text-[clamp(1.35rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-4">
                {p.title}
              </span>
              <span className="micro relative col-span-6 col-start-3 text-ink2 md:col-span-2 md:col-start-auto">{CATEGORY_LABEL[p.category]}</span>
              <span className="relative col-span-3 hidden truncate font-mono text-[12px] text-ink2 md:block">{p.stack.slice(0, 3).join(' / ')}</span>
              <span className="micro relative col-span-4 text-right text-ink2 md:col-span-1 md:text-left">{p.year}</span>
              <span className="relative col-span-1 hidden justify-end md:flex">
                <span className="inline-block transition-transform duration-700 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {fine && (
        <div ref={card} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] w-[320px] will-change-transform">
          <div className="inverted bg-canvas p-4 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
            <div className="micro flex justify-between text-ink2">
              <span>{active?.index ?? '00'} / Preview</span>
              <span>{active?.status}</span>
            </div>
            {active && <Blueprint kind={active.blueprint} seed={Number(active.index)} className="mt-3 aspect-[4/3] w-full" />}
            <div className="mt-3 flex items-end justify-between hair-t pt-3">
              <span className="micro text-ink2">{active?.metrics[0].label}</span>
              <span className="font-display text-lg font-semibold">{active?.metrics[0].value}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
