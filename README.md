# AzTravel — React + TypeScript

Bu, əvvəlki tək-fayl HTML versiyasının tam peşəkar React (Vite + TypeScript)
layihəsinə çevrilmiş formasıdır. Bütün kodlar məntiqinə görə ayrı fayllara
bölünüb (komponentlər, data, i18n, hooks, kontekstlər, stillər).

## Papka strukturu

```
aztravel-app/
├── index.html                 Vite giriş HTML-i
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                React-i DOM-a bağlayan giriş nöqtəsi
    ├── App.tsx                 Bütün provider və bölmələrin tərtibi
    ├── vite-env.d.ts
    ├── styles/
    │   └── global.css          Bütün dizayn (dəyişənlər, animasiyalar, media query-lər)
    ├── types/
    │   └── index.ts            Ümumi TypeScript tipləri (Destination, Hotel və s.)
    ├── i18n/
    │   ├── translations.ts     7 dildə (AZ/EN/RU/TR/AR/DE/JA) mətn lüğəti
    │   ├── dynamic.ts          Dəyişəni olan (parametrli) mətnlər
    │   ├── langMeta.ts         Bayraq, istiqamət (RTL/LTR), locale məlumatı
    │   └── LanguageContext.tsx Dil konteksti (React Context + localStorage)
    ├── context/
    │   ├── BookingContext.tsx  Axtarış → otel → bron → ödəniş axınının ortaq vəziyyəti
    │   └── MapFocusContext.tsx Otel kartından xəritəyə "uç" əmri üçün körpü
    ├── data/
    │   ├── destinations.ts     12 istiqamətin tam məlumatı
    │   ├── hotels.ts           Otellərin siyahısı
    │   ├── testimonials.ts     Müştəri rəyləri
    │   └── dictionaries.ts     Region/tag/amenity/şəhər adları, xəritə koordinatları
    ├── hooks/
    │   ├── useTheme.ts         İşıqlı/qaranlıq rejim
    │   ├── useLiveClock.ts     Canlı saat + salamlama
    │   ├── useScrollProgress.ts  Scroll faiz zolağı, header kölgəsi, "yuxarı" düyməsi
    │   ├── useActiveSection.ts  Aktiv naviqasiya bağlantısı
    │   ├── useReveal.ts        Scroll-da görünmə animasiyası (IntersectionObserver)
    │   └── useCountUp.ts       Statistika rəqəmlərinin animasiyası
    ├── utils/
    │   ├── validators.ts       Kart nömrəsi (Luhn), tarix, email, telefon yoxlamaları
    │   └── format.ts           Səyahət vaxtı, valyuta formatlaşdırması
    └── components/
        ├── layout/             Header, Footer, ScrollProgress, BackToTop
        ├── hero/                Hero, LiveClock, StatsRow
        ├── search/              SearchCard
        ├── destinations/        FilterBar, DestinationCard, DestinationsSection, DestinationModal
        ├── hotels/              HotelToolbar, HotelCard, HotelsSection
        ├── map/                 MapSection (Leaflet)
        ├── why/                 WhySection
        ├── gallery/             GallerySection
        ├── testimonials/        TestimonialsSection
        ├── cta/                 NewsletterCTA
        ├── booking/             BookingSection, BookingForm, PaymentModal
        └── common/              ToastProvider, LangSwitcher
```

## Quraşdırma və işə salma

```bash
npm install
npm run dev       # http://localhost:5173 ünvanında inkişaf serveri
npm run build     # dist/ qovluğuna production build
npm run preview   # production build-i lokal olaraq önizləmə
```

## Texnologiyalar

- **React 18** + **TypeScript** — tip-təhlükəsiz komponent arxitekturası
- **Vite** — sürətli dev server və build
- **Leaflet** (npm paketi) — interaktiv xəritə, `react-leaflet` olmadan birbaşa DOM inteqrasiyası
- Xarici UI kitabxanası yoxdur — bütün dizayn `src/styles/global.css`-də əl ilə yazılıb (CSS dəyişənləri, `prefers-color-scheme`/`data-theme` ilə tünd rejim, tam responsiv media query-lər)

## Əsas funksionallıq

- 7 dildə tam tərcümə (Azərbaycan, İngilis, Rus, Türk, Ərəb — RTL dəstəyi ilə, Alman, Yapon)
- İşıqlı/qaranlıq tema, `localStorage`-də saxlanılır
- Axtarış kartı → istiqamət seçimi bron formuna avtomatik ötürülür
- Filtrlənə bilən istiqamətlər qalereyası (region və mövzu üzrə)
- Filtrlənə və sıralana bilən otellər (şəhər, ulduz, qiymət, sıralama)
- Leaflet ilə interaktiv xəritə — siyahıdan və ya otel kartından "uç"
- Tam bron axını: forma → validasiya → ödəniş modalı (kart nömrəsi Luhn alqoritmi ilə yoxlanılır) → təsdiq
- Canlı saat, animasiyalı statistika, scroll-da görünmə effektləri, scroll-progress zolağı, "yuxarı qayıt" düyməsi, aktiv naviqasiya
