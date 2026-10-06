import { useEffect, useState } from 'react';

/** Animates a number from 0 to `end` over ~1.5s once `start` becomes true. */
export function useCountUp(end: number, start: boolean, decimals = 0): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = end / 60;
    const id = window.setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        window.clearInterval(id);
      }
      setValue(current);
    }, 25);
    return () => window.clearInterval(id);
  }, [end, start]);

  return decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));
}
