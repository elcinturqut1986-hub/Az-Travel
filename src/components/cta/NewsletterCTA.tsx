import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useToast } from '../common/ToastProvider';
import { isValidEmail } from '../../utils/validators';

export function NewsletterCTA() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      showToast(t.toast_subscribeInvalid);
      return;
    }

    const subject = encodeURIComponent('AzTravel newsletter subscription');
    const body = encodeURIComponent(`Please add ${normalizedEmail} to the AzTravel newsletter mailing list.`);
    window.location.href = `mailto:info@aztravel.az?subject=${subject}&body=${body}`;
    showToast(t.toast_subscribed);
  }

  return (
    <section>
      <div className="container">
        <div className="cta reveal show">
          <div className="cta-inner">
            <h2>{t.cta_title}</h2>
            <p>{t.cta_subtitle}</p>
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={t.cta_placeholder}
                aria-label={t.cta_placeholder}
                maxLength={254}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-accent" type="submit">{t.cta_btn}</button>
            </form>
            <small className="cta-delivery-note">{t.cta_delivery_note}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
