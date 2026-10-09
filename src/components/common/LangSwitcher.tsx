import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LANG_META, LANG_ORDER } from '../../i18n/langMeta';

export function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        type="button"
        className={`lang-btn${open ? ' open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Dil: ${LANG_META[lang].name}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <svg className="lang-globe" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span className="lang-label">{LANG_META[lang].label}</span>
        <svg className="lang-caret" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul className={`lang-menu${open ? ' open' : ''}`} role="listbox" aria-label="Dil seçimi">
        {LANG_ORDER.map((code) => (
          <li key={code} role="none">
            <button
              type="button"
              role="option"
              aria-selected={code === lang}
              className={`lang-option${code === lang ? ' active' : ''}`}
              tabIndex={open ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                setLang(code);
                setOpen(false);
              }}
            >
              <span className="lang-code">{LANG_META[code].label}</span>
              <span className="lang-name">{LANG_META[code].name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
