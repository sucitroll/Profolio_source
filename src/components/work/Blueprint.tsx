import { useMemo } from 'react';
import type { Blueprint as Kind } from '@/data/projects';

function rng(seed: number) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 300;
const S = { stroke: 'currentColor', strokeWidth: 1.25, fill: 'none', vectorEffect: 'non-scaling-stroke' as const };
const FAINT = { ...S, strokeOpacity: 0.28 };

function Core({ r }: { r: () => number }) {
  const spokes = 12 + Math.floor(r() * 12);
  return (
    <g>
      {[110, 82, 54, 26].map((rad, i) => (
        <circle key={rad} cx={200} cy={150} r={rad} {...(i % 2 ? FAINT : S)} strokeDasharray={i === 1 ? '2 4' : undefined} />
      ))}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i / spokes) * Math.PI * 2;
        const inner = 26 + r() * 20;
        return <line key={i} x1={200 + Math.cos(a) * inner} y1={150 + Math.sin(a) * inner} x2={200 + Math.cos(a) * 110} y2={150 + Math.sin(a) * 110} {...FAINT} />;
      })}
      {Array.from({ length: 6 }, (_, i) => {
        const a = r() * Math.PI * 2;
        const rad = [54, 82, 110][i % 3];
        return <rect key={i} x={200 + Math.cos(a) * rad - 3} y={150 + Math.sin(a) * rad - 3} width={6} height={6} fill="currentColor" />;
      })}
      <line x1={60} y1={150} x2={340} y2={150} {...FAINT} />
      <line x1={200} y1={20} x2={200} y2={280} {...FAINT} />
    </g>
  );
}

function Mesh({ r }: { r: () => number }) {
  const nodes = Array.from({ length: 14 }, () => ({ x: 50 + r() * 300, y: 40 + r() * 220 }));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    near.forEach((n) => edges.push([i, n.j]));
  });
  return (
    <g>
      {edges.map(([i, j], k) => (
        <line key={k} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} {...(k % 3 ? FAINT : S)} />
      ))}
      {nodes.map((n, i) => (i % 4 === 0 ? <rect key={i} x={n.x - 4} y={n.y - 4} width={8} height={8} fill="currentColor" /> : <circle key={i} cx={n.x} cy={n.y} r={3.5} {...S} fill="rgb(var(--canvas))" />))}
    </g>
  );
}

function Ledger({ r }: { r: () => number }) {
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => {
        const y = 50 + i * 24;
        const w = 40 + r() * 140;
        return (
          <g key={i}>
            <line x1={40} y1={y} x2={360} y2={y} {...FAINT} />
            <rect x={70} y={y - 14} width={w} height={8} fill="currentColor" fillOpacity={i % 3 === 0 ? 1 : 0.3} />
            <rect x={300 - r() * 30} y={y - 14} width={30 + r() * 30} height={8} {...S} />
          </g>
        );
      })}
      <line x1={58} y1={30} x2={58} y2={270} {...S} />
      <line x1={260} y1={30} x2={260} y2={270} {...FAINT} strokeDasharray="2 4" />
    </g>
  );
}

function Terminal({ r }: { r: () => number }) {
  return (
    <g>
      <rect x={40} y={36} width={320} height={228} {...S} />
      <line x1={40} y1={60} x2={360} y2={60} {...S} />
      {[56, 68, 80].map((x) => (
        <circle key={x} cx={x} cy={48} r={3} {...S} />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const y = 84 + i * 20;
        const indent = Math.floor(r() * 3) * 16;
        return (
          <g key={i}>
            <path d={`M56 ${y - 4} l5 4 l-5 4`} {...(i === 7 ? S : FAINT)} />
            <rect x={72 + indent} y={y - 3} width={30 + r() * 170} height={6} fill="currentColor" fillOpacity={i === 7 ? 1 : 0.28} />
          </g>
        );
      })}
      <rect x={72} y={238} width={8} height={12} fill="currentColor" />
    </g>
  );
}

function Wave({ r }: { r: () => number }) {
  const series = [0, 1, 2].map((s) => {
    const amp = 14 + r() * 26;
    const f = 0.02 + r() * 0.03;
    const ph = r() * 6;
    let d = '';
    for (let x = 40; x <= 360; x += 4) d += `${x === 40 ? 'M' : 'L'}${x} ${90 + s * 60 + Math.sin(x * f + ph) * amp * Math.sin(x * 0.008)}`;
    return d;
  });
  return (
    <g>
      {Array.from({ length: 17 }, (_, i) => (
        <line key={i} x1={40 + i * 20} y1={264} x2={40 + i * 20} y2={i % 4 ? 260 : 254} {...S} />
      ))}
      <line x1={40} y1={264} x2={360} y2={264} {...S} />
      {series.map((d, i) => (
        <path key={i} d={d} {...(i === 1 ? S : FAINT)} />
      ))}
      <line x1={250} y1={30} x2={250} y2={264} {...S} strokeDasharray="3 3" />
    </g>
  );
}

function Radial({ r }: { r: () => number }) {
  const n = 7 + Math.floor(r() * 4);
  return (
    <g>
      <rect x={180} y={130} width={40} height={40} fill="currentColor" />
      <circle cx={200} cy={150} r={60} {...FAINT} strokeDasharray="2 4" />
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + r() * 0.3;
        const d = 90 + r() * 40;
        const x = 200 + Math.cos(a) * d;
        const y = 150 + Math.sin(a) * d * 0.82;
        return (
          <g key={i}>
            <line x1={200} y1={150} x2={x} y2={y} {...FAINT} />
            <rect x={x - 9} y={y - 9} width={18} height={18} {...S} fill="rgb(var(--canvas))" />
          </g>
        );
      })}
    </g>
  );
}

function Stack({ r }: { r: () => number }) {
  const layers = 5;
  return (
    <g>
      {Array.from({ length: layers }, (_, i) => {
        const y = 210 - i * 34;
        const p = `M200 ${y - 40} L320 ${y} L200 ${y + 40} L80 ${y} Z`;
        return <path key={i} d={p} {...(i === layers - 1 ? S : FAINT)} fill="rgb(var(--canvas))" />;
      })}
      <path d="M200 34 L320 74 L200 114 L80 74 Z" fill="currentColor" fillOpacity={0.08} />
      {Array.from({ length: 4 }, (_, i) => (
        <line key={i} x1={80 + i * 80} y1={30} x2={80 + i * 80} y2={30 + r() * 20} {...S} />
      ))}
    </g>
  );
}

function Grid({ r }: { r: () => number }) {
  const cols = 20;
  const rows = 13;
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, i) => {
        const x = 48 + (i % cols) * 16;
        const y = 50 + Math.floor(i / cols) * 16;
        const v = r();
        if (v > 0.9) return <rect key={i} x={x - 4} y={y - 4} width={8} height={8} fill="currentColor" />;
        if (v > 0.72) return <rect key={i} x={x - 4} y={y - 4} width={8} height={8} {...S} />;
        return <circle key={i} cx={x} cy={y} r={1} fill="currentColor" fillOpacity={0.4} />;
      })}
    </g>
  );
}

const KINDS: Record<Kind, (p: { r: () => number }) => JSX.Element> = {
  core: Core,
  mesh: Mesh,
  ledger: Ledger,
  terminal: Terminal,
  wave: Wave,
  radial: Radial,
  stack: Stack,
  grid: Grid,
};

export function Blueprint({ kind, seed, label, className = '' }: { kind: Kind; seed: number; label?: string; className?: string }) {
  const Body = KINDS[kind];
  const body = useMemo(() => <Body r={rng(seed)} />, [Body, seed]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`${kind} system diagram`} preserveAspectRatio="xMidYMid meet">
      {[
        [12, 12, 1, 1],
        [W - 12, 12, -1, 1],
        [12, H - 12, 1, -1],
        [W - 12, H - 12, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <path key={i} d={`M${x} ${y + 10 * sy} V${y} H${x + 10 * sx}`} {...S} />
      ))}
      {body}
      {label && (
        <text x={24} y={H - 20} fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize={10} letterSpacing={1}>
          {label}
        </text>
      )}
    </svg>
  );
}
