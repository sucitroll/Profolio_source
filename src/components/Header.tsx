import { useEffect, useState, type MouseEvent } from 'react';
import { Logo } from '@/components/Logo';
import { Magnetic, Roll } from '@/components/Magnetic';
import { useClock } from '@/hooks/useClock';
import { useTheme } from '@/hooks/useTheme';
import { useScroll } from '@/lib/scroll';

const NAV = [
  { id: 'work', label: 'Work', n: '02' },
  { id: 'capabilities', label: 'Capabilities', n: '01' },
  { id: 'stack', label: 'Stack', n: '03' },
  { id: 'archive', label: 'Archive', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

export function Header() {
  const { time, zone } = useClock();
  const { theme, toggle } = useTheme();
  const { scrollTo, lock, unlock } = useScroll();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) lock();
    else unlock();
  }, [open, lock, unlock]);

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    unlock();
    scrollTo(`#${id}`);
  };

  const onTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-canvas/90 backdrop-blur-[2px] transition-colors duration-500">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a href="#top" onClick={(e) => go(e, 'top')} className="group flex items-center gap-3" aria-label="SuciTroll, back to top">
            <Logo className="h-8 w-8" />
            <span className="font-display text-[15px] font-semibold tracking-[-0.02em]">
              <Roll>SuciTroll</Roll>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Magnetic key={item.id} strength={0.25}>
                <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="group flex items-baseline gap-1.5 px-3 py-2">
                  <span className="font-mono text-[10px] text-ink2">{item.n}</span>
                  <span className="text-[13px] font-medium">
                    <Roll>{item.label}</Roll>
                  </span>
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <p className="micro hidden tabular-nums text-ink2 md:block">
              <span className="text-ink">{time}</span> {zone}
            </p>
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={onTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="group relative flex h-9 w-[68px] items-center hair rounded-full px-1"
              >
                <span
                  className="absolute top-1 h-7 w-7 rounded-full bg-ink transition-transform duration-700 ease-expo"
                  style={{ transform: `translateX(${theme === 'dark' ? 30 : 0}px)` }}
                />
                <span className="relative z-10 flex w-full justify-between px-[7px]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={theme === 'light' ? 'text-canvas' : 'text-ink2'}>
                    <circle cx="7" cy="7" r="2.75" stroke="currentColor" strokeWidth="1.25" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                      <line key={a} x1="7" y1="0.75" x2="7" y2="2.25" stroke="currentColor" strokeWidth="1.25" transform={`rotate(${a} 7 7)`} />
                    ))}
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={theme === 'dark' ? 'text-canvas' : 'text-ink2'}>
                    <path d="M11.5 8.6A5 5 0 0 1 5.4 2.5a5 5 0 1 0 6.1 6.1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="micro flex h-9 items-center gap-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <span className="relative block h-[9px] w-5">
                <span className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-500 ease-expo ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-500 ease-expo ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
              </span>
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        <div className="hair-b" />
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-canvas pt-16 transition-[clip-path] duration-700 ease-expo lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <nav className="shell flex h-full flex-col justify-between pb-8 pt-6" aria-label="Mobile">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.id} className="hair-b">
                <a
                  href={`#${item.id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => go(e, item.id)}
                  className="flex items-baseline justify-between py-4"
                  style={{ transitionDelay: `${open ? 120 + i * 50 : 0}ms` }}
                >
                  <span className="font-display text-[clamp(2.25rem,10vw,4rem)] font-semibold uppercase leading-none tracking-[-0.04em]">
                    {item.label}
                  </span>
                  <span className="micro text-ink2">{item.n}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="micro flex justify-between text-ink2">
            <span>Local {time}</span>
            <span>{zone}</span>
          </p>
        </nav>
      </div>
    </>
  );
}
