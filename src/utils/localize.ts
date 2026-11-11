import { SupportedLanguage } from '../types/i18n';
import { Category } from '../types/experience';

export const localizeDuration = (duration: string, language: SupportedLanguage) => {
  if (language === 'es') return duration;
  return duration
    .replace(/\bhoras?\b/gi, 'hours')
    .replace(/\bdías?\b/gi, 'days')
    .replace(/\bnoches?\b/gi, 'nights');
};

export const localizeCategory = (category: Category, language: SupportedLanguage) => {
  const labels: Record<Category, { es: string; en: string }> = {
    cultura: { es: 'Cultura', en: 'Culture' },
    gastronomia: { es: 'Gastronomía', en: 'Gastronomy' },
    naturaleza: { es: 'Naturaleza', en: 'Nature' },
    aventura: { es: 'Aventura', en: 'Adventure' },
    playa: { es: 'Playas & Costa', en: 'Beaches & Coast' },
    comunitario: { es: 'Turismo Comunitario', en: 'Community Tourism' },
    especial: { es: 'Experiencias Especiales', en: 'Special Experiences' },
    paquetes: { es: 'Paquetes Completos', en: 'Complete Packages' },
  };

  const item = labels[category] || labels.naturaleza;
  if (language === 'es') return item.es;
  return item.en;
};

export const loc = (
  language: SupportedLanguage,
  es: string,
  en: string,
  _pt?: string
): string => {
  if (language === 'es') return es;
  return en;
};
