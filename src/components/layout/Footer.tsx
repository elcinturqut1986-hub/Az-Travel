import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

function buildQrUrl(pageUrl: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=${encodeURIComponent(pageUrl)}`;
}

export function Footer() {
  const { t } = useLanguage();
  const [qrInput, setQrInput] = useState('');
  const [qrSrc, setQrSrc] = useState('');
  const [qrStatus, setQrStatus] = useState('');

  useEffect(() => {
    const pageUrl = window.location.href.split('#')[0];
    setQrInput(pageUrl);
    generateQr(pageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateQr(value: string) {
    let url: URL;
    try {
      url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol');
    } catch {
      setQrStatus('Zəhmət olmasa http:// və ya https:// ilə başlayan düzgün URL daxil edin.');
      return;
    }
    setQrSrc(buildQrUrl(url.href));
    if (window.location.protocol === 'file:') {
      setQrStatus('Hazırda fayl lokal açılıb. Telefonda işləməsi üçün yuxarıdakı xanaya saytın HTTPS ünvanını yazın.');
    } else if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
      setQrStatus('Telefonla skan üçün lokal serveri şəbəkə ünvanı ilə açın və ya yayımlanmış HTTPS URL yazın.');
    } else {
      setQrStatus('QR kod hazırdır. Telefon kamerası ilə skan edin.');
    }
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#home" className="logo" style={{ color: '#fff' }}>
              <span className="logo-mark">Az</span>Travel<span>.</span>
            </a>
            <p style={{ marginTop: 16 }}>{t.footer_desc}</p>
            <div className="social-row">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://wa.me/994515331003" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
              <a href="https://www.google.com/maps/search/?api=1&query=AzTravel+Baku" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">G</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div>
            <h4>{t.footer_nav}</h4>
            <ul>
              <li><a href="#destinations">{t.nav_dest}</a></li>
              <li><a href="#why">{t.nav_why}</a></li>
              <li><a href="#gallery">{t.gallery_badge}</a></li>
              <li><a href="#reviews">{t.nav_reviews}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer_services}</h4>
            <ul>
              <li><a href="#book">{t.footer_service1}</a></li>
              <li><a href="#book">{t.footer_service2}</a></li>
              <li><a href="#hotels">{t.footer_service3}</a></li>
              <li><a href="#book">{t.footer_service4}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer_contact}</h4>
            <ul>
              <li>📍 <span>{t.footer_address}</span></li>
              <li>
                📞{' '}
                <a className="footer-phone" href="tel:+994515331003" aria-label="0515331003 nömrəsinə zəng et">
                  0515331003
                </a>
              </li>
              <li>✉️ info@aztravel.az</li>
            </ul>
          </div>
        </div>

        <div className="footer-qr" aria-labelledby="qrTitle">
          {qrSrc && (
            <img className="footer-qr-image" width={148} height={148} src={qrSrc} alt="AzTravel mobil səhifə QR kodu" />
          )}
          <div className="footer-qr-copy">
            <h4 id="qrTitle">Telefonla açmaq üçün QR kod</h4>
            <p>Bu kodu telefon kameranızla skan edin. Səhifə telefonda rahat istifadə üçün uyğunlaşdırılıb.</p>
            <div className="qr-url-row">
              <input
                type="url"
                inputMode="url"
                placeholder="https://..."
                aria-label="QR kod üçün səhifə ünvanı"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateQr(qrInput.trim())}
              />
              <button type="button" onClick={() => generateQr(qrInput.trim())}>QR yarat</button>
            </div>
            <span className="qr-status" role="status" aria-live="polite">{qrStatus}</span>
          </div>
        </div>

        <div className="footer-bottom">{t.footer_bottom}</div>
      </div>
    </footer>
  );
}
