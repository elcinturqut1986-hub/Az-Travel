import { useLanguage } from '../../i18n/LanguageContext';
import type { Destination } from '../../types';
import { REGIONS, TAGS } from '../../data/dictionaries';
import { getTravelTime } from '../../utils/format';
import { useReveal } from '../../hooks/useReveal';
import { useDestinationReviews } from '../../context/DestinationReviewsContext';

interface Props {
  destination: Destination;
  onOpen: (id: number) => void;
}

export function DestinationCard({ destination: d, onOpen }: Props) {
  const { t, lang } = useLanguage();
  const { getSummary } = useDestinationReviews();
  const summary = getSummary(d);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`card${visible ? ' show' : ''}`}
      onClick={() => onOpen(d.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(d.id);
        }
      }}
    >
      <div className="card-img">
        <img
          src={d.img}
          alt={d.name[lang]}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = d.fallbackImg;
          }}
        />
        <span className="card-tag">{TAGS[d.tagKey][lang]}</span>
        <span className="card-price">{d.price}₼ / {t.card_day}</span>
      </div>
      <div className="card-body">
        <h3>{d.name[lang]}</h3>
        <div className="card-loc">
          📍 {REGIONS[d.regionKey][lang]} {t.card_region_suffix} &nbsp;•&nbsp; 🕒 {d.duration[lang]}
          &nbsp;•&nbsp; 🚗 {t.card_arrival}: {getTravelTime(d.cityKey, lang)}
        </div>
        <p className="card-desc">{d.desc[lang].slice(0, 90)}...</p>
        <div className="card-foot">
          <div className="rating">★ {summary.rating} <span>({summary.count} {t.card_reviews})</span></div>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14 }}>{t.card_more}</span>
        </div>
      </div>
    </div>
  );
}
