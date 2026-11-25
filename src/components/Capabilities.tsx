import { useRef, useState } from 'react';
import { CAPABILITIES } from '@/data/capabilities';
import { Line, SectionHead } from '@/components/SectionHead';
import { useReveal } from '@/hooks/useReveal';

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>('01');
  useReveal(ref);

  return (
    <section id="capabilities" ref={ref} className="shell py-24 md:py-36">
      <SectionHead
        index="01"
        label="Capabilities"
        meta={<>08 Domains</>}
        title={
          <>
            <Line>Eight domains,</Line>
            <Line>
              <span className="font-serif font-normal normal-case italic tracking-[-0.02em]">one</span> operator.
            </Line>
          </>
        }
      />

      <div className="mt-12 grid grid-cols-12 gap-x-6 md:mt-20">
        <p className="col-span-12 max-w-[42ch] text-ink2 md:col-span-3" data-reveal="fade">
          The full surface area of a production system — from wire protocol to rendered pixel — handled without hand-offs. Select a domain to
          inspect scope, deliverables and method.
        </p>

        <ol className="col-span-12 mt-10 md:col-span-9 md:mt-0" data-reveal="stagger">
          {CAPABILITIES.map((c) => {
            const isOpen = open === c.index;
            return (
              <li key={c.index} className="hair-t last:hair-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : c.index)}
                  aria-expanded={isOpen}
                  aria-controls={`cap-${c.index}`}
                  data-cursor={isOpen ? 'CLOSE' : 'INSPECT'}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left md:py-8"
                >
                  <span className="micro col-span-2 text-ink2 md:col-span-1">{c.index}</span>
                  <span className="col-span-9 font-display text-[clamp(1.35rem,2.8vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-transform duration-700 ease-expo group-hover:translate-x-2 md:col-span-10">
                    {c.title}
                  </span>
                  <span className="col-span-1 flex justify-end">
                    <span className="relative block h-3 w-3">
                      <span className="absolute left-0 top-1/2 h-px w-full bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-full w-px bg-ink transition-transform duration-700 ease-expo ${isOpen ? 'scale-y-0' : ''}`}
                      />
                    </span>
                  </span>
                </button>

                <div
                  id={`cap-${c.index}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-expo ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid grid-cols-12 gap-x-4 gap-y-8 pb-10 transition-[opacity,transform] duration-700 ease-expo ${
                        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                      }`}
                    >
                      <p className="col-span-12 max-w-[56ch] text-lg leading-[1.5] md:col-span-10 md:col-start-2">{c.lead}</p>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-2">
                        <p className="micro mb-4 text-ink2">Scope</p>
                        <ul className="space-y-2 text-[15px]">
                          {c.scope.map((s) => (
                            <li key={s} className="flex gap-3">
                              <span className="text-ink2">—</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <p className="micro mb-4 text-ink2">Deliverables</p>
                        <ul className="space-y-2 text-[15px]">
                          {c.deliverables.map((d) => (
                            <li key={d} className="flex gap-3">
                              <span className="text-ink2">+</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <p className="micro mb-4 text-ink2">Method</p>
                        <p className="font-serif text-xl italic leading-[1.35]">{c.method}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
