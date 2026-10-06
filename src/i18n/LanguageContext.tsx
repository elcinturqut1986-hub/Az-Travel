import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from '../types';
import { translations, type Dictionary } from './translations';
import { LANG_META } from './langMeta';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  dir: 'ltr' | 'rtl';
}

const STORAGE_KEY = 'aztravel_lang';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'az';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  return stored && translations[stored] ? stored : 'az';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const dir = LANG_META[lang].dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang], dir }),
    [lang, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
