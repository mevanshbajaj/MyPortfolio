import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  suffix?: string;
  decimals?: number;
}

/** Counts up to `to` the first time it scrolls into view. Screen readers get the final value straight away. */
export default function CountUp({ to, suffix = '', decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {to.toFixed(decimals)}
        {suffix}
      </span>
    </>
  );
}
