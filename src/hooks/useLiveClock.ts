import { useEffect, useState } from 'react';
import type { Dictionary } from '../i18n/translations';
import { LANG_META } from '../i18n/langMeta';
import type { Lang } from '../types';

export interface ClockState {
  greeting: string;
  hours: string;
  minutes: string;
  seconds: string;
  weekday: string;
  date: string;
}

function computeClock(lang: Lang, t: Dictionary): ClockState {
  const now = new Date();
  const locale = LANG_META[lang].locale;
  const hour = now.getHours();

  let greetKey: keyof Dictionary;
  if (hour >= 5 && hour < 12) greetKey = 'greet_morning';
  else if (hour >= 12 && hour < 18) greetKey = 'greet_afternoon';
  else if (hour >= 18 && hour < 23) greetKey = 'greet_evening';
  else greetKey = 'greet_night';

  let weekday = now.toDateString();
  let date = now.toLocaleDateString();
  let hours = String(now.getHours()).padStart(2, '0');
  try {
    weekday = new Intl.DateTimeFormat(locale, { weekday: 'long', numberingSystem: 'latn' }).format(now);
    date = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn' }).format(now);
    hours = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false }).format(now);
  } catch {
    // Intl not fully supported for this locale — fall back to defaults above.
  }

  return {
    greeting: t[greetKey],
    hours,
    minutes: String(now.getMinutes()).padStart(2, '0'),
    seconds: String(now.getSeconds()).padStart(2, '0'),
    weekday,
    date,
  };
}

/** Ticking clock synced to the active language's locale, updated every second. */
export function useLiveClock(lang: Lang, t: Dictionary): ClockState {
  const [clock, setClock] = useState<ClockState>(() => computeClock(lang, t));

  useEffect(() => {
    setClock(computeClock(lang, t));
    const id = window.setInterval(() => setClock(computeClock(lang, t)), 1000);
    return () => window.clearInterval(id);
  }, [lang, t]);

  return clock;
}
