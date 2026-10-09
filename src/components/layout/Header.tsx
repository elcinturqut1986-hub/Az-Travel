import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useActiveSection } from '../../hooks/useActiveSection';
import { LangSwitcher } from '../common/LangSwitcher';

const SECTION_IDS = ['home', 'destinations', 'hotels', 'map', 'why', 'reviews', 'book'];
const MOBILE_NAV_QUERY = '(max-width: 1100px)';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Header() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrolled } = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_NAV_QUERY);
    const closeMenuOnDesktop = () => {
      if (!mql.matches) setMenuOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (navRef.current && !navRef.current.contains(target)) setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    mql.addEventListener('change', closeMenuOnDesktop);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      mql.removeEventListener('change', closeMenuOnDesktop);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  const links: { id: string; label: string }[] = [
    { id: 'home', label: t.nav_home },
    { id: 'destinations', label: t.nav_dest },
    { id: 'hotels', label: t.nav_hotels },
    { id: 'map', label: t.nav_map },
    { id: 'why', label: t.nav_why },
    { id: 'reviews', label: t.nav_reviews },
    { id: 'book', label: t.nav_book },
  ];

  const headerClass = [scrolled ? 'scrolled' : '', menuOpen ? 'menu-open' : ''].filter(Boolean).join(' ');

  return (
    <header id="header" className={headerClass || undefined}>
      <nav ref={navRef} aria-label="Əsas naviqasiya">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">Az</span>
          <span className="logo-text">
            Travel<span className="logo-dot">.</span>
          </span>
        </a>
        <ul id="primary-nav" className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                aria-current={activeSection === link.id ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <LangSwitcher />
          <button
            type="button"
            className="theme-toggle"
            title="Rejimi dəyiş"
            aria-label="Rejimi dəyiş"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label="Menyunu aç və ya bağla"
            aria-controls="primary-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className="nav-backdrop" aria-hidden="true" onClick={() => setMenuOpen(false)} />
    </header>
  );
}
