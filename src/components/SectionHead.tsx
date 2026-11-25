import type { ReactNode } from 'react';

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  meta?: ReactNode;
}

export function SectionHead({ index, label, title, meta }: Props) {
  return (
    <header className="relative">
      <div className="hair-t absolute inset-x-0 top-0" data-draw />
      <div className="grid grid-cols-12 gap-x-4 pt-4 sm:gap-x-6">
        <p className="micro col-span-6 text-ink2 md:col-span-3">
          {index} / {label}
        </p>
        <div className="micro col-span-6 text-right text-ink2 md:col-span-3 md:col-start-10">{meta}</div>
      </div>
      <h2
        data-reveal="lines"
        className="mt-10 font-display text-[clamp(2.5rem,8vw,8.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] md:mt-16"
      >
        {title}
      </h2>
    </header>
  );
}

export function Line({ children }: { children: ReactNode }) {
  return (
    <span className="mask">
      <span>{children}</span>
    </span>
  );
}
