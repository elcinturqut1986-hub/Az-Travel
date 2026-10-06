/** Supported interface languages. */
export type Lang = 'az' | 'en' | 'ru' | 'tr' | 'ar' | 'de' | 'ja';

/** A piece of text translated into every supported language. */
export type LocalizedText = Record<Lang, string>;

export type RegionKey = 'city' | 'mountain' | 'desert' | 'coast' | 'resort' | 'historic';

export type TagKey =
  | 'history' | 'architecture' | 'nightlife' | 'culture' | 'gastronomy'
  | 'nature' | 'adventure' | 'family' | 'extreme' | 'photo' | 'unesco'
  | 'geology' | 'tea' | 'nationalpark' | 'health' | 'relax' | 'spa'
  | 'exotic' | 'ski' | 'wintertourism' | 'popular' | 'eco';

export type AmenityKey =
  | 'wifi' | 'pool' | 'spa' | 'breakfast' | 'parking' | 'restaurant'
  | 'fitness' | 'beach' | 'treatment' | 'ski' | 'guesthouse';

export type CityKey =
  | 'baku' | 'sheki' | 'gabala' | 'khinaliq' | 'gobustan' | 'lankaran'
  | 'naftalan' | 'nakhchivan' | 'qusar' | 'zaqatala' | 'balakan' | 'qecres';

export interface Destination {
  id: number;
  cityKey: CityKey;
  regionKey: RegionKey;
  tagKey: TagKey;
  price: number;
  rating: number;
  reviews: number;
  duration: LocalizedText;
  img: string;
  fallbackImg: string;
  name: LocalizedText;
  desc: LocalizedText;
  tags: TagKey[];
}

export interface Hotel {
  id: number;
  name: string;
  cityKey: CityKey;
  stars: number;
  price: number;
  rating: number;
  img: string;
  amenities: AmenityKey[];
}

export interface Testimonial {
  avatar: string;
  name: string;
  quote: LocalizedText;
  loc: LocalizedText;
}

/** Snapshot of a booking, carried from the booking form into the payment modal. */
export interface BookingSnapshot {
  name: string;
  email: string;
  destinationLabel: string;
  date: string;
  guests: string;
  notes: string;
  amount: number;
  cardLast4: string;
}

export type ThemeMode = 'light' | 'dark';
