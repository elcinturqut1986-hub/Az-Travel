import { useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../common/ToastProvider';
import { useBooking } from '../../context/BookingContext';
import { destinations } from '../../data/destinations';
import { todayIso } from '../../utils/format';

export function SearchCard() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const { selectDestination, setPrefillDate, setPrefillGuests, openDestinationModal } = useBooking();

  const [destId, setDestId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(t.guest2);
  const checkOutRef = useRef<HTMLInputElement | null>(null);

  const today = todayIso();

  function handleSearch() {
    if (checkIn && checkOut && checkOut < checkIn) {
      showToast(t.toast_checkoutOrder);
      return;
    }
    if (checkIn) setPrefillDate(checkIn);
    if (guests) setPrefillGuests(guests);

    if (destId) {
      const id = parseInt(destId, 10);
      selectDestination(id);
      openDestinationModal(id);
    } else {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(t.toast_search);
  }

  return (
    <div className="container">
      <div className="search-card reveal show">
        <div className="field">
          <label>{t.search_dest}</label>
          <select value={destId} onChange={(e) => setDestId(e.target.value)}>
            <option value="">{t.search_any}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name[lang]}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>{t.search_in}</label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOutRef.current && checkOut && e.target.value > checkOut) {
                setCheckOut(e.target.value);
              }
            }}
          />
        </div>
        <div className="field">
          <label>{t.search_out}</label>
          <input
            ref={checkOutRef}
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="field">
          <label>{t.search_guests}</label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value={t.guest1}>{t.guest1}</option>
            <option value={t.guest2}>{t.guest2}</option>
            <option value={t.guest3}>{t.guest3}</option>
            <option value={t.guest4}>{t.guest4}</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          🔍 <span>{t.search_btn}</span>
        </button>
      </div>
    </div>
  );
}
