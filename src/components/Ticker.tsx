import { TICKER } from '@/data/profile';

export function Ticker({ items = TICKER, inverted = false }: { items?: string[]; inverted?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={`ticker relative overflow-hidden hair-t hair-b ${inverted ? 'inverted bg-canvas text-ink' : ''}`}
      aria-label="Engineering telemetry"
      data-cursor="PAUSE"
    >
      <div className="ticker-track py-4">
        {row.map((t, i) => (
          <span key={i} className="micro flex shrink-0 items-center gap-6 pr-6" aria-hidden={i >= items.length}>
            <span>{t}</span>
            <span className="text-ink2">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
