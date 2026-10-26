import type { ReactElement } from 'react';

/*
 * Tiny decorative sketches, one per problem topic. Base strokes use currentColor
 * (muted); the highlighted parts use the accent colour.
 */

const svgProps = {
  viewBox: '0 0 132 56',
  fill: 'none',
  'aria-hidden': true,
  preserveAspectRatio: 'xMinYMid meet',
  className: 'h-14 w-full text-faint transition-colors duration-200 group-hover:text-mute',
} as const;

const hot = 'fill-accent/15 stroke-accent';

function ArraysViz() {
  return (
    <svg {...svgProps}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={6 + i * 20}
          y={12}
          width={18}
          height={20}
          rx={3}
          strokeWidth={1.25}
          className={i === 2 || i === 3 ? hot : 'stroke-current'}
        />
      ))}
      <path d="M15 40l-3.5 6h7z" className="fill-accent" />
      <path d="M115 40l-3.5 6h7z" className="fill-accent" />
    </svg>
  );
}

function StringsViz() {
  return (
    <svg {...svgProps}>
      <rect x={25} y={14} width={64} height={26} rx={5} strokeWidth={1.25} strokeDasharray="3 3" className={hot} />
      {'abcabc'.split('').map((char, i) => (
        <text
          key={i}
          x={14 + i * 21}
          y={32}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize={14}
          fill="currentColor"
        >
          {char}
        </text>
      ))}
    </svg>
  );
}

function TreesViz() {
  const edges: [number, number, number, number, boolean][] = [
    [66, 10, 36, 28, false],
    [66, 10, 96, 28, true],
    [36, 28, 21, 46, false],
    [36, 28, 51, 46, false],
    [96, 28, 81, 46, true],
    [96, 28, 111, 46, false],
  ];
  const nodes: [number, number, boolean][] = [
    [66, 10, true],
    [36, 28, false],
    [96, 28, true],
    [21, 46, false],
    [51, 46, false],
    [81, 46, true],
    [111, 46, false],
  ];
  return (
    <svg {...svgProps}>
      {edges.map(([x1, y1, x2, y2, on]) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth={1.25}
          className={on ? 'stroke-accent' : 'stroke-current'}
        />
      ))}
      {nodes.map(([cx, cy, on]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={5}
          strokeWidth={1.25}
          className={on ? hot : 'fill-surface stroke-current'}
        />
      ))}
    </svg>
  );
}

function GraphsViz() {
  const pts: Record<string, [number, number]> = {
    a: [20, 16],
    b: [62, 8],
    c: [106, 18],
    d: [40, 44],
    e: [88, 44],
  };
  const edges: [string, string, boolean][] = [
    ['a', 'b', false],
    ['b', 'c', false],
    ['a', 'd', true],
    ['b', 'd', false],
    ['b', 'e', false],
    ['c', 'e', false],
    ['d', 'e', true],
  ];
  return (
    <svg {...svgProps}>
      {edges.map(([from, to, on]) => (
        <line
          key={`${from}${to}`}
          x1={pts[from][0]}
          y1={pts[from][1]}
          x2={pts[to][0]}
          y2={pts[to][1]}
          strokeWidth={1.25}
          className={on ? 'stroke-accent' : 'stroke-current'}
        />
      ))}
      {Object.entries(pts).map(([key, [cx, cy]]) => (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={5}
          strokeWidth={1.25}
          className={key === 'a' || key === 'd' || key === 'e' ? hot : 'fill-surface stroke-current'}
        />
      ))}
    </svg>
  );
}

function DpViz() {
  const hotCells = new Set(['0-0', '1-1', '2-2', '2-3', '2-4']);
  const cells: ReactElement[] = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 5; c += 1) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={10 + c * 22}
          y={6 + r * 16}
          width={20}
          height={14}
          rx={2.5}
          strokeWidth={1.25}
          className={hotCells.has(`${r}-${c}`) ? hot : 'stroke-current'}
        />,
      );
    }
  }
  return <svg {...svgProps}>{cells}</svg>;
}

const visuals: Record<string, () => ReactElement> = {
  arrays: ArraysViz,
  strings: StringsViz,
  trees: TreesViz,
  graphs: GraphsViz,
  dp: DpViz,
};

export default function TopicVisual({ id }: { id: string }) {
  const Visual = visuals[id];
  return Visual ? <Visual /> : null;
}
