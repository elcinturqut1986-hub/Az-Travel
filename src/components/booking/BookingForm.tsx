import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import { destinations } from '../../data/destinations';
import { isValidEmail, isValidPhone } from '../../utils/validators';
import { todayIso } from '../../utils/format';
import type { BookingSnapshot } from '../../types';

interface FieldErrors {
  name?: boolean;
  phone?: boolean;
  email?: boolean;
  date?: boolean;
}

export function BookingForm() {
  const { t, lang } = useLanguage();
  const {
    selectedDestinationId, selectDestination,
    prefillDate, prefillGuests, prefillNotes,
    startPayment,
  } = useBooking();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(t.guest2);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  const destinationId = selectedDestinationId ?? destinations[0].id;

  // Pick up prefills coming from the search bar or a hotel's "Book" button.
  useEffect(() => {
    if (prefillDate) setDate(prefillDate);
  }, [prefillDate]);
  useEffect(() => {
    if (prefillGuests) setGuests(prefillGuests);
  }, [prefillGuests]);
  useEffect(() => {
    if (prefillNotes) setNotes(prefillNotes);
  }, [prefillNotes]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: FieldErrors = {
      name: name.trim().length < 3,
      phone: !isValidPhone(phone),
      email: !isValidEmail(email),
      date: date === '',
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const destination = destinations.find((d) => d.id === destinationId) ?? destinations[0];
    const snapshot: BookingSnapshot = {
      name: name.trim(),
      email: email.trim(),
      destinationLabel: destination.name[lang],
      date,
      guests,
      notes: notes.trim(),
      amount: destination.price,
      cardLast4: '',
    };
    startPayment(snapshot);
  }

  return (
    <div className="book-form reveal show">
      <h3>{t.book_form_title}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bName">{t.form_name}</label>
            <input
              id="bName" type="text" autoComplete="name" required
              placeholder={t.form_name}
              value={name} onChange={(e) => setName(e.target.value)}
              style={errors.name ? { borderColor: 'var(--accent-2)' } : undefined}
            />
            {errors.name && <div className="error-msg" style={{ display: 'block' }}>{t.err_name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="bPhone">{t.form_phone}</label>
            <input
              id="bPhone" type="tel" autoComplete="tel" inputMode="tel" required
              placeholder="+994 XX XXX XX XX"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              style={errors.phone ? { borderColor: 'var(--accent-2)' } : undefined}
            />
            {errors.phone && <div className="error-msg" style={{ display: 'block' }}>{t.err_phone}</div>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bEmail">{t.form_email}</label>
            <input
              id="bEmail" type="email" autoComplete="email" required
              placeholder="email@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={errors.email ? { borderColor: 'var(--accent-2)' } : undefined}
            />
            {errors.email && <div className="error-msg" style={{ display: 'block' }}>{t.err_email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="bDest">{t.form_dest}</label>
            <select id="bDest" required value={destinationId} onChange={(e) => selectDestination(Number(e.target.value))}>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name[lang]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bDate">{t.form_date}</label>
            <input
              id="bDate" type="date" required min={todayIso()}
              value={date} onChange={(e) => setDate(e.target.value)}
              style={errors.date ? { borderColor: 'var(--accent-2)' } : undefined}
            />
            {errors.date && <div className="error-msg" style={{ display: 'block' }}>{t.err_date}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="bGuests">{t.form_guests}</label>
            <select id="bGuests" required value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value={t.guest1}>{t.guest1}</option>
              <option value={t.guest2}>{t.guest2}</option>
              <option value={t.guest3}>{t.guest3}</option>
              <option value={t.guest4}>{t.guest4}</option>
            </select>
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label htmlFor="bNotes">{t.form_notes}</label>
          <textarea
            id="bNotes" maxLength={1000}
            placeholder={t.form_notes_ph}
            value={notes} onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          {t.form_submit}
        </button>
      </form>
    </div>
  );
}
