import { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../common/ToastProvider';
import { useBooking } from '../../context/BookingContext';
import { useMapFocus } from '../../context/MapFocusContext';
import { hotels } from '../../data/hotels';
import { destinations } from '../../data/destinations';
import { CITY_NAMES } from '../../data/dictionaries';
import { hotelSelectedToast } from '../../i18n/dynamic';
import type { CityKey, Hotel } from '../../types';
import { HotelToolbar, type HotelFilters } from './HotelToolbar';
import { HotelCard } from './HotelCard';

export function HotelsSection() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const { selectDestination, setPrefillNotes } = useBooking();
  const { focusCity } = useMapFocus();

  const cityOptions = useMemo(
    () => Array.from(new Set(hotels.map((h) => h.cityKey))) as CityKey[],
    [],
  );

  const [filters, setFilters] = useState<HotelFilters>({
    city: '',
    minStars: 0,
    maxPrice: 10000,
    sort: 'rating',
  });

  const filtered = useMemo(() => {
    let list = hotels.filter(
      (h) => (!filters.city || h.cityKey === filters.city) && h.stars >= filters.minStars && h.price <= filters.maxPrice,
    );
    if (filters.sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price);
    else if (filters.sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters]);

  function handleBook(hotel: Hotel) {
    const matchingDestination = destinations.find((d) => d.cityKey === hotel.cityKey);
    if (matchingDestination) selectDestination(matchingDestination.id);
    setPrefillNotes(`${t.hotel_notes_prefix} ${hotel.name} (${CITY_NAMES[hotel.cityKey][lang]}) — ${hotel.price}₼${t.hotel_perNight}`);
    showToast(hotelSelectedToast[lang](hotel.name));
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleShowOnMap(hotel: Hotel) {
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
    focusCity(hotel.cityKey);
    showToast(`${hotel.name} — ${CITY_NAMES[hotel.cityKey][lang]}`);
  }

  return (
    <section id="hotels" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.hotels_badge}</span>
          <h2>{t.hotels_title}</h2>
          <p>{t.hotels_subtitle}</p>
        </div>
        <HotelToolbar cityOptions={cityOptions} filters={filters} onChange={setFilters} />
        {filtered.length === 0 ? (
          <div className="no-results">{t.hotel_noResults}</div>
        ) : (
          <div className="hotel-grid">
            {filtered.map((h) => (
              <HotelCard key={h.id} hotel={h} onBook={handleBook} onShowOnMap={handleShowOnMap} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
