import { useEffect, useRef } from 'react';
import { CONTACTS } from '@/data/profile';
import { Logo } from '@/components/Logo';
import { Magnetic } from '@/components/Magnetic';
import { useCopy } from '@/hooks/useCopy';
import { useClock } from '@/hooks/useClock';
import { useReveal } from '@/hooks/useReveal';
import { useScroll } from '@/lib/scroll';
import { gsap, prefersReducedMotion } from '@/lib/motion';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { copied, copy } = useCopy();
  const { year, time, zone } = useClock();
  const { scrollTo } = useScroll();
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-kinetic]').forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -8 : 8 },
          { xPercent: i % 2 ? 4 : -4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: 0.6 } },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="inverted relative overflow-hidden bg-canvas text-ink">
      <div className="shell pt-24 md:pt-36">
        <div className="micro flex justify-between pt-4 text-ink2 hair-t">
          <span>05 / Initiate</span>
          <span>Response &lt; 24 h</span>
        </div>

        <h2 className="mt-12 font-display text-[clamp(2.4rem,8.6vw,10.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.055em] md:mt-20">
          <span data-kinetic className="block md:whitespace-nowrap">Build something</span>
          <span data-kinetic className="block text-right md:whitespace-nowrap">
            <span className="font-serif font-normal normal-case italic tracking-[-0.03em]">undeniable.</span>
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-28">
          <div className="col-span-12 md:col-span-3" data-reveal="fade">
            <p className="micro flex items-center gap-3">
              <span className="pulse-dot" /> Open for new systems
            </p>
            <p className="mt-4 max-w-[34ch] text-ink2">
              Send the problem, the constraints and the deadline. You get a direct technical answer, not a sales call.
            </p>
          </div>

          <ul className="col-span-12 md:col-span-9" data-reveal="stagger">
            {CONTACTS.map((c) => {
              const isCopied = copied === c.label;
              return (
                <li key={c.label} className="group relative hair-t last:hair-b">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-surface transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                  <div className="relative grid grid-cols-12 items-center gap-x-4 py-5 md:py-7">
                    <span className="micro col-span-12 mb-2 text-ink2 md:col-span-2 md:mb-0">{c.label}</span>
                    <button
                      type="button"
                      onClick={() => copy(c.label, c.value)}
                      data-cursor="COPY"
                      className="col-span-9 truncate text-left font-display text-[clamp(1.35rem,3.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] md:col-span-7"
                      aria-label={`Copy ${c.label}: ${c.value}`}
                    >
                      {c.value}
                    </button>
                    <div className="col-span-3 flex items-center justify-end gap-4">
                      <span className="micro relative hidden h-[1.2em] overflow-hidden sm:block" aria-live="polite">
                        <span className={`block transition-transform duration-500 ease-expo ${isCopied ? '-translate-y-full' : ''}`}>Click to copy</span>
                        <span className={`absolute inset-0 block whitespace-nowrap transition-transform duration-500 ease-expo ${isCopied ? 'translate-y-0' : 'translate-y-full'}`}>
                          Copied to clipboard
                        </span>
                      </span>
                      <span className={`micro sm:hidden ${isCopied ? '' : 'hidden'}`}>Copied</span>
                      {c.href && (
                        <a
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          aria-label={`Open ${c.label}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 hair hover:bg-ink hover:text-canvas"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <footer className="shell mt-28 pb-8 md:mt-40">
        <div className="flex items-end justify-between gap-6 pb-8 hair-b">
          <div className="flex items-center gap-4 md:gap-6">
            <Logo className="h-14 w-14 md:h-24 md:w-24" />
            <div>
              <p className="font-display text-3xl font-bold tracking-[-0.04em] md:text-5xl">SuciTroll</p>
              <p className="mt-1 font-serif text-xl italic text-ink2 md:text-2xl">Amba Tukag</p>
            </div>
          </div>
          <Magnetic strength={0.45}>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              data-cursor="TOP"
              aria-label="Back to top"
              className="flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-500 hair hover:bg-ink hover:text-canvas md:h-24 md:w-24"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M9 16V2M3 8l6-6 6 6" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
          </Magnetic>
        </div>

        <div className="micro grid grid-cols-2 gap-y-6 pt-6 text-ink2 md:grid-cols-4">
          <span>© {year} SuciTroll — Amba Tukag</span>
          <span className="text-right md:text-left">
            Local {time} {zone}
          </span>
          <span className="leading-[1.6]">Set in Syne, Instrument Serif, Plus Jakarta Sans &amp; JetBrains Mono</span>
          <span className="text-right leading-[1.6]">Hand-built. No templates. Zero trackers.</span>
        </div>
      </footer>
    </section>
  );
}
