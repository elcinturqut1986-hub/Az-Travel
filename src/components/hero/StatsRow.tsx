import { useEffect, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { useLanguage } from '../../i18n/LanguageContext';
import { destinations } from '../../data/destinations';

export function StatsRow() {
  const { t } = useLanguage();
  const [start, setStart] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setStart(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  const destCount = useCountUp(destinations.length, start);
  const clients = useCountUp(20, start);
  const years = useCountUp(10, start);
  const rating = useCountUp(4.8, start, 1);

  return (
    <div className="stats-row">
      <div className="stat"><b>{destCount}</b><span>{t.stat_dest}</span></div>
      <div className="stat"><b>{clients}+</b><span>{t.stat_clients}</span></div>
      <div className="stat"><b>{years}</b><span>{t.stat_years}</span></div>
      <div className="stat"><b>{rating}</b><span>{t.stat_rating}</span></div>
    </div>
  );
}
