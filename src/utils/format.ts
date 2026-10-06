import type { CityKey, Lang } from '../types';
import { TRAVEL_MINUTES } from '../data/dictionaries';

/** Renders a city's approximate travel time from Baku, in the given language's units. */
export function getTravelTime(cityKey: CityKey, lang: Lang): string {
  const minutes = TRAVEL_MINUTES[cityKey] || 0;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  switch (lang) {
    case 'ja':
      return `${hours ? `${hours}時間` : ''}${rest ? `${rest}分` : ''}` || '15分';
    case 'en':
      return `${hours ? `${hours} hr` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} min` : ''}` || '15 min';
    case 'ru':
      return `${hours ? `${hours} ч` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} мин` : ''}` || '15 мин';
    case 'de':
      return `${hours ? `${hours} Std.` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} Min.` : ''}` || '15 Min.';
    case 'ar':
      return `${hours ? `${hours} س` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} د` : ''}` || '15 د';
    case 'tr':
      return `${hours ? `${hours} saat` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} dakika` : ''}` || '15 dakika';
    default:
      return `${hours ? `${hours} saat` : ''}${hours && rest ? ' ' : ''}${rest ? `${rest} dəqiqə` : ''}` || '15 dəqiqə';
  }
}

const CURRENCY_RATES: Record<string, number> = { AZN: 1, USD: 1 / 1.7, EUR: 1 / 1.85, RUB: 1 / 0.019 };
const CURRENCY_SYMBOLS: Record<string, string> = { AZN: '₼', USD: '$', EUR: '€', RUB: '₽' };

export function formatAmount(azn: number, currency: keyof typeof CURRENCY_RATES): string {
  const amount = azn * (CURRENCY_RATES[currency] ?? 1);
  return `${CURRENCY_SYMBOLS[currency] ?? ''}${amount.toFixed(2)} ${currency}`;
}

export function todayIso(): string {
  return new Date().toISOString().split('T')[0];
}
