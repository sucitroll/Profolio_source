import { useRef } from 'react';
import { LOG, PRINCIPLES } from '@/data/profile';
import { Line, SectionHead } from '@/components/SectionHead';
import { useReveal } from '@/hooks/useReveal';

export function Archive() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="archive" ref={ref} className="shell py-24 md:py-36">
      <SectionHead
        index="04"
        label="Operating principles & log"
        meta={<>2021 — 2026</>}
        title={
          <>
            <Line>How the work</Line>
            <Line>
              gets <span className="font-serif font-normal normal-case italic tracking-[-0.02em]">done.</span>
            </Line>
          </>
        }
      />

      <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--line)] hair md:mt-20 md:grid-cols-2" data-reveal="stagger">
        {PRINCIPLES.map((p) => (
          <article key={p.index} className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-canvas p-6 md:min-h-[320px] md:p-10">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[900ms] ease-expo group-hover:scale-y-100" />
            <div className="relative flex items-baseline justify-between transition-colors duration-500 group-hover:text-canvas">
              <span className="micro">{p.index} /</span>
              <span className="micro opacity-60">{p.spec}</span>
            </div>
            <div className="relative transition-colors duration-500 group-hover:text-canvas">
              <h3 className="font-display text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.04em]">{p.title}</h3>
              <p className="mt-4 max-w-[44ch] opacity-70">{p.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-12 gap-x-6 md:mt-32">
        <div className="col-span-12 md:col-span-3">
          <p className="micro text-ink2">Chronology — Milestone ledger</p>
          <p className="mt-4 max-w-[34ch] text-ink2" data-reveal="fade">
            Six years from reverse engineering hobby servers to running infrastructure that moves money across three dozen domains.
          </p>
        </div>
        <ol className="col-span-12 mt-10 md:col-span-9 md:mt-0">
          {LOG.map((e) => (
            <li key={e.year} className="group grid grid-cols-12 gap-x-4 gap-y-3 py-8 hair-t last:hair-b" data-reveal="fade">
              <span className="col-span-12 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink2 transition-colors duration-500 group-hover:text-ink md:col-span-3">
                {e.year}
              </span>
              <div className="col-span-12 md:col-span-6">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{e.title}</h3>
                <p className="micro mt-2 text-ink2">{e.org}</p>
                <p className="mt-4 max-w-[52ch] text-ink2">{e.body}</p>
              </div>
              <ul className="col-span-12 flex flex-wrap content-start gap-x-4 gap-y-1 font-mono text-[11px] text-ink2 md:col-span-3 md:flex-col md:items-end">
                {e.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
