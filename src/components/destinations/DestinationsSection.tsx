import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { destinations } from '../../data/destinations';
import { TAG_FILTER_KEYS } from '../../data/dictionaries';
import { FilterBar, type FilterValue } from './FilterBar';
import { DestinationCard } from './DestinationCard';
import { useBooking } from '../../context/BookingContext';

const PAGE_SIZE_INITIAL = 6;
const PAGE_SIZE_STEP = 3;

export function DestinationsSection() {
  const { t } = useLanguage();
  const { openDestinationModal } = useBooking();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_INITIAL);

  const filtered = useMemo(() => {
    if (filter === 'all') return destinations;
    if ((TAG_FILTER_KEYS as string[]).includes(filter)) {
      return destinations.filter((d) => d.tags.includes(filter as any));
    }
    return destinations.filter((d) => d.regionKey === filter);
  }, [filter]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="destinations">
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.dest_badge}</span>
          <h2>{t.dest_title}</h2>
          <p>{t.dest_subtitle}</p>
        </div>
        <FilterBar
          value={filter}
          onChange={(v) => {
            setFilter(v);
            setVisibleCount(PAGE_SIZE_INITIAL);
          }}
        />
        <div className="grid">
          {visible.map((d) => (
            <DestinationCard key={d.id} destination={d} onOpen={openDestinationModal} />
          ))}
        </div>
        {visible.length < filtered.length && (
          <div className="see-more">
            <button
              type="button"
              className="btn btn-outline"
              style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE_STEP)}
            >
              {t.load_more}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
