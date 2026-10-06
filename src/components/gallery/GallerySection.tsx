import { useLanguage } from '../../i18n/LanguageContext';

const GALLERY_IMAGES = [
  { cls: 'g1', src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=900&auto=format&fit=crop', alt: 'Bakı — İçərişəhər' },
  { cls: 'g2', src: '/gallery/sheki.jpg', alt: 'Şəki' },
  { cls: 'g3', src: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=900&auto=format&fit=crop', alt: 'Qəbələ' },
  { cls: 'g4', src: '/gallery/lankaran-canyon.jpg', alt: 'Lənkəran' },
  { cls: 'g5', src: '/Qobustan.jpg', alt: 'Qobustan' },
  { cls: 'g6', src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=900&auto=format&fit=crop', alt: 'Quba — Xınalıq' },
  { cls: 'g7', src: '/gallery/zakatala.jpg', alt: 'Zaqatala və Balakən' },
];

export function GallerySection() {
  const { t } = useLanguage();

  return (
    <section id="gallery">
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.gallery_badge}</span>
          <h2>{t.gallery_title}</h2>
        </div>
        <div className="gallery-grid reveal show">
          {GALLERY_IMAGES.map((img) => (
            <img key={img.cls} className={img.cls} src={img.src} alt={img.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
