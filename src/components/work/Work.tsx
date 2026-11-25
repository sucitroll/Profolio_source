import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORY_LABEL, PROJECTS, type Category, type Project } from '@/data/projects';
import { Line, SectionHead } from '@/components/SectionHead';
import { Magnetic } from '@/components/Magnetic';
import { ProjectIndex } from '@/components/work/ProjectIndex';
import { ProjectGrid } from '@/components/work/ProjectGrid';
import { CaseDrawer } from '@/components/work/CaseDrawer';
import { useReveal } from '@/hooks/useReveal';
import { gsap, prefersReducedMotion } from '@/lib/motion';

type Filter = 'all' | Category;
type View = 'index' | 'grid';

const FILTERS: Filter[] = ['all', 'systems', 'web', 'automation', 'infra'];
const pad = (n: number) => String(n).padStart(2, '0');

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const listWrap = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>('index');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  useReveal(ref);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: PROJECTS.length, systems: 0, web: 0, automation: 0, infra: 0 };
    PROJECTS.forEach((p) => c[p.category]++);
    return c;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (!q) return true;
      return [p.title, p.summary, p.year, CATEGORY_LABEL[p.category], ...p.stack].join(' ').toLowerCase().includes(q);
    });
  }, [filter, query]);

  useEffect(() => {
    const items = listWrap.current?.querySelectorAll('[data-list] > li');
    if (!items?.length || prefersReducedMotion()) return;
    gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.035, overwrite: true });
  }, [view, filter, results.length]);

  const close = useCallback(() => setOpenProject(null), []);

  return (
    <section id="work" ref={ref} className="shell py-24 md:py-36">
      <SectionHead
        index="02"
        label="Selected & complete works"
        meta={<>{pad(PROJECTS.length)} Dossiers — 2022 / 2026</>}
        title={
          <>
            <Line>Systems in</Line>
            <Line>
              <span className="font-serif font-normal normal-case italic tracking-[-0.02em]">production.</span>
            </Line>
          </>
        }
      />

      <div className="sticky top-16 z-20 -mx-4 mt-12 bg-canvas px-4 py-4 hair-b sm:-mx-6 sm:px-6 md:mt-20 lg:-mx-10 lg:px-10" data-reveal="fade">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Filter by category">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <Magnetic key={f} strength={0.2}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f)}
                    className={`micro whitespace-nowrap rounded-full px-4 py-2.5 transition-colors duration-500 hair ${
                      active ? 'bg-ink text-canvas' : 'hover:bg-surface'
                    }`}
                  >
                    {f === 'all' ? 'All' : CATEGORY_LABEL[f]} [{pad(counts[f])}]
                  </button>
                </Magnetic>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="group relative flex flex-1 items-center gap-3 px-4 py-2.5 hair xl:w-72 xl:flex-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-ink2">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25" />
                <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.25" />
              </svg>
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, stack, year"
                className="w-full bg-transparent font-mono text-[12px] outline-none placeholder:text-ink2"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="micro text-ink2 hover:text-ink">
                  Clear
                </button>
              )}
            </label>

            <div className="relative flex p-1 hair" role="group" aria-label="Layout">
              <span
                className="absolute bottom-1 top-1 w-[calc(50%-4px)] bg-ink transition-transform duration-700 ease-expo"
                style={{ transform: `translateX(${view === 'grid' ? '100%' : '0'})` }}
              />
              {(['index', 'grid'] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`micro relative z-10 flex w-[84px] items-center justify-center gap-2 py-2 transition-colors duration-500 ${
                    view === v ? 'text-canvas' : 'text-ink2'
                  }`}
                >
                  {v === 'index' ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M0 2.5h12M0 6h12M0 9.5h12" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <rect x=".6" y=".6" width="4.4" height="4.4" stroke="currentColor" strokeWidth="1.25" />
                      <rect x="7" y=".6" width="4.4" height="4.4" stroke="currentColor" strokeWidth="1.25" />
                      <rect x=".6" y="7" width="4.4" height="4.4" stroke="currentColor" strokeWidth="1.25" />
                      <rect x="7" y="7" width="4.4" height="4.4" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  )}
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="micro mb-6 mt-6 text-ink2" aria-live="polite">
        Showing {pad(results.length)} / {pad(PROJECTS.length)}
        {query && <> — “{query}”</>}
      </p>

      <div ref={listWrap}>
        {results.length === 0 ? (
          <div className="flex flex-col items-start gap-6 py-20 hair-t hair-b">
            <p className="font-display text-3xl font-semibold tracking-[-0.03em]">No dossier matches that query.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="micro rounded-full px-4 py-2.5 hair hover:bg-surface"
            >
              Reset filters
            </button>
          </div>
        ) : view === 'index' ? (
          <ProjectIndex projects={results} onOpen={setOpenProject} />
        ) : (
          <ProjectGrid projects={results} onOpen={setOpenProject} />
        )}
      </div>

      <CaseDrawer project={openProject} onClose={close} onNavigate={setOpenProject} />
    </section>
  );
}
