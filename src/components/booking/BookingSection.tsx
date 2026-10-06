import { useLanguage } from '../../i18n/LanguageContext';
import { BookingForm } from './BookingForm';

export function BookingSection() {
  const { t } = useLanguage();

  const infoItems = [t.book_info1, t.book_info2, t.book_info3, t.book_info4];

  return (
    <section id="book">
      <div className="container">
        <div className="book-wrap">
          <div className="book-info reveal show">
            <span className="badge">{t.book_badge}</span>
            <h2>{t.book_title}</h2>
            <p>{t.book_subtitle}</p>
            <ul className="info-list">
              {infoItems.map((item) => (
                <li key={item}>
                  <span className="ic">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
