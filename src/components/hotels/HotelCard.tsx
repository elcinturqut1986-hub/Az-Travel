import { useLanguage } from '../../i18n/LanguageContext';
import type { Hotel } from '../../types';
import { AMENITIES, CITY_NAMES } from '../../data/dictionaries';
import { HOTEL_FALLBACK_IMG } from '../../data/hotels';
import { useReveal } from '../../hooks/useReveal';

interface Props {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
  onShowOnMap: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onBook, onShowOnMap }: Props) {
  const { t, lang } = useLanguage();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`hotel-card${visible ? ' show' : ''}`}>
      <img
        src={hotel.img}
        alt={hotel.name}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = HOTEL_FALLBACK_IMG;
        }}
      />
      <div className="hotel-info">
        <h4>{hotel.name}</h4>
        <div className="hotel-stars">
          {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)} &nbsp;·&nbsp; {hotel.rating}
        </div>
        <div className="hotel-loc">📍 {CITY_NAMES[hotel.cityKey][lang]}</div>
        <div className="hotel-amenities">
          {hotel.amenities.map((a) => (
            <span key={a}>{AMENITIES[a][lang]}</span>
          ))}
        </div>
        <div className="hotel-bottom">
          <div className="hotel-price">{hotel.price}₼ <small>{t.hotel_perNight}</small></div>
          <div className="hotel-actions">
            <button type="button" className="hotel-map-btn" onClick={() => onShowOnMap(hotel)}>{t.map_badge}</button>
            <button type="button" className="hotel-book-btn" onClick={() => onBook(hotel)}>{t.hotel_book}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
