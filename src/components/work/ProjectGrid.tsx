import { CATEGORY_LABEL, type Project } from '@/data/projects';
import { Blueprint } from '@/components/work/Blueprint';

interface Props {
  projects: Project[];
  onOpen: (p: Project) => void;
}

export function ProjectGrid({ projects, onOpen }: Props) {
  return (
    <ul data-list className="grid grid-cols-1 gap-px bg-[var(--line)] hair sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((p, i) => (
        <li key={p.id} className={`bg-canvas ${i === 0 && projects.length > 2 ? 'xl:col-span-2' : ''}`}>
          <button
            type="button"
            onClick={() => onOpen(p)}
            data-cursor="VIEW"
            className="group flex h-full w-full flex-col p-5 text-left transition-colors duration-500 hover:bg-surface md:p-6"
          >
            <span className="micro flex w-full justify-between text-ink2">
              <span>
                {p.index} — {CATEGORY_LABEL[p.category]}
              </span>
              <span className="flex items-center gap-2">
                {p.status === 'Live' && <span className="pulse-dot" />}
                {p.status}
              </span>
            </span>
            <span className="relative my-6 block overflow-hidden">
              <Blueprint
                kind={p.blueprint}
                seed={Number(p.index)}
                label={`FIG. ${p.index} — ${p.metrics[0].value}`}
                className={`w-full transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04] ${i === 0 && projects.length > 2 ? 'aspect-[4/3] xl:aspect-[8/3]' : 'aspect-[4/3]'}`}
              />
            </span>
            <span className="mt-auto flex items-start justify-between gap-4">
              <span className="font-display text-2xl font-semibold leading-[1.1] tracking-[-0.03em]">{p.title}</span>
              <span className="mt-1 transition-transform duration-700 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </span>
            <span className="mt-3 line-clamp-2 text-[14px] text-ink2">{p.summary}</span>
            <span className="mt-5 flex flex-wrap gap-x-3 gap-y-1 hair-t pt-4 font-mono text-[11px] text-ink2">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
              <span className="ml-auto text-ink">{p.year}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
