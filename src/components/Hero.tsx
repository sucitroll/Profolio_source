import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { useScroll } from '@/lib/scroll';
import { Magnetic } from '@/components/Magnetic';
import { PROJECTS } from '@/data/projects';
import { STACK_TOTAL } from '@/data/stack';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useScroll();

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
      tl.from('[data-hline]', { scaleX: 0, duration: 1.6, stagger: 0.08, transformOrigin: 'left center' })
        .from('[data-vline]', { scaleY: 0, duration: 1.6, stagger: 0.08, transformOrigin: 'top center' }, 0)
        .from('.hero-line > span', { yPercent: 112, duration: 1.4, stagger: 0.09 }, 0.15)
        .from('[data-hero-fade]', { y: 18, opacity: 0, duration: 1.1, stagger: 0.06 }, 0.55);

      gsap.to('[data-parallax]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const meta = [
    { k: 'Shipped systems', v: String(PROJECTS.length).padStart(2, '0') },
    { k: 'Active stack', v: String(STACK_TOTAL) },
    { k: 'Core focus', v: 'Systems / Web / Automation' },
  ];

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] flex-col pt-16">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div className="shell relative h-full">
          {[25, 50, 75].map((p) => (
            <span key={p} data-vline className="absolute top-0 h-full w-px bg-[var(--line)]" style={{ left: `${p}%` }} />
          ))}
        </div>
      </div>

      <div className="shell relative flex flex-1 flex-col">
        <div className="micro grid grid-cols-2 gap-4 pt-6 text-ink2 md:grid-cols-4" data-hero-fade>
          <span>00 / Intro</span>
          <span className="text-right md:text-left">Index — Rev. 26.11</span>
          <span className="hidden md:block">06.2088° S — 106.8456° E</span>
          <span className="hidden text-right md:block">Portfolio Vol. 06</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 md:py-16">
          <div data-parallax>
            <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.055em]">
              <span className="hero-line mask text-[clamp(3.2rem,14.5vw,16rem)]">
                <span>SuciTroll</span>
              </span>
              <span className="sr-only"> — </span>
              <span className="grid grid-cols-12 items-end gap-x-4">
                <span className="col-span-12 hidden md:col-span-3 md:block" data-hero-fade>
                  <span className="micro block text-ink2">Role / Title</span>
                  <span className="mt-3 block font-sans text-sm font-normal normal-case leading-[1.5] tracking-normal text-ink2">
                    Systems Architect,
                    <br /> Full-Stack Engineer
                    <br /> &amp; Automation Specialist
                  </span>
                </span>
                <span className="hero-line mask col-span-12 md:col-span-9">
                  <span className="font-serif text-[clamp(3.2rem,12.4vw,13.5rem)] font-normal normal-case italic leading-[0.9] tracking-[-0.03em] md:text-right">
                    Amba Tukag
                  </span>
                </span>
              </span>
            </h1>
          </div>

          <span data-hline className="mt-10 block h-px w-full bg-[var(--line)] md:mt-16" />

          <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-8">
            <p className="col-span-12 text-ink2 md:hidden" data-hero-fade>
              Systems Architect, Full-Stack Engineer &amp; Automation Specialist
            </p>
            <p
              className="col-span-12 max-w-[34ch] text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.01em] md:col-span-6 md:col-start-4"
              data-hero-fade
            >
              Engineering high-throughput systems, full-stack web architectures, and autonomous software with zero bloat.
            </p>
            <div className="col-span-12 flex flex-col items-start gap-5 md:col-span-3 md:items-end" data-hero-fade>
              <p className="micro flex items-center gap-3">
                <span className="pulse-dot" />
                Available — Q1 2027 bookings
              </p>
              <Magnetic strength={0.35}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-canvas transition-transform duration-500 ease-expo hover:scale-[1.03]"
                >
                  Start a project
                  <span className="inline-block transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <span data-hline className="absolute inset-x-0 top-0 h-px bg-[var(--line)]" />
        <dl className="shell grid grid-cols-2 md:grid-cols-4">
          {meta.map((m, i) => (
            <div key={m.k} className={`py-5 ${i > 0 ? 'md:hair-l md:pl-5' : ''} ${i % 2 ? 'pl-4 hair-l md:pl-5' : ''} ${i === 2 ? 'max-md:hair-t' : ''}`} data-hero-fade>
              <dt className="micro text-ink2">{m.k}</dt>
              <dd className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{m.v}</dd>
            </div>
          ))}
          <button
            type="button"
            onClick={() => scrollTo('#capabilities')}
            className="group flex items-end justify-between py-5 pl-4 text-left hair-l max-md:hair-t md:pl-5"
            data-hero-fade
          >
            <span>
              <span className="micro block text-ink2">Scroll</span>
              <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">Index ↓</span>
            </span>
            <span className="relative mb-1 block h-10 w-px overflow-hidden bg-[var(--line)]">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_cubic-bezier(0.16,1,0.3,1)_infinite] bg-ink" />
            </span>
          </button>
        </dl>
        <div className="hair-b" />
      </div>
    </section>
  );
}
