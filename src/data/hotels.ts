import type { Hotel } from '../types';

export const HOTEL_FALLBACK_IMG =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop';

export const hotels: Hotel[] = [
  {
    id: 1, name: 'Fairmont Baku', cityKey: 'baku', stars: 5, price: 280, rating: 4.9,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'pool', 'spa', 'breakfast'],
  },
  {
    id: 2, name: 'Sheki Saray Hotel', cityKey: 'sheki', stars: 4, price: 110, rating: 4.6,
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'parking', 'breakfast'],
  },
  {
    id: 3, name: 'Qafqaz Riverside Qəbələ', cityKey: 'gabala', stars: 5, price: 230, rating: 4.8,
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'pool', 'spa', 'fitness'],
  },
  {
    id: 4, name: 'Quba — Xınalıq Guesthouse', cityKey: 'khinaliq', stars: 3, price: 55, rating: 4.4,
    img: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'guesthouse'],
  },
  {
    id: 5, name: 'Şirvan Qobustan Lodge', cityKey: 'gobustan', stars: 3, price: 70, rating: 4.3,
    img: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'parking'],
  },
  {
    id: 6, name: 'Lənkəran Resort & Spa', cityKey: 'lankaran', stars: 4, price: 140, rating: 4.6,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'pool', 'beach', 'spa'],
  },
  {
    id: 7, name: 'Naftalan Health Resort', cityKey: 'naftalan', stars: 4, price: 190, rating: 4.7,
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=400&auto=format&fit=crop',
    amenities: ['treatment', 'spa', 'breakfast'],
  },
  {
    id: 8, name: 'Tabriz Naxçıvan Hotel', cityKey: 'nakhchivan', stars: 4, price: 120, rating: 4.5,
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'parking', 'restaurant'],
  },
  {
    id: 9, name: 'Shahdag Mountain Resort', cityKey: 'qusar', stars: 5, price: 260, rating: 4.8,
    img: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'ski', 'spa', 'fitness'],
  },
  {
    id: 10, name: 'Zaqatala Nature Lodge', cityKey: 'zaqatala', stars: 4, price: 95, rating: 4.6,
    img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'parking', 'restaurant'],
  },
  {
    id: 11, name: 'Balakən Boutique Hotel', cityKey: 'balakan', stars: 3, price: 65, rating: 4.4,
    img: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=400&auto=format&fit=crop',
    amenities: ['wifi', 'guesthouse', 'parking'],
  },
];
