import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SupportedLanguage, TranslationDictionary } from '../types/i18n';
import { translations } from '../data/translations';
import { translateToPortuguese } from '../utils/portugueseTranslator';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  loc: (es: string, en: string, pt?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('gia_language_pref');
      if (saved === 'es' || saved === 'en' || saved === 'pt') return saved;
    } catch (e) {
      // Fallback
    }
    return 'es';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gia_language_pref', lang);
    } catch (e) {
      // Ignore
    }
  };

  const loc = useCallback(
    (es: string, en: string, pt?: string): string => {
      if (language === 'es') return es;
      if (language === 'pt') return pt || translateToPortuguese(es) || es;
      return en;
    },
    [language]
  );

  useEffect(() => {
    document.documentElement.lang = language;

    if (language !== 'pt') return;

    // Translation helper for visible text nodes when Portuguese is selected
    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.trim().length > 1) {
        const original = node.nodeValue;
        const translated = translateToPortuguese(original);
        if (translated !== original) {
          node.nodeValue = translated;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (
          el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SCRIPT' ||
          el.tagName === 'STYLE' ||
          el.getAttribute('data-no-translate') === 'true'
        ) {
          return;
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          translateNode(node.childNodes[i]);
        }
      }
    };

    // Run initial pass
    translateNode(document.body);

    // Watch for dynamic DOM changes (e.g. route changes, tabs, modals)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((n) => translateNode(n));
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  const t = translations[language] || translations.es;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loc }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
