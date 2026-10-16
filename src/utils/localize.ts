import { SupportedLanguage } from '../types/i18n';
import { Category } from '../types/experience';
import { translateToPortuguese } from './portugueseTranslator';

export const localizeDuration = (duration: string, language: SupportedLanguage) => {
  if (language === 'es') return duration;

  if (language === 'pt') {
    return duration
      .replace(/\bhoras?\b/gi, 'horas')
      .replace(/\bdías?\b/gi, 'dias')
      .replace(/\bnoches?\b/gi, 'noites');
  }

  return duration
    .replace(/\bhoras?\b/gi, 'hours')
    .replace(/\bdías?\b/gi, 'days')
    .replace(/\bnoches?\b/gi, 'nights');
};

export const localizeCategory = (category: Category, language: SupportedLanguage) => {
  const labels: Record<Category, { es: string; en: string; pt: string }> = {
    cultura: { es: 'Cultura', en: 'Culture', pt: 'Cultura' },
    gastronomia: { es: 'Gastronomía', en: 'Gastronomy', pt: 'Gastronomia' },
    naturaleza: { es: 'Naturaleza', en: 'Nature', pt: 'Natureza' },
    aventura: { es: 'Aventura', en: 'Adventure', pt: 'Aventura' },
    playa: { es: 'Playas & Costa', en: 'Beaches & Coast', pt: 'Praias e Costa' },
    paquetes: { es: 'Paquetes Completos', en: 'Complete Packages', pt: 'Pacotes Completos' },
  };

  return labels[category]?.[language] || labels.naturaleza[language];
};

export const loc = (
  language: SupportedLanguage,
  es: string,
  en: string,
  pt?: string
): string => {
  if (language === 'es') return es;
  if (language === 'pt') return pt || translateToPortuguese(es) || es;
  return en;
};

export { translateToPortuguese };
