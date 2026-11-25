import { useRef, useState } from 'react';
import { STACK, STACK_TOTAL, TIER_NOTE, type Tier } from '@/data/stack';
import { Line, SectionHead } from '@/components/SectionHead';
import { Magnetic } from '@/components/Magnetic';
import { useReveal } from '@/hooks/useReveal';

const TIERS: Tier[] = ['CORE', 'PRODUCTION', 'SYSTEMS', 'WORKING'];

export function StackMatrix() {
  const ref = useRef<HTMLElement>(null);
  const [group, setGroup] = useState<string>('all');
  const [tier, setTier] = useState<Tier | null>(null);
  useReveal(ref);

  const groups = group === 'all' ? STACK : STACK.filter((g) => g.id === group);

  return (
    <section id="stack" ref={ref} className="shell py-24 md:py-36">
      <SectionHead
        index="03"
        label="Technical matrix"
        meta={<>{STACK_TOTAL} Technologies — 06 Groups</>}
        title={
          <>
            <Line>The working</Line>
            <Line>
              <span className="font-serif font-normal normal-case italic tracking-[-0.02em]">arsenal.</span>
            </Line>
          </>
        }
      />

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
        <div className="col-span-12 lg:col-span-3" data-reveal="fade">
          <p className="max-w-[40ch] text-ink2">
            No percentage bars. Every entry is tagged by how it is actually used — in production, at systems level, or as a working tool.
          </p>
          <div className="mt-8">
            <p className="micro mb-3 text-ink2">Tier legend — select to isolate</p>
            <ul>
              {TIERS.map((t) => (
                <li key={t} className="hair-t last:hair-b">
                  <button
                    type="button"
                    onClick={() => setTier(tier === t ? null : t)}
                    aria-pressed={tier === t}
                    className="group flex w-full items-baseline justify-between gap-4 py-3 text-left"
                  >
                    <span className={`micro transition-colors ${tier === t ? 'text-ink' : 'text-ink2 group-hover:text-ink'}`}>
                      <span className={`mr-2 inline-block h-[7px] w-[7px] align-middle hair ${tier === t ? 'bg-ink' : ''}`} />
                      {t}
                    </span>
                    <span className="text-right text-[12px] text-ink2">{TIER_NOTE[t]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <div className="no-scrollbar -mx-1 mb-6 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Stack group" data-reveal="fade">
            {[{ id: 'all', code: '*', title: 'All' }, ...STACK].map((g) => (
              <Magnetic key={g.id} strength={0.2}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={group === g.id}
                  onClick={() => setGroup(g.id)}
                  className={`micro whitespace-nowrap rounded-full px-4 py-2.5 transition-colors duration-500 hair ${
                    group === g.id ? 'bg-ink text-canvas' : 'hover:bg-surface'
                  }`}
                >
                  {g.code} — {g.title}
                </button>
              </Magnetic>
            ))}
          </div>

          <div className={`grid gap-px bg-[var(--line)] hair ${group === 'all' ? 'md:grid-cols-2 xl:grid-cols-3' : ''}`}>
            {groups.map((g) => (
              <div key={g.id} className="bg-canvas">
                <div className="flex items-baseline justify-between px-4 py-4 hair-b md:px-5">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                    <span className="mr-2 font-mono text-[11px] font-normal text-ink2">{g.code}.</span>
                    {g.title}
                  </h3>
                  <span className="micro text-ink2">[{String(g.items.length).padStart(2, '0')}]</span>
                </div>
                <ul className={group === 'all' ? '' : 'grid sm:grid-cols-2'}>
                  {g.items.map((t, k) => {
                    const dim = tier !== null && tier !== t.tier;
                    return (
                      <li
                        key={t.name}
                        className={`group relative px-4 py-3 transition-opacity duration-500 md:px-5 ${k > 0 ? 'hair-t' : ''} ${dim ? 'opacity-25' : ''}`}
                      >
                        <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-ink transition-transform duration-500 ease-expo group-hover:scale-y-100" />
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-mono text-[13px]">{t.name}</span>
                          <span className={`micro shrink-0 ${tier === t.tier ? 'text-ink' : 'text-ink2'}`}>{t.tier}</span>
                        </div>
                        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-expo group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <p className="flex justify-between gap-3 pt-2 text-[12px] text-ink2">
                              <span>{t.context}</span>
                              <span className="font-mono">Since {t.since}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
