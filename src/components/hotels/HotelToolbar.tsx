import { useLanguage } from '../../i18n/LanguageContext';
import { CITY_NAMES } from '../../data/dictionaries';
import type { CityKey } from '../../types';

export interface HotelFilters {
  city: CityKey | '';
  minStars: number;
  maxPrice: number;
  sort: 'rating' | 'priceAsc' | 'priceDesc';
}

interface Props {
  cityOptions: CityKey[];
  filters: HotelFilters;
  onChange: (filters: HotelFilters) => void;
}

export function HotelToolbar({ cityOptions, filters, onChange }: Props) {
  const { t, lang } = useLanguage();

  return (
    <div className="hotel-toolbar reveal show">
      <div className="field">
        <label>{t.hotel_city}</label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value as CityKey | '' })}
        >
          <option value="">{t.all_option}</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{CITY_NAMES[city][lang]}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>{t.hotel_stars}</label>
        <select
          value={filters.minStars}
          onChange={(e) => onChange({ ...filters, minStars: Number(e.target.value) })}
        >
          <option value={0}>{t.all_option}</option>
          <option value={3}>{t.stars3}</option>
          <option value={4}>{t.stars4}</option>
          <option value={5}>{t.stars5}</option>
        </select>
      </div>
      <div className="field">
        <label>{t.hotel_maxprice}</label>
        <input
          type="range"
          min={40}
          max={10000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
        />
        <span style={{ fontSize: 12, color: 'var(--text-soft)' }}>
          {filters.maxPrice.toLocaleString('az-AZ')}₼
        </span>
      </div>
      <div className="field">
        <label>{t.hotel_sort}</label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as HotelFilters['sort'] })}
        >
          <option value="rating">{t.sort_rating}</option>
          <option value="priceAsc">{t.sort_priceAsc}</option>
          <option value="priceDesc">{t.sort_priceDesc}</option>
        </select>
      </div>
    </div>
  );
}
