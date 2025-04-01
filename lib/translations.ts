import { en } from './translations/en';
import { hi } from './translations/hi';

export type Language = 'en' | 'hi';

export type Translation = typeof en;

export const translations: Record<Language, Translation> = {
  en,
  hi,
};

export function useTranslations(language: Language): Translation {
  return translations[language];
} 