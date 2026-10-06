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
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <span className="lang-flag">{LANG_META[lang].flag}</span>
        <span className="lang-label">{LANG_META[lang].label}</span> ▾
      </button>
      <div className={`lang-menu${open ? ' open' : ''}`}>
        {LANG_ORDER.map((code) => (
          <div
            key={code}
            className={`lang-option${code === lang ? ' active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLang(code);
              setOpen(false);
            }}
          >
            <span className="lang-flag">{LANG_META[code].flag}</span> {LANG_META[code].name}
          </div>
        ))}
      </div>
    </div>
  );
}
