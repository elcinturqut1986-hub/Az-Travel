import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../common/ToastProvider';
import { isValidCardNumber, isValidExpiry } from '../../utils/validators';
import { formatAmount } from '../../utils/format';

type Currency = 'AZN' | 'USD' | 'EUR' | 'RUB';
type Step = 1 | 2 | 3;

interface CardErrors {
  name?: boolean;
  number?: boolean;
  exp?: boolean;
  cvv?: boolean;
}

function formatCardNumber(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(raw: string): string {
  let v = raw.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
  return v;
}

export function PaymentModal() {
  const { t } = useLanguage();
  const { isPaymentOpen, bookingSnapshot, closePaymentModal } = useBooking();
  const { showToast } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardLast4, setCardLast4] = useState('');
  const [currency, setCurrency] = useState<Currency>('AZN');
  const [errors, setErrors] = useState<CardErrors>({});
  const [confirmCode, setConfirmCode] = useState('');

  // Reset the flow whenever a fresh booking is handed off to us.
  useEffect(() => {
    if (isPaymentOpen) {
      setStep(1);
      setProcessing(false);
      setCardName('');
      setCardNumber('');
      setCardExp('');
      setCardCvv('');
      setCardLast4('');
      setCurrency('AZN');
      setErrors({});
    }
  }, [isPaymentOpen, bookingSnapshot]);

  useEffect(() => {
    document.body.style.overflow = isPaymentOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPaymentOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closePaymentModal();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closePaymentModal]);

  if (!isPaymentOpen || !bookingSnapshot) return null;

  function handleContinue() {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const nextErrors: CardErrors = {
      name: cardName.trim().length < 3,
      number: !isValidCardNumber(cleanNumber),
      exp: !isValidExpiry(cardExp),
      cvv: cardCvv.length !== 3,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setCardLast4(cleanNumber.slice(-4));
    setStep(2);
  }

  function handleConfirmPayment() {
    setStep(2);
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      setConfirmCode(`AZT-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(3);
      showToast(t.toast_paymentSuccess);
    }, 1800);
  }

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePaymentModal();
      }}
    >
      <div className="modal" style={{ maxWidth: 520 }}>
        <div className="modal-body">
          <button
            type="button"
            className="modal-close"
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,.08)', color: 'var(--text)' }}
            onClick={closePaymentModal}
            aria-label="Bağla"
          >
            ✕
          </button>

          <div className="pay-steps">
            <div className={`pay-step${step === 1 ? ' active' : ''}${step > 1 ? ' done' : ''}`}>{t.pay_step1}</div>
            <div className={`pay-step${step === 2 ? ' active' : ''}${step > 2 ? ' done' : ''}`}>{t.pay_step2}</div>
            <div className={`pay-step${step === 3 ? ' active' : ''}`}>{t.pay_step3}</div>
          </div>

          {step === 1 && (
            <div className="pay-panel active">
              <div className="card-preview">
                <div style={{ fontSize: 13, opacity: 0.85 }}>AzTravel Card</div>
                <div className="card-preview-num">
                  {formatCardNumber(cardNumber).padEnd(19, '•') || '•••• •••• •••• ••••'}
                </div>
                <div className="card-preview-bottom">
                  <span>{cardName.toUpperCase() || 'AD SOYAD'}</span>
                  <span>{cardExp || 'AA/İİ'}</span>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>{t.pay_cardName}</label>
                <input
                  type="text" autoComplete="cc-name" placeholder="Ad Soyad"
                  value={cardName} onChange={(e) => setCardName(e.target.value)}
                  style={errors.name ? { borderColor: 'var(--accent-2)' } : undefined}
                />
                {errors.name && <div className="error-msg" style={{ display: 'block' }}>{t.err_cardName}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>{t.pay_cardNumber}</label>
                <input
                  type="text" inputMode="numeric" autoComplete="cc-number" maxLength={19}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  style={errors.number ? { borderColor: 'var(--accent-2)' } : undefined}
                />
                {errors.number && <div className="error-msg" style={{ display: 'block' }}>{t.err_cardNumber}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.pay_exp}</label>
                  <input
                    type="text" inputMode="numeric" autoComplete="cc-exp" maxLength={5}
                    placeholder="AA/İİ"
                    value={cardExp} onChange={(e) => setCardExp(formatExpiry(e.target.value))}
                    style={errors.exp ? { borderColor: 'var(--accent-2)' } : undefined}
                  />
                  {errors.exp && <div className="error-msg" style={{ display: 'block' }}>{t.err_cardExp}</div>}
                </div>
                <div className="form-group">
                  <label>{t.pay_cvv}</label>
                  <input
                    type="text" inputMode="numeric" autoComplete="cc-csc" maxLength={3}
                    placeholder="123"
                    value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    style={errors.cvv ? { borderColor: 'var(--accent-2)' } : undefined}
                  />
                  {errors.cvv && <div className="error-msg" style={{ display: 'block' }}>{t.err_cardCvv}</div>}
                </div>
              </div>

              <button
                type="button" className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
                onClick={handleContinue}
              >
                {t.pay_continue}
              </button>
            </div>
          )}

          {step === 2 && !processing && (
            <div className="pay-panel active">
              <h3 style={{ marginBottom: 16, fontSize: 18 }}>{t.pay_confirmTitle}</h3>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label htmlFor="paymentCurrency">{t.pay_currency_label}</label>
                <select id="paymentCurrency" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                  <option value="AZN">₼ AZN — Azərbaycan manatı</option>
                  <option value="USD">$ USD — ABŞ dolları</option>
                  <option value="EUR">€ EUR — Avro</option>
                  <option value="RUB">₽ RUB — Rusiya rublu</option>
                </select>
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 18, marginBottom: 20, fontSize: 14 }}>
                <p><b>{t.form_name}:</b> {bookingSnapshot.name}</p>
                <p><b>{t.form_email}:</b> {bookingSnapshot.email}</p>
                <p><b>{t.form_dest}:</b> {bookingSnapshot.destinationLabel}</p>
                <p><b>{t.form_date}:</b> {bookingSnapshot.date} &nbsp;·&nbsp; <b>{t.form_guests}:</b> {bookingSnapshot.guests}</p>
                {bookingSnapshot.notes && <p><b>{t.form_notes}:</b> {bookingSnapshot.notes}</p>}
                <p><b>{t.pay_amount_label}</b> <strong>{formatAmount(bookingSnapshot.amount, currency)}</strong></p>
                <p><b>{t.pay_cardNumber}:</b> •••• •••• •••• {cardLast4 || '----'}</p>
              </div>
              <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleConfirmPayment}>
                {t.pay_confirmBtn}
              </button>
              <button
                type="button" className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', color: 'var(--text)', borderColor: 'var(--border)', marginTop: 10 }}
                onClick={() => setStep(1)}
              >
                {t.pay_back}
              </button>
            </div>
          )}

          {step === 2 && processing && (
            <div className="pay-processing show">
              <div className="spinner" />
              <p style={{ color: 'var(--text-soft)' }}>{t.pay_processing_text}</p>
            </div>
          )}

          {step === 3 && (
            <div className="pay-success show">
              <div className="check">✓</div>
              <h3 style={{ marginBottom: 8 }}>{t.pay_successTitle}</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 22 }}>
                <span>{t.pay_successCode}</span> <b style={{ color: 'var(--primary)' }}>{confirmCode}</b>
                <br />
                <span>{t.pay_successDesc}</span>
              </p>
              <button type="button" className="btn btn-primary" onClick={closePaymentModal}>{t.pay_close}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
