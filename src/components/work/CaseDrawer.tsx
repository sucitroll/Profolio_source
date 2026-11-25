import { useEffect, useRef, useState } from 'react';
import { CATEGORY_LABEL, PROJECTS, type Project } from '@/data/projects';
import { Blueprint } from '@/components/work/Blueprint';
import { useScroll } from '@/lib/scroll';

interface Props {
  project: Project | null;
  onClose: () => void;
  onNavigate: (p: Project) => void;
}

export function CaseDrawer({ project, onClose, onNavigate }: Props) {
  const { lock, unlock } = useScroll();
  const [shown, setShown] = useState<Project | null>(project);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = project !== null;

  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  useEffect(() => {
    if (!open) return;
    lock();
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
      prev?.focus({ preventScroll: true });
    };
  }, [open, lock, unlock, onClose]);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [project]);

  useEffect(() => {
    if (panel.current) panel.current.inert = !open;
  }, [open]);

  const i = shown ? PROJECTS.findIndex((p) => p.id === shown.id) : 0;
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        data-cursor="CLOSE"
        className={`absolute inset-0 bg-[#0d0d0d]/50 transition-opacity duration-700 ease-expo ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={shown ? `${shown.title} case study` : 'Case study'}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[880px] flex-col bg-canvas transition-transform duration-[900ms] ease-expo hair-l ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {shown && (
          <>
            <div className="flex h-16 shrink-0 items-center justify-between px-5 hair-b md:px-10">
              <p className="micro text-ink2">
                Dossier {shown.index} / {String(PROJECTS.length).padStart(2, '0')}
              </p>
              <button ref={closeBtn} type="button" onClick={onClose} className="micro group flex items-center gap-3" tabIndex={open ? 0 : -1}>
                Close
                <span className="relative block h-3 w-3 transition-transform duration-700 ease-expo group-hover:rotate-90">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-ink" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-ink" />
                </span>
              </button>
            </div>

            <div ref={body} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-5 pb-16 pt-10 md:px-10">
                <div className="micro flex flex-wrap gap-x-6 gap-y-2 text-ink2">
                  <span>{CATEGORY_LABEL[shown.category]}</span>
                  <span>{shown.year}</span>
                  <span>{shown.role}</span>
                  <span className="flex items-center gap-2 text-ink">
                    {shown.status === 'Live' && <span className="pulse-dot" />}
                    {shown.status}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{shown.title}</h3>
                <p className="mt-6 max-w-[54ch] text-lg leading-[1.5] text-ink2">{shown.summary}</p>

                <div className="inverted mt-10 bg-canvas p-5 text-ink md:p-8">
                  <Blueprint kind={shown.blueprint} seed={Number(shown.index)} label={`FIG. ${shown.index} — SYSTEM TOPOLOGY`} className="aspect-[4/3] w-full md:aspect-[16/9]" />
                </div>

                <dl className="mt-px grid grid-cols-2 gap-px bg-[var(--line)] hair md:grid-cols-4">
                  {shown.metrics.map((m) => (
                    <div key={m.label} className="bg-canvas p-4 md:p-5">
                      <dt className="micro text-ink2">{m.label}</dt>
                      <dd className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <section className="mt-14">
                  <h4 className="micro text-ink2">A — System architecture</h4>
                  <ol className="mt-5">
                    {shown.architecture.map((a, k) => (
                      <li key={a.layer} className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 hair-t">
                        <span className="micro col-span-12 md:col-span-1 md:pt-1">{String(k + 1).padStart(2, '0')}</span>
                        <span className="col-span-12 font-display text-lg font-semibold md:col-span-3">{a.layer}</span>
                        <span className="col-span-12 text-[15px] text-ink2 md:col-span-8">{a.detail}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="mt-14 grid gap-10 md:grid-cols-2">
                  <div>
                    <h4 className="micro text-ink2">B — Challenges</h4>
                    <ul className="mt-5 space-y-4">
                      {shown.challenges.map((c) => (
                        <li key={c} className="flex gap-3 text-[15px]">
                          <span className="text-ink2">—</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="micro text-ink2">C — Outcome</h4>
                    <p className="mt-5 font-serif text-2xl italic leading-[1.3]">{shown.outcome}</p>
                  </div>
                </section>

                <section className="mt-14">
                  <h4 className="micro text-ink2">D — Stack</h4>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {shown.stack.map((s) => (
                      <li key={s} className="rounded-full px-3 py-1.5 font-mono text-[12px] hair">
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <button
                  type="button"
                  onClick={() => onNavigate(next)}
                  tabIndex={open ? 0 : -1}
                  data-cursor="NEXT"
                  className="group mt-16 flex w-full items-end justify-between py-6 text-left hair-t hair-b"
                >
                  <span>
                    <span className="micro block text-ink2">Next dossier — {next.index}</span>
                    <span className="mt-3 block font-display text-3xl font-semibold tracking-[-0.03em] transition-transform duration-700 ease-expo group-hover:translate-x-2 md:text-4xl">
                      {next.title}
                    </span>
                  </span>
                  <span className="text-2xl transition-transform duration-700 ease-expo group-hover:translate-x-2">→</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
