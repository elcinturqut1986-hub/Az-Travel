import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { testimonials } from '../../data/testimonials';

export function TestimonialsSection() {
  const { lang, t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="reviews" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.reviews_badge}</span>
          <h2>{t.reviews_title}</h2>
        </div>
        <div className="testi-wrap reveal show">
          <div>
            {testimonials.map((tm, i) => (
              <div key={i} className={`testi-slide${i === index ? ' active' : ''}`}>
                <p className="testi-quote">{tm.quote[lang]}</p>
                <div className="testi-person">
                  <img src={tm.avatar} alt="" />
                  <div>
                    <b>{tm.name}</b>
                    <span>{tm.loc[lang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot${i === index ? ' active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
