import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LiveClock } from './LiveClock';
import { StatsRow } from './StatsRow';

export function Hero() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`hero${ready ? ' hero-ready' : ''}`} id="home">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="badge">{t.hero_badge}</span>
          <h1>
            {t.hero_title_pre} <em>{t.hero_title_em}</em> {t.hero_title_post}
          </h1>
          <p>{t.hero_subtitle}</p>
          <div className="hero-actions">
            <a href="#destinations" className="btn btn-accent">{t.hero_btn1}</a>
            <a href="#book" className="btn btn-outline">{t.hero_btn2}</a>
          </div>
          <StatsRow />
        </div>
        <LiveClock />
      </div>
    </section>
  );
}
