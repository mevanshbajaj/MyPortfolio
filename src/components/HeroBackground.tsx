interface Packet {
  axis: 'h' | 'v';
  /** Offset in px; multiples of the 56px grid size so packets ride the grid lines. */
  at: number;
  duration: number;
  delay: number;
}

const packets: Packet[] = [
  { axis: 'h', at: 168, duration: 12, delay: -2 },
  { axis: 'h', at: 392, duration: 16, delay: -9 },
  { axis: 'h', at: 616, duration: 14, delay: -5 },
  { axis: 'v', at: 280, duration: 15, delay: -4 },
  { axis: 'v', at: 728, duration: 18, delay: -11 },
  { axis: 'v', at: 1008, duration: 13, delay: -7 },
];

/** Minimal, static grid with a few light streaks travelling along it. Transform-only animation. */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-field">
        <div className="hero-grid" />
        {packets.map((packet) => (
          <span
            key={`${packet.axis}-${packet.at}`}
            className={`packet ${packet.axis === 'h' ? 'packet-h' : 'packet-v'}`}
            style={{
              ...(packet.axis === 'h' ? { top: packet.at } : { left: packet.at }),
              animationDuration: `${packet.duration}s`,
              animationDelay: `${packet.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-0 h-[420px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.06] blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
