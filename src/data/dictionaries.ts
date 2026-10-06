import type { AmenityKey, CityKey, LocalizedText, RegionKey, TagKey } from '../types';

/** Helper: languages that share the English copy (only Japanese, in this dataset). */
function withJa(entry: Omit<LocalizedText, 'ja'>): LocalizedText {
  return { ...entry, ja: entry.en } as LocalizedText;
}

export const REGIONS: Record<RegionKey, LocalizedText> = {
  city: withJa({ az: 'Şəhər', en: 'City', ru: 'Город', tr: 'Şehir', ar: 'مدينة', de: 'Stadt' }),
  mountain: withJa({ az: 'Dağ', en: 'Mountain', ru: 'Горы', tr: 'Dağ', ar: 'جبل', de: 'Berg' }),
  desert: withJa({ az: 'Səhra', en: 'Desert', ru: 'Пустыня', tr: 'Çöl', ar: 'صحراء', de: 'Wüste' }),
  coast: withJa({ az: 'Sahil', en: 'Coast', ru: 'Побережье', tr: 'Sahil', ar: 'ساحل', de: 'Küste' }),
  resort: withJa({ az: 'Sanatoriya', en: 'Resort', ru: 'Санаторий', tr: 'Tesis', ar: 'منتجع', de: 'Kurort' }),
  historic: withJa({ az: 'Tarixi', en: 'Historic', ru: 'Исторический', tr: 'Tarihi', ar: 'تاريخي', de: 'Historisch' }),
};

export const TAGS: Record<TagKey, LocalizedText> = {
  history: withJa({ az: 'Tarix', en: 'History', ru: 'История', tr: 'Tarih', ar: 'تاريخ', de: 'Geschichte' }),
  architecture: withJa({ az: 'Memarlıq', en: 'Architecture', ru: 'Архитектура', tr: 'Mimari', ar: 'عمارة', de: 'Architektur' }),
  nightlife: withJa({ az: 'Gecə Həyatı', en: 'Nightlife', ru: 'Ночная жизнь', tr: 'Gece Hayatı', ar: 'حياة ليلية', de: 'Nachtleben' }),
  culture: withJa({ az: 'Mədəniyyət', en: 'Culture', ru: 'Культура', tr: 'Kültür', ar: 'ثقافة', de: 'Kultur' }),
  gastronomy: withJa({ az: 'Qastronomiya', en: 'Gastronomy', ru: 'Гастрономия', tr: 'Gastronomi', ar: 'فن الطهي', de: 'Gastronomie' }),
  nature: withJa({ az: 'Təbiət', en: 'Nature', ru: 'Природа', tr: 'Doğa', ar: 'طبيعة', de: 'Natur' }),
  adventure: withJa({ az: 'Macəra', en: 'Adventure', ru: 'Приключение', tr: 'Macera', ar: 'مغامرة', de: 'Abenteuer' }),
  family: withJa({ az: 'Ailəvi', en: 'Family', ru: 'Семейный', tr: 'Aile', ar: 'عائلي', de: 'Familie' }),
  extreme: withJa({ az: 'Ekstremal', en: 'Extreme', ru: 'Экстрим', tr: 'Ekstrem', ar: 'متطرف', de: 'Extrem' }),
  photo: withJa({ az: 'Fotolar üçün', en: 'Photogenic', ru: 'Для фото', tr: 'Fotoğraf İçin', ar: 'للتصوير', de: 'Fotogen' }),
  unesco: withJa({ az: 'UNESCO', en: 'UNESCO', ru: 'ЮНЕСКО', tr: 'UNESCO', ar: 'يونسكو', de: 'UNESCO' }),
  geology: withJa({ az: 'Geologiya', en: 'Geology', ru: 'Геология', tr: 'Jeoloji', ar: 'جيولوجيا', de: 'Geologie' }),
  tea: withJa({ az: 'Çay Mədəniyyəti', en: 'Tea Culture', ru: 'Чайная культура', tr: 'Çay Kültürü', ar: 'ثقافة الشاي', de: 'Teekultur' }),
  nationalpark: withJa({ az: 'Milli Park', en: 'National Park', ru: 'Нац. парк', tr: 'Milli Park', ar: 'حديقة وطنية', de: 'Nationalpark' }),
  health: withJa({ az: 'Sağlamlıq', en: 'Health', ru: 'Здоровье', tr: 'Sağlık', ar: 'صحة', de: 'Gesundheit' }),
  relax: withJa({ az: 'İstirahət', en: 'Relaxation', ru: 'Отдых', tr: 'Dinlenme', ar: 'استرخاء', de: 'Entspannung' }),
  spa: withJa({ az: 'SPA', en: 'Spa', ru: 'СПА', tr: 'Spa', ar: 'سبا', de: 'Spa' }),
  exotic: withJa({ az: 'Ekzotik', en: 'Exotic', ru: 'Экзотика', tr: 'Egzotik', ar: 'غريب', de: 'Exotisch' }),
  ski: withJa({ az: 'Xizək', en: 'Skiing', ru: 'Лыжи', tr: 'Kayak', ar: 'تزلج', de: 'Skifahren' }),
  wintertourism: withJa({ az: 'Qış Turizmi', en: 'Winter Tourism', ru: 'Зимний туризм', tr: 'Kış Turizmi', ar: 'سياحة شتوية', de: 'Wintertourismus' }),
  popular: withJa({ az: 'Populyar', en: 'Popular', ru: 'Популярное', tr: 'Popüler', ar: 'شائع', de: 'Beliebt' }),
  eco: withJa({ az: 'Ekoturizm', en: 'Eco-tourism', ru: 'Экотуризм', tr: 'Ekoturizm', ar: 'سياحة بيئية', de: 'Ökotourismus' }),
};

export const AMENITIES: Record<AmenityKey, LocalizedText> = {
  wifi: withJa({ az: 'Wi-Fi', en: 'Wi-Fi', ru: 'Wi-Fi', tr: 'Wi-Fi', ar: 'واي فاي', de: 'Wi-Fi' }),
  pool: withJa({ az: 'Hovuz', en: 'Pool', ru: 'Бассейн', tr: 'Havuz', ar: 'مسبح', de: 'Pool' }),
  spa: withJa({ az: 'Spa', en: 'Spa', ru: 'СПА', tr: 'Spa', ar: 'سبا', de: 'Spa' }),
  breakfast: withJa({ az: 'Nahar daxil', en: 'Breakfast incl.', ru: 'Завтрак вкл.', tr: 'Kahvaltı dahil', ar: 'شامل الفطور', de: 'Frühstück inkl.' }),
  parking: withJa({ az: 'Avtoparklama', en: 'Parking', ru: 'Парковка', tr: 'Otopark', ar: 'موقف سيارات', de: 'Parkplatz' }),
  restaurant: withJa({ az: 'Restoran', en: 'Restaurant', ru: 'Ресторан', tr: 'Restoran', ar: 'مطعم', de: 'Restaurant' }),
  fitness: withJa({ az: 'Fitness', en: 'Fitness', ru: 'Фитнес', tr: 'Fitness', ar: 'لياقة', de: 'Fitness' }),
  beach: withJa({ az: 'Çimərlik', en: 'Beach', ru: 'Пляж', tr: 'Plaj', ar: 'شاطئ', de: 'Strand' }),
  treatment: withJa({ az: 'Müalicə', en: 'Treatment', ru: 'Лечение', tr: 'Tedavi', ar: 'علاج', de: 'Behandlung' }),
  ski: withJa({ az: 'Xizək', en: 'Skiing', ru: 'Лыжи', tr: 'Kayak', ar: 'تزلج', de: 'Skifahren' }),
  guesthouse: withJa({ az: 'Ev qonaqlığı', en: 'Guesthouse', ru: 'Гостевой дом', tr: 'Pansiyon', ar: 'بيت ضيافة', de: 'Gästehaus' }),
};

export const CITY_NAMES: Record<CityKey, LocalizedText> = {
  baku: withJa({ az: 'Bakı', en: 'Baku', ru: 'Баку', tr: 'Bakü', ar: 'باكو', de: 'Baku' }),
  sheki: withJa({ az: 'Şəki', en: 'Sheki', ru: 'Шеки', tr: 'Şeki', ar: 'شكي', de: 'Sheki' }),
  gabala: withJa({ az: 'Qəbələ', en: 'Gabala', ru: 'Габала', tr: 'Qəbələ', ar: 'قبلة', de: 'Gabala' }),
  khinaliq: withJa({ az: 'Quba — Xınalıq', en: 'Quba — Khinalig', ru: 'Куба — Хыналыг', tr: 'Quba — Hınalıq', ar: 'قوبا — خینالیق', de: 'Quba — Chinalig' }),
  gobustan: withJa({ az: 'Qobustan', en: 'Gobustan', ru: 'Гобустан', tr: 'Qobustan', ar: 'قوبوستان', de: 'Gobustan' }),
  lankaran: withJa({ az: 'Lənkəran', en: 'Lankaran', ru: 'Ленкорань', tr: 'Lənkəran', ar: 'لنكران', de: 'Lankaran' }),
  naftalan: withJa({ az: 'Naftalan', en: 'Naftalan', ru: 'Нафталан', tr: 'Naftalan', ar: 'نفتالان', de: 'Naftalan' }),
  nakhchivan: withJa({ az: 'Naxçıvan', en: 'Nakhchivan', ru: 'Нахичевань', tr: 'Nahçıvan', ar: 'ناخيتشيفان', de: 'Nachitschewan' }),
  qusar: withJa({ az: 'Qusar', en: 'Qusar', ru: 'Кусары', tr: 'Qusar', ar: 'قوسار', de: 'Qusar' }),
  zaqatala: withJa({ az: 'Zaqatala', en: 'Zaqatala', ru: 'Загатала', tr: 'Zaqatala', ar: 'زاقاتالا', de: 'Zaqatala' }),
  balakan: withJa({ az: 'Balakən', en: 'Balakan', ru: 'Балакен', tr: 'Balakən', ar: 'بالاكن', de: 'Balakan' }),
  qecres: withJa({ az: 'Qəçrəş', en: 'Qechresh', ru: 'Кечреш', tr: 'Geçreş', ar: 'كيجريش', de: 'Qechresh' }),
};

export const REGION_KEYS: RegionKey[] = ['city', 'mountain', 'desert', 'coast', 'resort', 'historic'];
export const TAG_FILTER_KEYS: TagKey[] = ['nature', 'adventure', 'family'];

export const MAP_COORDS: Record<CityKey, [number, number]> = {
  baku: [40.366, 49.8362],
  sheki: [41.1919, 47.1706],
  gabala: [40.9797, 47.8456],
  khinaliq: [41.1858, 48.3486],
  gobustan: [40.1092, 49.3853],
  lankaran: [38.7539, 48.8514],
  naftalan: [40.5064, 46.8181],
  nakhchivan: [39.2089, 45.4122],
  qusar: [41.4181, 48.0117],
  zaqatala: [41.6396, 46.6413],
  balakan: [41.7239, 46.4056],
  qecres: [41.3656, 48.4234],
};

export const TRAVEL_MINUTES: Record<CityKey, number> = {
  baku: 15, sheki: 270, gabala: 210, khinaliq: 270, gobustan: 75, lankaran: 270,
  naftalan: 290, nakhchivan: 480, qusar: 195, zaqatala: 340, balakan: 360, qecres: 210,
};
