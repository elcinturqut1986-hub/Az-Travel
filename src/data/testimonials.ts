import type { Testimonial } from '../types';

function withJa<T extends { en: string }>(entry: T): T & { ja: string } {
  return { ...entry, ja: entry.en };
}

export const testimonials: Testimonial[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    name: 'Turqut Ələkbərli',
    quote: withJa({
      az: '"Şəki və Qəbələ turu inanılmaz idi. Bələdçimiz hər detalı bilirdi, otel seçimi mükəmməl oldu. Növbəti dəfə də AzTravel ilə səyahət edəcəyəm."',
      en: "\"The Sheki and Gabala tour was incredible. Our guide knew every detail, and the hotel choice was perfect. I'll travel with AzTravel again.\"",
      ru: '"Тур в Шеки и Габалу был потрясающим. Наш гид знал каждую деталь, отель был выбран идеально. Снова поеду с AzTravel."',
      tr: '"Şeki ve Qəbələ turu inanılmazdı. Rehberimiz her detayı biliyordu, otel seçimi mükemmeldi. Bir dahaki sefere de AzTravel ile seyahat edeceğim."',
      ar: '"كانت جولة شكي وقبلة رائعة. مرشدنا كان يعرف كل التفاصيل، واختيار الفندق كان مثاليًا. سأسافر مرة أخرى مع AzTravel."',
      de: '"Die Sheki- und Gabala-Tour war unglaublich. Unser Guide kannte jedes Detail, und die Hotelwahl war perfekt."',
    }),
    loc: withJa({ az: 'Bakı, Azərbaycan', en: 'Baku, Azerbaijan', ru: 'Баку, Азербайджан', tr: 'Bakü, Azerbaycan', ar: 'باكو، أذربيجان', de: 'Baku, Aserbaidschan' }),
  },
  {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    name: 'Leyla Ələkbərli',
    quote: withJa({
      az: '"Quba — Xınalıq səyahəti unudulmaz təcrübə oldu. Yol boyu bütün təşkilat qüsursuz idi, qiymət də çox münasib."',
      en: '"The trip to Khinalig village was an unforgettable experience. Everything was organized flawlessly, and the price was very reasonable."',
      ru: '"Поездка в село Хыналыг стала незабываемым опытом. Всё было организовано безупречно, а цена — очень разумной."',
      tr: '"Hınalıq köyüne seyahat unutulmaz bir deneyimdi. Yol boyunca her şey kusursuz organize edilmişti, fiyat da oldukça uygundu."',
      ar: '"كانت الرحلة إلى قرية خینالیق تجربة لا تُنسى. كان كل شيء منظمًا بشكل مثالي."',
      de: '"Die Reise zum Dorf Chinalig war ein unvergessliches Erlebnis. Alles war tadellos organisiert."',
    }),
    loc: withJa({ az: 'Gəncə, Azərbaycan', en: 'Ganja, Azerbaijan', ru: 'Гянджа, Азербайджан', tr: 'Gence, Azerbaycan', ar: 'كنجة، أذربيجان', de: 'Ganja, Aserbaidschan' }),
  },
  {
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    name: 'Turqut Ələkbərli',
    quote: withJa({
      az: '"Naftalan sanatoriyasında keçirdiyimiz həftə sonu ailəmiz üçün ən yaxşı istirahət oldu. Hər şey vaxtında və peşəkar idi."',
      en: '"The weekend we spent at the Naftalan resort was the best rest for our family. Everything was on time and professional."',
      ru: '"Выходные, проведённые в санатории Нафталан, стали лучшим отдыхом для нашей семьи."',
      tr: '"Naftalan sanatoryumunda geçirdiğimiz hafta sonu ailemiz için en iyi dinlenme oldu."',
      ar: '"كانت عطلة نهاية الأسبوع التي قضيناها في منتجع نفتالان أفضل استراحة لعائلتنا."',
      de: '"Das Wochenende im Naftalan-Resort war die beste Erholung für unsere Familie."',
    }),
    loc: withJa({ az: 'Sumqayıt, Azərbaycan', en: 'Sumgait, Azerbaijan', ru: 'Сумгаит, Азербайджан', tr: 'Sumqayıt, Azerbaycan', ar: 'سومقيت، أذربيجان', de: 'Sumgait, Aserbaidschan' }),
  },
];
