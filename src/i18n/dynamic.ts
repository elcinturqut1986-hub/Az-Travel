import type { Lang } from '../types';

/** Templated strings that need an interpolated value — kept out of the plain Dictionary type. */
export const hotelSelectedToast: Record<Lang, (hotelName: string) => string> = {
  az: (n) => `"${n}" seçildi — bron formunu doldurun 👇`,
  en: (n) => `"${n}" selected — fill out the booking form 👇`,
  ru: (n) => `"${n}" выбран — заполните форму бронирования 👇`,
  tr: (n) => `"${n}" seçildi — rezervasyon formunu doldurun 👇`,
  ar: (n) => `تم اختيار "${n}" — املأ نموذج الحجز 👇`,
  de: (n) => `"${n}" ausgewählt — füllen Sie das Buchungsformular aus 👇`,
  ja: (n) => `「${n}」を選択しました。予約フォームに入力してください 👇`,
};
