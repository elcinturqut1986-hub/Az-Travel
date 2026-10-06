import type { Lang } from '../types';

export interface LangMeta {
  flag: string;
  label: string;
  dir: 'ltr' | 'rtl';
  name: string;
  locale: string;
}

export const LANG_META: Record<Lang, LangMeta> = {
  az: { flag: '🇦🇿', label: 'AZ', dir: 'ltr', name: 'Azərbaycanca', locale: 'az-Latn-AZ' },
  en: { flag: '🇬🇧', label: 'EN', dir: 'ltr', name: 'English', locale: 'en-US' },
  ru: { flag: '🇷🇺', label: 'RU', dir: 'ltr', name: 'Русский', locale: 'ru-RU' },
  tr: { flag: '🇹🇷', label: 'TR', dir: 'ltr', name: 'Türkçe', locale: 'tr-TR' },
  ar: { flag: '🇸🇦', label: 'AR', dir: 'rtl', name: 'العربية', locale: 'ar-SA' },
  de: { flag: '🇩🇪', label: 'DE', dir: 'ltr', name: 'Deutsch', locale: 'de-DE' },
  ja: { flag: '🇯🇵', label: 'JA', dir: 'ltr', name: '日本語', locale: 'ja-JP' },
};

export const LANG_ORDER: Lang[] = ['az', 'en', 'ru', 'tr', 'ar', 'de', 'ja'];
