import { useLanguage } from '../../i18n/LanguageContext';
import { useBooking } from '../../context/BookingContext';

export function WhySection() {
  const { t } = useLanguage();
  const { setPrefillNotes } = useBooking();

  function goToBooking() {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('bName')?.focus({ preventScroll: true });
  }

  const items = [
    { icon: '🗺️', title: t.why1_title, desc: t.why1_desc },
    { icon: '💳', title: t.why2_title, desc: t.why2_desc },
    { icon: '🏆', title: t.why3_title, desc: t.why3_desc },
    { icon: '📞', title: t.why4_title, desc: t.why4_desc },
  ];

  return (
    <section className="why" id="why">
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.why_badge}</span>
          <h2>{t.why_title}</h2>
        </div>
        <div className="why-grid">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="why-item reveal show"
              role={i === 1 ? 'button' : undefined}
              tabIndex={i === 1 ? 0 : undefined}
              onClick={i === 1 ? goToBooking : undefined}
              onKeyDown={
                i === 1
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goToBooking();
                      }
                    }
                  : undefined
              }
            >
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {i === 0 && (
                <button
                  type="button"
                  className="btn btn-outline why-action"
                  onClick={() => {
                    setPrefillNotes(t.why1_booking_note);
                    goToBooking();
                  }}
                >
                  {t.why1_action}
                </button>
              )}
              {i === 1 && <span className="why-action-label">{t.why2_action}</span>}
              {i === 2 && (
                <button
                  type="button"
                  className="btn btn-outline why-action"
                  onClick={() => {
                    setPrefillNotes(t.why3_booking_note);
                    goToBooking();
                  }}
                >
                  {t.why3_action}
                </button>
              )}
              {i === 3 && (
                <a className="btn btn-outline why-action" href="tel:+994515331003">
                  {t.why4_action}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
