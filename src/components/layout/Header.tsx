import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useActiveSection } from '../../hooks/useActiveSection';
import { LangSwitcher } from '../common/LangSwitcher';

const SECTION_IDS = ['home', 'destinations', 'hotels', 'map', 'why', 'reviews', 'book'];

export function Header() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrolled } = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navRef.current && !navRef.current.contains(target)) setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('resize', closeMenuOnDesktop);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', closeMenuOnDesktop);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const links: { id: string; label: string }[] = [
    { id: 'home', label: t.nav_home },
    { id: 'destinations', label: t.nav_dest },
    { id: 'hotels', label: t.nav_hotels },
    { id: 'map', label: t.nav_map },
    { id: 'why', label: t.nav_why },
    { id: 'reviews', label: t.nav_reviews },
    { id: 'book', label: t.nav_book },
  ];

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <nav ref={navRef}>
        <a href="#home" className="logo">
          <span className="logo-mark">Az</span>Travel<span>.</span>
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
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
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            className="burger"
            aria-label="Menyunu aç və ya bağla"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
